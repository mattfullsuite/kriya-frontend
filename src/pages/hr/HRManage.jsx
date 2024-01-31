
import React from "react";
import HRSideBar from "../../components/hr/HRSideBar";
import Headings from "../../components/universal/Headings";
import HRManageHoliday from "../../components/hr/HRManageHoliday";
import HRManageDivision from "../../components/hr/HRManageDivision";
import HRManageLeads from "../../components/hr/HRManageLeads";
const HRManage = () => {

  return (
    <>
      <HRSideBar />

      <div className="p-4 sm:ml-64 flex flex-col">
        <Headings text={"Preferences"} />

        <div className="collapse collapse-arrow bg-ghost-200 border-2 mt-10 mb-3">
          <input type="radio" name="my-accordion-2"/> 
          <div className="collapse-title text-l font-bold">
            - Assign New Lead
          </div>
          <div className="collapse-content"> 
            <HRManageLeads/>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-ghost-200 border-2 mb-3">
          <input type="radio" name="my-accordion-2" /> 
          <div className="collapse-title text-l font-bold">
            - Create New Designation
          </div>
          <div className="collapse-content"> 
            <HRManageDivision/>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-ghost-200 border-2 mb-3">
          <input type="radio" name="my-accordion-2" /> 
          <div className="collapse-title text-l font-bold">
            - Add New Holidays/Events
          </div>
          <div className="collapse-content"> 
            <HRManageHoliday/>
          </div>
        </div>

        {/* <div className="mt-20">
          <HRManageLeads/>
        </div>
        <div className="mt-10">
          <HRManageDivision/>
        </div>
        <div className="mt-20">
          <HRManageHoliday/>
        </div> */}


      </div>
    </>
  );
};

export default HRManage;
