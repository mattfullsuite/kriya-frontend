import React from "react";
import ManagerSideBar from "../../components/manager/ManagerSideBar";
import DashBremainingPTO from "../../components/universal/DashBRemainingPTO";
import DashBButtons from "../../components/universal/DashBButtons";
import ManagerPTONotices from "../../components/manager/ManagerPTONotices";
import DashBBirthdays from "../../components/universal/DashBBirthdays";
import DashBAnniversaries from "../../components/universal/DashBAnniversaries";
import DashBOwnPTO from "../../components/universal/DashBOwnPTO";
import DashBGreeting from "../../components/universal/DashBGreeting";
import ManagerPTORequestTableLimited from "../../components/manager/ManagerPTORequestTableLimited";
import DashBNumofLeaveToday from "../../components/universal/DashBNumofLeavesToday";

const LeadDashboard = () => {

  return (
    <>
      <ManagerSideBar></ManagerSideBar>

      <div className="p-4 sm:ml-64 flex flex-col">
        <DashBGreeting></DashBGreeting>

        <div className="m-4 flex flex-col xl:flex-row">
          <div className="grow">
            <div className="flex flex-col md:flex-row">
                <div>
                  <DashBButtons></DashBButtons>
                </div>

                <div>
                  <DashBremainingPTO></DashBremainingPTO>
                </div>

                <div>
                  <DashBNumofLeaveToday/>
                </div>
            </div>

            <div className="mt-4">
              <ManagerPTORequestTableLimited link={"./svgs/lead_empty.svg"}></ManagerPTORequestTableLimited>
              <ManagerPTONotices></ManagerPTONotices>
              <DashBOwnPTO link={"./svgs/lead_empty.svg"} ></DashBOwnPTO>
            </div>
          </div>

          <div className="divider divider-horizontal"></div>

          <div className="flex flex-col justify-start lg:flex-row xl:block">
            <DashBBirthdays></DashBBirthdays>
            <DashBAnniversaries></DashBAnniversaries>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDashboard;
