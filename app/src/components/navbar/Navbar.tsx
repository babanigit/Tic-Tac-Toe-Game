// Navbar.tsx
import "./Header.css"

import { useState, useContext } from "react";
import { SetThemeContext } from "../../App";
import { ThemeDataType } from "../../assets/theme";
import { Channel } from "stream-chat";
// import { Channel } from "stream-chat";
// import { channel } from "diagnostics_channel";

interface Iprops {
  theme: ThemeDataType;
  // setTheme: (value: string) => void;
  logout: (value: unknown) => void;
  isAuth: boolean;
  channel: null | Channel;
  setCall: (value: boolean) => void;
  call:boolean
}

const Navbar = ({ theme, logout, isAuth, channel, setCall,call }: Iprops) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currTheme, setCurrTheme] = useState(theme.name);

  const setT = useContext(SetThemeContext);

  function changeTheme() {
    if (currTheme === "light") {
      setT("dark");
      // localStorage.setItem("theme", "dark");
      setCurrTheme("dark");
    } else {
      setT("light");
      // localStorage.setItem("theme", "light");
      setCurrTheme("light");
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      style={{ color: theme.text, backgroundColor: theme.body }}
      className=" p-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 font-extrabold ">Tic-Tac-Toe Game</div>
          <div className="hidden gap-3 md:flex">
            {/* <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Link 1
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Link 2
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Link 3
            </a> */}
            <button
              style={{ borderColor: theme.text }}
              className="  bg-opacity-50 border-2 p-3 rounded-lg px-5 "
              onClick={changeTheme}
            >
              {theme.name === "light" ? "dark" : "light"}
            </button>

            {channel && (
              <>
                <button
                  style={{ borderColor: theme.text }}
                  onClick={() => {
                    setCall(!call);
                  }}
                  className="   bg-opacity-50 border-2 p-3 rounded-lg px-5 "
                >
                  LeaveGame
                </button>
              </>
            )}

            {isAuth && (
              <button
                style={{ borderColor: theme.text }}
                onClick={logout}
                className="   bg-opacity-50 border-2 p-3 rounded-lg px-5 "
              >
                Logout
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex gap-2"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}

              {/*  */}

            </button>
          </div>
        </div>
        {/* Submenu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className=" menu  mt-2 flex place-content-center gap-3">
              {/* <a
                href="#"
                className="block  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Submenu Link 1
              </a>
              <a
                href="#"
                className="block  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Submenu Link 2
              </a>
              <a
                href="#"
                className="block  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Submenu Link 3
              </a> */}
              <button
                style={{ borderColor: theme.text }}
                className="  bg-opacity-50 border-2 p-3 rounded-lg px-5 "
                onClick={changeTheme}
              >
                {theme.name === "light" ? "dark" : "light"}
              </button>

              {channel && (
                <>
                  <button
                    style={{ borderColor: theme.text }}
                    onClick={() => {
                      setCall(!call);
                    }}
                    className="   bg-opacity-50 border-2 p-3 rounded-lg px-5 "
                  >
                    LeaveGame
                  </button>
                </>
              )}

              {isAuth && (
                <button
                  style={{ borderColor: theme.text }}
                  onClick={logout}
                  className="   bg-opacity-50 border-2 p-3 rounded-lg px-5 "
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
