import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import { resolvePath, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HRControlAccess = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const navigate = useNavigate();
  const [notif, setNotif] = useState([]);

  var [employeeAccess, setEmployeeAccess] = useState([]);
  const [nonHRemployees, setNonHREmployees] = useState([]);

  const [newAccess, setNewAccess] = useState({});
  const [selectedRowId, setSelectedRowId] = useState('0');

  const [newHR, setNewHR] = useState({
    emp_id: "",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        axios.post(BASE_URL + "/pref-insertHRAccessData");

        const hr_access_res = await axios.get(BASE_URL + "/pref-getHRAccessData");
        setEmployeeAccess(hr_access_res.data);

        const non_hr_employees_res = await axios.get(BASE_URL + "/pref-getAllNonHREmployees");
        setNonHREmployees(non_hr_employees_res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllData();
  }, []);

  const renderEditData = (id, em, at, pu, a, pe, pa) => {
    setNewAccess({
      ...newAccess,
      hr_access_id: id,
      access_employee_management: em ? 1 : 0,
      access_applicant_tracking: at ? 1 : 0,
      access_pulse: pu ? 1 : 0,
      access_attendance: a ? 1 : 0,
      access_performance: pe ? 1 : 0,
      access_payroll: pa ? 1 : 0,
    });

    console.log(JSON.stringify(newAccess));
  }

  const handleChange = (id, event) => {
    //event.target.checked

    setNewAccess({
      ...newAccess,
      hr_access_id: id,
      [event.target.name]: [event.target.checked],
    });

    console.log(JSON.stringify(newAccess));
  };

  const handleNewAccess = (id) => {
    setSelectedRowId('0')

    axios
      .post(BASE_URL + "/pref-controlHRAccess", newAccess)
      .then((res) => {
        if (res.data === "success") {
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
  };

  const assignNewHr = () => {
    axios
      .post(BASE_URL + "/pref-makeSomeoneHR", newHR)
      .then((res) => {
        if (res.data === "success") {
          document.getElementById("addNewHRModal").close();

          notifySuccess();

          setTimeout(() => {
            window.top.location = window.top.location;
          }, 3500);

        } else if (res.data === "error") {
          notifyFailed();
        }

        setNotif(res.data);
      })
      .catch((err) => console.log(err));
  };


  const accessColumns = [
    {
      name: "Employee",
      selector: (row) =>
        row.f_name !== null ? row.f_name + " " + row.s_name : "",
      sortable: true,
    },
    {
      name: "Employee Management",
      selector: (row, i) => (
        <input
          type="checkbox"
          //defaultChecked={row.access_employee_management}
          className="checkbox checkbox-xs"
          name="access_employee_management"
          //value={newAccess.access_employee_management}
          defaultChecked={selectedRowId !== row.hr_access_id ? row.access_employee_management : newAccess.access_employee_management}
          onChange={(event) => handleChange(row.hr_access_id, event)}
          id={row.hr_access_id}
          disabled={selectedRowId === row.hr_access_id ? false : true}
        />
      ),
      sortable: true,
    },
    {
      name: "ATS",
      selector: (row, i) => (
        <input
          type="checkbox"
          //defaultChecked={row.access_applicant_tracking}
          //value={newAccess.access_applicant_tracking}
          defaultChecked={selectedRowId !== row.hr_access_id && row.access_applicant_tracking}
          className="checkbox checkbox-xs"
          name="access_applicant_tracking"
          onChange={(event) => handleChange(row.hr_access_id, event)}
          id={row.hr_access_id}
          disabled={selectedRowId === row.hr_access_id ? false : true}
        />
      ),
      sortable: true,
    },
    {
      name: "Pulse",
      selector: (row, i) => (
        <input
          type="checkbox"
          //defaultChecked={row.access_pulse}
          //value={newAccess.access_pulse}
          defaultChecked={selectedRowId !== row.hr_access_id && row.access_pulse}
          className="checkbox checkbox-xs"
          name="access_pulse"
          onChange={(event) => handleChange(row.hr_access_id, event)}
          id={row.hr_access_id}
          disabled={selectedRowId === row.hr_access_id ? false : true}
        />
      ),
      sortable: true,
    },
    {
      name: "Attendance",
      selector: (row, i) => (
        <input
          type="checkbox"
          //defaultChecked={row.access_attendance}
          //value={newAccess.access_attendance}
          defaultChecked={selectedRowId !== row.hr_access_id && row.access_attendance}
          className="checkbox checkbox-xs"
          name="access_attendance"
          onChange={(event) => handleChange(row.hr_access_id, event)}
          id={row.hr_access_id}
          disabled={selectedRowId === row.hr_access_id ? false : true}
        />
      ),
      sortable: true,
    },
    {
      name: "Performance",
      selector: (row, i) => (
        <input
          type="checkbox"
          //defaultChecked={row.access_performance}
          // value={newAccess.access_performance}
          defaultChecked={selectedRowId !== row.hr_access_id && row.access_performance}
          className="checkbox checkbox-xs"
          name="access_performance"
          onChange={(event) => handleChange(row.hr_access_id, event)}
          // id={row.hr_access_id}
          disabled={selectedRowId === row.hr_access_id ? false : true}
        />
      ),
      sortable: true,
    },
    {
      name: "Payroll",
      selector: (row, i) => (
        <input
          type="checkbox"
          //defaultChecked={row.access_payroll}
          //value={newAccess.access_payroll}
          defaultChecked={selectedRowId !== row.hr_access_id && row.access_payroll}
          className="checkbox checkbox-xs"
          name="access_payroll"
          onChange={(event) => handleChange(row.hr_access_id, event)}
          disabled={selectedRowId === row.hr_access_id ? false : true}
        />
      ),
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) =>
        selectedRowId !== row.hr_access_id ? (
          <div className="flex flex-row flex-nowrap gap-1">
            <button
              onClick={() => 
                {
                  setSelectedRowId(row.hr_access_id);
                  renderEditData(row.hr_access_id, row.access_employee_management, row.access_applicant_tracking, row.access_pulse, row.access_attendance, row.access_performance, row.access_payroll)}}
              className="btn btn-xs btn-success normal-case text-white"
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="flex flex-row flex-nowrap gap-1">
            <button
              onClick={() => handleNewAccess(row.hr_access_id)}
              className="btn btn-xs btn-success normal-case text-white"
            >
              Save
            </button>
          </div>
        ),
    },
  ];

  // const handleChange = (event) => {
  //   setNewSuperior({ ...newSuperior, [event.target.name]: [event.target.value] });
  //   console.log(JSON.stringify(newSuperior));
  // };

  const notifySuccess = () =>
    toast.success("Changed access role! ", {
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
          <h1 className="text-lg font-semibold mb-4"></h1>

          <button
            className="btn normal-case btn-sm"
            onClick={() =>
              document.getElementById("addNewHRModal").showModal()
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
            Assign New HR
          </button>

          <dialog id="addNewHRModal" className="modal">
            <div className="modal-box">
              <div className="flex flex-row justify-between">
                <h1 className="text-xl font-semibold">Assign a New HR Role</h1>

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
                    onChange={(event) => setNewHR({...newHR, emp_id: event.target.value})}
                    required
                  >
                    <option value="" disabled selected>
                      Choose Employee
                    </option>

                    {nonHRemployees.map((e) => (
                      <option value={e.emp_id}>
                        {e.s_name + ", " + e.f_name + " " + e.m_name}
                      </option>
                    ))}
                  </select>


                  <button
                    className="btn btn-active normal-case btn-md"
                    onClick={assignNewHr}
                  >
                    Assign new HR
                  </button>
                </div>
              </form>
            </div>
          </dialog>

        </div>

        <DataTable
          className="mt-10"
          columns={accessColumns}
          data={employeeAccess}
          highlightOnHover
          pagination
        />
      </div>
    </>
  );
};

export default HRControlAccess;
