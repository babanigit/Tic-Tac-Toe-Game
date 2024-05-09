import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { Chat } from "stream-chat-react";

import JoinGame from "./components/JoinGame";

const App = () => {
  const apiKey = "ab9gyx8fnz3j" || process.env.SC_KEY!;
  const cookies = new Cookies();
  const token = cookies.get("token");

  const client = StreamChat.getInstance(apiKey);

  const [isAuth, setIsAuth] = useState(false);

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstname"),
          lastName: cookies.get("lastname"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        console.log(user);
        setIsAuth(true);
      });
  }

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");

    client.disconnectUser();
    setIsAuth(false);
  };

  return (
    <>
      <div>
        {isAuth ? (
          <>
            <div className=" place-content-center grid place-items-center h-screen gap-4">
              <Chat client={client}>
                <div>
                  <JoinGame />
                </div>
                <button
                  className=" bg-red-300 bg-opacity-45  p-2 px-4 border-2 border-black rounded-md"
                  onClick={logout}
                >
                  {" "}
                  logout
                </button>
              </Chat>
            </div>
          </>
        ) : (
          <>
            <Register setIsAuth={setIsAuth} />
            <Login setIsAuth={setIsAuth} />
          </>
        )}
      </div>
    </>
  );
};

export default App;
