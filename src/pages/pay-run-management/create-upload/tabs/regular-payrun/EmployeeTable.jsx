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
      columnsToHide(employeeList, payItems);
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

  const columnsToHide = (records, payItems) => {
    const payables = payItems.map((payItem) => payItem.pay_item_name);
    let hiddenCols = payItems
      .filter((item) => item.pay_item_type !== "Fixed")
      .map((item) => item.pay_item_name);

    const visibleCols = Object.keys(employeeList[0]).filter(
      (item) => !hiddenCols.includes(item)
    );

    records.forEach((record) => {
      payables.forEach((payable) => {
        if (record[payable] > 0 && !visibleCols.includes(payable)) {
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
