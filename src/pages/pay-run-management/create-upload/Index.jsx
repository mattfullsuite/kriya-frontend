import { useState } from "react";
import RegularPayrun from "./tabs/regular-payrun/Index";
import LastPayrun from "./tabs/last-payrun/Index";
import UploadPayrun from "./tabs/upload-payrun/Index";
import Headings from "../../../components/universal/Headings";

const CreateUploadPayrun = () => {
  const [activeTab, setActiveTab] = useState("Regular Payrun");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const tabStyle = {
    color: "#666A40", // Set the default text color
  };

  const activeTabStyle = {
    backgroundColor: "#666A40", // Set the background color for active tab
    borderColor: "#666a40", // Set the border color for active tab
  };

  return (
    <div className="p-5 max-w-[1300px]">
      <Headings text="Create/Upload Payrun" />

      <div className="mt-10">
        <div role="tablist" className="tabs tabs-boxed p-2  bg-[#EAECDB]">
          <div className="w-1/3 text-center">
            <a
              role="tab"
              className={`tab  ${
                activeTab === "Regular Payrun" && "tab-active"
              } w-full`}
              onClick={() => handleTabClick("Regular Payrun")}
              style={
                activeTab === "Regular Payrun"
                  ? { ...activeTabStyle, color: "#FFFFFF" }
                  : tabStyle
              }
            >
              Regular Payrun
            </a>
          </div>

          <div className="w-1/3 text-center">
            <a
              role="tab"
              className={`tab ${
                activeTab === "Last Payrun" && "tab-active"
              } w-full`}
              onClick={() => handleTabClick("Last Payrun")}
              style={
                activeTab === "Last Payrun"
                  ? { ...activeTabStyle, color: "#FFFFFF" }
                  : tabStyle
              }
            >
              Last Payrun
            </a>
          </div>
          <div className="w-1/3 text-center">
            <a
              role="tab"
              className={`tab ${
                activeTab === "Upload Payrun" && "tab-active"
              } w-full`}
              onClick={() => handleTabClick("Upload Payrun")}
              style={
                activeTab === "Upload Payrun"
                  ? { ...activeTabStyle, color: "#FFFFFF" }
                  : tabStyle
              }
            >
              Upload Payrun
            </a>
          </div>
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
