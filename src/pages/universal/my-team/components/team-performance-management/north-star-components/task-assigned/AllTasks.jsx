import { useState, useRef } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import { useCookies } from "react-cookie";

const AllTasks = ({
  setStatus,
  allTasksData,
  forReview,
  setForReview,
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  lightColor,
  accentColor,
  focusBorder,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [newStatus, setNewStatus] = useState({});

  const [cookie] = useCookies(["user"]);

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

  const handleStatusChange = (id, val) => {
    setNewStatus({ ...newStatus, north_star_goal_id: id, status: val });
    // console.log(JSON.stringify(newStatus))
    handleTaskChange(id, val);
  };

  const columns = [
    {
      name: "Task",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">{row.target_task}</p>
      ),
      width: "280px",
    },

    {
      name: "Notes",
      selector: (row) => (
        <a
          onClick={(event) => handleOpenModal(event, row.north_star_goal_id)}
          className={`${textColor} text-[12px] underline select-none cursor-pointer`}
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
    },

    {
      name: "Assigned By",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {row.assigner_fname + " " + row.assigner_sname}
        </p>
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
        </select>
      ),
      width: "140px",
    },
  ];

  const inputRef = useRef(null);
  const [newTask, setNewTask] = useState({ note_body: "", goal_id: null });
  const [notesRef, setNotesRef] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noteDetails, setNoteDetails] = useState([]);
  const handleOpenModal = async (event, id) => {
    document.getElementById("all_task_notes").showModal();

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

  return (
    <>
      <DataTable
        columns={columns}
        data={allTasksData}
        highlightOnHover
        pagination
      />

      {/* Modal */}

      <dialog id="all_task_notes" className="modal">
        <div className="modal-box p-0 flex flex-col justify-between h-full">
          <div className="border-b border-[#e4e4e4] p-5">
            <h3 className="font-bold text-[18px] text-[#363636]">Task Notes</h3>
            <button
              className="outline-none btn btn-sm btn-circle btn-ghost absolute right-5 top-5"
              onClick={() => document.getElementById("all_task_notes").close()}
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

          <div className="p-5 flex-1 overflow-auto">
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
              className={`outline-none transition-all ${focusBorder} flex-1 text-[14px] p-2 box-content rounded-[10px] border border-[#e4e4e4] text-[#363636]`}
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
    </>
  );
};

export default AllTasks;
