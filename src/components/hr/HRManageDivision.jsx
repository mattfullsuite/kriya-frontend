import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HRManageDivision = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const navigate = useNavigate();
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const [newDivision, setNewDivision] = useState({
    div_name: "",
  });
  const [newDepartment, setNewDepartment] = useState({
    dept_name: "",
  });
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    const fetchAllDivision = async () => {
      try {
        const res = await axios.get(BASE_URL + "/division");

        setDivision(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllDivision();
  }, []);

  useEffect(() => {
    const fetchAllDepartment = async () => {
      try {
        const res = await axios.get(BASE_URL + "/department");

        setDepartment(res.dept);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllDepartment();
  }, []);

  const divisionColumns = [
    {
      name: "Division",
      selector: (row) => row.div_name,
    },
    {
      name: "Actions",
      selector: (row) => (
        <button
          onClick={() => handleDelete(row.div_id)}
          className="btn btn-xs btn-error normal-case text-white"
        >
          Delete
        </button>
      ),
    },
  ];

  const departmentColumns = [
    {
      name: "Department",
      selector: (row) => row.dept_name,
    },
    {
      name: "Actions",
      selector: (row) => (
        <button
          onClick={() => handleDelete(row.dept_id)}
          className="btn btn-xs btn-error normal-case text-white"
        >
          Delete
        </button>
      ),
    },
  ];

  const handleChange = (event) => {
    setNewDivision({ ...newDivision, [event.target.name]: [event.target.value] });
  };

  const handleDelete = async (div_id) => {
    try {
      await axios.delete(BASE_URL + "/division/" + div_id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const addNewDivision = () => {
    axios
      .post(BASE_URL + "/addDivision", newDivision)
      .then((res) => {
        if (res.data === "success") {
          document.getElementById("divisionAddModal").close();

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

  const notifySuccess = () =>
    toast.success("Successfully added new division: " + newDivision.div_name, {
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

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      <div className="mx-5 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col justify-center align-middle md:w-3/4">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-semibold mb-4">Division</h1>

          <button
            className="btn normal-case btn-sm"
            onClick={() =>
              document.getElementById("divisionAddModal").showModal()
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

          <dialog id="divisionAddModal" className="modal">
            <div className="modal-box">
              <div className="flex flex-row justify-between">
                <h1 className="text-xl font-semibold">Add Division</h1>

                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>
              <form action="" method="dialog">

              <div className="flex flex-col gap-2 mx-5 mt-10 md:mx-10">
                  <input
                    type="text"
                    name="div_name"
                    id="division_name"
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Division Name"
                    required
                  />

                  <button
                    className="btn btn-active normal-case btn-md"
                    onClick={addNewDivision}
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
          columns={divisionColumns}
          data={division}
          highlightOnHover
          pagination
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </>
  );
};

export default HRManageDivision;
