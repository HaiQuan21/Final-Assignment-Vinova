import Form from "../components/Form";
import {
  type CreateVoucherFormProps,
  type VoucherFormValues,
  initialValues,
  voucherFields,
} from "../constants/voucherFormProps";
import { voucherSchema } from "../schemas/voucherSchema";

interface Props extends CreateVoucherFormProps {
  isSubmitting?: boolean;
}

function CreateVoucherForm({ onSubmit, isSubmitting = false }: Props) {
  const handleSubmit = (values: VoucherFormValues) => {
    onSubmit(values);
  };

  return (
    <Form
      schema={voucherSchema}
      fields={voucherFields}
      defaultValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel="Create"
      submitClassName={`mt-2 w-full rounded-md px-4 py-3 font-semibold text-white transition ${
        isSubmitting
          ? "bg-[#3A0099]/60 cursor-not-allowed"
          : "bg-[#3A0099] hover:bg-[#2d0080]"
      }`}
      submitDisabled={isSubmitting}
    />
  );
}

export default CreateVoucherForm;