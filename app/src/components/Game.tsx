/* eslint-disable @typescript-eslint/no-unused-vars */
import "./Chat.css";

import { useEffect, useState } from "react";
import { Window, MessageList, MessageInput } from "stream-chat-react";

import Board from "./Board";
import { ResultType } from "./Board";
import { ThemeDataType } from "../assets/theme";
import React from "react";

export interface IChannel {
  stopWatching(): unknown;
  on(arg0: string, arg1: (event: { watcher_count: number }) => void): unknown;
  state: {
    watcher_count: number | unknown; // Assuming this is the type of watcher_count
  };
}

interface IProps {
  channel: IChannel | null;
  setChannel: (value: null) => void;
  call: boolean;
  setCall: (value: boolean) => void;
  theme:ThemeDataType;

}

const Game = ({ channel, setChannel, call, setCall,theme }: IProps) => {
  useEffect(() => {
    async function hello() {
      await (typedChannel as IChannel).stopWatching();
      setChannel(null);
      setCall(!call);
    }

    if (call) {
      hello();
    }

    // leaveFunction();
  }, [call]);

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

  if (!playerJoined)
    return (
      <div className="  h-screen place-content-center grid place-items-center">
        Waiting for the Player to Join
      </div>
    );

  const leaveFunction = async () => {
    await (typedChannel as IChannel).stopWatching();
    setChannel(null);
  };

  return (
    <div className=" w-full  h-screen  grid  grid-flow-row md:grid-flow-col place-content-center place-items-center gap-3">
      <div
      style={{backgroundColor:theme.body, color:theme.text}}
      className=" text-black">
        <Board result={result} setResult={setResult} />
      </div>
      {/* chat app */}
      <div className=" text-black">
        <Window>
          <div className=" p-3 ">
            <MessageList
              disableDateSeparator
              closeReactionSelectorOnClick
              hideDeletedMessages
              messageActions={["react"]}
            />
          </div>

          <div className=" flex place-content-center place-items-center">
            <MessageInput noFiles />
          </div>
        </Window>
      </div>

      {/* exit game button */}
    

      {/* <div className=" fixed bottom-0 m-5 bg-blue-300 p-3 rounded-md" >
        {result.state === "won" && <div> {result.winner} Won The Game</div>}
        {result.state === "tie" && <div> Game Tied</div>}
      </div> */}
    </div>
  );
};

export default Game;
