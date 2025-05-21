import { Link } from "react-router-dom";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="form-container">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold underline">Sign Up</h3>

        <div className="form-input-container">
          <label for="name">Name</label>
          <input
            className="form-input"
            type="text"
            name="name"
            autocomplete="off"
            required
          />
        </div>
        <div className="form-input-container">
          <label for="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            autocomplete="off"
            required
          />
        </div>
        <div className="form-input-container">
          <label for="password">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            autocomplete="off"
            required
          />
        </div>
        <div className="form-input-container">
          <label for="confirmPassword">Confirm Password</label>
          <input
            className="form-input"
            type="password"
            name="confirmPassword"
            autocomplete="off"
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
    </main>
  );
};

export default Register;
