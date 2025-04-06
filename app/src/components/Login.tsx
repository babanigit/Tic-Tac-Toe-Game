import React, { useState } from "react";
import Cookies from "universal-cookie";

const link = "http://localhost:5005/login";
// const link = "/login";
interface UserData {
  firstname: string;
  hashedPassword: string;
  lastname: string;
  token: string;
  userId: string;
  username: string;
}

interface Iprops {
  setIsAuth: (value: boolean) => void;
}

const Login = ({ setIsAuth }: Iprops) => {
  const cookies = new Cookies();
  const [formData, setFormData] = useState({});

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data: UserData = await res.json();
      console.log("--- the user data is :- ", data);

      cookies.set("token", data.token);
      cookies.set("userId", data.userId);
      cookies.set("username", data.username);
      // cookies.set("firstName", data.firstname);
      // cookies.set("lastName", data.lastname);
      cookies.set("hashedPassword", data.hashedPassword);
      setIsAuth(true);
      console.log("data is : ", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className=" max-w-full bg-opacity-50 rounded-2xl m-auto md:h-screen grid place-content-center ">
        <div className="  max-w-lg mx-auto   grid gap-3 p-5 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="bg-slate-100 p-3 rounded-lg border-2"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-slate-100 p-3 rounded-lg border-2"
              onChange={handleChange}
            />
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
