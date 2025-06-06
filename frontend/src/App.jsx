import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="relative grow grid min-h-[100%] py-4 ">
        <div className="container min-h-[100%] px-4 xl:px-10">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
