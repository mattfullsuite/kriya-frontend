import React from "react";
import { Routes, Route } from "react-router-dom";

import UserLogs from "../pages/admin/UserLogs";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminPortal from "../pages/AdminPortal";
import CompanyManagement from "../pages/admin/company_management/Index";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/userLogs" element={<UserLogs />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/ts-admin" element={<AdminPortal />} />
      <Route path="/manage-companies" element={<CompanyManagement />} />
    </Routes>
  );
};

export default AdminRoutes;
