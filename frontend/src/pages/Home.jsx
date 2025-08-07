import Benefits from "../components/Benefits";
import Hero from "../components/Hero";
import Instructions from "../components/Instructions";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <main>
      <title>Budgetarians' Log - Home</title>
      <motion.div
        data-motion
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Benefits />
        <Instructions />
      </motion.div>
    </main>
  );
};

export default Home;
