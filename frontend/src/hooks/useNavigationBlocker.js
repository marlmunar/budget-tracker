import { useCallback, useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";

export default function useNavigationBlocker(when) {
  const shouldBlock = useCallback(({ currentLocation, nextLocation }) => {
    return when && currentLocation.pathname !== nextLocation.pathname;
  });
  const blocker = useBlocker(shouldBlock);

  const confirm = () => {
    blocker.proceed();
    blocker.reset();
  };

  return { confirm, blocker };
}
