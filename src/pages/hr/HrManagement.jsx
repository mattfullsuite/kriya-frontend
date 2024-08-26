import React from "react";
import Headings from "../../components/universal/Headings";
import BuildingComponent from "../../components/universal/BuildingComponent";

const HrManagement = () => {
  return (
    <div className="max-w-[1300px] m-auto p-5">
      <Headings text={"HR Management"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </div>
  );
};

export default HrManagement;
