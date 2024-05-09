import { useState } from "react";
import { Channel, useChatContext } from "stream-chat-react";
import Game from "./Game";

const JoinGame = () => {
  const [rivalUsername, setRivalUsername] = useState("");
  const [channel, setChannel] = useState<unknown>();
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
       <div>
        <Channel  >
        <Game />
        </Channel>

       </div>
      ) : (
        <>
          <div className=" grid gap-3 w-full place-items-center">
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
              className=" bg-green-300 bg-opacity-45 p-2 px-4 border-2 border-black rounded-md"
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