// import "./Header.css";
import { useState, useContext } from "react";
import { SetThemeContext } from "../../App";
import { ThemeDataType } from "../../assets/theme";
import { Channel } from "stream-chat";
import React from "react";

interface IProps {
  theme: ThemeDataType;
  logout: (value: unknown) => void;
  isAuth: boolean;
  channel: Channel | null;
  setCall: (value: boolean) => void;
  call: boolean;
}

const Navbar = ({ theme, logout, isAuth, channel, setCall, call }: IProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currTheme, setCurrTheme] = useState(theme.name);
  const setTheme = useContext(SetThemeContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleThemeToggle = () => {
    const newTheme = currTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCurrTheme(newTheme);
  };

  const navButtonStyle = {
    borderColor: theme.text,
  };

  const renderButtons = () => (
    <>
      <button
        style={navButtonStyle}
        className="bg-opacity-50 border-2 p-3 rounded-lg px-5"
        onClick={handleThemeToggle}
      >
        {currTheme === "light" ? "dark" : "light"}
      </button>

      {channel && (
        <button
          style={navButtonStyle}
          onClick={() => setCall(!call)}
          className="bg-opacity-50 border-2 p-3 rounded-lg px-5"
        >
          Leave Game
        </button>
      )}

      {isAuth && (
        <button
          style={navButtonStyle}
          onClick={logout}
          className="bg-opacity-50 border-2 p-3 rounded-lg px-5"
        >
          Logout
        </button>
      )}
    </>
  );

  return (
    <nav
      className="p-4 bg-green-400"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="font-extrabold text-xl">Tic-Tac-Toe Game</div>

          <div className="hidden md:flex gap-3">{renderButtons()}</div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
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
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-2 flex justify-center gap-3">
            {renderButtons()}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
