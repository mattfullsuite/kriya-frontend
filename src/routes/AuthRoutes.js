import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/universal/auth/Login";
import ForgotPassword from "../pages/universal/auth/ForgotPassword";
import ResetPassword from "../pages/universal/auth/ResetPasword";
import NotFound from "../pages/universal/error/NotFound";

const AuthRoutes = () => {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Login />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password/:user_key" element={<ResetPassword />} />
      
    </Routes>
  );
};

export default AuthRoutes;
