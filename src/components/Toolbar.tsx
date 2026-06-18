import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SlideOver from "./SlideOver";
import CreateArticleForm from "../modules/CreateArticleForm";
import CreateVoucherForm from "../modules/CreateVoucherForm";
import type { FormType } from "../constants/navigation";

interface ToolbarProps {
    title: string;
    formType?: FormType;
  }
export default function Toolbar({title,formType}:ToolbarProps) {
  const [isOpen,setIsOpen] = useState(false);

  const handleCreated = (value: unknown)=>{
    setIsOpen(false);
  }

  const renderForm = () =>{
    if(formType === "article") return <CreateArticleForm/>
    if(formType === 'voucher') return <CreateVoucherForm onSubmit={handleCreated}/>
    return <p className="text-sm text-gray-500">Chưa có form tạo mới cho mục này.</p>;
  };

  return (
    <>
    <div className="flex w-full items-center justify-between gap-4 bg-white px-6 py-4 border-b-2">
      {/* Title */}
      <span className="whitespace-nowrap text-gray-900 text-xl">{title}</span>

      {/* Search input */}
      <div className="relative w-full max-w-md flex-1">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
        />
        <FaSearch 
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>

      {/* Create button */}
      <button
        type="button"
        className="whitespace-nowrap rounded-md bg-[#5B21B6] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4C1D95]"
      >
        Create {title}
      </button>
    </div>
      <SlideOver isOpen={isOpen} onClose={()=>setIsOpen(false)} title={`Create ${title}`}>
        {renderForm()}
      </SlideOver>
    </>
  );
}