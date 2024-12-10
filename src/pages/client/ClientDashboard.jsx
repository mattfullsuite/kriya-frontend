import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import Headings from "../../components/universal/Headings";
import BuildingComponent from "../../components/universal/BuildingComponent";
import ClientSideBar from "../../components/client/ClientSideBar";
import DashBremainingPTO from "../../components/universal/DashBRemainingPTO";
import DashBButtons from "../../components/universal/DashBButtons";
import DashBBirthdays from "../../components/universal/DashBBirthdays";
import DashBAnniversaries from "../../components/universal/DashBAnniversaries";
import DashBGreeting from "../../components/universal/DashBGreeting";
import DashBPTOApprovedAndOwned from "../../components/universal/DashBPTOApprovedAndOwned";
import ManagerPTONotices from "../../components/manager/ManagerPTONotices";
import ManagerPTORequestTableLimited from "../../components/manager/ManagerPTORequestTableLimited";
import Bot from "../../components/universal/Bot";
import moment from "moment";
import DataTable from "react-data-table-component";
import FileFullDayLeave from "../../components/universal/FileFullDayLeave.jsx";
import FileHalfDayLeave from "../../components/universal/FileHalfDayLeave.jsx";
import FileOvertimeRequest from "../../components/universal/FileOvertimeRequest.jsx";
import Calendar from "react-calendar";

const ClientDashboard = ({ fillColor, textColor, bgColor }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [ptos, setPtos] = useState([]);
  const [ptoHistory, setPtoHistory] = useState([]);
  const [role, setRole] = useState([]);
  const [countLeavesToday, setCountLeavesToday] = useState([]);
  const [countLeavesWeek, setCountLeavesWeek] = useState([]);

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
  // const [users, setUser] = useState([]);
  // const [announcements, setAnnouncements] = useState([]);
  // const [pleaves, setPendingLeaves] = useState([]);

  // const [ifManager, setIfManager] = useState([]);
  // const uid = users.emp_id;
  // const BASE_URL = process.env.REACT_APP_BASE_URL; //

  // useEffect(() => {
  //   const fetchAllPendingLeaves = async () => {
  //     try {
  //       const res = await Axios.get(BASE_URL + "/showpendingleaves");
  //       setPendingLeaves(res.data);
  //       const res2 = await Axios.get(BASE_URL + "/showpendingdepartmentleaveslimited");
  //       setIfManager(res2.data.length)
  //       console.log(res2.data.length)
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchAllPendingLeaves();
  // }, []);

  // useEffect(() => {
  //   const fetchAllAnnouncements = async () => {
  //     try {
  //       const res = await Axios.get(BASE_URL + "/announcements");
  //       setAnnouncements(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchAllAnnouncements();
  // }, []);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const res = await Axios.get(BASE_URL + "/login");
  //       setUser(res.data.user[0]);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  // return (
  //   <>
  //     <div className="flex flex-col">
  //       <DashBGreeting></DashBGreeting>

  //       <div className="m-4 flex flex-col xl:flex-row gap-8">
  //         <div className="grow">
  //           <div className="flex flex-col md:flex-row overflow-x-auto">
  //             <div>
  //               <DashBButtons />
  //             </div>

  //             <div>
  //               <DashBremainingPTO />
  //             </div>
  //           </div>

  //           {(ifManager > 0) ?

  //           <div className="mt-4">
  //             <ManagerPTORequestTableLimited link={"./svgs/lead_empty.svg"}></ManagerPTORequestTableLimited>
  //             <br />
  //             <ManagerPTONotices></ManagerPTONotices>
  //           </div>

  //           : null}

  //           <div className="mt-4">
  //             <DashBPTOApprovedAndOwned uid={uid} />
  //           </div>
  //         </div>

  //         <div className="flex flex-col justify-start lg:flex-row xl:block">
  //           <DashBBirthdays />
  //           <br />
  //           <DashBAnniversaries />
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <div className="box-border m-auto max-w-[1300px] p-5">
      <Headings text={"Good Morning Juniper!"} />
      <div className=" flex flex-col lg:flex-row ">
        <div className="flex flex-col w-[350px] ">
          <div className="bg-white border border-[#E4E4E4] box-border h-[150px] mb-3 m-5 p-5 rounded-[15px] flex flex-col justify-between">
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

          <div className="box-border bg-white  mb-3 mx-5 p-3 rounded-[15px] h-[180px] border border-[#e4e4e4]">
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
          <div className=" mb-5 mx-5 ">
            <FileFullDayLeave />
            <FileHalfDayLeave />
            <FileOvertimeRequest
              bgColor={"bg-[#90946f]"}
              focusBorder={"focus:border-[#90946f]"}
            />
          </div>
        </div>

        <div className="bg-blue-200">Employee Health Check</div>
      </div>
      <div className="flex flex-col lg:flex-row">
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
        <div className="bg-blue-200">Pending Tickets</div>
      </div>

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
