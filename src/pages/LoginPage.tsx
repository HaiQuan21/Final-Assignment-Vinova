import { useState } from "react";
import logo from "../assets/logo.svg";
import Form, { type FieldConfig, type FormValues } from "../components/Form";

const loginFields: FieldConfig[] = [
  {
    name: "username",
    label: "Username or email",
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
  const [values, setValues] = useState<FormValues>({
    username: "",
    password: ""
  });

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login:", values);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-8 flex flex-col items-center gap-4">
        <img src={logo} alt="CMS Logo" className="h-[93px] w-[101px]" />
        <h1 className="text-xl font-bold text-black">CMS Login</h1>
      </div>

      <Form
        fields={loginFields}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Login"
        submitClassName="mt-2 self-end rounded-md bg-indigo-700 px-6 py-2 font-bold text-white transition hover:bg-indigo-800"
      />
    </div>
  );
}

export default LoginPage;
