import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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
import EmployeeCsvReader from "../components/universal/EmployeeCsvReader";
import ViewEmployee from "../pages/hr/ViewEmployee";
import EditEmployee from "../pages/hr/EditEmployee";
import MyPulseDashboard from "../pages/universal/my-pulse/MyPulseDashboard";
import MoodTracker from "../pages/universal/my-pulse/MoodTracker";
import CheerAPeer from "../pages/universal/my-pulse/CheerAPeer";
import TimeTable from "../components/universal/TimeTable";
import MyTeam from "../pages/universal/my-team/MyTeam";
import TeamPTOAndAttendance from "../pages/universal/my-team/TeamPTOAndAttendance";
import EngagementIndex from "../pages/universal/my-team/EngagementIndex";
import CompensationAndRewards from "../pages/universal/my-team/CompensationAndRewards";
import AcademyScorecard from "../pages/universal/my-team/AcademyScorecard";
import ApplicantTracker from "../pages/hr/hr-management/ApplicantTracker";
import ApplicantCsvReader from "../components/universal/ApplicantCsvReader";
import EmployeeDirectoryComponent from "../components/universal/EmployeeDirectoryComponent";
import CompanyPulse from "../pages/hr/hr-management/CompanyPulse";
import Surveys from "../pages/hr/hr-management/Surveys";
import HelpCenter from "../pages/universal/HelpCenter";
import PayRunDashboard from "../pages/pay-run-management/dashboard/PayRunDashboard";
import PayRunCreateUpload from "../pages/pay-run-management/PayRunCreateUpload";
import PayRunHistory from "../pages/pay-run-management/pay-run-history/PayRunHistory";
import PayRunRequests from "../pages/pay-run-management/payroll-requests/PayrollRequests";
import CreateUploadPayrun from "../pages/pay-run-management/create-upload/Index";
import UploadPayrunOld from "../pages/pay-run-management/create-upload/tabs/upload-payrun-copy/Index";
import PayRunSettings from "../pages/pay-run-management/settings/PayRunSettings";
import HrManagement from "../pages/hr/HrManagement";
import EmployeeManagement from "../pages/hr/hr-management/EmployeeManagement";
import NotFound from "../pages/universal/error/NotFound";
import WeeklyPulseSurvey from "../pages/universal/my-pulse/WeeklyPulseSurvey";
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
import { useCookies } from "react-cookie";
import RecentCheers from "../pages/universal/my-pulse/RecentCheers";
import ViewCheerPost from "../pages/universal/my-pulse/ViewCheerPost";
import SuggestionBoxLandingPage from "../pages/universal/my-pulse/components/suggestion-box/SuggestionBoxLandingPage";
import PerformanceManagement from "../pages/hr/hr-management/PerformanceManagement";
import TeamPerformanceManagement from "../pages/universal/my-team/TeamPerformanceManagement";
import Tickets from "../pages/hr/hr-management/Tickets";
import HRTimeOffAndAttendance from "../pages/hr/HRTimeOffAndAttendance";
import ManageDesignation from "../pages/hr/components/preferences/ManageDesignation";
import ManageHolidaysAndEvents from "../pages/hr/components/preferences/ManageHolidaysAndEvents";
import ManageSuperiors from "../pages/hr/components/preferences/ManageSuperiors";
import ControlAccessRoles from "../pages/hr/components/preferences/ControlAccessRoles";
import ViewApplicant from "../pages/hr/hr-management/components/applicant-tracking-system/ViewApplicant";
import SendRequestComplaint from "../pages/universal/my-pulse/components/suggestion-box/SendRequestComplaint";
import EmployeeServicesCenter from "../pages/universal/my-pulse/EmployeeServicesCenter";
import ViewSuggestionBox from "../pages/universal/my-pulse/components/suggestion-box/ViewSuggestionBox";
import ViewEmployeeInitiated from "../pages/hr/hr-management/components/suggestion-box/ViewEmployeeInitiated";
import ViewDispute from "../pages/hr/hr-management/components/suggestion-box/ViewDispute";
import SendEmployeeTicket from "../pages/universal/my-pulse/components/suggestion-box/SendEmployeeTicket";
import ViewEmployeeTicket from "../pages/universal/my-pulse/components/suggestion-box/ViewEmployeeTicket";

// To be moved to Admin User
import CompanyManagement from "../pages/admin/company_management/Index";
import TicketsLandingPage from "../pages/hr/hr-management/components/suggestion-box/TicketsLandingPage";
import axios from "axios";
import DeviceManagement from "../pages/hr/hr-management/DeviceManagement";
import DeviceCsvReader from "../components/universal/DeviceCsvReader";

const HrEmployeeRoutes = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [cookie] = useCookies(["user"]);
  const [accessAttendance, setAccessAttendance] = useState();
  const [accessPayroll, setAccessPayroll] = useState();

  useEffect(() => {
    axios
      .get(BASE_URL + "/pref-getMyAccessData")
      .then(({ data }) => {
        setAccessAttendance(data[0].access_attendance);
        setAccessPayroll(data[0].access_payroll);
      })
      .catch(({ message }) => console.log(message));
  }, []);

  return (
    <Routes>
      <Route path="/hr" element={<HREmployee />}>
        <Route path="/hr/company-management" element={<CompanyManagement />} />
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

        <Route
          path="/hr/my-payslips"
          element={
            <MyPayslip
              textColor={"text-[#90946f]"}
              bgColor={"bg-[#90946f]"}
              gradientFrom={"from-[#666A40]"}
              gradientTo={"to-[#a0a47d]"}
            />
          }
        />

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

        <Route path="/hr/academy-courses" element={<AcademyCourses />} />

        <Route path="/hr/employees" element={<EmployeesList />} />

        <Route path="/hr/employees/add-employee" element={<AddEmployee />} />

        <Route path="/hr/employees/employee-csv-reader" element={<EmployeeCsvReader />} />

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
              userRole={1}
            />
          }
        />

        <Route
          path="/hr/my-pulse/cheer-a-peer/all-cheers"
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

        <Route
          path="/hr/my-pulse/cheer-a-peer/recent-cheers"
          element={
            <RecentCheers
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
          path="/hr/my-pulse/cheer-a-peer/all-cheers/view-post/:post_id"
          element={
            <ViewCheerPost
              bgColor={"bg-[#90946F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#E1E5B9]"}
              borderColor={"border-[#90946F"}
              textColor={"text-[#90946F]"}
              fillColor={"fill-[#90946F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
              focusBorder={"focus:border-[#90946F]"}
            />
          }
        />

        <Route
          path="/hr/my-pulse/weekly-pulse-survey"
          element={
            <WeeklyPulseSurvey
              bgColor={"bg-[#90946F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#a6a895]"}
              textColor={"text-[#90946F]"}
              fillColor={"fill-[#90946F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
              focusBorder={"focus:border-[#90946F]"}
            />
          }
        />

        <Route
          path="/hr/my-pulse/employee-services-center"
          element={
            <EmployeeServicesCenter
              bgColor={"bg-[#90946F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#a6a895]"}
              textColor={"text-[#90946F]"}
              fillColor={"fill-[#90946F]"}
              focusBorder={"focus:border-[#90946F]"}
              hoverList={"hover:bg-[#f4f5f0]"}
              activeList={"bg-[#e7e8df]"}
            />
          }
        >
          <Route
            path="/hr/my-pulse/employee-services-center"
            element={
              <Navigate
                to="/hr/my-pulse/employee-services-center/employee-ticket"
                replace
              />
            }
          />

          <Route
            path="/hr/my-pulse/employee-services-center/employee-ticket"
            element={
              <ViewEmployeeTicket
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />

          <Route
            path="/hr/my-pulse/employee-services-center/suggestion-box"
            element={
              <SuggestionBoxLandingPage
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />

          <Route
            path="/hr/my-pulse/employee-services-center/suggestion-box/new-request-or-complaint"
            element={
              <SendRequestComplaint
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />

          <Route
            path="/hr/my-pulse/employee-services-center/suggestion-box/:sbID"
            element={
              <ViewSuggestionBox
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                borderColor={"border-[#90946F]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />
        </Route>

        {/* <Route
          path="/hr/my-pulse/suggestion-box"
          element={<SuggestionTemp />}
        /> */}

        <Route
          path="/hr/my-pulse/tailored-guidance"
          element={<TailoredGuidance />}
        />
        {/*--------- END OF MY PULSE ----------*/}

        <Route
          path="/hr/my-performance"
          element={
            <MyPerformance
              bgColor={"bg-[#90946F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#a6a895]"}
              textColor={"text-[#90946F]"}
              fillColor={"fill-[#90946F]"}
              lightColor={"bg-[#EAECDB]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
              focusBorder={"focus:border-[#90946F]"}
            />
          }
        />

        <Route path="/hr/time-table" element={<TimeTable />} />

        {/*--------- START OF MY TEAM ----------*/}

        {cookie.user.hasDownline != null && (
          <Route
            path="/hr/team-management"
            element={
              <MyTeam
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                lightColor={"bg-[#EAECDB]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                focusBorder={"focus:border-[#90946F]"}
                accentOne={"#90946F"}
                accentTwo={"#d2d6b2"}
              />
            }
          />
        )}

        {cookie.user.hasDownline != null && (
          <Route
            path="/hr/team-management/team-pto-and-attendance"
            element={
              <TeamPTOAndAttendance
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                lightColor={"bg-[#EAECDB]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                focusBorder={"focus:border-[#90946F]"}
                accentOne={"#90946F"}
                accentTwo={"#d2d6b2"}
              />
            }
          />
        )}

        {cookie.user.hasDownline != null && (
          <Route
            path="/hr/team-management/engagement-index"
            element={
              <EngagementIndex
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                lightColor={"bg-[#EAECDB]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />
        )}

        {cookie.user.hasDownline != null && (
          <Route
            path="/hr/team-management/performance-management"
            element={
              <TeamPerformanceManagement
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                lightColor={"bg-[#EAECDB]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                focusBorder={"focus:border-[#90946F]"}
                progressColor={"[&::-webkit-progress-value]:bg-[#90946F]"}
              />
            }
          />
        )}

        {cookie.user.hasDownline != null && (
          <Route
            path="/hr/team-management/compensation-and-rewards"
            element={
              <CompensationAndRewards
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                lightColor={"bg-[#EAECDB]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />
        )}

        {cookie.user.hasDownline != null && (
          <Route
            path="/hr/team-management/academy-scorecard"
            element={
              <AcademyScorecard
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                lightColor={"bg-[#EAECDB]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />
        )}
        {/*--------- END OF MY TEAM ----------*/}

        <Route
          //path="/hr/hr-management/employee-management/applicant-tracking-system"
          path="/hr/hr-management/applicant-tracking-system"
          element={
            <ApplicantTracker
              bgColor={"bg-[#90946F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#a6a895]"}
              textColor={"text-[#90946F]"}
              fillColor={"fill-[#90946F]"}
              lightColor={"bg-[#EAECDB]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
              borderColor={"border-[#90946F]"}
              focusBorder={"focus:border-[#90946F]"}
            />
          }
        />

        <Route
          //path="/hr/hr-management/employee-management/applicant-tracking-system/view-applicant/:app_id"
          path="/hr/hr-management/applicant-tracking-system/view-applicant/:app_id"
          element={
            <ViewApplicant
              bgColor={"bg-[#90946F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#a6a895]"}
              textColor={"text-[#90946F]"}
              fillColor={"fill-[#90946F]"}
              lightColor={"bg-[#EAECDB]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
              borderColor={"border-[#90946F]"}
              focusBorder={"focus:border-[#90946F]"}
            />
          }
        />

        <Route
          //path="/hr/hr-management/employee-management/applicant-tracking-uploader"
          path="/hr/hr-management/applicant-tracking-uploader"
          element={<ApplicantCsvReader />}
        />

        <Route
          //path="/hr/hr-management/employee-management/applicant-tracking-uploader"
          path="/hr/hr-management/device-accountability-uploader"
          element={<DeviceCsvReader />}
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

        <Route path="/hr/hr-management/device-management" element={<DeviceManagement />} />

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
          element={
            <HRTimeOffAndAttendance
              bgColor={"bg-[#90946F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#a6a895]"}
              textColor={"text-[#90946F]"}
              fillColor={"fill-[#90946F]"}
              lightColor={"bg-[#EAECDB]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
              focusBorder={"focus:border-[#90946F]"}
              borderColor={"border-[#90946F]"}
              progressColor={"[&::-webkit-progress-value]:bg-[#90946F]"}
            />
          }
        />

        <Route
          path="/hr/hr-management/performance-management"
          element={<PerformanceManagement />}
        />

        <Route
          path="/hr/hr-management/workforce-analytics"
          //element={<WorkforceAnalytics />}
          element={<HRReports 
            bgColor={"bg-[#90946F]"}
            hoverColor={"hover:bg-[#686B51]"}
            disabledColor={"disabled:bg-[#a6a895]"}
            textColor={"text-[#90946F]"}
            fillColor={"fill-[#90946F]"}
            lightColor={"bg-[#EAECDB]"}
            focusBorder={"focus:border-[#90946F]"}/>}
        />

        <Route
          path="/hr/hr-management/tickets"
          element={
            <Tickets
              bgColor={"bg-[#90946F]"}
              hoverColor={"hover:bg-[#686B51]"}
              disabledColor={"disabled:bg-[#a6a895]"}
              textColor={"text-[#90946F]"}
              fillColor={"fill-[#90946F]"}
              accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
              focusBorder={"focus:border-[#90946F]"}
              lightColor={"bg-[#EAECDB]"}
              hoverList={"hover:bg-[#f4f5f0]"}
              activeList={"bg-[#e7e8df]"}
            />
          }
        >
          <Route
            path={"/hr/hr-management/tickets"}
            element={<TicketsLandingPage />}
          />

          <Route
            path="/hr/hr-management/tickets/employee-initiated/:sbID"
            element={
              <ViewEmployeeInitiated
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                borderColor={"border-[#90946F]"}
                accentColor={"[&::-webkit-slider-thumb]:bg-[#90946F]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />

          {accessAttendance === 1 &&
            accessPayroll === 1 && (
              <Route
                path="/hr/hr-management/tickets/disputes/all/:empID"
                element={
                  <ViewDispute
                    bgColor={"bg-[#90946F]"}
                    disabledColor={"disabled:bg-[#a6a895]"}
                    type={"all"}
                  />
                }
              />
            )}

          {accessAttendance === 1 && (
            <Route
              path="/hr/hr-management/tickets/disputes/attendance/:empID"
              element={
                <ViewDispute
                  bgColor={"bg-[#90946F]"}
                  disabledColor={"disabled:bg-[#a6a895]"}
                  type={"attendance"}
                />
              }
            />
          )}

          {accessPayroll === 1 && (
            <Route
              path="/hr/hr-management/tickets/disputes/payroll/:empID"
              element={
                <ViewDispute
                  bgColor={"bg-[#90946F]"}
                  disabledColor={"disabled:bg-[#a6a895]"}
                  type={"payroll"}
                />
              }
            />
          )}
        </Route>

        {/*--------- END OF HR MANAGEMENT ----------*/}

        {/*--------- START OF PAY RUN MANAGEMENT ----------*/}
        <Route
          path={`/hr/hr-management/payrun-management/`}
          element={<PayRunDashboard />}
        />

        <Route
          path={`/hr/hr-management/payrun-create-upload/`}
          element={<CreateUploadPayrun />}
        />

        <Route
          path={`/hr/hr-management/payrun-history/`}
          element={<PayRunHistory />}
        />

        <Route
          path={`/hr/hr-management/payrun-requests/`}
          element={<PayRunRequests />}
        />

        <Route
          path={`/hr/hr-management/payrun-settings/`}
          element={<PayRunSettings />}
        />

        <Route
          path={`/hr/hr-management/payrun-upload-old/`}
          element={<UploadPayrunOld />}
        />

        <Route path="/hr/hr-management/preferences" element={<HRManage />}>
          <Route
            path="/hr/hr-management/preferences/designation"
            element={
              <ManageDesignation
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                lightColor={"bg-[#EAECDB]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />

          <Route
            path="/hr/hr-management/preferences/holidays-and-events"
            element={
              <ManageHolidaysAndEvents
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                lightColor={"bg-[#EAECDB]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />

          <Route
            path="/hr/hr-management/preferences/superiors"
            element={
              <ManageSuperiors
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                lightColor={"bg-[#EAECDB]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />

          <Route
            path="/hr/hr-management/preferences/control-access-roles"
            element={
              <ControlAccessRoles
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                lightColor={"bg-[#EAECDB]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            }
          />
        </Route>

        {/*--------- END OF PAY RUN MANAGEMENT ----------*/}

        <Route path="/hr/help-center" element={<HelpCenter />} />

        <Route path="/hr/reports" element={
              <HRReports 
                bgColor={"bg-[#90946F]"}
                hoverColor={"hover:bg-[#686B51]"}
                disabledColor={"disabled:bg-[#a6a895]"}
                textColor={"text-[#90946F]"}
                fillColor={"fill-[#90946F]"}
                lightColor={"bg-[#EAECDB]"}
                focusBorder={"focus:border-[#90946F]"}
              />
            } />
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
