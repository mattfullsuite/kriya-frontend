import DataTable from "react-data-table-component";
import Headings from "./Headings";
import Subheadings from "./Subheadings";
import moment from "moment";
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

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Employees Present",
        data: [35, 34, 56, 50, 30, 45, 50],
        backgroundColor: "rgba(125, 218, 116, 0.5)",
      },
      {
        label: "Employees OOO",
        data: [3, 5, 7, 8, 2, 5, 2],
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
    labels: ["January", "Febraury", "March", " April", "May", "June", "July"],
    datasets: [
      {
        label: "Absences",
        data: [3, 6, 8, 8, 4, 5, 6],
        backgroundColor: "rgba(0, 128, 128, 0.5)",
        borderColor: "rgba(0, 128, 128, 1)",
        borderWidth: 1,
      },
    ],
  };

  //data table metadata
  const reqColumns = [
    {
      name: "Requester",
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
    },

    {
      name: "Leave Type",
      selector: (row) => (
        <span className="text-[#363636] text-[12.5px]">{row.leave_type}</span>
      ),
    },

    {
      name: "Leave Date(s)",
      selector: (row) =>
        row.leave_from === row.leave_to ? (
          <span className="text-[#363636] text-[12.5px]">
            {moment(row.leave_from).format("MMMM DD, YYYY")}
          </span>
        ) : (
          <span className="text-[#363636] text-[12.5px]">
            {moment(row.leave_from).format("MMMM DD, YYYY") +
              "  to  " +
              moment(row.leave_to).format("MMMM DD, YYYY")}
          </span>
        ),
      sortable: true,
    },

    {
      name: "Action",
      selector: (row) => (
        <div className="flex flex-row justify-center flex-wrap gap-1">
          <button className="btn btn-ghost-active btn-xs normal-case">
            Details
          </button>
        </div>
      ),
      width: "100px",
    },
  ];

  const ptoData = [
    {
      f_name: "Marvin",
      s_name: "Bautista",
      emp_pic: "",
      position_name: "Software Engineer",
      leave_type: "Sick Leave",
      leave_from: "2024/03/06",
      leave_to: "2024/03/06",
    },

    {
      f_name: "Marvin",
      s_name: "Bautista",
      emp_pic: "",
      position_name: "Software Engineer",
      leave_type: "Sick Leave",
      leave_from: "2024/03/06",
      leave_to: "2024/03/06",
    },

    {
      f_name: "Marvin",
      s_name: "Bautista",
      emp_pic: "",
      position_name: "Software Engineer",
      leave_type: "Sick Leave",
      leave_from: "2024/03/06",
      leave_to: "2024/03/06",
    },

    {
      f_name: "Marvin",
      s_name: "Bautista",
      emp_pic: "",
      position_name: "Software Engineer",
      leave_type: "Sick Leave",
      leave_from: "2024/03/06",
      leave_to: "2024/03/06",
    },
  ];

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
      selector: (row) => <span>{row.pto_bal + " days"}</span>,
      width: "220px",
    },

    {
      name: "Leaves Taken",
      selector: (row) => (
        <span>{row.approved + row.pending + row.declined + " days"}</span>
      ),
    },

    {
      name: "Leaves Taken",
      selector: (row) => (
        <>
          <div className="box-border flex flex-row flex-nowrap gap-8">
            <div>
              <p className="text-[#50C878] text-[18px]">
                {row.approved} <span className="text-[12px]"> days</span>
              </p>
              <p className="text-center text-[10px] mt-1 text-[#8b8b8b] font-medium">
                Approved
              </p>
            </div>

            <div>
              <p className="text-[#FFC700] text-[18px] text-center">
                {row.pending} <span className="text-[12px]"> days</span>
              </p>
              <p className="text-center text-[10px] mt-1 text-[#8b8b8b] font-medium">
                Pending
              </p>
            </div>

            <div>
              <p className="text-[#CC5500] text-[18px]">
                {row.declined} <span className="text-[12px]"> days</span>
              </p>
              <p className="text-center text-[10px] mt-1 text-[#8b8b8b] font-medium">
                Declined
              </p>
            </div>
          </div>
        </>
      ),
    },

    {
      name: "Insights",
      selector: (row) => (<span className="text-[12.5px] text-[#363636]">{row.insights}</span>)
    },
  ];

  const attendanceData = [
    {
      emp_pic: "",
      f_name: "Marvin",
      s_name: "Bautista",
      position_name: "Software Engineer",
      pto_bal: 5.0,
      approved: 3,
      pending: 2,
      declined: 0,
      insights: "--",
    },

    {
      emp_pic: "",
      f_name: "Marvin",
      s_name: "Bautista",
      position_name: "Software Engineer",
      pto_bal: 5.0,
      approved: 3,
      pending: 2,
      declined: 0,
      insights: "--",
    },

    {
      emp_pic: "",
      f_name: "Marvin",
      s_name: "Bautista",
      position_name: "Software Engineer",
      pto_bal: 5.0,
      approved: 3,
      pending: 2,
      declined: 0,
      insights: "--",
    },

    {
      emp_pic: "",
      f_name: "Marvin",
      s_name: "Bautista",
      position_name: "Software Engineer",
      pto_bal: 5.0,
      approved: 3,
      pending: 2,
      declined: 0,
      insights: "--",
    },

    {
      emp_pic: "",
      f_name: "Marvin",
      s_name: "Bautista",
      position_name: "Software Engineer",
      pto_bal: 5.0,
      approved: 3,
      pending: 2,
      declined: 0,
      insights: "--",
    },
  ];

  return (
    <>
      <div className="max-w-[1300px] m-auto">
        <Headings text={"Team PTO & Attendance"} />

        <div className="box-border mt-10 mb-3">
          <Subheadings text={"Attendance KPIs"} />
        </div>

        <div className="box-border flex flex-col md:flex-row gap-3 md:min-h-[400px]">
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
                <span className="text-[11px] text-[#8b8b8b]">
                  Employees OOO
                </span>
              </div>
            </div>
          </div>

          <div className="box-border flex-1 md:w-[50%] flex flex-col md:flex-row gap-3 h-[400px]">
            <div className="box-border flex-1 md:w-[50%] bg-white border border-[#E4E4E4] p-5 rounded-[15px] overflow-y-auto">
              <p className=" font-bold text-[#008080] text-[14px] text-left pb-5">
                Employees OOO Today
              </p>

              <div className="flex flex-col justify-start gap-2">
                <div className="box-border flex flex-row justify-between items-center bg-[#F4F4F4] rounded-[8px] p-2 gap-2">
                  <div className="w-[35px] h-[35px] rounded-full bg-[#008080]"></div>

                  <div className="flex-1 flex flex-col justify-start">
                    <p className="text-[#363636] text-[12px] line-clamp-2 font-medium">
                      Marvin Bautista
                    </p>
                    <p className="text-[#8B8B8B] text-[10px] line-clamp-2">
                      July 20, 2024 - July 27, 2024
                    </p>
                  </div>
                </div>

                <div className="box-border flex flex-row justify-between items-center bg-[#F4F4F4] rounded-[8px] p-2 gap-2">
                  <div className="w-[35px] h-[35px] rounded-full bg-[#008080]"></div>

                  <div className="flex-1 flex flex-col justify-start">
                    <p className="text-[#363636] text-[12px] line-clamp-2 font-medium">
                      Marvin Bautista
                    </p>
                    <p className="text-[#8B8B8B] text-[10px] line-clamp-2">
                      July 20, 2024 - July 27, 2024
                    </p>
                  </div>
                </div>

                <div className="box-border flex flex-row justify-between items-center bg-[#F4F4F4] rounded-[8px] p-2 gap-2">
                  <div className="w-[35px] h-[35px] rounded-full bg-[#008080]"></div>

                  <div className="flex-1 flex flex-col justify-start">
                    <p className="text-[#363636] text-[12px] line-clamp-2 font-medium">
                      Marvin Bautista
                    </p>
                    <p className="text-[#8B8B8B] text-[10px] line-clamp-2">
                      July 20, 2024 - July 27, 2024
                    </p>
                  </div>
                </div>
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

                <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal float-right mb-3">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Anually</option>
                </select>

                <Radar data={radarData} options={radarOptions} />
              </p>
            </div>
          </div>
        </div>

        <div className="box-border flex flex-row justify-between items-center mt-10 mb-3 w-full">
          <Subheadings text={"Leave Requests"} />

          <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] mr-5">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Anually</option>
          </select>
        </div>

        <div className="box-border bg-white p-5 border border-[#E4E4E4] rounded-[15px] w-full overflow-x-auto">
          <DataTable
            columns={reqColumns}
            data={ptoData}
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
      </div>
    </>
  );
};

export default TeamPTOAndAttendance;
