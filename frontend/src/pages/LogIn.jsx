import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggingIn } from "../slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <title>Budgetarians' Log - Login</title>
      <FormContainer>
        <form onSubmit={handleSubmit} className="form-body">
          <h3 className="text-2xl font-semibold underline">Log In</h3>

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

          <button type="submit" className="form-button">
            Log In
          </button>

          <div className="mt-10">
            <p>New user?</p>
            <Link to="/register" className="underline">
              Sigin Up Instead
            </Link>
          </div>
        </form>
      </FormContainer>
    </main>
  );
};

export default Login;
