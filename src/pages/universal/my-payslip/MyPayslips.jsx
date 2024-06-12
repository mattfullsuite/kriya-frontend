import { useEffect, useRef, useState } from "react";
import Headings from "../../../components/universal/Headings";
import AddPayDispute from "./components/AddPayDispute";
import ViewPayDispute from "./components/ViewPayDispute";
import axios from "axios";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";
import "./Calendar.css";
import ubLogo from "../../../assets/logo-union-bank.png";

const { format } = require("date-fns");

const MyPayslip = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let disputes = [
    {
      id: 1,
      "Issue Raised": "Payroll Computation",
      "Date Raised": "March 05, 2023",
      "Handled By": "Rhaemonette Garcia",
      Status: "Submitted",
      Reason: "Something is wrong with payroll computation.",
    },
    {
      id: 2,
      "Issue Raised": "Earnings Computation",
      "Date Raised": "January 05, 2023",
      "Handled By": "Will Salvador",
      Status: "Pending",
      Reason: "Something is wrong with earnings computation.",
    },
    {
      id: 3,
      "Issue Raised": "Deductions Computation",
      "Date Raised": "November 20, 2023",
      "Handled By": "Will Salvador",
      Status: "Resolved",
      Reason: "Something is wrong with deductions computation.",
    },
    {
      id: 4,
      "Issue Raised": "Salary Dispute",
      "Date Raised": "October 05, 2023",
      "Handled By": "Jessa Poppin",
      Status: "Closed",
      Reason: "Something is wrong with salary.",
    },
  ];
  const [hireDate, setHireDate] = useState(moment());
  const [payDisputes, setPayDisputes] = useState([]);
  const [payslipRecords, setPayslipRecords] = useState([]);
  let rowData = {
    id: "",
    dates: {},
    email: "",
    emp_num: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    net_salary: 0,
    payables: {},
    totals: {},
  };
  const [selectedRow, setSelectedRow] = useState(rowData);
  let ytdData = {
    year: "",
    earnings: "",
    deductions: "",
    net_salary: "",
  };
  const [userYTD, setUserYTD] = useState(ytdData);

  const historicalTaxReturn = [
    { id: 1, year: 2023, link: "#" },
    { id: 2, year: 2022, link: "#" },
    { id: 3, year: 2021, link: "#" },
  ];
  //Fetch User Pay Disputes
  const fetchUserInfo = async () => {
    await axios
      .get(BASE_URL + "/ep-getDataOfLoggedInUser")
      .then(function (response) {
        console.log(response.data);
        setHireDate(response.data[""]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //Fetch User Pay Disputes
  const fetchUserPayDisputes = async () => {
    await axios
      .get(BASE_URL + "/d-getUserDispute")
      .then(function (response) {
        console.log(response);
        setPayDisputes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Fetch Payslip of User
  const fetchUserPayslips = async () => {
    try {
      const res = await axios.get(BASE_URL + "/mp-getUserPayslip");
      // Parse String JSON to JSON
      res.data.forEach((item) => {
        item.dates = JSON.parse(item.dates);
        // Format dates
        for (let key in item.dates) {
          item.dates[key] = format(new Date(item.dates[key]), "MMMM dd, yyyy");
        }
        item.payables = JSON.parse(item.payables);
        item.totals = JSON.parse(item.totals);
      });
      setPayslipRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch YTD of User
  const fetchUserYTD = async () => {
    try {
      const res = await axios.get(BASE_URL + "/mp-getUserYTD");
      setUserYTD(res.data[0]);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserPayDisputes();
    fetchUserPayslips();
    fetchUserYTD();
    payrollDates();
  }, []);

  const handleViewClick = (data) => {
    const dialogData = data;
    console.log("DialogData", dialogData);
    document.getElementById("row-data").showModal();
    setSelectedRow(data);
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

  let cutOffDates = useRef([]);
  function payrollDates() {
    const days = [5, 20];
    days.forEach((day) => {
      for (let m = 0; m < 12; m++) {
        const cutOff = new Date(moment().year(), m, day);

        if (cutOff.getDay() === 0) {
          // Sunday
          cutOff.setDate(cutOff.getDate() - 2);
        } else if (cutOff.getDay() === 6) {
          cutOff.setDate(cutOff.getDate() - 1);
          // Saturday
        }
        cutOffDates.current.push(moment(cutOff).format("DD-MM-YYYY"));
      }
    });
    console.log("Days: ", cutOffDates);
  }

  const beforeJune = [
    "05-01-2024",
    "05-02-2024",
    "05-03-2024",
    "05-04-2024",
    "03-05-2024",
    "05-06-2024",
    "08-07-2024",
    "08-08-2024",
    "10-09-2024",
    "10-10-2024",
    "08-11-2024",
    "10-12-2024",
    "19-01-2024",
    "20-02-2024",
    "20-03-2024",
    "19-04-2024",
    "20-05-2024",
    "20-06-2024",
    "24-07-2024",
    "23-08-2024",
    "25-09-2024",
    "25-10-2024",
    "25-11-2024",
    "23-12-2024",
  ];

  const startingJune = [
    "05-01-2024",
    "05-02-2024",
    "05-03-2024",
    "05-04-2024",
    "03-05-2024",
    // "05-06-2024",
    "10-07-2024",
    "09-08-2024",
    "10-09-2024",
    "10-10-2024",
    "08-11-2024",
    "10-12-2024",
    "19-01-2024",
    "20-02-2024",
    "20-03-2024",
    "19-04-2024",
    "20-05-2024",
    "25-06-2024",
    "25-07-2024",
    "23-08-2024",
    "25-09-2024",
    "25-10-2024",
    "25-11-2024",
    "23-12-2024",
  ];

  return (
    <>
      <div className=" m-auto text-[#36454F]">
        <Headings text={"My Payslips"} />
        <div className="w-full mt-10 flex flex-col md:flex-row  gap-4">
          <div className="h-96 w-full flex flex-row md:flex-col gap-4  ">
            {/* 1st Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Upcoming Payroll Date */}
              <div className="bg-white box-border p-5 sm:w-3/5 h-40 rounded-[15px] border border-[#E4E4E4] flex flex-col justify-between relative">
                <div className="flex gap-2 items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22H19C20.103 22 21 21.103 21 20V6C21 4.897 20.103 4 19 4ZM14.412 19L11.963 17.712L9.514 19L9.982 16.272L8 14.342L10.738 13.944L11.963 11.464L13.188 13.944L15.926 14.342L13.945 16.273L14.412 19ZM19 9H5V7H19V9Z"
                      fill="#36454F"
                    />
                  </svg>

                  <span className="font-bold text-[16px]">
                    Upcoming Payroll Date
                  </span>
                </div>
                {/* Date */}
                <div className="">
                  <span className="text-4xl font-bold text-[#CC5500]">
                    {moment().format("MMM Do")},
                  </span>
                  <span className="text-sm "> {moment().format("YYYY")}</span>
                </div>
                {/* Countdown */}
                <div>
                  <br />
                </div>
              </div>

              {/* Payroll Account */}
              <div className="bg-white box-border p-5 sm:w-2/5 h-40 rounded-[15px] border border-[#E4E4E4] flex flex-col justify-between relative">
                <div className="flex gap-2 w-full justify-between">
                  <div className="flex gap-2  items-center">
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 0H2C0.897 0 0 0.897 0 2V4H20V2C20 0.897 19.103 0 18 0ZM0 14C0 15.103 0.897 16 2 16H18C19.103 16 20 15.103 20 14V8H0V14ZM3 11H9V13H3V11Z"
                        fill="#36454F"
                      />
                    </svg>

                    <span className="font-bold text-[16px]">
                      Payroll Account
                    </span>
                  </div>

                  <span className="p-1 rounded-[2px] text-[#00A124] bg-[#A8F0B8] text-[8px] self-end">
                    Connected
                  </span>
                </div>
                <div className="flex flex-row">
                  <img src={ubLogo} className="w-16 h-16" alt="logo" />
                  <div className="flex flex-col p-2.5">
                    <span>Union Bank</span>
                    <span className="text-[#B2AC88]">Verified Account</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2nd Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Historical Tax Returns */}
              <div className="bg-white box-border p-5 h-52 sm:w-2/5 rounded-[15px] border border-[#E4E4E4] flex flex-col justify-between gap-5 relative">
                <div className="flex gap-2 items-center">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 0H2C0.897 0 0 0.897 0 2V4H20V2C20 0.897 19.103 0 18 0ZM0 14C0 15.103 0.897 16 2 16H18C19.103 16 20 15.103 20 14V8H0V14ZM3 11H9V13H3V11Z"
                      fill="#36454F"
                    />
                  </svg>

                  <span className="font-bold text-[16px]">
                    Historical Tax Returns
                  </span>
                </div>
                <table className="text-center">
                  <thead className="text-[#CC5500]">
                    <tr>
                      <th>#</th>
                      <th>Year</th>
                      <th>Attachment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalTaxReturn.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.year}</td>
                        <td className="text-[#B2AC88] underline">
                          <NavLink to={row.link}>View</NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Year to Date */}
              <div className="bg-white box-border p-5 sm:w-3/5 rounded-[15px] border border-[#E4E4E4] flex flex-col justify-between gap-5 relative">
                <div className="flex gap-2 items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5C7.031 5 2 6.546 2 9.5C2 12.454 7.031 14 12 14C16.97 14 22 12.454 22 9.5C22 6.546 16.97 5 12 5ZM7 14.938V17.938C8.237 18.237 9.605 18.42 11 18.479V15.479C9.65248 15.4265 8.31305 15.2453 7 14.938ZM13 15.478V18.478C14.3476 18.4266 15.6871 18.2454 17 17.937V14.937C15.6871 15.2454 14.3476 15.4266 13 15.478ZM19 14.297V17.297C20.801 16.542 22 15.44 22 14V11C22 12.44 20.801 13.542 19 14.297ZM5 17.297V14.297C3.2 13.542 2 12.439 2 11V14C2 15.439 3.2 16.542 5 17.297Z"
                      fill="#36454F"
                    />
                  </svg>

                  <span className="font-bold text-[16px]">Year to Date</span>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th className="text-right">
                        <span className="text-[#B2AC88]">
                          {payslipRecords.length > 0 ? (
                            moment(payslipRecords[0].dates.Payment).format(
                              "MMM DD YYYY"
                            )
                          ) : (
                            <>MMMM DD, YYYY</>
                          )}
                        </span>
                      </th>
                      <th className="text-right">
                        <span className="text-[#B2AC88]">
                          {userYTD != undefined ? (
                            <>YTD {userYTD.year}</>
                          ) : (
                            moment().year()
                          )}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#B2AC88]">
                      <td>
                        <span className="text-[#CC5500]">Earnings</span>
                      </td>
                      <td className="text-right">
                        {payslipRecords.length > 0 ? (
                          addCommasAndFormatDecimal(
                            parseFloat(payslipRecords[0].totals.Earnings)
                          )
                        ) : (
                          <>00.00</>
                        )}
                      </td>
                      <td className="text-right">
                        {userYTD != undefined ? (
                          addCommasAndFormatDecimal(userYTD.earnings)
                        ) : (
                          <>00.00</>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="text-[#CC5500]">Deductions</span>
                      </td>
                      <td className="text-right">
                        {payslipRecords.length > 0 ? (
                          addCommasAndFormatDecimal(
                            payslipRecords[0].totals.Deductions
                          )
                        ) : (
                          <>00.00</>
                        )}
                      </td>
                      <td className="text-right">
                        {userYTD != undefined ? (
                          addCommasAndFormatDecimal(userYTD.deductions)
                        ) : (
                          <>00.00</>
                        )}
                      </td>
                    </tr>
                    <tr className="border-t border-[#B2AC88]">
                      <td>
                        <span className="text-[#CC5500]">Net Income</span>
                      </td>
                      <td className="text-right">
                        {payslipRecords.length > 0 ? (
                          addCommasAndFormatDecimal(
                            payslipRecords[0].net_salary
                          )
                        ) : (
                          <>00.00</>
                        )}
                      </td>
                      <td className="text-right">
                        {userYTD != undefined ? (
                          addCommasAndFormatDecimal(userYTD.net_salary)
                        ) : (
                          <>00.00</>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Payroll Release */}
          <div className="p-5 w-80 h-96 rounded-[15px] bg-white ml-auto">
            <span className="font-bold text-[16px]">Payroll Release</span>
            <Calendar
              view="month"
              calendarType="gregory"
              value=""
              tileClassName={({ date }) => {
                const formattedDate = moment(date).format("DD-MM-YYYY");
                if (beforeJune.includes(formattedDate)) {
                  return "react-calendar__tile-pay-dates";
                }
              }}
            />
          </div>
        </div>

        {/* Pay Disputes */}
        <div className="bg-white box-border p-5 w-full rounded-[15px] border border-[#E4E4E4] mt-2 flex flex-col justify-between gap-5 min-h-[300px] relative">
          <div className="flex justify-between">
            <span className="font-bold text-[16px]">Pay Disputes</span>

            <AddPayDispute />
          </div>
          <div className="mt-5 p-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
            {payDisputes.length > 0 ? (
              <table className="text-left">
                <thead>
                  <tr className=" h-14 border-b">
                    <th>Issue Raised</th>
                    <th>Date Raised</th>
                    <th>Handled By</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payDisputes.map((row) => (
                    <tr key={row.key} className="h-14 border-b">
                      <td>{row.dispute_title}</td>
                      <td>{moment(row.raised_at).format("MMM DD, YYYY")}</td>
                      <td>{row.handled_by}</td>
                      <td>
                        {row.dispute_status == 0 ? (
                          <div className="w-24 text-center rounded bg-[#FF974D]">
                            Pending
                          </div>
                        ) : row.dispute_status == 1 ? (
                          <div className="w-24 text-center rounded bg-[#FFCD6B]">
                            Declined
                          </div>
                        ) : (
                          <div className="w-24 text-center rounded bg-[#7DDA74]">
                            Accepted
                          </div>
                        )}
                      </td>
                      <td>
                        {/* <button className="text-[12px] font-semibold text-[#9E978E] bg-[#9E978E] bg-opacity-20 px-3 py-2 rounded-[8px]">
                          View
                        </button> */}
                        <ViewPayDispute payDisputeInfo={row} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span>No Record Found</span>
            )}
          </div>
        </div>

        {/* Recent Payslips */}
        {payslipRecords.length > 0 && (
          <div className="bg-white box-border p-5 w-full rounded-[15px] border border-[#E4E4E4] mt-2 flex flex-col justify-between gap-5 min-h-[500px] relative">
            <span className="font-bold text-[16px]">Recent Payslips</span>
            <div className="mt-5 p-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
              {payslipRecords.length > 0 ? (
                <table className="table ">
                  <thead>
                    <tr>
                      <th>Pay Date</th>
                      <th>Pay Period</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {payslipRecords.map((row) => (
                      <tr key={row.id}>
                        <td>{row.dates["Payment"]}</td>
                        <td>
                          <p>
                            {row.dates["From"]} to {row.dates["To"]}
                          </p>
                        </td>
                        <td>
                          <button
                            className="text-[12px] font-semibold text-[#CC5500] bg-[#F5DDCC] px-3 py-2 rounded-[8px]"
                            onClick={() => handleViewClick(row)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <span>No Record Found</span>
              )}
            </div>
          </div>
        )}
      </div>
      <dialog id="row-data" className="modal">
        <div className="modal-box p-0 w-11/12 max-w-3xl">
          <div className="flex flex-col p-5 bg-gradient-to-br from-[#CC5500] to-[#FF974D] text-white justify-end">
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
              <div className="w-full font-bold">{selectedRow.emp_num}</div>
              <div className="w-full text-end">
                <span className="font-bold">Pay Period: </span>
                <span>{selectedRow.dates["From"]}</span>
                <span className="font-bold"> to </span>
                <span>{selectedRow.dates["To"]}</span>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-2">
              <div className="w-full font-bold">
                {selectedRow.first_name} {selectedRow.middle_name}{" "}
                {selectedRow.last_name}
              </div>
              <div className="w-full text-end">
                <span className="font-bold">Pay Day: </span>
                {selectedRow.dates["Payment"]}
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
                <hr className="ml-7 mt-1 border h-[4px] bg-[#000000]"></hr>
                {Object.entries(selectedRow.payables).map(
                  ([category, payItems]) => (
                    <>
                      <div
                        className="flex flex-row justify-between"
                        key={category}
                      >
                        <h1 className="font-bold mx-3 mt-3 pl-5">{category}</h1>
                        <h1 className="font-bold mx-3 mt-3">Amount PHP</h1>
                      </div>
                      <hr className="mt-1 border h-[2px] bg-[#000000] ml-7"></hr>

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
                      <hr className="mt-1 border h-[2px] bg-[#000000] ml-7"></hr>
                      <div className="flex flex-row justify-between ">
                        <h1 className="font-bold mx-3 mt-3 pl-5">
                          Total {category}
                        </h1>
                        <h1 className="mx-3 mt-3">
                          {addCommasAndFormatDecimal(
                            selectedRow.totals[category]
                          )}
                        </h1>
                      </div>
                      <hr className=" ml-7 mt-4 border h-[4px] bg-[#000000]"></hr>
                    </>
                  )
                )}

                <div className="flex flex-row justify-between border-t-3">
                  <h1 className="font-bold mx-3 mt-3">Take Home Pay</h1>
                  <h1 className="mx-3 mt-3">
                    {addCommasAndFormatDecimal(selectedRow.net_salary)}
                  </h1>
                </div>
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
};
export default MyPayslip;
