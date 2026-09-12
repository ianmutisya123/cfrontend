
import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore"; 

export const useChatStore = create((set,get)=>({
    allContacts:[],
    chats:[],
    messages:[],
    activeTab:"chats",
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,
    isSoundEnabled:JSON.parse(localStorage.getItem("isSoundEnabled"))===true,


    toggleSound:()=>{
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({isSoundEnabled: !get().isSoundEnabled});
    }
    ,
    setActiveTab: (tab)=>set({activeTab:tab}),
    setSelectedUser:(selectedUser)=>set({selectedUser}),
    getAllContacts: async ()=>{
        set({isUserLoading:true})
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts:res.data});
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
    },
    getMyChatPartners:async()=>{
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({chats:res.data});
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
        
    },
    getMessagesByUserId: async (userId)=>{
        set({isMessagesLoading:true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data.message});
            console.log("messages",res.data.message);
        } catch (error) {
            toast.error(error.response.data.message );
        }finally{
            set({isMessagesLoading:false});
        }
    },
    sendMessage: async (messageData)=>{
        const {selectedUser, messages} = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        };
        set({ messages: [...messages, optimisticMessage] });

        if (!selectedUser?._id) {
            toast.error("Select a user before sending a message");
            return;
        }

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: messages.concat(res.data)});
        } catch (error) {
            set({messages :messages});
            toast.error(error?.response?.data?.message ||"Something wrong happened");
        }
    },
    getNewMessage:()=>{
        const { selectedUser , isSoundEnabled } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage)=>{
            const fromSelected = newMessage.senderId === selectedUser._id;
            if(!fromSelected) return;
            const currentMessages = get().messages;
            set({messages:[...currentMessages, newMessage ]})

            if(isSoundEnabled){
                const notificationSound = new Audio("/sounds/mouse-click.mp3");

                notificationSound.currentTime = 0;
                notificationSound.play().catch((e)=> console.log("Audio play failed: ",e));
            }
        });
    },
    unGetNewMessage:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }
}));  