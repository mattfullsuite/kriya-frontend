import { useEffect, useState } from "react";
import { NewInput } from "./NewInput";

const EmployeeTable = ({ employeeList, payItems }) => {
  const [empList, setEmpList] = useState(null);
  const [payItemsList, setPayItemsList] = useState(null);
  const [payItemsTypes, setPayItemsTypes] = useState(null);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (employeeList && payItems) {
      setEmpList(employeeList);
      getTypes(payItems);
      setPayItemsList(payItems);
      columnsToHide(payItems);
      setVisibleColumns(Object.keys(employeeList[0]));
    }
  }, [employeeList, payItems]);

  const handleInput = (dataIndex, payItem, value) => {
    console.log("Index: ", dataIndex);
    console.log("Pay Item: ", payItem);
    console.log("Input: ", value);
    setEmpList((prevList) => {
      const updatedList = [...prevList];
      updatedList[dataIndex] = {
        ...updatedList[dataIndex],
        [payItem]: value,
      };
      return updatedList;
    });
    console.log("Employee List: ", empList);
  };

  const getTypes = (payItems) => {
    const type = [...new Set(payItems.map((item) => item["pay_item_type"]))];
    setPayItemsTypes(type);
  };

  const columnsToHide = (payItems) => {
    const hiddenCols = payItems
      .filter((item) => item.pay_item_type !== "Fixed")
      .map((item) => item.pay_item_name);

    console.log("Hidden Columns: ", hiddenCols);
    setHiddenColumns(hiddenCols);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleColumnAddition = (columnName) => {
    setVisibleColumns((prev) => [...prev, columnName]);
    setHiddenColumns((prev) => prev.filter((col) => col !== columnName));
    setDropdownVisible(false);
  };

  return (
    <>
      {empList && (
        <div className="mt-5 flex flex-col border-2 border-[#E4E4E4] rounded-[15px] p-5 bg-white overflow-auto">
          <table className="h-96">
            <thead>
              <tr className="whitespace-nowrap text-left align-top border-b-4">
                {visibleColumns
                  .filter((key) => !hiddenColumns.includes(key))
                  .map((key) => (
                    <th className="px-2" key={key}>
                      {key}
                    </th>
                  ))}
                <th className="px-2">
                  <button onClick={toggleDropdown}>+</button>
                  {dropdownVisible && (
                    <ul className="absolute bg-white shadow-md">
                      {hiddenColumns.map((col) => (
                        <li
                          key={col}
                          onClick={() => handleColumnAddition(col)}
                          className="cursor-pointer p-2 hover:bg-gray-200"
                        >
                          {col}
                        </li>
                      ))}
                    </ul>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {empList.map((employee, index) => (
                <tr key={index}>
                  {visibleColumns
                    .filter((key) => !hiddenColumns.includes(key))
                    .map((key) => (
                      <td key={key} className="border-b px-2 whitespace-nowrap">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
