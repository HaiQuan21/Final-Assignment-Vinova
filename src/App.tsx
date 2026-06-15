import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import NoAccountRoute from "./routes/NoAccountRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";

export default function App() {
  const Login = lazy(() => import("./pages/LoginPage"));

  const SignUp = lazy(() => import("./pages/SignUpPage"));

  const NotFound = lazy(()=> import("./pages/NotFoundPage"))
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<NoAccountRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/signup" element={<SignUp />} />

              <Route path="/login" element={<Login />} />
            </Route>
          </Route>

          {/* Authenticated Only */}
          <Route element={<ProtectedRoute />}>
            {/* <Route element={<DashBoardPageLayout />}>
              <Route path="/" element={<Dashboard />} />

              <Route path="/users" element={<Users />} />

              <Route path="/posts" element={<Posts />} />

              <Route path="/comments" element={<Comments />} />

              <Route path="/albums" element={<Albums />} />

              <Route path="/usememo" element={<UseMemo />} />

              <Route path="/usecallback" element={<UseCallback />} />

              <Route path="/useref" element={<UseRef />} />
            </Route> */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
