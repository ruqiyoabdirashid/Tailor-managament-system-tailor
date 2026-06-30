export default function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="p-4 bg-red-100 border">
      <p>Are you sure you want to delete?</p>

      <button onClick={onConfirm} className="bg-red-600 text-white px-3 py-1 mr-2">
        Yes
      </button>

      <button onClick={onCancel} className="bg-gray-500 text-white px-3 py-1">
        No
      </button>
    </div>
  );
}