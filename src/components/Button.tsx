import type { ButtonHTMLAttributes, ReactNode } from "react";

// Khai báo tên button theo chức năng trong dự án
export type ButtonStyle =
  | "create"      
  | "login"       
  | "save"        
  | "cancel"      
  | "delete"      
  | "confirm"     
  | "toggle"      
  | "view"        
  | "back";       

const styleMap: Record<ButtonStyle, string> = {
  create:  "bg-[#5B21B6] text-white hover:bg-[#4C1D95] disabled:bg-[#5B21B6]/50",
  login:   "text-blue-500 hover:text-red-500",
  save:    "bg-[#3A0099] text-white hover:bg-[#270165] disabled:bg-[#3A0099]/50",
  cancel:  "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50",
  delete:  "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
  confirm: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
  toggle:  "bg-yellow-400 text-white hover:bg-yellow-500 disabled:bg-yellow-200",
  view:    "bg-transparent text-gray-600 hover:bg-gray-100 disabled:opacity-40",
  back:    "bg-transparent text-gray-600 hover:text-gray-900 disabled:opacity-40 px-0",
};

const sizeMap = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "px-5 py-2   text-sm rounded-md",
  lg: "px-6 py-3   text-base rounded-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType: ButtonStyle;       
  size?: keyof typeof sizeMap;  
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

function Button({
  styleType,
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = "",
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-colors duration-150 disabled:cursor-not-allowed
        ${styleType !== "back" ? sizeMap[size] : ""}
        ${styleMap[styleType]}
        ${className}
      `}
      {...rest}
    >
      {isLoading && (
        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}

export default Button;