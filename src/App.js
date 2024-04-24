import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddCompany from "./pages/AddCompany.jsx";
import Login from "./pages/Login.jsx";
import EmployeesList from "./pages/admin/EmployeesList.jsx";
import Announcements from "./pages/hr/Announcements.jsx";
import AddAnnouncements from "./pages/hr/AddAnnouncements.jsx";
import ClientUserProfile from "./pages/client/ClientUserProfile.jsx";
import AddEmployee from "./pages/hr/AddEmployee.jsx";
import UserLogs from "./pages/admin/UserLogs.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import LeadDashboard from "./pages/leads/LeadDashboard.jsx";
import HRDashboard from "./pages/hr/HRDashboard.jsx";
import ClientDashboard from "./pages/client/ClientDashboard";
import WidgetPending from "./pages/widgets/WidgetPending.jsx";
import LeadPTORequest from "./pages/leads/LeadPTORequests";
import HRProfile from "./pages/hr/HRProfile.jsx";
import ManagerProfile from "./pages/leads/ManagerProfile.jsx";
import ViewEmployee from "./pages/hr/ViewEmployee.jsx";
import LeadDirectory from "./pages/leads/LeadDirectory.jsx";
import EditEmployee from "./pages/hr/EditEmployee.jsx";
import HRDirectory from "./pages/hr/HRDirectory.jsx";
import HRManage from "./pages/hr/HRManage.jsx";
import HRPTORequest from "./pages/hr/HRPTORequests";
import ClientAttendance from "./pages/client/ClientAttendance.jsx";
import HRAnnouncement from "./pages/hr/HRAnnouncements.jsx";
import HRAttendance from "./pages/hr/HRAttendance.jsx";
import HRTraining from "./pages/hr/HRTraining.jsx";
import HRReports from "./pages/hr/HRReports.jsx";
import LeadAnnouncements from "./pages/leads/LeadAnnouncements.jsx";
import LeadAttendance from "./pages/leads/LeadAttendance.jsx";
import LeadTraining from "./pages/leads/LeadTraining.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPasword.jsx";
import ServerDown from "./pages/ServerDown.jsx";
import NotFound from "./pages/NotFound.jsx";
import ClientRequestHR from "./pages/client/ClientRequestHR.jsx";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import HRRequest from "./pages/hr/HRRequest.jsx";
import AdminPortal from "./pages/AdminPortal.jsx";
import SpeechToText from "./pages/hr/SpeechToText.jsx";
import ExtrasBeta from "./pages/ExtrasBeta.jsx";
import RegularEmployee from "./Layout/RegularEmployee.jsx";
import ClientPaySlips from "./pages/client/ClientPaySlips.jsx";
import ClientBenefitsManagement from "./pages/client/ClientBenefitsManagement.jsx";
import ClientPerformance from "./pages/client/ClientPerformance.jsx";
import ClientCourses from "./pages/client/ClientCourses.jsx";
import ClientOnboardingPlan from "./pages/client/ClientOnboardingPlan.jsx";
import PoliciesHandbook from "./components/universal/PoliciesHandbook.jsx";
import OrgChart from "./components/universal/OrganizationalChart.jsx";
import ClientHelpDesk from "./pages/client/ClientHelpDesk.jsx";
import HREmployee from "./Layout/HREmployee.jsx";
import ManagerEmployee from "./Layout/ManagerEmployee.jsx";
import RunRegularPayroll from "./pages/accountant/RunRegularPayroll.jsx";
import RunLastPay from "./pages/accountant/RunLastPay.jsx";
import PayrollSettings from "./pages/accountant/PayrollSettings.jsx";
import UploadAPayRegister from "./pages/accountant/UploadAPayRegister.jsx";
import AccountantEmployee from "./Layout/AccountantEmployee.jsx";
import MyPulseDashboard from "./components/universal/MyPulseDashboard.jsx";
import MoodTracker from "./components/universal/MoodTracker.jsx";
import CheerAPeer from "./components/universal/CheerAPeer.jsx";
import WeeklyPulseSurvey from "./components/universal/WeeklyPulseSurvey.jsx";
import SuggestionBox from "./components/universal/SuggestionBox.jsx";
import TailoredGuidance from "./components/universal/TailoredGuidance.jsx";
import TeamPTOAndAttendance from "./components/universal/TeamPTOAndAttendance.jsx";
import EngagementIndex from "./components/universal/EngagementIndex.jsx";
import PerformanceManagement from "./components/universal/PerformanceManagement.jsx";
import CompensationAndRewards from "./components/universal/CompensationAndRewards.jsx";
import AcademyScorecard from "./components/universal/AcademyScorecard.jsx";
import MyTeam from "./components/universal/MyTeam.jsx";
import CsvReader from "./components/universal/CsvReader.jsx";
import TimeTable from "./components/universal/TimeTable.jsx";

// Universal
import MyPayslip from "./pages/universal/MyPayslips.jsx";

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
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="#ffffff">
      <BrowserRouter>
        <Routes>
          {/* General Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:user_key" element={<ResetPassword />} />

          {/* Administrator Routes */}
          <Route path="/userLogs" element={<UserLogs />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />

          {/* HR Routes */}
          <Route path="/hrDashboard" element={<HRDashboard />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/addAnnouncements" element={<AddAnnouncements />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/editEmployee/:emp_id" element={<EditEmployee />} />
          <Route path="/HRDirectory" element={<HRDirectory />} />
          <Route path="/HRManage" element={<HRManage />} />
          <Route path="/HRPTORequests" element={<HRPTORequest />} />
          <Route path="/speechtotext" element={<SpeechToText />} />

          {/* <Route path="/viewEmployee" element={<ViewEmployee />} /> */}
          <Route path="/viewEmployee/:emp_id" element={<ViewEmployee />} />
          <Route path="/addCompany" element={<AddCompany />} />
          <Route path="/hrProfile" element={<HRProfile />} />
          <Route path="/hrAnnouncements" element={<HRAnnouncement />} />
          <Route path="/hrAttendance" element={<HRAttendance />} />
          <Route path="/hrTraining" element={<HRTraining />} />
          <Route path="/hrRequests" element={<HRRequest />} />

          {/* Employee Routes */}
          <Route path="/employees" element={<EmployeesList />} />

          {/*----------REGULAR EMPLOYEEE VIEW----------*/}
          <Route path="/regular" element={<RegularEmployee />}>
            <Route path="/regular/dashboard" element={<ClientDashboard />} />
            <Route
              path="/regular/my-onboarding-plan"
              element={<ClientOnboardingPlan />}
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
              path="/regular/my-time-off-and-attendance"
              element={<TimeTable />}
            />
            <Route
              path="/regular/my-benefits-management"
              element={<ClientBenefitsManagement />}
            />
            <Route
              path="/regular/my-pulse"
              element={<MyPulseDashboard color={"#F37013"} />}
            />
            <Route
              path="/regular/my-pulse/mood-tracker"
              element={<MoodTracker color={"#EA7B2D"} />}
            />
            {/* <Route
              path="/regular/my-pulse/cheer-a-peer"
              element={<CheerAPeer color={"blue-500"} />}
            />
            <Route
              path="/regular/my-pulse/weekly-pulse-survey"
              element={<WeeklyPulseSurvey color={"blue-500"} />}
            />
            <Route
              path="/regular/my-pulse/suggestion-box"
              element={<SuggestionBox color={"blue-500"} />}
            />
            <Route
              path="/regular/my-pulse/tailored-guidance"
              element={<TailoredGuidance color={"blue-500"} />}
            /> */}
            <Route
              path="/regular/my-performance"
              element={<ClientPerformance />}
            />
            <Route
              path="/regular/academy-courses"
              element={<ClientCourses />}
            />
            <Route path="/regular/time-table" element={<TimeTable />} />
            {checkIfDownline > 0 ? (
              <Route
                path="/regular/my-team"
                element={<MyTeam color={"blue-500"} />}
              />
            ) : (
              <Route path="/regular/*" element={<NotFound />} />
            )}

            {checkIfDownline > 0 ? (
              <Route
                path="/regular/my-team/team-pto-and-attendance"
                element={<TeamPTOAndAttendance color={"blue-500"} />}
              />
            ) : (
              <Route path="/regular/*" element={<NotFound />} />
            )}

            {checkIfDownline > 0 ? (
              <Route
                path="/regular/my-team/engagement-index"
                element={<EngagementIndex color={"blue-500"} />}
              />
            ) : (
              <Route path="/regular/*" element={<NotFound />} />
            )}

            {checkIfDownline > 0 ? (
              <Route
                path="/regular/my-team/performance-management"
                element={<PerformanceManagement color={"blue-500"} />}
              />
            ) : (
              <Route path="/regular/*" element={<NotFound />} />
            )}

            {checkIfDownline > 0 ? (
              <Route
                path="/regular/my-team/compensation-and-rewards"
                element={<CompensationAndRewards color={"blue-500"} />}
              />
            ) : (
              <Route path="/regular/*" element={<NotFound />} />
            )}

            {checkIfDownline > 0 ? (
              <Route
                path="/regular/my-team/academy-scorecard"
                element={<AcademyScorecard color={"blue-500"} />}
              />
            ) : (
              <Route path="/regular/*" element={<NotFound />} />
            )}

            <Route
              path="/regular/policies-handbook"
              element={<PoliciesHandbook />}
            />
            <Route path="/regular/help-center" element={<ClientHelpDesk />} />
            <Route path="/regular/hr-request" element={<ClientRequestHR />} />
            <Route path="/regular/extras" element={<ExtrasBeta />} />
            <Route path="/regular/*" element={<NotFound />} />

            {/*--------- START OF PAYROLL ACCOUNTANT VIEW ----------*/}
            <Route
              path="/regular/manage-payroll/run-regular-payroll"
              element={<RunRegularPayroll />}
            />
            <Route
              path="/regular/manage-payroll/run-last-pay"
              element={<RunLastPay />}
            />
            <Route
              path="/regular/manage-payroll/payroll-settings"
              element={<PayrollSettings />}
            />
            <Route
              path="/regular/manage-payroll/upload-a-pay-register"
              element={<UploadAPayRegister />}
            />

            <Route path="/regular/*" element={<NotFound />} />
            {/*--------- END OF PAYROLL ACCOUNTANT VIEW ----------*/}
          </Route>
          {/*----------END OF REGULAR EMPLOYEEE VIEW----------*/}

          {/*----------MANAGER EMPLOYEEE VIEW----------*/}
          <Route path="/manager" element={<ManagerEmployee />}>
            <Route path="/manager/dashboard" element={<LeadDashboard />} />
            <Route
              path="/manager/my-personal-information"
              element={<ClientUserProfile />}
            />
            <Route
              path="/manager/my-time-off-and-attendance"
              element={<LeadAttendance />}
            />
            <Route path="/manager/time-table" element={<TimeTable />} />
            <Route
              path="/manager/my-pulse"
              element={<MyPulseDashboard color={"#F37013"} />}
            />
            <Route
              path="/manager/my-pulse/mood-tracker"
              element={<MoodTracker color={"yellow-500"} />}
            />
            {/* <Route
              path="/manager/my-pulse/cheer-a-peer"
              element={<CheerAPeer color={"yellow-500"} />}
            />
            <Route
              path="/manager/my-pulse/weekly-pulse-survey"
              element={<WeeklyPulseSurvey color={"yellow-500"} />}
            />
            <Route
              path="/manager/my-pulse/suggestion-box"
              element={<SuggestionBox color={"yellow-500"} />}
            />
            <Route
              path="/manager/my-pulse/tailored-guidance"
              element={<TailoredGuidance color={"yellow-500"} />}
            /> */}
            <Route
              path="/manager/my-team"
              element={<MyTeam color={"yellow-500"} />}
            />
            <Route
              path="/manager/my-team/team-pto-and-attendance"
              element={<TeamPTOAndAttendance color={"yellow-500"} />}
            />
            <Route path="/manager/time-table" element={<TimeTable />} />
            <Route
              path="/manager/my-team/engagement-index"
              element={<EngagementIndex color={"yellow-500"} />}
            />
            <Route
              path="/manager/my-team/performance-management"
              element={<PerformanceManagement color={"yellow-500"} />}
            />
            <Route
              path="/manager/my-team/compensation-and-rewards"
              element={<CompensationAndRewards color={"yellow-500"} />}
            />
            <Route
              path="/manager/my-team/academy-scorecard"
              element={<AcademyScorecard color={"yellow-500"} />}
            />
            <Route
              path="/manager/policies-handbook"
              element={<PoliciesHandbook />}
            />
            <Route path="/manager/hr-request" element={<ClientRequestHR />} />
            <Route path="/manager/extras" element={<ExtrasBeta />} />
            <Route path="/manager/*" element={<NotFound />} />
          </Route>
          {/*----------END OF MANAGER EMPLOYEEE VIEW----------*/}

          {/*----------HR VIEW----------*/}
          <Route path="/hr" element={<HREmployee />}>
            <Route path="/hr/dashboard" element={<HRDashboard />} />
            <Route path="/hr/my-personal-information" element={<HRProfile />} />
            <Route
              path="/hr/my-time-off-and-attendance"
              element={<HRAttendance />}
            />
            <Route
              path="/hr/policies-handbook"
              element={<PoliciesHandbook />}
            />
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
            <Route
              path="/hr/my-pulse"
              element={<MyPulseDashboard color={"bg-green-500"} />}
            />
            <Route
              path="/hr/my-pulse/mood-tracker"
              element={<MoodTracker color={"green-500"} />}
            />
            {/* <Route
              path="/hr/my-pulse/cheer-a-peer"
              element={<CheerAPeer color={"green-500"} />}
            />
            <Route
              path="/hr/my-pulse/weekly-pulse-survey"
              element={<WeeklyPulseSurvey color={"green-500"} />}
            />
            <Route
              path="/hr/my-pulse/suggestion-box"
              element={<SuggestionBox color={"green-500"} />}
            />
            <Route
              path="/hr/my-pulse/tailored-guidance"
              element={<TailoredGuidance color={"green-500"} />}
            /> */}
            <Route path="/hr/time-table" element={<TimeTable />} />
            {checkIfDownline > 0 ? (
              <Route
                path="/hr/my-team"
                element={<MyTeam color={"green-500"} />}
              />
            ) : (
              <Route path="/hr/*" element={<NotFound />} />
            )}

            {checkIfDownline > 0 ? (
              <Route
                path="/hr/my-team/team-pto-and-attendance"
                element={<TeamPTOAndAttendance color={"green-500"} />}
              />
            ) : (
              <Route path="/hr/*" element={<NotFound />} />
            )}

            {checkIfDownline > 0 ? (
              <Route
                path="/hr/my-team/engagement-index"
                element={<EngagementIndex color={"green-500"} />}
              />
            ) : (
              <Route path="/hr/*" element={<NotFound />} />
            )}

            {checkIfDownline > 0 ? (
              <Route
                path="/hr/my-team/performance-management"
                element={<PerformanceManagement color={"green-500"} />}
              />
            ) : (
              <Route path="/hr/*" element={<NotFound />} />
            )}

            {checkIfDownline > 0 ? (
              <Route
                path="/hr/my-team/compensation-and-rewards"
                element={<CompensationAndRewards color={"green-500"} />}
              />
            ) : (
              <Route path="/hr/*" element={<NotFound />} />
            )}

            {checkIfDownline > 0 ? (
              <Route
                path="/hr/my-team/academy-scorecard"
                element={<AcademyScorecard color={"green-500"} />}
              />
            ) : (
              <Route path="/hr/*" element={<NotFound />} />
            )}

            {/*--------- START OF PAYROLL ACCOUNTANT VIEW ----------*/}
            <Route
              path="/hr/manage-payroll/run-regular-payroll"
              element={<RunRegularPayroll />}
            />
            <Route
              path="/hr/manage-payroll/run-last-pay"
              element={<RunLastPay />}
            />
            <Route
              path="/hr/manage-payroll/payroll-settings"
              element={<PayrollSettings />}
            />
            <Route
              path="/hr/manage-payroll/upload-a-pay-register"
              element={<UploadAPayRegister />}
            />
            {/*--------- END OF PAYROLL ACCOUNTANT VIEW ----------*/}
            <Route path="/hr/upload-csv" element={<CsvReader />} />
            <Route path="/hr/reports" element={<HRReports />} />
            <Route path="/hr/requests" element={<HRRequest />} />
            <Route path="/hr/preferences" element={<HRManage />} />
            <Route path="/hr/extras" element={<ExtrasBeta />} />
            <Route path="/hr/*" element={<NotFound />} />
          </Route>
          {/*----------END OF HR VIEW----------*/}

          <Route path="/oc-trial" element={<OrgChart />} />

          {/* Team Lead Routes */}
          <Route path="/leadDashboard" element={<LeadDashboard />} />
          <Route path="/widgetPending" element={<WidgetPending />} />
          <Route path="/leadPTORequests" element={<LeadPTORequest />} />
          <Route path="/manProfile" element={<ManagerProfile />} />
          <Route path="/leadDirectory" element={<LeadDirectory />} />
          <Route path="/leadAnnouncements" element={<LeadAnnouncements />} />
          <Route path="leadAttendance" element={<LeadAttendance />} />
          <Route path="leadTraining" element={<LeadTraining />} />

          <Route path="/serverDown" element={<ServerDown />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin Routes */}
          <Route path="/ts-admin" element={<AdminPortal />} />
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
