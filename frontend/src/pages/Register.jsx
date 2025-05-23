import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLoggingIn } from "../slices/userSlice";

const Register = () => {
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
      <title>Budgetarians' Log - Register</title>

      <FormContainer>
        <form onSubmit={handleSubmit} className="form-body">
          <h3 className="text-2xl font-semibold underline">Sign Up</h3>

          <div className="form-input-container">
            <label htmlFor="name">Name</label>
            <input
              className="form-input"
              type="text"
              name="name"
              autoComplete="off"
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
              required
            />
          </div>

          <button type="submit" className="form-button">
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
