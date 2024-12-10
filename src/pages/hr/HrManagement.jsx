import React from "react";
import Headings from "../../components/universal/Headings";
import BuildingComponent from "../../components/universal/BuildingComponent";

const HrManagement = () => {
  return (
    <div className="max-w-[1300px] m-auto p-5">
      <Headings text={"HR Management"} />

      <div className="mt-3 flex flex-row justify-around">
              <div>
                <p className="text-[32px] font-bold text-[#363636] text-center leading-none">
                  11
                </p>
                <p className="text-[12px] text-[#858585] text-center leading-nione">
                  Assigned
                </p>
              </div>

              <div className="h-10 border-r border-[#e4e4e4]" />

              <div>
                <p className="text-[32px] font-bold text-[#363636] text-center leading-none">
                  22
                </p>
                <p className="text-[12px] text-[#858585] text-center leading-nione">
                  Unassigned
                </p>
              </div>
            </div>
    </div>
  );
};

export default HrManagement;
