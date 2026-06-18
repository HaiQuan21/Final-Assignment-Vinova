import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import logo from "../assets/logo.svg";
import Form, { type FieldConfig, type FormValues } from "../components/Form";
import { postLogin } from "../api/apiService";

const loginFields: FieldConfig[] = [
  {
    name: "username",
    label: "User name or email",
    type: "text",
    required: true
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true
  }
];

function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await postLogin({
        username: values.username,
        password: values.password
      });

      const { admin, tokens } = data.data;
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("currentUser", JSON.stringify(admin));
      toast.success(data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      setTimeout(()=>(navigate("/account")),2000);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined) ??
          "Login failed. Please check your credentials."
        : "An unexpected error occurred. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-8 flex flex-col items-center gap-4">
        <img src={logo} alt="CMS Logo" className="h-[93px] w-[101px]" />
        <h1 className="text-xl font-bold text-black">CMS Login</h1>
      </div>

      <Form
        fields={loginFields.map((field) => ({ ...field, disabled: loading }))}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel={loading ? "Logging in..." : "Login"}
        submitClassName="mt-2 self-end rounded-md bg-indigo-700 px-6 py-2 font-bold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}

export default LoginPage;
