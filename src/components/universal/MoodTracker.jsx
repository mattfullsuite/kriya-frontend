import React, { useState } from "react";
import Headings from "./Headings";
import Subheadings from "./Subheadings";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend);

const MoodTracker = ({ color }) => {
  const [mood, setMood] = useState(1);

  const data = {
    labels: ["Low Logs", "Neutral Logs", "High Logs"],
    datasets: [
      {
        data: [9, 20, 29],
        backgroundColor: ["#FF0000", "#DFE0E5", "#A9CF54"],
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

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const lineData = {
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

  const MoodTiles = ({ mood, date }) => {
    if (mood >= 1 && mood <= 1.99) {
      return (
        <div className="box-border flex flex-row flex-nowrap justify-start items-center bg-[#f4f4f4] p-2 rounded-[8px] gap-2">
          <div className="box-border p-1 rounded-full bg-gradient-to-br from-[#FF000B] to-[#FC6A18]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className=" fill-white w-7 h-7"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-5 8.5.002-.022-1.373-.549.742-1.857 5 2-.742 1.857-1.031-.413c-.014.014-.023.031-.037.044A1.499 1.499 0 0 1 7 10.5zM8 17s1-3 4-3 4 3 4 3H8zm8.986-6.507c0 .412-.167.785-.438 1.056a1.488 1.488 0 0 1-2.112 0c-.011-.011-.019-.024-.029-.035l-1.037.415-.742-1.857 5-2 .742 1.857-1.386.554a.036.036 0 0 1 .002.01z"></path>
            </svg>
          </div>

          <div className="box-border">
            <p className="text-[12px] font-medium text-[#363636] leading-none">
              Low log
            </p>
            <p className="text-[9px] text-[#8b8b8b] leading-[0.7rem]">{date}</p>
            <p className="text-[9px] text-[#8b8b8b] leading-none">
              Mood rate: {mood}
            </p>
          </div>
        </div>
      );
    } else if (mood >= 2 && mood <= 2.99) {
      return (
        <div className="box-border flex flex-row flex-nowrap justify-start items-center bg-[#f4f4f4] p-2 rounded-[8px] gap-2">
          <div className="box-border p-1 rounded-full bg-gradient-to-br from-[#D47000] to-[#E6B300]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className=" fill-white w-7 h-7"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-5 8.5a1.5 1.5 0 1 1 3.001.001A1.5 1.5 0 0 1 7 10.5zM8 17s1-3 4-3 4 3 4 3H8zm7.493-5.014a1.494 1.494 0 1 1 .001-2.987 1.494 1.494 0 0 1-.001 2.987z"></path>
            </svg>
          </div>

          <div className="box-border">
            <p className="text-[12px] font-medium text-[#363636] leading-none">
              Low log
            </p>
            <p className="text-[9px] text-[#8b8b8b] leading-[0.7rem]">{date}</p>
            <p className="text-[9px] text-[#8b8b8b] leading-none">
              Mood rate: {mood}
            </p>
          </div>
        </div>
      );
    } else if (mood >= 3 && mood <= 3.99) {
      return (
        <div className="box-border flex flex-row flex-nowrap justify-start items-center bg-[#f4f4f4] p-2 rounded-[8px] gap-2">
          <div className="box-border p-1 rounded-full bg-gradient-to-br from-[#DAB000] to-[#FDD639]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className=" fill-white w-7 h-7"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-5 8.5a1.5 1.5 0 1 1 3.001.001A1.5 1.5 0 0 1 7 10.5zm9 6.5H7.974v-2H16v2zm-.507-5.014a1.494 1.494 0 1 1 .001-2.987 1.494 1.494 0 0 1-.001 2.987z"></path>
            </svg>
          </div>

          <div className="box-border">
            <p className="text-[12px] font-medium text-[#363636] leading-none">
              Neutral log
            </p>
            <p className="text-[9px] text-[#8b8b8b] leading-[0.7rem]">{date}</p>
            <p className="text-[9px] text-[#8b8b8b] leading-none">
              Mood rate: {mood}
            </p>
          </div>
        </div>
      );
    } else if (mood >= 4 && mood <= 4.99) {
      return (
        <div className="box-border flex flex-row flex-nowrap justify-start items-center bg-[#f4f4f4] p-2 rounded-[8px] gap-2">
          <div className="box-border p-1 rounded-full bg-gradient-to-br from-[#A5C425] to-[#D6F459]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className=" fill-white w-7 h-7"
            >
              <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm3.493-13a1.494 1.494 0 1 1-.001 2.987A1.494 1.494 0 0 1 15.493 9zm-4.301 6.919a4.108 4.108 0 0 0 1.616 0c.253-.052.505-.131.75-.233.234-.1.464-.224.679-.368.208-.142.407-.306.591-.489.183-.182.347-.381.489-.592l1.658 1.117a6.027 6.027 0 0 1-1.619 1.621 6.003 6.003 0 0 1-2.149.904 6.116 6.116 0 0 1-2.414-.001 5.919 5.919 0 0 1-2.148-.903 6.078 6.078 0 0 1-1.621-1.622l1.658-1.117c.143.211.307.41.488.59a3.988 3.988 0 0 0 2.022 1.093zM8.5 9a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 9z"></path>
            </svg>
          </div>

          <div className="box-border">
            <p className="text-[12px] font-medium text-[#363636] leading-none">
              Positive log
            </p>
            <p className="text-[9px] text-[#8b8b8b] leading-[0.7rem]">{date}</p>
            <p className="text-[9px] text-[#8b8b8b] leading-none">
              Mood rate: {mood}
            </p>
          </div>
        </div>
      );
    } else if (mood === 5) {
      return (
        <div className="box-border flex flex-row flex-nowrap justify-start items-center bg-[#f4f4f4] p-2 rounded-[8px] gap-2">
          <div className="box-border p-1 rounded-full bg-gradient-to-br from-[#308F30] to-[#5FDC60]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className=" fill-white w-7 h-7"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3.493 6a1.494 1.494 0 1 1-.001 2.987A1.494 1.494 0 0 1 15.493 8zM8.5 8a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 8zM12 18c-5 0-6-5-6-5h12s-1 5-6 5z"></path>
            </svg>
          </div>

          <div className="box-border">
            <p className="text-[12px] font-medium text-[#363636] leading-none">
              Positive log
            </p>
            <p className="text-[9px] text-[#8b8b8b] leading-[0.7rem]">{date}</p>
            <p className="text-[9px] text-[#8b8b8b] leading-none">
              Mood rate: {mood}
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-[1300px] m-auto">
      <Headings text={"Mood Tracker"} />

      <div className="box-border mt-10 flex flex-row justify-between items-start gap-5">
        <div className="box-border flex-1 flex flex-col justify-start gap-5">
          <div className="box-border bg-gradient-to-br from-[#A9CF54] to-[#F9B913] p-5 rounded-[15px] relative overflow-hidden border border-[#e4e4e4]">
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

            <p className="text-white font-bold text-[36px] my-5 mx-5">
              3.5<span className="font-normal text-[22px]">/5.0</span>
            </p>

            <p className="text-[14px] italic text-[#666A40]">
              Your Mood Rate has <b>improved!</b>
            </p>
            <p className="text-[14  px] italic text-[#666A40]">
              Your Average Mood Rate last week was{" "}
              <span className="text-white">
                <b>3.8</b>/5.0
              </span>
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-white w-40 h-40 absolute bottom-[-30px] right-[-30px]"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM8 9c2.201 0 3 1.794 3 3H9c-.012-.45-.194-1-1-1s-.988.55-1 1.012L5 12c0-1.206.799-3 3-3zm4 9c-4 0-5-4-5-4h10s-1 4-5 4zm5-6c-.012-.45-.194-1-1-1s-.988.55-1 1.012L13 12c0-1.206.799-3 3-3s3 1.794 3 3h-2z"></path>
            </svg>
          </div>

          <div className="box-border flex flex-col justify-center items-center gap-8 border border-[#e4e4e4] bg-white p-5 rounded-[15px]">
            <span className="text-[16p] font-medium text-[#363636]">
              Rate your mood
            </span>

            <div className="box-border w-full px-10">
              <div className="box-border flex flex-row justify-between w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-[#c9c9c9] w-5 h-5"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-5 8.5.002-.022-1.373-.549.742-1.857 5 2-.742 1.857-1.031-.413c-.014.014-.023.031-.037.044A1.499 1.499 0 0 1 7 10.5zM8 17s1-3 4-3 4 3 4 3H8zm8.986-6.507c0 .412-.167.785-.438 1.056a1.488 1.488 0 0 1-2.112 0c-.011-.011-.019-.024-.029-.035l-1.037.415-.742-1.857 5-2 .742 1.857-1.386.554a.036.036 0 0 1 .002.01z"></path>
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-[#c9c9c9] w-5 h-5"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM8 9c2.201 0 3 1.794 3 3H9c-.012-.45-.194-1-1-1s-.988.55-1 1.012L5 12c0-1.206.799-3 3-3zm4 9c-4 0-5-4-5-4h10s-1 4-5 4zm5-6c-.012-.45-.194-1-1-1s-.988.55-1 1.012L13 12c0-1.206.799-3 3-3s3 1.794 3 3h-2z"></path>
                </svg>
              </div>
              <input
                type="range"
                name="mood_tracker"
                className="slider"
                min={1.0}
                max={5.0}
                step={0.01}
                // step={0.01}
                onChange={(e) => {
                  setMood(e.target.value);
                }}
              />

              <div className="box-border mt-2 flex flex-row justify-between w-full">
                <span className="text-[12px] font-medium text-[#c9c9c9] select-none">
                  1.0
                </span>

                <span className="text-[12px] font-medium text-[#c9c9c9] select-none">
                  2.0
                </span>

                <span className="text-[12px] font-medium text-[#c9c9c9] select-none">
                  3.0
                </span>

                <span className="text-[12px] font-medium text-[#c9c9c9] select-none">
                  4.0
                </span>

                <span className="text-[12px] font-medium text-[#c9c9c9] select-none">
                  5.0
                </span>
              </div>
            </div>

            <button className="bg-[#EA7B2D] transition-all ease-in active:scale-90 hover:bg-[#d58145] text-white rounded-[8px] outline-none text-[13px] py-2 w-[55%]">
              Submit
            </button>
          </div>

          <div className="box-border flex flex-row justify-between gap-3">
            <div className="flex-1 box-border bg-white border border-[#e4e4e4] rounded-[15px] overflow-hidden">
              <div className="box-border flex-1 flex flex-row justify-between items-center p-5 border-b border-[#e4e4e4]">
                <Subheadings text="Recent Mood Logs" />
              </div>

              <div className="box-border flex flex-col justify-start gap-2 p-2">
                <MoodTiles mood={1.34} date={"February 07, 2024"} />
                <MoodTiles mood={2.99} date={"February 07, 2024"} />
                <MoodTiles mood={3.99} date={"February 07, 2024"} />
                <MoodTiles mood={4.1} date={"February 07, 2024"} />
              </div>
            </div>

            <div className="flex-1 box-border bg-white border border-[#e4e4e4] rounded-[15px] overflow-hidden">
              <div className="box-border flex-1 flex flex-row justify-between items-center mb-3 p-5 border-b border-[#e4e4e4]">
                <Subheadings text="Mood Logs Overview" />
              </div>

              <select className="outline-none border border-[#E4E4E4] rounded-[5px] px-[2px] py-[3px] text-[13px] mx-5">
                <option>This week</option>
                <option>Monthly</option>
              </select>

              <div className="flex flex-row justify-between items-center px-5">
                <div className="box-border flex flex-col justify-start gap-2">
                  <div className="box-border flex flex-row justify-start items-center gap-1">
                    <div className="box-border w-3 h-3 bg-[#FF0000] rounded-full" />

                    <span className="text-[12px] text-[#363636]">Low</span>
                  </div>

                  <div className="box-border flex flex-row justify-start items-center gap-1">
                    <div className="box-border w-3 h-3 bg-[#DFE0E5] rounded-full" />

                    <span className="text-[12px] text-[#363636]">Neutral</span>
                  </div>

                  <div className="box-border flex flex-row justify-start items-center gap-1">
                    <div className="box-border w-3 h-3 bg-[#A9CF54] rounded-full" />

                    <span className="text-[12px] text-[#363636]">High</span>
                  </div>
                </div>

                <Doughnut
                  data={data}
                  options={options}
                  plugins={[textCenter]}
                />
              </div>
            </div>
          </div>

          <div className="box-border bg-white border border-[#E4E4E4] p-5 rounded-[15px]">
            <div className="box-border flex flex-row justify-between items-center">
              <div className="box-border flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-[#EA7B2D] w-6 h-6"
                >
                  <path d="M16.97 4.757a.999.999 0 0 0-1.918-.073l-3.186 9.554-2.952-6.644a1.002 1.002 0 0 0-1.843.034L5.323 12H2v2h3.323c.823 0 1.552-.494 1.856-1.257l.869-2.172 3.037 6.835c.162.363.521.594.915.594l.048-.001a.998.998 0 0 0 .9-.683l2.914-8.742.979 3.911A1.995 1.995 0 0 0 18.781 14H22v-2h-3.22l-1.81-7.243z"></path>
                </svg>
                <span className="text-[14px] text-[#EA7B2D] font-medium">
                  Tell us what you think, anonymously
                </span>
              </div>
            </div>

            <p className="text-[13px] text-[#363636] mt-5 mb-10">
              Gain insights and shape your week: Participate in the Weekly Pulse
              Survey
            </p>

            <div className="flex justify-end">
              <button className="text-white text-[14px] rounded-[8px] bg-[#EA7B2D] px-4 py-2">
                Check out survey
              </button>
            </div>
          </div>

          <div className="box-border bg-white rounded-[15px] border border-[#e4e4e4] p-5">
            <div className="box-border flex flex-row justify-between items-center">
              <div className="box-border">
                <Subheadings text={"Mood Trend"} />
              </div>

              <select className="outline-none px-2 py-2 text-[#363636] text-[13px] rounded-[8px] border border-[#e4e4e4]">
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Anually</option>
              </select>
            </div>

            <p className="text-[30px] text-[#363636] font-bold">
              1285{" "}
              <span className="text-[14px] font-normal text-[#B2AC88]">
                mood logs
              </span>
            </p>

            <Line data={lineData} options={lineData} />
            <div className="flex flex-row justify-around gap-2">
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
        </div>

        <div className="box-border flex-1 p-5 bg-white border border-[#e4e4e4] rounded-[15px]">
          <div className="box-border flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-[#EA7B2D] w-8 h-8"
            >
              <path d="M16.97 4.757a.999.999 0 0 0-1.918-.073l-3.186 9.554-2.952-6.644a1.002 1.002 0 0 0-1.843.034L5.323 12H2v2h3.323c.823 0 1.552-.494 1.856-1.257l.869-2.172 3.037 6.835c.162.363.521.594.915.594l.048-.001a.998.998 0 0 0 .9-.683l2.914-8.742.979 3.911A1.995 1.995 0 0 0 18.781 14H22v-2h-3.22l-1.81-7.243z"></path>
            </svg>
            <span className="text-[18px] text-[#EA7B2D] font-bold">
              How's your pulse this week?
            </span>
          </div>

          <div className="box-border mt-10 flex flex-col justify-start gap-12 px-5">
            <div className="box-border">
              <p className="text-[#363636] font-semibold">
                How is your energy at work been (1 being lowest, 10 highest)? If
                you wanted to move up a number, what would it take?
              </p>

              <textarea
                className="bg-[#E4E4E4] rounded-[10px] resize-none w-full h-24 mt-5 text-[#363636] text-[14px] p-3 outline-none border transition ease-in border-[#e4e4e4] focus:border focus:border-[#EA7B2D]"
                placeholder="Type here..."
              />

              <button className="bg-[#EA7B2D] transition-all ease-in active:scale-90 hover:bg-[#d58145] text-white rounded-[8px] outline-none text-[13px] py-2 px-3 float-right">
                Submit
              </button>
            </div>

            <div className="box-border">
              <p className="text-[#363636] font-semibold">
                Any wins/achievements, no matter how small, you would like to
                share this week?
              </p>

              <textarea
                className="bg-[#E4E4E4] rounded-[10px] resize-none w-full h-24 mt-5 text-[#363636] text-[14px] p-3 outline-none border transition ease-in border-[#e4e4e4] focus:border focus:border-[#EA7B2D]"
                placeholder="Type here..."
              />

              <button className="bg-[#EA7B2D] transition-all ease-in active:scale-90 hover:bg-[#d58145] text-white rounded-[8px] outline-none text-[13px] py-2 px-3 float-right">
                Submit
              </button>
            </div>

            <div className="box-border">
              <p className="text-[#363636] font-semibold">
                Are you experiencing any challenges at work? Care to elaborate?
              </p>

              <textarea
                className="bg-[#E4E4E4] rounded-[10px] resize-none w-full h-24 mt-5 text-[#363636] text-[14px] p-3 outline-none border transition ease-in border-[#e4e4e4] focus:border focus:border-[#EA7B2D]"
                placeholder="Type here..."
              />

              <button className="bg-[#EA7B2D] transition-all ease-in active:scale-90 hover:bg-[#d58145] text-white rounded-[8px] outline-none text-[13px] py-2 px-3 float-right">
                Submit
              </button>
            </div>

            <div className="box-border">
              <p className="text-[#363636] font-semibold">
                Do you feel like you are getting support to thrive at work these
                days?
              </p>

              <textarea
                className="bg-[#E4E4E4] rounded-[10px] resize-none w-full h-24 mt-5 text-[#363636] text-[14px] p-3 outline-none border transition ease-in border-[#e4e4e4] focus:border focus:border-[#EA7B2D]"
                placeholder="Type here..."
              />

              <button className="bg-[#EA7B2D] transition-all ease-in active:scale-90 hover:bg-[#d58145] text-white rounded-[8px] outline-none text-[13px] py-2 px-3 float-right">
                Submit
              </button>
            </div>

            <div className="box-border">
              <p className="text-[#363636] font-semibold">
                Do you have anything else to share?
              </p>

              <textarea
                className="bg-[#E4E4E4] rounded-[10px] resize-none w-full h-24 mt-5 text-[#363636] text-[14px] p-3 outline-none border transition ease-in border-[#e4e4e4] focus:border focus:border-[#EA7B2D]"
                placeholder="Type here..."
              />

              <button className="bg-[#EA7B2D] transition-all ease-in active:scale-90 hover:bg-[#d58145] text-white rounded-[8px] outline-none text-[13px] py-2 px-3 float-right">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
