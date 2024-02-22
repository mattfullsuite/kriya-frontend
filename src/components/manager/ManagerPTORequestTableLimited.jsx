import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const ManagerPTORequestTableLimited = ({ link }) => {
  const [leaves, setPendingLeaves] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchAllPendingLeaves = async () => {
      try {
        const res = await axios.get(
          BASE_URL + "/showpendingdepartmentleaveslimited"
        );
        setPendingLeaves(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPendingLeaves();
  }, []);

  const handleApproval = async (leave_id) => {
    try {
      await axios.post(BASE_URL + "/approveleave/" + leave_id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejection = async (leave_id) => {
    try {
      await axios.post(BASE_URL + "/rejectleave/" + leave_id);
      await axios.post(BASE_URL + "/returnTempPTO/" + leave_id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  function checkStatus(status) {
    if (status == 0) {
      return <div className="badge badge-warning text-xs">Pending</div>;
    }
    if (status == 1) {
      return <div className="badge badge-success">Approved</div>;
    }
    if (status == 2) {
      return <div className="badge badge-error text-white">Declined</div>;
    }
  }

  const columns = [
    {
      name: "Date filed",
      selector: (row) => moment(row.date_filed).format("MMMM DD, YYYY"),
      sortable: true,
    },

    {
      name: "Name",
      selector: (row) => row.s_name + ", " + row.f_name + " " + row.m_name,
    },

    {
      name: "PTO type",
      selector: (row) => row.leave_type,
    },

    {
      name: "Date(s)",
      selector: (row) =>
        row.leave_from === row.leave_to
          ? moment(row.leave_from).format("MMMM DD, YYYY")
          : moment(row.leave_from).format("MMMM DD, YYYY") +
            "  to  " +
            moment(row.leave_to).format("MMMM DD, YYYY"),
    },

    {
      name: "Actions",
      selector: (row) => (
        <div className="flex flex-row justify-center flex-wrap gap-1">
          <button
            className="btn btn-circle btn-ghost-active btn-xs normal-case"
            onClick={() => document.getElementById(row.leave_id).showModal()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" className="w-6 h-6">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>

          </button>

          {/* Modal - Details */}
          <dialog id={row.leave_id} className="modal text-left">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-lg mb-5">PTO Details</h3>

              <div className="flex flex-col justify-center items-center">
                {row.emp_pic == "" || row.emp_pic == null ? (
                  <div className="h-24 w-24 bg-gray-500 rounded-full flex justify-center items-center text-4xl text-white font-medium m-2">
                    {row.f_name.charAt(0) + row.s_name.charAt(0)}
                  </div>
                ) : (
                  <img
                    src={"../uploads/" + row.emp_pic}
                    className="h-24 w-24 rounded-full m-2"
                  />
                )}

                <div className="text-center mb-7">
                  <h3 className="font-bold text-lg text-center">
                    {row.s_name + ", " + row.f_name + " " + row.m_name}
                  </h3>
                  <span>{row.title}</span>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-xl">{row.leave_type}</h3>
                  <h3 className="text-gray-600">
                    {row.leave_from === row.leave_to
                      ? moment(row.leave_from).format("MMM. DD, YYYY")
                      : moment(row.leave_from).format("MMM. DD, YYYY") +
                        "  to  " +
                        moment(row.leave_to).format("MMM. DD, YYYY")}
                  </h3>
                </div>

                <div className="mt-7 flex flex-col items-center gap-2">
                  <h3 className="italic text-gray-600">
                    Filed on {moment(row.date_filed).format("dddd")} •{" "}
                    {moment(row.date_filed).format("MMMM DD, YYYY")}
                  </h3>
                  <div>{checkStatus(row.leave_status)}</div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                  <h1 className="font-semibold mt-5">Reason:</h1>
                  <div className="max-h-44 whitespace-normal">
                    <p className="justify-center text-center">
                      {row.leave_reason == "" || row.leave_reason == null ? (
                        <p className="italic text-gray-600">
                          No reason indicated.
                        </p>
                      ) : (
                        <p>{row.leave_reason}</p>
                      )}
                    </p>
                  </div>
                </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="btn bg-green-600 text-white hover:bg-green-800 normal-case"
                  onClick={() => handleApproval(row.leave_id)}
                >
                  Approve
                </button>
                <button
                  className="btn bg-red-600 text-white hover:bg-red-800 normal-case"
                  onClick={() => handleRejection(row.leave_id)}
                >
                  Decline
                </button>
              </div>
            </div>
          </dialog>

          <button
            className="btn btn-circle btn-xs btn-ghost text-white hover:bg-none normal-case "
            onClick={() => handleApproval(row.leave_id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-6 h-6">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>

          </button>

          <button
            className="btn btn-circle btn-xs bg-ghost text-white hover:bg-red-800 normal-case"
            onClick={() => handleRejection(row.leave_id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>

          </button>
        </div>
      ),
    },
  ];

  if (leaves.length != 0) {
    return (
      <>
        {/* PTO Notices */}
        <div className="m-2 p-5 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col justify-center align-middle">
          <div className="flex flex-row justify-center mb-4 ">
            <h1 className="text-lg font-semibold">PTO Requests</h1>

            {/* <Link to="/leadPTORequests">
              <button className="btn btn-accent-active btn-sm normal-case">
                See All
              </button>
            </Link> */}
          </div>

          <div className="overflow-x-auto max-w-full">
            <DataTable
              columns={columns}
              data={leaves}
              highlightOnHover
            ></DataTable>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {/* PTO Notices */}
        <div className="m-2 p-5 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col justify-center align-middle">
          <h1 className="text-lg font-semibold">PTO Requests</h1>

          <div className="flex flex-col justify-center align-middle">
            <div className="flex flex-col items-center justify-center gap-4">
              <img src={link} className="h-48 w-48"></img>

              <h2 className="font-semibold">No pending PTOs yet.</h2>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ManagerPTORequestTableLimited;
