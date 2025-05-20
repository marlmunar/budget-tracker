import React from "react";

const LogIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="mx-auto shadow-lg rounded p-10 md:max-w-[50vw] border-b-2 border-slate-700 min-h-[30rem]">
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

        <button
          type="submit"
          className="mt-2 border rounded p-2 max-w-22 font-semibold"
        >
          Log In
        </button>

        <div className="mt-10">
          <p>New user?</p>
          <a href="/register" className="underline">
            Sigin Up Instead
          </a>
        </div>
      </form>
    </main>
  );
};

export default LogIn;
