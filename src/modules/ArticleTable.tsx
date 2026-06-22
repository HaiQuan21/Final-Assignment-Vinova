import { useEffect, useMemo, useState } from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import CommonTable from "../components/CommonTable";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";
import { usePagination } from "../hooks/usePagination";
import { getAllArticles } from "../api/apiService";
import { type Article } from "../constants/MainObjectClass";

function ArticleTable() {
  const [data,setData] = useState<Article[]>([]);
  const [totalEntries,setTotalEntries] = useState(0);
  const [isLoading,setIsLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(8);
  console.log("Data Article trả về",data);
  useEffect(() => {
    setIsLoading(true);
    getAllArticles({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      sort: sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",") || undefined,
    })
    .then(({data: res})=>{
      setData(res.data);
      setTotalEntries(res.metadata.totalCount);
    })
    .finally(()=>setIsLoading(false));
  }, [pagination.pageIndex,pagination.pageSize,sorting])
  

  const columns = useMemo<ColumnDef<Article>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => (
          <span className="block max-w-[220px] break-words text-gray-500">
            {info.getValue<string>()}
          </span>
        ),
      },
      { accessorKey: "title", header: "Title" },
      { accessorKey: "author", header: "Author" },
      {accessorKey: "category.name", header: "Cateory"},
      { accessorKey: "createdAt", header: "Create Date" },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusBadge status={info.getValue<string>()} />,
      },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => (
          <ActionButtons
            onView={() => console.log("view", row.original.id)}
            onDelete={() => console.log("delete", row.original.id)}
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
        onSortingChange={(newSorting) => {
          setSorting(newSorting);
          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
        manualSorting
        pagination={pagination}
        onPaginationChange={setPagination}
        manualPagination
        totalEntries={totalEntries}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ArticleTable;