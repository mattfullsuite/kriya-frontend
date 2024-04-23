import Headings from "./Headings";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EngagementIndex = ({ color }) => {
  // const options = {
  //   plugins: {
  //     title: {
  //       display: false,
  //     },
  //     legend: {
  //       display: false,
  //     },
  //   },
  //   responsive: true,
  //   scales: {
  //     x: {
  //       stacked: true,
  //     },
  //     y: {
  //       stacked: true,
  //     },
  //   },
  // };

  // const moodlabels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];

  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "Negative logs",
  //       data: [10, 20, 30, 40, 50, 60, 70],
  //       backgroundColor: "#FF5353",
  //     },
  //     {
  //       label: "Neutral logs",
  //       data: [10, 20, 30, 40, 50, 60, 70],
  //       backgroundColor: "#BDBDBD",
  //     },
  //     {
  //       label: "Positive logs",
  //       data: [10, 20, 30, 40, 50, 60, 70],
  //       backgroundColor: "#A9CF54",
  //     },
  //   ],
  // };

  // const label = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     title: {
  //       display: false,
  //     },
  //   },
  // };

  // const data = {
  //   label,
  //   datasets: [
  //     {
  //       label: "Cheers given",
  //       data: [10, 30, 44, 32, 72, 18, 23],
  //       backgroundColor: "#CC5500",
  //     },
  //     {
  //       label: "Cheers received",
  //       data: [32, 12, 54, 34, 42, 28, 53],
  //       backgroundColor: "#FFAE36",
  //     },
  //   ],
  // };

  return (
    <div className="max-w-[1300px] m-auto">
      <Headings text="Engagement Index" />

      <div className="box-border mt-10 flex flex-row justify-between gap-5">
        <div className="box-border flex-1 p-5 bg-white border border-[#e4e4e4] rounded-[15px]">
          <p className="text-[16px] font-bold text-[#008080]">
            Team Mood Rate Statistics
          </p>

          <p className="text-[30px] text-[#363636] font-bold mt-5 mb-2">
            1285{" "}
            <span className="text-[14px] font-normal text-[#B2AC88]">
              Mood logs
            </span>
          </p>

          <Bar
            options={{
              plugins: {
                title: {
                  display: false,
                },
                legend: {
                  display: false,
                },
              },
              responsive: true,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}

            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
              ],
              datasets: [
                {
                  label: "Negative logs",
                  data: [10, 20, 30, 40, 50, 60, 70],
                  backgroundColor: "#FF5353",
                },
                {
                  label: "Neutral logs",
                  data: [10, 20, 30, 40, 50, 60, 70],
                  backgroundColor: "#BDBDBD",
                },
                {
                  label: "Positive logs",
                  data: [10, 20, 30, 40, 50, 60, 70],
                  backgroundColor: "#A9CF54",
                },
              ],
            }}
          />
          <div className="flex flex-row justify-around gap-2 mt-5">
            <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
              <div className="box-border w-4 h-2 bg-[#A9CF54]" />
              <p className="text-[11px] text-[#363636]">Positive logs</p>
            </div>

            <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
              <div className="box-border w-4 h-2 bg-[#BDBDBD]" />
              <p className="text-[11px] text-[#363636]">Neutral logs</p>
            </div>

            <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
              <div className="box-border w-4 h-2 bg-[#FF5353]" />
              <p className="text-[11px] text-[#363636]">Negative logs</p>
            </div>
          </div>
        </div>

        <div className="box-border flex-1 p-5 bg-white border border-[#e4e4e4] rounded-[15px]">
          <p className="text-[16px] font-bold text-[#008080]">
            Team Mood Rate Statistics
          </p>

          <div className="box-border flex flex-row justify-around items-center w-full">
            <div className="box-border">
              <p className="text-[30px] text-[#363636] font-bold mt-5 mb-2">
                829{" "}
                <span className="text-[14px] font-normal text-[#CC5500]">
                  Cheers Given
                </span>
              </p>
            </div>

            <div className="box-border">
              <p className="text-[30px] text-[#363636] font-bold mt-5 mb-2">
                829{" "}
                <span className="text-[14px] font-normal text-[#FFAE36]">
                  Cheers Received
                </span>
              </p>
            </div>
          </div>

          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: false,
                },
              },
            }}
            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
              ],
              datasets: [
                {
                  label: "Cheers given",
                  data: [10, 30, 44, 32, 72, 18, 23],
                  backgroundColor: "#CC5500",
                },
                {
                  label: "Cheers received",
                  data: [32, 12, 54, 34, 42, 28, 53],
                  backgroundColor: "#FFAE36",
                },
              ],
            }}
          />

          <div className="flex flex-row justify-around gap-2 mt-5">
            <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
              <div className="box-border w-4 h-2 bg-[#CC5500]" />
              <p className="text-[11px] text-[#363636]">Cheers Given</p>
            </div>

            <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
              <div className="box-border w-4 h-2 bg-[#FFAE36]" />
              <p className="text-[11px] text-[#363636]">Cheers Received</p>
            </div>
          </div>
        </div>
      </div>

      <div className="box-border mt-5 flex flex-row justify-between gap-5">
        <div className="flex-1 box-border bg-gradient-to-br from-[#A9CF54] to-[#F9B913] p-5 rounded-[15px] relative overflow-hidden border border-[#e4e4e4]">
          <div className="box-border flex flex-row justify-between items-center">
            <p className="text-[18px] font-bold text-white">
              Average Mood Rate
            </p>

            <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Anually</option>
            </select>
          </div>

          <p className="text-white italic">This Week</p>

          <p className="text-white font-bold text-[36px] my-5 mx-5">
            3.5<span className="font-normal text-[22px]">/5.0</span>
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-white w-40 h-40 absolute bottom-[-30px] right-[-30px]"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM8 9c2.201 0 3 1.794 3 3H9c-.012-.45-.194-1-1-1s-.988.55-1 1.012L5 12c0-1.206.799-3 3-3zm4 9c-4 0-5-4-5-4h10s-1 4-5 4zm5-6c-.012-.45-.194-1-1-1s-.988.55-1 1.012L13 12c0-1.206.799-3 3-3s3 1.794 3 3h-2z"></path>
          </svg>
        </div>

        <div className="flex-1 box-border bg-white p-5 rounded-[15px] border border-[#e4e4e4] flex flex-col justify-between">
          <div className="box-border">
            <p className="text-[16px] font-bold text-[#008080]">
              Current Team Average Rate
            </p>

            <p className="italic text-[#B2AC88]">This week</p>
          </div>

          <div className="box-border flex flex-row justify-end items-center gap-8">
            <div className="box-border flex flex-col items-center justify-center">
              <p className="text-[#363636] text-[36px] font-bold leading-none">
                100
              </p>
              <p className="text-center text-[#B2AC88] font-light text-[14px]">
                Cheers Given
              </p>
            </div>

            <div className="box-border flex flex-col items-center justify-center">
              <p className="text-[#363636] text-[36px] font-bold leading-none">
                50
              </p>
              <p className="text-center text-[#B2AC88] font-light text-[14px]">
                Cheers Received
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="box-border mt-5 flex flex-row justify-between gap-5">
        <div className="box-border flex-1 bg-white border border-[#e4e4e4] rounded-[15px] p-5 overflow-auto">
          <p className="text-[16px] font-bold text-[#008080]">
            Team Historical Mood Rate
          </p>

          <table className="table mt-5">
            {/* head */}
            <thead>
              <tr>
                <th className="text-[#8b8b8b] font-medium">Team members</th>
                <th className="text-[#8b8b8b] font-medium">This week</th>
                <th className="text-[#8b8b8b] font-medium">MTD</th>
                <th className="text-[#8b8b8b] font-medium">YTD</th>
                <th className="text-[#8b8b8b] font-medium">Last year</th>
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

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">97</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-green-500"
                    >
                      <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">93</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-red-500"
                    >
                      <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">97</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-green-500"
                    >
                      <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <span className="text-[#363636] text-[14px]">97</span>
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

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">97</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-green-500"
                    >
                      <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">93</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-red-500"
                    >
                      <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">97</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-green-500"
                    >
                      <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <span className="text-[#363636] text-[14px]">97</span>
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

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">97</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-green-500"
                    >
                      <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">93</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-red-500"
                    >
                      <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">97</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-green-500"
                    >
                      <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <span className="text-[#363636] text-[14px]">97</span>
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

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">97</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-green-500"
                    >
                      <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">93</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-red-500"
                    >
                      <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">97</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-green-500"
                    >
                      <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <span className="text-[#363636] text-[14px]">97</span>
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

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">97</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-green-500"
                    >
                      <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">93</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-red-500"
                    >
                      <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                    <span className="text-[#363636] text-[14px]">97</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-green-500"
                    >
                      <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
                    </svg>
                  </div>
                </td>

                <td>
                  <span className="text-[#363636] text-[14px]">97</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="box-border flex-1 bg-white border border-[#e4e4e4] rounded-[15px] p-5 overflow-auto">
          <p className="text-[16px] font-bold text-[#008080]">
            Team Historical Cheers
          </p>
          <div className="box-border overflow-auto h-full">
            <table className="table mt-5">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-[#8b8b8b] font-medium">Team members</th>
                  <th className="text-[#8b8b8b] font-medium">This week</th>
                  <th className="text-[#8b8b8b] font-medium">MTD</th>
                  <th className="text-[#8b8b8b] font-medium">YTD</th>
                  <th className="text-[#8b8b8b] font-medium">Last year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500" />

                      <div className="box-border flex-1 flex flex-col justify-start">
                        <span className="text-[13px] font-medium text-[#363636]">
                          Marvin Bautista
                        </span>
                        <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                          Software Engineer
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500" />

                      <div className="box-border flex-1 flex flex-col justify-start">
                        <span className="text-[13px] font-medium text-[#363636]">
                          Marvin Bautista
                        </span>
                        <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                          Software Engineer
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500" />

                      <div className="box-border flex-1 flex flex-col justify-start">
                        <span className="text-[13px] font-medium text-[#363636]">
                          Marvin Bautista
                        </span>
                        <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                          Software Engineer
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="box-border flex flex-row justify-center items-center gap-[0.1rem]">
                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#CC5500] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Given
                        </p>
                      </div>

                      <div className="box-border flex-1">
                        <p className="text-[18px] text-center font-medium text-[#FFAE36] leading-none">
                          90
                        </p>
                        <p className="text-[10px] text-[#8B8B8B] text-center leading-none">
                          Received
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementIndex;
