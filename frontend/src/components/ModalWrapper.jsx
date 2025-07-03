import React, { useState } from "react";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setModalState } from "../slices/appSlice";

const ModalWrapper = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.app);
  const { activeModal } = useSelector((state) => state.app);
  return (
    <div>
      {showModal ? (
        <>
          <div
            className="mt-[-5px] z-20 flex justify-center items-center absolute h-[calc(100%+5px)] w-full bg-gray-300/75 text-5xl"
            onClick={() =>
              dispatch(setModalState({ showModal: false, activeModal: "" }))
            }
          >
            <p className="sticky top-0">I am the modal! WAHAHAHA</p>
          </div>
          <Outlet />
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default ModalWrapper;
