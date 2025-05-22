import { Helmet } from "react-helmet";
import Benefits from "../components/Benefits";
import Hero from "../components/Hero";
import Instructions from "../components/Instructions";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Budgetarians' Log - Home</title>
      </Helmet>
      <Hero />
      <Benefits />
      <Instructions />
    </main>
  );
};

export default Home;
