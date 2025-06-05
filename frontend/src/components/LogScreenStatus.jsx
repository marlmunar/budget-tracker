import { useEffect, useState } from "react";

const LogScreenStatus = ({ isNotSaved, lastAction }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    console.log(fadeOut);
    setFadeOut(false);
    console.log("I'm firing");
    const timeout = setTimeout(() => {
      setFadeOut(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isNotSaved, lastAction]);

  return (
    <>
      {isNotSaved ? (
        "Changes not saved!"
      ) : (
        <div className={fadeOut ? "disappear" : ""}>Log is up to date</div>
      )}
    </>
  );
};

export default LogScreenStatus;
