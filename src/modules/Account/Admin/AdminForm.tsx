import Form from "../../../components/Form";
import {
  createAdminFields,
  createInitialValues,
  getUpdateAdminFields,
  type AdminFormProps,
} from "./AdminFormProps";
import { createAdminSchema, updateAdminSchema } from "../../../schemas/adminSchemas";

function AdminForm({
  onSubmit,
  isSubmitting = false,
  defaultValues,
  targetAdminId, // ← nhận id của admin đang được edit
}: AdminFormProps) {
  const isEditMode = !!defaultValues;

  // ← build fields động theo targetAdminId
  const fields = isEditMode
    ? getUpdateAdminFields(targetAdminId)
    : createAdminFields;

  return (
    <Form
      schema={isEditMode ? updateAdminSchema : createAdminSchema}
      fields={fields}
      defaultValues={defaultValues ?? createInitialValues}
      onSubmit={onSubmit as any}
      submitLabel={isEditMode ? "Update" : "Create"}
      submitStyleType={isEditMode ? "save" : "create"}
      submitDisabled={isSubmitting}
    />
  );
}

export default AdminForm;