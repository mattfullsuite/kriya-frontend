import React from "react";
import HRSideBar from "../../components/hr/HRSideBar";
import Headings from "../../components/universal/Headings";
import HRManageHoliday from "../../components/hr/HRManageHoliday";
import HRManageDivision from "../../components/hr/HRManageDivision";
const HRManage = () => {

  return (
    <>
      <HRSideBar />

      <div className="p-4 sm:ml-64 flex flex-col">
        <Headings text={"Settings"} />
        <div className="mt-10">
          <HRManageDivision/>
        </div>
        <div className="mt-20">
          <HRManageHoliday/>
        </div>


      </div>
    </>
  );
};

export default HRManage;
