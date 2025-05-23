import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLoggingIn } from "../slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();

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
              id="userEmail"
              type="email"
              name="email"
              autoComplete="off"
              required
            />
          </div>
          <div className="form-input-container">
            <label htmlFor="password">Password</label>
            <input
              className="form-input"
              id="userPassword"
              type="password"
              name="password"
              autoComplete="off"
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
