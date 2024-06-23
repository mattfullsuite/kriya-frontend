import React, { useState, useEffect } from "react";
import Headings from "../../components/universal/Headings";
import BuildingComponent from "../../components/universal/BuildingComponent";
import Axios from "axios";
import DashBremainingPTO from "../../components/universal/DashBRemainingPTO";
import DashBButtons from "../../components/universal/DashBButtons";
import ManagerPTONotices from "../../components/manager/ManagerPTONotices";
import DashBBirthdays from "../../components/universal/DashBBirthdays";
import DashBAnniversaries from "../../components/universal/DashBAnniversaries";
import DashBGreeting from "../../components/universal/DashBGreeting";
import ManagerPTORequestTableLimited from "../../components/manager/ManagerPTORequestTableLimited";
import DashBNumofLeaveToday from "../../components/universal/DashBNumofLeavesToday";
import DashBNumofLeaveWeek from "../../components/universal/DashBNumofLeavesWeek";
import DashBPTOApprovedAndOwned from "../../components/universal/DashBPTOApprovedAndOwned";
import Bot from "../../components/universal/Bot";


const LeadDashboard = () => {
  // const [users, setUser] = useState([]);
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  // const uid = users.emp_id;

  // useEffect(() => {
  //   initFlowbite();
  // }, []);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const res = await Axios.get(BASE_URL + "/login");
  //       setUser(res.data.user[0]);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  // return (
  //   <>
  //     <div className="flex flex-col max-w-[1300px] m-auto">
  //       <DashBGreeting />

  //       <div className="m-4 flex flex-col xl:flex-row gap-8">
  //         <div className="grow">
  //           <div className="flex flex-col md:flex-row md:overflow-x-auto">
  //             <div>
  //               <DashBButtons />
  //             </div>

  //             <div>
  //               <DashBremainingPTO />
  //             </div>

  //             <div>
  //               <DashBNumofLeaveToday />
  //             </div>

  //             <div>
  //               <DashBNumofLeaveWeek />
  //             </div>
  //           </div>

  //           <div className="mt-4">
  //             <ManagerPTORequestTableLimited
  //               link={"../svgs/lead_empty.svg"}
  //             ></ManagerPTORequestTableLimited>
  //           </div>

  //           <div className="mt-4">
  //             <ManagerPTONotices />
  //           </div>

  //           <div className="mt-4">
  //             <DashBPTOApprovedAndOwned uid={uid} />
  //           </div>
  //         </div>

  //         <div className="flex flex-col justify-start lg:flex-row xl:block">
  //           <DashBBirthdays />
  //           <br />
  //           <DashBAnniversaries />
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <div className="box-border m-auto max-w-[1300px] p-5">
      <Headings text={"Dashboard"} />

      <div className="box-border">
        <BuildingComponent />
      </div>

      <Bot />
    </div>
  );
};

export default LeadDashboard;
