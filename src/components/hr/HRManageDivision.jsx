import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HRManageDivision = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const navigate = useNavigate();

  const [newDivision, setNewDivision] = useState({
    div_name: "",
  });

  const [newDepartment, setNewDepartment] = useState({
    div_id: '',
    dept_name: "",
  });

  const [newPosition, setNewPosition] = useState({
    dept_id: '',
    position_name: '',
  })

  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    const fetchAllDivision = async () => {
      try {
        const res = await axios.get(BASE_URL + "/getAllDivisions");

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
        const res = await axios.get(BASE_URL + "/getAllDepartments");

        setDepartment(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllDepartment();
  }, []);

  const handleChange1 = (event) => {
    setNewDivision({ ...newDivision, [event.target.name]: [event.target.value] });
    console.log("DIVISION:" + JSON.stringify(newDivision))
  };

  const handleChange2 = (event) => {
    setNewDepartment({ ...newDepartment, [event.target.name]: [event.target.value] });
    console.log("DEPARTMENT:" + JSON.stringify(newDepartment))
  };

  const handleChange3 = (event) => {
    setNewPosition({ ...newPosition, [event.target.name]: [event.target.value] });
    console.log("POSITION:" + JSON.stringify(newPosition))
  };

  const [isDivVisible, setIsDivVisible] = useState(false)
  const [isDeptVisible, setIsDeptVisible] = useState(false)
  const [isPositionVisible, setIsPositionVisible] = useState(false)

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

  const showFirst = () => {
    setIsDivVisible(true)
    setIsDeptVisible(false)
    setIsPositionVisible(false)
  }

  const showSecond = () => {
    setIsDivVisible(false)
    setIsDeptVisible(true)
    setIsPositionVisible(false)
  }

  const showThird = () => {
    setIsDivVisible(false)
    setIsDeptVisible(false)
    setIsPositionVisible(true)
  }

  const handleSubmit1 = (event) => {
    event.preventDefault()
    axios.post(BASE_URL + '/addNewDivision', newDivision)
    .then(res => console.log("Registered Successfully"))
    .catch(err => console.log(err));
  }

  const handleSubmit2 = (event) => {
    event.preventDefault()
    axios.post(BASE_URL + '/addNewDepartment', newDepartment)
    .then(res => console.log("Registered Successfully"))
    .catch(err => console.log(err));
  }

  const handleSubmit3 = (event) => {
    event.preventDefault()
    axios.post(BASE_URL + '/addNewPosition', newPosition)
    .then(res => console.log("Registered Successfully"))
    .catch(err => console.log(err));
  }
  


  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      <div className="mx-5 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col justify-center align-middle md:w-3/4">
        <div className="flex flex-row justify-between">

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Add New Division</span> 
            <input type="radio" id="radio-1" name="radio-10" className="radio checked:bg-red-500" 
            onClick={showFirst} />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Add New Department</span> 
            <input type="radio" id="radio-2" name="radio-10" className="radio checked:bg-blue-500" 
            onClick={showSecond} />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Add New Position</span> 
            <input type="radio" id="radio-3"name="radio-10" className="radio checked:bg-yellow-500" 
            onClick={showThird} />
          </label>
        </div>

      

        {/* <ul className="steps steps-vertical">
          <li className="step step-primary">
            <div>
              <select
              id="div_id"
              name="div_id"
              className="select select-bordered w-full max-w-xs"
              onChange={handleChange}
              required
              >
                <option disabled selected>Select Existing Division</option>
                {division.map((di) => (
                <option value={di.div_id}>{di.div_name}</option>
                ))}
              </select>

              <input
                id="div_id"
                name="div_id"
                type="text"
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </li>
          <li className="step">Department</li>
          <li className="step">Position</li>
        </ul> */}


          {/* <h1 className="text-lg font-semibold mb-4">Division</h1>

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
          </dialog> */}
        </div>

        {/* <DataTable
          className="mt-10"
          columns={divisionColumns}
          data={division}
          highlightOnHover
          pagination
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        /> */}
      </div>

      <div className="mx-5 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col justify-center align-middle md:w-3/4">
        <div className="flex flex-row justify-between">

 {/* ----------------------------- DIViSION DIV -------------------------------- */}

          <div id="division-div" style={{ display: isDivVisible ? "block" : "none" }}>
          <h1>Division Div </h1>
          <input
            id="div_name"
            name="div_name"
            type="text"
            onChange={handleChange1}
            placeholder="Enter New Division Name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
          />
          <button className="btn btn-sm" onClick={handleSubmit1}>Add New Division</button>
        </div>

        {/* ----------------------------- DEPARTMENT DIV -------------------------------- */}

        <div id="department-div" style={{ display: isDeptVisible ? "block" : "none" }}>
        <h1>Department Div </h1>

          <select
              id="div_id"
              name="div_id"
              className="select select-bordered w-full max-w-xs"
              onChange={handleChange2}
              >
                <option disabled selected>Select Existing Division</option>
                {division.map((di) => (
                <option value={di.div_id}>{di.div_name}</option>
                ))}
          </select>

          <input
            id="dept_name"
            name="dept_name"
            type="text"
            onChange={handleChange2}
            placeholder="Enter New Department Name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
          />
          <button className="btn btn-sm" onClick={handleSubmit2}>Add New Department</button>


        </div>

         {/* ----------------------------- POSITION DIV -------------------------------- */}

        <div id="position-div" style={{ display: isPositionVisible ? "block" : "none" }}>
        <h1>Position Div </h1>

        <select
              id="div_id"
              name="div_id"
              className="select select-bordered w-full max-w-xs"
              onChange={handleChange3}
              >
                <option disabled selected>Select Existing Division</option>
                {division.map((di) => (
                <option value={di.div_id}>{di.div_name}</option>
                ))}
        </select>

        <select
              id="dept_id"
              name="dept_id"
              className="select select-bordered w-full max-w-xs"
              onChange={handleChange3}
              >
                <option disabled selected>Select Existing Department</option>
                {department.map((de) => (
                <option value={de.dept_id}>{de.dept_name}</option>
                ))}
        </select>

        <input
            id="position_name"
            name="position_name"
            type="text"
            onChange={handleChange3}
            placeholder="Enter New Position Name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
          />

        <button className="btn btn-sm" onClick={handleSubmit3}>Add New Position</button>

        </div>
        
        </div>
        </div>
    </>
  );
};

export default HRManageDivision;
