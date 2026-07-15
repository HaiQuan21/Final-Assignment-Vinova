import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/CommonTable";
import StatusBadge from "../../../components/StatusBadge";
import ActionButtons from "../../../components/ActionButtons";
import SlideOver from "../../../components/SlideOver";
import ConfirmModal from "../../../components/ConfirmModal";
import FormSkeleton from "../../../components/FormSkeleton";
import ClientForm from "./ClientForm";
import { useGetListClient } from "./hooks/useGetListClient";
import { useUpdateClientById } from "./hooks/useUpdateClientById";
import { useDeleteClientById } from "./hooks/useDeleteClientById";
import type { Client } from "../../../constants/MainObjectClass";
import { formatDate } from "../../../lib/formatDate";
import { useTableParams } from "../../../hooks/useTableParams";

const clientFormFields = [
  { name: "phoneNumber", label: "Phone Number", type: "phone" as const, countryCodeName: "countryCode" },
  { name: "status", label: "Status", type: "select" as const, options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

function ClientTable() {
  const navigate = useNavigate();

  const { data, totalEntries, isLoading, fetchListClient } = useGetListClient();
  const { pagination, setPagination, sorting, setSorting } = useTableParams(25);
  
  const {
    editOpen, editingClient, isSubmitting: isEditing, isFetching,
    toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
  } = useUpdateClientById(fetchListClient);

  const {
    deleteModalOpen, deletingClient, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  } = useDeleteClientById(fetchListClient);

  const columns = useMemo<ColumnDef<Client>[]>(
    () => [
      // ── Avatar ────────────────────────────────────────────────────────
      {
        id: "avatar",
        header: "Avatar",
        size: 80,
        enableSorting: false,
        cell: ({ row }) => {
          const uri = row.original.picture?.metadata?.medium?.uri
            ?? row.original.picture?.uri;
          const name = row.original.fullName ?? "?";
          return uri ? (
            <img
              src={uri}
              alt={name}
              className="h-10 w-10 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e2e8f0&color=64748b`;
              }}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-400">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          );
        },
      },
      // ── Full name ──────────────────────────────────────────────────────
      {
        id: "fullName",
        header: "Full name",
        size: 200,
        cell: ({ row }) => (
          <span className="font-medium text-gray-800">
            {row.original.fullName || "-"}
          </span>
        ),
      },
      // ── Email ─────────────────────────────────────────────────────────
      {
        accessorKey: "email",
        header: "Email",
        size: 220,
        cell: (info) => (
          <span className="text-gray-600">{info.getValue<string>() || "-"}</span>
        ),
      },
      // ── Phone number ──────────────────────────────────────────────────
      {
        id: "phoneNumber",
        header: "Phone number",
        size: 220,
        enableSorting: false,
        cell: ({ row }) => {
          const cc = row.original.countryCode ?? "";
          const phone = row.original.phoneNumber ?? "";
          return (
            <span className="text-gray-600">
              {phone ? `${cc} ${phone}` : "-"}
            </span>
          );
        },
      },
      // ── Birthday ──────────────────────────────────────────────────────
      {
        accessorKey: "birthDate",
        header: "Birthday",
        size: 200,
        cell: (info) => formatDate(true,info.getValue<string>()),
      },
      // ── Address ───────────────────────────────────────────────────────
      {
        id: "address",
        header: "Address",
        size: 260,
        enableSorting: false,
        cell: ({ row }) => (
          <span className="line-clamp-2 text-gray-600">
            {row.original.address?.fullAddress || "-"}
          </span>
        ),
      },
      // ── Created Date ──────────────────────────────────────────────────
      {
        accessorKey: "createdAt",
        header: "Created Date",
        size: 220,
        cell: (info) => formatDate(false,info.getValue<string>()),
      },
      // ── Last Access — API chưa có field này ───────────────────────────
      {
        id: "lastAccess",
        header: "Last Access",
        size: 220,
        enableSorting: false,
        cell: () => <span className="text-gray-400">-</span>,
      },
      // ── Status ────────────────────────────────────────────────────────
      {
        accessorKey: "status",
        header: "Status",
        size: 220,
        cell: (info) => <StatusBadge status={info.getValue<string>()} />,
      },
      // ── Action ────────────────────────────────────────────────────────
      {
        id: "action",
        header: "Action",
        size: 120,
        enableSorting: false,
        cell: ({ row }) => (
          <ActionButtons
            onView={() =>
              navigate(`/account/client/${row.original.id}`, {
                state: { detailLabel: row.original.fullName },
              })
            }
            onEdit={() => handleEditClick(row.original)}
            onDelete={() => handleDeleteClick(row.original)}
          />
        ),
      },
    ],
    []
  );

  return (
    <div className="p-6">
      <CommonTable
        data={data}
        columns={columns}
        sorting={sorting}
        onSortingChange={setSorting}
        manualSorting
        pagination={pagination}
        onPaginationChange={setPagination}
        manualPagination
        totalEntries={totalEntries}
        pageSizeOptions={[10, 25, 50, 100]}
        isLoading={isLoading}
        FIXED_ROW_COUNT={8}
        emptyMessage="No clients found"
      />

      {/* Edit SlideOver */}
      <SlideOver isOpen={editOpen} onClose={handleEditClose} title="Update Client">
        {isFetching ? (
          <FormSkeleton fields={clientFormFields} />
        ) : editingClient ? (
          <ClientForm
            onSubmit={(values) =>
              handleEditSubmit({
                firstName: editingClient.firstName,
                middleName: editingClient.middleName ?? "",
                lastName: editingClient.lastName,
                picture: editingClient.picture?.uri ?? "",
                birthDate: editingClient.birthDate,
                email: editingClient.email,
                phoneNumber: values.phoneNumber,
                status: values.status,
                verifiedEmail: editingClient.verifiedEmail,
                countryCode: values.countryCode,
                verifiedPhoneNumber: editingClient.verifiedPhoneNumber,
              })
            }
            isSubmitting={isEditing}
            defaultValues={{
              countryCode: editingClient.countryCode ?? "+61",
              phoneNumber: editingClient.phoneNumber ?? "",
              status: editingClient.status,
            }}
          />
        ) : null}
      </SlideOver>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Client?"
        message={`Are you sure you want to delete "${deletingClient?.fullName}"?`}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}

export default ClientTable;