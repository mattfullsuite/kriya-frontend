import moment from "moment";
import { useRef, useState, useEffect } from "react";
import AllTasks from "./north-star-components/task-assigned/AllTasks";
import MyTasks from "./north-star-components/task-assigned/MyTasks";
import MyTeam from "./north-star-components/task-assigned/MyTeam";
import AllFinishedTasks from "./north-star-components/task-assigned/AllFinishedTasks";
import MyFinishedTasks from "./north-star-components/task-assigned/MyFinishedTasks";
import FinishedMyTeamTasks from "./north-star-components/task-assigned/FinishedMyTeamTasks";
import axios from "axios";
import { useCookies } from "react-cookie";
import AllReviewTasks from "./north-star-components/for-review/AllReviewTasks";
import MyReviewTasks from "./north-star-components/for-review/MyReviewTasks";
import TeamReviewTasks from "./north-star-components/for-review/TeamReviewTasks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyFailed, notifySuccess } from "../../../../../assets/toast";
import TasksOfDownline from "./north-star-components/TasksOfDownline";

const NorthStar = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  lightColor,
  accentColor,
  focusBorder,
  progressColor,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [notif, setNotif] = useState("");

  const [activeTab, setActiveTab] = useState(1);

  const [finishedActiveTab, setFinishedActiveTab] = useState(1);

  const [isAdding, setIsAdding] = useState(false);

  const [isTrue, setIsTrue] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const newTaskRef = useRef(null);

  const finishTaskRef = useRef(null);
  const notesRef = useRef(null);

  const taskChevron = useRef(null);
  const tasksRef = useRef(null);

  const reviewChevron = useRef(null);
  const reviewRef = useRef(null);
  const [reviewTab, setReviewTab] = useState(1);

  const downlineRef = useRef(null);
  const downlineChevron = useRef(null);

  const [taskInfo, setTaskInfo] = useState({
    assignee_id: "",
    target_task: "",
    target_date: "",
  });

  const [cookie, setCookie] = useCookies(["user"]);

  const [northStarInfo, setNorthStarInfo] = useState([]);

  const [myDownline, setMyDownline] = useState([]);

  const [sameLineTasks, setSameLineTasks] = useState([]);
  const [myTeamTasks, setMyTeamTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);

  const [forReview, setForReview] = useState([]);

  const [myFinishedTasks, setMyFinishedTasks] = useState([]);
  const [teamFinishedTasks, setTeamFinishedTasks] = useState([]);

  const [downlineTasks, setDownlineTasks] = useState([]);

  const [totalPercentage, setTotalPercentage] = useState();
  const [finishedPercentage, setFinishedPercentage] = useState();

  const teamNewTaskAssigneeRef = useRef(null);
  const teamNewTargetTaskRef = useRef(null);
  const teamNewTargetDateRef = useRef(null);
  const teamNewNoteRef = useRef(null);

  const [approver, setApprover] = useState([]);

  useEffect(() => {
    const fetchNorthStarData = async () => {
      // Get NorthStar
      await axios
        .get(BASE_URL + "/ns-getMyOwnNorthStar")
        .then((response) => {
          if (response.data.length === 0) {
            setIsTrue(false);
          } else {
            setNorthStarInfo(response.data);
            setIsTrue(true);
          }
        })
        .catch((err) => {
          console.log("Error in getting north star: " + err);
        });

      // Get my downlines
      await axios
        .get(BASE_URL + "/ns-getMyDownlines")
        .then((response) => {
          setMyDownline(response.data);
        })
        .catch((err) => {
          console.log("Error in getting downline: " + err);
        });

      // Get same line tasks
      await axios
        .get(BASE_URL + "/ns-getSameLineTasks")
        .then((response) => {
          setSameLineTasks(response.data);
        })
        .catch((err) => {
          console.log("Error in getting same line tasks: " + err);
        });

      // Get my team tasks
      await axios
        .get(BASE_URL + "/ns-getMyTeamTasks")
        .then((response) => {
          setMyTeamTasks(response.data);
          console.log("Team");
          //console.log(response.data);
        })
        .catch((err) => {
          console.log("Error in getting my team tasks: " + err);
        });

      //Get my tasks
      await axios
        .get(BASE_URL + "/ns-getTasksForReview")
        .then((response) => {
          setForReview(response.data);
        })
        .catch((err) => {
          console.log("Error in getting my tasks: " + err);
        });

      //Finished Same Line Tasks
      await axios
        .get(BASE_URL + "/ns-getFinishedSameLineTasks")
        .then((response) => {
          setTeamFinishedTasks(response.data);
        })
        .catch((err) => {
          console.log("Error in getting my tasks: " + err);
        });

      //Finished My Tasks
      await axios
        .get(BASE_URL + "/ns-getMyFinishedTasks")
        .then((response) => {
          setMyFinishedTasks(response.data);
        })
        .catch((err) => {
          console.log("Error in getting my tasks: " + err);
        });

      //"/ns-getDownlineTasks"

      await axios
        .get(BASE_URL + "/ns-getDownlineTasks")
        .then((response) => {
          setDownlineTasks(response.data);
        })
        .catch((err) => {
          console.log("Error in getting my tasks: " + err);
        });

      await axios
        .get(BASE_URL + "/ns-getApproverOfUser")
        .then((response) => {
          setApprover(response.data[0]);
        })
        .catch((err) => {
          console.log("Error in getting my tasks: " + err);
        });
    };
    fetchNorthStarData();
  }, []);

  const handleSubmit = () => {
    axios
      .post(BASE_URL + "/ns-insertNorthStar", northStarInfo)
      .then((response) => {
        notifySuccess("Saved successfully");
        setNorthStarInfo([
          { ...northStarInfo[0], north_star_id: response.data[0].id },
        ]);

        setNotif("success");
      })
      .catch((err) => {
        notifyFailed(err.message);
        setNotif("error");
      });
  };

  const handleEditNorthStar = () => {
    axios
      .post(BASE_URL + "/ns-editNorthStarGoal", northStarInfo)
      .then((response) => {
        setIsEditing(false);
        notifySuccess("Edited successfully!");
        setNotif("success");
      })
      .catch((err) => {
        notifyFailed(err.message);
        setNotif("error");
      });
  };

  const handleTaskSubmit = () => {
    axios
      .post(BASE_URL + "/ns-insertNorthStarGoalTeam", taskInfo)
      .then((response) => {
        if (response.data[0].assignee_id == cookie.user.emp_id) {
          setSameLineTasks([...sameLineTasks, response.data[0]]);
          setMyTasks([...myTasks, response.data[0]]);

          teamNewTaskAssigneeRef.current.value = "";
          teamNewTargetTaskRef.current.value = "";
          teamNewTargetDateRef.current.value = "";
          teamNewNoteRef.current.value = "";

          setTaskInfo({
            ...taskInfo,
            assignee_id: "",
            target_date: "",
            target_task: "",
          });
        } else {
          setSameLineTasks([...sameLineTasks, response.data[0]]);
          setMyTeamTasks([...myTeamTasks, response.data[0]]);
          teamNewTaskAssigneeRef.current.value = "";
          teamNewTargetTaskRef.current.value = "";
          teamNewTargetDateRef.current.value = "";
          teamNewNoteRef.current.value = "";

          setTaskInfo({
            ...taskInfo,
            assignee_id: "",
            target_date: "",
            target_task: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function setStatus(status) {
    if (status == 1) {
      return (
        <p className="py-1 px-2 rounded-full border-2 border-[#363636] font-medium text-[12px] select-none">
          Pending
        </p>
      );
    } else if (status == 2) {
      return (
        <p className="py-1 px-2 rounded-full border-2 border-[#363636] font-medium text-[12px] select-none">
          On Hold
        </p>
      );
    } else if (status == 3) {
      return (
        <p className="py-1 px-2 rounded-full border-2 border-[#363636] font-medium text-[12px] select-none">
          In Progress
        </p>
      );
    } else if (status == 8) {
      return (
        <p className="py-1 px-2 rounded-full border-2 border-[#363636] font-medium text-[12px] select-none">
          Returned
        </p>
      );
    } else if (status == 9) {
      return (
        <p className="py-1 px-2 rounded-full border-2 border-[#363636] font-medium text-[12px] select-none">
          For Review
        </p>
      );
    } else if (status == 0) {
      return (
        <p className="py-1 px-2 rounded-full border-2 border-[#363636] font-medium text-[12px]">
          Finished
        </p>
      );
    }
  }

  function handleTaskRef() {
    if (tasksRef.current.classList.contains("max-h-0")) {
      tasksRef.current.classList.add("max-h-[1000px]");
      tasksRef.current.classList.remove("max-h-0");
      taskChevron.current.classList.add("-rotate-180");
    } else {
      tasksRef.current.classList.remove("max-h-[1000px]");
      tasksRef.current.classList.add("max-h-0");
      taskChevron.current.classList.remove("-rotate-180");
    }
  }

  function handleReviewRef() {
    if (reviewRef.current.classList.contains("max-h-0")) {
      reviewRef.current.classList.add("max-h-[1000px]");
      reviewRef.current.classList.remove("max-h-0");
      reviewChevron.current.classList.add("-rotate-180");
    } else {
      reviewRef.current.classList.remove("max-h-[1000px]");
      reviewRef.current.classList.add("max-h-0");
      reviewChevron.current.classList.remove("-rotate-180");
    }
  }

  function handleDownlineRef() {
    if (downlineRef.current.classList.contains("max-h-0")) {
      downlineRef.current.classList.add("max-h-[1000px]");
      downlineRef.current.classList.remove("max-h-0");
      downlineChevron.current.classList.add("-rotate-180");
    } else {
      downlineRef.current.classList.remove("max-h-[1000px]");
      downlineRef.current.classList.add("max-h-0");
      downlineChevron.current.classList.remove("-rotate-180");
    }
  }

  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}

      <div className="box-border grid mt-10 bg-white p-10 rounded-[15px] shadow-md">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2">
            <svg
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 ${fillColor}`}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.99946 3.5C8.16242 3.50003 8.32094 3.55315 8.45103 3.6513C8.58112 3.74945 8.6757 3.8873 8.72046 4.044L9.53346 6.89C9.70851 7.50292 10.0369 8.0611 10.4876 8.51183C10.9384 8.96255 11.4965 9.29095 12.1095 9.466L14.9555 10.279C15.1121 10.3239 15.2498 10.4185 15.3478 10.5486C15.4459 10.6786 15.4989 10.8371 15.4989 11C15.4989 11.1629 15.4459 11.3214 15.3478 11.4514C15.2498 11.5815 15.1121 11.6761 14.9555 11.721L12.1095 12.534C11.4965 12.7091 10.9384 13.0374 10.4876 13.4882C10.0369 13.9389 9.70851 14.4971 9.53346 15.11L8.72046 17.956C8.6756 18.1126 8.58098 18.2503 8.4509 18.3484C8.32082 18.4464 8.16235 18.4995 7.99946 18.4995C7.83657 18.4995 7.6781 18.4464 7.54802 18.3484C7.41794 18.2503 7.32332 18.1126 7.27846 17.956L6.46546 15.11C6.29041 14.4971 5.96201 13.9389 5.51129 13.4882C5.06056 13.0374 4.50238 12.7091 3.88946 12.534L1.04346 11.721C0.886864 11.6761 0.749131 11.5815 0.651082 11.4514C0.553033 11.3214 0.5 11.1629 0.5 11C0.5 10.8371 0.553033 10.6786 0.651082 10.5486C0.749131 10.4185 0.886864 10.3239 1.04346 10.279L3.88946 9.466C4.50238 9.29095 5.06056 8.96255 5.51129 8.51183C5.96201 8.0611 6.29041 7.50292 6.46546 6.89L7.27846 4.044C7.32322 3.8873 7.4178 3.74945 7.54789 3.6513C7.67798 3.55315 7.8365 3.50003 7.99946 3.5ZM16.9995 0.5C17.1668 0.499907 17.3293 0.555764 17.4612 0.658686C17.5931 0.761609 17.6869 0.905686 17.7275 1.068L17.9855 2.104C18.2215 3.044 18.9555 3.778 19.8955 4.014L20.9315 4.272C21.0941 4.31228 21.2385 4.40586 21.3418 4.5378C21.445 4.66974 21.5011 4.83246 21.5011 5C21.5011 5.16754 21.445 5.33026 21.3418 5.4622C21.2385 5.59414 21.0941 5.68772 20.9315 5.728L19.8955 5.986C18.9555 6.222 18.2215 6.956 17.9855 7.896L17.7275 8.932C17.6872 9.09463 17.5936 9.23908 17.4617 9.34233C17.3297 9.44558 17.167 9.50168 16.9995 9.50168C16.8319 9.50168 16.6692 9.44558 16.5373 9.34233C16.4053 9.23908 16.3117 9.09463 16.2715 8.932L16.0135 7.896C15.8981 7.43443 15.6594 7.0129 15.323 6.67648C14.9866 6.34005 14.565 6.10139 14.1035 5.986L13.0675 5.728C12.9048 5.68772 12.7604 5.59414 12.6571 5.4622C12.5539 5.33026 12.4978 5.16754 12.4978 5C12.4978 4.83246 12.5539 4.66974 12.6571 4.5378C12.7604 4.40586 12.9048 4.31228 13.0675 4.272L14.1035 4.014C14.565 3.89861 14.9866 3.65995 15.323 3.32352C15.6594 2.9871 15.8981 2.56557 16.0135 2.104L16.2715 1.068C16.3121 0.905686 16.4058 0.761609 16.5377 0.658686C16.6696 0.555764 16.8321 0.499907 16.9995 0.5ZM15.4995 14C15.657 13.9999 15.8105 14.0494 15.9383 14.1415C16.0661 14.2336 16.1617 14.3636 16.2115 14.513L16.6055 15.696C16.7555 16.143 17.1055 16.495 17.5535 16.644L18.7365 17.039C18.8854 17.089 19.0149 17.1845 19.1067 17.3121C19.1984 17.4397 19.2478 17.5929 19.2478 17.75C19.2478 17.9071 19.1984 18.0603 19.1067 18.1879C19.0149 18.3155 18.8854 18.411 18.7365 18.461L17.5535 18.856C17.1065 19.006 16.7545 19.356 16.6055 19.804L16.2105 20.987C16.1604 21.136 16.0649 21.2655 15.9373 21.3572C15.8098 21.4489 15.6566 21.4983 15.4995 21.4983C15.3423 21.4983 15.1892 21.4489 15.0616 21.3572C14.934 21.2655 14.8385 21.136 14.7885 20.987L14.3935 19.804C14.3198 19.5833 14.1958 19.3827 14.0313 19.2182C13.8667 19.0537 13.6662 18.9297 13.4455 18.856L12.2625 18.461C12.1135 18.411 11.984 18.3155 11.8923 18.1879C11.8005 18.0603 11.7512 17.9071 11.7512 17.75C11.7512 17.5929 11.8005 17.4397 11.8923 17.3121C11.984 17.1845 12.1135 17.089 12.2625 17.039L13.4455 16.644C13.8925 16.494 14.2445 16.144 14.3935 15.696L14.7885 14.513C14.8382 14.3637 14.9336 14.2339 15.0612 14.1418C15.1888 14.0497 15.3421 14.0001 15.4995 14Z"
              />
            </svg>

            <p className={`text-[18px] font-bold text-[#008080] ${textColor}`}>
              North Star
            </p>
          </div>

          {/* save button */}
          {isAdding && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsAdding(false)}
                className="transition-all ease-in-out duration-300 h-12 min-w-12 rounded-full bg-[#c3c3c3] hover:bg-[#9e9e9e] flex justify-center items-center px-3 group/save shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-white"
                >
                  <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                </svg>

                <span className="transition-all ease-in-out duration-300 text-[14px] text-white overflow-hidden w-0 group-hover/save:w-12">
                  Cancel
                </span>
              </button>

              <button
                onClick={() => {
                  setIsAdding(false);
                  setIsTrue(true);
                  handleSubmit();
                }}
                className={`transition-all ease-in-out duration-300 h-12 min-w-12 rounded-full ${bgColor} ${hoverColor} flex justify-center items-center px-3 group/save shadow-xl`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-white"
                >
                  <path d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z"></path>
                </svg>

                <span className="transition-all ease-in-out duration-300 text-[14px] text-white overflow-hidden w-0 group-hover/save:w-10">
                  Save
                </span>
              </button>
            </div>
          )}

          {isTrue &&
            (isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="transition-all ease-in-out duration-300 h-12 min-w-12 rounded-full bg-[#c3c3c3] hover:bg-[#9e9e9e] flex justify-center items-center px-3 group/save shadow-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-white"
                  >
                    <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                  </svg>

                  <span className="transition-all ease-in-out duration-300 text-[14px] text-white overflow-hidden w-0 group-hover/save:w-12">
                    Cancel
                  </span>
                </button>
                <button
                  onClick={handleEditNorthStar}
                  className={`transition-all ease-in-out duration-300 h-12 min-w-12 rounded-full ${bgColor} ${hoverColor} flex justify-center items-center px-3 group/save shadow-xl`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-white"
                  >
                    <path d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z"></path>
                  </svg>

                  <span className="transition-all ease-in-out duration-300 text-[14px] text-white overflow-hidden w-0 group-hover/save:w-10">
                    Save
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className={`transition-all ease-in-out duration-300 h-12 min-w-12 rounded-full ${bgColor} ${hoverColor} flex justify-center items-center px-3 group/save shadow-xl`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-white"
                >
                  <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                  <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
                </svg>

                <span className="transition-all ease-in-out duration-300 text-[14px] text-white overflow-hidden w-0 group-hover/save:w-10">
                  Edit
                </span>
              </button>
            ))}
        </div>

        {isTrue ? (
          isEditing ? (
            <div className="mt-16 flex flex-col gap-3">
              <input
                type="text"
                onChange={(event) => {
                  setNorthStarInfo([
                    { ...northStarInfo[0], target_goal: event.target.value },
                  ]);
                }}
                name="north_star"
                value={northStarInfo[0].target_goal}
                className={`transition ease-in-out outline-none border border-[#e4e4e4] ${focusBorder} rounded-[8px] p-2 max-w-[250px] text-[14px] text-[#363636]`}
                placeholder="Type your North Star here"
              />
              <input
                type="text"
                onChange={(event) => {
                  setNorthStarInfo([
                    { ...northStarInfo[0], target_desc: event.target.value },
                  ]);
                }}
                name="north_star_desc"
                value={northStarInfo[0].target_desc}
                className={`transition ease-in-out outline-none border border-[#e4e4e4] ${focusBorder} rounded-[8px] p-2 text-[14px] text-[#363636]`}
                placeholder="Add a short description or information about your North Star"
              />
            </div>
          ) : (
            <div className="mt-10">
              <div>
                <p className={`text-[20px] font-medium ${textColor}`}>
                  {northStarInfo[0].target_goal}
                </p>

                <p className={`text-[16px] ${textColor}`}>
                  {northStarInfo[0].target_desc}
                </p>
              </div>

              <div className="mt-10">
                <p className={`text-[15px] font-bold ${textColor}`}>
                  My Superior & Team
                </p>

                <p className={`text-[14px] ${textColor}`}>
                  Contributors to the completion of your north star will
                  automatically be your downline.
                </p>

                <div className="flex flex-row justify-start items-center gap-2 mt-2">
                  <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    <div className="avatar">
                      <div className="w-12">
                        <div
                          className={`box-border w-12 h-12 rounded-full bg-[#d9d9d9] flex justify-center items-center ${textColor} font-bold text-[20px]`}
                        >
                          {approver.f_name?.charAt(0) +
                            approver.s_name?.charAt(0)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-10 border-l border-[0.5px] border-[#e4e4e4]" />

                  <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    {myDownline.map((md) => (
                      <div className="avatar">
                        <div className="w-12">
                          {md.emp_pic != null ? (
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                          ) : (
                            <div
                              className={`box-border w-12 h-12 rounded-full bg-[#d9d9d9] flex justify-center items-center ${textColor} font-bold text-[20px]`}
                            >
                              {md.f_name.charAt(0) + md.s_name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* <p className="text-[14px] text-[#008080] text-right">
                60% complete
              </p>

              <div className="mt-2 w-full h-3 bg-[#e5e5e5] rounded-full relative">
                <div className="transition-all ease-out duration-300 w-[60%] h-3 bg-[#008080] rounded-full absolute" />
              </div> */}

              <p className={`text-[14px] text-right ${textColor}`}>
                {/* {((teamFinishedTasks.length / sameLineTasks.length) * 100).toFixed(2) + "%"} */}
                60%
              </p>

              <progress
                className={`progress ${progressColor} h-3 w-full`}
                //value={((teamFinishedTasks.length / sameLineTasks.length) * 100).toFixed(2)}
                value="60"
                max="100"
              ></progress>
            </div>
          )
        ) : (
          <>
            {isAdding ? (
              <div className="mt-16 flex flex-col gap-3">
                <input
                  type="text"
                  onChange={(event) => {
                    setNorthStarInfo([
                      { ...northStarInfo[0], target_goal: event.target.value },
                    ]);
                  }}
                  name="target_goal"
                  className={`transition ease-in-out outline-none border border-[#e4e4e4] ${focusBorder} rounded-[8px] p-2 max-w-[250px] text-[14px] text-[#363636]`}
                  placeholder="Type your North Star here"
                />
                <input
                  type="text"
                  onChange={(event) => {
                    setNorthStarInfo([
                      { ...northStarInfo[0], target_desc: event.target.value },
                    ]);
                  }}
                  name="target_desc"
                  className={`transition ease-in-out outline-none border border-[#e4e4e4] ${focusBorder} rounded-[8px] p-2 text-[14px] text-[#363636]`}
                  placeholder="Add a short description or information about your North Star"
                />
              </div>
            ) : (
              <div className="mt-16">
                <p className={`text-[15px] font-bold ${textColor}`}>
                  Add your Team’s Goal
                </p>

                <p className={`text-[14px] ${textColor}`}>
                  You have not added your North Star yet!{" "}
                  <span
                    className="underline select-none cursor-pointer"
                    onClick={() => {
                      setIsAdding(true);
                    }}
                  >
                    Add it here.
                  </span>
                </p>
              </div>
            )}

            <div className="mt-10">
              <p className={`text-[15px] font-bold ${textColor}`}>
                My Superior & Team
              </p>

              <p className={`text-[14px] ${textColor}`}>
                Contributors to the completion of your north star will
                automatically be your downline.
              </p>

              <div className="flex flex-row justify-start items-center gap-2 mt-2">
                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                  <div className="avatar">
                    <div className="w-12">
                      <div
                        className={`box-border w-12 h-12 rounded-full bg-[#d9d9d9] flex justify-center items-center ${textColor} font-bold text-[20px]`}
                      >
                        MB
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-10 border-l border-[0.5px] border-[#e4e4e4]" />

                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                  {myDownline.map((md) => (
                    <div className="avatar">
                      <div className="w-12">
                        {md.emp_pic != null ? (
                          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        ) : (
                          <div
                            className={`box-border w-12 h-12 rounded-full bg-[#d9d9d9] flex justify-center items-center ${textColor} font-bold text-[20px]`}
                          >
                            {md.f_name.charAt(0) + md.s_name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Tasks assigned */}

        <div className="flex flex-row justify-between items-center pt-3 border-t border-[#e4e4e4] mt-10">
          <div className="flex flex-row justify-start items-center gap-1">
            <p className="text-[16px] font-bold text-[#363636]">
              Tasks Assigned
            </p>

            {sameLineTasks.length != 0 && (
              <span
                className={`${bgColor} leading-none w-5 h-5 flex justify-center items-center font-medium rounded-full text-white text-[12px]`}
              >
                {sameLineTasks.length}
              </span>
            )}
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`transition ease-in-out w-6 h-6 ${fillColor} cursor-pointer`}
            ref={taskChevron}
            onClick={handleTaskRef}
          >
            <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
          </svg>
        </div>

        <div
          ref={tasksRef}
          className="transition-all ease-in-out duration-500 w-full max-h-0 overflow-hidden"
        >
          <div className="pt-10">
            <div
              className={`flex flex-row justify-between p-3 rounded-[12px] gap-2`}
            >
              <div className="flex flex-row justify-start gap-2 w-full mb-1">
                {/* <input
                  type="text"
                  className="outline-none text-[14px] text-[#363636] p-2 rounded-[6px] flex-1"
                  placeholder="Search a Task"
                /> */}

                <button
                  onClick={() => newTaskRef.current.showModal()}
                  className={`outline-none flex flex-row justify-center items-center gap-1 ${bgColor} py-2 px-3 rounded-[6px]`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-white h-5"
                  >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                  </svg>

                  <span className="text-white text-[14px] ">
                    Add a New Task
                  </span>
                </button>
              </div>
            </div>

            <AllTasks
              setStatus={setStatus}
              allTasksData={sameLineTasks}
              forReview={forReview}
              setForReview={setForReview}
              bgColor={bgColor}
              hoverColor={hoverColor}
              disabledColor={disabledColor}
              fillColor={fillColor}
              textColor={textColor}
              lightColor={lightColor}
              accentColor={accentColor}
              focusBorder={focusBorder}
            />

            <button
              onClick={() => finishTaskRef.current.showModal()}
              className={`outline-none float-end mt-10 text-[14px] ${textColor} underline`}
            >
              See Finished Tasks
            </button>
          </div>
        </div>

        {/* For Review */}

        <div className="flex flex-row justify-between items-center pt-3 border-t border-[#e4e4e4] mt-10">
          <div className="flex flex-row justify-start items-center gap-1">
            <p className="text-[16px] font-bold text-[#363636]">
              Tasks To Review
            </p>

            {forReview.length != 0 && (
              <span
                className={`${bgColor} leading-none w-5 h-5 flex justify-center items-center font-medium rounded-full text-white text-[12px]`}
              >
                {forReview.length}
              </span>
            )}
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`transition ease-in-out w-6 h-6 ${fillColor} cursor-pointer`}
            ref={reviewChevron}
            onClick={handleReviewRef}
          >
            <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
          </svg>
        </div>

        <div
          ref={reviewRef}
          className="transition-all ease-in-out duration-500 w-full max-h-0 overflow-hidden"
        >
          <div className="pt-10">
            {/* <div
              className={`"flex flex-row justify-between ${lightColor} p-3 rounded-[12px] gap-2"`}
            >
              <div className="flex flex-row justify-start gap-2 w-[60%]">
                <input
                  type="text"
                  className="outline-none text-[14px] text-[#363636] p-2 rounded-[6px] flex-1"
                  placeholder="Search a Task"
                />

                <select className="outline-none text-[14px] text-[#363636] p-2 rounded-[6px] w-[100px]">
                  <option>Filter</option>
                </select>
              </div>
            </div> */}

            <AllReviewTasks
              setStatus={setStatus}
              allTasksData={forReview}
              setAllTasksData={setForReview}
              sameLineTasks={sameLineTasks}
              setSameLineTasks={setSameLineTasks}
              teamFinishedTasks={teamFinishedTasks}
              setTeamFinishedTasks={setTeamFinishedTasks}
              bgColor={bgColor}
              hoverColor={hoverColor}
              disabledColor={disabledColor}
              fillColor={fillColor}
              textColor={textColor}
              lightColor={lightColor}
              accentColor={accentColor}
              focusBorder={focusBorder}
            />
          </div>
        </div>

        {/* For Downline */}

        {downlineTasks != null && (
          <div className="flex flex-row justify-between items-center pt-3 border-t border-[#e4e4e4] mt-10">
            <div className="flex flex-row justify-start items-center gap-1">
              <p className="text-[16px] font-bold text-[#363636]">
                Third-Level Task List
              </p>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`transition ease-in-out w-6 h-6 ${fillColor} cursor-pointer`}
              ref={downlineChevron}
              onClick={handleDownlineRef}
            >
              <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
            </svg>
          </div>
        )}

        <div
          ref={downlineRef}
          className="transition-all ease-in-out duration-500 w-full max-h-0 overflow-hidden"
        >
          {/* <div
            className={`flex flex-row justify-between ${lightColor} p-3 rounded-[12px] gap-2`}
          >
            <div className="flex flex-row justify-start gap-2 w-[60%]">
              <input
                type="text"
                className="outline-none text-[14px] text-[#363636] p-2 rounded-[6px] flex-1"
                placeholder="Search a Task"
              />

              <select className="outline-none text-[14px] text-[#363636] p-2 rounded-[6px] w-[100px]">
                  <option>Filter</option>
                </select>
            </div>
          </div> */}

          <TasksOfDownline
            setStatus={setStatus}
            taskDownlineData={downlineTasks}
            bgColor={bgColor}
            hoverColor={hoverColor}
            disabledColor={disabledColor}
            fillColor={fillColor}
            textColor={textColor}
            lightColor={lightColor}
            accentColor={accentColor}
            focusBorder={focusBorder}
          />
        </div>
      </div>

      <dialog className="modal" ref={newTaskRef}>
        <div className="modal-box">
          <div className="flex flex-row justify-between items-center">
            <p className="text-[16px] text-[#363636] font-bold">
              Add a New Task
            </p>

            <button
              onClick={() => {
                newTaskRef.current.close();
                teamNewTaskAssigneeRef.current.value = "";
                teamNewTargetTaskRef.current.value = "";
                teamNewTargetDateRef.current.value = "";

                setTaskInfo({
                  ...taskInfo,
                  assignee_id: "",
                  target_date: "",
                  target_task: "",
                });
              }}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          <div className="mt-3">
            <label className="text-[12px] text-[#363636] font-medium">
              Assign to <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full outline-none transition-all border border-[#e4e4e4] rounded-[8px] p-2 text-[14px] text-[#363636] ${focusBorder}`}
              name="assignee_id"
              onChange={(event) => {
                setTaskInfo({
                  ...taskInfo,
                  assignee_id: event.target.value,
                });
              }}
              ref={teamNewTaskAssigneeRef}
            >
              <option value={""}>Assign downline</option>
              {myDownline.map(
                (d) =>
                  d.emp_id != cookie.user.emp_id && (
                    <option value={d.emp_id}>
                      {d.f_name + " " + d.s_name}
                    </option>
                  )
              )}
            </select>
          </div>

          <div className="mt-3">
            <label className="text-[12px] text-[#363636] font-medium">
              Goal <span className="text-red-500">*</span>
            </label>
            <textarea
              name="target_task"
              onChange={(event) => {
                setTaskInfo({
                  ...taskInfo,
                  target_task: event.target.value,
                });
              }}
              ref={teamNewTargetTaskRef}
              className={`outline-none transition-all h-[100px] resize-none w-full border border-[#e4e4e4] ${focusBorder} rounded-[8px] p-2 text-[14px] text-[#363636]`}
            />
          </div>

          <div className="mt-3">
            <label className="text-[12px] text-[#363636] font-medium">
              Target date <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="date"
              name="target_date"
              onChange={(event) => {
                setTaskInfo({
                  ...taskInfo,
                  target_date: event.target.value,
                });
              }}
              ref={teamNewTargetDateRef}
              className={`outline-none transition-all border border-[#e4e4e4] ${focusBorder} rounded-[8px] text-[14px] text-[#363636] p-2`}
            />
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button
              className={`outline-none ${bgColor} ${disabledColor} py-2 px-3 rounded-[8px] text-white text-[14px]`}
              onClick={() => {
                newTaskRef.current.close();
                handleTaskSubmit();
              }}
              disabled={
                taskInfo.assignee_id == "" ||
                taskInfo.target_date == "" ||
                taskInfo.target_task == ""
                  ? true
                  : false
              }
            >
              Add Task
            </button>

            <button
              onClick={() => {
                teamNewTaskAssigneeRef.current.value = "";
                teamNewTargetTaskRef.current.value = "";
                teamNewTargetDateRef.current.value = "";
                teamNewNoteRef.current.value = "";

                setTaskInfo({
                  ...taskInfo,
                  assignee_id: "",
                  target_date: "",
                  target_task: "",
                });

                newTaskRef.current.close();
              }}
              className="outline-none bg-[#e4e4e4] py-2 px-3 rounded-[8px] text-[#363636] text-[14px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <dialog className="modal" ref={finishTaskRef}>
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex flex-row justify-between items-center">
            <p className="text-[16px] text-[#363636] font-bold">
              Finished Tasks
            </p>

            <button
              onClick={() => finishTaskRef.current.close()}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          {/* <div
            className={`flex flex-row justify-between ${lightColor} p-3 rounded-[12px] gap-2 mt-5`}
          >
            <div className="flex flex-row justify-start gap-2 w-[60%]">
              <input
                type="text"
                className="outline-none text-[14px] text-[#363636] p-2 rounded-[6px] flex-1"
                placeholder="Search a Task"
              />

              <select className="outline-none text-[14px] text-[#363636] p-2 rounded-[6px] w-[120px]">
                <option>Filter</option>
              </select>
            </div> */}

          {/* 
            <div className="border-r border-[#aeaeae]" />

            <div className="flex flex-row justify-between w-[40%]">
              <button
                onClick={() => setFinishedActiveTab(1)}
                className={`flex-1 text-[14px] rounded-[8px] ${
                  finishedActiveTab === 1
                    ? ` text-white bg-[#008080]`
                    : `text-[#008080]`
                }`}
              >
                All
              </button>

              <button
                onClick={() => setFinishedActiveTab(2)}
                className={`flex-1 text-[14px] rounded-[8px] ${
                  finishedActiveTab === 2
                    ? ` text-white bg-[#008080]`
                    : `text-[#008080]`
                }`}
              >
                My Tasks
              </button>

              <button
                onClick={() => setFinishedActiveTab(3)}
                className={`flex-1 text-[14px] rounded-[8px] ${
                  finishedActiveTab === 3
                    ? ` text-white bg-[#008080]`
                    : `text-[#008080]`
                }`}
              >
                My Team
              </button>
            </div> */}
          {/*  */}

          <FinishedMyTeamTasks
            setStatus={setStatus}
            finishedTasksData={teamFinishedTasks}
            cookie={cookie}
            bgColor={bgColor}
            hoverColor={hoverColor}
            disabledColor={disabledColor}
            fillColor={fillColor}
            textColor={textColor}
            lightColor={lightColor}
            accentColor={accentColor}
            focusBorder={focusBorder}
          />
        </div>
      </dialog>
    </>
  );
};

export default NorthStar;
