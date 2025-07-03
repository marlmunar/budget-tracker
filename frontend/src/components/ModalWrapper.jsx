import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const ModalWrapper = () => {
  const { showModal } = useSelector((state) => state.app);
  const { activeModal } = useSelector((state) => state.app);
  return (
    <div>
      {showModal ? (
        <>
          <div className="mt-[-5px] z-20 flex justify-center items-center absolute h-[calc(100%+5px)] w-full bg-gray-300/75 text-5xl">
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
