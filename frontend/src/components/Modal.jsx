import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children }) => {
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

  return (
    <div
      className="flex justify-center items-center absolute bg-slate-300/60 z-10 top-0 lef-0 right-0 bottom-0 h-full w-full"
      onClick={onClose}
    >
      <div
        className="relative bg-white shadow-xl rounded p-4 min-h-[10rem] sm:min-w-[30rem]"
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
