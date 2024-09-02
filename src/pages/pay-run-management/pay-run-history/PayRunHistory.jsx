import { useEffect, useRef, useState } from "react";
import Headings from "../../../components/universal/Headings";
import ReportsTable from "./components/ReportsTable";
import axios from "axios";

import HistoricalPayrunTable from "./HistoricalPayrunTable";

const PayRunHistory = () => {
  return (
    <>
      <div className="p-5">
        <Headings text={"Payrun History"} />
        <ReportsTable />
        <HistoricalPayrunTable />
      </div>
    </>
  );
};

export default PayRunHistory;
