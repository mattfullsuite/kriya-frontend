import React from "react";
import Headings from "../../components/universal/Headings";
import BuildingComponent from "../../components/universal/BuildingComponent";

const HrManagement = () => {
  return (
    <>
      <Headings text={"HR Management"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </>
  );
};

export default HrManagement;
