import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children }) => {
  const scrollToRef = useRef(null);

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

  return (
    <div
      className="flex justify-center absolute bg-slate-300/60 z-10 top-0 lef-0 right-0 bottom-0 h-full w-full"
      onClick={onClose}
    >
      <div
        ref={scrollToRef}
        className="relative bg-white shadow-xl rounded p-4 mt-15 max-h-fit sm:min-w-[15rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg text-center font-semibold">{title}</h2>
        <div>{children}</div>

        <IoClose
          onClick={onClose}
          className="absolute top-2 right-2 tool-button"
        />
      </div>
    </div>
  );
};

export default Modal;
