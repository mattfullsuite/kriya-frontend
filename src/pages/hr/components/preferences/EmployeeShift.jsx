import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Subheadings from "../../../../components/universal/Subheadings";
import { useRef } from "react";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeShift = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  lightColor,
  focusBorder,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [emp, setEmp] = useState([]);
  const [notif, setNotif] = useState([]);

  const [shifts, setShifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [newShift, setNewShift] = useState({
    emp_num: "",
    time_in: "",
    time_out: "",
  });

  const [shiftInfo, setShiftInfo] = useState({
    shift_id: "",
    emp_num: "",
    emp_name: "",
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
  }, [shifts]);

  const assignModal = useRef(null);
  const editModal = useRef(null);

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
      selector: (row) =>
        row.start !== null
          ? moment(row.start, "HH:mm:ss a").format("hh:mm a")
          : "",
      sortable: true,
    },
    {
      name: "End Shift",
      selector: (row) =>
        row.end !== null ? moment(row.end, "HH:mm:ss a").format("hh:mm a") : "",
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">
          <button
            onClick={() => {
              setShiftInfo({
                shift_id: row.emp_shift_id,
                emp_num: row.emp_num,
                emp_name: row?.f_name + " " + row?.s_name,
                time_in: row.start,
                time_out: row.end,
              })
              editModal.current.showModal()}
            }
            className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} text-white rounded-[8px] text-[14px] px-3 py-2`}
          >
            Edit
          </button>
        </span>
      ),
    },
  ];

  const assignNewShift = () => {
    axios
      .post(BASE_URL + "/pref-addEmployeeShift", newShift)
      .then((res) => {
        if (res.data === "success") {
          assignModal.current.close();
          notifySuccess();
        } else if (res.data === "error") {
          assignModal.current.close();
          notifyFailed();
        }

        setNotif(res.data);
      })
      .catch((err) => console.log(err));
  };

  const changeShift = () => {
    axios
      .post(BASE_URL + "/pref-changeEmployeeShift", shiftInfo)
      .then((res) => {
        if (res.data === "success") {
          editModal.current.close();
          notifySuccess();
        } else if (res.data === "error") {
          editModal.current.close();
          notifyFailed();
        }
        setNotif(res.data);
      })
      .catch((err) => console.log(err));
  };

  const notifySuccess = () =>
    toast.success("Success!", {
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
      <div className="max-w-[1300px] m-auto p-5">
        <p className="text-[20px] font-bold text-[#363636]">Employee Shift</p>

        <div className="mt-10">
          <div className={`${lightColor} p-3 rounded-t-[15px] flex gap-2`}>
            <input
              type="text"
              className="flex-1 outline-none border border-[#e4e4e4] rounded-[8px] px-3 text-[14px] text-[#363636]"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* <select className="outline-none border border-[#e4e4e4] text-[#363636] text-[14px] rounded-[8px] px-3">
              <option>Filter</option>
            </select> */}

            <button
              onClick={() => assignModal.current.showModal()}
              className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} text-white rounded-[8px] text-[14px] px-3 py-2`}
            >
              Assign Shift
            </button>
          </div>
          <div className="bg-white border border-[#e4e4e4] p-5 rounded-b-[15px]">
            <DataTable
              columns={shiftColumns}
              //data={shifts}
              data={shifts.filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (
                  item?.emp_num.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item?.f_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item?.s_name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return item;
                }
              })}
              highlightOnHover
              pagination
            />
          </div>
        </div>
      </div>

      {/* assigning shift modal */}

      <dialog className="modal" ref={assignModal}>
        <div className="modal-box w-10/12 max-w-xl">
          <span className="text-[18px] text-[#363636] font-bold">
            Assign Shift
          </span>
          <button
            onClick={() => assignModal.current.close()}
            className="outline-none absolute right-2 top-2 btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>

          <div className="mt-10">
            <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
              Employee Name
            </label>
            <select
              className={`outline-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full px-3 py-2 text-[14px] text-[#363636]`}
              onChange={(e) =>
                setNewShift({
                  ...newShift,
                  emp_num: e.target.value,
                })
              }
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

            <div className="mt-10 flex gap-5">
              <div className="flex-1">
                <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
                  Start Shift
                </label>

                <input
                  type="time"
                  className={`outline-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full px-3 py-2 text-[14px] text-[#363636]`}
                  onChange={(e) =>
                    setNewShift({
                      ...newShift,
                      time_in: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex-1">
                <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
                  End Shift
                </label>

                <input
                  type="time"
                  className={`outline-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full px-3 py-2 text-[14px] text-[#363636]`}
                  onChange={(e) =>
                    setNewShift({
                      ...newShift,
                      time_out: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-3">
              <button
                onClick={() => {
                  assignModal.current.close();
                }}
                className="transition ease-in-out outline-none text-[14px] text-[#363636] bg-[#e4e4e4] hover:bg-[#cccccc] rounded-[8px] px-3 py-2"
              >
                Cancel
              </button>

              <button
                onClick={() => assignNewShift()}
                className={`transition ease-in-out outline-none text-[14px] text-white rounded-[8px] px-3 py-2 ${bgColor} ${hoverColor}`}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/* edit shift modal */}

      <dialog className="modal" ref={editModal}>
        <div className="modal-box w-10/12 max-w-xl">
          <span className="text-[18px] text-[#363636] font-bold">
            Change Shift
          </span>
          <button
            onClick={() => editModal.current.close()}
            className="outline-none absolute right-2 top-2 btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>

          <div className="mt-10">
            <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
              Employee Name
            </label>
            <div
              className={`outline-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full px-3 py-2 text-[14px] text-[#363636]`}
            >
              <p>{shiftInfo.emp_name}</p>
            </div>

            <div className="mt-10 flex gap-5">
              <div className="flex-1">
                <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
                  Start Shift
                </label>

                <input
                  type="time"
                  value={shiftInfo.time_in}
                  onChange={(e) =>
                    setShiftInfo({
                      ...shiftInfo,
                      time_in: e.target.value,
                    })
                  }
                  className={`outline-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full px-3 py-2 text-[14px] text-[#363636]`}
                />
              </div>

              <div className="flex-1">
                <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
                  End Shift
                </label>

                <input
                  type="time"
                  value={shiftInfo.time_out}
                  onChange={(e) =>
                    setShiftInfo({
                      ...shiftInfo,
                      time_out: e.target.value,
                    })
                  }
                  className={`outline-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full px-3 py-2 text-[14px] text-[#363636]`}
                />
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-3">
              <button
                onClick={() => editModal.current.close()}
                className="transition ease-in-out outline-none text-[14px] text-[#363636] bg-[#e4e4e4] hover:bg-[#cccccc] rounded-[8px] px-3 py-2"
              >
                Cancel
              </button>

              <button
                className={`transition ease-in-out outline-none text-[14px] text-white rounded-[8px] px-3 py-2 ${bgColor} ${hoverColor}`}
                onClick={() => changeShift()}
              >
                Change Shift
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EmployeeShift;
