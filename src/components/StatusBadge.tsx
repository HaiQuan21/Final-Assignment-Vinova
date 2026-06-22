interface StatusBadgeProps {
  status: string; // generic để dùng chung cho Voucher (Active/Expired), Article (Published/Draft)...
}

const statusColorMap: Record<string, string> = {
  active: "bg-green-500",
  published: "bg-green-500",
  unpublished: "bg-red-500",
  draft: "bg-yellow-500",
  inactive: "bg-yellow-500",
  expired: "bg-red-500",
};

function StatusBadge({ status }: StatusBadgeProps) {
  const dotColor = statusColorMap[status.toLowerCase()] ?? "bg-gray-400";

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-gray-700">
      <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
}

export default StatusBadge;
