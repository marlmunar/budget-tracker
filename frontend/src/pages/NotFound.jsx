import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="text-center p-8">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">
        Hey, budgetarian! This page doesn’t seem to exist or isn’t accessible
        right now. We’re sorry for the inconvenience.
      </p>
      <Link to="/" className="text-blue-600 underline hover:text-blue-800">
        ← Return to Home
      </Link>
    </main>
  );
};

export default NotFound;
