import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="relative grow grid items-center min-h-[100%] mx-auto">
        <div className="container min-h-[100%] px-4 xl:px-10 min-w-[95vw]">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
