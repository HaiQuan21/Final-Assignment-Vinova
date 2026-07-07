import Form from "../../../components/Form";
import { clientUpdateSchema } from "../../../schemas/clientSchemas";
import { clientUpdateFields } from "./clientFormProps";
import type { ClientFormProps } from "./clientFormProps";

function ClientForm({ onSubmit, isSubmitting = false, defaultValues }: ClientFormProps) {
  return (
    <Form
      schema={clientUpdateSchema}
      fields={clientUpdateFields}
      defaultValues={
        defaultValues ?? { countryCode: "+61", phoneNumber: "", status: "active" }
      }
      onSubmit={onSubmit}
      submitLabel="Update"
      submitStyleType="save"
      submitDisabled={isSubmitting}
    />
  );
}

export default ClientForm;