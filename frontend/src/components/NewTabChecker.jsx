import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveLogTabs } from "../slices/logSlice";
import Modal from "./Modal";

const NewTabChecker = () => {
  const channel = new BroadcastChannel("budgetarian");
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

  const setActiveTab = (logs, id) => {
    let updatedActiveTabs = [];

    if (logs.includes(logId)) {
      updatedActiveTabs = activeLogTabs.map((log) =>
        log.logId === logId ? { ...log, tabId: id } : log
      );
    } else {
      updatedActiveTabs = [...activeLogTabs, { tabId: id, logId: logId }];
    }
    dispatch(setActiveLogTabs(updatedActiveTabs));
    localStorage.setItem("activeTabIds", JSON.stringify(updatedActiveTabs));
  };

  useEffect(() => {
    const newActiveIDs = [...activeLogTabs];

    const newActiveLogs = newActiveIDs.map((id) => id.logId);
    const newActiveTab = newActiveIDs.find((id) => id.logId === logId)?.tabId;

    const handleMessage = (event) => {
      const { type, tabId: senderId, logId: logData } = event.data;

      if (logId !== logData) return;
      if (senderId === tabId) return;

      switch (type) {
        case "request":
          if (activeLogTabs.includes(tabId)) {
            channel.postMessage({ type: "denied", tabId });
          }
          break;
        case "approved":
          if (senderId !== tabId) {
            setActiveTab(newActiveLogs, tabId);
          }
          break;
        case "denied":
          setIsNotActive(true);
          break;
      }
    };

    channel.onmessage = handleMessage;

    const lockNotes = JSON.parse(localStorage.getItem("note-app-lock"));
    const lock = lockNotes
      ? lockNotes.filter((note) => note.id === logId)[0]
      : {};

    const now = Date.now();

    if (!newActiveLogs.includes(logId)) {
      setActiveTab(newActiveLogs, tabId);
    } else {
      if (newActiveTab !== tabId) {
        setIsNotActive(true);
      } else {
        intervalRef.current = setInterval(() => {
          const newLockNotes = lockNotes.map((note) =>
            note.id === logId ? { ...note, timestamp: Date.now() } : note
          );
          localStorage.setItem("note-app-lock", JSON.stringify(newLockNotes));
        }, 2000);
      }
    }

    if (!lockNotes) {
      const newNote = [{ id: logId, timestamp: now }];
      localStorage.setItem("note-app-lock", JSON.stringify(newNote));

      setActiveTab(newActiveLogs, tabId);
      setIsNotActive(false);
    } else if (!lock) {
      const newNote = { id: logId, timestamp: now };
      localStorage.setItem(
        "note-app-lock",
        JSON.stringify([...lockNotes, newNote])
      );

      setActiveTab(newActiveLogs, tabId);
      setIsNotActive(false);
    } else if (now - lock.timestamp > 10000) {
      const newLockNotes = lockNotes.map((note) =>
        note.id === logId ? { ...note, timestamp: now } : note
      );
      localStorage.setItem("note-app-lock", JSON.stringify(newLockNotes));

      setActiveTab(newActiveLogs, tabId);
      setIsNotActive(false);
    }

    return () => {
      channel.close();
      clearInterval(intervalRef.current);
      if (newActiveTab === tabId && lock?.id === logId) {
        const newLockNotes = lockNotes.filter((note) => note.id !== logId);
        localStorage.setItem("note-app-lock", JSON.stringify(newLockNotes));
      }
    };
  }, [activeLogTabs, tabId]);

  const requestControl = () => {
    channel.postMessage({ type: "request", tabId, logId });
    setTimeout(() => {
      if (![...activeLogTabs].map((tab) => tab.tabId).includes(tabId)) {
        setActiveTab(newActiveLogs, tabId);
        channel.postMessage({ type: "approved", tabId, logId });
        setIsNotActive(false);
      }
    }, 500);
  };

  return (
    <>
      <Outlet />
      {isNotActive && (
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
      )}
    </>
  );
};

export default NewTabChecker;
