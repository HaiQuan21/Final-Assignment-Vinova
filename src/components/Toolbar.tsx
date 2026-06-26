import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SlideOver from "./SlideOver";
import ArticleForm from "../modules/Article/ArticleForm";
import CreateVoucherForm from "../modules/Voucher/CreateVoucherForm";
import type { ToolbarProps } from "../constants/formTypes";
import { useLocation, useSearchParams } from "react-router-dom";
import { useCreateArticle } from "../modules/Article/hooks/useCreateArticle";
import { useCreateVoucher } from "../modules/Voucher/hooks/useCreateVoucher";

export default function Toolbar({ title, formType }: ToolbarProps) {
  const {pathname} = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams,setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") ?? ""
  );

  //reset string trên searchbar khi qua một trang khác
  useEffect(()=>{
    setInputValue("");
    setSearchParams(
      (prev) => {
        prev.delete("search");
        prev.set("page", "1");
        return prev;
      },
      {replace: true}
    );
  },[pathname])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams(
        (prev) => {
          if (inputValue) {
            prev.set("search", inputValue);
          } else {
            prev.delete("search");
          }
          prev.set("page", "1");
          return prev;
        },
        { replace: true }
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const { handleCreate: handleCreateArticle, isSubmitting: isCreatingArticle } =
    useCreateArticle(() => setIsOpen(false)); // onSuccess đóng SlideOver

  const { handleCreate: handleCreateVoucher, isSubmitting: isCreatingVoucher } =
    useCreateVoucher(() => setIsOpen(false));

  const isSubmitting = isCreatingArticle || isCreatingVoucher;

  const renderForm = () => {
    if (formType === "article")
      return <ArticleForm onSubmit={handleCreateArticle} isSubmitting={isSubmitting} />;
    if (formType === "voucher")
      return <CreateVoucherForm onSubmit={handleCreateVoucher} isSubmitting={isSubmitting} />;
    return <p className="text-sm text-gray-500">Chưa có form tạo mới cho mục này.</p>;
  };

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 bg-white px-6 py-4 border-b-2">
        <span className="whitespace-nowrap text-gray-900 text-xl">{title}</span>

        <div className="relative w-full max-w-md flex-1">
          <input
            type="text"
            placeholder="Search"
            value={inputValue}
            className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
            onChange={(e)=>setInputValue(e.target.value)}
          />
          <FaSearch
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="whitespace-nowrap rounded-md bg-[#5B21B6] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4C1D95]"
        >
          Create {title}
        </button>
      </div>

      <SlideOver
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Create ${title}`}
      >
        {isOpen && renderForm()}
      </SlideOver>
    </>
  );
}
