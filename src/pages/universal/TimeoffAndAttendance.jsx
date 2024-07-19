import React, { useState, useEffect } from "react";
import Axios from "axios";
import Headings from "../../components/universal/Headings.jsx";
import DataTable from "react-data-table-component";
import DashBPTOApprovedAndOwned from "../../components/universal/DashBPTOApprovedAndOwned.jsx";
import FileFullDayLeave from "../../components/universal/FileFullDayLeave.jsx";
import FileHalfDayLeave from "../../components/universal/FileHalfDayLeave.jsx";
import FileOvertimeRequest from "../../components/universal/FileOvertimeRequest.jsx";
import FileDispute from "../../components/universal/FileDispute.jsx";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import moment from "moment";
import { Link } from "react-router-dom";

const AttendanceButton = ({ label, method }) => {
  return (
    <>
      <button
        onClick={method}
        className="w-full p-3 bg-white text-[14px] rounded-[15px] border border-[#e4e4e4]"
      >
        {label}
      </button>
    </>
  );
};

const TimeoffAndAttendance = ({ fillColor, textColor, bgColor }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [ptos, setPtos] = useState([]);
  const [countLeavesToday, setCountLeavesToday] = useState([]);
  const [countLeavesWeek, setCountLeavesWeek] = useState([]);
  const [countPaidLeaves, setCountPaidLeaves] = useState([]);
  const [countUnpaidLeaves, setCountUnpaidLeaves] = useState([]);
  const [countPendingLeaves, setCountPendingLeaves] = useState([]);
  const [countApprovedLeaves, setCountApprovedLeaves] = useState([]);
  const [countDeclinedLeaves, setCountDeclinedLeaves] = useState([]);
  const [countAllMyLeaves, setCountAllLeaves] = useState([]);

  const [ptoHistory, setPtoHistory] = useState([]);
  const [overtimeHistory, setOvertimeHistory] = useState([]);
  const [overtimeDownlineHistory, setOvertimeDownlineHistory] = useState([]);
  const [role, setRole] = useState([]);

  //limitedLeaves
  const [limitedLeaves, setLimitedLeaves] = useState([]);

  useEffect(() => {
    const fetchMyTimeAndAttendanceDetails = async () => {
      try {
        const pto_balance_res = await Axios.get(BASE_URL + "/mtaa-getUserPTO");
        const leaves_today_res = await Axios.get(
          BASE_URL + "/mtaa-numofallleavestoday"
        );
        const leaves_week_res = await Axios.get(
          BASE_URL + "/mtaa-numofallleavesweek"
        );
        const count_paid_leaves_res = await Axios.get(
          BASE_URL + "/mtaa-countmypaidleaves"
        );
        const count_unpaid_leaves_res = await Axios.get(
          BASE_URL + "/mtaa-countmyunpaidleaves"
        );
        const count_pending_leaves_res = await Axios.get(
          BASE_URL + "/mtaa-mypendingleaves"
        );
        const count_approved_leaves_res = await Axios.get(
          BASE_URL + "/mtaa-myapprovedleaves"
        );
        const count_declined_leaves_res = await Axios.get(
          BASE_URL + "/mtaa-mydeclinedleaves"
        );
        const count_all_my_leaves_res = await Axios.get(
          BASE_URL + "/mtaa-allmyleaves"
        );
        const all_my_pto_history_res = await Axios.get(
          BASE_URL + "/mtaa-myptohistory"
        );
        setPtos(pto_balance_res.data[0].leave_balance);
        setCountLeavesToday(leaves_today_res.data.length);
        setCountLeavesWeek(leaves_week_res.data.length);
        setCountPaidLeaves(count_paid_leaves_res.data.length);
        setCountUnpaidLeaves(count_unpaid_leaves_res.data.length);
        setCountPendingLeaves(count_pending_leaves_res.data);
        setCountApprovedLeaves(count_approved_leaves_res.data);
        setCountDeclinedLeaves(count_declined_leaves_res.data);
        setCountAllLeaves(count_all_my_leaves_res.data);
        setPtoHistory(all_my_pto_history_res.data);

        const role_res = await Axios.get(BASE_URL + "/login");
        setRole(role_res.data.user[0].emp_role);

        const overtime_history_res = await Axios.get(
          BASE_URL + "/o-getOvertime"
        );
        const overtime_downline_history_res = await Axios.get(
          BASE_URL + "/o-getOvertimeDownline"
        );
        setOvertimeHistory(overtime_history_res.data);
        setOvertimeDownlineHistory(overtime_downline_history_res.data);

        //limitedLeaves
        const my_limited_leaves_res = await Axios.get(
          BASE_URL + "/mtaa-getLimitedAttendanceData"
        );
        setLimitedLeaves(my_limited_leaves_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMyTimeAndAttendanceDetails();
  }, []);

  function calculateTotalHours(timeout, timein) {
    if (!timeout || !timein) {
      return;
    }
    var o = moment(timeout, "HH:mm:ss a");
    var i = moment(timein, "HH:mm:ss a");

    var duration = moment.duration(o.diff(i));

    // duration in hours
    var hours = parseInt(duration.asHours());

    // duration in minutes
    var minutes = parseInt(duration.asMinutes()) % 60;

    return hours + ":" + minutes;
  }

  function checkTimeStatus(timeout, timein) {
    var status = "";
    var o = moment(timeout, "HH:mm:ss a");
    var i = moment(timein, "HH:mm:ss a");

    var duration = moment.duration(o.diff(i));

    // duration in hours
    var hours = parseInt(duration.asHours());

    if (hours < 9) {
      status = "Undertime";
    } else if (hours >= 9) {
      status = "Completed";
    } else if (timeout == null || timein == null) {
      status = "Missing";
    }

    return status;
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="text-2xl font-bold text-[#363636]">Done</div>;
    }
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return (
      <p className="text-2xl font-bold text-[#363636]">
        {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </p>
    );
  };

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

  function checkStatus(status) {
    if (status == 0) {
      return <div className="badge badge-warning text-xs">Pending</div>;
    }
    if (status == 1) {
      return <div className="badge badge-success">Approved</div>;
    }
    if (status == 2) {
      return <div className="badge badge-error text-white">Declined</div>;
    }
  }

  const overtimeColumns = [
    {
      name: "Requested Overtime Date",
      selector: (row) => moment(row.overtime_date).format("MMM DD YYYY"),
    },
    {
      name: "Overtime Type",
      selector: (row) => row.leave_type,
    },

    {
      name: "Requested Hours",
      selector: (row) =>
        row.hours_requested > 1
          ? row.hours_requested + " hours"
          : row.hours_requested + " hour",
    },
    {
      name: "Status",
      selector: (row) => checkStatus(row.overtime_status),
    },
  ];
  return (
    <>
      <div className="max-w-[1200px] m-auto p-5">
        <Headings text={"My Time Off & Attendance"} />
        <div className="flex flex-row justify-between  mx-3 mt-10">
          <span className="font-bold text-[#363636] text-[16px]">
            My Time Card
          </span>

          <Link
            to={
              role === 1
                ? "/hr/time-table"
                : role === 2
                ? "/regular/time-table"
                : role === 3
                ? "/manager/time-table"
                : null
            }
            className="flex flex-row flex-nowrap items-center"
          >
            <p className={`${textColor} text-[14px] font-semibold`}>See all</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`${fillColor} h6 w-6`}
            >
              <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
            </svg>
          </Link>
        </div>

        <div className="bg-white box-border w-full rounded-[15px] border border-[#E4E4E4] mt-2 flex flex-col md:flex-row justify-between gap-5 min-h-[300px] p-3">
          <div className="flex-1 flex flex-col md:flex-row gap-5 flex-nowrap justify-between">
            <div className="flex-1">
              <p className="font-semibold text-[#363636] text-[14px] ml-4">
                Friday, March 03, 2024
              </p>

              <div className="h-[100%] box-border flex justify-center items-center mt-5 md:mt-0">
                <CountdownCircleTimer
                  duration={32400}
                  colors={["#50C878"]}
                  onComplete={() => ({ shouldRepeat: false, delay: 1 })}
                  strokeWidth={20}
                  strokeLinecap="butt"
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
            </div>

            <div className="flex flex-col justify-between h-full w- md:w-[200px] gap-2">
              <div className="flex flex-col w-full gap-2">
                <AttendanceButton label={"Check In"} />

                <AttendanceButton label={"Check Out"} />
              </div>

              {/* <FileDispute /> */}

              {/* <FileDispute /> */}

              <FileOvertimeRequest
                bgColor={"bg-[#90946f]"}
                focusBorder={"focus:border-[#90946f]"}
              />

              {/* <AttendanceButton label={"Request Overtime"} /> */}
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Work Time</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {limitedLeaves.map((l) => (
                  <tr>
                    <td className="text-[10px] text-[#363636]">
                      {moment(l.date).format("MMM. DD, YYYY")}
                    </td>
                    <td className="text-[10px] text-[#363636]">{l.time_in}</td>
                    <td className="text-[10px] text-[#363636]">{l.time_out}</td>
                    <td className="text-[10px] text-[#363636]">
                      {(l.hours_worked/60).toFixed(2) + " hrs"}
                    </td>
                      <td className="text-[10px] text-[#363636]">
                        {l.status}
                      </td>
                      <td className="text-[10px] text-[#363636]">
                        {(l.undertime) ? l.undertime : "Completed"}
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="box-border mt-10">
          <span className="font-bold text-[#363636] text-[16px] ml-3">
            My Paid Time Offs
          </span>

          <div className="box-border flex flex-col xl:flex-row justify-between gap-5 mt-2">
            <div className="box-border w-full xl:w-72 flex flex-col justify-start gap-2">
              <div className="box-border bg-white p-3 rounded-[15px] border border-[#e4e4e4]">
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
                  <p className="text-[10px] text-[#8B8B8B] font-normal italic text-center">
                    + 0.83 on March 31st
                  </p>
                </div>

                <div
                  className={`box-border rounded-full w-9 h-9 ${bgColor} flex justify-center items-center`}
                >
                  <button
                    className="btn btn-md normal-case btn-circle btn-ghost"
                    onClick={() =>
                      document.getElementById("pto_details").showModal()
                    }
                  >
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-white w-8 h-8"
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                    </svg> */}

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

              <FileFullDayLeave />

              {/* //<AttendanceButton label={"Request Leave"} /> */}

              <FileHalfDayLeave />
            </div>

            <div className="box-border flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <div className="bg-white border border-[#E4E4E4] box-border p-5 rounded-[15px] flex flex-col justify-between">
                  <div className="box-border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className={`${fillColor} h-6 w-6`}
                    >
                      <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z"></path>
                    </svg>
                    <span className={`font-medium text-[14px] ${textColor}`}>
                      Total Employees Out of Office
                    </span>
                  </div>

                  <div className="box-border flex flex-row justify-between items-center mt-1">
                    <div className="box-border flex-1">
                      <p className="text-[#363636] text-center text-3xl font-bold">
                        {countLeavesToday}
                      </p>

                      <p className="text-[10px] text-[#8B8B8B] text-center">
                        Today
                      </p>
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

                <div className="bg-white border border-[#E4E4E4] box-border p-5 rounded-[15px] flex flex-col justify-between">
                  <div className="box-border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className={`${fillColor} w-6 h-6`}
                    >
                      <path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path>
                    </svg>
                    <span className={`font-medium text-[14px] ${textColor}`}>
                      My Leave Taken
                    </span>
                  </div>

                  <div className="box-border flex flex-row justify-between items-center mt-1">
                    <div className="box-border flex-1">
                      <p className="text-[#363636] text-center text-3xl font-bold">
                        {countPaidLeaves}
                      </p>
                      <p className="text-[10px] text-[#8B8B8B] text-center">
                        Paid
                      </p>
                    </div>

                    <div className="divider divider-horizontal mt-5 mx-5" />

                    <div className="box-border flex-1">
                      <p className="text-[#363636] text-center text-3xl font-bold">
                        {countUnpaidLeaves}
                      </p>
                      <p className="text-[10px] text-[#8B8B8B] text-center">
                        Unpaid
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#E4E4E4] box-border p-5 rounded-[15px] flex flex-col justify-between">
                  <div className="box-border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className={`${fillColor} w-6 h-6`}
                    >
                      <path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path>
                    </svg>
                    <span className={`font-medium text-[14px] ${textColor}`}>
                      My Leave Request (YTD)
                    </span>
                  </div>

                  <div className="box-border flex flex-row justify-between items-center mt-1">
                    <div className="box-border flex-1">
                      <p className="text-[10px] text-[#8B8B8B] text-center">
                        Approved
                      </p>
                      <p className="text-[#363636] text-center text-2xl font-bold">
                        {countApprovedLeaves.length}
                      </p>
                    </div>

                    <div className="divider divider-horizontal mt-5 mx-5" />

                    <div className="box-border flex-1">
                      <p className="text-[10px] text-[#8B8B8B] text-center">
                        Pending
                      </p>
                      <p className="text-[#363636] text-center text-2xl font-bold">
                        {countPendingLeaves.length}
                      </p>
                    </div>

                    <div className="divider divider-horizontal mt-5 mx-5" />

                    <div className="box-border flex-1">
                      <p className="text-[10px] text-[#8B8B8B] text-center">
                        Declined
                      </p>
                      <p className="text-[#363636] text-center text-2xl font-bold">
                        {countDeclinedLeaves.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box-border mt-5">
                {/* <div className="box-border flex flex-row justify-between items-center mx-3">
                    <span className="font-bold text-[#363636] text-[16px]">
                      Recent Leaves
                    </span>
  
                    <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636]">
                      <option>All</option>
                      <option>Approved</option>
                      <option>Pending</option>
                      <option>Declined</option>
                    </select>
                  </div>
  
                  <div className="bg-white box-border w-full p-3 rounded-[15px] border border-[#E4E4E4] mt-2 overflow-x-scroll">
                    <DataTable
                      columns={columns}
                      data={data}
                      pagination
                      highlightOnHover
                      theme="default"
                      responsive
                    />
                  </div> */}

                <DashBPTOApprovedAndOwned />
              </div>

              <div className="box-border mt-5">
                <div className="box-border flex flex-row justify-between items-center mx-3">
                  <span className="font-bold text-[#363636] text-[16px]">
                    My Overtimes
                  </span>
                  {/*   
                    <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636]">
                      <option>All</option>
                      <option>Approved</option>
                      <option>Pending</option>
                      <option>Declined</option>
                    </select> */}
                </div>

                <div className="bg-white box-border w-full p-3 rounded-[15px] border border-[#E4E4E4] mt-2 overflow-x-scroll">
                  <DataTable
                    columns={overtimeColumns}
                    data={overtimeHistory}
                    pagination
                    highlightOnHover
                    theme="default"
                    responsive
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
};

export default TimeoffAndAttendance;
