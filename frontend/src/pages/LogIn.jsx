import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="form-container">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold underline">Log In</h3>

        <div className="form-input-container">
          <label for="email">Email</label>
          <input
            className="form-input"
            id="userEmail"
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
            id="userPassword"
            type="password"
            name="password"
            autocomplete="off"
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
    </main>
  );
};

export default Login;
