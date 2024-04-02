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
import { useAuth } from "../helpers/Auth";
import { RequireAuth } from "../helpers/RequireAuth";
import Confirm from "../pages/loginPage/Confirm";
import LoginRoot from "../pages/loginPage/LoginRoot";
import { RequireValidation } from "../helpers/RequireValidation";
import { RequireCode } from "../helpers/RequireCode";
import { UserLoggedin } from "../helpers/UserLoggedin";

const RootRouter = ({}) => {
  const auth = useAuth();

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
            <RequireAuth>
              <AppRoute />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/invoices" element={<Invoices />} />
          <Route path="/settings" element={<Settings />} />
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
