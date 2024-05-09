import Login from "./components/Login";
import Register from "./components/Register";

import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";

const App = () => {
  const apiKey = "ab9gyx8fnz3j" || process.env.SC_KEY!;
  const cookies = new Cookies();
  const token = cookies.get("token");

  const client = StreamChat.getInstance(apiKey);

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
      });
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello world!
          <Register />
          <Login />
        </h1>
      </div>
    </>
  );
};

export default App;
