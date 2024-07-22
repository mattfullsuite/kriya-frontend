import React from "react";
import { Routes, Route } from "react-router-dom";

import RegularEmployee from "../Layout/RegularEmployee.jsx";
import ClientDashboard from "../pages/client/ClientDashboard";
import MyPayslip from "../pages/universal/my-payslip/MyPayslips";
import TimeTable from "../components/universal/TimeTable.jsx";
import MyPulseDashboard from "../pages/universal/my-pulse/MyPulseDashboard.jsx";
import MoodTracker from "../pages/universal/my-pulse/MoodTracker.jsx";
import CheerAPeer from "../pages/universal/my-pulse/CheerAPeer.jsx";
import EmployeeDirectoryComponent from "../components/universal/EmployeeDirectoryComponent.jsx";
import MyTeam from "../pages/universal/my-team/MyTeam.jsx";
import NotFound from "../pages/universal/error/NotFound.jsx";
import TeamPTOAndAttendance from "../pages/universal/my-team/TeamPTOAndAttendance.jsx";
import EngagementIndex from "../pages/universal/my-team/EngagementIndex.jsx";
import TeamPerformanceManagement from "../pages/universal/my-team/TeamPerformanceManagement.jsx";
import CompensationAndRewards from "../pages/universal/my-team/CompensationAndRewards.jsx";
import AcademyScorecard from "../pages/universal/my-team/AcademyScorecard.jsx";
import PoliciesHandbook from "../pages/universal/PoliciesHandbook.jsx";
import ClientRequestHR from "../pages/client/ClientRequestHR.jsx";
import ExtrasBeta from "../pages/universal/ExtrasBeta.jsx";
import WeeklyPulseSurvey from "../pages/universal/my-pulse/WeeklyPulseSurvey.jsx";
import SuggestionBox from "../pages/universal/my-pulse/SuggestionBox.jsx";
import TailoredGuidance from "../pages/universal/my-pulse/TailoredGuidance.jsx";
import MyOnboardingPlan from "../pages/universal/MyOnboardingPlan.jsx";
import MyBenefitsManagement from "../pages/universal/MyBenefitsManagement.jsx";
import MyPerformance from "../pages/universal/MyPerformance.jsx";
import AcademyCourses from "../pages/universal/AcademyCourses.jsx";
import HelpCenter from "../pages/universal/HelpCenter.jsx";
import EmployeeInformation from "../pages/universal/EmployeeInformation.jsx";
import TimeoffAndAttendance from "../pages/universal/TimeoffAndAttendance.jsx";
import AllCheers from "../pages/universal/my-pulse/AllCheers";
import { useCookies } from "react-cookie";
import SuggestionTemp from "../pages/universal/SuggestionTemp.jsx";

const RegularEmployeeRoutes = ({ checkIfDownline }) => {
  const [cookie, setCookie] = useCookies(["user"]);

  return (
    <Routes>
      <Route path="/regular" element={<RegularEmployee />}>
        <Route path="/regular/dashboard" element={<ClientDashboard />} />

        <Route
          path="/regular/my-onboarding-plan"
          element={<MyOnboardingPlan />}
        />

        <Route
          path="/regular/my-personal-information"
          element={
            <EmployeeInformation
              hrView={false}
              avatarColor={"bg-[#BA4E00]"}
              textColor={"text-[#CC5500]"}
              accentColor={"bg-[#FFE2CE]"}
              primaryColor={"bg-[#BA4E00]"}
              focusBorder={"focus:border-[#BA4E00]"}
              disabledBg={"disabled:bg-[#f7f7f7]"}
            />
          }
        />

        <Route
          path="/regular/my-payslips"
          element={
            <MyPayslip
              textColor={"text-[#CC5500]"}
              bgColor={"bg-[#BA4E00]"}
              gradientFrom={"from-[#CC5500]"}
              gradientTo={"to-[#FF974D]"}
            />
          }
        />

        <Route
          path="/regular/my-time-off-and-attendance"
          element={
            <TimeoffAndAttendance
              fillColor={"fill-[#EA7B2D]"}
              textColor={"text-[#EA7B2D]"}
              bgColor={"bg-[#EA7B2D]"}
            />
          }
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
              userRole={2}
            />
          }
        />

        <Route
          path="/regular/my-pulse/cheer-a-peer/all-cheers"
          element={
            <AllCheers
              bgColor={"bg-[#EA7B2D]"}
              hoverColor={"hover:bg-[#EA7B2D]"}
              disabledColor={"disabled:bg-[#FFB682]"}
              textColor={"text-[#EA7B2D]"}
              fillColor={"fill-[#EA7B2D]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#EA7B2D]"}
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
          element={<SuggestionTemp />}
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
          element={
            <MyPerformance
              bgColor={"bg-[#EA7B2D]"}
              hoverColor={"hover:bg-[#CE5500]"}
              disabledColor={"disabled:bg-[#FFB682]"}
              textColor={"text-[#EA7B2D]"}
              fillColor={"fill-[#EA7B2D]"}
              focusBorder={"focus:border-[#EA7B2D]"}
              progressColor={"[&::-webkit-progress-value]:bg-[#EA7B2D]"}
            />
          }
        />

        <Route path="/regular/academy-courses" element={<AcademyCourses />} />

        <Route path="/regular/time-table" element={<TimeTable />} />

        {cookie.user.hasDownline != null && (
          <Route
            path="/regular/team-management"
            element={
              <MyTeam
                bgColor={"bg-[#EA7B2D]"}
                hoverColor={"hover:bg-[#CE5500]"}
                disabledColor={"disabled:bg-[#FFB682]"}
                textColor={"text-[#EA7B2D]"}
                fillColor={"fill-[#EA7B2D]"}
                lightColor={"bg-[#FFE2CE]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#EA7B2D]"}
                focusBorder={"focus:border-[#EA7B2D]"}
                accentOne={"#EA7B2D"}
                accentTwo={"#FFE2CE"}
              />
            }
          />
        )}

        {cookie.user.hasDownline != null && (
          <Route
            path="/regular/team-management/team-pto-and-attendance"
            element={
              <TeamPTOAndAttendance
                bgColor={"bg-[#EA7B2D]"}
                hoverColor={"hover:bg-[#CE5500]"}
                disabledColor={"disabled:bg-[#FFB682]"}
                textColor={"text-[#EA7B2D]"}
                fillColor={"fill-[#EA7B2D]"}
                lightColor={"bg-[#FFE2CE]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#EA7B2D]"}
                focusBorder={"focus:border-[#EA7B2D]"}
                accentOne={"#EA7B2D"}
                accentTwo={"#FFE2CE"}
              />
            }
          />
        )}

        {cookie.user.hasDownline != null && (
          <Route
            path="/regular/team-management/engagement-index"
            element={
              <EngagementIndex
                bgColor={"bg-[#EA7B2D]"}
                hoverColor={"hover:bg-[#CE5500]"}
                disabledColor={"disabled:bg-[#FFB682]"}
                textColor={"text-[#EA7B2D]"}
                fillColor={"fill-[#EA7B2D]"}
                lightColor={"bg-[#FFE2CE]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#EA7B2D]"}
                focusBorder={"focus:border-[#EA7B2D]"}
                accentOne={"#EA7B2D"}
                accentTwo={"#FFE2CE"}
              />
            }
          />
        )}

        {cookie.user.hasDownline != null && (
          <Route
            path="/regular/team-management/performance-management"
            element={
              <TeamPerformanceManagement
                bgColor={"bg-[#EA7B2D]"}
                hoverColor={"hover:bg-[#CE5500]"}
                disabledColor={"disabled:bg-[#FFB682]"}
                textColor={"text-[#EA7B2D]"}
                fillColor={"fill-[#EA7B2D]"}
                lightColor={"bg-[#FFE2CE]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#EA7B2D]"}
                focusBorder={"focus:border-[#EA7B2D]"}
                progressColor={"[&::-webkit-progress-value]:bg-[#EA7B2D]"}
              />
            }
          />
        )}

        {cookie.user.hasDownline != null && (
          <Route
            path="/regular/team-management/compensation-and-rewards"
            element={
              <CompensationAndRewards
                bgColor={"bg-[#EA7B2D]"}
                hoverColor={"hover:bg-[#CE5500]"}
                disabledColor={"disabled:bg-[#FFB682]"}
                textColor={"text-[#EA7B2D]"}
                fillColor={"fill-[#EA7B2D]"}
                lightColor={"bg-[#FFE2CE]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#EA7B2D]"}
                focusBorder={"focus:border-[#EA7B2D]"}
              />
            }
          />
        )}

        {cookie.user.hasDownline != null && (
          <Route
            path="/regular/team-management/academy-scorecard"
            element={
              <AcademyScorecard
                bgColor={"bg-[#EA7B2D]"}
                hoverColor={"hover:bg-[#CE5500]"}
                disabledColor={"disabled:bg-[#FFB682]"}
                textColor={"text-[#EA7B2D]"}
                fillColor={"fill-[#EA7B2D]"}
                lightColor={"bg-[#FFE2CE]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#EA7B2D]"}
                focusBorder={"focus:border-[#EA7B2D]"}
              />
            }
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
    </Routes>
  );
};

export default RegularEmployeeRoutes;
