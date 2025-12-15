

import { useChannelActionContext } from "stream-chat-react";
import { useState } from "react";

const CustomMessageInput = () => {
    const { sendMessage } = useChannelActionContext();
    const [text, setText] = useState("");

    const handleSend = async () => {
        if (!text.trim()) return;

        await sendMessage({ text });
        setText("");
    };

    return (
        <div className="flex gap-2 p-3 border-t">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 border rounded px-3 py-2"
                placeholder="Type your move..."
            />
            <button
                onClick={handleSend}
                className="bg-blue-500 text-white px-4 rounded"
            >
                Send
            </button>
        </div>
    );
};


export default CustomMessageInput