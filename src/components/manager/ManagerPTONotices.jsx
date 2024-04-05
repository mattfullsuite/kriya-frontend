import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import moment from "moment";

const ManagerPTONotices = ({ uid }) => {
  const [data, setData] = useState([]);
  const [all, setAll] = useState([]);
  const [approved, setDeptApproved] = useState([]);
  const [pending, setDeptPending] = useState([]);
  const [declined, setDeptDeclined] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchAllDeptLeaves = async () => {
      try {
        const all = await axios.get(BASE_URL + "/showalldleaves");
        const approved = await axios.get(
          BASE_URL + "/showapproveddepartmentleaves"
        );
        const pending = await axios.get(
          BASE_URL + "/showpendingdepartmentleaves"
        );
        const declined = await axios.get(
          BASE_URL + "/showrejecteddepartmentleaves"
        );
        setData(all.data);
        setDeptApproved(approved.data);
        setDeptPending(pending.data);
        setDeptDeclined(declined.data);
        setAll(all.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDeptLeaves();
  }, []);

  function checkStatus(status) {
    if (status == 0) {
      return <div className="badge badge-warning">Pending</div>;
    }
    if (status == 1) {
      return <div className="badge badge-success">Approved</div>;
    }
    if (status == 2) {
      return <div className="badge badge-error">Rejected</div>;
    }
  }

  const handleClick = (e) => {
    if (e.currentTarget.id === "all") {
      setData(all);
      document.getElementById("all").classList.add("tab-active");
      document.getElementById("approved").classList.remove("tab-active");
      document.getElementById("pending").classList.remove("tab-active");
      document.getElementById("declined").classList.remove("tab-active");
    } else if (e.currentTarget.id === "approved") {
      setData(approved);
      document.getElementById("all").classList.remove("tab-active");
      document.getElementById("approved").classList.add("tab-active");
      document.getElementById("pending").classList.remove("tab-active");
      document.getElementById("declined").classList.remove("tab-active");
    } else if (e.currentTarget.id === "pending") {
      setData(pending);
      document.getElementById("all").classList.remove("tab-active");
      document.getElementById("approved").classList.remove("tab-active");
      document.getElementById("pending").classList.add("tab-active");
      document.getElementById("declined").classList.remove("tab-active");
    } else if (e.currentTarget.id === "declined") {
      setData(declined);
      document.getElementById("all").classList.remove("tab-active");
      document.getElementById("approved").classList.remove("tab-active");
      document.getElementById("pending").classList.remove("tab-active");
      document.getElementById("declined").classList.add("tab-active");
    }
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.leave_id,
      sortable: true,
    },
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
          ? moment(row.leave_from).format("MMM. DD, YYYY")
          : moment(row.leave_from).format("MMM. DD, YYYY") +
            "  to  " +
            moment(row.leave_to).format("MMM. DD, YYYY"),
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
            </div>
          </dialog>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* PTO Notices */}
      <div className="p-5 border border-[#e4e4e4] border-solid rounded-[15px] bg-white flex flex-col justify-center align-middle">
        <h1 className="text-lg font-semibold mb-4 text-center">
          Department PTO Notices
        </h1>

        <div
          role="tablist"
          className="tabs tabs-lifted tabs-lg flex flex-row justify-center"
        >
          <a
            role="tab"
            id="all"
            onClick={handleClick}
            className="tab tab-active"
          >
            All
          </a>
          <a role="tab" id="approved" onClick={handleClick} className="tab">
            Approved
          </a>
          <a role="tab" id="pending" onClick={handleClick} className="tab">
            Pending
          </a>
          <a role="tab" id="declined" onClick={handleClick} className="tab">
            Declined
          </a>
        </div>

        <hr className="mb-2"></hr>

        <DataTable
          columns={columns}
          data={data}
          highlightOnHover
          pagination
        />
      </div>
    </>
  );
};

export default ManagerPTONotices;
