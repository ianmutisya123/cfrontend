import { useChatStore } from "../store/useChatStore.js";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import ContactList from "../components/ContactList.jsx";
import ChatsList from "../components/ChatsList.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import NoChatUi from "../components/NoChatUi.jsx";
import ChatContainer from "../components/ChatContainer.jsx";


function ChatPage() {
  const {activeTab,selectedUser} = useChatStore();
  return (
    <div className="relative min-w-[900px] rounded-2xl  max-w-6xl "> 
        <div className="w-full ">
            <BorderAnimatedContainer>
            <div className="flex flex-row overflow-hidden h-auto min-h-[600px] rounded-2xl" >
                <div className="w-80 rounded-l-2xl   bg-slate-800/50 backdrop-blur-sm flex flex-column">
                    <div className="">
                        <ProfileHeader/>
                        <ActiveTabSwitch/>

                        <div className="flex-1 overflow-y-auto h-[400px] p-4 space-y-2">
                            {activeTab === "chats"?<ChatsList/>:<ContactList/>}

                        </div>
                    </div>
                </div>
                <div  className="flex-1 rounded-2xl flex bg-slate900/50 backdrop-blur-sm">
                    <div className="">
                        {selectedUser?<ChatContainer/>:<NoChatUi/>}
                    </div>
                </div>
            </div>
            
        </BorderAnimatedContainer>
        </div>
    </div>
  )
}

export default ChatPage;