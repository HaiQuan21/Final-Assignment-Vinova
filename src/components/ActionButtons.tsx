import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";

interface ActionButtonsProps {
  onView?: () => void;
  onDelete?: () => void;
}

function ActionButtons({ onView, onDelete }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
      {onView && (
        <button
          type="button"
          onClick={onView}
          className="text-[#E879A9] transition hover:text-[#d1437f]"
          aria-label="View"
        >
          <HiOutlineEye size={20} />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="text-[#E879A9] transition hover:text-[#d1437f]"
          aria-label="Delete"
        >
          <HiOutlineTrash size={20} />
        </button>
      )}
    </div>
  );
}

export default ActionButtons;