import Modal from "./Modal";

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  handleConfirm,
  action,
  description,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={`Confirm ${action}`}
    >
      <div className="flex flex-col items-center gap-2 p-2">
        <p>{description}</p>
        <div className="button-row">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
