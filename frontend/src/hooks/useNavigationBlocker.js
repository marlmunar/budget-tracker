import { useCallback, useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";

export default function useNavigationBlocker(when) {
  const shouldBlock = useCallback(({ currentLocation, nextLocation }) => {
    return when && currentLocation.pathname !== nextLocation.pathname;
  });
  const blocker = useBlocker(shouldBlock);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (blocker.state === "blocked") {
      setShow(true);
      console.log("Yep");
    }
  }, [blocker]);

  const confirm = () => {
    setShow(false);
    blocker.proceed();
  };

  const cancel = () => {
    blocker.reset();
  };

  return { show, confirm, cancel, blocker };
}
