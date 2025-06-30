import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-scree">
      <Header />
      <div className="relative grow grid items-center h-full w-full mx-auto">
        <div className="h-full xl:px-10">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
