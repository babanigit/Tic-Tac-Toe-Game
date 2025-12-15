

import React from 'react'

import { useChannelStateContext } from "stream-chat-react";

const CustomMessageList = () => {
    const { messages } = useChannelStateContext();
    return (
        <div className="flex flex-col gap-2 p-4">
            {messages!.map((msg) => (
                <div
                    key={msg.id}
                    className={`max-w-xs p-3 rounded-lg ${msg.user?.id === "currentUserId"
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 text-black self-start"
                        }`}
                >
                    <p className="text-sm">{msg.text}</p>
                </div>
            ))}
        </div>
    );
}

export default CustomMessageList