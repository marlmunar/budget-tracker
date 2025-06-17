import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ isOpen, onClose, title, children }) => {
  const scrollToRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    document.removeEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const offset = 200;
    const element = scrollToRef.current;

    if (element) {
      const topPosition =
        element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div
      className="overflow-hidden flex justify-center absolute bg-slate-300/60 z-10 top-0 lef-0 right-0 bottom-0 h-full w-full"
      onClick={handleClose}
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div
              ref={scrollToRef}
              className="relative bg-white shadow-xl rounded p-4 mt-15 max-h-fit sm:min-w-[15rem]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg text-center font-semibold">{title}</h2>
              <div>{children}</div>

              <button
                className="absolute top-2 right-2 tool-button"
                onClick={handleClose}
              >
                <IoClose />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
