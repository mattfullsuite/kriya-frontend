import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  addComma,
  formatDecimal,
} from "../../../assets/addCommaAndFormatDecimal";

const Step3 = ({
  employeeRecords,
  draftClick,
  finalizeClick,
  payItems,
  draft,
  displayAddNotes,
}) => {
  const [employeeList, setEmployeeList] = useState();
  const [visibleColumns, setVisibleColumns] = useState([]);

  useEffect(() => {
    if (employeeRecords && employeeRecords.length > 0 && payItems) {
      setEmployeeList(employeeRecords);
      columnsToShow(employeeRecords, payItems);
    }
  }, [employeeRecords, payItems]);

  const columnsToShow = (records, payItems) => {
    const payables = payItems.map((payItem) => payItem.pay_item_name);

    const visibleCols = [
      "Employee ID",
      "Last Name",
      "First Name",
      "Middle Name",
      "Email",
      "Basic Pay",
    ];

    records.forEach((record) => {
      payables.forEach((payable) => {
        if (
          (parseFloat(record[payable]) > 0.0 ||
            parseFloat(record[payable]) < 0.0) &&
          !visibleCols.includes(payable)
        ) {
          visibleCols.push(payable);
        }
      });
    });
    visibleCols.push("Net Pay");
    visibleCols.push(
      "Net Pay (PP-1)",
      "Net Pay (PP-2)",
      "Net Pay (PP-3)",
      "Filed PTO Days",
      "Total Absences",
      "Unpaid Leaves",
      "Notes"
    );
    setVisibleColumns(visibleCols);
  };

  const downloadCSV = (data) => {
    console.log("Data:", data);
    if (!data || data.length === 0) {
      console.error("No data available to download.");
      return;
    }

    // Extract CSV headers from the keys of the first object
    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Add the headers to the CSV
    csvRows.push(headers.join(","));

    // Convert each row of data into a CSV string
    data.forEach((row) => {
      const values = headers.map((header) => {
        const value = row[header];

        // Check if the value is null or undefined, otherwise return the value
        return value === null || value === undefined ? "" : `"${value}"`;
      });
      csvRows.push(values.join(","));
    });

    // Create a Blob from the CSV data
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Payrun.csv`);
    document.body.appendChild(link);

    // Trigger the download and remove the link
    link.click();
    document.body.removeChild(link);
  };

  const onDisplayNotesClick = (e) => {
    displayAddNotes(e.target.id, employeeList);
  };

  return (
    <>
      <dialog
        id="step-3"
        className="modal flex flex-col w-full h-full md:h-auto mx-auto overflow-auto bg-gray-500 bg-opacity-60 justify-center items-center"
      >
        <div className="w-full h-full p-5 ">
          <ToastContainer />
          <div className="flex flex-row p-2 w-full">
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
          <div className="mt-5 flex flex-row w-full h-[90%]">
            <div className="my-2 flex flex-col w-full border-2 border-[#E4E4E4] rounded-[15px] p-5 bg-white overflow-auto">
              <table className="h-full">
                <thead>
                  <tr className="text-left align-top border-b-4 whitespace-nowrap">
                    {visibleColumns.map((key) => (
                      <th className="pr-6 h-10" key={key}>
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employeeList?.map((employee, index) => (
                    <tr className="border-b" key={index}>
                      {visibleColumns.map(
                        (key) =>
                          key != "Notes" && (
                            <td key={key} className="p-2">
                              {isNaN(employee[key])
                                ? employee[key]
                                : addComma(
                                    formatDecimal(employee[key].toString())
                                  )}
                            </td>
                          )
                      )}
                      <td>
                        <button
                          id={employee["Employee ID"]}
                          className="btn bg-[#666A40] shadow-md w-12 text-white hover:bg-[#666A40] hover:opacity-80"
                          onClick={(e) => onDisplayNotesClick(e)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            <path
                              fill-rule="evenodd"
                              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pb-5 w-fit flex ml-auto gap-2">
            <button
              id="step-3-save-draft"
              type="button"
              className="btn bg-[#666A40] shadow-md w-40 text-white hover:bg-[#666A40] hover:opacity-80"
              onClick={() => draftClick()}
              disabled={draft}
            >
              Save as draft
            </button>
            <button
              id="step-3-finalize"
              type="button"
              className="btn bg-[#666A40] shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80"
              onClick={() => finalizeClick()}
            >
              Finalize
            </button>
            <button
              id="step-3-download"
              type="button"
              className="btn bg-[#666A40] shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80"
              onClick={() => downloadCSV(employeeList)}
            >
              Download
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Step3;
