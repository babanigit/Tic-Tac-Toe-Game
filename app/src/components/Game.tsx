/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Board from "./Board";

import { ResultType } from "./Board";

interface IChannel {
  on(arg0: string, arg1: (event: { watcher_count: number }) => void): unknown;
  state: {
    watcher_count: number | unknown; // Assuming this is the type of watcher_count
  };
}

interface IProps {
  channel: IChannel | unknown;
}

const Game = ({ channel }: IProps) => {
  // Type assertion to ensure channel is of type IChannel
  const typedChannel = channel as IChannel;

  // Check if channel is not undefined and state is not undefined before accessing watcher_count
  const watcherCount =
    typedChannel && typedChannel.state
      ? typedChannel.state.watcher_count
      : undefined;

  // Assuming the type of channel.state.watcher_count is number
  const [playerJoined, setPlayerJoined] = useState<boolean>(watcherCount === 2);
  const[result,setResult]= useState<ResultType>({
    winner:"none",
    state:"none"
  });

  (typedChannel as IChannel).on(
    "user.watching.start",
    (event: { watcher_count: number }) => {
      setPlayerJoined(event.watcher_count == 2);
    }
  );

  if (!playerJoined) return <div>waiting for the player to join</div>;

  return (
    <div className="gameContainer">
      <Board
      result={result}
      setResult={setResult}
      />
      {/* chat app */}
      {/* exit game button */}
    </div>
  );
};

export default Game;
