import { useNavigate, useLocation } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggingIn } from "../slices/userSlice";
import { useRegisterMutation, useVerifyMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
const loginChannel = new BroadcastChannel("login_channel");

const Register = () => {
  const registerRef = useRef();
  const passwordRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSettingPassword, setIsSettingPassword] = useState(false);

  const [register] = useRegisterMutation();
  const [verify] = useVerifyMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!!userInfo) navigate("/");
  }, [navigate, userInfo]);

  useEffect(() => {
    if (location.pathname === "/register") {
      setIsSettingPassword(false);
      setError("");
    }
    if (location.pathname === "/register/set-password") {
      if (!name || !email || !validateEmail(email)) {
        navigate("/register");
      }
      setIsSettingPassword(true);
    }
  }, [location]);

  useEffect(() => {
    dispatch(setIsLoggingIn(true));
    return () => {
      dispatch(setIsLoggingIn(false));
    };
  }, [dispatch]);

  const validateEmail = (testEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(testEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      return setError("Please fill out the name field");
    }

    if (!email) {
      return setError("Please fill out the email field");
    }

    if (!validateEmail(email)) {
      return setError("Invalid email");
    }

    try {
      const res = await verify({ email }).unwrap();

      if (!res.available) {
        throw new Error("User already exist");
      }

      setIsSettingPassword(true);
      navigate("/register/set-password");
      setError("");
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    }
  };

  const finishSignUp = async (e) => {
    e.preventDefault();

    try {
      if (!password) {
        throw new Error("Please provide a password");
      }

      if (!confirmPassword) {
        throw new Error("Please confirm your password");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const res = await register({ name, email, password }).unwrap();

      dispatch(setCredentials({ ...res }));
      loginChannel.postMessage("login");
      navigate("/");
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    }
  };

  return (
    <main className="my-[-5px] z-0 rounded overflow-hidden flex flex-col gap-5 w-full h-[calc(100%+5px)]">
      <title>Budgetarians' Log - Register</title>
      {isSettingPassword ? (
        <FormContainer
          page={"set-password"}
          initialState={{ opacity: 0, y: 50 }}
          animateTo={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.35,
            },
          }}
          exitTo={{
            opacity: 0,
            y: 50,
          }}
          ref={passwordRef}
          duration={0.35}
        >
          <h1 className="text-2xl font-semibold h-[min-content] ">
            Set Password
          </h1>

          <form onSubmit={handleSubmit} className="h-full md:w-[65%]">
            <div className="form-input-container">
              <label htmlFor="password">Password</label>
              <input
                className="form-input"
                type="text"
                name="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="form-input"
                type="email"
                name="confirmPassword"
                autoComplete="off"
                value={confirmPassword}
                nChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="pl-1 text-red-500 text-sm">{error}</div>

            <button type="submit" formNoValidate className="form-button">
              Save Password
            </button>
          </form>

          <div className="p-1 rounded h-full row-span-2 md:flex flex-col justify-end md:bg-amber-300/75 md:absolute right-0 top-0 md:w-[30%] lg:py-6 md:p-4 md:shadow-[2px_0_6px_rgba(0,0,0,0.1)]">
            <p>Need to change name or email?</p>
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault();

                if (passwordRef.current?.triggerExit) {
                  await passwordRef.current.triggerExit();
                  navigate("/register");
                }
              }}
              className="underline cursor-pointer"
            >
              Go back
            </a>
          </div>
        </FormContainer>
      ) : (
        <FormContainer
          page={"register"}
          initialState={{ opacity: 0, x: 50 }}
          animateTo={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1.25,
            },
          }}
          exitTo={{
            opacity: 0,
            x: 50,
          }}
          ref={registerRef}
          duration={0.85}
        >
          <h1 className="text-2xl font-semibold h-[min-content] relative md:left-[32%] ">
            Sign Up
          </h1>

          <form
            onSubmit={handleSubmit}
            className="h-full md:w-[65%] relative md:left-[32%] "
          >
            <div className="form-input-container">
              <label htmlFor="name">Name</label>
              <input
                className="form-input"
                type="text"
                name="name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="email">Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="pl-1 text-red-500 text-sm">{error}</div>

            <button type="submit" formNoValidate className="form-button">
              Sign Up
            </button>
          </form>

          <div className="p-1 rounded h-full row-span-2 md:flex flex-col justify-end md:bg-amber-300/75 md:absolute left-0 top-0 md:w-[30%] lg:py-6 md:p-4 md:shadow-[2px_0_6px_rgba(0,0,0,0.1)]">
            <p>Already a user?</p>
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault();

                if (registerRef.current?.triggerExit) {
                  await registerRef.current.triggerExit();
                  navigate("/login");
                }
              }}
              className="underline cursor-pointer"
            >
              Log In Instead
            </a>
          </div>
        </FormContainer>
      )}
    </main>
  );
};

export default Register;
