import { useEffect, useMemo, useState } from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import CommonTable from "../../components/CommonTable";
import StatusBadge from "../../components/StatusBadge";
import ActionButtons from "../../components/ActionButtons";
import { usePagination } from "../../hooks/usePagination";
import { getVouchers } from "./api/apiVoucher";
import { type Voucher } from "../../constants/MainObjectClass";
import { useSearchParams } from "react-router-dom";
import { size } from "zod";
import { useNavigate } from "react-router-dom";

function VoucherTable() {
  const [data, setData] = useState<Voucher[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(8);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  console.log("Data Voucher trả về", data);

  useEffect(() => {
    setIsLoading(true);
    getVouchers({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      search: search || undefined,
      sort:
        sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",") || undefined,
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
      })
      .finally(() => setIsLoading(false));
  }, [pagination.pageIndex, pagination.pageSize, sorting,search]);

  const columns = useMemo<ColumnDef<Voucher>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => (
          <span className="block max-w-[220px] break-words text-gray-500">
            {info.getValue<string>()}
          </span>
        ),size:170
      },
      { accessorKey: "code", header: "Code" ,size:170},
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusBadge status={info.getValue<string>()} />,
        size:170
      },
      { accessorKey: "startDate", header: "Start Date" ,size:170},
      { accessorKey: "endDate", header: "End Date" ,size:170},
      {
        cell: ({ row }) =>
          `${row.original.numOfUsed}/${row.original.quantityUse}`,
        header: "Number Of Use",
        enableSorting: false,
        size:170
      },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => (
          <ActionButtons
            onType={"voucher"}
            onAction={() => navigate(`/vouchers/${row.original.id}`)}
            onDelete={() => console.log("delete", row.original.id)}
          />
        ),
        size:170
      },
    ],
    [],
  );

  return (
    <div className="p-6">
      <CommonTable
        data={data}
        columns={columns}
        sorting={sorting}
        onSortingChange={(newSorting) => {
          setSorting(newSorting);
          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
        manualSorting
        pagination={pagination}
        onPaginationChange={setPagination}
        manualPagination
        totalEntries={totalEntries}
        pageSizeOptions={[8, 25, 50, 100]}
        isLoading={isLoading}
      />
    </div>
  );
}

export default VoucherTable;
