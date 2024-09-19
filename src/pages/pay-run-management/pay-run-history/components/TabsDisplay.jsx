import { useEffect, useState } from "react";
import moment from "moment/moment";
import {
  addCommaAndFormatDecimal,
  addComma,
  formatDecimal,
} from "./../../assets/addCommaAndFormatDecimal";

const TabsDisplay = ({ records }) => {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (records && records.length > 0) {
      setActiveTab(records[0].name);
    }
  }, [records]);

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
          records.length > 0 &&
          records.map((record, index) => (
            <div key={index} className="w-80 text-center">
              <button
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
              </button>
            </div>
          ))}
      </div>

      <div className="flex flex-col flex-1 border">
        {records &&
          records.length > 0 &&
          records.map(
            (record) =>
              activeTab === record.name && (
                <div
                  key={record.name}
                  className="my-5 w-full overflow-auto border rounded-xl bg-white max-h-[800px]"
                >
                  <table>
                    <thead>
                      <tr className="text-right whitespace-nowrap p-2 border-b-4 font-bold border-gray-400">
                        {Object.keys(record.data).map((key, index) =>
                          index === 0 ? (
                            <td
                              className="text-left p-2 sticky top-0 left-0 bg-white z-20"
                              key={key}
                            >
                              {key}
                            </td>
                          ) : (
                            <td
                              className="p-2 sticky top-0 bg-white z-10"
                              key={key}
                            >
                              {moment(key).format("MMM DD, YYYY")}
                            </td>
                          )
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {record.data.map((data, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={`text-right whitespace-nowrap p-2 ${
                            rowIndex === record.length - 1
                              ? "border-t-4 border-gray-400 sticky bottom-0 bg-white z-20"
                              : ""
                          }`}
                        >
                          {Object.keys(data).map((column, index) =>
                            index === 0 ? (
                              <td
                                className="text-left p-2 font-medium sticky left-0 bg-white z-10"
                                key={column}
                              >
                                {data[column]}
                              </td>
                            ) : (
                              <td className="p-2" key={column}>
                                {addComma(formatDecimal(data[column]))}
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default TabsDisplay;
