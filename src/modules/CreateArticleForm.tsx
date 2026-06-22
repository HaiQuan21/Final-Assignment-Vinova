import { useState, type FormEvent } from "react";
import Form from "../components/Form";
import { type FormErrors } from "../constants/formTypes";
import {
  type CreateArticleFormProps,
  type ArticleFormValues,
  initialValues,
  requiredFields,
  articleFields,
} from "../constants/articleFormProps";
import { getAllCategories } from "../api/apiService";
import { useEffect,useMemo } from "react";
import {toast} from "react-toastify"
interface Props extends CreateArticleFormProps {
  isSubmitting?: boolean;
}

function CreateArticleForm({ onSubmit, isSubmitting = false }: Props) {
  const [values, setValues] = useState<ArticleFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    getAllCategories()
      .then(({ data: res }) => {
        const options = res.data.map((cat: { name: string }) => ({
          value: cat.name,
          label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1).toLowerCase(),
        }));
        setCategoryOptions(options);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ?? "Failed to load list of lists."
        );
      });
  }, []);

  // Rebuild fields mỗi khi categoryOptions thay đổi
  const reBuildArticleFields = useMemo(
    () => articleFields(categoryOptions),
    [categoryOptions]
  );

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: FormErrors = {};
    requiredFields.forEach((field) => {
      if (!values[field].trim()) nextErrors[field] = "This field is required";
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit(values);
  };

  return (
    <Form
      fields={reBuildArticleFields}
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Create"
      submitClassName="mt-2 w-full rounded-md bg-[#3A0099] px-4 py-3 font-semibold text-white transition hover:bg-[#2d0080]"
      submitDisabled={isSubmitting}
    />
  );
}

export default CreateArticleForm;
