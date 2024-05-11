import React, { useState } from "react";
import Cookies from "universal-cookie";

// const link = "http://localhost:5005/register";
const link = "/register"
interface UserData {
  error: string;
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

const Register = ({ setIsAuth }: Iprops) => {
  const cookies = new Cookies();
  const [formData, setFormData] = useState({});

  const [errorData,setErrorData]= useState<UserData>();

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

      if(data.error){
        setErrorData(data)
      }else{

        console.log("hello  ", errorData)

        cookies.set("token", data.token);
        cookies.set("userId", data.userId);
        cookies.set("username", data.username);
        cookies.set("firstName", data.firstname);
        cookies.set("lastName", data.lastname);
        cookies.set("hashedPassword", data.hashedPassword);
        setIsAuth(true);
        console.log("data is : ", data);

      }

     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        // style={{ background: props.theme.body, color: props.theme.text }}
        className=" border-2 md:max-h-[500px] border-black bg-opacity-50 max-w-full rounded-2xl m-auto md:h-screen grid place-content-center "
      >
        <div className="  max-w-lg mx-auto  grid gap-3 p-5 ">
        

          <form
            //  onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              //   style={{
              //     background: props.theme.body,
              //     color: props.theme.text,
              //     borderColor: props.theme.text,
              //   }}
              type="text"
              placeholder="FirstName"
              id="firstname"
              className="bg-slate-100 p-3 rounded-lg border-2 w-full"
              onChange={handleChange}
            />
            <input
              //   style={{
              //     background: props.theme.body,
              //     color: props.theme.text,
              //     borderColor: props.theme.text,
              //   }}
              type="text"
              placeholder="LastName"
              id="lastname"
              className="bg-slate-100 p-3 rounded-lg border-2"
              onChange={handleChange}
            />
            <input
              //   style={{
              //     background: props.theme.body,
              //     color: props.theme.text,
              //     borderColor: props.theme.text,
              //   }}
              type="text"
              placeholder="Username"
              id="username"
              className="bg-slate-100 p-3 rounded-lg border-2"
              onChange={handleChange}
            />
            <input
              //   style={{
              //     background: props.theme.body,
              //     color: props.theme.text,
              //     borderColor: props.theme.text,
              //   }}
              type="password"
              placeholder="Password"
              id="password"
              className="bg-slate-100 p-3 rounded-lg border-2"
              onChange={handleChange}
            />
            <button
              //   style={{ background: props.theme.text, color: props.theme.body }}
              //   disabled={loading}
              onClick={handleSubmit}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              Register
            </button>
            {/* <OAuth /> */}
          </form>
          
          <p className="text-red-500 mt-5">
            {errorData
              ? errorData.error
              : ""}
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
