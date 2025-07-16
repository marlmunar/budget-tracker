import { useCallback, useEffect } from "react";
import { useBlocker } from "react-router-dom";

export default function useNavigationBlocker(when) {
  const shouldBlock = useCallback(({ currentLocation, nextLocation }) => {
    return when && currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (when) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [when]);

  const blocker = useBlocker(shouldBlock);

  const confirm = useCallback(() => {
    blocker?.proceed?.();
    blocker?.reset?.();
  }, [blocker]);

  const cancel = useCallback(() => {
    blocker?.reset?.();
  }, [blocker]);

  return { confirm, cancel, blocker };
}
