import React from "react";
import { Routes, Route } from "react-router-dom";

import RegularEmployee from "../layout/RegularEmployee.jsx";
import ClientDashboard from "../pages/client/ClientDashboard";
import ClientOnboardingPlan from "../pages/client/ClientOnboardingPlan";
import ClientUserProfile from "../pages/client/ClientUserProfile";
import MyPayslip from "../pages/universal/my-payslip/MyPayslips";
import ClientAttendance from "../pages/client/ClientAttendance.jsx";
import TimeTable from "../components/universal/TimeTable.jsx";
import MyPulseDashboard from "../pages/universal/my-pulse/MyPulseDashboard.jsx";
import MoodTracker from "../pages/universal/my-pulse/MoodTracker.jsx";
import CheerAPeer from "../pages/universal/my-pulse/CheerAPeer.jsx";
import EmployeeDirectoryComponent from "../components/universal/EmployeeDirectoryComponent.jsx";
import ClientPerformance from "../pages/client/ClientPerformance.jsx";
import ClientCourses from "../pages/client/ClientCourses.jsx";
import MyTeam from "../pages/universal/my-team/MyTeam.jsx";
import NotFound from "../pages/universal/error/NotFound.jsx";
import TeamPTOAndAttendance from "../pages/universal/my-team/TeamPTOAndAttendance.jsx";
import EngagementIndex from "../pages/universal/my-team/EngagementIndex.jsx";
import PerformanceManagement from "../pages/universal/my-team/PerformanceManagement.jsx";
import CompensationAndRewards from "../pages/universal/my-team/CompensationAndRewards.jsx";
import AcademyScorecard from "../pages/universal/my-team/AcademyScorecard.jsx";
import PoliciesHandbook from "../pages/universal/PoliciesHandbook.jsx";
import ClientRequestHR from "../pages/client/ClientRequestHR.jsx";
import ExtrasBeta from "../pages/universal/ExtrasBeta.jsx";
import WeeklyPulseSurvey from "../pages/universal/my-pulse/WeeklyPulseSurvey.jsx";
import SuggestionBox from "../pages/universal/my-pulse/SuggestionBox.jsx";
import TailoredGuidance from "../pages/universal/my-pulse/TailoredGuidance.jsx";

const RegularEmployeeRoutes = ({ checkIfDownline }) => {
  return (
    <Routes>
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

        <Route path="/regular/my-performance" element={<ClientPerformance />} />

        <Route path="/regular/academy-courses" element={<ClientCourses />} />

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

        <Route path="/regular/hr-request" element={<ClientRequestHR />} />

        <Route path="/regular/extras" element={<ExtrasBeta />} />

        <Route path="/regular/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default RegularEmployeeRoutes;
