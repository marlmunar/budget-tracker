import { useCallback, useEffect } from "react";
import { useBlocker } from "react-router-dom";

export default function useNavigationBlocker(when) {
  const shouldBlock = useCallback(({ currentLocation, nextLocation }) => {
    return when && currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const blocker = useBlocker(shouldBlock);

  const confirm = () => {
    blocker.proceed();
    blocker.reset();
  };

  return { confirm, blocker };
}
