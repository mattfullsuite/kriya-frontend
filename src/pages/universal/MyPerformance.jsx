import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import Headings from "../../components/universal/Headings";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";

// const MyPerformance = () => {
//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   const [myNorthStar, setMyNorthStar] = useState([]);
//   const [northStarData, setNorthStarData] = useState([]);
//   const [myDownline, setMyDownline] = useState([]);
//   const [sameLineTasks, setSameLineTasks] = useState([]);
//   const [tasksYouAssigned, setTasksYouAssigned] = useState([]);
//   const [tasksForReview, setTasksForReview] = useState([]);

//   const [northStarInfo, setNorthStarInfo] = useState({
//     target_goal: "",
//     target_date: "",
//     submit_button: "",
//   });

//   const [taskInfo, setTaskInfo] = useState({
//     assignee_id: "",
//     target_task: "",
//     target_date: "",
//   });

//   useEffect(() => {
//     const fetchNorthStarData = async () => {
//       try {
//         const my_north_star_res = await axios.get(BASE_URL + "/ns-getMyNorthStar");
//         setNorthStarData(my_north_star_res.data);
//         setMyNorthStar(my_north_star_res.data[0]);

//         const my_downline_res = await axios.get(BASE_URL + "/ns-getMyDownlines");
//         setMyDownline(my_downline_res.data);

//         const same_line_tasks_res = await axios.get(BASE_URL + "/ns-getSameLineTasks");
//         setSameLineTasks(same_line_tasks_res.data);

//         const tasks_you_assigned_res = await axios.get(BASE_URL + "/ns-getTasksYouAssigned");
//         setTasksYouAssigned(tasks_you_assigned_res.data);

//         const tasks_for_review_res = await axios.get(BASE_URL + "/ns-getTasksForReview");
//         setTasksForReview(tasks_for_review_res.data);

//         ///ns-getSameLineTasks
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchNorthStarData();
//   }, []);

//   const handleChange = (event) => {

//     setNorthStarInfo({
//       ...northStarInfo,
//       [event.target.name]: [event.target.value],
//     });

//     console.log(JSON.stringify(northStarInfo));

//   };

//   const handleTaskChange = (event) => {

//     setTaskInfo({
//       ...taskInfo,
//       [event.target.name]: [event.target.value],
//     });

//     console.log(JSON.stringify(taskInfo));

//   };

//   const handleSubmit = (event) => {

//     document.getElementById("submit-button").disabled = true;

//     event.preventDefault();

//     axios
//       .post(BASE_URL + "/ns-insertNorthStar", northStarInfo)
//       .then((res) => {
//         if (res.data === "success") {
//           document.getElementById("northStarForm").reset();

//           notifySuccess();

//           setTimeout(() => {
//             window.top.location = window.top.location
//             document.getElementById("submit-button").disabled = false;
//           }, 3500)

//         } else if (res.data === "error") {
//           document.getElementById("northStarForm").reset();
//           notifyFailed();

//           setTimeout(() => {
//             window.top.location = window.top.location
//             document.getElementById("submit-button").disabled = false;
//           }, 3500)
//         }

//         setNotif(res.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleTaskSubmit = (event) => {

//     document.getElementById("submit-task-button").disabled = true;

//     event.preventDefault();

//     axios
//       .post(BASE_URL + "/ns-insertNorthStarGoal", taskInfo)
//       .then((res) => {
//         if (res.data === "success") {
//           document.getElementById("taskForm").reset();

//           notifySuccess();

//           setTimeout(() => {
//             window.top.location = window.top.location
//             document.getElementById("submit-task-button").disabled = false;
//           }, 3500)

//         } else if (res.data === "error") {
//           document.getElementById("taskForm").reset();
//           notifyFailed();

//           setTimeout(() => {
//             window.top.location = window.top.location
//             document.getElementById("submit-task-button").disabled = false;
//           }, 3500)
//         }

//         setNotif(res.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   const [notif, setNotif] = useState([]);

//   const notifySuccess = () =>
//     toast.success("Successfully added a north star!", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });

//   const notifyFailed = () =>
//     toast.error("Something went wrong.", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });

//   return(
//     <div className="box-border m-auto max-w-[1300px] p-5">
//       {notif != "" && notif === "success" && <ToastContainer />}
//       {notif != "" && notif === "error" && <ToastContainer />}
//       <Headings text={"My Performance"} />

// {/* ----------------------------------------My  North Star ----------------------------------------- */}

//       <div className="box-border mx-10 my-10">
//         {(northStarData .length > 0) ?
//           <div>
//             <p className="font-bold text-lg">MY NORTH STAR</p>
//             <p>My North Star: <label className="bold">{myNorthStar.target_goal}</label></p>
//             <p>Target Date: <label className="bold">{moment(myNorthStar.target_date).format("MMMM DD YYYY")}</label></p>
//           </div>
//           :
//           <div> Your superior has not created a north star for the team.</div>
//         }
//       </div>

//       <form
//             id="northStarForm"
//             action=""
//             method="dialog"
//             onSubmit={handleSubmit}
//       >
//       <div className="box-border mx-10 my-10">

//          {/* ---------------------------------------- Set Up My Team's North Star ----------------------------------------- */}

//       <hr></hr>

//         <div className="mt-10">
//           <p className="font-bold text-lg">MY TEAM'S NORTH STAR</p>
//           <h1>
//             Your Team's North Star:
//           </h1>
//              <input
//                 id="target_goal"
//                 name="target_goal"
//                 type="text"
//                 placeholder="Write Target Goal for your Team"
//                 className="input input-bordered w-full max-w-xs mb-2"
//                 onChange={handleChange}
//                 required
//               />
//          </div>

//         {/* Target Date */}

//           <div>
//           <h1>
//               Choose your Target Date:
//             </h1>
//               <input
//                   id="target_date"
//                   name="target_date"
//                   type="date"
//                   placeholder="Insert Target Date"
//                   className="input input-bordered w-full max-w-xs mb-2"
//                   onChange={handleChange}
//                   required
//                 />
//           </div>

//           <div className="flex justify-end mt-3">
//                 <button
//                   id="submit-button"
//                   name="submit_button"
//                   type="submit"
//                   onClick={handleChange}
//                   className="btn btn-primary mr-2"
//                 >
//                   Submit
//                 </button>
//           </div>

//       </div>
//       </form>

//       <hr></hr>

//       {/* ----------------------------------------- Goals Assigned To You ----------------------------------------- */}
//       <div className="box-border mx-10 my-10">
//       <p className="font-bold text-lg">GOALS ASSIGNED TO YOU</p>

//       <table className="table table-zebra table-lg">
//         <thead>
//           <th>Task Description</th>
//           <th>Target Date</th>
//           <th>Notes</th>
//           <th>Target Status</th>
//         </thead>

//         <tbody>
//         {(sameLineTasks.length > 0) ?
//           sameLineTasks.map((slt) => (
//           <tr>
//             <td>{slt.target_task}</td>
//             <td>{moment(slt.target_date).format("MMMM DD YYYY")}</td>
//             <td>{<textarea></textarea>}</td>
//             <td>
//               {<select
//                   name="status"
//                   selected={slt.status}
//                   className="select select-bordered mb-2"
//                 >
//                     <option>Pending</option>
//                     <option>On Going</option>
//                     <option>On Hold</option>
//                     <option>For Review</option>
//                 </select>
//                 }
//             </td>
//           </tr>
//           )) :
//           <tr>
//              <td>No Tasks Yet</td>
//           </tr>
//         }
//         </tbody>
//       </table>
//       </div>

//       <hr></hr>

//       {/* ----------------------------------------- Create Your Goals ----------------------------------------- */}
//       <div className="box-border mx-10 my-10">

//       <form
//         id="taskForm"
//         action=""
//         method="dialog"
//         onSubmit={handleTaskSubmit}
//       >
//       <p className="font-bold text-lg">CREATE TASKS TO ACHIEVE YOUR NORTH STAR</p>

//       <label>
//         <div className="label">
//           <h1 className="label-text">
//             Create A Goal <span className="text-red-500"> *</span>
//           </h1>
//         </div>

//         <input
//           id="target_task"
//           name="target_task"
//           type="text"
//           placeholder="Create Tasks to achieve your North Star"
//           className="input input-bordered w-full max-w-xs mb-2"
//           onChange={handleTaskChange}
//           required
//         />
//       </label>

//       <label>
//         <div className="label">
//           <h1 className="label-text">
//             Assign a Task <span className="text-red-500"> *</span>
//           </h1>
//                 </div>
//                 <select
//                   name="assignee_id"
//                   className="select select-bordered mb-2"
//                   onChange={handleTaskChange}
//                   required
//                 >

//                   {myDownline.map((d) => (
//                     <option value={d.emp_id}>
//                       {d.f_name +
//                         " " +
//                         d.s_name}
//                     </option>
//                   ))}
//                 </select>
//         </label>

//         <label>
//         <div className="label">
//           <h1 className="label-text">
//             Choose a Target Date <span className="text-red-500"> *</span>
//           </h1>
//         </div>
//           <input
//             id="target_date"
//             name="target_date"
//             type="date"
//             placeholder="Insert Target Date"
//             className="input input-bordered w-full max-w-xs mb-2"
//             onChange={handleTaskChange}
//             required
//           />
//         </label>

//         <div className="flex justify-end mt-3">
//                 <button
//                   id="submit-task-button"
//                   name="submit_button"
//                   type="submit"
//                   onClick={handleTaskChange}
//                   className="btn btn-primary mr-2"
//                 >
//                   Submit
//                 </button>
//         </div>

//         </form>

//       </div>

//       {/* ----------------------------------------- Goals Assigned To You ----------------------------------------- */}
//       <div className="box-border mx-10 my-10">
//       <p className="font-bold text-lg">TASKS YOU'VE ASSIGNED</p>

//       <table className="table table-zebra table-lg">
//         <thead>
//           <th>Task Description</th>
//           <th>Assigned To</th>
//           <th>Target Date</th>
//         </thead>

//         <tbody>
//         {(tasksYouAssigned.length > 0) ?
//           tasksYouAssigned.map((tya) => (
//               <tr>
//                 <td>{tya.target_task}</td>
//                 <td>{tya.f_name + " " + tya.s_name}</td>
//                 <td>{moment(tya.target_date).format("MMMM DD YYYY")}</td>
//               </tr>
//           )) :
//           <tr>
//             <td>No Tasks Yet</td>
//           </tr>
//         }
//         </tbody>
//       </table>

//       </div>

//       <hr></hr>

//       {/* ----------------------------------------- FOR REVIEW ----------------------------------------- */}
//       <div className="box-border mx-10 my-10">
//       <p className="font-bold text-lg">FOR REVIEW</p>

//       <table className="table table-zebra table-lg">
//         <thead>
//           <th>Task Description</th>
//           <th>Assigned To</th>
//           <th>Notes</th> {/* Insert Modal */}
//           <th>Target Date</th>
//           <th>Status</th>
//         </thead>

//         <tbody>
//         {(tasksForReview.length > 0) ?
//           tasksForReview.map((tfr) => (
//               <tr>
//                 <td>{tfr.target_task}</td>
//                 <td>{tfr.f_name + " " + tfr.s_name}</td>
//                 <td>{tfr.notes}</td>
//                 <td>{moment(tfr.target_date).format("MMMM DD YYYY")}</td>
//                 <td>
//                 {<select
//                     name="status"
//                     selected={tfr.status}
//                     className="select select-bordered mb-2"
//                   >
//                       <option value="For Review">For Review</option>
//                       <option  value="Finished">Finished</option>
//                       <option value="Pending">Pending</option>
//                   </select>
//                   }
//               </td>
//               </tr>
//           )) :
//           <tr>
//             <td>No Tasks Yet</td>
//           </tr>
//         }
//         </tbody>
//       </table>

//       </div>

//       <hr></hr>

//       {/* ----------------------------------------- END ----------------------------------------- */}

//     </div>
//   );
// };

const MyPerformance = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  focusBorder,
}) => {

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // const [northStar, setNorthStar] = useState({north_star: "Increase by 20% revenue", north_star_desc: "Lorem ipsum sit amet dolor proque contigo."});
  const [myNorthStar, setMyNorthStar] = useState([]);
  const [northStarData, setNorthStarData] = useState([]);

  const [myDownline, setMyDownline] = useState([]);
  const [sameLineTasks, setSameLineTasks] = useState([]);

  const [totalPercentage, setTotalPercentage] = useState();
  const [finishedPercentage, setFinishedPercentage] = useState();

  const tasksRef = useRef(null);

  const newTaskRef = useRef(null);

  const finishTaskRef = useRef(null);

  const taskChevron = useRef(null);

  useEffect(() => {
    const fetchNorthStarData = async () => {
      try {
        const my_north_star_res = await axios.get(BASE_URL + "/ns-getMyNorthStar");
        setNorthStarData(my_north_star_res.data);
        setMyNorthStar(my_north_star_res.data[0]);

        const my_downline_res = await axios.get(BASE_URL + "/ns-getMyDownlines");
        setMyDownline(my_downline_res.data);

        const same_line_tasks_res = await axios.get(BASE_URL + "/ns-getSameLineTasks");
        setSameLineTasks(same_line_tasks_res.data);
        setTotalPercentage(same_line_tasks_res.data.length);

        const finished_same_line_tasks_res = await axios.get(BASE_URL + "/ns-getFinishedSameLineTasks");
        setFinishedPercentage(finished_same_line_tasks_res.data.length);

        console.log("Finished " + finishedPercentage)
        console.log("Total " + totalPercentage)

        // const tasks_you_assigned_res = await axios.get(BASE_URL + "/ns-getTasksYouAssigned");
        // setTasksYouAssigned(tasks_you_assigned_res.data);

        // const tasks_for_review_res = await axios.get(BASE_URL + "/ns-getTasksForReview");
        // setTasksForReview(tasks_for_review_res.data);

        // ///ns-getSameLineTasks
      } catch (err) {
        console.log(err);
      }
    };
    fetchNorthStarData();
  }, []);


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

  const columns = [
    {
      name: "Task",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">{row.target_task}</p>
      ),
      width: "300px",
    },
    {
      name: "Notes",
      selector: (row) => (
        <a className={`${textColor} text-[12px] underline`}>Review Notes</a>
      ),
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => (setStatus(row.status)),
      width: "120px",
    },
    {
      name: "Assigned To",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">{row.a_fname + " " + row.a_sname}</p>
      ),
      width: "200px",
    },

    {
      name: "Assigned By",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">{row.r_fname + " " + row.r_sname}</p>
      ),
      width: "200px",
    },

    {
      name: "Date Created",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {row.date_created ? moment(row.date_created).format("MMM DD, YYYY") : "---"}
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
          {row.finished_date ? moment(row.finished_date).format("MMM DD, YYYY") : "---"}
        </p>
      ),
    },

    {
      name: "For Review",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {row.status == 9 ? 
            <button
            className="btn btn-info"> Submit </button> : "---"}
        </p>
      ),
    },
  ];

  // const data = [
  //   {
  //     task: "Be true",
  //     target_date: "2024-04-04",
  //     date_finished: "2024-03-03",
  //     status: 5,
  //   },
  // ];

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

            <div>
              <p className={`text-[16px] ${textColor} font-medium mt-10`}>
                My Team
              </p>

              <div className="mt-2 avatar-group -space-x-6 rtl:space-x-reverse">
              {myDownline.map((md) => (
                <div className="avatar">
                  <div className="w-12">
                    {md.emp_pic != null ? 
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> 
                      : 
                      <div className="box-border w-12 h-12 rounded-full bg-[#d9d9d9] flex justify-center items-center text-[#666A40] font-bold text-[20px]">
                        {md.f_name.charAt(0) + md.s_name.charAt(0)}
                      </div>
                    }
                  </div>
                </div>
                 ))}
                {/* <div className="avatar">
                  <div className="w-12">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-12">
                    <span>+4</span>
                  </div>
                </div> */}
              </div>
            </div>

            <p className={`text-[14px] ${textColor} text-right`}>
              {((finishedPercentage / totalPercentage) * 100).toFixed(2) + "%"}
            </p>

            {/* <div className="mt-2 w-full h-3 bg-[#e5e5e5] rounded-full relative"> */}
              {/* <div className={`transition-all ease-out duration-300 w-[60%] h-3 ${bgColor} rounded-full absolute`} /> */}
              <progress className="progress progress-success w-full" value={((finishedPercentage / totalPercentage) * 100).toFixed(2)} max="100"></progress>
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
            <div className="flex flex-row justify-start gap-2 w-[60%]">
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
            </div>

            <DataTable
              columns={columns}
              data={sameLineTasks}
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
    </div>
  );
};

export default MyPerformance;
