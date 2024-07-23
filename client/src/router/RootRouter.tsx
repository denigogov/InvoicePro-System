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
// import { useAuth } from "../helpers/useAuth";
// import { RequireAuth } from "../helpers/RequireAuth";
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
import ErrorMinimalDisplay from "../components/GlobalComponents/ErrorMinimalDisplay";
import UserProfile from "../pages/Settings/userInfo/UserProfile";
import InvoiceSettings from "../pages/Settings/invoiceInfo/InvoiceSettings";
import EmployeesSettings from "../pages/Settings/employeesInfo/EmployeesSettings";
import EditEmployer from "../pages/Settings/employeesInfo/EditEmployer";
import EditUserProfile from "../pages/Settings/userInfo/EditUserProfile";
import EditInvoiceSettings from "../pages/Settings/invoiceInfo/EditInvoiceSettings";
import Administration from "../pages/Administration/Administration";
import Customers from "../pages/Administration/customer/Customers";
import CreateEmployer from "../pages/Settings/employeesInfo/CreateEmployer";
import EditCustomer from "../pages/Administration/customer/EditCustomer";
import DetailsCustomer from "../pages/Administration/customer/DetailsCustomer";
import Error404 from "../components/GlobalComponents/Error404";
import PasswordReset from "../pages/loginPage/PasswordReset";
import PasswordChange from "../pages/loginPage/PasswordChange";
import { RequireAuth } from "../helpers/RequireAuth";
import TestPDF from "./TestPDF";

export interface Error404Types {
  codeStatus?: number;
  messageTitle?: string;
  messageSubTitle?: string;
}

const RootRouter = () => {
  // const auth = useAuth;

  const errorMessages: Error404Types = {
    codeStatus: 500,
    messageTitle: "Unexpected Error Occurred",
    messageSubTitle: "We're working to fix this issue. Please try again later.",
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="login"
          element={<LoginRoot />}
          errorElement={
            <Error404
              codeStatus={errorMessages?.codeStatus}
              messageTitle={errorMessages?.messageTitle}
              messageSubTitle={errorMessages?.messageSubTitle}
            />
          }
        >
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

          <Route path="password-reset" element={<PasswordReset />} />
          <Route
            path="password-reset/confirm/:token"
            element={<PasswordChange />}
          />
        </Route>
        <Route
          path="/"
          element={
            // need to uncoment --> comment  for styling purpose
            <RequireAuth>
              <AppRoute />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="/dashboard"
            element={<Dashboard />}
            errorElement={
              <Error404
                codeStatus={errorMessages?.codeStatus}
                messageTitle={errorMessages?.messageTitle}
                messageSubTitle={errorMessages?.messageSubTitle}
              />
            }
          />

          <Route
            path="/invoices"
            element={<Invoices />}
            errorElement={
              <Error404
                codeStatus={errorMessages?.codeStatus}
                messageTitle={errorMessages?.messageTitle}
                messageSubTitle={errorMessages?.messageSubTitle}
              />
            }
          >
            <Route index element={<AllInvoices />} />
            <Route path="all" element={<AllInvoices />}>
              <Route path="details/:invoiceId" element={<InvoiceDetails />} />
              <Route
                path="edit/:invoiceId"
                element={<InvoiceModify />}
                errorElement={
                  <ErrorMinimalDisplay errorMessage="Something went very wrong, try again" />
                }
              />
            </Route>
            <Route path="create" element={<CreateInvoice />} />
          </Route>

          {/* Administration Route */}
          <Route
            path="/administration"
            element={<Administration />}
            errorElement={
              <Error404
                codeStatus={errorMessages?.codeStatus}
                messageTitle={errorMessages?.messageTitle}
                messageSubTitle={errorMessages?.messageSubTitle}
              />
            }
          >
            <Route index element={<EmployeesSettings />} />
            <Route path="employees" element={<EmployeesSettings />}>
              <Route path="edit/:id" element={<EditEmployer />} />
              <Route path="create" element={<CreateEmployer />} />
            </Route>

            <Route path="customers" element={<Customers />}>
              <Route path="edit/:id" element={<EditCustomer />} />
              <Route path="details/:id" element={<DetailsCustomer />} />
            </Route>
          </Route>

          {/* settings Route */}
          <Route
            path="/settings"
            element={<Settings />}
            errorElement={
              <Error404
                codeStatus={errorMessages?.codeStatus}
                messageTitle={errorMessages?.messageTitle}
                messageSubTitle={errorMessages?.messageSubTitle}
              />
            }
          >
            <Route index element={<CompanyProfile />} />
            <Route path="company-profile" element={<CompanyProfile />}>
              <Route path="edit-info" element={<EditInfoCompany />} />
              <Route path="edit-bank" element={<EditBankCompany />} />
            </Route>
            <Route path="user-profile" element={<UserProfile />}>
              <Route path="edit/:id" element={<EditUserProfile />} />
            </Route>
            <Route path="invoices" element={<InvoiceSettings />}>
              <Route path="edit/" element={<EditInvoiceSettings />} />
            </Route>
          </Route>
          <Route path="/pdf" element={<TestPDF />}></Route>
        </Route>
        <Route path="*" element={<Error404 />} />
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
