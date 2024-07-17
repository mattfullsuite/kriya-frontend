import { useEffect, useState } from "react";

import { NewInput } from "./NewInput";

const EmployeeTable = ({ employeeList, payItems }) => {
  const [empList, setEmpList] = useState(null);
  const [payItemsTypes, setPayItemsTypes] = useState(null);
  const [hiddenColumns, setHiddenColumns] = useState(null);

  useEffect(() => {
    setEmpList(employeeList);
    getTypes(payItems);
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

  const addColumn = () => {};

  const removeColumn = () => {};

  return (
    <>
      {empList && (
        <div className="mt-5 flex flex-col border-2  border-[#E4E4E4] rounded-[15px] p-5 bg-white overflow-auto">
          <table className="h-96">
            <tr className="whitespace-nowrap align-top">
              {Object?.keys(empList[0]).map((key) => (
                <th className="p-1 " key={key}>
                  {key}
                </th>
              ))}
            </tr>
            {empList.map((employee, index) => (
              <tr key={index}>
                {Object.keys(employee).map((key) => (
                  <td key={key} className="border-b p-1">
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
          </table>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
