import React from "react";
import ClientSideBar from "../../components/client/ClientSideBar";
import Headings from "../../components/universal/Headings";
import RequestComplaints from "../../components/universal/RequestComplaints";

const ClientRequestHR = () => {
  return (
    <>
      <ClientSideBar />
      <div className="p-4 sm:ml-64">
        <Headings text={"Request HR"} />

        <div className="flex flex-col md:flex-row overflow-x-auto mx-4 mt-10">
          <div>
            <RequestComplaints />
          </div>
        </div>

      </div>
    </>
  );
};

export default ClientRequestHR;
