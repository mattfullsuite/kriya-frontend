import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import Headings from "../../components/universal/Headings";
import NoRecord from "../../components/accountant/NoRecord.jsx";

function UploadAPayRegister() {
  const companyInfo = useRef({});
  const payables = useRef();
  const payablesCategories = useRef([]);
  const payablesCategoryTotals = useRef([]);
  const requiredInformation = useRef([]);

  // Data
  const [dataProcessed, setDataProcessed] = useState([]); // Processed uploaded data with date
  const [dataTable, setDataTable] = useState([]); // Uploaded Spreadsheet and Table Data
  // Buttons
  const [uploadEnable, setUploadEnable] = useState(false);
  const [sendEnable, setSendEnable] = useState(false);
  // Base URL for Axios
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  let rowData = {
    Dates: {},
    Email: "",
    "Employee ID": "",
    "First Name": "",
    "Last Name": "",
    "Middle Name": "",
    "Net Pay": 0,
    "Pay Items": {},
    Totals: {},
  };

  let dates = {
    From: "",
    To: "",
    Payment: "",
  };
  const [Dates, setDates] = useState(dates);
  const [selectedRow, setSelectedRow] = useState(rowData);

  const [userData, setUserData] = useState([]);
  //   const [payItemsData, setPayItemsData] = useState([]);

  useEffect(() => {
    fetchUserProfile();
    // fetchCompanyInfo();
    fetchCompanyPayItem();

    let dateLength = Object.values(Dates).filter((date) => {
      if (date == "" || date == null) {
        return false;
      }
      return true;
    }).length;

    if (dateLength == Object.values(Dates).length) {
      //enable upload button
      setUploadEnable(true);
    } else {
      //disable upload button
      setUploadEnable(false);
    }
  }, [Dates]);

  const fetchUserProfile = () => {
    axios
      .get(BASE_URL + "/login")
      .then(function (response) {
        const rows = response.data;
        if (rows) {
          companyInfo.current = {
            company_id: rows.user[0].company_id,
            company_name: rows.user[0].company_name,
            company_address: rows.user[0].company_address,
            company_logo: rows.user[0].company_logo,
            tin: rows.user[0].tin,
          };
        }
      })
      .catch(function (error) {
        console.error("Error: ", error);
      });
  };

  const fetchCompanyPayItem = () => {
    axios
      .get(BASE_URL + "/mp-getPayItem")
      .then(function (response) {
        const rows = response.data;
        if (rows) {
          setPayablesInfo(rows);
        }
      })
      .catch(function (error) {
        console.error("Error: ", error);
      });
  };

  // Set pay items
  const setPayablesInfo = (data) => {
    const cats = []; //
    const totals = [];
    const categoryPayItem = data.reduce((acc, item) => {
      const { pay_item_category, pay_item_name } = item;
      // Find the category array in the accumulator
      const categoryArray = acc[pay_item_category];

      if (categoryArray) {
        // If the category exists, push the name to its array
        categoryArray.push(pay_item_name);
      } else {
        // If the category doesn't exist, create a new array
        acc[pay_item_category] = [pay_item_name];
        cats.push(pay_item_category);
        totals.push("Total " + pay_item_category);
      }
      return acc;
    }, {});
    payablesCategories.current = cats; // Set Categories to useRef variable
    payables.current = categoryPayItem; // Set Payable to useRef variable
    payablesCategoryTotals.current = totals; // Set Category Totals to useRef variable
    setRequiredInformation(categoryPayItem);
  };
  // Set required information for updloaded data
  const setRequiredInformation = (payItems) => {
    let values = [
      "Employee ID",
      "Last Name",
      "First Name",
      "Middle Name",
      "Email",
      "Job Title",
      "Hire Date",
      "Net Pay",
    ];
    values = values.concat(Object.values(payItems).flatMap((obj) => obj));
    values = values.concat(payablesCategoryTotals.current);
    requiredInformation.current = values;
  };

  // Row selection handler
  const rowClick = (empID, data) => {
    const rowData = data.find((row) => row["Employee ID"] === empID);
    // rowData is the data of the selected row
    document.getElementById("row-data").showModal();
    setSelectedRow(rowData);
  };

  //   Upload file and check if it has the same columns with required information
  const uploadFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    const fileName = file.name;
    console.log("Company Name: ", companyInfo.current.company_name);
    console.log("Uploaded File Name: ", fileName);
    if (fileName.includes(companyInfo.current.company_name)) {
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;

        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        const headers = Object.keys(parsedData[0]);
        // Check if required information is equal to the the spreadsheet headers, sort them to make them have same content order
        const areEqual =
          JSON.stringify(headers.sort()) ===
          JSON.stringify(requiredInformation.current.sort());
        console.log("Headers: ", headers);
        console.log("Required Info: ", requiredInformation.current.sort());
        if (areEqual) {
          //Notification for successful upload
          toast.success("File Upload Successfully!", { autoClose: 3000 });
          setDataTable(parsedData);
          const dateAppended = appendDate(parsedData);
          // setDataWithDate(dateAppended);
          const process = processData(dateAppended);
          setDataProcessed(process);
          setSendEnable(true);
        } else {
          //Notification for failed upload

          Swal.fire({
            icon: "error",
            title: "File Upload Failed",
            text: "File Must Contain Similar Pay Items!",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      };
    } else {
      Swal.fire({
        icon: "error",
        title: "File Upload Failed",
        text: "File Name Should Contain Company Name",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const appendDate = (data) => {
    const appended = data.map((i) => ({
      ...i,
      Dates,
    }));
    return appended;
  };

  const appendCompany = (data) => {
    const appended = data.map((i) => ({
      ...i,
      companyInfo: companyInfo.current,
      companyID: companyInfo.current.company_id,
    }));
    return appended;
  };

  const addCommasAndFormatDecimal = (number) => {
    if (typeof number == "number") {
      let parts = number.toFixed(2).toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } else {
      return number;
    }
  };

  // Groups Pay Items into categories and store it in Pay Items objext
  // Gets Total per category and put it in Totals object
  const processData = (data) => {
    // Iterate in data list
    data.forEach((item) => {
      //For Each Record

      const categoryTotal = {};
      const payItems = {};
      // Iterate in categories object
      Object.keys(payables.current).forEach((category) => {
        const categoryList = payables.current[category]; // Get categories
        const categoryObject = {};
        // Iterate in category list
        // categoryTotal[category] = item["Total " + category].toFixed(2);
        categoryTotal[category] = item["Total " + category];
        categoryList.forEach((clItem) => {
          // Check if item value is undefined
          // if (item[clItem] !== undefined && item[clItem] > 0) {
          if (item[clItem] !== undefined) {
            // categoryObject[clItem] = item[clItem].toFixed(2); // Put payitem to respective category
            categoryObject[clItem] = item[clItem];
          }
          delete item[clItem];
        });
        delete item[`Total ` + category];
        payItems[category] = categoryObject;
      });
      item["Pay Items"] = payItems;
      item["Totals"] = categoryTotal;
      // item["Net Pay"] = item["Net Pay"].toFixed(2);
      item["Net Pay"] = item["Net Pay"];
    });
    return data;
  };

  const removeZeroVals = (data) => {
    data.forEach((item) => {
      Object.keys(item["Pay Items"]).forEach((category) => {
        Object.keys(item["Pay Items"][category]).forEach((payItem) => {
          if (item["Pay Items"][category][payItem] == 0) {
            // Delete the key if its value is less than or equal to 0
            delete item["Pay Items"][category][payItem];
          }
        });
      });
    });
    return data;
  };

  const sendData = () => {
    document.getElementById("loading").showModal();
    // Insert to database
    insertToDB();
  };
  const insertToDB = async () => {
    const data = removeZeroVals(appendCompany(dataProcessed));
    await axios
      .post(BASE_URL + "/mp-createPayslip", data)
      .then(function (response) {
        if (response.data) {
          document.getElementById("loading").close();
          Swal.fire({
            icon: "success",
            title: "Payslips Sent",
            text: "Generated Payslips Have Been Sent Successfully.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch(function (error) {
        console.error("Error: ", error);
      });
  };

  const onDateChange = (e) => {
    const { name, value } = e.target;

    setDates((prevPayrollDate) => ({
      ...prevPayrollDate,
      [name]: value,
    }));

    //let counter = 0;
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Headings text={"Upload a Pay Register"} />

      <div className="mt-10 flex flex-col border-2  border-[#E4E4E4] rounded-[15px] p-5 bg-white">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex flex-col w-full lg:w-[65%] lg:border-r-2 lg:pr-5">
            <h1 className="text-base font-bold">Period Covered</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Date From
                  </span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  name="From"
                  onChange={(e) => {
                    onDateChange(e);
                  }}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Date To
                  </span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  name="To"
                  onChange={(e) => {
                    onDateChange(e);
                  }}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Payment Date
                  </span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  name="Payment"
                  onChange={(e) => {
                    onDateChange(e);
                  }}
                />
              </label>
            </div>
          </div>
          <div className="pt-5 flex flex-col w-full gap-3 lg:w-[35%] lg:pl-5 lg:pt-14 lg:gap-10">
            <label
              htmlFor="uploadFile1"
              className={
                uploadEnable
                  ? "btn bg-[#EA7B2D] shadow-md w-full text-white hover:bg-[#CC5500]"
                  : "btn btn-disabled"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 mr-2 fill-white inline"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
              Upload Payroll File
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={uploadFile}
                id="uploadFile1"
                className="hidden"
                name="csvFile"
                disabled={!uploadEnable}
              />
            </label>

            <button
              type="button"
              className="btn bg-[#EA7B2D] shadow-md w-full text-white hover:bg-[#CC5500]"
              onClick={sendData}
              disabled={!sendEnable}
            >
              Generate & Send Payslip
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1190px]">
        <h1 className="py-5 text-l font-bold">Payroll File</h1>
        <div className="w-full border-2 border-[#E4E4E4] rounded-[15px] p-5 bg-white">
          {dataTable.length > 0 ? (
            <div className="overflow-x-auto h-[55vh]">
              <table className="table table-xs">
                <thead className="bg-gradient-to-br from-[#CC5500] to-[#FF974D] text-white sticky top-0">
                  <tr>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox bg-[#fff] my-2"
                        />
                      </label>
                    </th>
                    {Object.keys(dataTable[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      {Object.values(row).map((value, index) => (
                        <td
                          key={index}
                          onClick={() =>
                            rowClick(row["Employee ID"], dataProcessed)
                          }
                        >
                          <button
                            onClick={() =>
                              rowClick(row["Employee ID"], dataProcessed)
                            }
                          >
                            {addCommasAndFormatDecimal(value)}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoRecord></NoRecord>
          )}
        </div>
      </div>

      <dialog id="row-data" className="modal">
        <div className="modal-box p-0 w-11/12 max-w-3xl">
          <div className="flex flex-col px-5 py-5 bg-gradient-to-br from-[#CC5500] to-[#FF974D] text-white justify-end">
            <div className="flex flex-row">
              <button
                className="m-r ml-auto"
                onClick={() => document.getElementById("row-data").close()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-row justify-between mt-5">
              <div className="w-full font-bold">
                {selectedRow["Employee ID"]}
              </div>
              <div className="w-full text-end">
                <span className="font-bold">Pay Period: </span>
                <span>{selectedRow.Dates["From"]}</span>
                <span className="font-bold"> to </span>
                <span>{selectedRow.Dates["To"]}</span>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-2">
              <div className="w-full font-bold">
                {selectedRow["First Name"]} {selectedRow["Middle Name"]}{" "}
                {selectedRow["Last Name"]}
              </div>
              <div className="w-full text-end">
                <span className="font-bold">Pay Day: </span>
                {/* {selectedRow.Dates["Payment"]} */}
              </div>
            </div>
            <div className="flex flex-row justify-between mt-2">
              <div className="w-full font-bold">
                {/* {selectedRow["Job Title"]} */}
              </div>
              <div className="w-full text-end"></div>
            </div>
          </div>
          <div className="flex flex-row px-5 pb-5">
            <div className="flex flex-col lg:flex-row w-full">
              <div className="w-full">
                <h1 className="font-bold mx-3 mt-3">Pay Calculation</h1>
                <hr className="mt-1 border h-[5px] bg-[#000000]"></hr>
                {Object.entries(selectedRow["Pay Items"]).map(
                  ([category, payItems]) => (
                    <>
                      <div
                        className="flex flex-row justify-between"
                        key={category}
                      >
                        <h1 className="font-bold mx-3 mt-3 pl-5">{category}</h1>
                        <h1 className="font-bold mx-3 mt-3">Amount PHP</h1>
                      </div>
                      <hr className="mt-1 border h-[5px] bg-[#000000] ml-5"></hr>

                      {Object.entries(payItems).map(([payItem, amount]) => (
                        <>
                          <div
                            className="flex flex-row justify-between"
                            key={payItem}
                          >
                            <h1 className="mx-3 mt-3 pl-10">{payItem}</h1>
                            <h1 className="mx-3 mt-3">
                              {addCommasAndFormatDecimal(amount)}
                            </h1>
                          </div>
                        </>
                      ))}
                      <hr className="mt-1 border h-[5px] bg-[#000000] ml-5"></hr>
                      <div className="flex flex-row justify-between mb-5">
                        <h1 className="font-bold mx-3 mt-3 pl-5">
                          Total {category}
                        </h1>
                        <h1 className="mx-3 mt-3">
                          {addCommasAndFormatDecimal(
                            selectedRow["Totals"][category]
                          )}
                        </h1>
                      </div>
                      <hr className="mt-1 border h-[5px] bg-[#000000]"></hr>
                    </>
                  )
                )}

                <div className="flex flex-row justify-between border-t-3">
                  <h1 className="font-bold mx-3 mt-3">Take Home Pay</h1>
                  <h1 className="mx-3 mt-3">
                    {addCommasAndFormatDecimal(selectedRow["Net Pay"])}
                  </h1>
                </div>
                <hr className="mt-1 border h-[5px] bg-[#000000]"></hr>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="loading" className="modal ">
        <div className="flex flex-col items-center gap-5">
          <span className="text-5xl text-white">
            Generating and Sending PDF
          </span>

          <span className="loading text-white loading-spinner loading-lg"></span>
        </div>
      </dialog>
    </>
  );
}

export default UploadAPayRegister;
