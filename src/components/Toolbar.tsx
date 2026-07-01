import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SlideOver from "./SlideOver";
import ArticlePDForm from "../modules/ArticlePD/ArticlePDForm";
import CreateVoucherForm from "../modules/Voucher/CreateVoucherForm";
import AdminForm from "../modules/Account/Admin/AdminForm";
import type { ToolbarProps } from "../constants/formTypes";
import { useLocation, useSearchParams } from "react-router-dom";
import { useCreateArticlePD } from "../modules/ArticlePD/hooks/useCreateArticlePD";
import { useCreateVoucher } from "../modules/Voucher/hooks/useCreateVoucher";
import { useCreateAdmin } from "../modules/Account/Admin/hooks/useCreateAdmin";

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
  //Create Article
  const { handleCreate: handleCreateArticle, isSubmitting: isCreatingArticle } =
  useCreateArticlePD("article",() => setIsOpen(false)); 

  //Create PD
  const { handleCreate: handleCreatePD, isSubmitting: isCreatingPD } =
  useCreateArticlePD("pd",() => setIsOpen(false));
  //Create Admin
  const { handleCreate: handleCreateAdmin, isSubmitting: isCreatingAdmin } =
  useCreateAdmin(() => {
    setIsOpen(false);
  });
  //Create Voucher
  const { handleCreate: handleCreateVoucher, isSubmitting: isCreatingVoucher } =
    useCreateVoucher(() => setIsOpen(false));

  const isSubmitting = isCreatingArticle || isCreatingVoucher || isCreatingPD;

  const renderForm = () => {
    switch (formType) {
      case "article":
        return <ArticlePDForm onSubmit={handleCreateArticle} isSubmitting={isSubmitting} />;
        break;
      case "voucher":
        return <CreateVoucherForm onSubmit={handleCreateVoucher} isSubmitting={isSubmitting} />;
        break;
      case "pd":
        return <ArticlePDForm onSubmit={handleCreatePD} isSubmitting={isSubmitting} />;
        break;
      case "admin":
        return <AdminForm onSubmit={handleCreateAdmin} isSubmitting={isSubmitting} />;
        break;
      default:
        return <p className="text-sm text-gray-500">Chưa có form tạo mới cho mục này.</p>;
        break;
    }
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
