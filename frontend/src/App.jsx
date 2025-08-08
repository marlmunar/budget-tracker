import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  const { darkMode } = useSelector((state) => state.app);

  useEffect(() => {
    const root = window.document.getElementById("root");
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-gray-50 dark:bg-[#232323]">
      {location.pathname.includes("log/") || <Header />}
      <div className="relative grow grid items-center h-full w-full mx-auto lg">
        <div className="h-full">
          <Outlet />
        </div>
      </div>
      {location.pathname.includes("log/") || <Footer />}
    </div>
  );
};

export default App;
