import { useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";

export default function usePrompt(when) {
  const blocker = useBlocker(when);
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

  return { show, confirm, cancel };
}
