import { useEffect, useRef, useState } from "react";
//import NoRecord from "../components/NoRecord";
import * as XLSX from "xlsx";
// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import DropdownCompany from "../components/DropdownCompany.jsx";
import Swal from "sweetalert2";
function PayRun() {
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

  const [userData, setUserData] = useState([]);
//   const [payItemsData, setPayItemsData] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(BASE_URL + "/login");
        const payitems_res = await axios.get(BASE_URL + "/mp-getcompanypayitems");
        
        setUserData(res.data);
        setDatabase(payitems_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  const navigate = useNavigate();
  //const userData = Cookies.get("userData");
  //const accountID = JSON.parse(userData).id;

  const [companyID, setCompanyID] = useState(null);
  const [companyInfo, setCompanyInfo] = useState([]); // Contains company name, address, and Logo
  const [dbCategoryPayItem, setDatabase] = useState([]); // Contains all pay items for the current user
  const [categories, setCategories] = useState([]); // Categories(per company)
  const [reqInfo, setReqInfo] = useState([]); // Required Column Headers

  // Data
  const [dataUploaded, setDataUploaded] = useState([]); // Uploaded Spreadsheet data
  const [dataProcessed, setProcessedData] = useState([]); // Processed uploaded data with date
  const [Dates, setDates] = useState(dates); // Dates
  //Selected Row
  const [selectedRow, setSelectedRow] = useState(rowData);

  const [dateEnable, setDateEnable] = useState(false);
  const [uploadEnable, setUploadEnable] = useState(false);
  const [sendEnable, setSendEnable] = useState(false);

  useEffect(() => {
    if (!userData) {
      // Redirect to the login page if there is no cookie
      navigate("/login");
    }
    // getCompanyPayItem(accountID);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Get token from userData cookie
//   const getToken = () => {
//     const userData = JSON.parse(Cookies.get("userData"));
//     return userData.token;
//   };

  // Row selection handler
  const rowClick = (empID, data) => {
    const rowData = data.find((row) => row["Employee ID"] === empID);
    // rowData is the data of the selected row
    console.log("Selected Row Data:", rowData);
    document.getElementById("show-form").showModal();
    setSelectedRow(rowData);
  };

  const disableDatePicker = () => {
    setDateEnable(false);
    setUploadEnable(false);
    setSendEnable(false);
  };

  // Set pay items based on company selected
  const setCompanyPayItem = (id) => {
    const info = {};

    if (id == "") {
      disableDatePicker();
      return;
    }
    setDateEnable(true);

    // Data from database
    const data = dbCategoryPayItem.filter((item) => item.company_id == id);
    console.log("Datat: ", data)
    if(data.length > 0){
      setCompanyID(id);
      const { company_name, company_address, company_logo } = data[0];
      setCompanyInfo({ company_name, company_address, company_logo });
      // Transform to category object
      const categoryPayItem = data.reduce((acc, item) => {
        const { category, name } = item;
  
        // Find the category array in the accumulator
        const categoryArray = acc[category];
  
        if (categoryArray) {
          // If the category exists, push the name to its array
          categoryArray.push(name);
        } else {
          // If the category doesn't exist, create a new array
          acc[category] = [name];
        }
  
        return acc;
      }, {});
      setCategories(categoryPayItem);
      setRequiredInformation(categoryPayItem);
    } else {
      //disableDatePicker();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No Pay Items Found!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  // Set required information for updloaded data
  const setRequiredInformation = (categories) => {
    setReqInfo([
      "Employee ID",
      "Last Name",
      "First Name",
      "Middle Name",
      "Email",
      "Job Title",
      "Net Pay",
    ]);
    const totalCategory = [];

    Object.keys(categories).forEach((category) => {
      const values = categories[category];
      // Add "Total " + categoryName to the output array, capitalize the first letter of category name
      const formattedCategoryName = "Total " + category;
      totalCategory.push(formattedCategoryName);
    });
    let values = Object.values(categories).flatMap((obj) => obj);
    values = values.concat(totalCategory);
    setReqInfo((prevInfo) => [...prevInfo, ...values]);
  };

//   Upload file and check if it has the same columns with required information
  const uploadFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0]
    const fileName = file.name;
    // console.log("Upload: ", fileName);
    // console.log("Company Name: ", companyInfo.company_name)
    if(fileName.includes(companyInfo.company_name)){
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
          JSON.stringify(headers.sort()) === JSON.stringify(reqInfo.sort());
        console.log("Headers: ", headers);
        console.log("Required Info: ", reqInfo);
        if (areEqual) {
          //Notification for successful upload
          toast.success("File Upload Successfully!", { autoClose: 3000 });
          setDataUploaded(parsedData);
          const dateAppended = appendDate(parsedData);
          const processedData = processData(dateAppended);
          setProcessedData(processedData);
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

//   const companyChange = (selectedCompany) => {
//     if (selectedCompany != null) {
//       setCompanyPayItem(selectedCompany);
      
//       // setDateEnable(true);
//     }
//   };

  const getCompanyPayItem = async () => {
    //const token = getToken();
    // await axios
    //   .get(`/pay-item/data/${accountID}`)
    await axios.get(BASE_URL + "/mp-getcompanypayitems")
      .then(function (response) {
        const rows = response.data.rows;
        if (rows) {
          setDatabase(rows);
        }
      })
      .catch(function (error) {
        console.error("Error: ", error);
      });
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
      companyInfo,
    }));
    return appended;
  };

  const addCommasAndFormatDecimal = (number) => {
    if (typeof number == "number") {
      let parts = number.toFixed(2).toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }else{
      return number;
    }
  };

//   function formatJson(json) {
//     return JSON.parse(JSON.stringify(json, (key, value) => {
//       if (typeof value === 'number') {
//         return addCommasAndFormatDecimal(value);
//       }
//       return value;
//     }));
//   }
  

  // Groups Pay Items into categories and store it in Pay Items objext
  // Gets Total per category and put it in Totals object
  const processData = (data) => {
    // Iterate in data list
    data.forEach((item) => {
      const categoryTotal = {};
      const payItems = {};
      // Iterate in categories object
      Object.keys(categories).forEach((category) => {
        const categoryList = categories[category]; // Get categories
        const categoryObject = {};
        // Iterate in category list
        // categoryTotal[category] = item["Total " + category].toFixed(2);
        categoryTotal[category] = item["Total " + category];
        categoryList.forEach((clItem) => {
          // Check if item value for is undefined
          if (item[clItem] !== undefined && item[clItem] > 0) {
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
    console.log("Processed Data: ", data);
    return data;
  };

//   const sendData = () => {
//     // Insert to database
//     insertToDB();

//     // Generate and Send PDF
//     generatePDF();
//   };
//   const insertToDB = async () => {
//     const data = dataProcessed.map((items) => ({
//       companyID,
//       ...items,
//     }));

//     const token = getToken();
//     await axios
//       .post(`/payslip`, data)
//       .then(function (response) {
//         console.log("inserted");
//       })
//       .catch(function (error) {
//         console.error("Error: ", error);
//       });
//   };

//   const generatePDF = async () => {

//     const formattedJson = formatJson(dataProcessed);
//     const data = appendCompany(formattedJson);
//     console.log("Data to Send: ", data);
//     const token = getToken();

//     //date with decimal places with comma
//     await axios
//       .post(`http://localhost:5000/generate-and-send`, data, {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then(function (response) {
//         if (response) {
//           // showAlert("success", "");
//           console.log(true);
//           Swal.fire({
//             icon: "success",
//             title: "Payslips Sent",
//             text: "Generated Payslips have been sent successfully.",
//             showConfirmButton: false,
//             timer: 2000,
//           });
//         }
//       })
//       .catch(function (error) {
//         console.error("Error: ", error);
//       });
//   };

  const onDateChange = (e) => {
    const { name, value } = e.target;

    setDates((prevPayrollDate) => ({
      ...prevPayrollDate,
      [name]: value,
    }));

    //let counter = 0;
  };

  useEffect(() => {
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

  return (
    <>
      {/* <ToastContainer
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
      /> */}

      <div>
        <div className="flex flex-col md:flex-row w-full gap-3">
          <div className="flex w-full">
            <div className="flex-col w-full">
              <h1 className="text-3xl font-bold">Tsekpay Run</h1>
            </div>
          </div>
          <div className="flex-col">
            {/* <DropdownCompany companyID={companyChange} /> */}
          </div>
        </div>

        <div className="flex flex-col border-2 border-solid rounded-2xl m-2">
          <div className="flex flex-col lg:flex-row w-full">
            <div className="flex flex-col w-full lg:w-[65%] lg:border-r-2 py-5 px-8">
              <h1 className="text-base font-bold">Period Covered</h1>
              <div className="flex lg:flex-row flex-col gap-2">
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
                    // disabled={!dateEnable}
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
                    // disabled={!dateEnable}
                  />
                </label>
              </div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Payment Date
                  </span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full lg:w-1/2"
                  name="Payment"
                  onChange={(e) => {
                    onDateChange(e);
                  }}
                //   disabled={!dateEnable}
                />
              </label>
            </div>
            <div className="flex flex-col w-full lg:w-[35%]">
              <div className="flex flex-col w-full px-3 py-5 gap-5">
                <label
                  htmlFor="uploadFile1"
                  className="btn bg-[#426E80] shadow-md w-full text-white hover:bg-[#AAE2EC] hover:text-[#426E80]"
                //   className={
                //     uploadEnable
                //       ? "btn bg-[#426E80] shadow-md w-full text-white hover:bg-[#AAE2EC] hover:text-[#426E80]"
                //       : "btn btn-disabled"
                //   }
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
                    //disabled={!uploadEnable}
                  />
                </label>

                <button
                  type="button"
                  className="btn text-white bg-[#5C9CB7] shadow-md w-full"
                  //onClick={sendData}
                  //disabled={!sendEnable}
                >
                  Generate & Send Payslip
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="m-2">
          <h1 className="py-5 text-l font-bold">Payroll File</h1>
          <div className="border-2 border-gray-200 border-solid rounded-lg flex flex-row">
            {dataUploaded.length > 0 ? (
              <div className="overflow-x-auto overflow-scroll h-[55vh] w-full">
                <table className="table table-xs">
                  <thead className="bg-[#4A6E7E] text-white sticky top-0">
                    <tr>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox bg-[#fff] my-2"
                          />
                        </label>
                      </th>
                      {Object.keys(dataUploaded[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataUploaded.map((row, index) => (
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
            //   <NoRecord></NoRecord>
            <div> No Uploaded File</div>
            )} 
          </div>
        </div>
      </div>

      <dialog id="show-form" className="modal">
        <div className="modal-box p-0 w-11/12 max-w-3xl">
          <div className="flex flex-col px-5 py-5 bg-[#4A6E7E] text-white justify-end">
            <div className="flex flex-row">
              <button
                className="m-r ml-auto"
                onClick={() => document.getElementById("show-form").close()}
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
                {/* {selectedRow["Employee ID"]} */}
              </div>
              <div className="w-full text-end">
                <span className="font-bold">Pay Period: </span>
                {/* <span>{selectedRow.Dates["From"]}</span> */}
                <span className="font-bold"> to </span>
                {/* <span>{selectedRow.Dates["To"]}</span> */}
              </div>
            </div>
            <div className="flex flex-row justify-between mt-2">
              <div className="w-full font-bold">
                {/* {selectedRow["First Name"]} {selectedRow["Middle Name"]}{" "}
                {selectedRow["Last Name"]} */}
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
              <div className="w-full text-end">
                
              </div>
            </div>
          </div>
          <div className="flex flex-row px-5 pb-5">
            <div className="flex flex-col lg:flex-row w-full">
              <div className="w-full">
                <h1 className="font-bold mx-3 mt-3">Pay Calculation</h1>
                <hr className="mt-1 border h-[5px] bg-[#000000]"></hr>
                {/* {Object.entries(selectedRow["Pay Items"]).map(
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
                            <h1 className="mx-3 mt-3">{addCommasAndFormatDecimal(amount)}</h1>
                          </div>
                        </>
                      ))}
                      <hr className="mt-1 border h-[5px] bg-[#000000] ml-5"></hr>
                      <div className="flex flex-row justify-between mb-5">
                        <h1 className="font-bold mx-3 mt-3 pl-5">
                          Total {category}
                        </h1>
                        <h1 className="mx-3 mt-3">
                          {addCommasAndFormatDecimal(selectedRow["Totals"][category])}
                        </h1>
                      </div>
                      <hr className="mt-1 border h-[5px] bg-[#000000]"></hr>
                    </>
                  )
                )} */}

                <div className="flex flex-row justify-between border-t-3">
                  <h1 className="font-bold mx-3 mt-3">Take Home Pay</h1>
                  {/* <h1 className="mx-3 mt-3">{addCommasAndFormatDecimal(selectedRow["Net Pay"])}</h1> */}
                </div>
                {/* <hr className="mt-1 border h-[5px] bg-[#000000]"></hr> */}
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default PayRun;