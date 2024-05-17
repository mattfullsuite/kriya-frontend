import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import "./App.css";
import ServerDown from "../src/pages/universal/error/ServerDown.jsx";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Login from "./pages/universal/auth/Login.jsx";
import ForgotPassword from "./pages/universal/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/universal/auth/ResetPasword.jsx";
import UserLogs from "./pages/admin/UserLogs.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminPortal from "./pages/AdminPortal.jsx";

import RegularEmployee from "./layout/RegularEmployee.jsx";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientUserProfile from "./pages/client/ClientUserProfile";
import ClientAttendance from "./pages/client/ClientAttendance.jsx";

import ManagerEmployee from "./layout/ManagerEmployee";
import LeadDashboard from "./pages/leads/LeadDashboard";
import LeadAttendance from "./pages/leads/LeadAttendance";

import HREmployee from "./layout/HREmployee";
import HRDashboard from "./pages/hr/HRDashboard";
import HRProfile from "./pages/hr/HRProfile";
import HRAttendance from "./pages/hr/HRAttendance";
import PoliciesHandbook from "./pages/universal/PoliciesHandbook";
import Settings from "./pages/universal/Settings";
import EmployeesList from "./pages/admin/EmployeesList";
import AddEmployee from "./pages/hr/AddEmployee";
import ViewEmployee from "./pages/hr/ViewEmployee";
import EditEmployee from "./pages/hr/EditEmployee";

import ApplicantTracker from "./pages/hr/hr-management/ApplicantTracker";
import ApplicantCsvReader from "./components/universal/ApplicantCsvReader";
import CompanyPulse from "./pages/hr/hr-management/CompanyPulse";
import Surveys from "./pages/hr/hr-management/Surveys";
import CsvReader from "./pages/hr/hr-management/TimeOffAndAttendance";
import PayRunDashboard from "./pages/pay-run-management/dashboard/PayRunDashboard";
import PayRunCreateUpload from "./pages/pay-run-management/PayRunCreateUpload";
import PayRunReports from "./pages/pay-run-management/pay-run-reports/PayRunReports";
import PayRunRequests from "./pages/pay-run-management/payroll-requests/PayrollRequests";
import PayRunSettings from "./pages/pay-run-management/settings/PayRunSettings";
import HrManagement from "./pages/hr/HrManagement";
import EmployeeManagement from "./pages/hr/hr-management/EmployeeManagement";
import NotFound from "./pages/universal/error/NotFound";
import WorkforceAnalytics from "./pages/hr/hr-management/WorkforceAnalytics";
import HRRequest from "./pages/hr/HRRequest";
import HRReports from "./pages/hr/HRReports";
import HRManage from "./pages/hr/HRManage";


import ClientRequestHR from "./pages/client/ClientRequestHR";
import MyPayslip from "./pages/universal/my-payslip/MyPayslips";
import TimeTable from "./components/universal/TimeTable.jsx";
import MyPulseDashboard from "./pages/universal/my-pulse/MyPulseDashboard.jsx";
import MoodTracker from "./pages/universal/my-pulse/MoodTracker.jsx";
import CheerAPeer from "./pages/universal/my-pulse/CheerAPeer.jsx";
import EmployeeDirectoryComponent from "./components/universal/EmployeeDirectoryComponent.jsx";
import MyTeam from "./pages/universal/my-team/MyTeam.jsx";
import TeamPTOAndAttendance from "./pages/universal/my-team/TeamPTOAndAttendance.jsx";
import EngagementIndex from "./pages/universal/my-team/EngagementIndex.jsx";
import PerformanceManagement from "./pages/universal/my-team/PerformanceManagement.jsx";
import CompensationAndRewards from "./pages/universal/my-team/CompensationAndRewards.jsx";
import AcademyScorecard from "./pages/universal/my-team/AcademyScorecard.jsx";
import ExtrasBeta from "./pages/universal/ExtrasBeta.jsx";
import WeeklyPulseSurvey from "./pages/universal/my-pulse/WeeklyPulseSurvey.jsx";
import SuggestionBox from "./pages/universal/my-pulse/SuggestionBox.jsx";
import TailoredGuidance from "./pages/universal/my-pulse/TailoredGuidance.jsx";
import MyOnboardingPlan from "./pages/universal/MyOnboardingPlan.jsx";
import MyBenefitsManagement from "./pages/universal/MyBenefitsManagement.jsx";
import MyPerformance from "./pages/universal/MyPerformance.jsx";
import AcademyCourses from "./pages/universal/AcademyCourses.jsx";
import HelpCenter from "./pages/universal/HelpCenter.jsx";

// import RegularEmployeeRoutes from "./routes/RegularEmployeeRoutes.js";
// import ManagerEmployeeRoutes from "./routes/ManagerEmployeeRoutes.js";
// import HrEmployeeRoutes from "./routes/HrEmployeeRoutes.js";
// import AdminRoutes from "./routes/AdminRoutes.js";
// import AuthRoutes from "./routes/AuthRoutes.js";

function App() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [checkIfDownline, setCheckIfDownline] = useState([]);

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
  }, []);

  return (
    <>
      <SkeletonTheme baseColor="#f2f2f2" highlightColor="#ffffff">
        <BrowserRouter>
          {/* <AuthRoutes />

          <RegularEmployeeRoutes checkIfDownline={checkIfDownline} />

          <ManagerEmployeeRoutes />

          <HrEmployeeRoutes checkIfDownline={checkIfDownline} />

          <AdminRoutes />

          <Routes>
            <Route path="/serverDown" element={<ServerDown />} />
          </Routes>*/}
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Login />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/reset-password/:user_key"
              element={<ResetPassword />}
            />

            <Route path="/userLogs" element={<UserLogs />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/ts-admin" element={<AdminPortal />} />

            {/* Regular */}
            <Route path="/regular" element={<RegularEmployee />}>
              <Route path="/regular/dashboard" element={<ClientDashboard />} />

              <Route
                path="/regular/my-onboarding-plan"
                element={<MyOnboardingPlan />}
              />

              <Route
                path="/regular/my-personal-information"
                element={<ClientUserProfile />}
              />

              <Route path="/regular/my-payslips" element={<MyPayslip />} />

              <Route
                path="/regular/my-time-off-and-attendance"
                element={<ClientAttendance />}
              />

              <Route
                path="/regular/my-benefits-management"
                element={<MyBenefitsManagement />}
              />

              <Route
                path="/regular/my-pulse"
                element={<MyPulseDashboard color={"#F37013"} />}
              />

              <Route
                path="/regular/my-pulse/mood-tracker"
                element={
                  <MoodTracker
                    bgColor={"bg-[#EA7B2D]"}
                    hoverColor={"hover:bg-[#CE5500]"}
                    disabledColor={"disabled:bg-[#FFB682]"}
                    textColor={"text-[#EA7B2D]"}
                    fillColor={"fill-[#EA7B2D]"}
                    accentColor={"[&::-webkit-slider-thumb]:bg-[#EA7B2D]"}
                    focusBorder={"focus:border-[#EA7B2D]"}
                  />
                }
              />

              <Route
                path="/regular/my-pulse/cheer-a-peer"
                element={
                  <CheerAPeer
                    bgColor={"bg-[#EA7B2D]"}
                    hoverColor={"hover:bg-[#CE5500]"}
                    disabledColor={"disabled:bg-[#FFB682]"}
                    textColor={"text-[#EA7B2D]"}
                    fillColor={"fill-[#EA7B2D]"}
                    focusBorder={"focus:border-[#EA7B2D]"}
                  />
                }
              />

              <Route
                path="/regular/my-pulse/weekly-pulse-survey"
                element={<WeeklyPulseSurvey />}
              />

              <Route
                path="/regular/my-pulse/suggestion-box"
                element={<SuggestionBox />}
              />

              <Route
                path="/regular/my-pulse/tailored-guidance"
                element={<TailoredGuidance />}
              />

              <Route
                path="/regular/team-chart"
                element={
                  <EmployeeDirectoryComponent
                    textColor={"text-[#CC5500]"}
                    avatarColor={"bg-[#BA4E00]"}
                    bgColor={"bg-[#FFE2CE]"}
                  />
                }
              />

              <Route
                path="/regular/my-performance"
                element={<MyPerformance />}
              />

              <Route
                path="/regular/academy-courses"
                element={<AcademyCourses />}
              />

              <Route path="/regular/time-table" element={<TimeTable />} />

              {checkIfDownline > 0 && (
                <Route path="/regular/my-team" element={<MyTeam />} />
              )}

              {checkIfDownline > 0 && (
                <Route
                  path="/regular/my-team/team-pto-and-attendance"
                  element={<TeamPTOAndAttendance />}
                />
              )}

              {checkIfDownline > 0 && (
                <Route
                  path="/regular/my-team/engagement-index"
                  element={<EngagementIndex />}
                />
              )}

              {checkIfDownline > 0 && (
                <Route
                  path="/regular/my-team/performance-management"
                  element={<PerformanceManagement />}
                />
              )}

              {checkIfDownline > 0 && (
                <Route
                  path="/regular/my-team/compensation-and-rewards"
                  element={<CompensationAndRewards />}
                />
              )}

              {checkIfDownline > 0 && (
                <Route
                  path="/regular/my-team/academy-scorecard"
                  element={<AcademyScorecard />}
                />
              )}

              <Route
                path="/regular/policies-handbook"
                element={<PoliciesHandbook />}
              />

              <Route path="/regular/help-center" element={<HelpCenter />} />

              {/* <Route path="/regular/hr-request" element={<ClientRequestHR />} />

        <Route path="/regular/extras" element={<ExtrasBeta />} />

         */}

              <Route path="/regular/*" element={<NotFound />} />
            </Route>

            {/* Manager */}
            <Route path="/manager" element={<ManagerEmployee />}>
              <Route path="/manager/dashboard" element={<LeadDashboard />} />

              <Route
                path="/manager/my-onboarding-plan"
                element={<MyOnboardingPlan />}
              />

              <Route
                path="/manager/my-personal-information"
                element={<ClientUserProfile />}
              />

              <Route
                path="/manager/my-time-off-and-attendance"
                element={<LeadAttendance />}
              />

              <Route
                path="/manager/my-benefits-management"
                element={<MyBenefitsManagement />}
              />

              <Route path="/manager/my-payslips" element={<MyPayslip />} />

              <Route path="/manager/time-table" element={<TimeTable />} />

              <Route path="/manager/my-pulse" element={<MyPulseDashboard />} />

              <Route
                path="/manager/my-onboarding-plan"
                element={<MyOnboardingPlan />}
              />

              <Route
                path="/manager/my-pulse/mood-tracker"
                element={
                  <MoodTracker
                    bgColor={"bg-[#008080]"}
                    hoverColor={"hover:bg-[#005050]"}
                    disabledColor={"disabled:bg-[#8DE0E0]"}
                    textColor={"text-[#008080]"}
                    fillColor={"fill-[#008080]"}
                    accentColor={"[&::-webkit-slider-thumb]:bg-[#008080]"}
                    focusBorder={"focus:border-[#008080]"}
                  />
                }
              />

              <Route
                path="/manager/my-pulse/cheer-a-peer"
                element={
                  <CheerAPeer
                    bgColor={"bg-[#008080]"}
                    hoverColor={"hover:bg-[#005050]"}
                    disabledColor={"disabled:bg-[#8DE0E0]"}
                    textColor={"text-[#008080]"}
                    fillColor={"fill-[#008080]"}
                    focusBorder={"focus:border-[#008080]"}
                  />
                }
              />

              <Route
                path="/manager/my-pulse/weekly-pulse-survey"
                element={<WeeklyPulseSurvey />}
              />

              <Route
                path="/manager/my-pulse/suggestion-box"
                element={<SuggestionBox />}
              />

              <Route
                path="/manager/my-pulse/tailored-guidance"
                element={<TailoredGuidance />}
              />

              <Route
                path="/manager/team-chart"
                element={
                  <EmployeeDirectoryComponent
                    textColor={"text-[#008080]"}
                    avatarColor={"bg-[#017474]"}
                    bgColor={"bg-[#d3edea]"}
                  />
                }
              />

              <Route
                path="/manager/academy-courses"
                element={<AcademyCourses />}
              />

              <Route path="/manager/my-team" element={<MyTeam />} />

              <Route
                path="/manager/my-team/team-pto-and-attendance"
                element={<TeamPTOAndAttendance />}
              />

              <Route path="/manager/time-table" element={<TimeTable />} />

              <Route
                path="/manager/my-team/engagement-index"
                element={<EngagementIndex />}
              />

              <Route
                path="/manager/my-team/performance-management"
                element={<PerformanceManagement />}
              />

              <Route
                path="/manager/my-team/compensation-and-rewards"
                element={<CompensationAndRewards color={"yellow-500"} />}
              />

              <Route
                path="/manager/my-team/academy-scorecard"
                element={<AcademyScorecard />}
              />

              <Route
                path="/manager/policies-handbook"
                element={<PoliciesHandbook />}
              />

              <Route path="/manager/help-center" element={<HelpCenter />} />

              <Route path="/manager/hr-request" element={<ClientRequestHR />} />

              <Route path="/manager/extras" element={<ExtrasBeta />} />

              <Route path="/manager/*" element={<NotFound />} />
            </Route>

            {/* HR */}
            <Route path="/hr" element={<HREmployee />}>
              <Route path="/hr/dashboard" element={<HRDashboard />} />

              <Route
                path="/hr/my-onboarding-plan"
                element={<MyOnboardingPlan />}
              />

              <Route
                path="/hr/my-personal-information"
                element={<HRProfile />}
              />

              <Route path="/hr/my-payslips" element={<MyPayslip />} />

              <Route
                path="/hr/my-time-off-and-attendance"
                element={<HRAttendance />}
              />

              <Route
                path="/hr/my-benefits-management"
                element={<MyBenefitsManagement />}
              />

              <Route path="/hr/my-performance" element={<MyPerformance />} />

              <Route path="/hr/academy-courses" element={<AcademyCourses />} />

              <Route path="/hr/employees" element={<EmployeesList />} />

              <Route
                path="/hr/employees/add-employee"
                element={<AddEmployee />}
              />

              <Route
                path="/hr/employees/view-employee/:emp_id"
                element={<ViewEmployee />}
              />

              <Route
                path="/hr/employees/edit-employee/:emp_id"
                element={<EditEmployee />}
              />

              {/*--------- START OF MY PULSE ----------*/}
              <Route
                path="/hr/my-pulse"
                element={<MyPulseDashboard color={"bg-green-500"} />}
              />

              <Route
                path="/hr/my-pulse/mood-tracker"
                element={
                  <MoodTracker
                    bgColor={"bg-[#90946F]"}
                    hoverColor={"hover:bg-[#686B51]"}
                    disabledColor={"disabled:bg-[#E1E5B9]"}
                    textColor={"text-[#90946F]"}
                    fillColor={"fill-[#90946F]"}
                    accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                    focusBorder={"focus:border-[#90946F]"}
                  />
                }
              />

              <Route
                path="/hr/my-pulse/cheer-a-peer"
                element={
                  <CheerAPeer
                    bgColor={"bg-[#90946F]"}
                    hoverColor={"hover:bg-[#686B51]"}
                    disabledColor={"disabled:bg-[#E1E5B9]"}
                    textColor={"text-[#90946F]"}
                    fillColor={"fill-[#90946F]"}
                    accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                    focusBorder={"focus:border-[#90946F]"}
                  />
                }
              />

              <Route
                path="/hr/my-pulse/weekly-pulse-survey"
                element={<WeeklyPulseSurvey />}
              />

              <Route
                path="/hr/my-pulse/suggestion-box"
                element={<SuggestionBox />}
              />

              <Route
                path="/hr/my-pulse/tailored-guidance"
                element={<TailoredGuidance />}
              />
              {/*--------- END OF MY PULSE ----------*/}

              <Route path="/hr/time-table" element={<TimeTable />} />

              {/*--------- START OF MY TEAM ----------*/}

              {checkIfDownline > 0 && (
                <Route path="/hr/my-team" element={<MyTeam />} />
              )}

              {checkIfDownline > 0 && (
                <Route
                  path="/hr/my-team/team-pto-and-attendance"
                  element={<TeamPTOAndAttendance />}
                />
              )}

              {checkIfDownline > 0 && (
                <Route
                  path="/hr/my-team/engagement-index"
                  element={<EngagementIndex color={"green-500"} />}
                />
              )}

              {checkIfDownline > 0 && (
                <Route
                  path="/hr/my-team/performance-management"
                  element={<PerformanceManagement />}
                />
              )}

              {checkIfDownline > 0 && (
                <Route
                  path="/hr/my-team/compensation-and-rewards"
                  element={<CompensationAndRewards color={"green-500"} />}
                />
              )}

              {checkIfDownline > 0 && (
                <Route
                  path="/hr/my-team/academy-scorecard"
                  element={<AcademyScorecard color={"green-500"} />}
                />
              )}
              {/*--------- END OF MY TEAM ----------*/}

              <Route
                path="/hr/hr-management/employee-management/applicant-tracking-system"
                element={<ApplicantTracker />}
              />

              <Route
                path="/hr/hr-management/employee-management/applicant-tracking-uploader"
                element={<ApplicantCsvReader />}
              />

              <Route
                path="/hr/team-chart"
                element={
                  <EmployeeDirectoryComponent
                    textColor={"text-[#666A40]"}
                    avatarColor={"bg-[#676b41]"}
                    bgColor={"bg-[#F0F2DD]"}
                  />
                }
              />

              {/*--------- START OF HR MANAGEMENT ----------*/}

              <Route path="/hr/hr-management" element={<HrManagement />} />

              <Route
                path="/hr/hr-management/employee-management"
                element={<EmployeeManagement />}
              />

              <Route
                path="/hr/hr-management/company-pulse"
                element={<CompanyPulse />}
              />

              <Route
                path="/hr/hr-management/company-pulse/surveys"
                element={<Surveys />}
              />

              <Route
                path="/hr/hr-management/time-off-and-attendance"
                element={<CsvReader />}
              />

              <Route
                path="/hr/hr-management/performance-management"
                element={<PerformanceManagement />}
              />

              <Route
                path="/hr/hr-management/workforce-analytics"
                element={<WorkforceAnalytics />}
              />

              {/*--------- END OF HR MANAGEMENT ----------*/}

              {/*--------- START OF PAY RUN MANAGEMENT ----------*/}
              <Route
                path={`/hr/hr-management/pay-run-management/`}
                element={<PayRunDashboard />}
              />

              <Route
                path={`/hr/hr-management/pay-run-create-upload/`}
                element={<PayRunCreateUpload />}
              />

              <Route
                path={`/hr/hr-management/pay-run-reports/`}
                element={<PayRunReports />}
              />

              <Route
                path={`/hr/hr-management/pay-run-requests/`}
                element={<PayRunRequests />}
              />

              <Route
                path={`/hr/hr-management/pay-run-settings/`}
                element={<PayRunSettings />}
              />

              {/*--------- END OF PAY RUN MANAGEMENT ----------*/}

              <Route path="/hr/help-center" element={<HelpCenter />} />

              <Route path="/hr/reports" element={<HRReports />} />
              <Route path="/hr/requests" element={<HRRequest />} />
              <Route path="/hr/preferences" element={<HRManage />} />
              <Route path="/hr/extras" element={<ExtrasBeta />} />

              <Route
                path="/hr/policies-handbook"
                element={<PoliciesHandbook />}
              />

              <Route path="/hr/settings" element={<Settings />} />

              <Route path="/hr/*" element={<NotFound />} />
            </Route>

            <Route path="/serverDown" element={<ServerDown />} />
            
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </>
  );
}

export default App;
