import React from "react";
import { useState, useLayoutEffect } from "react";
import { Router } from "react-router-dom";
import { history } from "../history";

const CustomRouter = ({ children }) => {
  const [location, setLocation] = useState(history.location);

  useLayoutEffect(() => {
    const unlisten = history.listen(({ location }) => {
      setLocation(location);
    });

    return unlisten;
  }, []);

  return (
    <Router location={location} navigator={history}>
      {children}
    </Router>
  );
};

export default CustomRouter;
