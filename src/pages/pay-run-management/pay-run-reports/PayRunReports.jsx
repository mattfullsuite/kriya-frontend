import { useEffect, useRef, useState } from "react";
import Headings from "../../../components/universal/Headings";
import ReportsTable from "./components/ReportsTable";
import axios from "axios";

const PayRunReports = () => {
  return (
    <>
      <div>
        <Headings text={"Payrun Reports"} />
        <ReportsTable />
      </div>
    </>
  );
};

export default PayRunReports;
