import { useEffect, useRef } from "react";

function OutsideClick({ children, onOutsideClick }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();

        console.log("Clicked");
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
