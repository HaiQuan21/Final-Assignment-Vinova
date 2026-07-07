import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { PublicRoute, PrivateRoute } from "./routes/ProtectedRoute";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
// import Account from "./modules/Account";
import Loading from "./components/Loading";
import { isSuperAdmin } from "./lib/getCurrentUser";


export default function App() {
  const Login = lazy(() => import("./pages/LoginPage"));

  const SignUp = lazy(() => import("./pages/SignUpPage"));

  const NotFound = lazy(()=> import("./pages/NotFoundPage"))

  const ArticlePD = lazy(()=>import("./modules/ArticlePD/ArticlePDTable"));

  const Category = lazy(()=>import("./modules/Category/CategoriesTable"));

  const HelpDocuments = lazy(()=>import("./modules/HelpDocuments/HelpDocuments"));

  const SearchSetting = lazy(()=>import("./modules/SearchSetting/SearchSettings"));

  const StaticContent = lazy(()=>import("./modules/StaticContent/StaticContent"));

  const Subscriptions = lazy(()=>import("./modules/Subscription/Subscriptions"));

  const Voucher = lazy(()=>import("./modules/Voucher/VoucherTable"));
  
  const VoucherDetail = lazy(() => import("./modules/Voucher/VoucherDetail"));

  const AdminAccount = lazy(() => import("./modules/Account/Admin/AdminTable"));

  const DoulaAccount = lazy(() => import("./modules/Account/Doula/DoulaTable"));

  const ClientAccount = lazy(() => import("./modules/Account/Client/clientAccount"));

  const DoulaDetail = lazy(()=>import("./modules/Account/Doula/DoulaDetail"))
  
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
              <Route path="/account/admin" element={isSuperAdmin() ? <AdminAccount/> : <Navigate to="/account/doula" replace />} />

              <Route path="/account/doula" element={<DoulaAccount />} />
              <Route path="/account/doula/:id" element={<DoulaDetail />} />

              <Route path="/account/client" element={<ClientAccount />} />
              <Route path="/articles" element={<ArticlePD key="article" type="article" />} />
              <Route path="/category" element={<Category />} />
              <Route path="/help-documents" element={<HelpDocuments />} />
              <Route path="/pd-session" element={<ArticlePD key="pd" type="pd" />} />
              <Route path="/search-settings" element={<SearchSetting />} />
              <Route path="/static-content" element={<StaticContent />} />
              <Route path="/subscriptions" element={<Subscriptions />} />

              <Route path="/vouchers" element={<Voucher />} />
              <Route path="/vouchers/:id" element={<VoucherDetail />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}
