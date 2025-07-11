import { useCallback, useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";

export default function useNavigationBlocker(when) {
  const shouldBlock = useCallback(
    ({ currentLocation, nextLocation }) => {
      console.log(currentLocation);
      console.log(nextLocation);
      return when && currentLocation.pathname !== nextLocation.pathname;
    },
    [when]
  );
  const blocker = useBlocker(shouldBlock);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (blocker.state === "blocked") {
      setShow(true);
    }
  }, [blocker]);

  const confirm = () => {
    setShow(false);
    blocker.proceed();
  };

  const cancel = () => {
    setShow(false);
    blocker.reset();
  };

  return { show, confirm, cancel, blocker };
}
