import React from "react";
import { Routes, Route } from "react-router-dom";

import UserLogs from "../pages/admin/UserLogs";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminPortal from "../pages/AdminPortal";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/userLogs" element={<UserLogs />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/ts-admin" element={<AdminPortal />} />
    </Routes>
  );
};

export default AdminRoutes;