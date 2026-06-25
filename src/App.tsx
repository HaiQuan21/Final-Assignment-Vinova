import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { PublicRoute, PrivateRoute } from "./routes/ProtectedRoute";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
// import Account from "./modules/Account";
import Loading from "./components/Loading";

export default function App() {
  const Login = lazy(() => import("./pages/LoginPage"));

  const SignUp = lazy(() => import("./pages/SignUpPage"));

  const NotFound = lazy(()=> import("./pages/NotFoundPage"))

  const Account = lazy(()=>import("./modules/Account/Account"));

  const Article = lazy(()=>import("./modules/Article/ArticleTable"));

  const Category = lazy(()=>import("./modules/Category/Category"));

  const HelpDocuments = lazy(()=>import("./modules/HelpDocuments/HelpDocuments"));

  const PDSession = lazy(()=>import("./modules/PDSession/PDSession"));

  const SearchSetting = lazy(()=>import("./modules/SearchSetting/SearchSettings"));

  const StaticContent = lazy(()=>import("./modules/StaticContent/StaticContent"));

  const Subscriptions = lazy(()=>import("./modules/Subscription/Subscriptions"));

  const Voucher = lazy(()=>import("./modules/Voucher/VoucherTable"));
  
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/account" element={<Account />} />
              <Route path="/articles" element={<Article />} />
              <Route path="/category" element={<Category />} />
              <Route path="/help-documents" element={<HelpDocuments />} />
              <Route path="/pd-session" element={<PDSession />} />
              <Route path="/search-settings" element={<SearchSetting />} />
              <Route path="/static-content" element={<StaticContent />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/vouchers" element={<Voucher />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}
