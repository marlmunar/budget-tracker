import { useEffect, useState } from "react";

const LogScreenStatus = ({ isNotSaved }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isNotSaved) {
      setFadeOut(false);
      const timeout = setTimeout(() => {
        setFadeOut(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isNotSaved]);

  return (
    <div className="text-gray-500">
      {isNotSaved ? (
        "Log has unsaved changes"
      ) : (
        <div className={fadeOut ? "disappear" : ""}>Log is up to date</div>
      )}
    </div>
  );
};

export default LogScreenStatus;
