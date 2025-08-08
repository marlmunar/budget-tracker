import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggingIn, setPreferences } from "../slices/userSlice";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
const loginChannel = new BroadcastChannel("login_channel");

const Login = () => {
  const loginRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  useEffect(() => {
    dispatch(setIsLoggingIn(true));
    return () => {
      dispatch(setIsLoggingIn(false));
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out all fields");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      const { logPreferences, ...credentials } = res;
      dispatch(setCredentials({ ...credentials }));
      dispatch(setPreferences(logPreferences));
      loginChannel.postMessage("login");
      navigate("/");
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    }
  };

  return (
    <main className="my-[-5px] z-0 rounded overflow-hidden flex flex-col gap-5 w-full h-[calc(100%+5px)]">
      <title>Budgetarians' Log - Login</title>

      <FormContainer
        initialState={{ opacity: 0, x: -50 }}
        animateTo={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 1.25,
          },
        }}
        exitTo={{
          opacity: 0,
          x: -50,
        }}
        ref={loginRef}
        duration={0.85}
      >
        <h1 className="text-2xl lg:text-3xl font-semibold h-[min-content] dark:text-[#fff2b9]">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="h-[min-content] md:w-[65%]">
          <div className="form-input-container">
            <label htmlFor="email">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="form-input-container">
            <label htmlFor="password">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="pl-1 text-red-500 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <button type="submit" formNoValidate className="form-button">
            Log In
          </button>
        </form>

        <div
          className="p-1 rounded h-full row-span-2 md:flex flex-col justify-end 
        md:bg-amber-300/75 md:absolute right-0 top-0 md:w-[30%] 
        lg:py-6 md:p-4 md:shadow-[2px_0_6px_rgba(0,0,0,0.1)]
        dark:bg-[#ffe368] dark:text-[#282828]"
        >
          <p>New user?</p>

          <a
            href="#"
            onClick={async (e) => {
              e.preventDefault();

              if (loginRef.current?.triggerExit) {
                await loginRef.current.triggerExit();
                navigate("/register");
              }
            }}
            className="underline cursor-pointer"
          >
            Sign Up Instead
          </a>
        </div>
      </FormContainer>
    </main>
  );
};

export default Login;
