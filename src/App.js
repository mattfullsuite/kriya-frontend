import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Dashboard from "./pages/Dashboard.jsx"
import AddCompany from "./pages/AddCompany.jsx"
import Login from "./pages/Login.jsx"
import PendingLeaves from "./pages/PendingLeaves.jsx"
import FileLeave from "./pages/FileLeave.jsx"

import EmployeeProfile from "./pages/EmployeeProfile.jsx"
import EmployeesList from "./pages/admin/EmployeesList.jsx"
// import AddEmployee from "./pages/admin/AddEmployee.jsx"
import Announcements from "./pages/hr/Announcements.jsx"
import AddAnnouncements from "./pages/hr/AddAnnouncements.jsx"
import ClientUserProfile from "./pages/client/ClientUserProfile.jsx";
import AddEmployee from "./pages/hr/AddEmployee.jsx";

import UserLogs from "./pages/admin/UserLogs.jsx"

import AdminDashboard from "./pages/admin/AdminDashboard.jsx"
import LeadDashboard from "./pages/leads/LeadDashboard.jsx"
import HRDashboard from "./pages/hr/HRDashboard.jsx"
import ClientDashboard from "./pages/client/ClientDashboard"
import WidgetPending from "./pages/widgets/WidgetPending.jsx"
import LeadPTORequest from "./pages/leads/LeadPTORequests";
import HRProfile from "./pages/hr/HRProfile.jsx";
import ManagerProfile from "./pages/leads/ManagerProfile.jsx";
import ViewEmployee from "./pages/hr/ViewEmployee.jsx";
import LeadDirectory from "./pages/leads/LeadDirectory.jsx";
import EditEmployee from "./pages/hr/EditEmployee.jsx";
import ClientEmployeeDirectory from "./pages/client/ClientEmployeeDirectory.jsx";
import HRDirectory from "./pages/hr/HRDirectory.jsx";
import HRManage from "./pages/hr/HRManage.jsx";
import ClientAnnouncement from "./pages/client/ClientAnnouncements.jsx";
import ClientAttendance from "./pages/client/ClientAttendance.jsx";
import ClientTraining from "./pages/client/ClientTraining.jsx";
import HRAnnouncement from "./pages/hr/HRAnnouncements.jsx";
import HRAttendance from "./pages/hr/HRAttendance.jsx";
import HRTraining from "./pages/hr/HRTraining.jsx";
import LeadAnnouncements from "./pages/leads/LeadAnnouncements.jsx";
import LeadAttendance from "./pages/leads/LeadAttendance.jsx";
import LeadTraining from "./pages/leads/LeadTraining.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPasword.jsx";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* General Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:user_key" element={<ResetPassword/>}/>

          {/* Administrator Routes */}
          <Route path="/userLogs" element={<UserLogs />} /> 
          <Route path="/adminDashboard" element={<AdminDashboard />} /> 

          {/* HR Routes */}
          <Route path="/hrDashboard" element={<HRDashboard />} /> 
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/addAnnouncements" element={<AddAnnouncements />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/editEmployee/:emp_id" element={<EditEmployee />} />
          <Route path="/HRDirectory" element={<HRDirectory/>} />
          <Route path="/HRManage" element={<HRManage/>}/>

          {/* <Route path="/viewEmployee" element={<ViewEmployee />} /> */}
          <Route path="/viewEmployee/:emp_id" element={<ViewEmployee />} />
          <Route path="/addCompany" element={<AddCompany />} />
          <Route path="/hrProfile" element={<HRProfile />} />
          <Route path="/hrAnnouncements" element={<HRAnnouncement />} />
          <Route path="/hrAttendance" element={<HRAttendance />} />
          <Route path="/hrTraining" element={<HRTraining />} />

          {/* Employee Routes */}
          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employeeProfile" element={<EmployeeProfile />} />
          <Route path="/clientDashboard" element={<ClientDashboard />} />
          <Route path="/showPendingLeaves" element={<PendingLeaves />} />
          <Route path="/fileLeave" element={<FileLeave />} />
          <Route path="/empProfile" element={<ClientUserProfile />} />
          <Route path="/clientDirectory" element={<ClientEmployeeDirectory />} />
          <Route path="/clientAnnouncements" element={<ClientAnnouncement />} />
          <Route path="/clientAttendance" element={<ClientAttendance />} />
          <Route path="/clientTraining" element={<ClientTraining/>} />

          {/* Team Lead Routes */}
          <Route path="/leadDashboard" element={<LeadDashboard />} /> 
          <Route path="/widgetPending" element={<WidgetPending />} />
          <Route path="/leadPTORequests" element={<LeadPTORequest />} />
          <Route path="/manProfile" element={<ManagerProfile />} />
          <Route path="/leadDirectory" element={<LeadDirectory />} />
          <Route path="/leadAnnouncements" element={<LeadAnnouncements/>}/>
          <Route path="leadAttendance" element={<LeadAttendance/>}  />
          <Route path="leadTraining" element={<LeadTraining/>}  />



        </Routes>
      </BrowserRouter>

    </div>
    
  );
}

export default App;
