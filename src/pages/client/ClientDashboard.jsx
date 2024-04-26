import React, { useState, useEffect } from "react";
import Axios from "axios";
import Headings from "../../components/universal/Headings";
import BuildingComponent from "../../components/universal/BuildingComponent";
import ClientSideBar from "../../components/client/ClientSideBar";
import DashBremainingPTO from "../../components/universal/DashBRemainingPTO";
import DashBButtons from "../../components/universal/DashBButtons";
import DashBBirthdays from "../../components/universal/DashBBirthdays";
import DashBAnniversaries from "../../components/universal/DashBAnniversaries";
import DashBGreeting from "../../components/universal/DashBGreeting";
import DashBPTOApprovedAndOwned from "../../components/universal/DashBPTOApprovedAndOwned";
import ManagerPTONotices from "../../components/manager/ManagerPTONotices";
import ManagerPTORequestTableLimited from "../../components/manager/ManagerPTORequestTableLimited";
import Bot from "../../components/universal/Bot";


const ClientDashboard = () => {
  // const [users, setUser] = useState([]);
  // const [announcements, setAnnouncements] = useState([]);
  // const [pleaves, setPendingLeaves] = useState([]);

  // const [ifManager, setIfManager] = useState([]);
  // const uid = users.emp_id;
  // const BASE_URL = process.env.REACT_APP_BASE_URL; //

  // useEffect(() => {
  //   const fetchAllPendingLeaves = async () => {
  //     try {
  //       const res = await Axios.get(BASE_URL + "/showpendingleaves");
  //       setPendingLeaves(res.data);
  //       const res2 = await Axios.get(BASE_URL + "/showpendingdepartmentleaveslimited");
  //       setIfManager(res2.data.length)
  //       console.log(res2.data.length)
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchAllPendingLeaves();
  // }, []);

  // useEffect(() => {
  //   const fetchAllAnnouncements = async () => {
  //     try {
  //       const res = await Axios.get(BASE_URL + "/announcements");
  //       setAnnouncements(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchAllAnnouncements();
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
  //     <div className="flex flex-col">
  //       <DashBGreeting></DashBGreeting>

  //       <div className="m-4 flex flex-col xl:flex-row gap-8">
  //         <div className="grow">
  //           <div className="flex flex-col md:flex-row overflow-x-auto">
  //             <div>
  //               <DashBButtons />
  //             </div>

  //             <div>
  //               <DashBremainingPTO />
  //             </div>
  //           </div>

  //           {(ifManager > 0) ? 

  //           <div className="mt-4">
  //             <ManagerPTORequestTableLimited link={"./svgs/lead_empty.svg"}></ManagerPTORequestTableLimited>
  //             <br />
  //             <ManagerPTONotices></ManagerPTONotices>
  //           </div>

  //           : null}

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
    <div className="box-border m-auto max-w-[1300px]">
      <Headings text={"Dashboard"} />

      <div className="box-border">
        <BuildingComponent />
      </div>

      <Bot />
    </div>
  );
};

export default ClientDashboard;