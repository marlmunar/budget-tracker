import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveLogTabs } from "../slices/logSlice";

const channel = new BroadcastChannel("budgetarian");

const NewTabChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logId } = useParams();
  const { activeLogTabs } = useSelector((state) => state.logs);
  const [isNotActive, setIsNotActive] = useState(false);
  const intervalRef = useRef();

  const [tabId] = useState(() => {
    const existing = sessionStorage.getItem("tabId");
    if (existing) return existing;
    const newId = `${Date.now()}-${Math.random()}`;
    sessionStorage.setItem("tabId", newId);
    return newId;
  });

  const setActiveTab = (logId, tabId) => {
    const updatedActiveTabs = [
      ...activeLogTabs.filter((entry) => entry.logId !== logId),
      { logId, tabId },
    ];
    dispatch(setActiveLogTabs(updatedActiveTabs));
    localStorage.setItem("activeTabIds", JSON.stringify(updatedActiveTabs));
  };

  const requestControl = () => {
    channel.postMessage({ type: "request", tabId, logId });

    const timeout = setTimeout(() => {
      const currentOwner = activeLogTabs.find((entry) => entry.logId === logId);
      const now = Date.now();
      const lockNotes = JSON.parse(localStorage.getItem("note-app-lock")) || [];
      const noteLock = lockNotes.find((note) => note.id === logId);

      if (
        !currentOwner ||
        currentOwner.tabId === tabId ||
        now - noteLock?.timestamp > 10000
      ) {
        setActiveTab(logId, tabId);
        setIsNotActive(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const { type, tabId: senderId, logId: senderLogId } = event.data;

      if (senderLogId !== logId) return;
      if (senderId === tabId) return;

      switch (type) {
        case "request":
          {
            const existingTab = activeLogTabs.find(
              (tab) => tab.logId === logId
            );

            if (existingTab?.tabId === tabId) {
              channel.postMessage({
                type: "approved",
                tabId,
                logId,
                target: senderId,
              });
            }
          }
          break;

        case "approved":
          if (event.data?.target === tabId) {
            setActiveTab(logId, tabId);
            setIsNotActive(false);
            channel.postMessage({ type: "lock", tabId, logId });
          }

          break;

        case "lock":
          clearInterval(intervalRef.current);
          setIsNotActive(true);
          break;

        default:
          break;
      }
    };

    channel.addEventListener("message", handleMessage);

    const now = Date.now();
    const lockNotes = JSON.parse(localStorage.getItem("note-app-lock")) || [];
    const noteLock = lockNotes.find((note) => note.id === logId);
    const currentActive = [...activeLogTabs].find((tab) => tab.logId === logId);

    if (!currentActive) {
      setActiveTab(logId, tabId);
    } else if (!noteLock) {
      const updatedLockNotes = lockNotes.filter((note) => note.id !== logId);
      updatedLockNotes.push({ id: logId, timestamp: now });
      localStorage.setItem("note-app-lock", JSON.stringify(updatedLockNotes));
    } else if (currentActive.tabId === tabId) {
      intervalRef.current = setInterval(() => {
        const updatedNotes = (
          JSON.parse(localStorage.getItem("note-app-lock")) || []
        ).map((note) =>
          note.id === logId ? { ...note, timestamp: Date.now() } : note
        );
        channel.postMessage({ type: "lock", tabId, logId });
        localStorage.setItem("note-app-lock", JSON.stringify(updatedNotes));
      }, 2000);
    } else if (now - noteLock?.timestamp > 10000) {
      setActiveTab(logId, tabId);
      const updatedLockNotes = (
        JSON.parse(localStorage.getItem("note-app-lock")) || []
      ).filter((note) => note.id !== logId);
      localStorage.setItem("note-app-lock", JSON.stringify(updatedLockNotes));
    } else {
      setIsNotActive(true);
    }

    return () => {
      channel.removeEventListener("message", handleMessage);
      clearInterval(intervalRef.current);
    };
  }, [activeLogTabs, logId, tabId]);

  return (
    <>
      <Outlet />
      {/* {isNotActive && (
        <Modal
          isOpen={isNotActive}
          onClose={() => navigate("/profile")}
          title="Edit in this Tab?"
        >
          <div className="flex flex-col items-center gap-2 p-2">
            <p className="w-[30ch] text-center">
              Page is currently active on another tab. Continuing may lead to
              unsaved changes.
            </p>
            <div className="button-row">
              <button onClick={requestControl}>Confirm</button>
              <button onClick={() => navigate("/profile")}>Cancel</button>
            </div>
          </div>
        </Modal>
      )} */}
    </>
  );
};

export default NewTabChecker;
