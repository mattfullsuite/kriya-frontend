import React from "react";
import Headings from "../../components/universal/Headings";
import HRSideBar from "../../components/hr/HRSideBar";
import EmployeeDirectoryComponent from "../../components/universal/EmployeeDirectoryComponent";

const HRDirectory = () => {
  return (
    <>
      <HRSideBar/>

      <div className="p-4 sm:ml-64 flex flex-col">
        <EmployeeDirectoryComponent color={"#555656"} />
      </div>
    </>
  );
};

export default HRDirectory;
