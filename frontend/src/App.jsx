import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto px-4 xl:px-10">
        <Home />
      </div>
      <Footer />
    </div>
  );
};

export default App;
