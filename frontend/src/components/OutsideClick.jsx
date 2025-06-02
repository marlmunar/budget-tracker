import { useEffect, useRef } from "react";

function OutsideClick({ children, onOutsideClick }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target.dataset.info
      ) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return (
    <div
      ref={ref}
      // className="absolute right-0"
    >
      {children}
    </div>
  );
}

export default OutsideClick;
