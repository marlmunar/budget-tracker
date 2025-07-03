import React, { useEffect, useRef, useState } from "react";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setModalState } from "../slices/appSlice";
import AddNewLog from "./Modals/AddNewLog";
import { AnimatePresence, motion } from "framer-motion";
import Rename from "./Modals/Rename";
import Delete from "./Modals/Delete";
import OutsideClick from "./OutsideClick";

const ModalWrapper = () => {
  const dispatch = useDispatch();
  const { showModal, activeModal, modalData } = useSelector(
    (state) => state.app
  );

  const modals = {
    addLog: <AddNewLog />,
    rename: <Rename name={modalData.name} />,
    delete: <Delete resource={modalData} />,
  };

  const getModal = () => modals[activeModal] || null;

  const closeModal = () => {
    dispatch(
      setModalState({
        showModal: false,
        activeModal: "",
        modalData: {},
      })
    );
  };

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

  useEffect(() => {
    const offset = 200;
    const element = scrollToRef.current;

    if (element) {
      const topPosition =
        element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  }, [showModal]);

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
                  className="sticky bg-white rounded p-4 top-[20%] min-w-[50%]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {getModal()}
                  <button
                    className="absolute top-4 right-4 text-2xl log-tool-button min-h-12 min-w-12"
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
