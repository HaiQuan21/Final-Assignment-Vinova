import Form from "../../../components/Form";
import {
  doulaUpdateFields,
  doulaUpdateInitialValues,
  type DoulaFormProps,
} from "./doulaFormProps";
import { doulaUpdateSchema } from "../../../schemas/doulaSchema";

function DoulaForm({ onSubmit, isSubmitting = false, defaultValues }: DoulaFormProps) {
  return (
    <Form
      schema={doulaUpdateSchema}
      fields={doulaUpdateFields}
      defaultValues={defaultValues ?? doulaUpdateInitialValues}
      onSubmit={onSubmit}
      submitLabel="Update"
      submitStyleType="save"
      submitDisabled={isSubmitting}
    />
  );
}

export default DoulaForm;