import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HRManageLeads = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [emp, setEmp] = useState([]);
  const [newLead, setNewLead] = useState({
    dept_id: "",
    manager_id: "",
  });
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        const res = await axios.get(BASE_URL + "/getManagersInEmpDesignation");
        const res2 = await axios.get(BASE_URL + "/employeeslist");
        setDepartments(res.data);
        setEmp(res2.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllDepartments();
  }, []);

  const departmentColumns = [
    {
      name: "Division",
      selector: (row) => (row.div_name !== "Not Applicable") ? row.div_name : "Executive",
      sortable: true,
    },{
      name: "Department",
      selector: (row) => (row.dept_name !== "Not Applicable") ? row.dept_name : "Executive",
      sortable: true,
    },
    {
      name: "Team Manager",
      selector: (row) => (row.f_name !== null) ? row.f_name + " " + row.s_name : "",
      sortable: true,
    },
    // {
    //   name: "Actions",
    //   selector: (row) => (
    //     <div className="flex flex-row flex-nowrap gap-1">
    //       <button
    //         //onClick={() => handleDelete(row.dept_id)}
    //         className="btn btn-xs btn-success normal-case text-white"
    //       >
    //         Add
    //       </button>
    //       <button
    //         //onClick={() => handleDelete(row.dept_id)}
    //         className="btn btn-xs btn-error normal-case text-white"
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  const handleChange = (event) => {
    setNewLead({ ...newLead, [event.target.name]: [event.target.value] });
  };

  // const handleDelete = async (h_id) => {
  //   try {
  //     await axios.delete(BASE_URL + "/holiday/" + h_id);
  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const makeNewDeptLead = () => {
    axios
      .post(BASE_URL + "/makeDeptLead", newLead)
      // .then((res) => console.log(JSON.stringify(newHoliday)))
      .then((res) => {
        if (res.data === "success") {
          document.getElementById("managerAddModal").close();

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
    toast.success(
      "Successfully made: " +
        newLead.h_name +
        " the new lead of " +
        newLead.dept_name,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );

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
      <div className="mx-5 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col justify-center align-middle md:w-3/4">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-semibold mb-4">Create New Lead</h1>

          <button
            className="btn normal-case btn-sm"
            onClick={() =>
              document.getElementById("managerAddModal").showModal()
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
            Assign
          </button>

          <dialog id="managerAddModal" className="modal">
            <div className="modal-box">
              <div className="flex flex-row justify-between">
                <h1 className="text-xl font-semibold">Assign New Manager</h1>

                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>
              <form action="" method="dialog">
                <div className="flex flex-col gap-2 mx-5 mt-10 md:mx-10">
                  <select
                    id="dept_id"
                    name="dept_id"
                    className="select select-bordered w-full mb-2"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled selected>
                      Choose Department
                    </option>

                    {departments.map((dept) => (
                      <option value={dept.dept_id}>{dept.dept_name}</option>
                    ))}
                  </select>

                  <select
                    id="emp_id"
                    name="emp_id"
                    className="select select-bordered w-full mb-2"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled selected>
                      Choose Employee
                    </option>

                    {emp.map((e) => (
                      <option value={e.emp_id}>
                        {e.s_name + ", " + e.f_name}
                      </option>
                    ))}
                  </select>

                  <button
                    className="btn btn-active normal-case btn-md"
                    onClick={makeNewDeptLead}
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
          columns={departmentColumns}
          data={departments}
          highlightOnHover
          pagination
        />
      </div>
    </>
  );
};

export default HRManageLeads;
