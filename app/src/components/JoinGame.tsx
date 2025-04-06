import { useState } from "react";
import {
  Channel,
  useChatContext,
  DefaultStreamChatGenerics,
} from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";
import { ThemeDataType } from "../assets/theme";
import React from "react";

interface IProps {
  channel: Channel<DefaultStreamChatGenerics> | null;
  setChannel: (value: Channel<DefaultStreamChatGenerics> | null) => void;
  theme: ThemeDataType;
  call: boolean;
  setCall: (value: boolean) => void;
}

const JoinGame = ({ channel, setChannel, theme, call, setCall }: IProps) => {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();

  const createChannel = async () => {
    if (!rivalUsername.trim()) {
      alert("Please enter a rival's username.");
      return;
    }

    try {
      const response = await client.queryUsers({
        name: { $eq: rivalUsername.trim() },
      });

      if (response.users.length === 0) {
        alert("User not found.");
        return;
      }

      const newChannel = client.channel("messaging", undefined, {
        members: [client.userID!, response.users[0].id!],
      });

      await newChannel.watch();
      setChannel(newChannel);
    } catch (error) {
      console.error("Error creating channel:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createChannel();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game
            channel={channel}
            setChannel={setChannel}
            call={call}
            setCall={setCall}
            theme={theme}
          />
        </Channel>
      ) : (
        <div
          className="grid gap-4 place-content-center place-items-center text-center"
          style={{
            background: theme.body,
            color: theme.text,
          }}
        >
          <h2 className="text-xl font-semibold">Start a New Game</h2>
          <input
            className="appearance-none w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            style={{
              background: theme.body,
              color: theme.text,
              borderColor: theme.text,
            }}
            type="text"
            placeholder="Enter rival's username"
            value={rivalUsername}
            onChange={(e) => setRivalUsername(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={createChannel}
            className="group w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition"
            style={{ borderColor: theme.text }}
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default JoinGame;
