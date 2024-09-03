import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HRShiftChange = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [emp, setEmp] = useState([]);
  const [notif, setNotif] = useState([]);

  const [shifts, setShifts] = useState([]);

  const [newShift, setNewShift] = useState({
    emp_num: "",
    time_in: "",
    time_out: "",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const shift_res = await axios.get(BASE_URL + "/pref-getAllShifts");
        setShifts(shift_res.data);

        const all_emp_res = await axios.get(BASE_URL + "/req-allemployees");
        setEmp(all_emp_res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllData();
  }, []);

  const shiftColumns = [
    {
      name: "Employee Number",
      selector: (row) => (row.emp_num !== null ? row.emp_num : ""),
      sortable: true,
    },
    {
      name: "Employee Name",
      selector: (row) =>
        row.f_name !== null ? row.f_name + " " + row.s_name : "",
      sortable: true,
    },
    {
      name: "Shift Type",
      selector: (row) =>
        row.shift_type == null
          ? ""
          : row.shift_type === "DD"
          ? "Night Shift"
          : "Day Shift",
      sortable: true,
    },
    {
      name: "Start Shift",
      selector: (row) => (row.start !== null ? moment(row.start, "HH:mm:ss a").format("hh:mm a") : ""),
      sortable: true,
    },
    {
      name: "End Shift",
      selector: (row) => (row.end !== null ? moment(row.end, "HH:mm:ss a").format("hh:mm a") : ""),
      sortable: true,
    },
  ];

  const assignNewShift = () => {
    axios
      .post(BASE_URL + "/pref-changeEmployeeShift", newShift)
      // .then((res) => console.log(JSON.stringify(newHoliday)))
      .then((res) => {
        if (res.data === "success") {
          document.getElementById("addNewShift").close();

          notifySuccess();

          setTimeout(() => {
            window.top.location = window.top.location;
          }, 3500);
          // window.location.reload();
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
    toast.success("Successfully changed work shift for " + newShift.emp_num, {
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
          <h1 className="text-lg font-semibold mb-4"></h1>

          <button
            className="btn normal-case btn-sm"
            onClick={() => document.getElementById("addNewShift").showModal()}
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
            Assign
          </button>

          <dialog id="addNewShift" className="modal">
            <div className="modal-box">
              <div className="flex flex-row justify-between">
                <h1 className="text-xl font-semibold">Assign Work Shift</h1>

                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>
              <form action="" method="dialog">
                <div className="flex flex-col gap-2 mx-5 mt-10 md:mx-10">
                  <select
                    id="emp_id"
                    name="emp_id"
                    className="select select-bordered w-full mb-2"
                    onChange={(e) =>
                      setNewShift({
                        ...newShift,
                        emp_num: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="" disabled selected>
                      Choose Employee
                    </option>

                    {emp.map((e) => (
                      <option value={e.emp_num}>
                        {e.s_name +
                          ", " +
                          e.f_name +
                          " " +
                          e.m_name +
                          "     |      " +
                          e.position_name}
                      </option>
                    ))}
                  </select>

                  <div>
                    <div className="flex">
                      {/* Time In */}

                      <div className="flex-1 mx-1">
                        <label>
                          <div className="label">
                            <h1 className="label-text">
                              Time In <span className="text-red-500"> *</span>
                            </h1>

                            <input
                              type="time"
                              className={`bg-white w-[100px] input input-bordered transition-all ease-in-out outline-none border border-[#e4e4e4] disabled:border-transparent px-1 rounded-[3px]`}
                              onChange={(e) =>
                                setNewShift({
                                  ...newShift,
                                  time_in: e.target.value,
                                })
                              }
                            />
                          </div>
                        </label>
                      </div>

                      {/* Time Out */}

                      <div className="flex-1 mx-1">
                        <label>
                          <div className="label">
                            <h1 className="label-text">
                              Time Out <span className="text-red-500"> *</span>
                            </h1>

                            <input
                              type="time"
                              className={`bg-white w-[100px] input input-bordered transition-all ease-in-out outline-none border border-[#e4e4e4] disabled:border-transparent px-1 rounded-[3px]`}
                              onChange={(e) =>
                                setNewShift({
                                  ...newShift,
                                  time_out: e.target.value,
                                })
                              }
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-active normal-case btn-md"
                    onClick={assignNewShift}
                  >
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>

        <DataTable
          className="mt-10"
          columns={shiftColumns}
          data={shifts}
          highlightOnHover
          pagination
        />
      </div>
    </>
  );
};

export default HRShiftChange;
