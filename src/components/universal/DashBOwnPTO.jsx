import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";

const DashBOwnPTO = ({ link }) => {
  var count = 1;

  const [myLeaves, setMyLeaves] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchAllMyLeaves = async () => {
      try {
        const res = await axios.get(BASE_URL + "/showallmyleaves");
        setMyLeaves(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMyLeaves();
  }, []);

  function checkStatus(status) {
    if (status == 0) {
      return <div className="badge badge-warning">Pending</div>;
    }
    if (status == 1) {
      return <div className="badge badge-success">Approved</div>;
    }
    if (status == 2) {
      return <div className="badge badge-error">Declined</div>;
    }
  }

  const columns = [
    {
      name: "#",
      selector: (row) => row.leave_id,
      sortable: true,
    },

    {
      name: "Date filed",
      selector: (row) => moment(row.date_filed).format("MMM. DD, YYYY"),
      sortable: true,
    },

    {
      name: "PTO type",
      selector: (row) => row.leave_type,
      sortable: true,
    },

    {
      name: "Leave reason",
      selector: (row) => row.leave_reason,
    },

    {
      name: "Date(s)",
      selector: (row) =>
        row.leave_from === row.leave_to
          ? moment(row.leave_from).format("MMM. DD, YYYY")
          : moment(row.leave_from).format("MMM. DD, YYYY") +
            "  to  " +
            moment(row.leave_to).format("MMM. DD, YYYY"),
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => checkStatus(row.leave_status),
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="flex flex-row justify-center flex-wrap gap-1">
          <button
            className="btn btn-ghost-active btn-xs normal-case"
            onClick={() => document.getElementById(row.leave_id).showModal()}
          >
            Details
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
                  <img className="h-16 w-16 rounded-full m-2" />
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

              <div>
                <h1 className="font-semibold mt-5">Reason:</h1>

                <div className="max-h-44 whitespace-normal">
                  <p className="justify-center text-justify">
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
            </div>
          </dialog>
        </div>
      ),
    },
  ];

  if (myLeaves.length == 0) {
    return (
      <>
        <>
          <div className="m-2 p-5 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col justify-center align-middle">
            <h1 className="text-lg font-semibold mb-4 text-center">Your PTOs</h1>

            <div className="flex flex-col items-center justify-center gap-4">
              <img src={link} className="h-48 w-48"></img>

              <h2 className="font-semibold">You don't have any PTOs yet.</h2>
            </div>
          </div>
        </>
      </>
    );
  } else {
    return (
      <>
        <>
          {/* PTO Notices */}
          <div className="m-2 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col justify-center align-middle">
            <h1 className="text-lg font-semibold mb-4 text-center">Your PTOs</h1>

            <DataTable columns={columns} data={myLeaves} highlightOnHover />
          </div>
        </>
      </>
    );
  }
};

export default DashBOwnPTO;
