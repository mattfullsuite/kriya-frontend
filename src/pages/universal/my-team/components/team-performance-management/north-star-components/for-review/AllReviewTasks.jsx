import DataTable from "react-data-table-component";
import moment from "moment";
<<<<<<< HEAD

const AllReviewTasks = ({setStatus, allTasksData}) => {
=======
import Axios from "axios";
import { useState, useEffect } from "react";

const AllReviewTasks = ({ setStatus, allTasksData }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [notesRef, setNotesRef] = useState(null);

  const [newStatus, setNewStatus] = useState({});
  const [notif, setNotif] = useState("");

  const [noteDetails, setNoteDetails] = useState([])

  const [newTask, setNewTask] = useState({});

  //"/tc-getTaskNotes"

  const handleTaskChange = async (goal_id, stat) => {
    const statusVal = { north_star_goal_id: goal_id, status: stat };
    console.log(statusVal);
    await Axios.post(`${BASE_URL}/ns-updateTask`, statusVal)
      .then((response) => {
        if (response == "success") {
          alert("Done");
        }
      })
      .catch((err) => {
        alert("Nope");
      });
  };

  const handleOpenModal = async (event, id) => {

    document.getElementById("task_notes").showModal();

    const noteVal = {goal_id: id };

    await Axios
      .post(BASE_URL + "/tc-getTaskNotes", noteVal)
      .then((response) => {
        setNoteDetails(response.data)
        
        setNewTask({ ...newTask, goal_id: id });
        console.log(JSON.stringify(newTask))
      })
      .catch((err) => {
        console.log(err)
      });

  };

  const handleStatusChange = (id, val) => {
    setNewStatus({ ...newStatus, north_star_goal_id: id, status: val });
    handleTaskChange(id, val);
  };

  const addNewNote = async (event) => {
   
    await Axios.post(`${BASE_URL}/tc-insertTaskNotes`, newTask)
      .then((response) => {
        if (response == "success") {
          alert("Done");
        }
      })
      .catch((err) => {
        alert("Nope");
      });
  };
>>>>>>> heroku/main-merging

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
<<<<<<< HEAD
        <a className="text-[#008080] text-[12px] underline">Review Notes</a>
=======
        <a
          onClick={(event) => handleOpenModal(event, row.north_star_goal_id)}
          className="text-[#008080] text-[12px] underline"
        >
          Review Notes
        </a>
>>>>>>> heroku/main-merging
      ),
    },

    {
      name: "Assigned To",
      selector: (row) => (
<<<<<<< HEAD
        <p className="text-[#363636] text-[12px]">{row.a_fname + " " + row.a_sname}</p>
=======
        <p className="text-[#363636] text-[12px]">
          {row.a_fname + " " + row.a_sname}
        </p>
>>>>>>> heroku/main-merging
      ),
    },

    {
      name: "Assigned By",
      selector: (row) => (
<<<<<<< HEAD
        <p className="text-[#363636] text-[12px]">{row.r_fname + " " + row.r_sname}</p>
=======
        <p className="text-[#363636] text-[12px]">
          {row.r_fname + " " + row.r_sname}
        </p>
>>>>>>> heroku/main-merging
      ),
    },

    {
      name: "Date Assigned",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {moment(row.date_created).format("MMMM DD, YYYY")}
        </p>
      ),
      sortable: true,
    },

    {
      name: "Target Date",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {moment(row.target_date).format("MMMM DD, YYYY")}
        </p>
      ),
      sortable: true,
    },

    {
      name: "Status",
<<<<<<< HEAD
      selector: (row) => 
      <select defaultValue={row.status} className="outline-none border-2 border-black px-2 py-1 rounded-[8px]">
        <option value={1}>Pending</option>
        <option value={2}>Returned</option>
        <option value={3}>Finished</option>

      </select>,
      width: "140px"
=======
      selector: (row) => (
        <select
          onChange={(event) => {
            handleStatusChange(row.north_star_goal_id, event.target.value);
          }}
          defaultValue={row.status}
          className="outline-none border-2 border-black px-2 py-1 rounded-[8px]"
        >
          <option value={1}>Returned</option>
          <option value={0}>Finished</option>
          <option value={9}>For Review</option>
        </select>
      ),
      width: "140px",
>>>>>>> heroku/main-merging
    },
  ];

  return (
<<<<<<< HEAD
    <DataTable columns={columns} data={allTasksData} highlightOnHover pagination />
  );
};

export default AllReviewTasks;
=======
    <>
      <DataTable
        columns={columns}
        data={allTasksData}
        highlightOnHover
        pagination
      />

      {/* Modal */}

      <dialog id="task_notes" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl">Task Notes</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5"
            onClick={() => document.getElementById("task_notes").close()}
          >
            ✕
          </button>
          <form
            id="taskNotesForm"
            action=""
            method="dialog"
            //</div>onSubmit={handleSubmit}
          >
            <div className="label mt-1">
              <p className="label-text flex-col text-[12px] justify-start text-justify text-wrap">
                This is a space for sharing task notes for the assignor and the
                assignee. Add messages, list more information, expound more
                details about the task, or keep links and files handy. You can
                also talk to yourself here, but please keep in mind that both
                you and the other party can access these notes.
              </p>
              <br />
            </div>

            {noteDetails.map((nd) => (
            <>
            <div className="box-border bg-[#f4f4f4] flex flex-col gap-3 p-3 rounded-[15px] mb-5">
              <div className="flex items-center gap-3 w-full">
                <div className="box box-border w-[43px] h-[43px] flex justify-center items-center rounded-full bg-[#CC5500]">
                  <span className="font-bold text-white">{nd.f_name.charAt(0) + nd.s_name.charAt(0)}</span>
                </div>
                <div className="flex flex-col items-start justify-center flex-1">
                  <p className="font-bold text-[12px] text-[#363636]">{nd.f_name + " " + nd.s_name}</p>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <p className="font-light text-[8px] text-[#A9A9A9]">
                    {moment(nd.noted_at).fromNow()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center flex-1">
                <p className="text-wrap text-[12px]">
                  {nd.note_body}
                </p>
              </div>
            </div>
            </>
            ))}


            <div className="box box-border flex flex-row gap-3 mt-10">
              <textarea
                className="border border-gray-300 rounded-[15px] px-3 py-3 mb-3 w-full focus:outline-[#666a40] bg-[#F7F7F7] input input-bordered"
                placeholder="Type here. . ."
                onChange={(event) => {
                  setNewTask({ ...newTask, note_body: event.target.value });
                  console.log(JSON.stringify(newTask))
                }}
              ></textarea>
              <button
                className="btn bg-[#666a40] text-white"
                onClick={(event) => {addNewNote(event)}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ fill: "currentColor", marginRight: "8px" }}
                >
                  <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
                </svg>
                Post
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AllReviewTasks;
>>>>>>> heroku/main-merging
