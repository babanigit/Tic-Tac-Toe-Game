import { useState } from "react";
import { Channel, useChatContext } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";

const JoinGame = () => {
  const [rivalUsername, setRivalUsername] = useState("");
  const [channel, setChannel] = useState(null);
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
            <Game channel={channel} setChannel={setChannel} />
          </Channel>
        </div>
      ) : (
        <>
          <div className=" bg-purple-300 bg-opacity-50 h-screen grid place-content-center gap-4 place-items-center ">
            <h4>Create Game</h4>
            <input
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
