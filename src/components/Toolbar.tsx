import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import SlideOver from "./SlideOver";
import CreateArticleForm from "../modules/CreateArticleForm";
import CreateVoucherForm from "../modules/CreateVoucherForm";
import type { ToolbarProps } from "../constants/formTypes";
import { createArticles,createVoucher } from "../api/apiService";
import type { FormType } from  "../constants/navigation"
import type { ArticleFormValues } from "../constants/articleFormProps";
import type { VoucherFormValues } from "../constants/voucherFormProps";

export default function Toolbar({ title, formType }: ToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);

  const handleCreateArticle = (values: ArticleFormValues) => {
    setIsSubmitting(true);

    createArticles({
      title: values.title,
      content: values.content,
      picture: values.image,
      status: values.status,
      author: values.author,
      categoryId: values.category,
      timeToRead: Number(values.duration) || 0, // "3" → 3, "3 mins" → 0
      type: "article", 
    })
      .then((res) => {
        toast.success(res.data.message);
        setIsOpen(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred Create Article, please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleCreateVoucher = (values: VoucherFormValues) => {
    setIsSubmitting(true);

    createVoucher({
      code: values.code,
      description: values.description,
      startDate: values.startDate,
      endDate: values.endDate,
      status: "active",
      type: values.typeOfCoupon,
      amount: Number(values.amount),
      quantityUse: Number(values.quantity),
      minPayAmount: Number(values.condition),
      maxDiscountAmount: Number(values.conditionMaxDiscount),
    })
      .then((res) => {
        toast.success(res.data.message);
        setIsOpen(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred Create Voucher, please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };


  const renderForm = () => {
    if (formType === "article")
      return <CreateArticleForm onSubmit={handleCreateArticle} isSubmitting={isSubmitting}/>;
    if (formType === "voucher")
      return <CreateVoucherForm onSubmit={handleCreateVoucher} isSubmitting={isSubmitting}/>;
    return (
      <p className="text-sm text-gray-500">Chưa có form tạo mới cho mục này.</p>
    );
  };

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 bg-white px-6 py-4 border-b-2">
        <span className="whitespace-nowrap text-gray-900 text-xl">{title}</span>

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
        {renderForm()}
      </SlideOver>
    </>
  );
}
