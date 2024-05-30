import React from "react";
import { Routes, Route } from "react-router-dom";

import HREmployee from "../Layout/HREmployee";
import HRDashboard from "../pages/hr/HRDashboard";
import MyOnboardingPlan from "../pages/universal/MyOnboardingPlan";
// import HRProfile from "../pages/hr/HRProfile";
import MyPayslip from "../pages/universal/my-payslip/MyPayslips";
import MyBenefitsManagement from "../pages/universal/MyBenefitsManagement";
import MyPerformance from "../pages/universal/MyPerformance";
import AcademyCourses from "../pages/universal/AcademyCourses";
import PoliciesHandbook from "../pages/universal/PoliciesHandbook";
import Settings from "../pages/universal/Settings";
import EmployeesList from "../pages/admin/EmployeesList";
import AddEmployee from "../pages/hr/AddEmployee";
import ViewEmployee from "../pages/hr/ViewEmployee";
import EditEmployee from "../pages/hr/EditEmployee";
import MyPulseDashboard from "../pages/universal/my-pulse/MyPulseDashboard";
import MoodTracker from "../pages/universal/my-pulse/MoodTracker";
import CheerAPeer from "../pages/universal/my-pulse/CheerAPeer";
import TimeTable from "../components/universal/TimeTable";
import MyTeam from "../pages/universal/my-team/MyTeam";
import TeamPTOAndAttendance from "../pages/universal/my-team/TeamPTOAndAttendance";
import EngagementIndex from "../pages/universal/my-team/EngagementIndex";
import PerformanceManagement from "../pages/universal/my-team/PerformanceManagement";
import CompensationAndRewards from "../pages/universal/my-team/CompensationAndRewards";
import AcademyScorecard from "../pages/universal/my-team/AcademyScorecard";
import ApplicantTracker from "../pages/hr/hr-management/ApplicantTracker";
import ApplicantCsvReader from "../components/universal/ApplicantCsvReader";
import EmployeeDirectoryComponent from "../components/universal/EmployeeDirectoryComponent";
import CompanyPulse from "../pages/hr/hr-management/CompanyPulse";
import Surveys from "../pages/hr/hr-management/Surveys";
import CsvReader from "../pages/hr/hr-management/TimeOffAndAttendance";
import HelpCenter from "../pages/universal/HelpCenter";
import PayRunDashboard from "../pages/pay-run-management/dashboard/PayRunDashboard";
import PayRunCreateUpload from "../pages/pay-run-management/PayRunCreateUpload";
import PayRunReports from "../pages/pay-run-management/pay-run-reports/PayRunReports";
import PayRunRequests from "../pages/pay-run-management/payroll-requests/PayrollRequests";
import CreateUploadPayrun from "../pages/pay-run-management/create-upload/Index";
import PayRunSettings from "../pages/pay-run-management/settings/PayRunSettings";
import HrManagement from "../pages/hr/HrManagement";
import EmployeeManagement from "../pages/hr/hr-management/EmployeeManagement";
import NotFound from "../pages/universal/error/NotFound";
import WeeklyPulseSurvey from "../pages/universal/my-pulse/WeeklyPulseSurvey";
import SuggestionBox from "../pages/universal/my-pulse/SuggestionBox";
import TailoredGuidance from "../pages/universal/my-pulse/TailoredGuidance";
import WorkforceAnalytics from "../pages/hr/hr-management/WorkforceAnalytics";
import HRRequest from "../pages/hr/HRRequest";
import HRReports from "../pages/hr/HRReports";
import HRManage from "../pages/hr/HRManage";
import ExtrasBeta from "../pages/universal/ExtrasBeta";
import Profile from "../pages/universal/Profile";
import EmployeeInformation from "../pages/universal/EmployeeInformation";
import AllCheers from "../pages/universal/my-pulse/AllCheers";
import TimeoffAndAttendance from "../pages/universal/TimeoffAndAttendance";

const HrEmployeeRoutes = ({ checkIfDownline }) => {
  return (
    <Routes>
      <Route path="/hr" element={<HREmployee />}>
        <Route path="/hr/dashboard" element={<HRDashboard />} />

        <Route path="/hr/my-onboarding-plan" element={<MyOnboardingPlan />} />

        <Route
          path="/hr/my-personal-information"
          element={
            <EmployeeInformation
              hrView={false}
              avatarColor={"bg-[#676b41]"}
              textColor={"text-[#666A40]"}
              accentColor={"bg-[#EAECDB]"}
              primaryColor={"bg-[#676b41]"}
              focusBorder={"focus:border-[#676b41]"}
              disabledBg={"disabled:bg-[#f7f7f7]"}
            />
          }
        />

        {/* <Route path="/hr/my-personal-information" element={<Profile />}  /> */}

        <Route path="/hr/my-payslips" element={<MyPayslip />} />

        <Route
          path="/hr/my-time-off-and-attendance"
          element={
            <TimeoffAndAttendance
              fillColor={"fill-[#90946f]"}
              textColor={"text-[#90946f]"}
              bgColor={"bg-[#90946f]"}
            />
          }
        />

        <Route
          path="/hr/my-benefits-management"
          element={<MyBenefitsManagement />}
        />

        <Route path="/hr/my-performance" element={<MyPerformance />} />

        <Route path="/hr/academy-courses" element={<AcademyCourses />} />

        <Route path="/hr/employees" element={<EmployeesList />} />

        <Route path="/hr/employees/add-employee" element={<AddEmployee />} />

        <Route
          path="/hr/employees/view-employee/:emp_id"
          element={
            <EmployeeInformation
              hrView={true}
              avatarColor={"bg-[#676b41]"}
              textColor={"text-[#666A40]"}
              accentColor={"bg-[#EAECDB]"}
              primaryColor={"bg-[#676b41]"}
              focusBorder={"focus:border-[#676b41]"}
              disabledBg={"disabled:bg-[#f7f7f7]"}
            />
          }
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

        <Route path="/hr/my-pulse/suggestion-box" element={<SuggestionBox />} />

        <Route
          path="/hr/my-pulse/tailored-guidance"
          element={<TailoredGuidance />}
        />

        <Route
          path="/hr/my-pulse/all-cheers"
          element={
            <AllCheers
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
          element={<CreateUploadPayrun />}
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

        <Route path="/hr/hr-management/preferences" 
        element={<HRManage />} />

        {/*--------- END OF PAY RUN MANAGEMENT ----------*/}

        <Route path="/hr/help-center" element={<HelpCenter />} />

        <Route path="/hr/reports" element={<HRReports />} />
        <Route path="/hr/requests" element={<HRRequest />} />
        <Route path="/hr/extras" element={<ExtrasBeta />} />

        <Route path="/hr/policies-handbook" element={<PoliciesHandbook />} />

        <Route path="/hr/settings" element={<Settings />} />

        <Route path="/hr/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default HrEmployeeRoutes;
