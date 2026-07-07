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
import CategoryForm from "../modules/Category/CategoryForm";
import { useCreateCategories } from "../modules/Category/hooks/useCreateCategories";
import Button from "./Button";
import Breadcrumbs from "./Breadcrumb";
import type { BreadcrumbItem } from "./Breadcrumb";

export default function Toolbar({
  title,
  formType,
  breadcrumbs = [],
  isDetailPage = false,
}: ToolbarProps) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") ?? "",
  );

  //reset string trên searchbar khi qua một trang khác
  useEffect(() => {
    setInputValue("");
    setSearchParams(
      (prev) => {
        prev.delete("search");
        prev.set("page", "1");
        return prev;
      },
      { replace: true },
    );
  }, [pathname]);

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
        { replace: true },
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue]);
  //Create Article
  const { handleCreate: handleCreateArticle, isSubmitting: isCreatingArticle } =
    useCreateArticlePD("article", () => setIsOpen(false));

  //Create PD
  const { handleCreate: handleCreatePD, isSubmitting: isCreatingPD } =
    useCreateArticlePD("pd", () => setIsOpen(false));
  //Create Admin
  const { handleCreate: handleCreateAdmin, isSubmitting: isCreatingAdmin } =
    useCreateAdmin(() => {
      setIsOpen(false);
    });
  //Create Voucher
  const { handleCreate: handleCreateVoucher, isSubmitting: isCreatingVoucher } =
    useCreateVoucher(() => setIsOpen(false));

  //Create Category
  const {
    handleCreate: handleCreateCategory,
    isSubmitting: isCreatingCategory,
  } = useCreateCategories(() => setIsOpen(false));

  const renderForm = () => {
    switch (formType) {
      case "article":
        return (
          <ArticlePDForm
            onSubmit={handleCreateArticle}
            isSubmitting={isCreatingArticle}
          />
        );
        break;
      case "voucher":
        return (
          <CreateVoucherForm
            onSubmit={handleCreateVoucher}
            isSubmitting={isCreatingVoucher}
          />
        );
        break;
      case "pd":
        return (
          <ArticlePDForm
            onSubmit={handleCreatePD}
            isSubmitting={isCreatingPD}
          />
        );
        break;
      case "admin":
        return (
          <AdminForm
            onSubmit={handleCreateAdmin}
            isSubmitting={isCreatingAdmin}
          />
        );
        break;
      case "category":
        return (
          <CategoryForm
            onSubmit={handleCreateCategory}
            isSubmitting={isCreatingCategory}
          />
        );
      default:
        return (
          <p className="text-sm text-gray-500">
            Chưa có form tạo mới cho mục này.
          </p>
        );
        break;
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 bg-white px-6 py-4 border-b-2">
        {breadcrumbs.length > 1 ? (
          <Breadcrumbs items={breadcrumbs} />
        ) : (
          <span className="whitespace-nowrap text-xl text-gray-900">
            {title}
          </span>
        )}

        {!isDetailPage && (
          <>
            <div className="relative w-full max-w-md flex-1">
              <input
                type="text"
                placeholder="Search"
                value={inputValue}
                className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <FaSearch
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            <Button
              styleType="create"
              onClick={() => setIsOpen(true)}
              size="lg"
            >
              Create {title}
            </Button>
          </>
        )}
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
