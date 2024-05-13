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
//#region Pay Run Management
import PayRunDashboard from "./pages/pay-run-management/dashboard/PayRunDashboard.jsx";
import PayRunCreateUpload from "./pages/pay-run-management/PayRunCreateUpload";
import PayRunReports from "./pages/pay-run-management/pay-run-reports/PayRunReports.jsx";
import PayRunRequests from "./pages/pay-run-management/payroll-requests/PayrollRequests.jsx";
import PayRunSettings from "./pages/pay-run-management/settings/PayRunSettings.jsx";
//#endregion
import AccountantEmployee from "./Layout/AccountantEmployee.jsx";
//#region My Pulse
import MyPulseDashboard from "./pages/universal/my-pulse/MyPulseDashboard.jsx";
import MoodTracker from "./pages/universal/my-pulse/MoodTracker.jsx";
import CheerAPeer from "./pages/universal/my-pulse/CheerAPeer.jsx";
import WeeklyPulseSurvey from "./components/universal/WeeklyPulseSurvey.jsx";
import SuggestionBox from "./components/universal/SuggestionBox.jsx";
import TailoredGuidance from "./components/universal/TailoredGuidance.jsx";
//#endregion
import TeamPTOAndAttendance from "./pages/universal/my-team/TeamPTOAndAttendance.jsx";
import EngagementIndex from "./pages/universal/my-team/EngagementIndex.jsx";
import PerformanceManagement from "./pages/universal/my-team/PerformanceManagement.jsx";
import CompensationAndRewards from "./pages/universal/my-team/CompensationAndRewards.jsx";
import AcademyScorecard from "./pages/universal/my-team/AcademyScorecard.jsx";
import MyTeam from "./pages/universal/my-team/MyTeam.jsx";
import CsvReader from "./components/universal/CsvReader.jsx";
import TimeTable from "./components/universal/TimeTable.jsx";
import ApplicantCsvReader from "./components/universal/ApplicantCsvReader.jsx";

// Universal
import MyPayslip from "./pages/universal/my-payslip/MyPayslips.jsx";
import HrManagement from "./pages/hr/HrManagement.jsx";
import EmployeeDirectoryComponent from "./components/universal/EmployeeDirectoryComponent.jsx";
import EmployeeManagement from "./pages/hr/EmployeeManagement.jsx";
import CompanyPulse from "./pages/hr/CompanyPulse.jsx";
import Surveys from "./pages/hr/Surveys.jsx";
import MyOnboardingPlan from "./pages/universal/MyOnboardingPlan.jsx";
import MyBenefitsManagement from "./pages/universal/MyBenefitsManagement.jsx";
import MyPerformance from "./pages/universal/MyPerformance.jsx";
import AcademyCourses from "./pages/universal/AcademyCourses.jsx";
import HelpCenter from "./pages/universal/HelpCenter.jsx";
import Settings from "./pages/universal/Settings.jsx";
import ApplicantTracker from "./pages/hr/ApplicantTracker.jsx";

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
          <Routes>
            {/* General Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:user_key"
              element={<ResetPassword />}
            />

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
              {/* <Route
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
            </Route>
            {/*----------END OF REGULAR EMPLOYEEE VIEW----------*/}

            {/*----------MANAGER EMPLOYEEE VIEW----------*/}
            <Route path="/manager" element={<ManagerEmployee />}>
              <Route path="/manager/dashboard" element={<LeadDashboard />} />
              <Route
                path="/manager/my-personal-information"
                element={<ClientUserProfile />}
              />
              <Route path="/manager/my-payslips" element={<MyPayslip />} />
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
              {/* <Route
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
              <Route
                path="/hr/policies-handbook"
                element={<PoliciesHandbook />}
              />
              <Route path="/hr/settings" element={<Settings />} />
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
              {/* <Route
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

              <Route path="/hr/hr-management/employee-management/applicant-tracking-system" element={<ApplicantTracker />} />
              
              <Route path="/hr/hr-management/employee-management/applicant-tracking-uploader" element={<ApplicantCsvReader />} />

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

              <Route path="/hr/help-center" element={<HelpCenter />} />

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
              {/* <Route path="/hr/upload-csv" element={<CsvReader />} /> */}
              {/* <Route path="/hr/reports" element={<HRReports />} />
            <Route path="/hr/requests" element={<HRRequest />} />
            <Route path="/hr/preferences" element={<HRManage />} />
            <Route path="/hr/extras" element={<ExtrasBeta />} /> */}
              <Route path="/hr/hr-management" element={<HrManagement />} />
              <Route
                path="/hr/hr-management/employee-management"
                element={<EmployeeManagement />}
              />
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
    </>
  );
}

export default App;
