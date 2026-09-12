import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { useRef } from "react"; 
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId,  messages,isMessagesLoading ,getNewMessage , unGetNewMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
    getNewMessage()
    return ()=>unGetNewMessage();
  }, [selectedUser, getMessagesByUserId, getNewMessage, unGetNewMessage]);


  return (
    <>
        <div className="shrink-0">
        <ChatHeader />
    </div>

      <div className="flex-1 px-6 h-[430px] overflow-y-auto py-8">
        {messages?.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isMine = msg.senderId === authUser?._id;

              return (
                <div
                  key={msg._id}
                  className={`chat ${isMine ? "chat-end" : "chat-start" }`}
                >
                  <div
                    className={`chat-bubble relative ${ isMine ? "bg-green-600 text-white" : "bg-gray-400 text-white" }`}
                  >
                    {msg.image && ( <img src={msg.image} alt="shared" className="rounded-lg h-48 object-cover" /> )}

                    {msg.text && (<p className="mt-2">{msg.text}</p> )}
                    <p className ="text-xs mt-1 opacity-75 flex text-white gap-1 items-center justify-end">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div> 
                  <div ref={messageEndRef}/>                 
                </div>
              );
            })}
          </div>
        ) : isMessagesLoading ? <MessageLoadingSkeleton /> :(
          selectedUser && (
            <NoChatHistoryPlaceholder
              name={selectedUser.fullName}
            />
          )
        )}
      </div>
      <MessageInput/>
    </>
  );
}

export default ChatContainer;
/*import { useChatStore } from "../store/useChatStore";
import {useAuthStore} from "../store/useAuthStore";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";


function ChatContainer() {
    const {selectedUser ,getMessagesByUserId,  messages} = useChatStore();
    const {authUser} = useAuthStore();

    useEffect(()=>{
        getMessagesByUserId(selectedUser._id);
    },[selectedUser, getMessagesByUserId]);
  return (
    <>
        <ChatHeader/>
        <div className="flex-1 px-6 overflow-y-auto py-8">
          {messages?.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-6"> 
              {messages.map(msg =>(
                <div key={msg._id}
                className={`chat ${msg.senderId ===authUser._id ? "chat-end" :"chat-start"}`}
                >
                    <div className={`chat-bubble relative
                    ${msg.sender._id === authUser._id 
                        ?"bg-green text-white"
                        :"bg-grey text-white"
                    }`}
                    >
                        {msg.image && (
                            <img src={msg.image} alt="shared" className="rounded-lg h-48 object-cover" />
                        )}
                        {msg.text && <p className="mt-2">{msg.text}</p>}
                    </div>
                </div>
              ))}
            </div>
          ) :(
            <NoChatHistoryPlaceholder name={selectedUser.fullName}/>
          )}

        </div>
    </>
  )
}

export default ChatContainer;*/