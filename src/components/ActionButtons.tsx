import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";

interface ActionButtonsProps {
  onType?: string;
  onAction?: () => void;
  onDelete?: () => void;
}

function ActionButtons({ onType,onAction, onDelete }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="text-[#E879A9] transition focus:text-[#d1437f]"
          aria-label="View"
          >
          { onType === "article" && <CiEdit size={20}/> } 
          { onType === "voucher" && <HiOutlineEye size={20}/> }
        </button>
      )}
      

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="text-[#A0A7AC] transition focus:text-[#62676a]"
          aria-label="Delete"
        >
          <HiOutlineTrash size={20} />
        </button>
      )}
    </div>
  );
}

export default ActionButtons;