import React from "react";
import { Routes, Route } from "react-router-dom";

import ManagerEmployee from "../layout/ManagerEmployee";
import LeadDashboard from "../pages/leads/LeadDashboard";
import ClientUserProfile from "../pages/client/ClientUserProfile";
import MyPayslip from "../pages/universal/my-payslip/MyPayslips";
import LeadAttendance from "../pages/leads/LeadAttendance";
import TimeTable from "../components/universal/TimeTable";
import MyPulseDashboard from "../pages/universal/my-pulse/MyPulseDashboard";
import MoodTracker from "../pages/universal/my-pulse/MoodTracker";
import CheerAPeer from "../pages/universal/my-pulse/CheerAPeer";
import EmployeeDirectoryComponent from "../components/universal/EmployeeDirectoryComponent";
import MyTeam from "../pages/universal/my-team/MyTeam";
import TeamPTOAndAttendance from "../pages/universal/my-team/TeamPTOAndAttendance";
import EngagementIndex from "../pages/universal/my-team/EngagementIndex";
import PerformanceManagement from "../pages/universal/my-team/PerformanceManagement";
import CompensationAndRewards from "../pages/universal/my-team/CompensationAndRewards";
import AcademyScorecard from "../pages/universal/my-team/AcademyScorecard";
import PoliciesHandbook from "../pages/universal/PoliciesHandbook";
import ClientRequestHR from "../pages/client/ClientRequestHR";
import ExtrasBeta from "../pages/universal/ExtrasBeta";
import NotFound from "../pages/universal/error/NotFound";
import WeeklyPulseSurvey from "../pages/universal/my-pulse/WeeklyPulseSurvey";
import SuggestionBox from "../pages/universal/my-pulse/SuggestionBox";
import TailoredGuidance from "../pages/universal/my-pulse/TailoredGuidance";
import MyOnboardingPlan from "../pages/universal/MyOnboardingPlan";
import MyBenefitsManagement from "../pages/universal/MyBenefitsManagement";
import AcademyCourses from "../pages/universal/AcademyCourses";
import HelpCenter from "../pages/universal/HelpCenter";

const ManagerEmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/manager" element={<ManagerEmployee />}>

        <Route path="/manager/dashboard" element={<LeadDashboard />} />

        <Route path="/manager/my-onboarding-plan" element={<MyOnboardingPlan />} />

        <Route
          path="/manager/my-personal-information"
          element={<ClientUserProfile />}
        />

        <Route
          path="/manager/my-time-off-and-attendance"
          element={<LeadAttendance />}
        />

        <Route path="/manager/my-benefits-management" element={<MyBenefitsManagement />} />

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

        <Route path="/manager/academy-courses" element={<AcademyCourses />} />

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
    </Routes>
  );
};

export default ManagerEmployeeRoutes;
