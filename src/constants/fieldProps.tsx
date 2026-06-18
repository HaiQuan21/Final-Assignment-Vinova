export type InputFieldType = "text" | "email" | "password" | "number" | "tel";

export interface FieldInputSingleProps {
  label: string;
  type?: InputFieldType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  placeholder?: string;
  suffix?: string; //các kí tự đặc biệt hiện bên phải
  maxLength?: number; //số đếm kí tự
}

export interface FieldTextAreaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export interface FieldDateProps {
  label: string;
  value: string; // format yyyy-mm-dd theo input type="date"
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
  isClearable?: boolean;
}
