import React from "react";
import {
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";

const CustomMessageList = () => {
  const { messages } = useChannelStateContext();
  const { client } = useChatContext();

  const currentUserId = client.userID;

  return (
    <div className="w-full max-w-2xl  mx-auto bg-gray-100 flex flex-col gap-3 p-4 rounded-md">
      {messages!.map((msg) => {
        const isSender = msg.user?.id === currentUserId;

        return (
          <div
            key={msg.id}
            className={`flex ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg text-sm
                ${
                  isSender
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-black rounded-bl-none"
                }`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomMessageList;
