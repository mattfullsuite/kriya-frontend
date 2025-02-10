import { useEffect, useState } from "react";
import { CurrencyInput } from "../../../assets/CurrencyInput";

const Step2 = ({
  employeeList,
  setEmployeeList,
  selectedEmployees,
  setSelectedEmployees,
  payItems,
  nextClick,
  displayAddNotes,
  //Payroll Notification
  savePayrollNotifDraft,
}) => {
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (
      employeeList &&
      payItems &&
      employeeList.length > 0 &&
      payItems.length > 0
    ) {
      columnsToHide(employeeList, payItems);
    }
  }, [employeeList, payItems]);

  const handleInput = (dataIndex, payItem, value) => {
    // Check if value is NaN, undefined, or null
    if (
      value === undefined ||
      value === null ||
      (isNaN(value) && value !== "-")
    ) {
      value = 0; // Set to 0 for invalid values except for "-"
    }
    if (value !== "-") {
      setEmployeeList((prevList) => {
        const updatedList = [...prevList];
        updatedList[dataIndex] = {
          ...updatedList[dataIndex],
          [payItem]: value,
        };
        return updatedList;
      });
    }
  };

  const columnsToHide = (records, payItems) => {
    const payables = payItems.map((payItem) => payItem.pay_item_name);
    let hiddenCols = payItems
      .filter((item) => item.pay_item_type !== "Fixed")
      .map((item) => item.pay_item_name);

    hiddenCols.push(
      "Full Name",
      "Net Pay",
      "Middle Name",
      "Date From",
      "Date To",
      "Date Payment",
      "Hire Date",
      "Net Pay (PP-1)",
      "Net Pay (PP-2)",
      "Net Pay (PP-3)",
      "Undertime/Tardiness Hours",
      "AWOL",
      "Unpaid Leaves",
      "Filed PTO Days",
      "Total Absences",
      "Notes",
      "Email",
      "Job Title",
      "Tax Withheld"
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
    "Employee ID": "41px",
    "Last Name": "129px",
    "First Name": "210px",
  };

  const onDisplayNotesClick = (e) => {
    displayAddNotes(e.target.id, employeeList);
  };

  return (
    <>
      {employeeList && employeeList.length > 0 && (
        <>
          <div id="step-2">
            <div className="mt-5 border-2 border-[#E4E4E4] rounded-[15px] bg-white overflow-auto h-[400px] text-sm">
              <table className="">
                <thead className="sticky top-0  bg-white z-10">
                  <tr className="text-left align-top border-b-4 whitespace-nowrap h-10">
                    <th className="sticky left-0">
                      <div className="px-2 pt-2 bg-white">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="checkbox"
                        />
                      </div>
                    </th>
                    {visibleColumns
                      .filter((key) => !hiddenColumns.includes(key))
                      .map((key) => (
                        <th
                          key={key}
                          className={`bg-white w-32 h-10 ${
                            key in fixedColumns ? "sticky" : ""
                          }`}
                          style={
                            key in fixedColumns
                              ? { left: fixedColumns[key] }
                              : {}
                          }
                        >
                          <div className="px-1 pt-2">{key}</div>
                        </th>
                      ))}
                    <th className="bg-white w-32 h-10">
                      <div className="px-1 pt-2">Add Pay Item</div>
                    </th>
                    <th className="bg-white w-32 h-10">
                      <div className="px-1 pt-2">Add Notes </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employeeList.map((employee, index) => (
                    <tr className="border-b bg-white" key={index}>
                      <td className="sticky left-0 ">
                        <div className="p-2 bg-white">
                          <input
                            id={index}
                            type="checkbox"
                            checked={selectedEmployees[index]}
                            onChange={() => handleCheckboxChange(index)}
                            className="checkbox"
                          />
                        </div>
                      </td>
                      {visibleColumns
                        .filter((key) => !hiddenColumns.includes(key))
                        .map((key) => (
                          <td
                            key={key}
                            className={`w-32 px-1 ${
                              key in fixedColumns ? "sticky bg-white" : ""
                            }`}
                            style={
                              key in fixedColumns
                                ? { left: fixedColumns[key] }
                                : {}
                            }
                          >
                            <div className="p-1"></div>
                            {[
                              "Employee ID",
                              "First Name",
                              "Last Name",
                              "Middle Name",
                              "Email",
                              "Job Title",
                            ].includes(key) ? (
                              employee[key]
                            ) : (
                              <CurrencyInput
                                dataIndex={index}
                                dataKey={key}
                                passedData={employee[key]}
                                updateList={handleInput}
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
                                  col != "Net Pay (PP-1)" &&
                                  col != "Net Pay (PP-2)" &&
                                  col != "Net Pay (PP-3)" &&
                                  col != "Notes" &&
                                  col != "Date From" &&
                                  col != "Date To" &&
                                  col != "Date Payment" &&
                                  col != "Hire Date" &&
                                  col != "Undertime/Tardiness Hours" &&
                                  col != "AWOL" &&
                                  col != "Filed PTO Days" &&
                                  col != "Total Absences" &&
                                  col != "Unpaid Leaves" &&
                                  col != "Tax Withheld" &&
                                  col != "Net Pay" &&
                                  col != "Middle Name" &&
                                  col != "Email" &&
                                  col != "Job Title"
                              )
                              .map((col) => (
                                <option key={col} value={col}>
                                  {col}
                                </option>
                              ))}
                        </select>
                      </td>
                      <td className="flex justify-center items-center">
                        <button
                          id={employee["Employee ID"]}
                          className="btn bg-[#666A40] shadow-md w-12 text-white hover:bg-[#666A40] hover:opacity-80"
                          onClick={(e) => onDisplayNotesClick(e)}
                        >
                          +
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="py-5 w-full flex flex-row justify-end gap-2">
              <button
                type="button"
                className="btn bg-[#666A40] shadow-md w-56 text-white hover:bg-[#666A40] hover:opacity-80"
                onClick={savePayrollNotifDraft}
              >
                Save Payroll Notif Draft
              </button>
              <button
                type="button"
                className="btn bg-[#666A40] shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80 "
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
