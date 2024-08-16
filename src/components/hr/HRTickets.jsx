import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HRTickets = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const navigate = useNavigate();
  const [pendingDisputes, setPendingDisputes] = useState([]);
  const [newHoliday, setNewHoliday] = useState({
    h_name: "",
    h_date: "",
  });
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    const fetchAllPendingDisputes = async () => {
      try {
        const pending_disputes_res = await axios.get(
          BASE_URL + "/d-getAllPendingDisputes"
        );

        setPendingDisputes(pending_disputes_res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllPendingDisputes();
  }, []);

  const disputeColumns = [
    {
      name: "Ticket No.",
      selector: (row) => "AT#" + String(row.dispute_id).padStart(3, "0"),
    },
    {
      name: "Appellant's Name",
      selector: (row) => row.r_f_name + " " + row.r_s_name,
    },
    {
      name: "Date to Dispute",
      selector: (row) => moment(row.dispute_date).format("MMMM DD, YYYY"),
      sortable: true,
    },
    {
      name: "Appeal Type",
      selector: (row) => row.dispute_title,
    },
    {
      name: "Appeal Reason",
      selector: (row) => row.dispute_body,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="flex gap-2 mt-5 justify-center align-middle">
          <button
            className=" w-10 h-10 rounded-full flex justify-center items-center bg-green-100 text-white hover:bg-green-300 normal-case"
            onClick={() => handleApproval(row.dispute_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-green-600"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
              <path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"></path>
            </svg>
          </button>

          <button
            className=" w-10 h-10 rounded-full flex justify-center items-center bg-red-100 text-white hover:bg-red-300 normal-case"
            onClick={() => handleRejection(row.dispute_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-red-600"
            >
              <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path>
              <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path>
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const handleApproval = async (dispute_id) => {
    await axios
      .post(BASE_URL + "/d-approveDispute/" + dispute_id)
      .then(() => {
        setPendingDisputes((current) =>
          current.filter((disputes) => disputes.dispute_id !== dispute_id)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleRejection = async (dispute_id) => {
    await axios
      .post(BASE_URL + "/d-rejectDispute/" + dispute_id)
      .then(() => {
        setPendingDisputes((current) =>
          current.filter((disputes) => disputes.dispute_id !== dispute_id)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const notifySuccess = () =>
    toast.success("Successfully added new holiday: " + newHoliday.h_name, {
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
    toast.error("Something went wrong!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      <div className="mx-5 p-4 border border-[#e4e4e4] rounded-[15px] flex flex-col justify-center align-middle">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-semibold mb-4">Pending Attendance Disputes</h1>
        </div>

        <DataTable
          className="mt-10"
          columns={disputeColumns}
          data={pendingDisputes}
          highlightOnHover
          pagination
        />
      </div>
    </>
  );
};

export default HRTickets;
