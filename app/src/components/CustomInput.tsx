import React from "react";
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";

const CustomInput = () => {
  const { handleSubmit } = useMessageInputContext();

  return (
    <div className=" bg-white p-3 rounded-lg ">
      <div className="flex items-center gap-2  ">
        {/* Input on left */}
        <div               className="appearance-none w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <ChatAutoComplete />
        </div>

        {/* Button on right */}
        <button
          onClick={handleSubmit}
          className="group w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CustomInput;
