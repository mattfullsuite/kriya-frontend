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

  useEffect(() => {
    const fetchAllPendingLeaves = async () => {
      try {
        const res = await Axios.get(
          BASE_URL + "/showpendingdepartmentleaves"
        );
        setPendingLeaves(res.data);
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
              PTO points
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
                className="btn btn-xs normal-case"
                onClick={() =>
                  document.getElementById("pto_details").showModal()
                }
              >
                Details
              </button>
            </div>
          </div>
        ))
      )}

      <dialog id="pto_details" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">PTO Details</h3>
          <div className="m-6">
            <DataTable
              columns={columns}
              data={leaves}
              highlightOnHover
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
