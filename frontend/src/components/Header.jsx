import { RxDotsHorizontal } from "react-icons/rx";
import { BsPersonSquare } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import favicon from "../assets/favicon.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { clearCredentials } from "../slices/authSlice";
import ConfirmModal from "./ConfirmModal";
import OutsideClick from "./OutsideClick";
import { startLoading, stopLoading } from "../slices/appSlice";
const logoutChannel = new BroadcastChannel("logout_channel");
const loginChannel = new BroadcastChannel("login_channel");

const Header = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoggingIn } = useSelector((state) => state.user);
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      dispatch(startLoading());
      const res = await logout().unwrap();
      logoutChannel.postMessage("logout");
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    logoutChannel.onmessage = (event) => {
      if (event.data === "logout") {
        window.location.reload();
      }
    };

    return () => {
      logoutChannel.onmessage = null;
    };
  }, [userInfo]);

  useEffect(() => {
    loginChannel.onmessage = (event) => {
      if (event.data === "login") {
        window.location.reload();
      }

      return () => {
        loginChannel.onmessage = null;
      };
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img
              className="h-15 w-15 md:h-10 md:w-10"
              src={favicon}
              alt="Website logo"
              // width="40"
              // height="40"
            />
            <h1 className="header-h1 hidden md:block text-white">
              Budgetarians' Log
            </h1>
          </div>
        </Link>

        <div className="flex flex-col items-end">
          {!!userInfo ? (
            <div>
              <button
                className="hamburger"
                data-info="exempted"
                onClick={() => setIsClicked((i) => !i)}
              >
                <RxDotsHorizontal className="text-2xl" />
              </button>
              <div className="profile">
                <button>
                  <BsPersonSquare className="text-2xl mr-1" />
                </button>
                <p>
                  Hello, <span className="font-bold">{userInfo.name}!</span>
                </p>
                <button
                  data-info="exempted"
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
            </div>
          ) : (
            !isLoggingIn && (
              <div className="login">
                <Link className="login-button" to="/login">
                  Log In
                </Link>

                <Link
                  className="login-button hidden md:block bg-[#4d68ff] text-white"
                  to="/register"
                >
                  Sign Up
                </Link>
              </div>
            )
          )}
          <div className="relative">
            {isClicked && (
              <OutsideClick onOutsideClick={() => setIsClicked(false)}>
                <nav className="nav-bar">
                  <ul className="flex flex-col gap-1">
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive ? "nav-active" : ""
                        }
                        onClick={() => setIsClicked(false)}
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                          isActive ? "nav-active" : ""
                        }
                        onClick={() => setIsClicked(false)}
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          setIsClicked(false);
                          setIsLoggingOut(true);
                        }}
                      >
                        Logout
                      </span>
                    </li>
                  </ul>
                </nav>
              </OutsideClick>
            )}
          </div>
        </div>
      </div>
      {isLoggingOut && (
        <ConfirmModal
          isOpen={isLoggingOut}
          setIsOpen={setIsLoggingOut}
          handleConfirm={() => {
            setIsLoggingOut(false);
            handleLogout();
          }}
          action="Logout"
          description={"Are you sure you want to logout?"}
        />
      )}
    </header>
  );
};

export default Header;
