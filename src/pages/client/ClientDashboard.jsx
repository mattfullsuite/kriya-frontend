import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import Headings from "../../components/universal/Headings";
import Bot from "../../components/universal/Bot";
import moment from "moment";
import DataTable from "react-data-table-component";
import FileFullDayLeave from "../../components/universal/FileFullDayLeave.jsx";
import FileHalfDayLeave from "../../components/universal/FileHalfDayLeave.jsx";
import FileOvertimeRequest from "../../components/universal/FileOvertimeRequest.jsx";
import Calendar from "react-calendar";
import "../../App.css"; // for circle in upcoming events

const ClientDashboard = ({ fillColor, textColor, bgColor }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [ptos, setPtos] = useState([]);
  const [ptoHistory, setPtoHistory] = useState([]);
  const [role, setRole] = useState([]);
  const [countLeavesToday, setCountLeavesToday] = useState(0);
  const [countLeavesWeek, setCountLeavesWeek] = useState(0);

  // payslip
  let hireDate = "";
  const [upcomingCutOff, setUpcommingCutOff] = useState(
    moment().format("MMM. DD YYYY")
  );
  const userRole = useRef();

  const fetchUserInfo = async () => {
    await Axios.get(BASE_URL + "/ep-getDataOfLoggedInUser")
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

  useEffect(() => {
    const fetchMyTimeOffAndAttendanceDetails = async () => {
      try {
        const role_res = await Axios.get(BASE_URL + "/login");
        setRole(role_res.data.user[0].emp_role);

        //PTOs
        const pto_balance_res = await Axios.get(BASE_URL + "/mtaa-getUserPTO");
        setPtos(pto_balance_res.data[0].leave_balance);

        const leaves_today_res = await Axios.get(
          BASE_URL + "/mtaa-numofallleavestoday"
        );
        const leaves_week_res = await Axios.get(
          BASE_URL + "/mtaa-numofallleavesweek"
        );
        setCountLeavesToday(leaves_today_res.data[0].count);
        setCountLeavesWeek(leaves_week_res.data[0].count);

        const all_my_pto_history_res = await Axios.get(
          BASE_URL + "/mtaa-myptohistory"
        );
        setPtoHistory(all_my_pto_history_res.data);
      } catch (err) {
        console.log(err);
      }
      fetchMyTimeOffAndAttendanceDetails();
    };
  });

  const ptoHistoryColumns = [
    {
      name: "Type",
      selector: (row) =>
        row.log_type === "GRANT" ? (
          <span className="font-bold text-green-500"> {row.log_type}</span>
        ) : row.log_type === "DIFF" ? (
          <span className="font-bold text-red-500"> {row.log_type}</span>
        ) : (
          <span className="font-bold text-blue-500"> {row.log_type}</span>
        ),
      sortable: true,
      width: "9%",
    },

    {
      name: "Log Time",
      selector: (row) => moment(row.log_time).format("MMM DD YYYY, h:mm:ss"),
      sortable: true,
      width: "20%",
    },
    {
      name: "Handler",
      selector: (row) =>
        row.hr_name !== null ? "HR: " + row.hr_name : "SYSTEM GEN",
      width: "16%",
    },

    {
      name: "PTO Description",
      selector: (row) => row.log_desc,
      width: "55%",
    },
  ];

  // repetative upcoming event tiles
  const UpcomingEvent = ({ date, text }) => {
    return (
      <div className="flex flex-row mb-3">
        <div className="circle">
          <span>{date}</span>
        </div>

        <div>
          <span className="m-2">{text}</span>
        </div>
      </div>
    );
  };

  //repetative tiles for employee health checks
  const EmployeeNotif = ({ type, title, notif }) => {
    if (type === "approval") {
      return (
        <div className="bg-[#F4F4F4] flex flex-row w-full mt-2 p-3 rounded">
          <div className=" content-center mr-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.25 12C2.25 6.615 6.615 2.25 12 2.25C17.385 2.25 21.75 6.615 21.75 12C21.75 17.385 17.385 21.75 12 21.75C6.615 21.75 2.25 17.385 2.25 12ZM15.61 10.186C15.67 10.1061 15.7134 10.0149 15.7377 9.91795C15.762 9.82098 15.7666 9.72014 15.7514 9.62135C15.7361 9.52257 15.7012 9.42782 15.6489 9.3427C15.5965 9.25757 15.5276 9.18378 15.4463 9.12565C15.3649 9.06753 15.2728 9.02624 15.1753 9.00423C15.0778 8.98221 14.9769 8.97991 14.8785 8.99746C14.7801 9.01501 14.6862 9.05205 14.6023 9.10641C14.5184 9.16077 14.4462 9.23135 14.39 9.314L11.154 13.844L9.53 12.22C9.38783 12.0875 9.19978 12.0154 9.00548 12.0188C8.81118 12.0223 8.62579 12.101 8.48838 12.2384C8.35097 12.3758 8.27225 12.5612 8.26882 12.7555C8.2654 12.9498 8.33752 13.1378 8.47 13.28L10.72 15.53C10.797 15.6069 10.8898 15.6662 10.992 15.7036C11.0942 15.7411 11.2033 15.7559 11.3118 15.7469C11.4202 15.738 11.5255 15.7055 11.6201 15.6519C11.7148 15.5982 11.7967 15.5245 11.86 15.436L15.61 10.186Z"
                fill="#666A40"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-[12px] mb-[2px]">{title}</div>
            <div className="text-[12px]">{notif}</div>
          </div>
        </div>
      );
    } else if (type === "disapproval") {
      return (
        <div className="bg-[#F4F4F4] flex flex-row w-full mt-2 p-3 rounded  ">
          <div className=" content-center mr-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12C2.25 17.385 6.615 21.75 12 21.75C17.385 21.75 21.75 17.385 21.75 12C21.75 6.615 17.385 2.25 12 2.25ZM10.28 9.22C10.2113 9.14631 10.1285 9.08721 10.0365 9.04622C9.94454 9.00523 9.84522 8.98318 9.74452 8.98141C9.64382 8.97963 9.54379 8.99816 9.4504 9.03588C9.35701 9.0736 9.27218 9.12974 9.20096 9.20096C9.12974 9.27218 9.0736 9.35701 9.03588 9.4504C8.99816 9.54379 8.97963 9.64382 8.98141 9.74452C8.98318 9.84522 9.00523 9.94454 9.04622 10.0365C9.08721 10.1285 9.14631 10.2113 9.22 10.28L10.94 12L9.22 13.72C9.14631 13.7887 9.08721 13.8715 9.04622 13.9635C9.00523 14.0555 8.98318 14.1548 8.98141 14.2555C8.97963 14.3562 8.99816 14.4562 9.03588 14.5496C9.0736 14.643 9.12974 14.7278 9.20096 14.799C9.27218 14.8703 9.35701 14.9264 9.4504 14.9641C9.54379 15.0018 9.64382 15.0204 9.74452 15.0186C9.84522 15.0168 9.94454 14.9948 10.0365 14.9538C10.1285 14.9128 10.2113 14.8537 10.28 14.78L12 13.06L13.72 14.78C13.7887 14.8537 13.8715 14.9128 13.9635 14.9538C14.0555 14.9948 14.1548 15.0168 14.2555 15.0186C14.3562 15.0204 14.4562 15.0018 14.5496 14.9641C14.643 14.9264 14.7278 14.8703 14.799 14.799C14.8703 14.7278 14.9264 14.643 14.9641 14.5496C15.0018 14.4562 15.0204 14.3562 15.0186 14.2555C15.0168 14.1548 14.9948 14.0555 14.9538 13.9635C14.9128 13.8715 14.8537 13.7887 14.78 13.72L13.06 12L14.78 10.28C14.8537 10.2113 14.9128 10.1285 14.9538 10.0365C14.9948 9.94454 15.0168 9.84522 15.0186 9.74452C15.0204 9.64382 15.0018 9.54379 14.9641 9.4504C14.9264 9.35701 14.8703 9.27218 14.799 9.20096C14.7278 9.12974 14.643 9.0736 14.5496 9.03588C14.4562 8.99816 14.3562 8.97963 14.2555 8.98141C14.1548 8.98318 14.0555 9.00523 13.9635 9.04622C13.8715 9.08721 13.7887 9.14631 13.72 9.22L12 10.94L10.28 9.22Z"
                fill="#F82525"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-[12px] mb-[2px]">{title}</div>
            <div className="text-[12px]">{notif}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-[#F4F4F4] flex flex-row w-full mt-2 p-3 rounded">
          <div className=" content-center mr-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.40069 3.00391C10.5557 1.00391 13.4437 1.00391 14.5977 3.00391L21.9527 15.7519C23.1067 17.7519 21.6627 20.2519 19.3537 20.2519H4.64469C2.33569 20.2519 0.89269 17.7519 2.04669 15.7519L9.39969 3.00391H9.40069ZM11.9997 8.25091C12.1986 8.25091 12.3894 8.32992 12.53 8.47058C12.6707 8.61123 12.7497 8.80199 12.7497 9.00091V12.7509C12.7497 12.9498 12.6707 13.1406 12.53 13.2812C12.3894 13.4219 12.1986 13.5009 11.9997 13.5009C11.8008 13.5009 11.61 13.4219 11.4694 13.2812C11.3287 13.1406 11.2497 12.9498 11.2497 12.7509V9.00091C11.2497 8.80199 11.3287 8.61123 11.4694 8.47058C11.61 8.32992 11.8008 8.25091 11.9997 8.25091ZM11.9997 16.5009C12.1986 16.5009 12.3894 16.4219 12.53 16.2812C12.6707 16.1406 12.7497 15.9498 12.7497 15.7509C12.7497 15.552 12.6707 15.3612 12.53 15.2206C12.3894 15.0799 12.1986 15.0009 11.9997 15.0009C11.8008 15.0009 11.61 15.0799 11.4694 15.2206C11.3287 15.3612 11.2497 15.552 11.2497 15.7509C11.2497 15.9498 11.3287 16.1406 11.4694 16.2812C11.61 16.4219 11.8008 16.5009 11.9997 16.5009Z"
                fill="#FFAE36"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-[12px] mb-[2px]">{title}</div>
            <div className="text-[12px] ">{notif}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="box-border m-auto max-w-[1300px] p-5">
      <Headings text={"Good Morning Juniper!"} />
      <div className=" flex flex-col lg:flex-row gap-3 ">
        <div className="flex flex-col w-[350px] mx-3 mt-3 mr-0 ">
          <div className="bg-white border border-[#E4E4E4] mb-4 box-border h-[150px] p-5 rounded-[15px] flex flex-col justify-between">
            <div className="flex flex-row justify-start gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`${fillColor} h-7 w-7`}
              >
                <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z"></path>
              </svg>

              <span className={`text-[14px] font-semibold ${textColor}`}>
                Employees Out Of Office
              </span>
            </div>

            <div className="box-border flex flex-row justify-between items-center mt-1">
              <div className="box-border flex-1">
                <p className="text-[#363636] text-center text-3xl font-bold">
                  {countLeavesToday}
                </p>

                <p className="text-[10px] text-[#8B8B8B] text-center">Today</p>
              </div>

              <div className="divider divider-horizontal mt-5 mx-5" />

              <div className="box-border flex-1">
                <p className="text-[#363636] text-center text-3xl font-bold">
                  {countLeavesWeek}
                </p>

                <p className="text-[10px] text-[#8B8B8B] text-center">
                  This week
                </p>
              </div>
            </div>
          </div>

          <div className="box-border bg-white  p-5 mb-3 rounded-[15px] h-[180px] border border-[#e4e4e4]">
            <div className="flex flex-row justify-start gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`${fillColor} h-7 w-7`}
              >
                <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z"></path>
              </svg>

              <span className={`text-[14px] font-semibold ${textColor}`}>
                My Total PTO Days
              </span>
            </div>

            <div className="box-border my-5">
              <p className="text-center text-[#363636] font-bold text-[35px]">
                {ptos}
                <span className="text-[10px] text-[#8B8B8B] font-semibold">
                  days
                </span>
              </p>
              <p className="text-[10px] text-[#8B8B8B] font-normal italic text-center"></p>
            </div>

            <div
              className={`box-border rounded-full w-5 h-5 ${bgColor} flex justify-center items-center`}
            >
              <button
                className="btn btn-sm normal-case btn-circle btn-ghost "
                onClick={() =>
                  document.getElementById("pto_details").showModal()
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="grey"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <FileFullDayLeave />
            <FileHalfDayLeave />
            <FileOvertimeRequest
              bgColor={"bg-[#90946f]"}
              focusBorder={"focus:border-[#90946f]"}
            />
          </div>
        </div>

        <div className="bg-white w-[350px] lg:w-[30%] flex flex-col  m-2 p-5 lg:p-5 lg:my-3 rounded-[15px] border border-[#E4E4E4]">
          <div>
            {" "}
            <span className="font-bold text-[16px]">Company Calendar</span>
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
          <div className="pt-3">
            <span className="font-bold text-[16px]">Upcoming Events</span>
            <div className="m-2">
              <UpcomingEvent date="22" text="Juniper William's Birthday" />
              <UpcomingEvent date="24" text="Christmas Holiday" />
              <UpcomingEvent date="31" text="New Year's Eve Holiday" />
            </div>
          </div>
        </div>
        <div className="bg-white w-[350px] lg:w-[30%] flex flex-col  m-2 p-5 lg:p-5 lg:my-3 rounded-[15px] border border-[#E4E4E4]">
          <span className="font-bold text-[16px]">Employee Health Check</span>
          <div className="flex flex-col overflow-y-scroll h-[450px]">
            <EmployeeNotif
              type="alert"
              title="PTO Violation"
              notif="Consecutive filing of unpaid leaves for 3 days."
            />
            <EmployeeNotif
              type="approval"
              title="Leave Approval"
              notif="Your leave for October 31, 2024 to November 4, 2024 has been approved."
            />
            <EmployeeNotif
              type="disapproval"
              title="Leave Disapproved"
              notif="Your leave for October 31, 2024 to November 4, 2024 has been disapproved."
            />
            <EmployeeNotif
              type="meow"
              title="No Attendance Record"
              notif="No Time In and Time Out record for October 31, 2024."
            />
            <EmployeeNotif
              type="meow"
              title="No Attendance Record"
              notif="We are pleased to inform you that your leave request, submitted on [submission date], has been approved. Your leave is scheduled from [start date] to [end date]. Please ensure all pending tasks are completed or delegated appropriately before your leave period begins."
            />
            {/* end */}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row m-3 mx-4 gap-3 lg:w-[1075px]">
        {/* Upcoming Payroll Date */}
        <div className="bg-white box-border p-5 w-[350px] h-40 rounded-[15px] border border-[#E4E4E4] flex flex-col justify-between relative">
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

            <span className="font-bold text-[16px]">Upcoming Payroll Date</span>
          </div>

          {/* Date */}
          <div className="">
            <span className={`text-4xl font-bold ${textColor}`}>
              {moment(upcomingCutOff).format("MMM Do")},
            </span>
            <span className="text-sm ">
              {" "}
              {moment(upcomingCutOff).format("YYYY")}
            </span>
          </div>
          {/* Countdown */}
          <div>
            <br />
          </div>
        </div>

        <div className="bg-white box-border rounded-[15px] lg:mx-2 p-5  w-full lg:w-[720px] max-h-40 border border-[#E4E4E4] flex flex-col justify-between gap-5 relative">
          <div className="flex justify-between">
            <span className="font-bold text-[16px]">
              Employee Services Center
            </span>
          </div>
          <div className=" p-3 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
            No Tickets & Disputes Display.
          </div>
        </div>
      </div>

      {/* Modal PTO Logs */}
      <dialog id="pto_details" className="modal modal-middle">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">PTO History</h3>
          <div className="m-6">
            <DataTable
              columns={ptoHistoryColumns}
              data={ptoHistory}
              highlightOnHover
              dense={true}
              pagination
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <Bot />
    </div>
  );
};

export default ClientDashboard;
