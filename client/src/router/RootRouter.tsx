import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Login from "../pages/loginPage/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import AppRoute from "./AppRoute";
import Settings from "../pages/Settings/Settings";
import Invoices from "../pages/Invoices/Invoices";
import { useAuth } from "../helpers/useAuth";
import { RequireAuth } from "../helpers/RequireAuth";
import Confirm from "../pages/loginPage/Confirm";
import LoginRoot from "../pages/loginPage/LoginRoot";
import { RequireValidation } from "../helpers/RequireValidation";
import { RequireCode } from "../helpers/RequireCode";
import { UserLoggedin } from "../helpers/UserLoggedin";
import CompanyProfile from "../pages/Settings/companyInfo/CompanyProfile";
import EditInfoCompany from "../pages/Settings/companyInfo/EditInfoCompany";
import EditBankCompany from "../pages/Settings/companyInfo/EditBankCompany";
import CreateInvoice from "../pages/Invoices/createInvoice/CreateInvoice";
import AllInvoices from "../pages/Invoices/allInvoices/AllInvoices";
import InvoiceDetails from "../pages/Invoices/allInvoices/InvoiceDetails";
import InvoiceModify from "../pages/Invoices/allInvoices/InvoiceModify";

const RootRouter = () => {
  const auth = useAuth;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="login" element={<LoginRoot />}>
          <Route
            index
            element={
              <UserLoggedin>
                <RequireCode>
                  <Login />
                </RequireCode>
              </UserLoggedin>
            }
          />
          <Route
            path="confirm"
            element={
              <UserLoggedin>
                <RequireValidation>
                  <Confirm />
                </RequireValidation>
              </UserLoggedin>
            }
          />
        </Route>
        <Route
          path="/"
          element={
            // need to uncoment --> comment  for styling purpose
            // <RequireAuth>
            <AppRoute />
            // </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/invoices" element={<Invoices />}>
            <Route path="all" element={<AllInvoices />}>
              <Route path="details/:invoiceId" element={<InvoiceDetails />} />
              <Route path="edit/:invoiceId" element={<InvoiceModify />} />
            </Route>
            <Route path="create" element={<CreateInvoice />} />
          </Route>
          <Route path="/settings" element={<Settings />}>
            <Route index element={<CompanyProfile />} />
            <Route path="company-profile" element={<CompanyProfile />}>
              <Route path="edit-info" element={<EditInfoCompany />} />
              <Route path="edit-bank" element={<EditBankCompany />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<h1>Pae Not Found</h1>} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default RootRouter;
