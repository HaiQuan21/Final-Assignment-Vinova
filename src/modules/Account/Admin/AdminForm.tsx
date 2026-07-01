import Form from "../../../components/Form";
import {
  createAdminFields,
  updateAdminFields,
  createInitialValues,
  type AdminFormProps,
} from "./AdminFormProps";
import {
  createAdminSchema,
  updateAdminSchema,
  type CreateAdminFormValues,
  type UpdateAdminFormValues,
} from "../../../schemas/adminSchemas";

function AdminForm({ onSubmit, isSubmitting = false, defaultValues }: AdminFormProps) {
  const isEditMode = !!defaultValues;

  const updateInitialValues: UpdateAdminFormValues = defaultValues ?? {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    status: "active",
    password: "",
  };

  return isEditMode ? (
    <Form
      schema={updateAdminSchema}
      fields={updateAdminFields}
      defaultValues={updateInitialValues}
      onSubmit={onSubmit as (values: UpdateAdminFormValues) => void}
      submitLabel="Update"
      submitClassName={`mt-2 w-full rounded-md px-4 py-3 font-semibold text-white transition ${
        isSubmitting ? "bg-[#3A0099]/60 cursor-not-allowed" : "bg-[#3A0099] hover:bg-[#270165]"
      }`}
      submitDisabled={isSubmitting}
    />
  ) : (
    <Form
      schema={createAdminSchema}
      fields={createAdminFields}
      defaultValues={createInitialValues}
      onSubmit={onSubmit as (values: CreateAdminFormValues) => void}
      submitLabel="Create"
      submitClassName={`mt-2 w-full rounded-md px-4 py-3 font-semibold text-white transition ${
        isSubmitting ? "bg-[#3A0099]/60 cursor-not-allowed" : "bg-[#3A0099] hover:bg-[#270165]"
      }`}
      submitDisabled={isSubmitting}
    />
  );
}

export default AdminForm;