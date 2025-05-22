import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="text-center p-8">
      <Helmet>
        <title>Budgetarians' Log - Page Not Found</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4 underline">
        404 - Page Not Found
      </h1>
      <p>This page doesn’t seem to exist or isn’t accessible right now. </p>
      <p className="mb-6">We’re sorry for the inconvenience.</p>
      <Link
        to="/"
        className="text-blue-600 underline font-semibold text-xl hover:text-blue-800"
      >
        ← Return to Home
      </Link>
    </main>
  );
};

export default NotFound;
