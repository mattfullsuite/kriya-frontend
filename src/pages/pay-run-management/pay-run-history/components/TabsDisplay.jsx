import { useEffect, useState } from "react";

const TabsDisplay = ({ records }) => {
  useEffect(() => {
    console.log("COmponent:", records);
  }, [records]);
  const [activeTab, setActiveTab] = useState(records[0].name);

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
    <div className="max-w-[1300px] m-auto">
      <div
        role="tablist"
        className="tabs tabs-boxed whitespace-nowrap p-2 mt-2 bg-[#EAECDB] overflow-x-scroll w-full"
      >
        {records &&
          records.length > 1 &&
          records.map((record) => (
            <div className="w-80 text-center">
              <a
                role="tab"
                className={`tab  ${
                  activeTab === record.name && "tab-active"
                } w-full`}
                onClick={() => handleTabClick(record.name)}
                style={
                  activeTab === record.name
                    ? { ...activeTabStyle, color: "#FFFFFF" }
                    : tabStyle
                }
              >
                {record.name}
              </a>
            </div>
          ))}
      </div>
      <div className="flex flex-col flex-1"></div>
    </div>
  );
};

export default TabsDisplay;
