// darkMode feature

import "./App.css";
import { useEffect, useState } from "react";
// import Login from "./components/Login";
import Register from "./components/Register";

import { Channel, StreamChat } from "stream-chat";
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

  const [channel, setChannel] = useState<Channel | null>(null);

  const [call, setCall] = useState<boolean>(false);

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
    // cookies.remove("firstName");
    // cookies.remove("lastName");
    cookies.remove("hashedPassword");

    client.disconnectUser();
    setIsAuth(false);
  };

  return (
    <div className="min-h-screen flex flex-col "
      style={{
        borderColor: theme.text,
        backgroundColor: theme.body,
        color: theme.text,
      }}
    >

      {/* Header */}
      <Navbar
        theme={theme}
        logout={logout}
        isAuth={isAuth}
        channel={channel}
        call={call}
        setCall={setCall}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {isAuth ? (
          <Chat client={client}>
            <JoinGame
              channel={channel}
              setChannel={setChannel}
              theme={theme}
              call={call}
              setCall={setCall}
            />
          </Chat>
        ) : (
          <Register setIsAuth={setIsAuth} theme={theme} />
        )}
      </main>

      {/* Footer */}
      <AppFooter />

    </div>
  );

};

export default App2;
