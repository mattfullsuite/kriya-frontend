import Headings from "./Headings";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Line, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const TeamListTile = ({ notif, employee, content, moment, svg }) => {
  return (
    <>
      <div className="box-border flex flex-row justify-start items-center bg-[#F4F4F4] px-4 py-3 rounded-[8px] w-full gap-4">
        {svg}

        <div className="box-border w-full">
          <div className="box-border flex flex-row justify-between items-center mb-1">
            <span className="text-[#008080] font-bold text-[13px]">
              {notif}
            </span>

            <span className="text-[12px] text-[#8b8b8b]">{moment}</span>
          </div>

          <p className="line-clamp-2 text-[13px] text-[#363636]">
            <span className="font-semibold">{employee}</span> {content}
          </p>
        </div>
      </div>
    </>
  );
};

const InsightsListTile = ({ notif, employee, content, suggestion }) => {
  return (
    <>
      <div className="box-border bg-[#F4F4F4] rounded-[8px]">
        <div className="box-border border-b p-2 border-[#E4E4E4]">
          <span className="text-[#008080] font-bold text-[13px]">{notif}</span>
        </div>

        <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-2 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-[#008080] w-10 h-10"
          >
            <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
          </svg>

          <div className="box-border">
            <p className="text-[#363636] text-[13px]">
              <span className="font-bold">{employee}</span> {content}
            </p>

            <p className="text-[13px] text-[#008080] underline">{suggestion}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const MyTeam = ({ color }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const data = {
    labels,
    datasets: [
      {
        label: "Positive Logs",
        data: [50, 32, 63, 87],
        borderColor: "#50C878",
        backgroundColor: "#50C878",
      },

      {
        label: "Neutral Logs",
        data: [24, 43, 20, 36],
        borderColor: "#FFDB58",
        backgroundColor: "#FFDB58",
      },

      {
        label: "Negative Logs",
        data: [34, 52, 68, 32],
        borderColor: "#CC5500",
        backgroundColor: "#CC5500",
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

  return (
    <>
      <div className="box-border max-w-[1300px] m-auto">
        <Headings text={"My Team"} />

        <div className="box-border mt-10 flex flex-row justify-between items-stretch gap-5">
          <div className="box-border flex-1 rounded-[15px] relative bg-gradient-to-br from-[#FFB800] to-[#FFCD4D] py-5 px-10 flex flex-col justify-between items-start overflow-hidden">
            <div className="box-border flex flex-row flex-nowrap justify-between items-start w-full">
              <p className="font-semibold text-white text-[18px] flex-1">
                Team's Average Mood Rate Current Week 
              </p>

              <select className="outline-none px-2 py-2 text-[#363636] text-[13px] rounded-[8px] border border-[#e4e4e4]">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Anually</option>
              </select>
            </div>

            <p className="text-[60px] font-bold text-white">
              3.5<span className="text-[30px] font-normal F2F2F2">/5.0</span>
            </p>

            <div>
              <p className="text-[#666A40] italic text-[14px]">
                Your Team’s Mood Rate has{" "}
                <span className="font-bold">improved!</span>
              </p>
              <p className="text-[#666A40] italic text-[14px]">
                Team’s Mood Rate Average last week was{" "}
                <span className="text-white font-semibold">3.0/5.0</span>
              </p>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-white w-60 h-60 absolute right-[-50px] bottom-[-45px]"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM8 9c2.201 0 3 1.794 3 3H9c-.012-.45-.194-1-1-1s-.988.55-1 1.012L5 12c0-1.206.799-3 3-3zm4 9c-4 0-5-4-5-4h10s-1 4-5 4zm5-6c-.012-.45-.194-1-1-1s-.988.55-1 1.012L13 12c0-1.206.799-3 3-3s3 1.794 3 3h-2z"></path>
            </svg>
          </div>

          <div className="box-border flex-1 flex flex-row gap-3">
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

        <div className="box-border flex flex-row justify-between gap-5 mt-10">
          <div className="box-border flex-1">
            <div className="box-border flex-1 bg-white rounded-[15px] border border-[#e4e4e4] p-5">
              <div className="box-border flex flex-row justify-between items-start">
                <div className="box-border">
                  <p className="text-[#008080] text-[16px] font-bold">
                    Team Mood Tracker
                  </p>
                  <p className="text-[#B2AC88] font-semibold italic text-[14px]">
                    March
                  </p>
                </div>

                <select className="outline-none px-2 py-2 text-[#363636] text-[13px] rounded-[8px] border border-[#e4e4e4]">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Anually</option>
                </select>
              </div>

              <div className="box-borer flex flex-row justify-between items-center mt-5">
                <p className="text-[30px] text-[#363636] font-bold">
                  1285{" "}
                  <span className="text-[14px] font-normal text-[#B2AC88]">
                    mood logs
                  </span>
                </p>

                <div className="flex flex-row justify-end gap-2">
                  <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
                    <div className="box-border w-4 h-2 bg-[#50C878]" />
                    <p className="text-[11px] text-[#363636]">Positive logs</p>
                  </div>

                  <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
                    <div className="box-border w-4 h-2 bg-[#FFDB58]" />
                    <p className="text-[11px] text-[#363636]">Neutral logs</p>
                  </div>

                  <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
                    <div className="box-border w-4 h-2 bg-[#CC5500]" />
                    <p className="text-[11px] text-[#363636]">Negative logs</p>
                  </div>
                </div>
              </div>

              <Line data={data} options={options} />
            </div>

            <div className="box-border mt-5 bg-white rounded-[15px] border border-#e4e4e4] flex flex-col justify-start overflow-hidden min-h-[350px]">
              <div className="box-border p-5 bg-white rounded-[15px]">
                <p className="text-[#008080] text-[16px] font-bold">
                  Recommended Insights & Actions
                </p>
              </div>

              <div className="flex-1 box-border overflow-y-auto p-5 flex flex-col justify-start gap-2">
                <InsightsListTile
                  employee={"Michael Artiaga"}
                  content={
                    "has been logging in a low mood average for the following days!"
                  }
                  notif={"Following Mood Log is Low!"}
                  suggestion={"Try scheduling a 1:1 with Michael"}
                />

                <InsightsListTile
                  employee={"Michael Artiaga"}
                  content={
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, consectetur?"
                  }
                  notif={"Last Salary Update "}
                  suggestion={"Try scheduling a 1:1 with Michael"}
                />
              </div>
            </div>
          </div>

          <div className="box-border bg-white p-5 border border[#e4e4e4] rounded-[15px] flex-1">
            <div className="box-border flex flex-row justify-between items-center">
              <p className=" font-bold text-[#008080] text-[14px] text-left">
                My Team Notices
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-[#E4E4E4] w-5 h-5"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
              </svg>
            </div>

            <div className="box-border flex flex-row justify-between items-center gap-2 py-4">
              <hr className="flex-1" />

              <span className="text-[11px] text-[#8b8b8b]">Today</span>

              <hr className="flex-1" />
            </div>

            <div className="box-border flex flex-col justify-start gap-2">
              <TeamListTile
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-[#008080] w-8 h-8"
                  >
                    <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z"></path>
                  </svg>
                }
                notif={"Request for Performance Review"}
                employee={"Antoinette Sanchez"}
                content={"has scheduled a performance review."}
                moment={"now"}
              />

              <TeamListTile
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-[#008080] w-8 h-8"
                  >
                    <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z"></path>
                  </svg>
                }
                notif={"Leave Request"}
                employee={"Matt Wilfred Salvador"}
                content={
                  "has filed a leave request and is waiting for your approval."
                }
                moment={"20 min ago"}
              />

              <TeamListTile
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-[#008080] w-8 h-8"
                  >
                    <path d="M12 5C7.031 5 2 6.546 2 9.5S7.031 14 12 14c4.97 0 10-1.546 10-4.5S16.97 5 12 5zm-5 9.938v3c1.237.299 2.605.482 4 .541v-3a21.166 21.166 0 0 1-4-.541zm6 .54v3a20.994 20.994 0 0 0 4-.541v-3a20.994 20.994 0 0 1-4 .541zm6-1.181v3c1.801-.755 3-1.857 3-3.297v-3c0 1.44-1.199 2.542-3 3.297zm-14 3v-3C3.2 13.542 2 12.439 2 11v3c0 1.439 1.2 2.542 3 3.297z"></path>
                  </svg>
                }
                notif={"Compensation Change Request"}
                moment={"1 hour ago"}
                employee={"Marvin Bautista"}
                content={"has sent a compensation request."}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTeam;
