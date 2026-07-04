import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "@/view/landingPage";
import LoginPage from "@/view/login/LoginPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import StaffPage from "@/view/staff/StaffPage";
import AddStaffPage from "@/view/staff/AddStaffPage";
import ServicePage from "@/view/service/ServicePage";
import AddServicePage from "@/view/service/AddServicePage";

import { ROUTES } from "./routePaths";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path={ROUTES.HOME}
          element={<LandingPage />}
        />

        <Route
          path={ROUTES.LOGIN}
          element={<LoginPage />}
        />

        {/* Dashboard Routes */}
        <Route
          path={ROUTES.DASHBOARD}
          element={<DashboardLayout />}
        >
          <Route
            path={ROUTES.STAFF.replace("/dashboard/", "")}
            element={<StaffPage />}
          />
          <Route path="staff/add" element={<AddStaffPage />} />

          <Route 
            path={ROUTES.SERVICE.replace("/dashboard/", "")} 
            element={<ServicePage />} />
          <Route path={ROUTES.ADD_SERVICE} element={<AddServicePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}