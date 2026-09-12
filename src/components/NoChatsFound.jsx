import {MessageCircleIcon} from "lucide-react";
import { useChatStore } from "../store/useChatStore";
function NoChatsFound() {
    const {setActiveTab} = useChatStore();
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-500/10 rounded-full flex items-center justify-center">
            <MessageCircleIcon className="h-8 w-8 text-cyan-400"/>
        </div>
        <div>
            <h4 className="text-slate-200 font-medium mb-1">No conversation going on</h4>
            <p className=" text-slate-400 text-sm px-6">
                start a new conversation by selecting a contact from  the contacts tab!!
            </p>
        </div>
        <button 
            onClick={()=>setActiveTab("contacts")}
            className="px-4 py-2 text-sm text-cyan-400 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors"
        >
            Find contacts
        </button>
    </div>
  );
}

export default NoChatsFound;