import { useEffect, useRef } from "react";

function OutsideClick({ children, onOutsideClick, id = "none" }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (e.target.dataset.id && id !== e.target.dataset.id) {
        onOutsideClick();
      }
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
  }, [onOutsideClick, id]);

  return <div ref={ref}>{children}</div>;
}

export default OutsideClick;
