import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggingIn } from "../slices/userSlice";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
const loginChannel = new BroadcastChannel("login_channel");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();

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
      <title>Budgetarians' Log - Login</title>

      <FormContainer title={"Login"}>
        <form onSubmit={handleSubmit} className="h-full">
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

          <div className="pl-1 text-red-500 text-sm">{error}</div>

          <button type="submit" formNoValidate className="form-button">
            Log In
          </button>
        </form>

        <div className="p-1">
          <p>New user?</p>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // setIsVisible(false);
              setTimeout(() => navigate("/register"), 450);
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
