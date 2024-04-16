import DataTable from "react-data-table-component";
import Headings from "./Headings";
import Subheadings from "./Subheadings";
import moment from "moment";
import Axios from "axios";
import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const TeamPTOAndAttendance = ({ color }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [records, setRecords] = useState(1);

  const [departmentLeavesToday, setDepartmentLeavesToday] = useState([]);
  const [pastFiveMonths, setPastFiveMonths] = useState([]);
  const [pastFourMonths, setPastFourMonths] = useState([]);
  const [pastThreeMonths, setPastThreeMonths] = useState([]);
  const [pastTwoMonths, setPastTwoMonths] = useState([]);
  const [pastMonth, setPastMonth] = useState([]);
  const [currentMonth, setCurrentMonth] = useState([]);

  const [currentWeek, setCurrentWeek] = useState([]);
  const [pastWeek, setPastWeek] = useState([]);
  const [pastTwoWeeks, setPastTwoWeeks] = useState([]);
  const [pastThreeWeeks, setPastThreeWeeks] = useState([]);

  //const [leaves, setLeaves] = useState([])
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [exceptPending, setExceptPending] = useState([])

  //attendance
  const [attendanceData, setAttendanceData] = useState([])

  useEffect(() => {
    const fetchAllAnnouncements = async ()=> {
        try{
            const res = await Axios.get(BASE_URL + "/mt-getDepartmentLeavesToday");
            setDepartmentLeavesToday(res.data);

            //monthly
            const past_five_months_res = await Axios.get(BASE_URL + "/mt-getDepartmentLeavesPastFiveMonths");
            const past_four_months_res = await Axios.get(BASE_URL + "/mt-getDepartmentLeavesPastFourMonths");
            const past_three_months_res = await Axios.get(BASE_URL + "/mt-getDepartmentLeavesPastThreeMonths");
            const past_two_months_res = await Axios.get(BASE_URL + "/mt-getDepartmentLeavesPastTwoMonths");
            const past_month_res = await Axios.get(BASE_URL + "/mt-getDepartmentLeavesPastMonth");
            const current_res = await Axios.get(BASE_URL + "/mt-getDepartmentLeavesCurrent");
            setPastFiveMonths(past_five_months_res.data);
            setPastFourMonths(past_four_months_res.data);
            setPastThreeMonths(past_three_months_res.data);
            setPastTwoMonths(past_two_months_res.data);
            setPastMonth(past_month_res.data);
            setCurrentMonth(current_res.data);

            //weekly
            const current_week_res = await Axios.get(BASE_URL + "/mt-getDepartmentLeavesCurrentWeek");
            const past_week_res = await Axios.get(BASE_URL + "/mt-getDepartmentLeavesPastWeek");
            const past_two_weeks_res = await Axios.get(BASE_URL + "/mt-getDepartmentLeavesPastTwoWeeks");
            const past_three_weeks_res = await Axios.get(BASE_URL + "/mt-getDepartmentLeavesPastThreeWeeks");
            setCurrentWeek(current_week_res.data);
            setPastWeek(past_week_res.data);
            setPastTwoWeeks(past_two_weeks_res.data);
            setPastThreeWeeks(past_three_weeks_res.data);

            //pendingLeaves
            const pending_leaves_res = await Axios.get(BASE_URL + "/showpendingdepartmentleaveslimited");
            const except_pending_leaves_res = await Axios.get(BASE_URL + "/mt-getAllDepartmentLeaves");
            //const pending_on_top_res = await Axios.get(BASE_URL + "/mt-getAllDepartmentLeavesWithPendingOnTop");
            setPendingLeaves(pending_leaves_res.data);
            //setExceptPending(except_pending_leaves_res.data);
            //setLeaves(pending_on_top_res.data);

            //attendance
            const my_team_leaves_summary_res = await Axios.get(BASE_URL + "/mt-getAllDepartmentLeavesOfTeam");
            setAttendanceData(my_team_leaves_summary_res.data);

        } catch(err){
            console.log(err)
        }
      }
      fetchAllAnnouncements()
  },[])

  // bar metadata
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  var dataIntervals =  
      (records === 0 ) ? 
        [ 1, 2, 3, 4, 5 ] :
      (records === 1) ?
        [
          pastFiveMonths.length,
          pastFourMonths.length,
          pastThreeMonths.length,
          pastTwoMonths.length,
          pastMonth.length,
          currentMonth.length 
        ] : (records === 2) ?
        [
          currentWeek.length,
          pastWeek.length, 
          pastTwoWeeks.length, 
          pastThreeWeeks.length,  
        ] : (records === 3) ?
        [
          "Year 1",
          "Year 2",
        ] 
      : null
 
  var labels = 
      (records === 0 ) ? 
        [ 1, 2, 3, 4, 5 ] :
      (records === 1) ?
        [
          moment().subtract(6, "Months").format("MMM YYYY"),
          moment().subtract(5, "Months").format("MMM YYYY"),
          moment().subtract(4, "Months").format("MMM YYYY"),
          moment().subtract(3, "Months").format("MMM YYYY"),
          moment().subtract(2, "Months").format("MMM YYYY"),
          moment().subtract(1, "Months").format("MMM YYYY"),
          moment().format("MMM YYYY")
        ] 
      : (records === 2) ?
        [
          "Week 4", 
          "Week 3",
          "Week 2",
          "Week 1"
        ] 
      : (records === 3) ?
        [
          "Year 1",
          "Year 2",
        ] 
      : null

  function handleChange(val) {
    if (val === "Monthly") {
      setRecords(1);
    } else if (val === "Weekly") {
      setRecords(2);
    } else if (val === "Annually") {
      setRecords(3);
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Employees Present",
        data: dataIntervals,
        backgroundColor: "rgba(125, 218, 116, 0.5)",
      },
      {
        label: "Employees OOO",
        data: dataIntervals,
        backgroundColor: "rgba(255, 151, 77, 1)",
      },
    ],
  };

  // radar metadata
  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const radarData = {
    labels,
    datasets: [
      {
        label: "Absences",
        data: dataIntervals,
        backgroundColor: "rgba(0, 128, 128, 0.5)",
        borderColor: "rgba(0, 128, 128, 1)",
        borderWidth: 1,
      },
    ],
  };

  //data table metadata
  // const reqColumns = [
  //   {
  //     name: "Requester",
  //     selector: (row) => (
  //       <>
  //         <div className="box-border flex flex-row flex-now flex-nowrap justify-start items-center gap-2">
  //           {row.emp_pic === null || row.emp_pic === "" ? (
  //             <div className="w-10 h-10 bg-[#008080] rounded-full flex justify-center items-center my-2">
  //               <span className="font-bold text-white text-[15px]">
  //                 {row.f_name.charAt(0) + row.s_name.charAt(0)}
  //               </span>
  //             </div>
  //           ) : (
  //             <img src={row.emp_pic} className="w-10 h-10 object-cover" />
  //           )}

  //           <div className="box-border">
  //             <p className="text-[12.5px] text-[#363636] font-medium">
  //               {row.f_name + " " + row.s_name}
  //             </p>
  //             <p className="text-[10px] text-[#8b8b8b] font-normal">
  //               {row.position_name}
  //             </p>
  //           </div>
  //         </div>
  //       </>
  //     ),
  //   },

  //   {
  //     name: "Leave Type",
  //     selector: (row) => (
  //       <span className="text-[#363636] text-[12.5px]">{row.leave_type}</span>
  //     ),
  //   },

  //   {
  //     name: "Leave Date(s)",
  //     selector: (row) =>
  //       row.leave_from === row.leave_to ? (
  //         <span className="text-[#363636] text-[12.5px]">
  //           {moment(row.leave_from).format("MMMM DD, YYYY")}
  //         </span>
  //       ) : (
  //         <span className="text-[#363636] text-[12.5px]">
  //           {moment(row.leave_from).format("MMMM DD, YYYY") +
  //             "  to  " +
  //             moment(row.leave_to).format("MMMM DD, YYYY")}
  //         </span>
  //       ),
  //     sortable: true,
  //   },

  //   {
  //     name: "Action",
  //     selector: (row) => (
  //       <div className="flex flex-row justify-center flex-wrap gap-1">
  //         <button className="btn btn-ghost-active btn-xs normal-case">
  //           Details
  //         </button>
  //       </div>
  //     ),
  //     width: "100px",
  //   },
  // ];

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

  const handleApproval = async (leave_id) => {
    await Axios.post(BASE_URL + "/approveleave/" + leave_id)
      .then(() => {
        console.log("clicked");
      })
      .catch((e) => {
        console.log(e);
      })

    setPendingLeaves((current) => current.filter((leaves) => leaves.leave_id !== leave_id))
  };

  const handleRejection = async (leave_id) => {
    await Axios.post(BASE_URL + "/rejectleave/" + leave_id)
      .then(() => {
        setPendingLeaves((current) => current.filter((leaves) => leaves.leave_id !== leave_id))
      })
      .catch((e) => {
        console.log(e);
      });

    await Axios.post(BASE_URL + "/returnTempPTO/" + leave_id)
      .catch((e) => {
      });
  };

  const handleEscalate = async (leave_id) => {
    console.log("clicked");
    await Axios.post(BASE_URL + "/escalateleave/" + leave_id)
      .then(() => {
        console.log("clicked");
      })
      .catch((e) => {
        console.log(e);
      })

    setPendingLeaves((current) => current.filter((leaves) => leaves.leave_id !== leave_id))
  };

  const columns = [
    {
      name: "Date filed",
      selector: (row) => moment(row.date_filed).format("MMMM DD, YYYY"),
      sortable: true,
    },

    {
      name: "Name",
      selector: (row) => row.s_name + ", " + row.f_name + " " + row.m_name,
    },

    {
      name: "PTO type",
      selector: (row) => row.leave_type,
    },

    {
      name: "Date(s)",
      selector: (row) =>
        row.leave_from === row.leave_to
          ? moment(row.leave_from).format("MMMM DD, YYYY")
          : moment(row.leave_from).format("MMMM DD, YYYY") +
          "  to  " +
          moment(row.leave_to).format("MMMM DD, YYYY"),
    },

    {
      name: "Actions",
      selector: (row) => (
        <div className="flex flex-row justify-center flex-wrap gap-1">
          <button
            className="btn btn-circle btn-xs bg-gray-500 hover:bg-gray-700"
            onClick={() => document.getElementById(row.leave_id).showModal()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>

          </button>

          {/* Modal - Details */}
          <dialog id={row.leave_id} className="modal text-left">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-lg mb-5">PTO Details</h3>

              <div className="flex flex-col justify-center items-center">
                {row.emp_pic == "" || row.emp_pic == null ? (
                  <div className="h-24 w-24 bg-gray-500 rounded-full flex justify-center items-center text-4xl text-white font-medium m-2">
                    {row.f_name.charAt(0) + row.s_name.charAt(0)}
                  </div>
                ) : (
                  <img
                    src={"../uploads/" + row.emp_pic}
                    className="h-24 w-24 rounded-full m-2"
                  />
                )}

                <div className="text-center mb-7">
                  <h3 className="font-bold text-lg text-center">
                    {row.s_name + ", " + row.f_name + " " + row.m_name}
                  </h3>
                  <span>{row.title}</span>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-xl">{row.leave_type}</h3>
                  <h3 className="text-gray-600">
                    {row.leave_from === row.leave_to
                      ? moment(row.leave_from).format("MMM. DD, YYYY")
                      : moment(row.leave_from).format("MMM. DD, YYYY") +
                      "  to  " +
                      moment(row.leave_to).format("MMM. DD, YYYY")}
                  </h3>
                </div>

                <div className="mt-7 flex flex-col items-center gap-2">
                  <h3 className="italic text-gray-600">
                    Filed on {moment(row.date_filed).format("dddd")} •{" "}
                    {moment(row.date_filed).format("MMMM DD, YYYY")}
                  </h3>
                  <div>{checkStatus(row.leave_status)}</div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <h1 className="font-semibold mt-5">Reason:</h1>
                <div className="max-h-44 whitespace-normal">
                  <p className="justify-center text-center">
                    {row.leave_reason == "" || row.leave_reason == null ? (
                      <p className="italic text-gray-600">
                        No reason indicated.
                      </p>
                    ) : (
                      <p>{row.leave_reason}</p>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="btn bg-green-600 text-white hover:bg-green-800 normal-case"
                  onClick={() => handleApproval(row.leave_id)}
                >
                  Approve
                </button>
                <button
                  className="btn bg-yellow-600 text-white hover:bg-yellow-800 normal-case"
                  onClick={() => handleEscalate(row.leave_id)}
                >
                  Escalate
                </button>
                <button
                  className="btn bg-red-600 text-white hover:bg-red-800 normal-case"
                  onClick={() => handleRejection(row.leave_id)}
                >
                  Decline
                </button>

              </div>
            </div>
          </dialog>


          <button className="btn btn-circle btn-xs bg-green-500 hover:bg-green-700" onClick={() => handleApproval(row.leave_id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
          </button>

          <button className="btn btn-circle btn-xs bg-blue-500 hover:bg-blue-700" onClick={() => handleEscalate(row.leave_id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
            </svg>
          </button>

          <button className="btn btn-circle btn-xs bg-red-500 hover:bg-red-700" onClick={() => handleRejection(row.leave_id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>

          </button>
        </div>
      ),
    },
  ];

  // const ptoData = [
  //   {
  //     f_name: "Marvin",
  //     s_name: "Bautista",
  //     emp_pic: "",
  //     position_name: "Software Engineer",
  //     leave_type: "Sick Leave",
  //     leave_from: "2024/03/06",
  //     leave_to: "2024/03/06",
  //   },

  //   {
  //     f_name: "Marvin",
  //     s_name: "Bautista",
  //     emp_pic: "",
  //     position_name: "Software Engineer",
  //     leave_type: "Sick Leave",
  //     leave_from: "2024/03/06",
  //     leave_to: "2024/03/06",
  //   },

  //   {
  //     f_name: "Marvin",
  //     s_name: "Bautista",
  //     emp_pic: "",
  //     position_name: "Software Engineer",
  //     leave_type: "Sick Leave",
  //     leave_from: "2024/03/06",
  //     leave_to: "2024/03/06",
  //   },

  //   {
  //     f_name: "Marvin",
  //     s_name: "Bautista",
  //     emp_pic: "",
  //     position_name: "Software Engineer",
  //     leave_type: "Sick Leave",
  //     leave_from: "2024/03/06",
  //     leave_to: "2024/03/06",
  //   },
  // ];

  const attendanceColumn = [
    {
      name: "Team Members",
      selector: (row) => (
        <>
          <div className="box-border flex flex-row flex-now flex-nowrap justify-start items-center gap-2">
            {row.emp_pic === null || row.emp_pic === "" ? (
              <div className="w-10 h-10 bg-[#008080] rounded-full flex justify-center items-center my-2">
                <span className="font-bold text-white text-[15px]">
                  {row.f_name.charAt(0) + row.s_name.charAt(0)}
                </span>
              </div>
            ) : (
              <img src={row.emp_pic} className="w-10 h-10 object-cover" />
            )}

            <div className="box-border">
              <p className="text-[12.5px] text-[#363636] font-medium">
                {row.f_name + " " + row.s_name}
              </p>
              <p className="text-[10px] text-[#8b8b8b] font-normal">
                {row.position_name}
              </p>
            </div>
          </div>
        </>
      ),
      width: "220px",
    },

    {
      name: "PTO Credit Balance",
      selector: (row) => <span>{row.leave_balance + " days"}</span>,
      
    },

    {
      name: "Leaves Taken",
      selector: (row) => (
        <span>
          { row.pending + row.approved + row.declined + " days"} 
          </span>
      ),
    },

    {
      name: "Insights",
      selector: (row) => (
        <span className="text-red-500">
          { "Following mood log is low"} </span>
      ),
    },

    {
      name: "Leaves Taken",
      selector: (row) => (
        <>
          <div className="box-border flex flex-row flex-nowrap gap-8">
            <div>
              <p className="text-[#50C878] text-[18px]">
                {row.approved} 
                <span className="text-[12px]"> days</span>
              </p>
              <p className="text-center text-[10px] mt-1 text-[#8b8b8b] font-medium">Approved</p>
            </div>

            <div>
              <p className="text-[#FFC700] text-[18px] text-center">
                {row.pending} <span className="text-[12px]"> days</span>
              </p>
              <p className="text-center text-[10px] mt-1 text-[#8b8b8b] font-medium">Pending</p>
            </div>

            <div>
              <p className="text-[#CC5500] text-[18px]">
                {row.declined} <span className="text-[12px]"> days</span>
              </p>
              <p className="text-center text-[10px] mt-1 text-[#8b8b8b] font-medium">Declined</p>
            </div>
          </div>
        </>
      ),
    },
  ];

  // const attendanceData2 = [
  //   {
  //     requester_id: 1,
  //     emp_pic: "",
  //     f_name: "Marvin",
  //     s_name: "Bautista",
  //     position_name: "Software Engineer",
  //     leave_balance: 5.0,
  //     approved: 3,
  //     pending: 2,
  //     declined: 0,
  //   },
  // ];

  return (
    <>
      <Headings text={"Team PTO & Attendance"} />

      <div className="box-border mt-10 mb-3">
        <Subheadings text={"Attendance KPIs"} />
      </div>

      <div className="box-border flex flex-col md:flex-row gap-3 md:min-h-[350px]">
        <div className="box-border flex-1 md:w-[50%] bg-white border p-5 border-[#E4E4E4] rounded-[15px]">
          <div className="flex flex-row justify-between items-center pb-5">
            <p className=" font-bold text-[#008080] text-[14px] text-left">
              Attendance Rate
            </p>

            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-[#a6a6a6]"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
              </svg>
            </button>
          </div>

          <Bar data={data} options={options} />

          <div className="box-border flex flex-row flex-wrap justify-center items-center gap-3 mt-5">
            <div className="border-border flex flex-row flex-nowrap justify-center items-center gap-1">
              <div className="w-7 h-3 bg-[#7DDA74]" />
              <span className="text-[11px] text-[#8b8b8b]">
                Employees Present
              </span>
            </div>

            <div className="border-border flex flex-row flex-nowrap justify-center items-center gap-1">
              <div className="w-7 h-3 bg-[#FF974D]" />
              <span className="text-[11px] text-[#8b8b8b]">Employees OOO</span>
            </div>
          </div>
        </div>

        <div className="box-border flex-1 md:w-[50%] flex flex-col md:flex-row gap-3 h-[390px]">
          <div className="box-border flex-1 md:w-[50%] bg-white border border-[#E4E4E4] p-5 rounded-[15px] overflow-y-auto">
            <p className=" font-bold text-[#008080] text-[14px] text-left pb-5">
              Employees OOO Today
            </p>

            <div className="flex flex-col justify-start gap-2">

            {(departmentLeavesToday.length > 0) ? 

            departmentLeavesToday.map((dlt) => (
              <div className="box-border flex flex-row justify-between items-center bg-[#F4F4F4] rounded-[8px] p-2 gap-2">
                <div className="w-[35px] h-[35px] rounded-full bg-[#008080]"></div>

                <div className="flex-1 flex flex-col justify-start">
                  <p className="text-[#363636] text-[12px] line-clamp-2 font-medium">
                    {dlt.f_name + " " + dlt.s_name}
                  </p>
                  <p className="text-[#8B8B8B] text-[10px] line-clamp-2">
                    { moment(dlt.leave_from).format("MMM DD YYYY") + " to " + moment(dlt.leave_to).format("MMM DD YYYY") }
                  </p>
                </div>
              </div>
            )) : 
              <div className="box-border flex flex-row justify-between items-center bg-[#F4F4F4] rounded-[8px] p-2 gap-2">

                <div className="flex-1 flex flex-col justify-start items-center">
                  <p className="text-[#363636] text-[12px] line-clamp-2 font-medium">
                    No one in your team is Out of Office Today.
                  </p>
                </div>
              </div>
          }

            </div>
          </div>

          <div className="box-border flex-1 md:w-[50%] bg-white border border-[#E4E4E4] p-5 rounded-[15px]">
            <p className=" font-bold text-[#008080] text-[14px] text-left">
              <div className="flex flex-row justify-between items-center pb-5">
                <p className=" font-bold text-[#008080] text-[14px] text-left">
                  Team Absences Rate
                </p>

                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#a6a6a6]"
                  >
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                  </svg>
                </button>
              </div>

              {/* <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal float-right mb-3">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Anually</option>
              </select> */}

              <Radar data={radarData} options={radarOptions} />

              <div className="box-border flex flex-row flex-wrap justify-center items-center gap-3 mt-5">
                <div className="border-border flex flex-row flex-nowrap justify-center items-center gap-1">
                  <div className="w-7 h-3 bg-[#00808080]" />
                  <span className="text-[11px] text-[#8b8b8b] font-normal">
                    Absences
                  </span>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>

      <div className="box-border flex flex-row justify-between items-center mt-10 mb-3 w-full">
        <Subheadings text={"Leave Requests"} />

        <select 
          onChange={ (e) => { handleChange(e.target.value) }}
          className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] mr-5">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Annually</option>
        </select>
      </div>

      <div className="box-border bg-white p-5 border border-[#E4E4E4] rounded-[15px] w-full overflow-x-auto">
        <DataTable
          columns={columns}
          data={pendingLeaves}
          responsive
          highlightOnHover
          pagination
        />
      </div>
  

      <div className="box-border flex flex-row justify-between items-center mt-10 mb-3">
        <Subheadings text={"My Team’s Time Off & Attendance Summary"} />

        <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] mr-5">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Anually</option>
        </select>
      </div>

      <div className="box-border bg-white p-5 border border-[#E4E4E4] rounded-[15px] w-full overflow-x-auto">
        <DataTable
          columns={attendanceColumn}
          data={attendanceData}
          responsive
          highlightOnHover
          pagination
        />
      </div>
    </>
  );
};

export default TeamPTOAndAttendance;
