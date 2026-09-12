import { useKeyboardSound } from "../hooks/useKeyboardSound";
import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon ,ImageIcon ,SendIcon } from "lucide-react";
import toast from "react-hot-toast"; 


function MessageInput() {
    const { playKeyStrokeSound } = useKeyboardSound();
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { selectedUser, sendMessage, isSoundEnabled } = useChatStore();

    const handleSendMessage = async (event) => {
        event.preventDefault();

        if (!text.trim() && !imagePreview) return;
        if (isSoundEnabled) playKeyStrokeSound();

        await sendMessage({
            text: text.trim(),
            image: imagePreview,
        });

        setText("");
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
         reader.readAsDataURL(file);
        }
   
    const removeImage  = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    } 
    return ( 
        <div className="w-full p-4 border-t border-slate-600/30 flex items-center gap-2">
            
            {imagePreview && (
                <div className="relative">
                    <img src={imagePreview} alt="preview" className="h-20 w-20 object-cover rounded-lg" />
                    <button onClick={removeImage} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                        <XIcon className="w-4 h-4"/>
                    </button>
                </div>
            )}
            
            <form onSubmit={handleSendMessage} className="flex-1 max-w-3xl flex items-center gap-2">                 
                <input
                    type="text"
                    value={text}
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-800/50 border border-slate-600/30 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    onChange={(e) => {
                        setText(e.target.value);
                        isSoundEnabled && playKeyStrokeSound();
                    }}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                /> 
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                    <ImageIcon className="w-5 h-5"/>
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <SendIcon className="w-5 h-5"/>
                </button>
            </form>
        </div>
    );
          

}

export default MessageInput;