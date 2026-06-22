import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "@/view/landingPage";

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
    </BrowserRouter>
  );
}