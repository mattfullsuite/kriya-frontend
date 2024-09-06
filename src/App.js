import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import "./App.css";
import ServerDown from "../src/pages/universal/error/ServerDown.jsx";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// import Login from "./pages/universal/auth/Login.jsx";
// import ForgotPassword from "./pages/universal/auth/ForgotPassword.jsx";
// import ResetPassword from "./pages/universal/auth/ResetPasword.jsx";
// import UserLogs from "./pages/admin/UserLogs.jsx";
// import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
// import AdminPortal from "./pages/AdminPortal.jsx";

// import RegularEmployee from "./Layout/RegularEmployee.jsx";
// import ClientDashboard from "./pages/client/ClientDashboard";
// import ClientUserProfile from "./pages/client/ClientUserProfile";
// import ClientAttendance from "./pages/client/ClientAttendance.jsx";

// import ManagerEmployee from "./Layout/ManagerEmployee";
// import LeadDashboard from "./pages/leads/LeadDashboard";
// import LeadAttendance from "./pages/leads/LeadAttendance";

// import HREmployee from "./Layout/HREmployee";
// import HRDashboard from "./pages/hr/HRDashboard";
// import HRProfile from "./pages/hr/HRProfile";
// import HRAttendance from "./pages/hr/HRAttendance";
// import PoliciesHandbook from "./pages/universal/PoliciesHandbook";
// import Settings from "./pages/universal/Settings";
// import EmployeesList from "./pages/admin/EmployeesList";
// import AddEmployee from "./pages/hr/AddEmployee";
// import ViewEmployee from "./pages/hr/ViewEmployee";
// import EditEmployee from "./pages/hr/EditEmployee";

// import ApplicantTracker from "./pages/hr/hr-management/ApplicantTracker";
// import ApplicantCsvReader from "./components/universal/ApplicantCsvReader";
// import CompanyPulse from "./pages/hr/hr-management/CompanyPulse";
// import Surveys from "./pages/hr/hr-management/Surveys";
// import CsvReader from "./pages/hr/hr-management/TimeOffAndAttendance";
// import PayRunDashboard from "./pages/pay-run-management/dashboard/PayRunDashboard";
// import PayRunCreateUpload from "./pages/pay-run-management/PayRunCreateUpload";
// import PayRunReports from "./pages/pay-run-management/pay-run-reports/PayRunReports";
// import PayRunRequests from "./pages/pay-run-management/payroll-requests/PayrollRequests";
// import PayRunSettings from "./pages/pay-run-management/settings/PayRunSettings";
// import HrManagement from "./pages/hr/HrManagement";
// import EmployeeManagement from "./pages/hr/hr-management/EmployeeManagement";
// import NotFound from "./pages/universal/error/NotFound";
// import WorkforceAnalytics from "./pages/hr/hr-management/WorkforceAnalytics";
// import HRRequest from "./pages/hr/HRRequest";
// import HRReports from "./pages/hr/HRReports";
// import HRManage from "./pages/hr/HRManage";

// import ClientRequestHR from "./pages/client/ClientRequestHR";
// import MyPayslip from "./pages/universal/my-payslip/MyPayslips";
// import TimeTable from "./components/universal/TimeTable.jsx";
// import MyPulseDashboard from "./pages/universal/my-pulse/MyPulseDashboard.jsx";
// import MoodTracker from "./pages/universal/my-pulse/MoodTracker.jsx";
// import CheerAPeer from "./pages/universal/my-pulse/CheerAPeer.jsx";
// import EmployeeDirectoryComponent from "./components/universal/EmployeeDirectoryComponent.jsx";
// import MyTeam from "./pages/universal/my-team/MyTeam.jsx";
// import TeamPTOAndAttendance from "./pages/universal/my-team/TeamPTOAndAttendance.jsx";
// import EngagementIndex from "./pages/universal/my-team/EngagementIndex.jsx";
// import PerformanceManagement from "./pages/universal/my-team/PerformanceManagement.jsx";
// import CompensationAndRewards from "./pages/universal/my-team/CompensationAndRewards.jsx";
// import AcademyScorecard from "./pages/universal/my-team/AcademyScorecard.jsx";
// import ExtrasBeta from "./pages/universal/ExtrasBeta.jsx";
// import WeeklyPulseSurvey from "./pages/universal/my-pulse/WeeklyPulseSurvey.jsx";
// import SuggestionBox from "./pages/universal/my-pulse/SuggestionBox.jsx";
// import TailoredGuidance from "./pages/universal/my-pulse/TailoredGuidance.jsx";
// import MyOnboardingPlan from "./pages/universal/MyOnboardingPlan.jsx";
// import MyBenefitsManagement from "./pages/universal/MyBenefitsManagement.jsx";
// import MyPerformance from "./pages/universal/MyPerformance.jsx";
// import AcademyCourses from "./pages/universal/AcademyCourses.jsx";
// import HelpCenter from "./pages/universal/HelpCenter.jsx";

import RegularEmployeeRoutes from "./routes/RegularEmployeeRoutes.js";
import ManagerEmployeeRoutes from "./routes/ManagerEmployeeRoutes.js";
import HrEmployeeRoutes from "./routes/HrEmployeeRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import { useCookies } from "react-cookie";

function App() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [checkIfDownline, setCheckIfDownline] = useState([]);
  const [cookie, setCookie] = useCookies(["user"]);

  useEffect(() => {
    const fetchDownline = async () => {
      try {
        //checkDownline
        const downline_res = await axios.get(BASE_URL + "/mt-checkDownline");
        setCheckIfDownline(downline_res.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDownline();
  }, [checkIfDownline]);

  return (
    <>
      <SkeletonTheme baseColor="#f2f2f2" highlightColor="#ffffff">
        <BrowserRouter>
          {cookie.user == undefined ? (
            <AuthRoutes />
          ) : (
            <>
              <AuthRoutes />
              
              <RegularEmployeeRoutes />

              <ManagerEmployeeRoutes />

              <HrEmployeeRoutes />

              <AdminRoutes />
            </>
          )}

          <Routes>
            <Route path="/serverDown" element={<ServerDown />} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </>
  );
}

export default App;
