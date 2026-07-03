import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";

interface ActionButtonsProps {
  onType?: string;
  onAction?: () => void;
  onDelete?: () => void;
  deleteDisabled?: boolean; //disabled icon thùng rác
}

function ActionButtons({ onType, onAction, onDelete,deleteDisabled = false}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="text-[#E879A9] transition focus:text-[#d1437f]"
          aria-label="Action"
        >
          {onType === "article" && <CiEdit size={20} />}
          {onType === "voucher" && <HiOutlineEye size={20} />}
          {onType === "admin" && <CiEdit size={20} />}
          {onType === "category" && <CiEdit size={20} /> }
        </button>
      )}

      {onDelete && (
        <button
        type="button"
        onClick={deleteDisabled ? undefined : onDelete}
        disabled={deleteDisabled}
        className={`transition ${
          deleteDisabled
            ? "cursor-not-allowed text-gray-200" 
              : "text-[#A0A7AC] hover:text-red-400"
        }`}
        aria-label="Delete"
      >
        <HiOutlineTrash size={20} />
      </button>
      )}
    </div>
  );
}

export default ActionButtons;
