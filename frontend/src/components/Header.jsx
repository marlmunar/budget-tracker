import {
  TbArrowBadgeRight,
  TbLogin2,
  TbMapPin,
  TbMenu2,
  TbX,
} from "react-icons/tb";
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
        <Link to="/" className="active:scale-95 transition-all duration-200">
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 md:h-10 md:w-10"
              src={favicon}
              alt="Website logo"
            />
            <h1 className="header-h1 text-white">Budgetarians' Log</h1>
          </div>
        </Link>

        <div className="flex gap-4 items-center *:p-2">
          {!!userInfo ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold underline decoration-2 header-button"
                    : "header-button"
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/logs"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold underline decoration-2 header-button"
                    : "header-button"
                }
              >
                Logs
              </NavLink>

              <div>
                <div>
                  <button
                    className="hamburger"
                    data-id="hamburger"
                    onClick={() => setIsClicked((i) => !i)}
                  >
                    {!isClicked ? (
                      <TbMenu2 className="text-2xl" />
                    ) : (
                      <TbX className="text-2xl" />
                    )}
                  </button>
                  <div className="profile">
                    <button>
                      <BsPersonSquare className="text-2xl mr-1" />
                    </button>
                    <p>
                      Hello, <span className="font-bold">{userInfo.name}!</span>
                    </p>
                    <button
                      data-id="hamburger"
                      className="icon"
                      onClick={() => {
                        setIsClicked((i) => !i);
                      }}
                    >
                      {isClicked ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                    </button>
                  </div>
                </div>
                <div className="md:relative">
                  {isClicked && (
                    <div className="z-25 absolute flex top-[4.8rem] md:top-2 right-0 h-[calc(100%-5.2rem)] w-screen bg-gray-200/75">
                      <OutsideClick
                        onOutsideClick={() => setIsClicked(false)}
                        id="hamburger"
                      >
                        <nav className="nav-bar">
                          <ul className="flex flex-col gap-1">
                            <li className="sm-button">
                              <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                  isActive ? "nav-active" : ""
                                }
                                onClick={() => setIsClicked(false)}
                              >
                                {({ isActive }) => (
                                  <>
                                    Dashboard
                                    <div className="text-2xl md:hidden">
                                      {isActive ? (
                                        <TbMapPin />
                                      ) : (
                                        <TbArrowBadgeRight />
                                      )}
                                    </div>
                                  </>
                                )}
                              </NavLink>
                            </li>
                            <li className="sm-button">
                              <NavLink
                                to="/logs"
                                className={({ isActive }) =>
                                  isActive ? "nav-active" : ""
                                }
                                onClick={() => setIsClicked(false)}
                              >
                                {({ isActive }) => (
                                  <>
                                    Logs
                                    <div className="text-2xl md:hidden">
                                      {isActive ? (
                                        <TbMapPin />
                                      ) : (
                                        <TbArrowBadgeRight />
                                      )}
                                    </div>
                                  </>
                                )}
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
                                {({ isActive }) => (
                                  <>
                                    Profile
                                    <div className="text-2xl md:hidden">
                                      {isActive ? (
                                        <TbMapPin />
                                      ) : (
                                        <TbArrowBadgeRight />
                                      )}
                                    </div>
                                  </>
                                )}
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                  isActive ? "nav-active" : ""
                                }
                                onClick={() => setIsClicked(false)}
                              >
                                {({ isActive }) => (
                                  <>
                                    Settings
                                    <div className="text-2xl md:hidden">
                                      {isActive ? (
                                        <TbMapPin />
                                      ) : (
                                        <TbArrowBadgeRight />
                                      )}
                                    </div>
                                  </>
                                )}
                              </NavLink>
                            </li>
                            <li>
                              <span
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
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            !isLoggingIn && (
              <div className="login">
                <Link className="login-button" to="/login">
                  <span className="hidden md:block">Log In</span>
                  <TbLogin2 className="md:hidden text-2xl" />
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
