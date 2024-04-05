import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";
const DashBPTOApprovedAndOwned = ({ uid }) => {
  const [approved, setApproved] = useState([]);
  const [approver, setApprover] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [records, setRecords] = useState(initialData);
  const [allMyLeaves, setAllMyLeaves] = useState([]);
  const [countPendingLeaves, setCountPendingLeaves] = useState([]);
  const [countApprovedLeaves, setCountApprovedLeaves] = useState([]);
  const [countDeclinedLeaves, setCountDeclinedLeaves] = useState([]);

  useEffect(() => {
    const fetchAllApproved = async () => {
      try {
        const res1 = await Axios.get(BASE_URL + "/showapprovedleaves");
        const res2 = await Axios.get(BASE_URL + "/login");
        const res3 = await Axios.get(BASE_URL + "/getApproverDetails");

        const all_my_leaves_res = await Axios.get(BASE_URL + "/mtaa-allmyleaves");
        const count_pending_leaves_res = await Axios.get(BASE_URL + "/mtaa-mypendingleaves");
        const count_approved_leaves_res = await Axios.get(BASE_URL + "/mtaa-myapprovedleaves");
        const count_declined_leaves_res = await Axios.get(BASE_URL + "/mtaa-mydeclinedleaves");
        // test
        setInitialData(all_my_leaves_res.data); //initialize database    
        setAllMyLeaves(all_my_leaves_res.data);
        setCountPendingLeaves(count_pending_leaves_res.data);
        setCountApprovedLeaves(count_approved_leaves_res.data);
        setCountDeclinedLeaves(count_declined_leaves_res.data);
        setRecords(all_my_leaves_res.data);
        setApproved(res1.data);
        setApprover(res3.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllApproved();
  }, []);

  function handleChange(val) {
    if (val === "All") {
      setRecords(allMyLeaves);
    } else if (val === "Pending") {
      setRecords(countPendingLeaves)
    } else if (val === "Approved") {
      setRecords(countApprovedLeaves)
    } else if (val === "Declined") {
      setRecords(countDeclinedLeaves)
    }
  }

  // const handleClick = (e) => {
  //   if (e.currentTarget.id === "all") {
  //     setData(all);
  //     document.getElementById("all").classList.add("tab-active");
  //     document.getElementById("app").classList.remove("tab-active");
  //   } else if (e.currentTarget.id === "app") {
  //     setData(approved);
  //     document.getElementById("all").classList.remove("tab-active");
  //     document.getElementById("app").classList.add("tab-active");
  //   }
  // };

  function checkStatus(status) {
    if (status === 0) {
      return (
        <div className="bg-[#FFCD6B] py-[2px] px-1 rounded-[5px]">
          <span className="text-[#363636] text-[12px]">Pending</span>
        </div>
      );
    } else if (status === 1) {
      return (
        <div className="bg-[#7DDA74] py-[2px] px-1 rounded-[5px]">
          <span className="text-[#363636] text-[12px]">Approved</span>
        </div>
      );
    } else if (status === 2) {
      return (
        <div className="bg-[#FF8989] py-[2px] px-1 rounded-[5px]">
          <span className="text-[#363636] text-[12px]">Declined</span>
        </div>
      );
    }
  }
  const columns = [
    {
      name: "Leave Type",
      selector: (row) => row.leave_type,
    },
    {
      name: "Leave Date(s)",
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
      width: "150px",
    },
    {
      name: "Action",
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

                  {row.leave_status === 1 || row.leave_status == 2 ? (
                    <div className="flex flex-col gap-1 items-center mt-5">
                      {checkStatus(row.leave_status)}

                      {approver.map(
                        (app) =>
                          app.emp_id === row.approver_id && (
                            <div>
                              <span className="italic text-gray-600">by </span>
                              <span>{app.f_name + " " + app.s_name}</span>
                            </div>
                          )
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center mt-5">
                      {checkStatus(row.leave_status)}
                    </div>
                  )}
                </div>
              </div>
              {uid === row.requester_id && (
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
              )}
            </div>
          </dialog>
        </div>
      ),
      width: "100px",
    },
  ];
  return (
    <>
      {/* PTO Notices */}

      <div className="box-border flex flex-row justify-between items-center mx-3">
        <span className="font-bold text-[#363636] text-[16px]">
          My Recent Leaves
        </span>

        <select
          className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636]"
          onChange={(e) => { handleChange(e.target.value) }}>
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Declined</option>
        </select>
      </div>

      <div className="bg-white box-border w-full p-3 rounded-[15px] border border-[#E4E4E4] mt-2 overflow-x-scroll">
        <DataTable
          columns={columns}
          data={records}
          pagination
          highlightOnHover
          theme="default"
          responsive
        />
      </div>
    </>
  );
};
export default DashBPTOApprovedAndOwned;
