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