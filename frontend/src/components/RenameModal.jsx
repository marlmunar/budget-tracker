import { useState } from "react";
import Modal from "./Modal";

const RenameModal = ({
  isRenaming,
  setIsRenaming,
  displayName,
  setDisplayName,
  title,
  description,
}) => {
  const [tempName, setTempName] = useState(displayName);
  return (
    <Modal
      isOpen={isRenaming}
      onClose={() => setIsRenaming(false)}
      title={title}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsRenaming(false);
          setDisplayName(tempName);
        }}
        className="flex flex-col items-center gap-2 p-2"
      >
        <label htmlFor="tempName">{description}</label>
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
            onClick={() => setIsRenaming(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RenameModal;
