/* eslint-disable @typescript-eslint/no-unused-vars */
import "./Chat.css";

import { useState } from "react";
import { Window, MessageList, MessageInput } from "stream-chat-react";

import Board from "./Board";
import { ResultType } from "./Board";

interface IChannel {
  stopWatching(): unknown;
  on(arg0: string, arg1: (event: { watcher_count: number }) => void): unknown;
  state: {
    watcher_count: number | unknown; // Assuming this is the type of watcher_count
  };
}

interface IProps {
  channel: IChannel | unknown;
  setChannel: (value: null) => void;
}

const Game = ({ channel, setChannel }: IProps) => {
  // Type assertion to ensure channel is of type IChannel
  const typedChannel = channel as IChannel;

  // Check if channel is not undefined and state is not undefined before accessing watcher_count
  const watcherCount =
    typedChannel && typedChannel.state
      ? typedChannel.state.watcher_count
      : undefined;

  // Assuming the type of channel.state.watcher_count is number
  const [playerJoined, setPlayerJoined] = useState<boolean>(watcherCount === 2);
  const [result, setResult] = useState<ResultType>({
    winner: "none",
    state: "none",
  });

  (typedChannel as IChannel).on(
    "user.watching.start",
    (event: { watcher_count: number }) => {
      setPlayerJoined(event.watcher_count == 2);
    }
  );

  if (!playerJoined) return <div>waiting for the player to join</div>;

  return (
    <div className="gameContainer ">
      <Board result={result} setResult={setResult} />
      {/* chat app */}
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>

      {/* exit game button */}
      <button
        className=" fixed bottom-0 left-0 m-4 border-2 p-3 rounded-md border-black"
        onClick={async () => {
          await (typedChannel as IChannel).stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game{" "}
      </button>

      <div className=" fixed bottom-0 m-5 bg-blue-300 p-3 rounded-md" >
        {result.state === "won" && <div> {result.winner} Won The Game</div>}
        {result.state === "tie" && <div> Game Tieds</div>}
      </div>
    </div>
  );
};

export default Game;
