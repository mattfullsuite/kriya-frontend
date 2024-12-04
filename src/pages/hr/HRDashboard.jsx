import React, { useState, useEffect } from "react";
import Headings from "../../components/universal/Headings";
import BuildingComponent from "../../components/universal/BuildingComponent";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import HRSideBar from "../../components/hr/HRSideBar";
import DashBGreeting from "../../components/universal/DashBGreeting";
import HRNumEmployees from "../../components/hr/HRNumOfEmployees";
import DashBButtons from "../../components/universal/DashBButtons";
import DashBremainingPTO from "../../components/universal/DashBRemainingPTO";
import DashBBirthdays from "../../components/universal/DashBBirthdays";
import DashBAnniversaries from "../../components/universal/DashBAnniversaries";
import HRPTONotices from "../../components/hr/HRPTONotices";
import DashBOwnPTO from "../../components/universal/DashBOwnPTO";
import DashBNumofAllLeavesToday from "../../components/hr/DashBNumofAllLeavesToday";
import DashBNumofLeavesWeek from "../../components/hr/DashBNumofLeavesWeek";
import ManagerPTONotices from "../../components/manager/ManagerPTONotices";
import ManagerPTORequestTableLimited from "../../components/manager/ManagerPTORequestTableLimited";
import Bot from "../../components/universal/Bot";
import HRDashboardRemainingPTO from "./hr-management/components/hr-dashboard/HRDashboardRemainingPTO"
import { HRDashboardLeaveTaken } from "./hr-management/components/hr-dashboard/HRDashboardLeaveTaken";
import { HRDashboardLeaveRequest } from "./hr-management/components/hr-dashboard/HRDashboardLeaveRequest";

const HRDashboard = () => {  
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  Axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [ifManager, setIfManager] = useState([]);

  const [users, setUser] = useState([]);
  const uid = users.emp_id;

  useEffect(() => {
    Axios.get(BASE_URL + "/login").then((response) => {
      if (response.data.loggedIn == false) {
        navigate("/login");
      } else {
        console.log(response.data.user[0].f_name);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/login");
        const res2 = await Axios.get(
          BASE_URL + "/showpendingdepartmentleaveslimited"
        );
        setUser(res.data.user);
        setIfManager(res2.data.length);
        console.log("CONSOLE: " + res2.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  // return (
  //   <>
  //   {/* This was what I've done but cancelled (line 64 - 75) - Anthony */}
  //     <div className="max-w-full p-5 m-auto ">
  //       <Headings text={<DashBGreeting />} />

  //       <h2 className="text-center mt-4 md:text-lg font-bold md:text-left md:mt-6">Time Off & Attendance Summary</h2> 
  //       <div>
  //           <div className="flex flex-wrap flex-col lg:flex-row lg:flex-wrap lg:justify-start justify-center items-center gap-2 p-2">
  //             <HRDashboardRemainingPTO />
  //             <HRDashboardLeaveTaken />
  //             <HRDashboardLeaveRequest />
  //           </div>
  //       </div>

  //       {/* <div className="flex flex-col xl:flex-row gap-8"> 
  //         <div className="grow">
  //           <div className="flex flex-col">
  //             <div className="flex flex-col md:flex-row md:overflow-x-auto">
  //               <div>
  //                 <DashBButtons />
  //               </div>

  //               <div>
  //                 <DashBremainingPTO />
  //               </div>

  //               <div>
  //                 <DashBNumofAllLeavesToday />
  //               </div>

  //               <div>
  //                 <DashBNumofLeavesWeek />
  //               </div>
  //             </div>

  //             <div>
  //               <HRNumEmployees/>
  //             </div>
  //           </div>

  //           {ifManager === 1 ? (
  //             <div className="mt-4">
  //               <ManagerPTORequestTableLimited
  //                 link={"./svgs/lead_empty.svg"}
  //               />
  //               <ManagerPTONotices />
  //             </div>
  //           ) : null}

  //           <div className="mt-4">
  //             <HRPTONotices />
  //           </div>

  //           <div>
  //             <DashBOwnPTO
  //               link={"./svgs/hr_empty.svg"}
  //               alt="Empty PTO"
  //             />
  //           </div>
  //         </div>

  //         <div className="flex flex-col justify-start lg:flex-row xl:block lg:shrink-0">
  //           <DashBBirthdays/>
  //           <br />
  //           <DashBAnniversaries/>
  //         </div>
  //       </div>  */}
  //     </div>
  //   </>
  // );

return(
    <div className="box-border m-auto max-w-[1300px] p-5">
      <Headings text={"Dashboard"} />

      <div className="box-border">
         <BuildingComponent />
       </div>

      <Bot />
    </div>
   );
 };

export default HRDashboard;
