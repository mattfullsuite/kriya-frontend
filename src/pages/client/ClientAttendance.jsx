import React from "react";
import ClientSideBar from "../../components/client/ClientSideBar";
import Headings from "../../components/universal/Headings";
import DataTable from "react-data-table-component";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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

const ClientAttendance = () => {
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

  function setStatus(status) {
    if (status === 0) {
      return (
        <div className="bg-[#FFCD6B] py-[2px] px-1 rounded-[5px]">
          <span className="text-[#363636] text-[12px]">Pending</span>
        </div>
      );
    } else if (status === 1) {
      return (
        <div className="bg-[#7DDA74] py-[2px] px-1 rounded-[5px]">
          <span className="text-[#363636] text-[12px]">Approved</span>
        </div>
      );
    } else if (status === 2) {
      return (
        <div className="bg-[#FF8989] py-[2px] px-1 rounded-[5px]">
          <span className="text-[#363636] text-[12px]">Declined</span>
        </div>
      );
    }
  }

  const columns = [
    {
      name: "Leave type",
      selector: (row) => <p>{row.leave_type}</p>,
    },

    {
      name: "Leave Date(s)",
      selector: (row) => <p>{row.date}</p>,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => setStatus(row.status),
      width: "150px",
    },

    {
      name: "Action",
      selector: (row) => (
        <button className="text-[12px] font-semibold text-[#0097B2] bg-[#a0f1ff] px-3 py-2 rounded-[8px]">
          Details
        </button>
      ),
      width: "100px",
    },
  ];

  const data = [
    {
      leave_type: "Sick Leave",
      date: "February 1, 2024",
      status: 1,
    },

    {
      leave_type: "Sick Leave",
      date: "February 1, 2024",
      status: 0,
    },

    {
      leave_type: "Maternity/Paternity Leave",
      date: "February 21, 2024 to February 24, 2024",
      status: 2,
    },

    {
      leave_type: "Vacation Leave",
      date: "February 14, 2024",
      status: 1,
    },

    {
      leave_type: "Study Leave",
      date: "February 7, 2024 to February 09, 2024",
      status: 0,
    },

    {
      leave_type: "Sick Leave",
      date: "February 01, 2024 to Feburary 03, 2024",
      status: 2,
    },
  ];

  return (
    <>
      <div className="w-full max-w-[1200px]">
        <Headings text={"My Time Off & Attendance"} />

        <div className="flex flex-row justify-between  mx-3 mt-10">
          <span className="font-bold text-[#363636] text-[16px]">
            My Time Card
          </span>

          <button className="flex flex-row flex-nowrap items-center">
            <p className="text-[#0097B2] text-[14px] font-semibold">See all</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-[#0097B2] h6 w-6"
            >
              <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
            </svg>
          </button>
        </div>

        <div className="bg-white box-border w-full p-3 rounded-[15px] border border-[#E4E4E4] mt-2 flex flex-col md:flex-row justify-between gap-5 min-h-[300px]">
          <div className="flex-1 flex flex-col md:flex-row gap-5 flex-nowrap justify-between">
            <div className="flex-1">
              <p className="font-semibold text-[#363636] text-[14px]">
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

              <AttendanceButton label={"Request Overtime"} />
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check in</th>
                  <th>Checkout</th>
                  <th>Work Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-[10px] text-[#363636]">03/09/24</td>
                  <td className="text-[10px] text-[#363636]">06:58 AM</td>
                  <td className="text-[10px] text-[#363636]">--:--</td>
                  <td className="text-[10px] text-[#363636]">--:--</td>
                  <td className="text-[10px] text-[#363636]">Ongoing</td>
                </tr>

                <tr>
                  <td className="text-[10px] text-[#363636]">03/08/24</td>
                  <td className="text-[10px] text-[#363636]">06:58 AM</td>
                  <td className="text-[10px] text-[#363636]">04:00 PM</td>
                  <td className="text-[10px] text-[#363636]">09H 02M</td>
                  <td className="text-[10px] text-[#363636]">Present</td>
                </tr>

                <tr>
                  <td className="text-[10px] text-[#363636]">03/07/24</td>
                  <td className="text-[10px] text-[#363636]">06:58 AM</td>
                  <td className="text-[10px] text-[#363636]">03:56 PM</td>
                  <td className="text-[10px] text-[#363636]">08H 58M</td>
                  <td className="text-[10px] text-[#363636]">Undertime</td>
                </tr>

                <tr>
                  <td className="text-[10px] text-[#363636]">03/06/24</td>
                  <td className="text-[10px] text-[#363636]">07:12 AM</td>
                  <td className="text-[10px] text-[#363636]">04:12 PM</td>
                  <td className="text-[10px] text-[#363636]">09H 00M</td>
                  <td className="text-[10px] text-[#363636]">Present</td>
                </tr>

                <tr>
                  <td className="text-[10px] text-[#363636]">03/05/24</td>
                  <td className="text-[10px] text-[#363636]">06:58 AM</td>
                  <td className="text-[10px] text-[#363636]">04:00 PM</td>
                  <td className="text-[10px] text-[#363636]">09H 02M</td>
                  <td className="text-[10px] text-[#363636]">Present</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="box-border mt-10">
          <span className="font-bold text-[#363636] text-[16px] ml-3">
            Paid Time Offs
          </span>

          <div className="box-border flex flex-col xl:flex-row justify-between gap-5 mt-2">
            <div className="box-border w-full xl:w-72 flex flex-col justify-start gap-2">
              <div className="box-border bg-white p-3 rounded-[15px] border border-[#e4e4e4]">
                <div className="flex flex-row justify-start gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-[#0097B2] h-7 w-7"
                  >
                    <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z"></path>
                  </svg>

                  <span className="text-[14px] font-semibold text-[#0097B2]">
                    Total PTO points
                  </span>
                </div>

                <div className="box-border my-5">
                  <p className="text-center text-[#363636] font-bold text-[35px]">
                    5.62{" "}
                    <span className="text-[10px] text-[#8B8B8B] font-semibold">
                      points
                    </span>
                  </p>
                  <p className="text-[10px] text-[#8B8B8B] font-normal italic text-center">
                    + 0.83 on March 31st
                  </p>
                </div>

                <div className="box-border rounded-full w-9 h-9 bg-[#0097B2] flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-white w-8 h-8"
                  >
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                  </svg>
                </div>
              </div>

              <div className="box-border flex flex-col sm:flex-row lg:flex-col justify-center gap-2">
                <AttendanceButton label={"Request Leave"} />

                <AttendanceButton label={"Request Haf-day Leave"} />
              </div>
            </div>

            <div className="box-border flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <div className="bg-white border border-[#E4E4E4] box-border p-5 rounded-[15px] flex flex-col justify-between">
                  <div className="box-border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-[#0097B2] h-6 w-6"
                    >
                      <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z"></path>
                    </svg>
                    <span className="font-medium text-[14px] text-[#0097B2]">
                      Out of office
                    </span>
                  </div>

                  <div className="box-border flex flex-row justify-between items-center mt-1">
                    <div className="box-border flex-1">
                      <p className="text-[#363636] text-center text-3xl font-bold">
                        4
                      </p>

                      <p className="text-[10px] text-[#8B8B8B] text-center">
                        Today
                      </p>
                    </div>

                    <div className="divider divider-horizontal mt-5 mx-5" />

                    <div className="box-border flex-1">
                      <p className="text-[#363636] text-center text-3xl font-bold">
                        10
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
                      className="fill-[#0097B2] w-6 h-6"
                    >
                      <path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path>
                    </svg>
                    <span className="font-medium text-[14px] text-[#0097B2]">
                      Leaves Taken
                    </span>
                  </div>

                  <div className="box-border flex flex-row justify-between items-center mt-1">
                    <div className="box-border flex-1">
                      <p className="text-[#363636] text-center text-3xl font-bold">
                        2
                      </p>
                      <p className="text-[10px] text-[#8B8B8B] text-center">
                        Paid
                      </p>
                    </div>

                    <div className="divider divider-horizontal mt-5 mx-5" />

                    <div className="box-border flex-1">
                      <p className="text-[#363636] text-center text-3xl font-bold">
                        1
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
                      className="fill-[#0097B2] w-6 h-6"
                    >
                      <path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path>
                    </svg>
                    <span className="font-medium text-[14px] text-[#0097B2]">
                      Leaves Request (YTD)
                    </span>
                  </div>

                  <div className="box-border flex flex-row justify-between items-center mt-1">
                    <div className="box-border flex-1">
                      <p className="text-[10px] text-[#8B8B8B] text-center">
                        Approved
                      </p>
                      <p className="text-[#363636] text-center text-2xl font-bold">
                        2
                      </p>
                    </div>

                    <div className="divider divider-horizontal mt-5 mx-5" />

                    <div className="box-border flex-1">
                      <p className="text-[10px] text-[#8B8B8B] text-center">
                        Pending
                      </p>
                      <p className="text-[#363636] text-center text-2xl font-bold">
                        1
                      </p>
                    </div>

                    <div className="divider divider-horizontal mt-5 mx-5" />

                    <div className="box-border flex-1">
                      <p className="text-[10px] text-[#8B8B8B] text-center">
                        Declined
                      </p>
                      <p className="text-[#363636] text-center text-2xl font-bold">
                        1
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box-border mt-5">
                <div className="box-border flex flex-row justify-between items-center mx-3">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientAttendance;
