import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import Headings from "../../../../../components/universal/Headings.jsx";
import NoRecord from "../../../components/NoRecord.jsx";
import PreviewDialog from "./PreviewDialog.jsx";
import moment from "moment";
import { GetPayItems } from "../../../assets/api/PayItems.js";
import { ProcessDataForDBInsertion } from "../../../assets/js/Payslip.js";

const UploadPayrun = () => {
  const companyInfo = useRef({});
  const payables = useRef();
  const payablesCategories = useRef([]);
  const payablesCategoryTotals = useRef([]);
  const requiredInformation = useRef([]);
  const emp_num = useRef();
  const buttonGenerateAndSend = useRef(null);
  const buttonSave = useRef(null);
  const [key, setKey] = useState(0); // State to force reset of file upload
  const [payItems, setPayItems] = useState();

  // Data
  const [dataProcessed, setDataProcessed] = useState([]); // Processed uploaded data with date
  const [dataTable, setDataTable] = useState([]); // Uploaded Spreadsheet and Table Data
  // Buttons
  const [uploadEnable, setUploadEnable] = useState(false);
  // Base URL for Axios
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const payslipInfoInitial = {
    "Employee ID": "Employee ID",
    "Last Name": "Last Name",
    "First Name": "First Name",
    "Middle Name": "Middle Name",
    Email: "Email",
    "Job Title": "Job Title",
    "Hire Date": moment().format("YYYY-MM-DD"),
    Dates: {
      From: moment().format("YYYY-MM-DD"),
      To: moment().format("YYYY-MM-DD"),
      Payment: moment().format("YYYY-MM-DD"),
    },
    "Pay Items": {
      payitem1: "1.0",
      payitem2: "2.0",
    },
    Totals: { Earnings: 3.0, Deductions: -3.0 },
    "Net Pay": 1000.0,
    source: "Created",
  };

  let dates = {
    From: "",
    To: "",
    Payment: "",
  };
  const [Dates, setDates] = useState(dates);
  const [selectedRow, setSelectedRow] = useState(payslipInfoInitial);

  useEffect(() => {
    const fetchPayItems = async () => {
      try {
        const payItems = await GetPayItems();
        setPayItems(payItems);
      } catch (error) {
        console.error("Error fetching pay items:", error);
      }
    };

    fetchPayItems();
  }, []);

  useEffect(() => {
    buttonGenerateAndSend.current.disabled = true;
    buttonSave.current.disabled = true;
    fetchUserProfile();
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
            company_address: rows.user[0].company_loc,
            company_logo: rows.user[0].company_logo,
            tin: rows.user[0].tin,
          };
          emp_num.current = rows.user[0].emp_num;
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
    let values = ["Employee ID", "Net Pay"];
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

  const formatDate = (isoDateString) => {
    return moment(isoDateString).format("YYYY-MM-DD");
  };

  //   Upload file and check if it has the same columns with required information
  const uploadFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    let fileName = file.name;
    if (fileName.includes(companyInfo.current.company_name)) {
      reader.readAsBinaryString(file);
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, {
          raw: true,
          defval: null,
        });

        // Replace null values with 0
        const normalizedData = parsedData.map((row) => {
          const normalizedRow = {};
          for (let key in row) {
            normalizedRow[key] = row[key] === null ? 0 : row[key];
          }
          return normalizedRow;
        });

        const headers = Object.keys(normalizedData[0]);
        const differences = checkIfHeadersExist(
          requiredInformation.current,
          headers
        );

        if (differences.length === 0) {
          const empList = await addEmployeeInfo(normalizedData);
          if (empList.length > 0) {
            const empListFixedHireDate = empList.map((row) => {
              if (row["Hire Date"]) {
                row["Hire Date"] = formatDate(row["Hire Date"]);
              }
              return row;
            });

            setDataTable(empListFixedHireDate);
            const dateAppended = appendDate(empListFixedHireDate);
            const processed = processData(dateAppended);
            setDataProcessed(processed);

            buttonSave.current.disabled = false;
            buttonGenerateAndSend.current.disabled = false;
            toast.success("File Upload Successfully!", { autoClose: 3000 });
          } else {
            fileName = undefined;
            setDataTable([]);
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "File Upload Failed! ",
            html:
              "<strong>" +
              "Missing Columns!" +
              "</strong>" +
              "<br />" +
              "<br />" +
              differences.join("<br />"),
            showConfirmButton: false,
            timer: 20000,
          });
          setDataTable([]);
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
      buttonSave.current.disabled = true;
      buttonGenerateAndSend.current.disabled = true;
    }

    // Reset the file input by incrementing the key
    setKey((prevKey) => prevKey + 1);
  };

  const addEmployeeInfo = async (parsedData) => {
    const empList = [];
    const missingEmpIDs = [];
    const fetchPromises = parsedData.map(async (row) => {
      const empID = row["Employee ID"];
      try {
        const res = await axios.get(
          `${BASE_URL}/ep-getEmployeeInfoForUploadPayrun/${empID}`
        );
        const empInfo = res.data[0];
        if (!empInfo) {
          missingEmpIDs.push(empID); // Track missing employee IDs
        } else {
          empList.push(Object.assign(empInfo, row));
        }
      } catch (error) {
        missingEmpIDs.push(empID); // Track employee IDs that cause an error
      }
    });

    await Promise.all(fetchPromises);

    // Disable buttons and show a single SweetAlert error if there are missing employees
    if (missingEmpIDs.length > 0) {
      buttonSave.current.disabled = true;
      buttonGenerateAndSend.current.disabled = true;
      const missingIDsString = missingEmpIDs.join(", ");
      Swal.fire({
        icon: "error",
        title: "Missing Employee Records",
        text: `Check if the following Employee IDs exist in the records: ${missingIDsString}`,
      });
      return [];
    }

    return empList;
  };

  const checkIfHeadersExist = (payItems, headers) => {
    const sortedPayItems = payItems.sort();
    const sortedHeaders = headers.sort();
    const difference = [];
    for (let i = 0; i < sortedPayItems.length; i++) {
      if (!sortedHeaders.includes(sortedPayItems[i])) {
        difference.push(sortedPayItems[i]);
      }
    }
    return difference;
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
      companyLogo: companyInfo.current.company_logo,
      generated_by: emp_num.current,
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
        categoryTotal[category] = item["Total " + category].toFixed(2);
        // categoryTotal[category] = item["Total " + category];
        categoryList.forEach((clItem) => {
          // Check if item value is undefined
          // if (item[clItem] !== undefined && item[clItem] > 0) {
          if (item[clItem] !== undefined || item[clItem] !== 0) {
            // Put payitem to respective category
            categoryObject[clItem] = item[clItem].toFixed(2);
            // categoryObject[clItem] = item[clItem];
          }
          payItems[clItem] = item[clItem].toFixed(2);
          delete item[clItem];
        });
        delete item[`Total ` + category];
      });
      item["Pay Items"] = payItems;
      item["Totals"] = categoryTotal;
      // item["Net Pay"] = item["Net Pay"].toFixed(2);
      item["Net Pay"] = item["Net Pay"];
      item["Draft"] = false;
    });
    return data;
  };

  const splitToBatches = (array, batchSize) => {
    const batches = [];
    for (let i = 0; i < array.length; i += batchSize) {
      const batch = array.slice(i, i + batchSize);
      batches.push(batch);
    }
    return batches;
  };

  const sendData = async () => {
    // buttonSave.current.disabled = true;
    buttonGenerateAndSend.current.disabled = true;
    const data = appendCompany(dataProcessed);

    const batches = splitToBatches(data, 10);
    let currentBatch = 0;

    for (const batch of batches) {
      currentBatch += 1;
      await generatePDF(removeZeroValues(batch), currentBatch, batches.length);
    }

    // buttonSave.current.disabled = false;
    buttonGenerateAndSend.current.disabled = false;
  };

  const saveData = async () => {
    const data = appendCompany(
      ProcessDataForDBInsertion(dataProcessed, payItems)
    );

    const batches = splitToBatches(data, 10);
    let currentBatch = 0;
    batches.forEach(async (batch) => {
      currentBatch += 1;

      const insertDBResponse = await insertToDB(
        batch,
        currentBatch,
        batches.length
      );
      if (insertDBResponse.status === 200) {
        buttonSave.current.disabled = false;
        buttonGenerateAndSend.current.disabled = false;
      }
    });
  };

  const removeZeroValues = (data) => {
    return data.map((employee) => {
      const updatedPayItems = {};

      for (const [category, items] of Object.entries(employee["Pay Items"])) {
        if (employee["Totals"][category] !== "0.00") {
          updatedPayItems[category] = {};

          for (const [item, value] of Object.entries(items)) {
            if (parseFloat(value) !== 0) {
              updatedPayItems[category][item] = value;
            }
          }
        }
      }

      return {
        ...employee,
        "Pay Items": updatedPayItems,
      };
    });
  };

  const generatePDF = async (data, currentBatch, totalBatch) => {
    try {
      await toast.promise(
        axios.post(
          "https://pdf-generation-test.onrender.com/generate-and-send",
          data
        ),
        {
          pending: {
            render: `Generating And Sending Payslips... ${currentBatch}/${totalBatch}`,
            className: "pending",
            onOpen: () => {
              buttonSave.current.disabled = true;
              buttonGenerateAndSend.current.disabled = true;
            },
          },
          success: {
            render: `Payslips have been generated and sent! ${currentBatch}/${totalBatch}`,
            className: "success",
            autoClose: 3000,
            onClose: () => {
              buttonSave.current.disabled = false;
              buttonGenerateAndSend.current.disabled = false;
            },
          },
          error: {
            render: "Something Went Wrong!",
            autoClose: 5000,
            onClose: () => {
              buttonSave.current.disabled = false;
              buttonGenerateAndSend.current.disabled = false;
            },
          },
        }
      );
    } catch (err) {
      console.error(err);
      toast.error(`Something Went Wrong! Error: ${err}`, { autoClose: 3000 });
      buttonGenerateAndSend.current.disabled = false;
    }
  };

  const insertToDB = async (data, currentBatch, totalBatch) => {
    try {
      const responsePromise = axios.post(
        `${BASE_URL}/mp-createPayslip/Uploaded`,
        data
      );

      // Pass the promise to toast.promise
      toast.promise(responsePromise, {
        pending: {
          render: `Saving To Database... ${currentBatch}/${totalBatch}`,
          className: "pending",
          onOpen: () => {
            buttonSave.current.disabled = true;
            buttonGenerateAndSend.current.disabled = false;
          },
        },
        success: {
          render: `Data has been saved to the database! ${currentBatch}/${totalBatch}`,
          className: "success",
          autoClose: 3000,
        },
        error: {
          render: ({ data }) => `Something Went Wrong! Error: ${data.message}`,
          autoClose: 5000,
          onClose: () => {
            buttonSave.current.disabled = false;
            buttonGenerateAndSend.current.disabled = false;
          },
          onOpen: () => {
            console.log("Error toast opened");
          },
        },
      });

      // Await the promise to handle further actions if needed
      const response = await responsePromise;
      return response;
    } catch (err) {
      console.error(err);
      toast.error(`Something Went Wrong! Error: ${err.message}`, {
        autoClose: 3000,
      });
      buttonSave.current.disabled = false;
      buttonGenerateAndSend.current.disabled = false;
    }
  };

  const onDateChange = (e) => {
    const { name, value } = e.target;

    setDates((prevPayrollDate) => ({
      ...prevPayrollDate,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="mt-10">
        <ToastContainer />

        <div className=" flex flex-col border-2  border-[#E4E4E4] rounded-[15px] p-5 bg-white">
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
                    className="input input-bordered w-11/12"
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
                    className="input input-bordered w-11/12"
                    name="To"
                    onChange={(e) => {
                      onDateChange(e);
                    }}
                  />
                </label>
                <label className="form-control w-11/12">
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
            <div className="pt-5 flex flex-col w-full gap-3 lg:w-[35%] lg:pl-5 lg:pt-5 lg:gap-3">
              <label
                htmlFor="uploadFile1"
                className={
                  uploadEnable
                    ? "btn bg-[#666A40] shadow-md w-full text-white hover:bg-[#666A40] hover:opacity-80"
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
                  key={key}
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
                ref={buttonSave}
                type="button"
                className="btn bg-[#666A40] shadow-md w-full text-white hover:bg-[#666A40] hover:opacity-80"
                onClick={saveData}
              >
                Save to Database
              </button>

              <button
                ref={buttonGenerateAndSend}
                type="button"
                className="btn bg-[#666A40] shadow-md w-full text-white hover:bg-[#666A40] hover:opacity-80"
                onClick={sendData}
              >
                Generate and Send Payslip
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1300px]">
          <h1 className="py-5 text-l font-bold">Payroll File</h1>
          <div className="w-full border-2 border-[#E4E4E4] rounded-[15px] p-5 bg-white">
            {dataTable?.length > 0 ? (
              <div className="overflow-x-auto h-[55vh]">
                <table className="table table-xs">
                  <thead className="bg-gradient-to-br from-[#666A40] to-[#a0a47d]  text-white sticky top-0">
                    <tr className="h-10 text-base">
                      {Object.keys(dataTable[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataTable.map((row, index) => (
                      <tr key={index} className="h-10 text-left">
                        {Object.values(row).map((value, index) => (
                          <td
                            key={index}
                            onClick={() =>
                              rowClick(row["Employee ID"], dataProcessed)
                            }
                            className="text-left whitespace-nowrap"
                          >
                            <button
                              onClick={() =>
                                rowClick(row["Employee ID"], dataProcessed)
                              }
                            >
                              {index === 0
                                ? value
                                : addCommasAndFormatDecimal(value)}
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

        <PreviewDialog data={selectedRow} />
      </div>
    </>
  );
};

export default UploadPayrun;
