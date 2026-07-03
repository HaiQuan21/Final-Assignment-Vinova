import Form from "../../components/Form";
import {
  categoryFields,
  categoryInitialValues,
  type CategoryFormProps,
} from "./categoryFormProps";
 import { categorySchema } from "../../schemas/categorySchema";

function CategoryForm({
  onSubmit,
  isSubmitting = false,
  defaultValues,
}: CategoryFormProps) {
  const isEditMode = !!defaultValues;

  return (
    <Form
      schema={categorySchema}
      fields={categoryFields}
      defaultValues={defaultValues ?? categoryInitialValues}
      onSubmit={onSubmit}
      submitLabel={isEditMode ? "Save Changes" : "Create"}
      submitClassName={`mt-2 w-full rounded-md px-4 py-3 font-semibold text-white transition ${
        isSubmitting
          ? "bg-[#3A0099]/60 cursor-not-allowed"
          : "bg-[#3A0099] hover:bg-[#270165]"
      }`}
      submitDisabled={isSubmitting}
    />
  );
}

export default CategoryForm;