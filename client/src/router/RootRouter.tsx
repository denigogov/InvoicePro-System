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

const RootRouter = ({}) => {
  const token: string = "3";

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
