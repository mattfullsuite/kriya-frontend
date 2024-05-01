import { duration } from "moment";
import Headings from "../../../components/universal/Headings";
import ReportsDiv from "./components/ReportsTable";

const PayRunReports = () => {
  let reportsData = [
    {
      id: 1,
      dateTimeGenerated: "MM/DD/YY hh:mm:ss",
      duration: "MM/DD/YY - MM/DD/YY",
      payDate: "MM/DD/YY",
      source: "Uploaded",
    },
    {
      id: 2,
      dateTimeGenerated: "MM/DD/YY hh:mm:ss",
      duration: "MM/DD/YY - MM/DD/YY",
      payDate: "MM/DD/YY",
      source: "Created",
    },
    {
      id: 3,
      dateTimeGenerated: "MM/DD/YY hh:mm:ss",
      duration: "MM/DD/YY - MM/DD/YY",
      payDate: "MM/DD/YY",
      source: "Uploaded",
    },
    {
      id: 4,
      dateTimeGenerated: "MM/DD/YY hh:mm:ss",
      duration: "MM/DD/YY - MM/DD/YY",
      payDate: "MM/DD/YY",
      source: "Created",
    },
    {
      id: 5,
      dateTimeGenerated: "MM/DD/YY hh:mm:ss",
      duration: "MM/DD/YY - MM/DD/YY",
      payDate: "MM/DD/YY",
      source: "Uploaded",
    },
  ];

  return (
    <>
      <div>
        <Headings text={"Pay Run Reports"} />
        <ReportsDiv reportsData={reportsData} />
      </div>
    </>
  );
};

export default PayRunReports;
