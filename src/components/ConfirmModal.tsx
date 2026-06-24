import { AiOutlineExclamationCircle } from "react-icons/ai";
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 shadow-xl">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <AiOutlineExclamationCircle className="text-red-500" size={28} />
          </div>
        </div>

        {/* Content */}
        <h3 className="mb-2 text-center text-lg font-bold text-gray-900">
          {title}
        </h3>
        <p className="mb-6 text-center text-sm text-gray-500">{message}</p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;