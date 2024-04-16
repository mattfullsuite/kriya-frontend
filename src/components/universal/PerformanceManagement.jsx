import Headings from "./Headings";
import Subheadings from "./Subheadings";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const SeeAllBtn = ({ clickFunction }) => {
  return (
    <button
      onClick={clickFunction}
      className="flex flex-row justify-center items-center"
    >
      <span className="text-[13px] text-[#008080] font-medium">See all</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="fill-[#008080] w-6 h-6"
      >
        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
      </svg>
    </button>
  );
};

const PerformanceManagement = ({ color }) => {
  const data = {
    labels: ["Backlogs", "In progress", "Completed"],
    datasets: [
      {
        data: [9, 20, 29],
        backgroundColor: ["#FF5353", "#F6C514", "#3EAA43"],
        borderRadius: [10, 10, 10],
      },
    ],
  };

  const options = {
    circumference: 180,
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: 20,
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = "bold 40px sans-serif";
      ctx.fillStyle = "#363636";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        data.datasets[0].data[0] +
          data.datasets[0].data[1] +
          data.datasets[0].data[2],
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  return (
    <>
      <div className="box-border max-w-[1300px] m-auto">
        <Headings text={"Performance Management"} />

        <div className="box-border flex flex-row justify-between mt-10 gap-5">
          <div className="flex-1 box-border bg-white border border-[#e4e4e4] rounded-[15px] overflow-auto h-[370px]">
            <div className="flex flex-row justify-between items-center h-14 px-3 border-b border-[#e4e4e4]">
              <Subheadings text="Team Member Goals" />

              <div className="box-border flex flex-row justify-beteween items-cenyter gap-2">
                <button className="outline-none text-[14px] rounded-[8px] text-white bg-[#008080] px-3">
                  Add New Goal
                </button>

                <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Anually</option>
                </select>
              </div>
            </div>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-[#8b8b8b] font-medium">Goals</th>
                  <th className="text-[#8b8b8b] font-medium">Assignee</th>
                  <th className="text-[#8b8b8b] font-medium">Due Date</th>
                  <th className="text-[#8b8b8b] font-medium">Status</th>
                  <th className="text-[#8b8b8b] font-medium">Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="flex flex-row justify-start items-center gap-2">
                    <span className="text-[12px] text-[#363636]">
                      System maintenance
                    </span>

                    <div className="box-border flex flex-row justify-center items-center gap-1">
                      <span className="text-[12px] text-[#8b8b8b]">3</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#DCDCDC] w-4 h-4"
                      >
                        <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z"></path>
                      </svg>
                    </div>

                    <div className="box-border flex flex-row justify-center items-center gap-1">
                      <span className="text-[12px] text-[#8b8b8b]">3</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#DCDCDC] w-4 h-4"
                      >
                        <path d="M17.004 5H9c-1.838 0-3.586.737-4.924 2.076C2.737 8.415 2 10.163 2 12c0 1.838.737 3.586 2.076 4.924C5.414 18.263 7.162 19 9 19h8v-2H9c-1.303 0-2.55-.529-3.51-1.49C4.529 14.55 4 13.303 4 12c0-1.302.529-2.549 1.49-3.51C6.45 7.529 7.697 7 9 7h8V6l.001 1h.003c.79 0 1.539.314 2.109.886.571.571.886 1.322.887 2.116a2.966 2.966 0 0 1-.884 2.11A2.988 2.988 0 0 1 17 13H9a.99.99 0 0 1-.698-.3A.991.991 0 0 1 8 12c0-.252.11-.507.301-.698A.987.987 0 0 1 9 11h8V9H9c-.79 0-1.541.315-2.114.889C6.314 10.461 6 11.211 6 12s.314 1.54.888 2.114A2.974 2.974 0 0 0 9 15h8.001a4.97 4.97 0 0 0 3.528-1.473 4.967 4.967 0 0 0-.001-7.055A4.95 4.95 0 0 0 17.004 5z"></path>
                      </svg>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500" />

                      <div className="box-border flex flex-col justify-start">
                        <span className="text-[13px] font-medium text-[#363636]">
                          Marvin Bautista
                        </span>
                        <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                          Software Engineer
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="text-[12px] text-[#363636]">April 01, 2024</td>

                  <td>
                    <select className="text-[12px] px-[3px] py-[5px] bg-[#FFCD6B] text-[#CC4C00] font-medium rounded-[8px] outline-none">
                      <option>In Progress</option>
                    </select>
                  </td>

                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-[#8b8b8b] w-6 h-6"
                    >
                      <path d="M19 4H6V2H4v18H3v2h4v-2H6v-5h13a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 9H6V6h12v7z"></path>
                    </svg>
                  </td>
                </tr>

                <tr>
                  <td className="flex flex-row justify-start items-center gap-2">
                    <span className="text-[12px] text-[#363636]">
                      Integrate revamp on site
                    </span>

                    <div className="box-border flex flex-row justify-center items-center gap-1">
                      <span className="text-[12px] text-[#8b8b8b]">1</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#DCDCDC] w-4 h-4"
                      >
                        <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z"></path>
                      </svg>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500" />

                      <div className="box-border flex flex-col justify-start">
                        <span className="text-[13px] font-medium text-[#363636]">
                          Matt Salvador
                        </span>
                        <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                          Software Engineer
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="text-[12px] text-[#363636]">April 21, 2024</td>

                  <td>
                    <select className="text-[12px] px-[3px] py-[5px] bg-[#7DDA74] text-[#36814F] font-medium rounded-[8px] outline-none">
                      <option>Done</option>
                    </select>
                  </td>

                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-[#CC5500] w-6 h-6"
                    >
                      <path d="M19 4H6V2H4v18H3v2h4v-2H6v-5h13a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"></path>
                    </svg>
                  </td>
                </tr>

                <tr>
                  <td className="flex flex-row justify-start items-center gap-2">
                    <span className="text-[12px] text-[#363636]">
                      Modify Wireframes
                    </span>

                    <div className="box-border flex flex-row justify-center items-center gap-1">
                      <span className="text-[12px] text-[#8b8b8b]">3</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#DCDCDC] w-4 h-4"
                      >
                        <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z"></path>
                      </svg>
                    </div>

                    <div className="box-border flex flex-row justify-center items-center gap-1">
                      <span className="text-[12px] text-[#8b8b8b]">3</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#DCDCDC] w-4 h-4"
                      >
                        <path d="M17.004 5H9c-1.838 0-3.586.737-4.924 2.076C2.737 8.415 2 10.163 2 12c0 1.838.737 3.586 2.076 4.924C5.414 18.263 7.162 19 9 19h8v-2H9c-1.303 0-2.55-.529-3.51-1.49C4.529 14.55 4 13.303 4 12c0-1.302.529-2.549 1.49-3.51C6.45 7.529 7.697 7 9 7h8V6l.001 1h.003c.79 0 1.539.314 2.109.886.571.571.886 1.322.887 2.116a2.966 2.966 0 0 1-.884 2.11A2.988 2.988 0 0 1 17 13H9a.99.99 0 0 1-.698-.3A.991.991 0 0 1 8 12c0-.252.11-.507.301-.698A.987.987 0 0 1 9 11h8V9H9c-.79 0-1.541.315-2.114.889C6.314 10.461 6 11.211 6 12s.314 1.54.888 2.114A2.974 2.974 0 0 0 9 15h8.001a4.97 4.97 0 0 0 3.528-1.473 4.967 4.967 0 0 0-.001-7.055A4.95 4.95 0 0 0 17.004 5z"></path>
                      </svg>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500" />

                      <div className="box-border flex flex-col justify-start">
                        <span className="text-[13px] font-medium text-[#363636]">
                          Ian Paul Garcia
                        </span>
                        <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                          Software Engineer
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="text-[12px] text-[#363636]">April 01, 2024</td>

                  <td>
                    <select className="text-[12px] px-[3px] py-[5px] bg-[#FFCD6B] text-[#CC4C00] font-medium rounded-[8px] outline-none">
                      <option>In Progress</option>
                    </select>
                  </td>

                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-[#8b8b8b] w-6 h-6"
                    >
                      <path d="M19 4H6V2H4v18H3v2h4v-2H6v-5h13a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 9H6V6h12v7z"></path>
                    </svg>
                  </td>
                </tr>

                <tr>
                  <td className="flex flex-row justify-start items-center gap-2">
                    <span className="text-[12px] text-[#363636]">
                      System maintenance
                    </span>

                    <div className="box-border flex flex-row justify-center items-center gap-1">
                      <span className="text-[12px] text-[#8b8b8b]">3</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#DCDCDC] w-4 h-4"
                      >
                        <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z"></path>
                      </svg>
                    </div>

                    <div className="box-border flex flex-row justify-center items-center gap-1">
                      <span className="text-[12px] text-[#8b8b8b]">3</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#DCDCDC] w-4 h-4"
                      >
                        <path d="M17.004 5H9c-1.838 0-3.586.737-4.924 2.076C2.737 8.415 2 10.163 2 12c0 1.838.737 3.586 2.076 4.924C5.414 18.263 7.162 19 9 19h8v-2H9c-1.303 0-2.55-.529-3.51-1.49C4.529 14.55 4 13.303 4 12c0-1.302.529-2.549 1.49-3.51C6.45 7.529 7.697 7 9 7h8V6l.001 1h.003c.79 0 1.539.314 2.109.886.571.571.886 1.322.887 2.116a2.966 2.966 0 0 1-.884 2.11A2.988 2.988 0 0 1 17 13H9a.99.99 0 0 1-.698-.3A.991.991 0 0 1 8 12c0-.252.11-.507.301-.698A.987.987 0 0 1 9 11h8V9H9c-.79 0-1.541.315-2.114.889C6.314 10.461 6 11.211 6 12s.314 1.54.888 2.114A2.974 2.974 0 0 0 9 15h8.001a4.97 4.97 0 0 0 3.528-1.473 4.967 4.967 0 0 0-.001-7.055A4.95 4.95 0 0 0 17.004 5z"></path>
                      </svg>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500" />

                      <div className="box-border flex flex-col justify-start">
                        <span className="text-[13px] font-medium text-[#363636]">
                          Antoinette Sanchez
                        </span>
                        <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                          Software Engineer
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="text-[12px] text-[#363636]">April 01, 2024</td>

                  <td>
                    <select className="text-[12px] px-[3px] py-[5px] bg-[#FFCD6B] text-[#CC4C00] font-medium rounded-[8px] outline-none">
                      <option>In Progress</option>
                    </select>
                  </td>

                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-[#8b8b8b] w-6 h-6"
                    >
                      <path d="M19 4H6V2H4v18H3v2h4v-2H6v-5h13a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 9H6V6h12v7z"></path>
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-80 box-border bg-white border border-[#e4e4e4] rounded-[15px] h-[370px] overflow-hidden">
            <div className="box-border flex-1 flex flex-row justify-between items-center mb-3 p-5 border-b border-[#e4e4e4]">
              <Subheadings text="Tasks Statistics" />
            </div>

            <select className="outline-none border border-[#E4E4E4] rounded-[5px] px-[2px] py-[3px] text-[13px] mx-5">
              <option>This week</option>
              <option>Monthly</option>
            </select>

            <div className="flex flex-row justify-between items-center px-5">
              <div className="box-border flex flex-col justify-start gap-2">
                <div className="box-border flex flex-row justify-start items-center gap-1">
                  <div className="box-border w-3 h-3 bg-[#FF5353] rounded-full" />

                  <span className="text-[12px] text-[#363636]">Backlogs</span>
                </div>

                <div className="box-border flex flex-row justify-start items-center gap-1">
                  <div className="box-border w-3 h-3 bg-[#F6C514] rounded-full" />

                  <span className="text-[12px] text-[#363636]">Ongoing</span>
                </div>

                <div className="box-border flex flex-row justify-start items-center gap-1">
                  <div className="box-border w-3 h-3 bg-[#3EAA43] rounded-full" />

                  <span className="text-[12px] text-[#363636]">Completed</span>
                </div>
              </div>

              <Doughnut data={data} options={options} plugins={[textCenter]} />
            </div>
          </div>
        </div>

        <div className="box-border flex flex-row justify-between mt-10 gap-5">
          <div className="box-border flex-1 bg-white border border-[#e4e4e4] rounded-[15px] h-[350px] flex flex-col justify-start overflow-hidden">
            <div className="flex flex-row justify-between items-center h-14 px-3 border-b border-[#e4e4e4]">
              <Subheadings text="Team Members Performance KPIs" />

              <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Anually</option>
              </select>
            </div>

            <div className="overflow-y-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-[#8b8b8b] font-medium">Team Members</th>
                    <th className="text-[#8b8b8b] font-medium">KPI 1</th>
                    <th className="text-[#8b8b8b] font-medium">KPI 2</th>
                    <th className="text-[#8b8b8b] font-medium">KPI 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Marvin Bautista
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      90%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      88%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      90%
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Antoinette Sanchez
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      92%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      93%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      92%
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Matt Wilfred Salvador
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      97%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      90%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      97%
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Ian Paul Garcia
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      90%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      90%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      92%
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Benjie Pecson
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      91%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      92%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      93%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-80 box-border bg-white border border-[#e4e4e4] rounded-[15px] overflow-auto flex flex-col justify-between gap-2 h-[350px]">
            <div className="flex flex-row justify-between items-center h-14 px-3 border-b border-[#e4e4e4]">
              <Subheadings text="Average Performance KPIs" />

              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-[#a6a6a6]"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </button>
            </div>

            <div className="box-border flex-1 p-3 flex flex-col justify-between">
              <div className="box-border">
                <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Anually</option>
                </select>
              </div>

              <div className="box-border flex-1 flex flex-col justify-center gap-7">
                <div className="box-border">
                  <div className="box-border flex flex-row flex-nowrap justify-between items-center">
                    <span className="text-[12px] font-semibold text-[#363636]">
                      KPI 1
                    </span>

                    <spa className="text-[#363636] font-semibold text-[18px]">
                      85%
                    </spa>
                  </div>

                  <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
                    <div className="box-border h-full w-[85%] rounded-full bg-[#008080]" />
                  </div>
                </div>

                <div className="box-border">
                  <div className="box-border flex flex-row flex-nowrap justify-between items-center">
                    <span className="text-[12px] font-semibold text-[#363636]">
                      KPI 2
                    </span>

                    <spa className="text-[#363636] font-semibold text-[18px]">
                      89%
                    </spa>
                  </div>

                  <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
                    <div className="box-border h-full w-[89%] rounded-full bg-[#008080]" />
                  </div>
                </div>

                <div className="box-border">
                  <div className="box-border flex flex-row flex-nowrap justify-between items-center">
                    <span className="text-[12px] font-semibold text-[#363636]">
                      KPI 3
                    </span>

                    <spa className="text-[#363636] font-semibold text-[18px]">
                      91%
                    </spa>
                  </div>

                  <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
                    <div className="box-border h-full w-[91%] rounded-full bg-[#008080]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box-border flex flex-row justify-between mt-10 gap-5">
          <div className="flex-1 box-border bg-white border border-[#e4e4e4] flex flex-col justify-between rounded-[15px] h-[400px] overflow-hidden">
            <div className="flex flex-row justify-between items-center px-3 h-14 bg-white border-b border-[#e4e4e4]">
              <Subheadings text="Team Members Self-Checkin" />

              <div className="box-border flex flex-row justify-beteween items-cenyter gap-2">
                <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Anually</option>
                </select>

                <SeeAllBtn />
              </div>
            </div>

            <div className="box-border flex-1 overflow-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-[#8b8b8b] font-medium">Team Members</th>
                    <th className="text-[#8b8b8b] font-medium">Date</th>
                    <th className="text-[#8b8b8b] font-medium">Average</th>
                    <th className="text-[#8b8b8b] font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Adrian Mallari
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 20, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.79</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Marvin Bautista
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 22, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.57</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Ian Paul Garcia
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 22, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.45</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Michael Artiaga
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 23, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.31</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Michael Artiaga
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 23, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.31</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Michael Artiaga
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 23, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.31</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Michael Artiaga
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 23, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.31</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-80 box-border flex flex-col justify-between bg-white border border-[#e4e4e4] rounded-[15px] h-[400px]">
            <div className="box-border flex flex-row justify-between items-center h-14 px-3 border-b border-[#e4e4e4]">
              <Subheadings text="Performance Review" />

              <SeeAllBtn />
            </div>

            <div className="box-border flex-1 flex flex-col justify-start gap-2 p-3 overflow-y-auto">
              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>
            </div>

            <div className="box-border p-3 border-t border-[#E4E4E4]">
              <button className="text-[12px] text-[#363636] bg-white w-full py-3 rounded-[10px] border border-[#E4E4E4]">
                Schedule Performance Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerformanceManagement;
