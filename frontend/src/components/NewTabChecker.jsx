import { act, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveLogTab } from "../slices/logSlice";
import Modal from "./Modal";

const NewTabChecker = () => {
  const channel = new BroadcastChannel("budgetarian");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeLogTab } = useSelector((state) => state.logs);
  const [isNotActive, setIsNotActive] = useState(false);
  const intervalRef = useRef();
  const [tabId] = useState(() => {
    const existing = sessionStorage.getItem("tabId");
    if (existing) return existing;
    const newId = `${Date.now()}-${Math.random()}`;
    sessionStorage.setItem("tabId", newId);
    return newId;
  });

  const setActiveTab = (id) => {
    dispatch(setActiveLogTab(id));
    localStorage.setItem("activeTabId", id);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const { type, tabId: senderId } = event.data;

      if (senderId === tabId) return;

      switch (type) {
        case "request":
          if (activeLogTab === tabId) {
            channel.postMessage({ type: "denied", tabId });
          }
          break;
        case "approved":
          if (senderId !== tabId) {
            setActiveTab(senderId);
          }
          break;
        case "denied":
          setIsNotActive(true);
          break;
      }
    };

    channel.onmessage = handleMessage;

    const lock = JSON.parse(localStorage.getItem("note-app-lock"));
    const now = Date.now();

    if (!activeLogTab) {
      setActiveTab(tabId);
    } else if (activeLogTab !== tabId) {
      setIsNotActive(true);
    } else {
      intervalRef.current = setInterval(() => {
        localStorage.setItem(
          "note-app-lock",
          JSON.stringify({ id: tabId, timestamp: Date.now() })
        );
      }, 5000);
    }

    if (!lock || now - lock.timestamp > 10000) {
      localStorage.setItem(
        "note-app-lock",
        JSON.stringify({ id: tabId, timestamp: now })
      );
      setActiveTab(tabId);
      setIsNotActive(false);
    }

    return () => {
      channel.close();
      clearInterval(intervalRef.current);
    };
  }, [activeLogTab, tabId]);

  const requestControl = () => {
    channel.postMessage({ type: "request", tabId });
    setTimeout(() => {
      if (activeLogTab !== tabId) {
        setActiveTab(tabId);
        channel.postMessage({ type: "approved", tabId });
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
