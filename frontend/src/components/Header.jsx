import { RxDotsHorizontal } from "react-icons/rx";
import { BsPersonSquare } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import favicon from "../assets/favicon.png";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img src={favicon} alt="Website logo" width={40} height={40} />
            <h1 className="header-h1">Budgetarians' Log</h1>
          </div>
        </Link>

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
              <Link className="login-button" to="/login">
                Log In
              </Link>

              <Link
                className="login-button  hidden md:block bg-[#4d68ff] text-white"
                to="/register"
              >
                Sign Up
              </Link>
            </div>
          )}

          {isClicked && (
            <nav className="nav-bar">
              <ul>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "nav-active" : "")}
                    onClick={() => setIsClicked(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => (isActive ? "nav-active" : "")}
                    onClick={() => setIsClicked(false)}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/logout"
                    className={({ isActive }) => (isActive ? "nav-active" : "")}
                    onClick={() => setIsClicked(false)}
                  >
                    Logout
                  </NavLink>
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
