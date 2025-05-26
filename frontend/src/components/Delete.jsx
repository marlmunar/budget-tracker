import Modal from "./Modal";

const Delete = ({ isDeleting, setIsDeleting, description }) => {
  const handleDelete = () => {
    setIsDeleting(false);
    console.log("Deleting....");
  };
  return (
    <Modal
      isOpen={isDeleting}
      onClose={() => setIsDeleting(false)}
      title="Confirm Delete"
    >
      <div className="flex flex-col items-center gap-2 p-2">
        <p>{description}</p>
        <div className="button-row">
          <button onClick={handleDelete}>Confirm</button>
          <button onClick={() => setIsDeleting(false)}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default Delete;
