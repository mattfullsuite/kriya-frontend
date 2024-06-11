import { useState } from "react";
import RegularPayrun from "./tabs/RegularPayrun";
import LastPayrun from "./tabs/last-payrun/Index";
import UploadPayrun from "./tabs/upload-payrun/Index";
import Headings from "../../../components/universal/Headings";

const CreateUploadPayrun = () => {
  const [activeTab, setActiveTab] = useState("Last Payrun");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const tabStyle = {
    color: "#666A40", // Set the default text color
    fontWeight: "normal", // Set font weight to normal for inactive tabs
  };

  const activeTabStyle = {
    backgroundColor: "#FFFFFF", // Set the background color for active tab
    borderColor: "#666a40", // Set the border color for active tab
    fontWeight: "bold", // Set the font weight to bold for active tab
  };

  return (
    <div className="max-w-[1300px]">
      <Headings text="Create/Upload Payrun" />

      <div className="mt-10">
        <div role="tablist" className="tabs tabs-boxed">
          <a
            role="tab"
            className={`tab  ${activeTab === "Regular Payrun" && "tab-active"}`}
            onClick={() => handleTabClick("Regular Payrun")}
            style={
              activeTab === "Regular Payrun"
                ? { ...activeTabStyle, color: "#666A40" }
                : tabStyle
            }
          >
            Regular Payrun
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "Last Payrun" && "tab-active"}`}
            onClick={() => handleTabClick("Last Payrun")}
            style={
              activeTab === "Last Payrun"
                ? { ...activeTabStyle, color: "#666A40" }
                : tabStyle
            }
          >
            Last Payrun
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "Upload Payrun" && "tab-active"}`}
            onClick={() => handleTabClick("Upload Payrun")}
            style={
              activeTab === "Upload Payrun"
                ? { ...activeTabStyle, color: "#666A40" }
                : tabStyle
            }
          >
            Upload Payrun
          </a>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        {activeTab === "Regular Payrun" && <RegularPayrun />}
        {activeTab === "Last Payrun" && <LastPayrun />}
        {activeTab === "Upload Payrun" && <UploadPayrun />}
      </div>
    </div>
  );
};
export default CreateUploadPayrun;
