import Form from "../../components/Form";
import {
  type CreateVoucherFormProps,
  type VoucherFormValues,
  initialValues,
  voucherFields,
} from "./voucherFormProps";
import { voucherSchema } from "../../schemas/voucherSchema";

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
      submitStyleType="create"
      submitDisabled={isSubmitting}
    />
  );
}

export default CreateVoucherForm;