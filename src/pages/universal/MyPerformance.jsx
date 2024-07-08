import React from "react";
import Subheadings from "../../components/universal/Subheadings";
import PerformanceCalibration from "./my-performance/PerformanceCalibration";
import FeedbackRequest from "./my-performance/FeedbackRequest";
import SelfEvaluation from "./my-performance/SelfEvaluation";
import MySuperior from "./my-performance/MySuperior";
import AverageRatingSummary from "./my-performance/AverageRatingSummary";
import MyPeers from "./my-performance/MyPeers";

const MyPerformance = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 justify-center">

        {/* Performance Calibration */}
        <PerformanceCalibration/>

        {/* Feedback Requests */}
        <FeedbackRequest/>

        {/* Self Evaluation */}
        <SelfEvaluation/>

        <div className="box box-border flex-col flex-1">


              {/* My Superior */}
              <MySuperior/>

              {/* My Peers */}
              <MyPeers/>

              {/* Average Rating and Summary */}
              <AverageRatingSummary/>
              
        </div>
      </div>
    </>
  );
};

export default MyPerformance;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment";
// import Headings from "../../components/universal/Headings";
// import { ToastContainer, toast } from "react-toastify";

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

// export default MyPerformance;