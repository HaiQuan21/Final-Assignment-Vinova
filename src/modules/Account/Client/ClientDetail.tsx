import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiPencil } from "react-icons/hi";
import { useState } from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import StatusBadge from "../../../components/StatusBadge";
import CommonTable from "../../../components/CommonTable";
import TabBar from "../../../components/Tabbar";
import { useGetUserById } from "./hooks/useGetUserById";
import { usePagination } from "../../../hooks/usePagination";
import { formatDate } from "../../../lib/formatDate";

// ── Mock packages ─────────────────────────────────────────────────────────────
const mockPackages: {
  packageName: string;
  doulaFullName: string;
  startDate: string;
  status: string;
}[] = [];

// ── Tab: Packages ─────────────────────────────────────────────────────────────
function PackagesTab() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(25);

  const columns: ColumnDef<(typeof mockPackages)[0]>[] = [
    { accessorKey: "packageName", header: "Package Name", size: 350 },
    { accessorKey: "doulaFullName", header: "Doulas Full Name", size: 350 },
    {
      accessorKey: "startDate",
      header: "Start Date",
      size: 280,
      cell: (info) => formatDate(false,info.getValue<string>()),
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 200,
      cell: (info) => <StatusBadge status={info.getValue<string>()} />,
    },
  ];

  return (
    <CommonTable
      data={mockPackages}
      columns={columns}
      sorting={sorting}
      onSortingChange={setSorting}
      pagination={pagination}
      onPaginationChange={setPagination}
      manualPagination={false}
      pageSizeOptions={[10, 25, 50]}
      FIXED_ROW_COUNT={8}
      emptyMessage="No Results"
    />
  );
}

// ── Main: ClientDetail ────────────────────────────────────────────────────────
function ClientDetail() {
  const navigate = useNavigate();
  const { data: client, isLoading } = useGetUserById();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!client) return null;

  return (
    <div className="flex flex-col">
      {/* Back + Edit */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => navigate("/account/client")}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <HiArrowLeft size={18} />
          Back
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm font-medium text-[#E879A9] transition hover:text-[#d1437f]"
        >
          <HiPencil size={16} />
          Edit
        </button>
      </div>

      {/* Client info card */}
      <div className="mx-6 mb-4 rounded-xl border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-wrap items-center gap-6">
          {/* Avatar */}
          {client.picture?.uri ? (
            <img
              src={client.picture.uri}
              alt={client.fullName}
              className="h-14 w-14 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    client.fullName
                  )}&background=e2e8f0&color=64748b`;
              }}
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-gray-400">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          )}

          {/* Info fields */}
          <div className="flex flex-wrap gap-x-10 gap-y-2">
            <div>
              <p className="text-xs text-gray-400">Full name</p>
              <p className="font-semibold text-gray-800">{client.fullName || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <span className="font-semibold text-gray-800"><StatusBadge status={client.status} /></span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="font-semibold text-sm text-gray-700">
                {client.email || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p className="font-semibold text-sm text-gray-700">
                {client.phoneNumber
                  ? `${client.countryCode ?? ""} ${client.phoneNumber}`
                  : "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Birthday</p>
              <p className="font-semibold text-sm text-gray-700">
                {formatDate(true,client.birthDate)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Address</p>
              <p className="font-semibold text-sm text-gray-700 max-w-xs">
                {client.address?.fullAddress || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TabBar */}
      <div className="mx-6">
        <TabBar
          tabs={[
            {
              label: "Packages",
              content: <PackagesTab />,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ClientDetail;