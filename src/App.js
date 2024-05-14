import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ServerDown from "../src/pages/universal/error/ServerDown.jsx";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import RegularEmployeeRoutes from "./routes/RegularEmployeeRoutes.js";
import ManagerEmployeeRoutes from "./routes/ManagerEmployeeRoutes.js";
import HrEmployeeRoutes from "./routes/HrEmployeeRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";

function App() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [checkIfDownline, setCheckIfDownline] = useState([]);

  useEffect(() => {
    const fetchDownline = () => {
      try {
        //checkDownline
        const downline_res = axios.get(BASE_URL + "/mt-checkDownline");
        setCheckIfDownline(downline_res.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDownline();
  }, []);

  return (
    <>
      <SkeletonTheme baseColor="#f2f2f2" highlightColor="#ffffff">
        <BrowserRouter>
          <AuthRoutes />

          <RegularEmployeeRoutes checkIfDownline={checkIfDownline} />

          <ManagerEmployeeRoutes checkIfDownline={checkIfDownline} />

          <HrEmployeeRoutes />

          <AdminRoutes />

          <Routes>
            <Route path="/serverDown" element={<ServerDown />} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </>
  );
}

export default App;
