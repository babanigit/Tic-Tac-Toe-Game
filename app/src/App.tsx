import "./App.css";
import { useState } from "react";
// import Login from "./components/Login";
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
            <div className=" bg-purple-300 bg-opacity-50 grid  ">
              <Chat client={client}>
                <div>
                  <JoinGame />
                </div>

                <button
                  className="   p-2 px-4 border-2 border-black rounded-md fixed right-0 bottom-0 m-4 "
                  onClick={logout}
                >
                  {" "}
                  logout
                </button>
              </Chat>
            </div>
          </>
        ) : (
          <div className=" bg-purple-300 bg-opacity-50 h-screen place-content-center place-items-center w-screen grid ">
            <div className=" font-extrabold ">Welcome to Tic-Tac-Toe</div>
            <div>
              <Register setIsAuth={setIsAuth} />
            </div>

            {/* <div className=" w-2 h-2 md:hidden " /> */}

            {/* <div>
              <Login setIsAuth={setIsAuth} />
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
