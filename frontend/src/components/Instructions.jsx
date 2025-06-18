import HomeCard from "./HomeCard";
import { motion } from "framer-motion";

const Instructions = () => {
  return (
    <HomeCard title={"How to use this log?"}>
      <div className="px-4 max-w-[65ch] text-lg">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="item-title">1. Be a Budgetarian</h3>
          <p className="pl-2 mb-5 text-base">
            Sign up and join our growing budgetarian community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="item-title">2. Create a Tracker</h3>
          <p className="pl-2 mb-5 text-base">
            Open the workspace and click "Add New Log" to create a tracker. You
            can name it and later rename or delete it as needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="item-title">3. Log and Categorize</h3>
          <p className="pl-2 mb-5 text-base">
            Record your finances and assign them to categories. Customize each
            category with colors to make them easy to identify. Use filters and
            search tools for quick navigation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="item-title">4. Save Your Logs</h3>
          <p className="pl-2 mb-5 text-base">
            Click the download button to save a copy of your log. This will
            generate a spreadsheet version, including your entries, categories,
            and summary.
          </p>
        </motion.div>
      </div>
    </HomeCard>
  );
};

export default Instructions;
