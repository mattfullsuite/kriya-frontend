import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HRManageHoliday = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const navigate = useNavigate();
  const [holiday, setHoliday] = useState([]);
  const [newHoliday, setNewHoliday] = useState({
    h_name: "",
    h_date: "",
  });
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    const fetchAllHolidays = async () => {
      try {
        const res = await axios.get(BASE_URL + "/holidays");

        setHoliday(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllHolidays();
  }, []);

  const holidayColumns = [
    {
      name: "Date",
      selector: (row) => moment(row.h_date).format("MMM DD, YYYY"),
      sortable: true,
    },
    {
      name: "Holiday",
      selector: (row) => row.h_name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.h_type,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <button
          onClick={() => handleDelete(row.h_id)}
          className="btn btn-xs btn-error normal-case text-white"
        >
          Delete
        </button>
      ),
    },
  ];

  const handleChange = (event) => {
    setNewHoliday({ ...newHoliday, [event.target.name]: [event.target.value] });
  };

  const handleDelete = async (h_id) => {
    try {
      await axios.delete(BASE_URL + "/holiday/" + h_id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const addNewHoliday = () => {
    axios
      .post(BASE_URL + "/addHoliday", newHoliday)
      // .then((res) => console.log(JSON.stringify(newHoliday)))
      .then((res) => {
        if (res.data === "success") {
          document.getElementById("holidayAddModal").close();

          setHoliday([
            {
              h_name: newHoliday.h_name,
              h_type: newHoliday.h_type,
              h_date: newHoliday.h_date,
            },
            ...holiday,
          ]);

          notifySuccess();

        } else if (res.data === "error") {
          notifyFailed();
        }

        setNotif(res.data);
      })
      .catch((err) => console.log(err));

    // window.location.reload();
    // alert("Successfully added new holiday: " + newHoliday.h_name);
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
      <div className="mx-5 p-4 border border-[#e4e4e4] rounded-[15px] flex flex-col justify-center align-middle md:w-3/4">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-semibold mb-4">Holidays</h1>

          <button
            className="btn normal-case btn-sm"
            onClick={() =>
              document.getElementById("holidayAddModal").showModal()
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              dataSlot="icon"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add
          </button>

          <dialog id="holidayAddModal" className="modal">
            <div className="modal-box">
              <div className="flex flex-row justify-between">
                <h1 className="text-xl font-semibold">Add Holiday</h1>

                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>
              <form action="" method="dialog">

              <div className="flex flex-col gap-2 mx-5 mt-10 md:mx-10">
                <input
                    id="holiday_name"
                    onChange={(e) => setNewHoliday({ ...newHoliday, h_name: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="What holiday?"
                    required
                />

                <input
                    type="date"
                    id="holiday_date"
                    onChange={(e) => setNewHoliday({ ...newHoliday, h_date: e.target.value })}
                    className="input input-bordered w-full"
                    required
                  />

                <select
                  className="select select-bordered w-full mb-2"
                  onChange={(e) => setNewHoliday({ ...newHoliday, h_type: e.target.value })}
                  required
                >
                  <option value="" disabled selected>
                    Select Holiday Type
                  </option>
                  <option> Special </option>
                  <option> Regular </option>
                </select>


                  <button
                    className="btn btn-active normal-case btn-md"
                    onClick={addNewHoliday}
                  >
                    Add
                  </button>
              </div>
              </form>
            </div>
          </dialog>
        </div>

        <DataTable
          className="mt-10"
          columns={holidayColumns}
          data={holiday}
          highlightOnHover
          pagination
        />
      </div>
    </>
  );
};

export default HRManageHoliday;
