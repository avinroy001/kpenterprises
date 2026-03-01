import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import PageResolver from "../pages/PageResolver";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<PageResolver />} />
        <Route path="*" element={<PageResolver />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
