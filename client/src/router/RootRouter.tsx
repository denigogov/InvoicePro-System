import {
  Navigate,
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

const RootRouter = ({}) => {
  const auth = useAuth();

  const token: string = auth?.token ?? "2";

  if (!token) {
    return <Login />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppRoute />}>
        <Route index element={<Navigate to="dashboard" />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/settings" element={<Settings />} />

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
