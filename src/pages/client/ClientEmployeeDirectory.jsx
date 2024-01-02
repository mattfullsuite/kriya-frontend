import React from "react";
import ClientSideBar from "../../components/client/ClientSideBar";
import EmployeeDirectoryComponent from "../../components/universal/EmployeeDirectoryComponent";


const ClientEmployeeDirectory = () => {
  return (
    <>
      <ClientSideBar/>

      <div className="p-4 sm:ml-64 flex flex-col">

        <EmployeeDirectoryComponent color={"#0097B2"} />
      </div>
    </>
  );
};

export default ClientEmployeeDirectory;
