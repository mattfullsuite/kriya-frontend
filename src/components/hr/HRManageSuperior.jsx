import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HRManageSuperior = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [emp, setEmp] = useState([]);
  const [newSuperior, setNewSuperior] = useState({
    emp_id: "",
    superior_id: "",
  });
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/getInferiorAndSuperior");
        const res2 = await axios.get(BASE_URL + "/req-allemployees");
        setDepartments(res.data);
        setEmp(res2.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllData();
  }, []);

  const departmentColumns = [
    {
      name: "Employee",
      selector: (row) => (row.f_name !== null) ? row.f_name + " " + row.s_name : "",
      sortable: true,
    },
    {
      name: "Superior",
      selector: (row) => (row.s_f_name !== null) ? row.s_f_name + " " + row.s_s_name : "",
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
    setNewSuperior({ ...newSuperior, [event.target.name]: [event.target.value] });
    console.log(JSON.stringify(newSuperior));
  };

  const assignNewSuperior = () => {
    axios
      .post(BASE_URL + "/addSuperior", newSuperior)
      // .then((res) => console.log(JSON.stringify(newHoliday)))
      .then((res) => {
        if (res.data === "success") {
          document.getElementById("superiorAddModal").close();

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
        newSuperior.superior_id +
        " the new superior " +
        newSuperior.emp_id,
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
      <div className="mx-5 p-4 border border-[#e4e4e4] rounded-[15px] flex flex-col justify-center align-middle md:w-3/4">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-semibold mb-4"></h1>

          <button
            className="btn normal-case btn-sm"
            onClick={() =>
              document.getElementById("superiorAddModal").showModal()
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

          <dialog id="superiorAddModal" className="modal">
            <div className="modal-box">
              <div className="flex flex-row justify-between">
                <h1 className="text-xl font-semibold">Assign Superior For Employee</h1>

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
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled selected>
                      Choose Employee
                    </option>

                    {emp.map((e) => (
                      <option value={e.emp_id}>
                        {e.s_name + ", " + e.f_name + " " + e.m_name + "     |      " + e.position_name}
                      </option>
                    ))}
                  </select>

                  <select
                    id="superior_id"
                    name="superior_id"
                    className="select select-bordered w-full mb-2"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled selected>
                      Choose Superior
                    </option>

                    {emp.map((e) => (
                      <option value={e.emp_id}>
                        {e.s_name + ", " + e.f_name + " " + e.m_name + "     |      " + e.position_name}
                      </option>
                    ))}
                  </select>

                  <button
                    className="btn btn-active normal-case btn-md"
                    onClick={assignNewSuperior}
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

export default HRManageSuperior;
