import React, { useState, useEffect, useRef } from "react";
import Headings from "./Headings";
import Subheadings from "./Subheadings";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";
import { async } from "@dabeng/react-orgchart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const MoodTracker = ({bgColor, hoverColor, disabledColor, fillColor, textColor, accentColor, focusBorder}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [moodRecords, setMoodRecords] = useState(1);
  const [mood, setMood] = useState(1);
  const [chosenMood, setChosenMood] = useState({
    chosenMood: mood,
  });

  const [mostRecentMood, setMostRecentMood] = useState([]);
  const [mostRecentLimitedMoods, setMostRecentLimitedMoods] = useState([]);

  const [weeklyAverage, setWeeklyAverage] = useState([]);
  const [lastWeekAverage, setLastWeekAverage] = useState([]);
  const [monthlyAverage, setMonthlyAverage] = useState([]);

  const [activeSurveys, setActiveSurveys] = useState([]);

  const [surveyAnswer, setSurveyAnswer] = useState({
    survey_id: "",
    survey_answer: "",
  });

  const [notif, setNotif] = useState("");

  const moodSubmitBtnRef = useRef();
  const [moodIsLoading, setIsMoodLoading] = useState(false);

  const pulseWeekRefTextarea = useRef([]);
  const pulseWeekRefBtn = useRef([]);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const active_surveys_res = await axios.get(
          BASE_URL + "/mp-getAllActiveSurveys"
        );
        setActiveSurveys(active_surveys_res.data);

        const recent_mood_res = await axios.get(
          BASE_URL + "/mp-getMostRecentMood"
        );
        const recent_moods_limites_res = await axios.get(
          BASE_URL + "/mp-getMostRecentMoodsLimited"
        );
        setMostRecentMood(recent_mood_res.data[0].mood_entry);
        setMostRecentLimitedMoods(recent_moods_limites_res.data);

        const weekly_ave_mood_res = await axios.get(
          BASE_URL + "/mp-getAverageWeekly"
        );
        const monthly_ave_mood_res = await axios.get(
          BASE_URL + "/mp-getAverageMonthly"
        );
        setWeeklyAverage(weekly_ave_mood_res.data[0].mood_average);
        setMonthlyAverage(monthly_ave_mood_res.data[0].mood_average);

        const last_week_ave_mood_res = await axios.get(
          BASE_URL + "/mp-getAverageLastWeek"
        );
        setLastWeekAverage(last_week_ave_mood_res.data[0].mood_average);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMoodData();
  }, []);

  useEffect(() => {
    const fetchPulseData = async () => {
      try {
        const active_surveys_res = await axios.get(
          BASE_URL + "/mp-getAllActiveSurveys"
        );
        setActiveSurveys(active_surveys_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPulseData();
  }, []);

  function handleChange(val) {
    if (val === "Weekly") {
      setMoodRecords(1);
    } else if (val === "Monthly") {
      setMoodRecords(2);
    } else if (val === "Annually") {
      setMoodRecords(3);
    }
  }

  var averageMoodRate =
    moodRecords === 0
      ? [1, 2, 3, 4, 5]
      : moodRecords === 1
      ? {
          label: "Weekly",
          moodRate: weeklyAverage,
          lastMoodRate: lastWeekAverage,
          averageStatus: displayWeeklyAverageStatus(
            weeklyAverage,
            lastWeekAverage
          ),
        }
      : moodRecords === 2
      ? {
          label: "Monthly",
          moodRate: monthlyAverage,
          lastMoodRate: lastWeekAverage,
          averageStatus: displayWeeklyAverageStatus(
            weeklyAverage,
            lastWeekAverage
          ),
        }
      : moodRecords === 3
      ? {
          label: "Annually",
          moodRate: monthlyAverage,
          lastMoodRate: lastWeekAverage,
          averageStatus: displayWeeklyAverageStatus(
            weeklyAverage,
            lastWeekAverage
          ),
        }
      : null;

  const notifySuccess = () =>
    toast.success("Mood logged successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifySuccessSurvey = () =>
    toast.success("Answer sent successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyFailed = () =>
    toast.error("Something went wrong!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    moodSubmitBtnRef.current.disabled = true;
    setIsMoodLoading(true);

    axios
      .post(BASE_URL + "/mp-addMood", chosenMood)
      .then((response) => {
        notifySuccess();

        const newData = {
          ...mostRecentLimitedMoods,
          mood_entry_id: response.data[0].mood_entry_id,
          mood_entry: response.data[0].mood_entry,
          emp_id: response.data[0].emp_id,
          date_od_entry: response.data[0].date_of_entry,
        };
        const added = [newData, ...mostRecentLimitedMoods];

        if (added.length > 5) {
          added.pop();
        }

        setMostRecentLimitedMoods(added);

        moodSubmitBtnRef.current.disabled = false;
        setIsMoodLoading(false);

        setNotif("success");
      })
      .catch((error) => {
        notifyFailed();
        setNotif("error");

        moodSubmitBtnRef.current.disabled = false;
        setIsMoodLoading(false);
      });
  };

  const handleSurveyChange = (event) => {
    setSurveyAnswer({
      ...surveyAnswer,
      survey_id: event.target.id,
      survey_answer: event.target.value,
    });

    console.log(surveyAnswer);
  };

  const handleSubmitSurvey = (event) => {
    event.preventDefault();

    pulseWeekRefBtn.current[event.target.id].disabled = true;

    axios
      .post(BASE_URL + "/mp-insertSurveyAnswer", surveyAnswer)
      .then((response) => {
        setNotif(response.data);
        if (response.data === "success") {
          notifySuccessSurvey();
          pulseWeekRefBtn.current[event.target.id].disabled = false;
          pulseWeekRefTextarea.current[event.target.id].value = "";
          setActiveSurveys((current) =>
            current.filter(
              (surveys) => surveys.pulse_survey_id != event.target.id
            )
          );
        } else {
          notifyFailed();
          pulseWeekRefBtn.current[event.target.id].disabled = false;
        }
      })
      .catch((error) => {
        setNotif("error");
        notifyFailed();
      });
  };

  function displayWeeklyAverageStatus(current, last) {
    if (current === null || last === null) {
      return "";
    } else if (current > last) {
      return "Your Mood Rate has improved!";
    } else if (current < last) {
      return "Your Mood Rate has declined!";
    } else if (current == last) {
      return "Your Mood Rate has maintained!";
    }
  }

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
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}

      <div className="box-border flex flex-row justify-between items-center">
        <Headings text={"Mood Tracker"} />

        <select
          className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        >
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Annually</option>
        </select>
      </div>

      <div className="box-border mt-10 flex flex-col lg:flex-row justify-between items-start gap-5">
        <div className="box-border flex-1 flex flex-col justify-start gap-5">
          <div className="box-border bg-gradient-to-br from-[#A9CF54] to-[#F9B913] p-5 rounded-[15px] relative overflow-hidden border border-[#e4e4e4]">
            <p className="text-[18px] font-bold text-white">
              {averageMoodRate.label} Average Mood Rate
            </p>

            <p className="text-white font-bold text-[36px] my-5 mx-5">
              {Math.round(averageMoodRate.moodRate * 100) / 100}
              {/* {(weeklyAverage == null) ? 0 : weeklyAverage} */}
              <span className="font-normal text-[22px]">/5.0</span>
            </p>

            <p className="text-[14px] italic text-[#666A40]">
              {displayWeeklyAverageStatus(weeklyAverage, lastWeekAverage)}
            </p>
            <p className="text-[14  px] italic text-[#666A40]">
              Your Average Mood Rate last week was{" "}
              <span className="text-white">
                {/* <b>{mostRecentMood}</b>/5.0 */}
                <b>{averageMoodRate.lastMoodRate}</b>/5.0
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
                className={`slider ${accentColor}`}
                min={1.0}
                max={5.0}
                step={0.01}
                onChange={(e) => {
                  setMood(e.target.value);
                  setChosenMood({ ...chosenMood, chosenMood: e.target.value });
                }}
                value={mood}
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

            <button
              className={`${bgColor} ${disabledColor} disabled:cursor-not-allowed disabled:pointer-events-none transition-all ease-in active:scale-90 ${hoverColor} text-white rounded-[8px] outline-none text-[13px] py-2 w-[55%]`}
              onClick={handleSubmit}
              ref={moodSubmitBtnRef}
            >
              {moodIsLoading ? (
                <div className="box-border flex flex-row justify-center items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-white w-5 h-5 animate-spin duration-700"
                  >
                    <circle cx="12" cy="20" r="2"></circle>
                    <circle cx="12" cy="4" r="2"></circle>
                    <circle cx="6.343" cy="17.657" r="2"></circle>
                    <circle cx="17.657" cy="6.343" r="2"></circle>
                    <circle cx="4" cy="12" r="2.001"></circle>
                    <circle cx="20" cy="12" r="2"></circle>
                    <circle cx="6.343" cy="6.344" r="2"></circle>
                    <circle cx="17.657" cy="17.658" r="2"></circle>
                  </svg>
                  <span>Submitting...</span>
                </div>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>

          <div className="box-border flex flex-row justify-between gap-3">
            <div className="flex-1 box-border bg-white border border-[#e4e4e4] rounded-[15px] overflow-hidden">
              <div className="box-border flex-1 flex flex-row justify-between items-center p-5 border-b border-[#e4e4e4]">
                <Subheadings text={"Recent Mood Logs"} />
              </div>

              <div className="box-border flex flex-col justify-start gap-2 p-2">
                {mostRecentLimitedMoods.length !== 0 ? (
                  mostRecentLimitedMoods.map((ml) => (
                    <MoodTiles
                      mood={ml.mood_entry}
                      date={moment(ml.date_of_entry).format("MMMM DD, YYYY")}
                    />
                  ))
                ) : (
                  <p className="text-center mt-20 text-[#a9a9a9] font-normal text-[12px]">No recent mood logs.</p>
                )}
              </div>
            </div>

            <div className="flex-1 box-border bg-white border border-[#e4e4e4] rounded-[15px] overflow-hidden">
              <div className="box-border flex-1 flex flex-row justify-between items-center mb-3 p-5 border-b border-[#e4e4e4]">
                <Subheadings
                  text={averageMoodRate.label + " Mood Logs Overview"}
                />
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
                  className={`${fillColor} w-6 h-6`}
                >
                  <path d="M16.97 4.757a.999.999 0 0 0-1.918-.073l-3.186 9.554-2.952-6.644a1.002 1.002 0 0 0-1.843.034L5.323 12H2v2h3.323c.823 0 1.552-.494 1.856-1.257l.869-2.172 3.037 6.835c.162.363.521.594.915.594l.048-.001a.998.998 0 0 0 .9-.683l2.914-8.742.979 3.911A1.995 1.995 0 0 0 18.781 14H22v-2h-3.22l-1.81-7.243z"></path>
                </svg>
                <span className={`text-[14px] ${textColor} font-medium`}>
                  Tell us what you think, anonymously
                </span>
              </div>
            </div>

            <p className="text-[13px] text-[#363636] mt-5 mb-10">
              Gain insights and shape your week: Participate in the Weekly Pulse
              Survey
            </p>

            <div className="flex justify-end">
              <button className={`text-white text-[14px] rounded-[8px] ${bgColor} px-4 py-2`}>
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

            <Line data={lineData} options={lineOptions} />

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
              className={`${fillColor} w-8 h-8`}
            >
              <path d="M16.97 4.757a.999.999 0 0 0-1.918-.073l-3.186 9.554-2.952-6.644a1.002 1.002 0 0 0-1.843.034L5.323 12H2v2h3.323c.823 0 1.552-.494 1.856-1.257l.869-2.172 3.037 6.835c.162.363.521.594.915.594l.048-.001a.998.998 0 0 0 .9-.683l2.914-8.742.979 3.911A1.995 1.995 0 0 0 18.781 14H22v-2h-3.22l-1.81-7.243z"></path>
            </svg>
            <span className={`text-[18px] ${textColor} font-bold`}>
              How's your pulse this week?
            </span>
          </div>

          <div className="box-border mt-10 flex flex-col justify-start gap-12 px-5">
            {activeSurveys.length !== 0 ? (
              activeSurveys.map((as) => (
                <div
                  className="box-border"
                  onChange={(event) => handleSurveyChange(event)}
                  name={as.pulse_survey_id}
                >
                  <p className="text-[#363636] font-semibold">
                    {as.question_body}
                  </p>

                  <textarea
                    ref={(el) =>
                      (pulseWeekRefTextarea.current[as.pulse_survey_id] = el)
                    }
                    className={`bg-[#E4E4E4] rounded-[10px] resize-none w-full h-24 mt-5 text-[#363636] text-[14px] p-3 outline-none border transition ease-in border-[#e4e4e4] focus:border ${focusBorder}`}
                    placeholder="Type here..."
                    onChange={(event) => handleSurveyChange(event)}
                    name={"survey_answer" + as.pulse_survey_id}
                    id={as.pulse_survey_id}
                  />

                  <button
                    ref={(el) =>
                      (pulseWeekRefBtn.current[as.pulse_survey_id] = el)
                    }
                    className={`${bgColor} ${disabledColor} ${hoverColor} disabled:cursor-not-allowed flex justify-center transition-all ease-in active:scale-90 text-white rounded-[8px] outline-none text-[13px] py-2 px-3 float-right`}
                    onClick={(event) => {
                      handleSubmitSurvey(event, as.pulse_survey_id);
                    }}
                    id={as.pulse_survey_id}
                  >
                    Submit
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center gap-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 914.81679 687.57485"
                  className="h-44"
                >
                  <circle
                    cx="772.09812"
                    cy="242.42547"
                    r="21.92017"
                    fill="#ea7b2d"
                    opacity="0.4"
                  />
                  <circle
                    cx="309.93005"
                    cy="112.5011"
                    r="31.2479"
                    fill="#ea7b2d"
                    opacity="0.4"
                  />
                  <circle
                    cx="252.09812"
                    cy="127.42547"
                    r="21.92017"
                    fill="#ea7b2d"
                    opacity="0.4"
                  />
                  <path
                    d="M933.04867,593.76205c-17.32009,18.96224-17.949,46.58449-17.949,46.58449s27.4525-3.12163,44.77258-22.08387,17.949-46.58449,17.949-46.58449S950.36875,574.7998,933.04867,593.76205Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#3f3d56"
                  />
                  <path
                    d="M942.83253,599.21845c-5.241,25.14129-27.27179,41.81544-27.27179,41.81544s-13.53351-24.08793-8.29253-49.22921S934.54,549.98924,934.54,549.98924,948.07351,574.07717,942.83253,599.21845Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#ea7b2d"
                  />
                  <polygon
                    points="777.746 233.581 777.746 533.289 677.843 615.818 166.746 615.818 166.746 301.631 315.876 233.581 777.746 233.581"
                    fill="#3f3d56"
                  />
                  <polygon
                    points="777.746 233.581 777.746 234.782 741.882 258.788 677.843 301.631 166.746 301.631 315.876 233.581 777.746 233.581"
                    opacity="0.1"
                  />
                  <polygon
                    points="777.746 233.581 777.746 533.289 677.843 615.818 678.567 300.907 741.882 258.788 777.167 233.581 777.746 233.581"
                    opacity="0.1"
                  />
                  <polygon
                    points="643.094 274.845 331.803 274.845 354.969 261.814 653.23 261.814 643.094 274.845"
                    fill="#2f2e41"
                  />
                  <path
                    d="M1054.35223,738.3321s6.03477,25.23633.54862,26.33356-32.36834.74308-38.95173,1.84031-20.29878-.74308-20.29878-5.68062,14.264-8.22924,14.264-8.22924,20.29879-10.97231,20.8474-11.52093S1054.35223,738.3321,1054.35223,738.3321Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#2f2e41"
                  />
                  <path
                    d="M1049.41469,589.65722s-1.64585,18.65294-1.64585,20.29879,1.64585,27.43079,0,28.528,1.09723,8.77785,1.09723,11.52093,8.77786,48.27819,6.58339,65.8339,3.2917,15.90985,1.64585,17.5557-1.64585,1.64585-1.64585,4.93754-17.5557,6.03478-17.5557,6.03478L1018.6922,623.12279l9.87509-36.20865Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#575a89"
                  />
                  <path
                    d="M1049.41469,589.65722s-1.64585,18.65294-1.64585,20.29879,1.64585,27.43079,0,28.528,1.09723,8.77785,1.09723,11.52093,8.77786,48.27819,6.58339,65.8339,3.2917,15.90985,1.64585,17.5557-1.64585,1.64585-1.64585,4.93754-17.5557,6.03478-17.5557,6.03478L1018.6922,623.12279l9.87509-36.20865Z"
                    transform="translate(-142.59161 -106.21258)"
                    opacity="0.1"
                  />
                  <path
                    d="M1046.67161,746.01272s5.48616,19.75017,0,20.8474-32.36833-1.25692-38.95172-.15968-20.29879,1.25692-20.29879-3.68063,14.264-8.22923,14.264-8.22923,20.29879-10.97232,20.8474-11.52093S1046.67161,746.01272,1046.67161,746.01272Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#2f2e41"
                  />
                  <path
                    d="M1054.35223,567.71259s6.58339,15.90986-1.09723,24.13909-16.45847,24.68772-16.45847,25.78495,15.36124,110.27177,13.16677,117.40378-1.64584,11.52093-1.09723,12.61816-5.48616,7.132-12.06954,7.132-16.45848-4.93754-17.55571-9.32647,1.64585-42.24342,1.09723-49.37542-3.29169-17.55571-4.38893-19.75017-7.132-4.38893-8.22923-10.97232-9.87509-90.52161-7.132-93.26468S1054.35223,567.71259,1054.35223,567.71259Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#575a89"
                  />
                  <circle
                    cx="870.06582"
                    cy="316.66544"
                    r="18.65294"
                    fill="#ffb9b9"
                  />
                  <path
                    d="M1024.17836,432.20449s-3.84031,20.29878-1.09723,22.49324-20.8474,5.48616-20.8474,5.48616-2.74308-26.88217-3.29169-29.62525S1024.17836,432.20449,1024.17836,432.20449Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#ffb9b9"
                  />
                  <path
                    d="M998.942,458.538s6.58338-19.20155,33.46556-13.71539c0,0,4.93754,1.64585,3.29169,3.29169s-3.29169,1.64585-1.09723,3.2917,4.93754,0,3.2917,1.64585,14.81262,11.52093,13.71539,30.17387,3.84031,44.98649,0,49.37542,2.74308,23.59048,1.64585,27.43079,6.58339,8.77785,3.29169,10.4237-62.5422,11.52093-64.188,0-.54862-3.2917-2.19447-6.03478-2.19446-7.68062-1.09723-13.71539,3.84031-20.8474,2.74308-26.33356,0-51.56988,3.29169-57.056S998.942,458.538,998.942,458.538Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#ea7b2d"
                  />
                  <path
                    d="M1010.463,592.4003s8.22923,31.2711-2.19447,31.2711-9.87508-32.36833-9.87508-32.36833Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#ffb9b9"
                  />
                  <path
                    d="M1004.42819,422.878c0,1.591,2.30416,2.60043,5.87566,2.83084h.00549a29.891,29.891,0,0,0,4.54255-.08776c2.2822-.20848,3.22587,1.93659,3.61543,4.76747.63635,4.66873-.25241,11.21371.7735,12.23962,1.41547,1.4154,11.7349-.00549,14.96076-3.21488a2.98113,2.98113,0,0,0,.9491-1.72267,9.16647,9.16647,0,0,1,2.75406-5.11859c1.90368-2.07924,4.61381-4.38344,7.66964-8.04818,5.48616-6.58339,0-7.132-1.64585-12.06955s-4.38893-6.58339-4.38893-9.87509-12.61816-6.03477-23.04186-5.48615-8.22924,13.71539-8.22924,13.71539-.61993,1.591-1.36055,3.64282a57.21447,57.21447,0,0,0-2.43582,7.911A3.98649,3.98649,0,0,0,1004.42819,422.878Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#2f2e41"
                  />
                  <path
                    d="M1006.62266,466.76728s18.65293-1.09723,20.29878,26.33356,1.09723,53.21573,1.09723,53.76435-7.68062,52.66712-14.81262,52.66712-12.61817-1.09724-14.264-3.84031,4.38892-42.24342,4.38892-42.24342,2.74308-41.6948-1.64585-54.86158S996.74757,468.41313,1006.62266,466.76728Z"
                    transform="translate(-142.59161 -106.21258)"
                    opacity="0.1"
                  />
                  <path
                    d="M1003.87958,464.0242s18.65293-1.09723,20.29878,26.33356,1.09723,53.21573,1.09723,53.76435-7.68062,52.66712-14.81262,52.66712-12.61817-1.09723-14.264-3.84031,4.38892-42.24342,4.38892-42.24342,2.74308-41.6948-1.64584-54.86158S994.00449,465.67005,1003.87958,464.0242Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#ea7b2d"
                  />
                  <path
                    d="M694.57306,195.85392s-8.12905-23.0323-14-15.80648,9.03228,19.41939,9.03228,19.41939Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#a0616a"
                  />
                  <path
                    d="M732.96023,173.27323,728.07,175.08556s-2.33563,10.38124-1.43241,12.1877,1.35485.45161,0,4.06452-5.41936,13.0968-5.871,14.45164-26.1936-8.58066-26.1936-13.54841c0,0-5.41937,6.32259-8.12905,7.67743,0,0,29.80651,21.67746,33.871,24.38715s6.32259,1.35484,9.9355-1.80646,18.96778-29.35489,18.96778-29.35489Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#575a89"
                  />
                  <path
                    d="M719.86343,333.59612s.45161,4.96775,1.35484,5.41936,7.67743,11.742,0,14-12.19357,1.35484-14,2.25807-33.41942,2.70968-33.871-2.25807,15.35487-5.871,15.35487-5.871,14.45164-9.48389,16.70971-14.45164S719.86343,333.59612,719.86343,333.59612Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#2f2e41"
                  />
                  <path
                    d="M811.541,342.62839s10.83873,18.51617,8.12905,20.77424-29.09883,10.487-32.96781,10.83873c-4.96775.45161-8.58066-3.61291-4.51613-5.871s12.64518-11.742,12.64518-14.90326v-8.12905Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#2f2e41"
                  />
                  <path
                    d="M821.92814,221.5959s9.48389,11.742-5.41937,30.70974L791.67,283.9186s15.35486,24.38715,15.80648,37.03233,3.61291,9.9355,4.51614,15.35487,4.96775,2.70968,1.80645,6.77421-14.90325,7.67743-18.51616,4.51613a11.196,11.196,0,0,1-3.61291-9.03227c0-1.80646-6.3226-12.19357-6.77421-15.35487s-17.16132-28.90328-17.16132-28.90328-5.41937-15.35487.90322-23.93553,10.50059-20.75047,10.50059-20.75047-18.62963,22.55692-31.72643,27.97629c0,0-4.96775.90323-4.06453,3.1613s0,3.61291-1.35484,5.871-10.83873,28.45166-14,35.22587-1.80646,10.83873-5.41937,13.0968-19.871.45161-19.871-1.80646,2.25807-8.129,3.61291-11.29034,12.19358-39.742,11.29035-46.06461.45161-14.90325,7.22582-18.51616,41.09685-32.9678,42.90331-32.9678S821.92814,221.5959,821.92814,221.5959Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#2f2e41"
                  />
                  <circle
                    cx="588.56217"
                    cy="25.51219"
                    r="18.96778"
                    fill="#a0616a"
                  />
                  <path
                    d="M746.50864,133.53122s5.871,10.38712,13.0968,11.742-18.96778,22.12907-18.96778,22.12907-6.32259-19.871-11.742-20.77423S746.50864,133.53122,746.50864,133.53122Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#a0616a"
                  />
                  <path
                    d="M727.99248,175.98291c0,5.871,17.61293,22.58069,17.61293,22.58069l16.70971,14s.45162,4.96775,2.25807,5.41936,4.06452.45162,2.25807,3.1613-6.32259,8.58066-2.25807,9.48389a33.19905,33.19905,0,0,0,3.69869.35224c1.08394.06324,2.35741.12195,3.7891.17614,3.3419.11742,7.52385.19419,12.05355.16257q1.93071-.00678,3.929-.04515c17.07555-.33871,36.85625-2.30324,35.23944-8.77485-2.70968-10.83873-.90323-14.45164-6.77421-20.32262s-15.35486-26.1936-15.35486-26.1936-18.96778-32.06457-34.77426-32.06457l-3.28325-.8626a7.51865,7.51865,0,0,0-8.20578,3.15228c-3.17034,4.82775-8.16973,12.08067-11.09166,14.42-4.51614,3.61292-5.22068,1.02066-5.22068,1.02066S727.99248,170.11193,727.99248,175.98291Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#575a89"
                  />
                  <path
                    d="M768.1861,244.62821s-13.0968,20.32261-4.96775,23.93552,12.64518-21.22584,12.64518-21.22584Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#a0616a"
                  />
                  <path
                    d="M743.55383,129.58233c-.728-.09186-.95819-1.01038-1.08072-1.73382-.65615-3.87406-3.54323-7.54771-7.42237-8.1731a10.50968,10.50968,0,0,0-4.42234.3564,16.77941,16.77941,0,0,0-5.67433,2.793,9.35988,9.35988,0,0,1-2.83563,1.78059c-.71175.209-3.73378,1.55256-4.43989,1.77989-1.55246.4998-2.83715,2.12472-4.436,1.803-1.52966-.30781-2.1106-2.15493-2.35645-3.69575-.56011-3.51031,1.44913-8.748,3.44681-11.6883,1.516-2.23127,4.0813-3.51539,6.64622-4.3508a47.75242,47.75242,0,0,1,9.21763-1.83157c4.219-.49827,8.5887-.76263,12.63192.54148s7.72477,4.49426,8.47957,8.675c.15723.87088.18669,1.7629.37937,2.62663.47006,2.10707,1.8642,3.87819,2.67744,5.878a11.3188,11.3188,0,0,1-.3453,9.17585c-1.12613,2.26466-3.08447,4.44091-2.66184,6.93456l-3.48505-2.748a2.53111,2.53111,0,0,1-1.16328-2.96248l.50663-4.36376a3.8395,3.8395,0,0,0-.226-2.35932C745.4412,125.314,744.76757,129.73548,743.55383,129.58233Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#2f2e41"
                  />
                  <path
                    d="M776.31515,213.46686l-4.25417,17.6897c4.29033.15356,9.967.23485,15.98256.11742,1.51748-4.55227,2.96714-9.29874,4.07809-13.7426,4.06452-16.2581-2.70968-41.09685-6.32259-52.83881s-12.64519-14.90326-12.64519-14.90326a41.18516,41.18516,0,0,0-10.38711,5.41937C756.89576,159.2732,776.31515,213.46686,776.31515,213.46686Z"
                    transform="translate(-142.59161 -106.21258)"
                    opacity="0.1"
                  />
                  <path
                    d="M772.70224,212.56363l-4.43036,18.41679c1.08394.06324,2.35741.12195,3.7891.17614,3.3419.11742,7.52385.19419,12.05355.16257,1.63026-4.83676,3.2065-9.94,4.39419-14.691,4.06452-16.25809-2.70968-41.09685-6.32259-52.83881s-11.51615,1.129-11.51615,1.129,3.16129-7.67744-2.70969-3.61291S772.70224,212.56363,772.70224,212.56363Z"
                    transform="translate(-142.59161 -106.21258)"
                    opacity="0.1"
                  />
                  <path
                    d="M771.3474,148.88609s9.03227,3.16129,12.64518,14.90325,10.38712,36.58072,6.32259,52.83881S777.67,253.20887,777.67,253.20887s-8.58066-6.3226-11.742-4.96775l8.58066-35.67749S755.0893,158.37,760.96028,154.30545A41.185,41.185,0,0,1,771.3474,148.88609Z"
                    transform="translate(-142.59161 -106.21258)"
                    fill="#575a89"
                  />
                  <polygon
                    points="635.488 269.199 510.541 8.828 301.62 109.085 378.456 269.199 635.488 269.199"
                    fill="#f2f2f2"
                  />
                  <rect
                    x="495.4802"
                    y="243.49125"
                    width="123.08078"
                    height="7.6395"
                    transform="translate(-194.75884 159.12232) rotate(-25.6354)"
                    fill="#3f3d56"
                  />
                  <rect
                    x="524.85952"
                    y="304.71353"
                    width="123.08078"
                    height="7.6395"
                    transform="translate(-218.35428 177.85945) rotate(-25.6354)"
                    fill="#3f3d56"
                  />
                  <rect
                    x="637.96766"
                    y="186.32584"
                    width="30.55799"
                    height="30.55799"
                    transform="translate(-165.51243 196.25476) rotate(-25.6354)"
                    fill="#3f3d56"
                  />
                  <rect
                    x="667.34698"
                    y="247.54812"
                    width="30.55799"
                    height="30.55799"
                    transform="translate(-189.10786 214.9919) rotate(-25.6354)"
                    fill="#3f3d56"
                  />
                  <polygon
                    points="519.718 55.924 508.372 88.206 493.077 82.83 490.984 88.785 512.214 96.246 525.672 58.017 519.718 55.924"
                    fill="#57b894"
                  />
                  <polygon
                    points="549.097 117.146 537.751 149.428 522.457 144.053 520.364 150.007 541.593 157.468 555.052 119.239 549.097 117.146"
                    fill="#57b894"
                  />
                  <g
                    id="b6a4aa65-5bff-4dd4-a595-827386906092"
                    data-name="woman"
                  >
                    <rect
                      x="147.98395"
                      y="611.96674"
                      width="57.72353"
                      height="57.72353"
                      transform="translate(341.06453 1124.36413) rotate(167.94236)"
                      fill="#f2f2f2"
                    />
                    <path
                      id="ac286760-ef31-4470-8aba-995faff60c3b-88"
                      data-name="right hand"
                      d="M209.52991,591.4916s-20.73423,14.81016-13.82282,20.73423,20.73422-17.7722,20.73422-17.7722Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#ffb9b9"
                    />
                    <path
                      id="ad0ee0d5-d520-47bd-bca9-706ef112ee3c-89"
                      data-name="left leg"
                      d="M305.30228,614.20052s-3.94938,49.3672-4.93672,56.27861-1.97469,69.11408-3.94938,76.02549-3.94938,23.69625-3.94938,23.69625H280.61868s.98734-30.60766-1.97469-42.45579-1.97469-44.43048-1.97469-44.43048-5.92406-58.2533-2.962-66.15205S305.30228,614.20052,305.30228,614.20052Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#ffb9b9"
                    />
                    <path
                      id="a2d865fc-f989-4a0f-bdfe-5d1a04b5cb09-90"
                      data-name="left shoe"
                      d="M289.50477,767.23884s4.93672,2.962,4.93672,4.93672-.98734,6.91141,0,8.8861,7.89876,9.87344,3.94938,11.84813-21.72157,0-21.72157,0,.98734-13.82282,1.97469-14.81016-.98735-10.86079-.98735-10.86079Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#2f2e41"
                    />
                    <path
                      id="a5afd73e-dc2f-49f8-bb76-01b6bc8ff4ec-91"
                      data-name="right leg"
                      d="M229.82555,612.99062s-1.25432,49.509-.9979,56.4859-5.29085,68.93956-4.05254,76.02006,1.44026,23.97991,1.44026,23.97991l11.78267,1.24365s2.23088-30.54222,6.4202-42.014,6.62748-43.97776,6.62748-43.97776,12.006-57.30967,9.88939-65.4757S229.82555,612.99062,229.82555,612.99062Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#ffb9b9"
                    />
                    <path
                      id="bae9c969-98bd-41cd-ab49-dced4866e2f9-92"
                      data-name="right shoe"
                      d="M229.472,766.84173s-5.22036,2.42748-5.42764,4.39126.25643,6.97687-.93274,8.837-8.89149,8.98979-5.17121,11.36812,21.60158,2.28,21.60158,2.28.469-13.85009-.40922-14.93562,2.12191-10.69715,2.12191-10.69715Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#2f2e41"
                    />
                    <path
                      id="efa1face-c8d6-4f61-8a17-c81461288bfc-93"
                      data-name="pants"
                      d="M291.47946,540.14971s7.89875.98735,10.86079,17.7722,13.82281,59.24064,4.93672,62.20267-35.54439,8.8861-36.53173,6.91141-2.962-6.91141-2.962-6.91141,2.962,8.8861-.98734,8.8861-42.45579-5.92407-41.46845-8.8861,2.962-24.6836,2.962-24.6836,5.92407-36.53173,11.84813-42.45579a16.19188,16.19188,0,0,0,4.93672-12.83548Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#2f2e41"
                    />
                    <path
                      id="ba787e0e-2496-4127-9664-864bc1f1b460-94"
                      data-name="left hand"
                      d="M306.28962,532.251s-12.83547-2.962-14.81016.98734,4.93672,9.87345,7.89875,9.87345,7.89876-2.962,7.89876-2.962Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#ffb9b9"
                    />
                    <circle
                      id="af432612-84fe-4a80-a474-ad6710b59c23"
                      data-name="head"
                      cx="137.03973"
                      cy="324.34195"
                      r="17.77219"
                      fill="#ffb9b9"
                    />
                    <path
                      id="fc691572-079c-4ac7-a111-0c7206f484e6-95"
                      data-name="neck"
                      d="M276.6693,443.39s-2.962,13.82281-.98734,13.82281-14.81016,8.8861-14.81016,8.8861l-12.83548-1.97469-3.94937-5.92406s20.73422-13.82282,20.73422-21.72157S276.6693,443.39,276.6693,443.39Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#ffb9b9"
                    />
                    <path
                      id="a377c2ac-5aad-4dd5-94e4-d6887260be3a-96"
                      data-name="upper body"
                      d="M267.7832,457.21281s2.962-1.97468,3.94938-1.97468h7.89875c.98735,0,13.82282,2.962,13.82282,2.962l7.89875,44.43048s-13.82282,22.70891-3.94938,40.48111c0,0-2.962-1.97469-16.78484-.98735s-38.50642,3.94938-39.49377,3.94938-.98734-7.89876,0-9.87344-.98734-.98735-.98734-5.92407-2.962-13.82281-2.962-13.82281l-13.82282-50.35455s17.77219-9.87344,20.73423-8.8861,11.84813,3.94938,13.82281,2.962S267.7832,457.21281,267.7832,457.21281Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#ea7b2d"
                    />
                    <path
                      id="fd50713a-8150-4e39-832b-91f38638a5e4-97"
                      data-name="left arm"
                      d="M290.49212,459.1875l2.962-.98734s5.92406-.98735,12.83547,4.93672S338.872,486.83314,338.872,486.83314s9.87344,7.89875,6.91141,16.78484-7.89875,30.60767-22.70891,29.62032c0,0-8.8861,11.84813-13.82282,9.87345s-8.88609-9.87345-5.92406-10.86079,10.86078-10.86078,10.86078-10.86078l-9.87344-18.75954h-2.962l-10.86078-5.92406Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#ea7b2d"
                    />
                    <path
                      id="a85ddca5-281c-4897-a8aa-82a4133bac02-98"
                      data-name="right arm"
                      d="M231.25147,465.11157l-7.89875.98734s-6.91141,2.962-5.92406,15.7975-5.92407,71.08878-2.962,78.00018c0,0-9.87344,33.5697-7.89876,34.557s13.82282,6.91141,12.83548,2.962,10.86078-31.595,10.86078-31.595,13.82282-14.81016,7.89875-35.54439V513.49142Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#ea7b2d"
                    />
                    <path
                      id="eb14ef5a-0bc4-48da-8b11-b0e113a7ef46-99"
                      data-name="hair"
                      d="M294.42253,447.737l-12.55176,2.73445-1.613-6.18045.6202,6.39679L260.62935,455.099l-.89049-3.41192.34233,3.53138-12.9691,2.82538-2.77438-26.632c-2.85224-10.92841,7.55753-22.576,18.48589-25.42826l4.84809-1.26532c8.02653-2.09487,22.61655-.19014,24.71141,7.83633C288.71652,426.54868,282.46607,441.89025,294.42253,447.737Z"
                      transform="translate(-142.59161 -106.21258)"
                      fill="#2f2e41"
                    />
                  </g>
                </svg>

                <p className="text-[#363636] text-[14px] font-medium">
                  Great! You have answered all the questions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
