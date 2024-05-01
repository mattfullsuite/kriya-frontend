import Headings from "../../../components/universal/Headings";
import RequestsTable from "./components/RequestsTables";

const PayRunRequests = () => {
  const requestData = [];
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
