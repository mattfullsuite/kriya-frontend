import figma from "../../../assets/figma.png";
import axios from "axios";
import { useEffect, useState } from "react";

import Headings from "../../../components/universal/Headings";
import RequestsTable from "./components/RequestsTables";
import ViewPayDispute from "./components/ViewPayDispute";

const PayRunRequests = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedRow, setSelectedRow] = useState();

  const requestDataInitial = [
    {
      requestID: 1,
      requesterPic: figma,
      requesterName: "Requester 1",
      requesterJT: "Job Title",
      recipientName: "Recipient 1",
      recipientJT: "Job Title",
      requestType: "Request Type",
      dateRequested: "MM/DD/YYY",
      status: "Executed",
    },
  ];

  const [requestData, setRequestData] = useState(requestDataInitial);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(BASE_URL + "/d-getAllPayrollDispute");
      console.log(response);
      setRequestData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowClick = (data) => {
    document.getElementById(`edit-form`).showModal();
    console.log("selected: ", data);
    setSelectedRow(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      <div className="p-5">
        <Headings text={"Payroll Requests"} />
        <RequestsTable data={requestData} handleViewClick={handleRowClick} />
        <ViewPayDispute
          payDisputeInfo={selectedRow}
          textColor={"bg-[#666A40]"}
          bgColor={"bg-[#666A40]"}
          fetchRecords={fetchRecords}
        />
      </div>
    </>
  );
};

export default PayRunRequests;
