import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import NoAccountRoute from "./routes/ProtectedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import Loading from "./components/Loading";

export default function App() {
  const Login = lazy(() => import("./pages/LoginPage"));

  const SignUp = lazy(() => import("./pages/SignUpPage"));

  const NotFound = lazy(()=> import("./pages/NotFoundPage"))

  const Account = lazy(()=>import("./modules/Account"));

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
        <Route element={<ProtectedRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          
            <Route element={<MainLayout />}>
              <Route path="/account" element={<Account />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
