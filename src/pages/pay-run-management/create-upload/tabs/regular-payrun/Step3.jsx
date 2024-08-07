import { useEffect, useState } from "react";

const Step3 = ({ employeeRecords, finalizeClick, payItems }) => {
  const [employeeList, setEmployeeList] = useState();
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);

  useEffect(() => {
    if (employeeRecords && payItems) {
      setEmployeeList(employeeRecords);
      columnsToHide(employeeRecords, payItems);
      setHiddenColumns((prevValue) => [...prevValue, "Job Title", "Hire Date"]);
    }
  }, [employeeRecords]);

  const columnsToHide = (records, payItems) => {
    const payables = payItems.map((payItem) => payItem.pay_item_name);
    let hiddenCols = payItems
      .filter((item) => item.pay_item_type !== "Fixed")
      .map((item) => item.pay_item_name);

    const visibleCols = Object.keys(records[0]).filter(
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

  return (
    <>
      {employeeList && (
        <dialog
          id="step-3"
          className="modal flex flex-col p-4 w-full overflow-y-auto bg-gray-500 bg-opacity-60"
        >
          <div className="flex flex-row my-2 p-2 w-full">
            <button
              className="ml-auto mr-[30px]"
              onClick={() => document.getElementById("step-3").close()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="5"
                stroke="currentColor"
                className="w-6 h-6 text-white fixed"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-row my-2 p-2 w-full">
            <div className="mt-5 flex flex-col border-2 border-[#E4E4E4] rounded-[15px] p-5 bg-white overflow-auto">
              <table className="h-96">
                <thead>
                  <tr className="text-left align-top border-b-4">
                    {visibleColumns
                      .filter((key) => !hiddenColumns.includes(key))
                      .map((key) => (
                        <th className="px-2 h-20 w-36" key={key}>
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {employeeList.map((employee, index) => (
                    <tr className="border-b px-4 whitespace-nowrap" key={index}>
                      {visibleColumns
                        .filter((key) => !hiddenColumns.includes(key))
                        .map((key) => (
                          <td key={key}>{employee[key]}</td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-5 w-full flex">
            <button
              type="button"
              className="btn bg-[#666A40] shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto "
              onClick={() => finalizeClick(employeeList)}
            >
              Finalize
            </button>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Step3;
