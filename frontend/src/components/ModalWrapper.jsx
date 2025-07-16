import React, { useEffect, useRef } from "react";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setModalState } from "../slices/appSlice";
import AddNewLog from "./Modals/AddNewLog";
import { AnimatePresence, flushKeyframeResolvers, motion } from "framer-motion";
import Rename from "./Modals/Rename";
import Delete from "./Modals/Delete";
import OutsideClick from "./OutsideClick";
import ConfirmExit from "./Modals/ConfirmExit";
import useNavigationBlocker from "../hooks/useNavigationBlocker";
import { setIsNotSaved } from "../slices/logSlice";

const ModalWrapper = () => {
  const dispatch = useDispatch();
  const { isNotSaved } = useSelector((state) => state.logs);
  const { blocker, confirm, cancel } = useNavigationBlocker(isNotSaved);

  useEffect(() => {
    if (blocker?.state === "blocked" && isNotSaved) {
      console.log(blocker);
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
    if (blocker.state === "blocked") {
      cancel();
    }
    dispatch(
      setModalState({
        showModal: false,
        activeModal: "",
        modalData: {},
      })
    );
  };

  const confirmNavigation = async () => {
    dispatch(setIsNotSaved(false));
    confirm();
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
        confirmNavigation={confirmNavigation}
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
