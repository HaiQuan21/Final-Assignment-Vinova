import ReactPaginate from "react-paginate";
import { HiChevronLeft, HiChevronRight, HiChevronDown } from "react-icons/hi";

interface PaginationProps {
  currentPage: number; // 1-based
  pageSize: number;
  totalEntries: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

function Pagination({
  currentPage,
  pageSize,
  totalEntries,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
}: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(totalEntries / pageSize));
  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-1 py-4 text-sm text-gray-500">
      <span>
        showing {startEntry} to {endEntry} of {totalEntries} entries.
      </span>

      <div className="flex items-center gap-4">
        {/* Per page select */}
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="appearance-none rounded-md border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm text-gray-700 outline-none transition focus:border-gray-400"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
          <HiChevronDown
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>

        {/* Page numbers */}
        <ReactPaginate
          forcePage={currentPage - 1}
          pageCount={pageCount}
          onPageChange={(selected) => onPageChange(selected.selected + 1)}
          previousLabel={<HiChevronLeft size={16} />}
          nextLabel={<HiChevronRight size={16} />}
          breakLabel="..."
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          containerClassName="flex items-center gap-1"
          pageLinkClassName="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 transition hover:bg-gray-100"
          activeLinkClassName="!bg-[#3A0099] !text-white hover:!bg-[#3A0099]"
          previousLinkClassName="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100"
          nextLinkClassName="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100"
          breakLinkClassName="flex h-8 w-8 items-center justify-center text-gray-400"
          disabledLinkClassName="pointer-events-none opacity-40"
        />
      </div>
    </div>
  );
}

export default Pagination;