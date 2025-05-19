import Header from "./components/Header";
import Home from "./pages/Home";
const App = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto border px-4 xl:px-10">
        <Home />
      </div>
    </>
  );
};

export default App;
