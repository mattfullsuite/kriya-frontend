import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import Headings from "../../components/universal/Headings";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import FinishedMyTeamTasks from "./my-team/components/team-performance-management/north-star-components/task-assigned/FinishedMyTeamTasks";
import MyFinishedTasks from "./my-team/components/team-performance-management/north-star-components/task-assigned/MyFinishedTasks";
import PerformanceCalibration from "./my-performance/PerformanceCalibration";
import FeedbackRequest from "./my-performance/FeedbackRequest";
import SelfEvaluation from "./my-performance/SelfEvaluation";
import MySuperior from "./my-performance/MySuperior";
import MyPeers from "./my-performance/MyPeers";
import AverageRatingSummary from "./my-performance/AverageRatingSummary";

const MyPerformance = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  lightColor,
  focusBorder,
  progressColor,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // const [northStar, setNorthStar] = useState({north_star: "Increase by 20% revenue", north_star_desc: "Lorem ipsum sit amet dolor proque contigo."});
  const [myNorthStar, setMyNorthStar] = useState([]);
  const [northStarData, setNorthStarData] = useState([]);

  const [myDownline, setMyDownline] = useState([]);
  const [sameLineTasks, setSameLineTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [myFinishedTasks, setMyFinishedTasks] = useState([]);

  const [totalPercentage, setTotalPercentage] = useState();
  const [finishedPercentage, setFinishedPercentage] = useState();

  const tasksRef = useRef(null);

  const newTaskRef = useRef(null);

  const finishTaskRef = useRef(null);

  const taskChevron = useRef(null);

  const [cookie, setCookie] = useCookies(["user"]);

  const [taskInfo, setTaskInfo] = useState({
    assignee_id: cookie.user.emp_id,
    target_task: "",
    target_date: "",
  });

  const [newStatus, setNewStatus] = useState({});

  const [noteDetails, setNoteDetails] = useState([]);

  const newTaskGoalRef = useRef(null);
  const newTaskDateRef = useRef(null);
  const newTaskNoteRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [newTask, setNewTask] = useState({ note_body: "", goal_id: null });

  const [approver, setApprover] = useState([]);

  const handleStatusChange = (id, val) => {
    setNewStatus({ ...newStatus, north_star_goal_id: id, status: val });
    // console.log(JSON.stringify(newStatus))
    handleTaskChange(id, val);
  };

  const handleTaskChange = async (goal_id, stat) => {
    const statusVal = { north_star_goal_id: goal_id, status: stat };
    console.log(statusVal);
    await axios
      .post(`${BASE_URL}/ns-updateTask`, statusVal)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenModal = async (event, id) => {
    document.getElementById("task_notes").showModal();

    const noteVal = { goal_id: id };

    await axios
      .post(BASE_URL + "/tc-getTaskNotes", noteVal)
      .then((response) => {
        setNoteDetails(response.data);
        setNewTask({ ...newTask, goal_id: id });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewNote = async (event) => {
    setIsSubmitting(true);
    console.log(newTask);

    await axios
      .post(`${BASE_URL}/tc-insertTaskNotes`, newTask)
      .then((response) => {
        setNoteDetails([
          ...noteDetails,
          {
            f_name: cookie.user.f_name,
            s_name: cookie.user.s_name,
            noted_at: moment.now(),
            note_body: newTask.note_body,
          },
        ]);

        setIsSubmitting(false);
        inputRef.current.value = "";
        newTask.note_body = "";
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const fetchNorthStarData = async () => {
      try {
        const my_north_star_res = await axios.get(
          BASE_URL + "/ns-getMyNorthStar"
        );
        setNorthStarData(my_north_star_res.data);
        setMyNorthStar(my_north_star_res.data[0]);

        const my_downline_res = await axios.get(
          BASE_URL + "/ns-getMyDownlines"
        );
        setMyDownline(my_downline_res.data);

        // const same_line_tasks_res = await axios.get(
        //   BASE_URL + "/ns-getSameLineTasks"
        // );
        // setSameLineTasks(same_line_tasks_res.data);
        // setTotalPercentage(same_line_tasks_res.data.length);

        const finished_same_line_tasks_res = await axios.get(
          BASE_URL + "/ns-getFinishedSameLineTasks"
        );
        setFinishedPercentage(finished_same_line_tasks_res.data.length);

        console.log("Finished " + finishedPercentage);
        console.log("Total " + totalPercentage);

        const approver_res = await axios.get(
          BASE_URL + "/ns-getApproverOfUser"
        );
        setApprover(approver_res.data[0]);

        // const tasks_you_assigned_res = await axios.get(BASE_URL + "/ns-getTasksYouAssigned");
        // setTasksYouAssigned(tasks_you_assigned_res.data);

        // const tasks_for_review_res = await axios.get(BASE_URL + "/ns-getTasksForReview");
        // setTasksForReview(tasks_for_review_res.data);

        // ///ns-getSameLineTasks

        await axios
          .get(BASE_URL + "/ns-getMyTasks")
          .then((response) => {
            setMyTasks(response.data);
            setTotalPercentage(response.data.length);
          })
          .catch((err) => {
            console.log(err);
          });

        await axios
          .get(BASE_URL + "/ns-getMyFinishedTasks")
          .then((response) => setMyFinishedTasks(response.data))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    fetchNorthStarData();
  }, []);

  const columns = [
    {
      name: "Task",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">{row.target_task}</p>
      ),
      width: "250px",
    },
    {
      name: "Notes",
      selector: (row) => (
        <a
          onClick={(event) => handleOpenModal(event, row.north_star_goal_id)}
          className={`${textColor} text-[#008080] text-[12px] underline select-none cursor-pointer`}
        >
          Review Notes
        </a>
      ),
    },
    {
      name: "Assigned To",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {row.assignee_fname + " " + row.assignee_sname}
        </p>
      ),
      width: "200px",
    },

    {
      name: "Assigned By",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {row.assigner_fname + " " + row.assigner_sname}
        </p>
      ),
      width: "200px",
    },

    {
      name: "Date Created",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {row.date_created
            ? moment(row.date_created).format("MMM DD, YYYY")
            : "---"}
        </p>
      ),
    },
    {
      name: "Target Date",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {moment(row.target_date).format("MMM DD, YYYY")}
        </p>
      ),
      sortable: true,
    },

    {
      name: "Date Finished",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {row.finished_date
            ? moment(row.finished_date).format("MMM DD, YYYY")
            : "---"}
        </p>
      ),
    },

    {
      name: "Status",
      selector: (row) => (
        <select
          onChange={(event) => {
            handleStatusChange(row.north_star_goal_id, event.target.value);
          }}
          defaultValue={row.status}
          className="outline-none border-2 border-black px-2 py-1 rounded-[8px]"
        >
          <option value={1}>Pending</option>
          <option value={2}>On Hold</option>
          <option value={3}>In Progress</option>
          <option value={9}>For Review</option>
        </select>
      ),
      width: "140px",
    },
  ];

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

  const handleTaskSubmit = () => {
    axios
      .post(BASE_URL + "/ns-insertNorthStarGoal", taskInfo)
      .then((response) => {
        setMyTasks([...myTasks, response.data[0]]);
        newTaskGoalRef.current.value = "";
        newTaskDateRef.current.value = "";
        newTaskNoteRef.current.value = "";

        setTaskInfo({ ...taskInfo, target_date: "", target_task: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-[1300px] m-auto p-5">
      <Headings text={"My Performance"} />

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

            <p className={`text-[18px] font-bold ${textColor}`}>North Star</p>
          </div>
        </div>

        {myNorthStar != null ? (
          <div className="mt-16">
            <div>
              <p className={`text-[20px] font-medium ${textColor}`}>
                {myNorthStar.target_goal}
              </p>

              <p className={`text-[16px] ${textColor}`}>
                {myNorthStar.target_desc}
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
                        {/* MB */}
                        {approver.f_name?.charAt(0) +
                          approver.s_name?.charAt(0)}
                      </div>
                    </div>
                  </div  >
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

            {/* <p className={`text-[14px] ${textColor} text-right`}>
              {((finishedPercentage / totalPercentage) * 100).toFixed(2) + "%"}
            </p> */}

            {/* <div className="mt-2 w-full h-3 bg-[#e5e5e5] rounded-full relative"> */}
            {/* <div className={`transition-all ease-out duration-300 w-[60%] h-3 ${bgColor} rounded-full absolute`} /> */}
            {/* <progress
              className={`progress ${progressColor} w-full h-3`}
              value={((finishedPercentage / totalPercentage) * 100).toFixed(2)}
              max="100"
            ></progress> */}
            {/* </div> */}
          </div>
        ) : (
          <div className="mt-16">
            <p className={`text-[15px] font-bold ${textColor}`}>
              There is no North Star yet.
            </p>

            <p className={`text-[14px] ${textColor}`}>
              North Star is set by your immediate supervisor/upline.
            </p>
          </div>
        )}

        <div className="flex flex-row justify-between items-center pt-3 border-t border-[#e4e4e4] mt-10">
          <p className="text-[16px] font-bold text-[#363636]">Task Assigned</p>

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
            <div className="flex flex-row justify-start gap-2 w-[70%]">
              <input
                type="text"
                className={`outline-none text-[14px] text-[#363636] p-2 rounded-[8px] flex-1 border border-[#e4e4e4] ${focusBorder}`}
                placeholder="Search a Task"
              />

              <select
                className={`outline-none text-[14px] text-[#363636] p-2 rounded-[8px] w-[90px] border border-[#e4e4e4] ${focusBorder}`}
              >
                <option>Filter</option>
              </select>

              <button
                onClick={() => newTaskRef.current.showModal()}
                className={`transition-all outline-none flex flex-row justify-center items-center gap-1 bg-[#008080] py-2 px-3 rounded-[6px] ${bgColor} ${hoverColor}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-white h-5"
                >
                  <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                </svg>

                <span className="text-white text-[14px]">Add a New Task</span>
              </button>
            </div>

            <DataTable
              columns={columns}
              data={myTasks}
              highlightOnHover
              pagination
            />

            <button
              onClick={() => finishTaskRef.current.showModal()}
              className={`outline-none float-end mt-10 text-[14px] ${textColor} underline`}
            >
              See Finished Tasks
            </button>
          </div>
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
                newTaskRef.current.close();
                newTaskGoalRef.current.value = "";
                newTaskDateRef.current.value = "";
                setTaskInfo({ ...taskInfo, target_date: "", target_task: "" });
              }}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          <div className="mt-3">
            <label className="text-[12px] text-[#363636] font-medium">
              Goal <span className="text-red-500">*</span>
            </label>
            <textarea
              onChange={(event) =>
                setTaskInfo({ ...taskInfo, target_task: event.target.value })
              }
              name="target_task"
              ref={newTaskGoalRef}
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
              onChange={(event) =>
                setTaskInfo({ ...taskInfo, target_date: event.target.value })
              }
              ref={newTaskDateRef}
              className={`outline-none border border-[#e4e4e4] ${focusBorder} rounded-[8px] text-[14px] text-[#363636] p-2`}
            />
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={() => {
                handleTaskSubmit();
                newTaskRef.current.close();
              }}
              className={`tranisition-all outline-none bg-[#008080] py-2 px-3 rounded-[8px] text-white text-[14px] ${bgColor} ${hoverColor} ${disabledColor}`}
              disabled={
                taskInfo.target_task == "" || taskInfo.target_date == ""
                  ? true
                  : false
              }
            >
              Add Task
            </button>

            <button
              onClick={() => {
                newTaskRef.current.close();
                newTaskGoalRef.current.value = "";
                newTaskDateRef.current.value = "";
                newTaskNoteRef.current.value = "";
                setTaskInfo({ ...taskInfo, target_date: "", target_task: "" });
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

          <div
            className={`flex flex-row justify-between p-3 rounded-[12px] gap-2 mt-5`}
          >
            <div className="flex flex-row justify-start gap-2 w-[60%]">
              <input
                type="text"
                className={`transition-all outline-none border border-[#e4e4e4] text-[14px] text-[#363636] p-2 rounded-[6px] flex-1 ${focusBorder}`}
                placeholder="Search a Task"
              />

              <select
                className={`outline-none transition-all border border-[#e4e4e4] text-[14px] text-[#363636] p-2 rounded-[6px] w-[120px] ${focusBorder}`}
              >
                <option>Filter</option>
              </select>
            </div>
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
          </div>

          <MyFinishedTasks
            myFinishedTasksData={myFinishedTasks}
            bgColor={bgColor}
            disabledColor={disabledColor}
            focusBorder={focusBorder}
            textColor={textColor}
            cookie={cookie}
          />
        </div>
      </dialog>

      {/* Modal */}

      <dialog id="task_notes" className="modal">
        <div className="modal-box p-0 flex flex-col justify-between h-full">
          <div className="border-b border-[#e4e4e4] p-5">
            <h3 className="font-bold text-[18px] text-[#363636]">Task Notes</h3>
            <button
              className="outline-none btn btn-sm btn-circle btn-ghost absolute right-5 top-5"
              onClick={() => document.getElementById("task_notes").close()}
            >
              ✕
            </button>

            <div className="mt-2">
              <p className="label-text flex-col text-[12px] justify-start text-justify text-wrap text-[#363636]">
                This is a space for sharing task notes for the assignor and the
                assignee. Add messages, list more information, expound more
                details about the task, or keep links and files handy. You can
                also talk to yourself here, but please keep in mind that both
                you and the other party can access these notes.
              </p>
            </div>
          </div>

          <div className="p-5 flex-1 overflow-auto" ref={scrollRef}>
            <div className="flex flex-col gap-3">
              {noteDetails.length != 0 ? (
                noteDetails.map((nd) => (
                  <>
                    <div className="box-border bg-[#f4f4f4] flex flex-col gap-3 p-3 rounded-[15px]">
                      <div className="flex items-center gap-2 w-full">
                        <div
                          className={`box box-border w-[30px] h-[30px] flex justify-center items-center rounded-full ${bgColor}`}
                        >
                          <span className="font-medium text-white text-[12px]">
                            {nd.f_name.charAt(0) + nd.s_name.charAt(0)}
                          </span>
                        </div>

                        <div className="flex flex-col items-start justify-center flex-1">
                          <p className="text-[14px] text-[#363636]">
                            {nd.f_name + " " + nd.s_name}
                          </p>
                        </div>
                        <div className="flex flex-col items-start justify-start">
                          <p className="text-[10px] text-[#A9A9A9]">
                            {moment(nd.noted_at).fromNow()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-center flex-1 mt-2">
                        <p className="text-wrap text-[12px]">{nd.note_body}</p>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <p className="text-center mt-20 text-[14px] text-[#8b8b8b]">
                  Start sending notes here.
                </p>
              )}
            </div>
          </div>

          <div className="box box-border flex flex-row gap-2 items-start border-t border-[#e4e4e4] p-5">
            <input
              type="text"
              className="outline-none flex-1 text-[14px] p-2 box-content rounded-[10px] border border-[#e4e4e4] text-[#363636]"
              placeholder="Type here..."
              onChange={(event) => {
                setNewTask({ ...newTask, note_body: event.target.value });
              }}
              ref={inputRef}
            />
            <button
              className={`flex justify-center items-center gap-2 px-3 py-2 ${bgColor} ${disabledColor} text-white text-[14px] outline-none rounded-[8px]`}
              onClick={(event) => {
                addNewNote(event);
              }}
              disabled={isSubmitting || newTask.note_body == "" ? true : false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-white w-5 h-5"
              >
                <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
              </svg>
              Post
            </button>
          </div>
        </div>
      </dialog>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center mt-5">
        {/* Performance Calibration */}
        <PerformanceCalibration />

        {/* Feedback Requests */}
        <FeedbackRequest />

        {/* Self Evaluation */}
        <SelfEvaluation />

        <div className="box box-border flex-col flex-1 w-full items-center">
          {/* My Superior */}
          <MySuperior />

          {/* My Peers */}
          <MyPeers />

          {/* Average Rating and Summary */}
          <AverageRatingSummary />
        </div>
      </div>
    </div>
  );
};

export default MyPerformance;
