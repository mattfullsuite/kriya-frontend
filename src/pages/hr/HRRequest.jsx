import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";
import HRSideBar from "../../components/hr/HRSideBar";
import Headings from "../../components/universal/Headings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HRRequest = () => {
  const [complaints, setComplaints] = useState([]);
  const [editComplaint, setEditComplaint] = useState({
    documentation: "",
    resolved: "",
    cID: "",
  });
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        await Axios.get(BASE_URL + "/getComplaints").then((res) => {
          setComplaints(res.data);
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchComplaints();
  }, []);

  function checkStatus(status) {
    if (status == 0) {
      return <div className="badge badge-warning">Pending</div>;
    }
    if (status == 1) {
      return <div className="badge badge-success">Resolved</div>;
    }
  }

  const [notif, setNotif] = useState([]);

  const notifySuccess = () =>
    toast.success("Successfully updated.", {
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
    toast.error("Something went wrong.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await Axios.post(BASE_URL + "/editComplaints", editComplaint)
      .then((res) => {
        if (res.data === "success") {
          document.getElementById(editComplaint.cID).close();

          notifySuccess();

          setTimeout(() => {
            window.top.location = window.top.location;
          }, 3500);
          // window.location.reload();
          
        } else if (res.data === "error") {
          notifyFailed();

          setTimeout(() => {
            window.top.location = window.top.location;
            document.getElementById("submit-button").disabled = false;
          }, 3500);
        }

        setNotif(res.data);
      })
      .catch(function (err) {});
  };

  const columns = [
    {
      name: "Complainant",
      width: "200px",
      selector: (row) =>
        row.f_name === null && row.s_name === null ? (
          <p className="italic">Anonymous</p>
        ) : (
          row.f_name + " " + row.s_name
        ),
    },

    {
      name: "Date filed",
      width: "200px",
      selector: (row) => moment(row.date_filed).format("MMMM DD, YYYY"),
    },

    {
      name: "Complaint type",
      width: "200px",
      selector: (row) => row.content_type,
    },

    {
      name: "Visibility",
      width: "100px",
      selector: (row) => (row.hr_id === 0 ? "All HR" : "Only you"),
    },

    {
      name: "Status",
      width: "120px",
      selector: (row) => checkStatus(row.complaint_status),
    },

    {
      name: "Reason",
      grow: 1,
      selector: (row) => row.content_body,
    },

    {
      name: "Actions",
      width: "150px",
      selector: (row) => (
        <div>
          <button
            className="btn btn-active btn-xs normal-case"
            onClick={() =>
              document.getElementById(row.complaint_id).showModal()
            }
          >
            Details
          </button>

          <dialog className="modal unique" id={row.complaint_id}>
            <div className="modal-box">
              <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-bold">Complaint Details</span>

                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>

              <div className="flex flex-col gap-5 mt-6 w-full">
                <div className="flex-1">
                  <div className="mb-7">
                    {row.emp_pic == "" || row.emp_pic == null ? (
                      <div className="h-24 w-24 bg-gray-500 rounded-full flex justify-center items-center text-4xl text-white font-medium mx-auto mb-2">
                        {row.f_name === null && row.s_name === null
                          ? "A"
                          : row.f_name.charAt(0) + row.s_name.charAt(0)}
                      </div>
                    ) : (
                      <img
                        src={"../uploads/" + row.emp_pic}
                        className="h-24 w-24 rounded-full mx-auto mb-2"
                      />
                    )}
                    <p className="text-xl font-bold text-center">
                      {row.f_name === null && row.s_name === null
                        ? "Anonymous"
                        : row.f_name + " " + row.s_name}
                    </p>
                    <p className="text-sm text-center">{row.position_name}</p>
                  </div>

                  <div className="mb-5 flex flex-col lg:flex-row gap-5 lg:gap-10 justify-center items-center">
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-sm font-medium">
                        {row.hr_id === null ? "All HR" : "Private"}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 fill-slate-400"
                      >
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path
                          fillRule="evenodd"
                          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    <div className="flex flex-col justify-start items-center">
                      <p className="text-sm font-medium">{row.content_type}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 fill-slate-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Reason</p>

                    <p>{row.content_body}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} id="complaintForm">
                  <div className="flex-1">
                    <div className="mb-2">
                      <p className="mb-1">Notes</p>
                      <textarea
                        className="w-full textarea textarea-bordered"
                        placeholder="Aa"
                        onChange={(e) => {
                          setEditComplaint({
                            ...editComplaint,
                            documentation: e.target.value,
                            cID: row.complaint_id,
                          });
                        }}
                      >
                        {row.documentation}
                      </textarea>
                    </div>

                    <div className="form-control bg-slate-100 px-5 py-3 rounded-lg">
                      <label className="label cursor-pointer">
                        <span className="label-text">Mark as resolved</span>
                        <input
                          type="checkbox"
                          className="toggle"
                          id="resolved_btn"
                          defaultChecked={(editComplaint.resolved === 1) ? true : false}
                          onChange={(e) => {
                            setEditComplaint({
                              ...editComplaint,
                              resolved: e.target.checked,
                              cID: row.complaint_id,
                            });
                          }}
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-active btn-md mt-5 normal-case float-right"
                      disabled={editComplaint.cID === "" && true}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      ),
    },
  ];

  return (
    <>
      <HRSideBar />
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      <div className="p-4 sm:ml-64 flex flex-col">
        <Headings text={"Requests"} />

        <div className="mt-10 mx-4">
          <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col justify-center align-middle max-w-[1300px]">
            <h1 className="text-lg font-semibold text-center mb-4">
              Complaints
            </h1>

            <DataTable
              columns={columns}
              data={complaints}
              highlightOnHover
              pagination
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HRRequest;
