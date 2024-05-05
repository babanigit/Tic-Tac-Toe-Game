import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({});

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    console.log(formData)

  };

  return (
    <>
      <div
        // style={{ background: props.theme.body, color: props.theme.text }}
        className=" max-w-lg m-auto h-screen grid place-content-center "
      >
        <div className="  max-w-lg mx-auto   w-screen grid gap-3 p-5 ">
          <div className=" flex place-content-center place-items-center">
            {/* <div>
              <img className=" w-12" src={man} alt="women" />
            </div> */}

            <h1 className="text-3xl text-center font-semibold ">Register</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              //   style={{
              //     background: props.theme.body,
              //     color: props.theme.text,
              //     borderColor: props.theme.text,
              //   }}
              type="text"
              placeholder="FirstName"
              id="firstname"
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
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              Register
            </button>
            {/* <OAuth /> */}
          </form>
          <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            {/* <Link to="/signin">
              <span className="text-blue-500">Sign in</span>
            </Link> */}
            {/* <Link to="/admin">
              <span className="text-red-500">Admin</span>
            </Link> */}
          </div>
          {/* <p className="text-red-500 mt-5">
            {error
              ? errorData.error || "Something went wrong(from singUp.jsx)!"
              : ""}
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Register;
