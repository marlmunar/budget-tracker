import ColorDots from "./ColorDots";
import HomeCard from "./HomeCard";
import { motion } from "framer-motion";

const Benefits = () => {
  return (
    <HomeCard title={"Why use this log?"}>
      <div className="px-2 flex flex-col md:grid grid-rows-2 grid-cols-2 gap-2 lg:gap-4">
        <motion.div
          data-motion
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="item">
            <ColorDots />
            <div className="text-div">
              <h3 className="item-title">Access Anywhere</h3>
              <p>
                All you need is an account, and you can track your budget from
                anywhere.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          data-motion
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="item">
            <ColorDots />
            <div className="text-div">
              <h3 className="item-title">User-Friendly Workspace</h3>
              <p>
                The tool is easy to use. Even beginners can start budgeting in
                no time.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          data-motion
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="item">
            <ColorDots />
            <div className="text-div">
              <h3 className="item-title ">Easy Navigation</h3>
              <p>
                Use our tools to filter and search through your finances. You
                can also view your monthly spending history with ease.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          data-motion
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="item">
            <ColorDots />
            <div className="text-div">
              <h3 className="item-title ">Backup Ready</h3>
              <p>
                Save a copy of your expenses as a spreadsheet on your device.
                You can import it back into the tracker later.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </HomeCard>
  );
};

export default Benefits;
