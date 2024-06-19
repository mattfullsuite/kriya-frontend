import Headings from "../../../components/universal/Headings";
import RequestsTable from "./components/RequestsTables";
import figma from "../../../assets/figma.png";
import axios from "axios";
import { useEffect, useState } from "react";

const PayRunRequests = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
    {
      requestID: 2,
      requesterPic: figma,
      requesterName: "Requester 2",
      requesterJT: "Job Title",
      recipientName: "Recipient 2",
      recipientJT: "Job Title",
      requestType: "Request Type",
      dateRequested: "MM/DD/YYY",
      status: "Approved",
    },
  ];

  const [requestData, setRequestData] = useState(requestDataInitial);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(BASE_URL + "/d-getAllDispute");
      setRequestData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      <div>
        <Headings text={"Payroll Requests"} />
        <RequestsTable requestData={requestData} />
      </div>
    </>
  );
};

export default PayRunRequests;
