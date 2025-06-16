import { useEffect, useRef, useState } from "react";
import { TbCopy } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLoading, stopLoading } from "../slices/appSlice";
import { useLazyGetLogsQuery } from "../slices/logsApiSlice";

const Hero = () => {
  const textRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [getLogs, { data, isLoading }] = useLazyGetLogsQuery();
  const [lastLog, setLastLog] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();

  const copyToClipboard = async () => {
    const title = "Budgetarian";
    const text = textRef.current.innerText;
    const fullText = `${title}\n${text}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        const res = await getLogs().unwrap();
        let sorted = [...res.data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setLastLog(sorted[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(stopLoading());
      }
    };

    if (userInfo) {
      fetchData();
    }
  }, [getLogs]);

  return (
    <section className="hero">
      <div className=" relative border-2 border-dotted m-2 p-5 flex flex-col gap-2  justify-center order-1 md:order-none shadow-lg">
        <div className="absolute m-4 top-0 right-0 flex flex-col items-end gap-2">
          <button
            className="rounded text-2xl p-2 hover:shadow hover:shadow-slate-400 transition-all duration-300"
            title="Copy Text"
            onClick={copyToClipboard}
          >
            <TbCopy />
          </button>
          {isCopied && (
            <p className="shadow shadow-slate-300 p-2 rounded text-sm">
              Text copied to clipboard
            </p>
          )}
        </div>

        <h2 className="text-2xl font-semibold">Budgetarian</h2>
        <p className="pl-1 font-semibold">noun</p>
        <p ref={textRef} className="pl-1 max-w-[50ch]">
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
        <div className="relative p-10 bg-slate-50 flex flex-col justify-end gap-2 h-full rounded shadow">
          <div className="absolute z-0 w-full h-full top-0 right-0">
            <img
              className="object-cover w-full h-full"
              src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image about budgeting"
            />
          </div>
          <div className="z-5 bg-amber-50/70 p-4 lg:max-w-[min-content] rounded shadow-lg flex flex-col">
            {!!userInfo ? (
              <>
                <p className="text-2xl font-semibold">Welcome Back!</p>
                <p>What do you want to visit?</p>
                <div className="flex gap-2 mt-4">
                  <Link className="hero-button" to={`/log/${lastLog?._id}`}>
                    Last log
                  </Link>
                  <Link className="hero-button" to="/profile">
                    All logs
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="text-2xl font-semibold ">Become a Budgetarian</p>
                <p>Start your journey!</p>
                <div className="flex gap-2 mt-4">
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
      </div>
    </section>
  );
};

export default Hero;
