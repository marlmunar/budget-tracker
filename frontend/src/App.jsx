import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto my-4 px-4 xl:px-10">
        <Home />
        {/* <Profile /> */}
        {/* <LogIn /> */}
        {/* <Register /> */}
      </div>
      <Footer />
    </div>
  );
};

export default App;
