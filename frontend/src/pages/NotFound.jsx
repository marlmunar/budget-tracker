import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="text-center p-8 h-full flex flex-col justify-center">
      <title>Budgetarians' Log - Page Not Found</title>

      <h1 className="text-2xl md:text-3xl font-bold mb-4 underline">
        404 - Page Not Found
      </h1>
      <p className="text-sm md:text-base ">
        This page doesn’t seem to exist or isn’t accessible right now.{" "}
      </p>
      <br />
      <p className="mb-6 text-sm md:text-base">
        We’re sorry for the inconvenience.
      </p>
      <Link
        to="/"
        className="text-blue-600 underline font-semibold text-base md:text-lg hover:text-blue-800"
      >
        Return to Home
      </Link>
    </main>
  );
};

export default NotFound;
