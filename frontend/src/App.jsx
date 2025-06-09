import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveLogTab } from "./slices/logSlice";
import Modal from "./components/Modal";

const App = () => {
  const channel = new BroadcastChannel("budgetarian");
  const dispatch = useDispatch();
  const { activeLogTab } = useSelector((state) => state.logs);
  const [isNotActive, setIsNotActive] = useState(false);

  const setActiveTab = (tabId) => {
    dispatch(setActiveLogTab(tabId));
    localStorage.setItem("activeTabId", tabId);
  };

  useEffect(() => {
    const tabId = sessionStorage.getItem("tabId")
      ? sessionStorage.getItem("tabId")
      : sessionStorage.setItem("tabId", Date.now());

    channel.onmessage = (event) => {
      switch (event.data) {
        case "denied":
          setIsNotActive(true);
          break;
        case "lock":
          channel.postMessage("denied");
          break;
        case "request":
          channel.postMessage("approved");
          break;
        case "approved":
          setActiveTab(tabId);
          setIsNotActive(false);
          channel.postMessage("denied");
          break;
      }
    };

    if (activeLogTab === null) {
      setActiveTab(tabId);
    } else if (activeLogTab !== tabId) {
      channel.postMessage("lock");
    }

    return () => {
      channel.close();
    };
  }, [isNotActive]);

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="relative grow grid items-center min-h-[100%] py-4 mx-auto">
        <div className="container min-h-[100%] px-4 xl:px-10 min-w-[95vw]">
          <Outlet />
          {isNotActive && (
            <Modal
              isOpen={isNotActive}
              onClose={() => setIsNotActive(false)}
              title="Edit in this Tab?"
            >
              <div className="flex flex-col items-center gap-2 p-2">
                <p className="w-[30ch] text-center">
                  Page is currently active on another tab, continuing may lead
                  to unsaved changes?
                </p>
                <div className="button-row">
                  <button
                    onClick={() => {
                      channel.postMessage("request");
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      window.close();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
