import { useEffect, useState } from "react";
import { NewInput } from "./NewInput";

const Step2 = ({
  employeeList,
  setEmployeeList,
  selectedEmployees,
  setSelectedEmployees,
  payItems,
  nextClick,
}) => {
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    if (employeeList && payItems) {
      columnsToHide(employeeList, payItems);
      setSelectedEmployees(new Array(employeeList.length).fill(true));
    }
  }, [employeeList, payItems]);

  const handleInput = (dataIndex, payItem, value) => {
    setEmployeeList((prevList) => {
      const updatedList = [...prevList];
      updatedList[dataIndex] = {
        ...updatedList[dataIndex],
        [payItem]: value,
      };
      return updatedList;
    });
  };

  const columnsToHide = (records, payItems) => {
    const payables = payItems.map((payItem) => payItem.pay_item_name);
    let hiddenCols = payItems
      .filter((item) => item.pay_item_type !== "Fixed")
      .map((item) => item.pay_item_name);

    hiddenCols.push(
      "Previous Net Pay 1",
      "Previous Net Pay 2",
      "Previous Net Pay 3"
    );

    const visibleCols = Object.keys(employeeList[0]).filter(
      (item) => !hiddenCols.includes(item)
    );

    records.forEach((record) => {
      payables.forEach((payable) => {
        if (record[payable] != 0 && !visibleCols.includes(payable)) {
          visibleCols.push(payable);
          hiddenCols = hiddenCols.filter((pitem) => pitem != payable);
        }
      });
    });

    setVisibleColumns(visibleCols);
    setHiddenColumns(hiddenCols);
  };

  const handleColumnAddition = (columnName) => {
    setVisibleColumns((prev) => [...prev, columnName]);
    setHiddenColumns((prev) => prev.filter((col) => col !== columnName));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedEmployees(new Array(employeeList.length).fill(newSelectAll));
  };

  const handleCheckboxChange = (index) => {
    const updatedSelection = [...selectedEmployees];
    updatedSelection[index] = !updatedSelection[index];

    // If any checkbox is unchecked, uncheck the "Select All" checkbox
    const allSelected = updatedSelection.every((isSelected) => isSelected);
    setSelectAll(allSelected);

    setSelectedEmployees(updatedSelection);
  };

  const fixedColumns = {
    "Employee ID": "50px",
    "Last Name": "147px",
    "First Name": "245px",
    "Middle Name": "340px",
  };

  return (
    <>
      {employeeList && (
        <>
          <div id="step-2">
            <div className="mt-5 flex flex-col border-2 border-[#E4E4E4] rounded-[15px] p-5 bg-white overflow-auto h-[400px]">
              <table className="">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-left align-top border-b-4 whitespace-nowrap h-10">
                    <th className="sticky left-0">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="checkbox"
                      />
                    </th>
                    {visibleColumns
                      .filter((key) => !hiddenColumns.includes(key))
                      .map((key) => (
                        <th
                          key={key}
                          className={`bg-white w-32 px-1 h-10 ${
                            key in fixedColumns ? "sticky" : ""
                          }`}
                          style={
                            key in fixedColumns
                              ? { left: fixedColumns[key] }
                              : {}
                          }
                        >
                          {key}
                        </th>
                      ))}
                    <th className="px-1 h-10">Add Pay Item</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeList.map((employee, index) => (
                    <tr className="border-b px-1 bg-white" key={index}>
                      <td className="sticky left-0 w-32">
                        <input
                          id={index}
                          type="checkbox"
                          checked={selectedEmployees[index]}
                          onChange={() => handleCheckboxChange(index)}
                          className="checkbox"
                        />
                      </td>
                      {visibleColumns
                        .filter((key) => !hiddenColumns.includes(key))
                        .map((key) => (
                          <td
                            key={key}
                            className={`px-1 w-32 ${
                              key in fixedColumns ? "sticky bg-white" : ""
                            }`}
                            style={
                              key in fixedColumns
                                ? { left: fixedColumns[key] }
                                : {}
                            }
                          >
                            {isNaN(Number(employee[key])) ? (
                              employee[key]
                            ) : (
                              <NewInput
                                dataIndex={index}
                                dataKey={key}
                                data={employee[key]}
                                onValueChange={handleInput}
                              />
                            )}
                          </td>
                        ))}
                      <td>
                        <select
                          onChange={(e) => handleColumnAddition(e.target.value)}
                          className="cursor-pointer p-2 hover:bg-gray-200 text-center"
                        >
                          <option>+</option>
                          {hiddenColumns &&
                            hiddenColumns
                              .filter(
                                (col) =>
                                  col != "Previous Net Pay 1" &&
                                  col != "Previous Net Pay 2" &&
                                  col != "Previous Net Pay 3"
                              )
                              .map((col) => (
                                <option key={col} value={col}>
                                  {col}
                                </option>
                              ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 w-full flex">
              <button
                type="button"
                className="btn bg-[#666A40] shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto"
                onClick={nextClick}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Step2;