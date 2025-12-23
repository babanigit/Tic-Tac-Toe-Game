import React, { useEffect, useRef } from "react";
import {
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";

const CustomMessageList = () => {
  const { messages } = useChannelStateContext();
  const { client } = useChatContext();

  const currentUserId = client.userID;
  console.log("Current User ID:", currentUserId);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-100 rounded-md">
      {/* Chat messages */}
      <div className="h-[400px] overflow-y-auto flex flex-col gap-3 p-4">
        {messages!.map((msg) => {
          const isSender = msg.user?.id === currentUserId;

          return (
            <div
              key={msg.id}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg text-sm
                  ${isSender
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-black rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default CustomMessageList;
