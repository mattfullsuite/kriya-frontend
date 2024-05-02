import Headings from "../../../components/universal/Headings";
import RequestsTable from "./components/RequestsTables";
import figma from "../../../assets/figma.png";

const PayRunRequests = () => {
  const requestData = [
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
    {
      requestID: 3,
      requesterPic: figma,
      requesterName: "Requester 3",
      requesterJT: "Job Title",
      recipientName: "Recipient 3",
      recipientJT: "Job Title",
      requestType: "Request Type",
      dateRequested: "MM/DD/YYY",
      status: "Pending",
    },
    {
      requestID: 4,
      requesterPic: figma,
      requesterName: "Requester 4",
      requesterJT: "Job Title",
      recipientName: "Recipient 4",
      recipientJT: "Job Title",
      requestType: "Request Type",
      dateRequested: "MM/DD/YYY",
      status: "Approved",
    },
    {
      requestID: 5,
      requesterPic: figma,
      requesterName: "Requester 5",
      requesterJT: "Job Title",
      recipientName: "Recipient 5",
      recipientJT: "Job Title",
      requestType: "Request Type",
      dateRequested: "MM/DD/YYY",
      status: "Approved",
    },
    {
      requestID: 6,
      requesterPic: figma,
      requesterName: "Requester 6",
      requesterJT: "Job Title",
      recipientName: "Recipient 6",
      recipientJT: "Job Title",
      requestType: "Request Type",
      dateRequested: "MM/DD/YYY",
      status: "Pending",
    },
    {
      requestID: 7,
      requesterPic: figma,
      requesterName: "Requester 7",
      requesterJT: "Job Title",
      recipientName: "Recipient 7",
      recipientJT: "Job Title",
      requestType: "Request Type",
      dateRequested: "MM/DD/YYY",
      status: "Executed",
    },
  ];
  return (
    <>
      <div>
        <Headings text={"Pay Run Requests"} />
        <RequestsTable requestData={requestData} />
      </div>
    </>
  );
};

export default PayRunRequests;
