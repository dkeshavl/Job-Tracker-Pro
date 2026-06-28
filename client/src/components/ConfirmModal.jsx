function ConfirmModal({
  isOpen,
  title,
 message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-600 hover:bg-red-500",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="w-full max-w-md bg-[#111] border border-gray-700 rounded-2xl p-6 shadow-2xl">

        <h2 className="text-2xl font-bold text-white mb-3">
          {title}
        </h2>

        <p className="text-gray-400 mb-8">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-700 hover:bg-[#1a1a1a] transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-5 py-2 rounded-lg text-white transition ${confirmColor}`}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;