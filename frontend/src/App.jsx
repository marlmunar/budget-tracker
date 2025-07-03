import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-gray-50">
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
