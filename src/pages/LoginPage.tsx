import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import logo from "../assets/logo.svg";
import Form from "../components/Form";
import { type FieldConfig } from "../constants/formTypes";
import { postLogin } from "../api/apiService";
import { loginSchema, type LoginFormValues, passwordRules } from "../schemas/loginSchema";

// PasswordChecklist tách ra dùng qua renderHint
function PasswordChecklist({ password }: { password: string }) {
  if (!password) return null;

  return (
    <div className="mt-2 rounded-xl bg-gray-50 px-4 py-3">
      <ul className="flex flex-col gap-2">
        {passwordRules.map((rule) => {
          const passed = rule.test(password);
          return (
            <li key={rule.label} className="flex items-center gap-2.5">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  passed
                    ? "border-green-600 text-green-600"
                    : "border-gray-300 text-gray-300"
                }`}
              >
                {passed ? (
                  // ✅ Icon tích xanh khi pass
                  <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  // ⚪ Circle xám khi chưa pass
                  <span className="h-2 w-2 rounded-full bg-gray-300" />
                )}
              </span>
              <span
                className={`text-sm transition-colors ${
                  passed ? "text-green-700" : "text-gray-500"
                }`}
              >
                {rule.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const loginFields: FieldConfig[] = [
  {
    name: "username",
    label: "Username or email",
    type: "text",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    // renderHint nhận value realtime từ Form — không cần useWatch ở LoginPage
    renderHint: (value) => <PasswordChecklist password={value} />,
  },
];

const defaultValues: LoginFormValues = {
  username: "",
  password: "",
};

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const { data } = await postLogin(values);
      const { admin, tokens } = data.data;

      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("currentUser", JSON.stringify(admin));

      toast.success(data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => navigate("/account"), 2000);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined) ??
          "Login failed. Please check your credentials."
        : "An unexpected error occurred.";
      toast.error(message);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-8 flex flex-col items-center gap-4">
        <img src={logo} alt="CMS Logo" className="h-[93px] w-[101px]" />
        <h1 className="text-xl font-bold text-black">CMS Login</h1>
      </div>

      <Form
        schema={loginSchema}
        fields={loginFields}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        submitLabel="Login"
        submitClassName="mt-2 self-end rounded-md bg-indigo-700 px-6 py-2 font-bold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}

export default LoginPage;