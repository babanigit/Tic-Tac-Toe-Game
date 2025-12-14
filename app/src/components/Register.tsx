import React, { useState } from "react";
import Cookies from "universal-cookie";
import { ThemeDataType } from "../assets/theme";


interface UserData {
  error: string;
  hashedPassword: string;
  token: string;
  userId: string;
  username: string;
}

interface Iprops {
  setIsAuth: (value: boolean) => void;
  theme: ThemeDataType;
}

const Register = ({ setIsAuth, theme }: Iprops) => {

  // const link = "http://localhost:5005/register";
  let link = "/register";

  const ENVIRONMENT = import.meta.env.VITE_STREAM_ENV!;
  if (ENVIRONMENT == "development") {
    link = "http://localhost:5005/register";
  }
  console.log("env link : ", link);  

  const cookies = new Cookies();
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState<UserData>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: UserData = await res.json();

      if (data.error) {
        setErrorData(data);
      } else {
        cookies.set("token", data.token);
        cookies.set("userId", data.userId);
        cookies.set("username", data.username);
        cookies.set("hashedPassword", data.hashedPassword);
        setIsAuth(true);
      }
    } catch (error) {
      console.error("[bab] error from register.tsx:- ", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8"
    >
      <div
        className="w-full max-w-md space-y-8 border-2 rounded-2xl shadow-xl p-8 transition-all duration-300 ease-in-out"
        style={{
          borderColor: theme.text,
          backgroundColor: theme.body,
          color: theme.text,
        }}
      >
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight">
            Create an Account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-5">
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Username"
              onChange={handleChange}
              className="appearance-none w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              style={{
                background: theme.body,
                color: theme.text,
                borderColor: theme.text,
              }}
            />

            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              onChange={handleChange}
              className="appearance-none w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              style={{
                background: theme.body,
                color: theme.text,
                borderColor: theme.text,
              }}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </div>
        </form>

        {errorData?.error && (
          <p className="text-red-500 text-center font-medium mt-2">
            {errorData.error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
