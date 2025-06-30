import { useNavigate, useLocation } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggingIn } from "../slices/userSlice";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
const loginChannel = new BroadcastChannel("login_channel");

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSettingPassword, setIsSettingPassword] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();

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

    setIsSettingPassword(true);
    navigate("/register/set-password");
    setError("");
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
        <FormContainer title={"Set Password"}>
          <form onSubmit={finishSignUp}>
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
            <div className="form-input-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="form-input"
                type="password"
                name="confirmPassword"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="pl-1 text-red-500 text-sm">{error}</div>

            <button type="submit" formNoValidate className="form-button">
              Save Password
            </button>

            <div className="p-1 mt-5">
              <p>Need to change name or email?</p>
              <a
                href="#"
                onClick={() => {
                  setTimeout(() => navigate("/register"), 450);
                  setIsSettingPassword(false);
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="underline cursor-pointer"
              >
                Go back
              </a>
            </div>
          </form>
        </FormContainer>
      ) : (
        <FormContainer title={"Sign Up"}>
          <form onSubmit={handleSubmit} className="h-full">
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

          <div className="p-1 mt-5">
            <p>Already a user?</p>
            <a
              href="#"
              onClick={() => {
                setTimeout(() => navigate("/login"), 450);
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
