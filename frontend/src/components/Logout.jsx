import Modal from "./Modal";

const Logout = ({
  isLoggingOut,
  setIsLoggingOut,
  handleConfirm,
  description,
}) => {
  return (
    <Modal
      isOpen={isLoggingOut}
      onClose={() => setIsLoggingOut(false)}
      title="Confirm Logout"
    >
      <div className="flex flex-col items-center gap-2 p-2">
        <p>{description}</p>
        <div className="button-row">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={() => setIsLoggingOut(false)}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default Logout;
