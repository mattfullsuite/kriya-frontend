import React from "react";
import Axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";
import HRSideBar from "../../components/hr/HRSideBar";
import Headings from "../../components/universal/Headings";

const HRRequest = () => {
  const columns = [
    {
      name: "#",
      selector: (row) => row.complaint_id,
      width: "100px",
      sortable: true,
    },

    {
      name: "Complainant",
      width: "200px",
      selector: (row) => row.complainant,
    },

    {
      name: "Complaint type",
      width: "200px",
      selector: (row) => row.complaint_type,
    },

    {
      name: "Visibility",
      width: "200px",
      selector: (row) => row.visibility,
    },

    {
      name: "Reason",
      grow: 1,
      selector: (row) => row.reason,
    },

    {
      name: "Actions",
      width: "150px",
      selector: (row) => (
        <div>
          <button
            className="btn btn-active btn-xs normal-case"
            onClick={() => document.getElementById("action_modal").showModal()}
          >
            Details
          </button>

          <dialog className="modal" id="action_modal">
            <div className="modal-box w-10/12 max-w-5xl">
              <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-bold">Complaint Details</span>

                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>

              <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-start mt-6 w-full">
                <div className="flex-1">
                  <div className="mb-7">
                    <div className="h-24 w-24 bg-gray-500 rounded-full flex justify-center items-center text-4xl text-white font-medium mx-auto mb-2">
                      MS
                    </div>
                    <p className="text-xl font-bold text-center">
                      {row.complainant}
                    </p>
                    <p className="text-sm text-center">Software Engineer</p>
                  </div>

                  <div className="mb-5 flex flex-row gap-10 justify-center items-center">
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-sm font-medium">{row.visibility}</p>
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
                      <p className="text-sm font-medium">
                        {row.complaint_type}
                      </p>
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

                    <p>{row.reason}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="form-control mb-5 bg-slate-100 px-5 py-3 rounded-lg">
                    <label className="label cursor-pointer">
                      <span className="label-text">Mark as resolved</span>
                      <input type="checkbox" className="toggle" />
                    </label>
                  </div>

                  <div>
                    <p className="mb-1">Notes</p>
                    <textarea
                      className="w-full textarea textarea-bordered"
                      placeholder="Aa"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      ),
    },
  ];

  const data = [
    {
      complaint_id: 1,
      complainant: "Matt Willfred Salvador",
      complaint_type: "Salary increase",
      visibility: "All HR",
      reason: "Mababa masyado ante",
    },
  ];

  return (
    <>
      <HRSideBar />

      <div className="p-4 sm:ml-64 flex flex-col">
        <Headings text={"Requests"} />

        <div className="mt-10 mx-4">
          <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col justify-center align-middle max-w-[1300px]">
            <h1 className="text-lg font-semibold text-center mb-4">
              Complaints
            </h1>

            <DataTable columns={columns} data={data} highlightOnHover />
          </div>
        </div>
      </div>
    </>
  );
};

export default HRRequest;
