import React, { useEffect, useRef } from "react";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setModalState } from "../slices/appSlice";
import AddNewLog from "./Modals/AddNewLog";
import { AnimatePresence, motion } from "framer-motion";
import RenameLog from "./Modals/RenameLog";
import RenameUser from "./Modals/RenameUser";
import Delete from "./Modals/Delete";
import OutsideClick from "./OutsideClick";
import ConfirmExit from "./Modals/ConfirmExit";
import UpdateEmail from "./Modals/UpdateEmail";
import useNavigationBlocker from "../hooks/useNavigationBlocker";
import { setIsNotSaved } from "../slices/logSlice";
import ConfirmLogout from "./Modals/ConfirmLogout";
import UpdatePassword from "./Modals/UpdatePassword";
import SelectCurrency from "./Modals/SelectCurrency";
import DefaultCategories from "./Modals/DefaultCategories";
import LogExpired from "./Modals/LogExpired";
import UpdateExpiry from "./Modals/UpdateExpiry";
import ImportLog from "./Modals/ImportLog";

const ModalWrapper = () => {
  const dispatch = useDispatch();
  const { isNotSaved } = useSelector((state) => state.logs);
  const { blocker, confirm, cancel } = useNavigationBlocker(isNotSaved);

  useEffect(() => {
    if (blocker?.state === "blocked" && isNotSaved) {
      dispatch(
        setModalState({
          showModal: true,
          activeModal: "confirmExit",
        })
      );
    }
  }, [blocker, isNotSaved]);

  const { showModal, activeModal, modalData } = useSelector(
    (state) => state.app
  );

  const closeModal = () => {
    dispatch(
      setModalState({
        showModal: false,
        activeModal: "",
        modalData: {},
      })
    );
  };

  const confirmNavigation = () => {
    dispatch(setIsNotSaved(false));
    confirm();
    closeModal();
  };

  const cancelNavigation = () => {
    cancel();
    closeModal();
  };

  const modals = {
    addLog: <AddNewLog closeModal={closeModal} />,
    renameLog: (
      <RenameLog
        name={modalData.name}
        id={modalData.id}
        closeModal={closeModal}
      />
    ),
    renameUser: (
      <RenameUser
        name={modalData.name}
        id={modalData.id}
        closeModal={closeModal}
      />
    ),
    delete: <Delete resource={modalData} closeModal={closeModal} />,
    confirmExit: (
      <ConfirmExit
        confirmNavigation={confirmNavigation}
        cancelNavigation={cancelNavigation}
      />
    ),
    confirmLogout: <ConfirmLogout closeModal={closeModal} />,
    updateEmail: <UpdateEmail closeModal={closeModal} />,
    updatePassword: <UpdatePassword closeModal={closeModal} />,
    selectCurrency: <SelectCurrency closeModal={closeModal} />,
    defaultCategories: <DefaultCategories closeModal={closeModal} />,
    logExpired: <LogExpired closeModal={closeModal} resource={modalData} />,
    updateExpiry: (
      <UpdateExpiry
        closeModal={closeModal}
        name={modalData.name}
        id={modalData.id}
        logData={modalData.logData}
      />
    ),
    importLog: <ImportLog closeModal={closeModal} resource={modalData} />,
  };

  const getModal = () => modals[activeModal] || null;

  const titles = {
    addLog: "Add New Log",
    renameLog: "Rename Log",
    renameUser: "Rename User",
    delete: "Delete Log",
    confirmExit: "Leave Log",
    confirmLogout: "Confirm Logout",
    updateEmail: "Update Email",
    updatePassword: "Update Password",
    selectCurrency: "Select Currency",
    defaultCategories: "Manage Default Categories",
    logExpired: "Log Expired",
    updateExpiry: "Update End Date",
    importLog: "Import Log",
  };

  const getModalTitle = () => titles[activeModal] || null;

  const scrollToRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") closeModal();
    }

    if (showModal) {
      document.addEventListener("keydown", handleKeyDown);
      scrollToRef.current.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  return (
    <>
      {showModal && (
        <OutsideClick onOutsideClick={closeModal}>
          <div
            className="mt-[-5px] z-20 absolute h-[calc(100%+5px)] w-full bg-gray-300/75
            dark:bg-gray-800/75 dark:text-[#f0f0f0] outline-none"
            onClick={closeModal}
            ref={scrollToRef}
            tabIndex={-1}
          >
            <div className="relative w-full h-full flex justify-center items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  data-motion
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{ duration: 0.3 }}
                  className="sticky rounded top-[20%] bg-white dark:bg-[#4a4e53]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="log-section-header">
                    <h3>{getModalTitle()}</h3>
                    <div className="flex gap-2">
                      <button
                        className="ml-auto log-tool-button-2"
                        onClick={closeModal}
                      >
                        <TbX />
                      </button>
                    </div>
                  </div>
                  <div className="modal-container">{getModal()}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </OutsideClick>
      )}

      <Outlet />
    </>
  );
};

export default ModalWrapper;
