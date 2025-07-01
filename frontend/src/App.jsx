import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="relative grow grid items-center h-full w-full mx-auto lg">
        <div className="h-full">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
