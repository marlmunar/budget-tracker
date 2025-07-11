import React, { act, useCallback, useEffect, useRef, useState } from "react";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setModalState } from "../slices/appSlice";
import AddNewLog from "./Modals/AddNewLog";
import { AnimatePresence, motion } from "framer-motion";
import Rename from "./Modals/Rename";
import Delete from "./Modals/Delete";
import OutsideClick from "./OutsideClick";
import ConfirmExit from "./Modals/ConfirmExit";
import useNavigationBlocker from "../hooks/useNavigationBlocker";

const ModalWrapper = () => {
  const dispatch = useDispatch();
  const { isNotSaved } = useSelector((state) => state.logs);
  const [pendingTx, setPendingTx] = useState(null);
  const { showModal, activeModal, modalData } = useSelector(
    (state) => state.app
  );

  const blocker = useCallback((tx) => {
    setPendingTx(tx);
    setModalState({
      showModal: true,
      activeModal: "ConfirmExit",
    });
  }, []);

  useNavigationBlocker(blocker, isNotSaved);

  const closeModal = () => {
    if (pendingTx) {
      setPendingTx(null);
    }
    dispatch(
      setModalState({
        showModal: false,
        activeModal: "",
        modalData: {},
      })
    );
  };

  const modals = {
    addLog: <AddNewLog closeModal={closeModal} />,
    rename: (
      <Rename name={modalData.name} id={modalData.id} closeModal={closeModal} />
    ),
    delete: <Delete resource={modalData} closeModal={closeModal} />,
    confirmExit: (
      <ConfirmExit
        closeModal={closeModal}
        pendingTx={pendingTx}
        setPendingTx={setPendingTx}
      />
    ),
  };

  const getModal = () => modals[activeModal] || null;

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

  // useEffect(() => {
  //   const offset = 200;
  //   const element = scrollToRef.current;

  //   if (element) {
  //     const topPosition =
  //       element.getBoundingClientRect().top + window.scrollY - offset;

  //     window.scrollTo({
  //       top: topPosition,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [showModal]);

  return (
    <>
      {showModal && (
        <OutsideClick onOutsideClick={closeModal}>
          <div
            className="mt-[-5px] z-20 absolute h-[calc(100%+5px)] w-full bg-gray-300/75 outline-none"
            onClick={closeModal}
            ref={scrollToRef}
            tabIndex={-1}
          >
            <div className="relative w-full h-full flex justify-center items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{ duration: 0.3 }}
                  className="sticky rounded p-2 md:p-4 top-[20%] bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  {getModal()}
                  <button
                    className="absolute top-4 right-4 modal-button"
                    onClick={closeModal}
                  >
                    <TbX />
                  </button>
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
