import { useEffect, useRef, useState } from "react";
import Headings from "../../../components/universal/Headings";
import ReportsTable from "./components/ReportsTable";

import HistoricalPayrunTable from "./HistoricalPayrunTable";

const PayRunHistory = () => {
  const [activeTab, setActiveTab] = useState("All Records");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const tabStyle = {
    color: "#666A40",
  };

  const activeTabStyle = {
    backgroundColor: "#666A40",
    borderColor: "#666a40",
  };
  return (
    <>
      <div className="p-5">
        <Headings text={"Payrun History"} />

        <div className="mt-10">
          <div role="tablist" className="tabs tabs-boxed p-2  bg-[#EAECDB]">
            <div className="w-1/2 text-center">
              <a
                role="tab"
                className={`tab  ${
                  activeTab === "All Records" && "tab-active"
                } w-full`}
                onClick={() => handleTabClick("All Records")}
                style={
                  activeTab === "All Records"
                    ? { ...activeTabStyle, color: "#FFFFFF" }
                    : tabStyle
                }
              >
                All Records
              </a>
            </div>
            <div className="w-1/2 text-center">
              <a
                role="tab"
                className={`tab  ${
                  activeTab === "Payrun Report" && "tab-active"
                } w-full`}
                onClick={() => handleTabClick("Payrun Report")}
                style={
                  activeTab === "Payrun Report"
                    ? { ...activeTabStyle, color: "#FFFFFF" }
                    : tabStyle
                }
              >
                Payroll Report
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          {activeTab === "All Records" && <ReportsTable />}
          {activeTab === "Payrun Report" && <HistoricalPayrunTable />}
        </div>
      </div>
    </>
  );
};

export default PayRunHistory;
