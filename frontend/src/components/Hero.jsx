import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <section className="hero">
      <div className="border-2 border-dotted m-2 p-5 flex flex-col gap-2  justify-center order-1 md:order-none shadow-lg">
        <h2 className="text-2xl font-semibold">Budgetarian</h2>
        <p className="pl-1 font-semibold">noun</p>
        <p className="pl-1 max-w-[65ch]">
          A term used by Filipinos to describe someone who is smart about
          managing expenses. Budgetarians are careful with their spending and
          usually only spend on important things.
        </p>
        <p className="pl-1 ">
          <span className="font-semibold">Synonyms: </span>
          thrifty person, frugal individual, economical spender
        </p>
      </div>

      <div className="flex flex-col gap-2 justify-center order-1 md:order-none">
        <h2 className="homecard-title">What is this log?</h2>
        <div className="m-2">
          <p>
            A web-based tool to help you become a
            <i>
              <b> budgetarian.</b>
            </i>
          </p>
          <p>
            Log your finances, categorize them, and view a summary of your total
            spending.
          </p>
        </div>
      </div>

      <div className="p-4  bg-amber-200  row-span-2 rounded shadow-lg">
        <div className="p-6 bg-slate-50 flex flex-col justify-center gap-2 h-full rounded shadow">
          {!!userInfo ? (
            <>
              <p className="text-2xl font-semibold mt-2">Welcome Back!</p>
              <p className="">What do you want to visit?</p>
              <div className="flex gap-2">
                <Link className="hero-button" to="/lastlog">
                  Last log
                </Link>
                <Link className="hero-button" to="/profile">
                  All logs
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-2xl font-semibold mt-2">
                Become a Budgetarian
              </p>
              <div className="flex gap-2">
                <Link className="hero-button" to="/login">
                  Log In
                </Link>
                <Link className="hero-button" to="/register">
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
