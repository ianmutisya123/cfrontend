import {MessageCircleIcon} from "lucide-react";

function NoChatUi() {
  
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <div className="size-20 bg-slate-500/20 rounded-full flex items-center justify-center mb-6">
            <MessageCircleIcon className="size-10 text-cyan-400"/>
        </div>
        <div>
            <h4 className="text-slate-200 font-medium mb-1">Select a conversation</h4>
            <p className=" text-slate-400 text-sm px-6">
                choose a contact from the contact bar to start chatting  or continue a previous conversation!!
            </p>
        </div>
    </div>
  )
}

export default NoChatUi;