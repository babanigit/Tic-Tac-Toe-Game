import { useState } from "react";
import {
  Channel,
  useChatContext,
  DefaultStreamChatGenerics,
} from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";
import { ThemeDataType } from "../assets/theme";

interface IProps {
  channel: null | Channel<DefaultStreamChatGenerics>;
  setChannel: (value: null) => void;
  theme: ThemeDataType;
  call: boolean;
  setCall: (value: boolean) => void;
}

const JoinGame = ({ channel, setChannel, theme, call, setCall }: IProps) => {
  const [rivalUsername, setRivalUsername] = useState("");
  // const [channel, setChannel] = useState(null);
  const { client } = useChatContext();

  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("user not found");
      return;
    }

    const newChannel = client.channel("messaging", undefined, {
      members: [client.userID!, response.users[0].id!],
    });

    await newChannel.watch();

    setChannel(newChannel);
  };

  return (
    <div>
      {channel ? (
        <div className="  h-screen">
          <Channel channel={channel} Input={CustomInput}>
            <Game
              channel={channel}
              setChannel={setChannel}
              call={call}
              setCall={setCall}
            />
          </Channel>
        </div>
      ) : (
        <>
          <div className="  bg-opacity-50 h-screen grid place-content-center gap-4 place-items-center ">
            <h4>Create Game</h4>
            <input
              style={{
                background: theme.body,
                color: theme.text,
                borderColor: theme.text,
              }}
              className=" p-2 px-4 rounded-md border-2  "
              type="text"
              placeholder="Username of rival..."
              value={rivalUsername}
              onChange={(event) => {
                setRivalUsername(event.target.value);
              }}
            />
            <button
              className="  p-2 px-4 border-2 border-black rounded-md"
              onClick={createChannel}
            >
              Start game
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JoinGame;
