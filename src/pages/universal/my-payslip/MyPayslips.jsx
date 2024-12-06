import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import moment from "moment";
import Calendar from "react-calendar";

import Headings from "../../../components/universal/Headings";
import AddPayDispute from "./components/AddPayDispute";
import ViewPayDispute from "./components/ViewPayDispute";
import "./Calendar.css";
import ubLogo from "../../../assets/logo-union-bank.png";
import DataTable from "react-data-table-component";

const { format } = require("date-fns");

const MyPayslip = ({ textColor, bgColor, gradientFrom, gradientTo }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let hireDate = "";
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
  useEffect(() => {
    console.log("PR", payslipRecords);
  }, [payslipRecords]);
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

  const [upcomingCutOff, setUpcommingCutOff] = useState(
    moment().format("MMM. DD YYYY")
  );

  const userRole = useRef();
  //Fetch User Pay Disputes
  const fetchUserInfo = async () => {
    await axios
      .get(BASE_URL + "/ep-getDataOfLoggedInUser")
      .then(function (response) {
        const dateHired = moment(response.data[0].date_hired).format(
          "YYYY-MM-DD"
        );
        hireDate = dateHired;
        userRole.current = response.data[0].emp_role;
        console.log(response.data[0].emp_role);
        payrollDates();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //Fetch User Pay Disputes
  const fetchUserPayDisputes = async () => {
    await axios
      .get(BASE_URL + "/d-getUserPayrollDispute")
      .then(function (response) {
        setPayDisputes(response.data);
      })
      .catch(function (error) {
        console.error(error);
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
      console.error(err);
    }
  };

  // Fetch YTD of User
  const fetchUserYTD = async () => {
    try {
      const res = await axios.get(BASE_URL + "/mp-getUserYTD");
      setUserYTD(res.data[0]);
      return;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserPayDisputes();
    fetchUserPayslips();
    fetchUserYTD();
  }, []);

  const handleViewClick = (data) => {
    const dialogData = data;
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

  const cutOffDates = useRef([]);
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
    "16-12-2024",
    "23-12-2024",
  ];

  const startingJune = [
    "05-01-2024",
    "05-02-2024",
    "05-03-2024",
    "05-04-2024",
    "03-05-2024",
    "05-06-2024",
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
    "16-12-2024",
    "23-12-2024",
  ];

  function payrollDates() {
    cutOffDates.current = hireDate < "2024-06-01" ? beforeJune : startingJune;
    setUpcommingCutOff(findeClosestCutOffDate(cutOffDates.current));
  }

  function findeClosestCutOffDate(datesArray) {
    // Convert date strings to Moment.js objects, assuming the format is DD-MM-YYYY
    const dates = datesArray.map((date) => moment(date, "DD-MM-YYYY"));

    // Get current date
    const now = moment();

    // Filter out past dates
    const futureDates = dates.filter((date) => date.isAfter(now));

    // If there are no future dates, return null
    if (futureDates.length === 0) {
      return null;
    }

    // Find the closest future date
    const closestDate = futureDates.reduce((min, date) => {
      return date.isBefore(min) ? date : min;
    }, futureDates[0]);

    return closestDate.format("YYYY-MM-DD");
  }

  //for Year to Date table - Anthony
  const YTDcolumns = [
    { name: "", selector: (row) => row.label, sortable: false },
    {
      name:
        payslipRecords.length > 0
          ? <span className={` ${textColor} text-sm font-bold`}>{moment(payslipRecords[0].dates.Payment).format("MMM DD YYYY")}</span>
          : "MMMM DD, YYYY",
      selector: (row) => row.current,
      right: true,
    },
    {
      name: userYTD ? <span className={` ${textColor} text-sm font-bold`}>{`YTD ${userYTD.year}`}</span> : `YTD ${moment().year()}`,
      selector: (row) => row.ytd,
      right: true,
    },
  ];
  const YTDdata = [
    {
      label: <span className={textColor}>Earnings</span>,
      current:
        payslipRecords.length > 0
          ? addCommasAndFormatDecimal(
              parseFloat(payslipRecords[0].totals.Earnings)
            )
          : "00.00",
      ytd: userYTD ? addCommasAndFormatDecimal(userYTD.earnings) : "00.00",
    },
    {
      label: <span className={textColor}>Deductions</span>,
      current:
        payslipRecords.length > 0
          ? addCommasAndFormatDecimal(
              parseFloat(payslipRecords[0].totals.Deductions)
            )
          : "00.00",
      ytd: userYTD ? addCommasAndFormatDecimal(userYTD.deductions) : "00.00",
    },
    {
      label: <span className={textColor}>Net Income</span>,
      current:
        payslipRecords.length > 0
          ? addCommasAndFormatDecimal(parseFloat(payslipRecords[0].net_salary))
          : "00.00",
      ytd: userYTD ? addCommasAndFormatDecimal(userYTD.net_salary) : "00.00",
    },
  ];

  //for Recent Payslips - Anthony
  const RPcolumns = [
    {
      name: "Pay Date",
      selector: (row) => moment(row.dates.Payment).format("MMM DD, YYYY"),
      sortable: true,
    },
    {
      name: "Pay Period",
      selector: (row) =>
        `${moment(row.dates.From).format("MMM DD, YYYY")} to ${moment(
          row.dates.To
        ).format("MMM DD, YYYY")}`,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <button
          className={`w-20 text-[12px] font-semibold ${textColor} ${bgColor} px-3 py-2 rounded-[8px] bg-opacity-20`}
          onClick={() => handleViewClick(row)}
        >
          {" "}
          View{" "}
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const RPdata = payslipRecords.map((row) => ({
    ...row,
    dates: {
      Payment: moment(row.dates.Payment).format("MMM DD, YYYY"),
      From: moment(row.dates.From).format("MMM DD, YYYY"),
      To: moment(row.dates.To).format("MMM DD, YYYY"),
    },
  }));
  
  //for Pay Disputes - Anthony
  const PDcolumns = [
    {
      name: "Issue Raised",
      selector: (row) => row.dispute_title,
      sortable: true,
    },
    {
      name: "Date Raised",
      selector: (row) => moment(row.raised_at).format("MMM DD, YYYY"),
      sortable: true,
    },
    { name: "Handled By", selector: (row) => row.handler_name, sortable: true },
    {
      name: "Status",
      cell: (row) => {
        const statusColor =
          row.dispute_status === 0
            ? "#FF974D"
            : row.dispute_status === 1
            ? "#7DDA74"
            : "#FFCD6B";
        const statusText =
          row.dispute_status === 0
            ? "Pending"
            : row.dispute_status === 1
            ? "Accepted"
            : "Declined";
        return (
          <div
            className={`w-24 text-center rounded`}
            style={{ backgroundColor: statusColor }}
          >
            {" "}
            {statusText}{" "}
          </div>
        );
      },
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <ViewPayDispute
          payDisputeInfo={row}
          textColor={textColor}
          bgColor={bgColor}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const PDdata = payDisputes.map((row) => ({
    ...row,
    raised_at: moment(row.raised_at).format("MMM DD, YYYY"),
  }));
  
  return (
    <>
      <div className=" text-[#36454F] p-5">
        <Headings text={"My Payslips"} />
        <div className="w-full h-full flex gap-4">
          <div className="flex flex-col w-full gap-2">
            {/* Upcoming Payroll Date */}
            <div className="bg-white w-full box-border p-3 rounded-[15px] border border-[#E4E4E4] flex flex-col justify-between">
              <div className="flex gap-2 items-center mb-4">
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
              <div>
                <span className={`text-4xl font-bold ${textColor}`}>
                  {moment(upcomingCutOff).format("MMM Do")},
                </span>
                <span className="text-sm ">
                  {" "}
                  {moment(upcomingCutOff).format("YYYY")}
                </span>
              </div>
            </div>

            <div className="bg-white w-full box-border p-3 rounded-[15px] border border-[#E4E4E4]">
              <div className="flex gap-2">
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
              {/* dito year to date - Anthony */}

              <DataTable
                columns={YTDcolumns}
                data={YTDdata}
                highlightOnHover
                striped
                noHeader
              />
            </div>
          </div>

          <div className="bg-white w-[70%] p-4 rounded-[15px] border border-[#E4E4E4]">
            <span className="font-bold text-[16px]">Payroll Release</span>
            <Calendar
              view="month"
              calendarType="gregory"
              value=""
              tileClassName={({ date }) => {
                const formattedDate = moment(date).format("DD-MM-YYYY");
                if (cutOffDates.current) {
                  if (cutOffDates.current.includes(formattedDate)) {
                    if (userRole.current == 1) {
                      return "react-calendar__tile-pay-dates-hr";
                    } else if (userRole.current == 3) {
                      return "react-calendar__tile-pay-dates-manager";
                    } else if (userRole.current == 2) {
                      return "react-calendar__tile-pay-dates-employee";
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Recent Payslips */}
        {payslipRecords.length > 0 && (
          <div className="bg-white box-border p-5 w-full rounded-[15px] border border-[#E4E4E4] mt-2 flex flex-col justify-between gap-5 min-h-[250px] relative">
            <span className="font-bold text-[16px]">Recent Payslips</span>
            <div className=" p-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
              {payslipRecords.length > 0 ? (
                <DataTable
                columns={RPcolumns}
                data={RPdata}
                highlightOnHover
                striped
                noHeader
              />
              ) : (
                <span>No Record Found</span>
              )}
            </div>
          </div>
        )}

        {/* Pay Disputes */}
        <div className="bg-white box-border p-5 w-full rounded-[15px] border border-[#E4E4E4] mt-2 flex flex-col justify-between gap-5 min-h-[250px] relative">
          <div className="flex justify-between">
            <span className="font-bold text-[16px]">Pay Disputes</span>

            <AddPayDispute textColor={textColor} bgColor={bgColor} />
          </div>
          <div className="mt-5 p-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
            {payDisputes.length > 0 ? (
              <DataTable
              columns={PDcolumns}
              data={PDdata}
              highlightOnHover
              striped
              noHeader
            />
            ) : (
              <span>No Record Found</span>
            )}
          </div>
        </div>
      </div>

      <dialog id="row-data" className="modal">
        <div className="modal-box p-0 w-11/12 max-w-3xl">
          <div
            className={`flex flex-col p-5 bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white justify-end`}
          >
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
                {selectedRow["Employee Number"]}
              </div>
              <div className="w-full text-end">
                <span className="font-bold">Pay Period: </span>
                <span>{selectedRow.dates["From"]}</span>
                <span className="font-bold"> to </span>
                <span>{selectedRow.dates["To"]}</span>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-2">
              <div className="w-full font-bold">{selectedRow.Name}</div>
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
                      {selectedRow.totals[category] != 0 && (
                        <>
                          {" "}
                          <div
                            className="flex flex-row justify-between"
                            key={category}
                          >
                            <h1 className="font-bold mx-3 mt-3 pl-5">
                              {category}
                            </h1>
                            <h1 className="font-bold mx-3 mt-3">Amount PHP</h1>
                          </div>
                          <hr className="mt-1 border h-[2px] bg-[#000000] ml-7"></hr>
                          {Object.entries(payItems).map(([payItem, amount]) => (
                            <>
                              {!payItem.includes("ER") &&
                                !payItem.includes("ECC") && (
                                  <>
                                    {addCommasAndFormatDecimal(amount) != 0 && (
                                      <div
                                        className="flex flex-row justify-between"
                                        key={payItem}
                                      >
                                        <h1 className="mx-3 mt-3 pl-10">
                                          {payItem}
                                        </h1>
                                        <h1 className="mx-3 mt-3">
                                          {addCommasAndFormatDecimal(amount)}
                                        </h1>
                                      </div>
                                    )}
                                  </>
                                )}
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
                      )}
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
