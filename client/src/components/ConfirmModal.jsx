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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-[#111] p-5 sm:p-6 shadow-2xl">

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
          {message}
        </p>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">

          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2 rounded-lg border border-gray-700 hover:bg-[#1a1a1a] transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`w-full sm:w-auto px-5 py-2 rounded-lg text-white transition ${confirmColor}`}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;