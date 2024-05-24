// darkMode feature

import "./App.css";
import { useEffect, useState } from "react";
// import Login from "./components/Login";
import Register from "./components/Register";

import {  Channel, StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { Chat } from "stream-chat-react";

import JoinGame from "./components/JoinGame";
import Navbar from "./components/navbar/Navbar";
import { ThemeDataType } from "./assets/theme";
import AppFooter from "./components/footer/AppFooter";
import React from "react";

interface IProps {
  theme: ThemeDataType;
}

const App2 = ({ theme }: IProps) => {
  const apiKey = "ab9gyx8fnz3j" || process.env.SC_KEY!;
  const cookies = new Cookies();
  const token = cookies.get("token");

  const client = StreamChat.getInstance(apiKey);

  const [isAuth, setIsAuth] = useState(false);

  const [channel, setChannel] = useState<Channel|null>(null);

  const[call, setCall]=useState<boolean>(false);



  useEffect(() => {
    if (token) {
      client
        .connectUser(
          {
            id: cookies.get("userId"),
            name: cookies.get("username"),
            // firstName: cookies.get("firstname"),
            // lastName: cookies.get("lastname"),
            hashedPassword: cookies.get("hashedPassword"),
          },
          token
        )
        .then((user) => {
          console.log(user);
          setIsAuth(true);
        });
    }
  }, [client, cookies, token]);

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
    <div style={{ backgroundColor: theme.body, color: theme.text }}>
      <div>
        <Navbar theme={theme} logout={logout} isAuth={isAuth} channel={channel} call={call} setCall={setCall} />
      </div>
      {isAuth ? (
        <>
          <div className="   grid  ">
            <Chat client={client}>
              <div>
                <JoinGame channel={channel} setChannel={setChannel} theme={theme} call={call} setCall={setCall} />
              </div>
            </Chat>
          </div>
        </>
      ) : (
        <div className="  h-screen place-content-center place-items-center w-screen grid ">
          <div className=" font-extrabold ">Welcome to Tic-Tac-Toe</div>
          <div>
            <Register setIsAuth={setIsAuth} theme={theme} />
          </div>

          {/* <div className=" w-2 h-2 md:hidden " /> */}

          {/* <div>
              <Login setIsAuth={setIsAuth} />
            </div> */}
        </div>
      )}

      <div>
        <AppFooter />
      </div>
    </div>
  );
};

export default App2;
