import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "@/view/landingPage";

import LoginPage from "@/view/login/LoginPage";

import DashboardLayout from "@/layouts/DashboardLayout";

import { ROUTES } from "./routePaths";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<LandingPage />}
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={<LoginPage />}
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.DASHBOARD}
          element={<DashboardLayout/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
