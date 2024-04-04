import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
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
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import HRRequest from "./pages/hr/HRRequest.jsx";
import AdminPortal from "./pages/AdminPortal.jsx";
import SpeechToText from "./pages/hr/SpeechToText.jsx";
import ExtrasBeta from "./pages/ExtrasBeta.jsx";
import RegularEmployee from "./Layout/RegularEmployee.jsx";
import ClientPaySlips from "./pages/client/ClientPaySlips.jsx";
import ClientBenefitsManagement from "./pages/client/ClientBenefitsManagement.jsx";
import ClientPulse from "./pages/client/ClientPulse.jsx";
import ClientPerformance from "./pages/client/ClientPerformance.jsx";
import ClientCourses from "./pages/client/ClientCourses.jsx";
import ClientOnboardingPlan from "./pages/client/ClientOnboardingPlan.jsx";
import ClientPoliciesHandbook from "./pages/client/ClientPoliciesHandbook.jsx";
import ClientHelpDesk from "./pages/client/ClientHelpDesk.jsx";

function App() {
  return (
    <div className="App">
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
              <Route path="/regular/my-onboarding-plan" element={<ClientOnboardingPlan />} />
              <Route path="/regular/my-personal-information" element={<ClientUserProfile />} />
              <Route path="/regular/my-payslips" element={<ClientPaySlips />} />
              <Route path="/regular/my-time-off-and-attendance" element={<ClientAttendance />} />
              <Route path="/regular/my-benefits-management" element={<ClientBenefitsManagement />} />
              <Route path="/regular/my-pulse" element={<ClientPulse />} />
              <Route path="/regular/my-performance" element={<ClientPerformance />} />
              <Route path="/regular/academy-courses" element={<ClientCourses />} />
              <Route path="/regular/policies-handbook" element={<ClientPoliciesHandbook />} />
              <Route path="/regular/help-center" element={<ClientHelpDesk />} />
              <Route path="/regular/*" element={<NotFound />} />
            </Route>





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
    </div>
  );
}

export default App;
