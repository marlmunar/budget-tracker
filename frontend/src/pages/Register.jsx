import { Link, useNavigate } from "react-router-dom";
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

  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!!userInfo) navigate("/");
  }, [navigate, userInfo]);

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

    try {
      if (!name || !email || !password || !confirmPassword) {
        throw new Error("Please fill out all fields");
      }

      if (!validateEmail(email)) {
        throw new Error("Invalid email");
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
    <main>
      <title>Budgetarians' Log - Register</title>

      <FormContainer>
        <form
          onSubmit={handleSubmit}
          className="form-body min-h-[min-content] border"
        >
          <h3 className="text-2xl font-semibold underline">Sign Up</h3>

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
            Sign Up
          </button>

          <div className="mt-10">
            <p>Already a user?</p>
            <Link to="/login" className="underline">
              Log In Instead
            </Link>
          </div>
        </form>
      </FormContainer>
    </main>
  );
};

export default Register;
