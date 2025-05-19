import { RxDotsHorizontal } from "react-icons/rx";
import { BsPersonSquare } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";
import favicon from "../assets/favicon.png";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="header">
      <div className="header-container">
        <div className="flex items-center gap-2">
          <img src={favicon} alt="Website logo" width={40} height={40} />
          <h1 className="header-h1">Budgetarians' Log</h1>
        </div>

        <div>
          {isLoggedIn ? (
            <>
              <button
                className="hamburger"
                onClick={() => setIsClicked((i) => !i)}
              >
                <RxDotsHorizontal className="text-2xl" />
              </button>
              <div className="profile">
                <button>
                  <BsPersonSquare className="text-2xl mr-1" />
                </button>
                <p>
                  Hello, <span className="font-bold">Current User!</span>
                </p>
                <button
                  onClick={() => {
                    setIsClicked((i) => !i);
                  }}
                >
                  {isClicked ? (
                    <IoMdArrowDropup className="icon" />
                  ) : (
                    <IoMdArrowDropdown className="icon" />
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="login">
              <button className="login-button ">Login</button>
              <button className="login-button hidden md:block bg-[#0028FF] text-white">
                Sign Up
              </button>
            </div>
          )}

          {isClicked && (
            <nav className="nav-bar">
              <ul>
                <li>
                  <a
                    className="nav-active"
                    href="/"
                    onClick={() => setIsClicked(false)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a href="/profile" onClick={() => setIsClicked(false)}>
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/logout" onClick={() => setIsClicked(false)}>
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
