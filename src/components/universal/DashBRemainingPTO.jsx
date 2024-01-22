import React, { useState, useEffect } from "react";
import Axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DataTable from "react-data-table-component";
import moment from "moment";


const DashBremainingPTO = () => {
  const [ptos, setPtos] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [isLoading, setIsLoading] = useState(true);
  const [leaves, setPendingLeaves] = useState([]);
  const [ptoHistory, setPtoHistory] = useState([]);

  useEffect(() => {
    const fetchAllPendingLeaves = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/showpendingdepartmentleaves");
        const res2 = await Axios.get(BASE_URL + "/myPtoHistory")
        setPendingLeaves(res.data);
        setPtoHistory(res2.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPendingLeaves();
  }, []);


  useEffect(() => {
    const fetchUserPTO = async () => {
      try {
        await Axios.get(BASE_URL + "/getUserPTO").then((res) => {
          setPtos(res.data);
          setIsLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPTO();
  }, []);

  const columns = [

    {
      name: "Type",
      selector: (row) =>  (row.log_type === "GRANT") ? <span className="font-bold text-green-500"> {row.log_type}</span> : (row.log_type === "DIFF") ? <span className="font-bold text-red-500"> {row.log_type}</span> : <span className="font-bold text-blue-500"> {row.log_type}</span>,
      sortable: true,
      width: "9%"
    },

    {
      name: "Log Time",
      selector: (row) => moment(row.log_time).format("MMM DD YYYY, h:mm:ss"),
      sortable: true,
      width: "20%",
    },
    {
      name: "Handler",
      selector: (row) => (row.hr_name !== null) ? "HR: " + row.hr_name : "SYSTEM GEN",
      width: "16%"
    },

    {
      name: "PTO Description",
      selector: (row) => row.log_desc,
      width: "55%"
    }
  ]

  return (
    <>
      {/* Number of PTOs */}

      {isLoading ? (
        <div className="m-2 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56">
          <h1 className="text-xl font-semibold text-left w-full">
            <Skeleton width={60} />
          </h1>

          <h1 className="text-xl font-semibold center w-full">
            <Skeleton height={60} width={60} />
          </h1>

          <div className="flex flex-col justify-end items-end w-full">
            <Skeleton height={12} width={60} />
            <Skeleton height={12} width={80} />
          </div>
        </div>
      ) : (
        ptos.map((pto) => (
          <div className="m-2 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56">
            <h1 className="text-xl font-semibold text-left w-full">
              PTO Points
            </h1>

            <h1 className="my-1 text-7xl font-bold">{pto.leave_balance}</h1>

            <div className="flex flex-col justify-end items-end w-full">
              {/* <span className="text-[11px] text-gray-500 italic">
                Available until
              </span>
              <span className="text-[12px] text-gray-500 italic">
                March 25, 2023
              </span> */}
              <button
                className="btn btn-md normal-case btn-circle btn-ghost"
                onClick={() =>
                  document.getElementById("pto_details").showModal()
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>

              </button>
            </div>
          </div>
        ))
      )}

      <dialog id="pto_details" className="modal modal-middle">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">PTO History</h3>
          <div className="m-6">
            <DataTable
              columns={columns}
              data={ptoHistory}
              highlightOnHover
              dense={true}
              pagination
            />
          </div>

              
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DashBremainingPTO;
