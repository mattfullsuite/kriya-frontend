import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ManagerEmployee from "../Layout/ManagerEmployee";
import LeadDashboard from "../pages/leads/LeadDashboard";
import ClientUserProfile from "../pages/client/ClientUserProfile";
import MyPayslip from "../pages/universal/my-payslip/MyPayslips";
import TimeTable from "../components/universal/TimeTable";
import MyPulseDashboard from "../pages/universal/my-pulse/MyPulseDashboard";
import MoodTracker from "../pages/universal/my-pulse/MoodTracker";
import CheerAPeer from "../pages/universal/my-pulse/CheerAPeer";
import EmployeeDirectoryComponent from "../components/universal/EmployeeDirectoryComponent";
import MyTeam from "../pages/universal/my-team/MyTeam";
import TeamPTOAndAttendance from "../pages/universal/my-team/TeamPTOAndAttendance";
import EngagementIndex from "../pages/universal/my-team/EngagementIndex";
import TeamPerformanceManagement from "../pages/universal/my-team/TeamPerformanceManagement";
import CompensationAndRewards from "../pages/universal/my-team/CompensationAndRewards";
import AcademyScorecard from "../pages/universal/my-team/AcademyScorecard";
import PoliciesHandbook from "../pages/universal/PoliciesHandbook";
import ClientRequestHR from "../pages/client/ClientRequestHR";
import ExtrasBeta from "../pages/universal/ExtrasBeta";
import NotFound from "../pages/universal/error/NotFound";
import WeeklyPulseSurvey from "../pages/universal/my-pulse/WeeklyPulseSurvey";
import TailoredGuidance from "../pages/universal/my-pulse/TailoredGuidance";
import MyOnboardingPlan from "../pages/universal/MyOnboardingPlan";
import MyBenefitsManagement from "../pages/universal/MyBenefitsManagement";
import AcademyCourses from "../pages/universal/AcademyCourses";
import HelpCenter from "../pages/universal/HelpCenter";
import EmployeeInformation from "../pages/universal/EmployeeInformation";
import TimeoffAndAttendance from "../pages/universal/TimeoffAndAttendance";
import AllCheers from "../pages/universal/my-pulse/AllCheers";
import SuggestionTemp from "../pages/universal/SuggestionTemp";
import MyPerformance from "../pages/universal/MyPerformance";
import EmployeeServicesCenter from "../pages/universal/my-pulse/EmployeeServicesCenter";
import ViewEmployeeTicket from "../pages/universal/my-pulse/components/suggestion-box/ViewEmployeeTicket";
import SuggestionBoxLandingPage from "../pages/universal/my-pulse/components/suggestion-box/SuggestionBoxLandingPage";
import SendRequestComplaint from "../pages/universal/my-pulse/components/suggestion-box/SendRequestComplaint";
import ViewSuggestionBox from "../pages/universal/my-pulse/components/suggestion-box/ViewSuggestionBox";

const ManagerEmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/manager" element={<ManagerEmployee />}>
        <Route path="/manager/dashboard" element={<LeadDashboard />} />

        <Route
          path="/manager/my-onboarding-plan"
          element={<MyOnboardingPlan />}
        />

        <Route
          path="/manager/my-personal-information"
          element={
            <EmployeeInformation
              hrView={false}
              avatarColor={"bg-[#017474]"}
              textColor={"text-[#008080]"}
              accentColor={"bg-[#d3edea]"}
              primaryColor={"bg-[#017474]"}
              focusBorder={"focus:border-[#017474]"}
              disabledBg={"disabled:bg-[#f7f7f7]"}
            />
          }
        />

        <Route
          path="/manager/my-time-off-and-attendance"
          element={
            <TimeoffAndAttendance
              fillColor={"fill-[#159F9F]"}
              textColor={"text-[#159F9F]"}
              bgColor={"bg-[#159F9F]"}
            />
          }
        />

        {/* <Route
          path="/manager/my-benefits-management"
          element={<MyBenefitsManagement />}
        /> */}

        <Route
          path="/manager/my-payslips"
          element={
            <MyPayslip
              textColor={"text-[#159F9F]"}
              bgColor={"bg-[#159F9F]"}
              gradientFrom={"from-[#008080]"}
              gradientTo={"to-[#2BC9C9]"}
            />
          }
        />

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
              userRole={3}
            />
          }
        />

        <Route
          path="/manager/my-pulse/cheer-a-peer/all-cheers"
          element={
            <AllCheers
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#8DE0E0]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#159F9F]"}
              focusBorder={"focus:border-[#159F9F]"}
            />
          }
        />

        <Route
          path="/manager/my-pulse/weekly-pulse-survey"
          element={
            <WeeklyPulseSurvey
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#8DE0E0]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#159F9F]"}
              focusBorder={"focus:border-[#159F9F]"}
            />
          }
        />

        <Route
          path="/manager/my-pulse/employee-services-center"
          element={
            <EmployeeServicesCenter
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#137272]"}
              disabledColor={"disabled:bg-[#64e4db]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              focusBorder={"focus:border-[#159F9F]"}
              hoverList={"hover:bg-[#f1fcfb]"}
              activeList={"bg-[#cef9f4]"}
            />
          }
        >
          <Route
            path="/manager/my-pulse/employee-services-center"
            element={
              <Navigate
                to="/manager/my-pulse/employee-services-center/employee-ticket"
                replace
              />
            }
          />

          <Route
            path="/manager/my-pulse/employee-services-center/employee-ticket"
            element={
              <ViewEmployeeTicket
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#137272]"}
              disabledColor={"disabled:bg-[#64e4db]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              focusBorder={"focus:border-[#159F9F]"}
              />
            }
          />

          <Route
            path="/manager/my-pulse/employee-services-center/suggestion-box"
            element={
              <SuggestionBoxLandingPage
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#137272]"}
              disabledColor={"disabled:bg-[#64e4db]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              focusBorder={"focus:border-[#159F9F]"}
              />
            }
          />

          <Route
            path="/manager/my-pulse/employee-services-center/suggestion-box/new-request-or-complaint"
            element={
              <SendRequestComplaint
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#137272]"}
              disabledColor={"disabled:bg-[#64e4db]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              focusBorder={"focus:border-[#159F9F]"}
              />
            }
          />

          <Route
            path="/manager/my-pulse/employee-services-center/suggestion-box/:sbID"
            element={
              <ViewSuggestionBox
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#137272]"}
              disabledColor={"disabled:bg-[#64e4db]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              borderColor={"border-[#159F9F]"}
              focusBorder={"focus:border-[#159F9F]"}
              />
            }
          />
        </Route>

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
          path="/manager/my-performance"
          element={
            <MyPerformance
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#8DE0E0]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#159F9F]"}
              focusBorder={"focus:border-[#159F9F]"}
              progressColor={"[&::-webkit-progress-value]:bg-[#159F9F]"}
            />
          }
        />

        <Route path="/manager/academy-courses" element={<AcademyCourses />} />

        <Route
          path="/manager/team-management"
          element={
            <MyTeam
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#8DE0E0]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#159F9F]"}
              focusBorder={"focus:border-[#159F9F]"}
              accentOne={"#159F9F"}
              accentTwo={"#d3edea"}
            />
          }
        />

        <Route
          path="/manager/team-management/team-pto-and-attendance"
          element={
            <TeamPTOAndAttendance
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#8DE0E0]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#159F9F]"}
              focusBorder={"focus:border-[#159F9F]"}
              accentOne={"#159F9F"}
              accentTwo={"#d3edea"}
            />
          }
        />

        <Route path="/manager/time-table" element={<TimeTable />} />

        <Route
          path="/manager/team-management/engagement-index"
          element={
            <EngagementIndex
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#8DE0E0]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#159F9F]"}
              focusBorder={"focus:border-[#159F9F]"}
            />
          }
        />

        <Route
          path="/manager/team-management/performance-management"
          element={
            <TeamPerformanceManagement
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#8DE0E0]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#159F9F]"}
              lightColor={"bg-[#d3edea]"}
              focusBorder={"focus:border-[#159F9F]"}
              progressColor={"[&::-webkit-progress-value]:bg-[#159F9F]"}
            />
          }
        />

        <Route
          path="/manager/team-management/compensation-and-rewards"
          element={
            <CompensationAndRewards
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#8DE0E0]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#159F9F]"}
              lightColor={"bg-[#d3edea]"}
              focusBorder={"focus:border-[#159F9F]"}
            />
          }
        />

        <Route
          path="/manager/team-management/academy-scorecard"
          element={
            <AcademyScorecard
              bgColor={"bg-[#159F9F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#8DE0E0]"}
              textColor={"text-[#159F9F]"}
              fillColor={"fill-[#159F9F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#159F9F]"}
              lightColor={"bg-[#d3edea]"}
              focusBorder={"focus:border-[#159F9F]"}
            />
          }
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
