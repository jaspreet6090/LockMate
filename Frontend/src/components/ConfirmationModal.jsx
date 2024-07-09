const ConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-lg font-semibold mb-2">Confirm Deletion</p>
        <p className="mb-4">Are you sure you want to delete this password?</p>
        <div className="flex justify-end">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose(false);
              onDelete();
            }}
            className="px-4 py-2 bg-red text-white hover:bg-red-600 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export { ConfirmationModal};