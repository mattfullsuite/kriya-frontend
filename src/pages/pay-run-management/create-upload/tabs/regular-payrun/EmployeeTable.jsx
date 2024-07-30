import { useEffect, useState } from "react";
import { NewInput } from "./NewInput";

const EmployeeTable = ({ employeeList, payItems }) => {
  const [empList, setEmpList] = useState(null);
  const [payItemsList, setPayItemsList] = useState(null);
  const [payItemsTypes, setPayItemsTypes] = useState(null);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);

  useEffect(() => {
    if (employeeList && payItems) {
      setEmpList(employeeList);
      getTypes(payItems);
      setPayItemsList(payItems);
      columnsToHide(payItems);
    }
  }, [employeeList, payItems]);

  const handleInput = (dataIndex, payItem, value) => {
    setEmpList((prevList) => {
      const updatedList = [...prevList];
      updatedList[dataIndex] = {
        ...updatedList[dataIndex],
        [payItem]: value,
      };
      return updatedList;
    });
  };

  const getTypes = (payItems) => {
    const type = [...new Set(payItems.map((item) => item["pay_item_type"]))];
    setPayItemsTypes(type);
  };

  const columnsToHide = (payItems) => {
    const hiddenCols = payItems
      .filter((item) => item.pay_item_type !== "Fixed")
      .map((item) => item.pay_item_name);
    setHiddenColumns(hiddenCols);
    const visibleCols = Object.keys(employeeList[0]);
    setVisibleColumns(visibleCols.filter((item) => !hiddenCols.includes(item)));
  };

  const handleColumnAddition = (columnName) => {
    setVisibleColumns((prev) => [...prev, columnName]);
    setHiddenColumns((prev) => prev.filter((col) => col !== columnName));
  };

  return (
    <>
      {empList && (
        <div className="mt-5 flex flex-col border-2 border-[#E4E4E4] rounded-[15px] p-5 bg-white overflow-auto">
          <table className="h-96">
            <thead>
              <tr className=" text-left align-top border-b-4">
                {visibleColumns
                  .filter((key) => !hiddenColumns.includes(key))
                  .map((key) => (
                    <th className="px-2 h-20 w-36" key={key}>
                      {key}
                    </th>
                  ))}
                <th className="px-2 h-20 w-40">Add Pay Item</th>
              </tr>
            </thead>
            <tbody>
              {empList.map((employee, index) => (
                <tr className="border-b px-4 whitespace-nowrap" key={index}>
                  {visibleColumns
                    .filter((key) => !hiddenColumns.includes(key))
                    .map((key) => (
                      <td key={key}>
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
                      className="cursor-pointer p-2 hover:bg-gray-200"
                    >
                      <option>Select an Item</option>
                      {hiddenColumns &&
                        hiddenColumns.map((col) => (
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
      )}
    </>
  );
};

export default EmployeeTable;
