import { TbSettings, TbEdit } from "react-icons/tb";
import Modal from "./Modal";
import { useState } from "react";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("User Name");
  const [tempName, setTempName] = useState(userName);

  return (
    <section className="flex flex-col border-2 border-slate-400 gap-4 items-start shadow-lg rounded p-4 lg:max-h-[12rem]">
      <div className="flex justify-between w-full">
        <h2 className="text-2xl font-semibold underline">{userName}</h2>
        <div className="flex gap-2 text-2xl items-center">
          <TbEdit
            className="transition-all duration-300 hover:text-amber-500"
            onClick={() => setIsModalOpen(true)}
          />
          <TbSettings className="transition-all duration-300 hover:text-amber-500" />
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Edit User Name"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
              setUserName(tempName);
            }}
            className="flex flex-col items-center gap-2 mx-10"
          >
            <label htmlFor="tempName">Update your user name:</label>
            <input
              type="text"
              name="tempName"
              className="form-input"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              autoComplete="off"
            />
            <div className="button-row">
              <button className="modal-button" type="submit">
                Save
              </button>
              <button
                className="modal-button"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      <div className="grid grid-row-4 grid-cols-2 gap-x-5 gap-y-1">
        <span className="font-semibold">Logs:</span>
        <span> 2</span>
        <span className="font-semibold">Monthly Income:</span>
        <span> 23,000</span>
        <span className="font-semibold">Monthly Expense:</span>
        <span> 21,892</span>
        <span className="font-semibold">Budgetarian Grade:</span>
        <span> Good</span>
      </div>
    </section>
  );
};

export default UserProfile;
