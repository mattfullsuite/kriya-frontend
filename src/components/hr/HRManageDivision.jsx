import React, { useState, useEffect } from "react";
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
    div_id: "",
    dept_name: "",
  });

  const [newPosition, setNewPosition] = useState({
    dept_id: "",
    position_name: "",
  });

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
    setNewDivision({
      ...newDivision,
      [event.target.name]: [event.target.value],
    });
    console.log("DIVISION:" + JSON.stringify(newDivision));
  };

  const handleChange2 = (event) => {
    setNewDepartment({
      ...newDepartment,
      [event.target.name]: [event.target.value],
    });
    console.log("DEPARTMENT:" + JSON.stringify(newDepartment));
  };

  const handleChange3 = (event) => {
    setNewPosition({
      ...newPosition,
      [event.target.name]: [event.target.value],
    });
    console.log("POSITION:" + JSON.stringify(newPosition));
  };

  const [isDivVisible, setIsDivVisible] = useState(false);
  const [isDeptVisible, setIsDeptVisible] = useState(false);
  const [isPositionVisible, setIsPositionVisible] = useState(false);

  const notifySuccess1 = () =>
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

    const notifySuccess2 = () =>
    toast.success("Successfully added new department: " + newDepartment.dept_name, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    const notifySuccess3 = () =>
    toast.success("Successfully added new position: " + newPosition.position_name, {
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

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  const showFirst = () => {
    setIsDivVisible(true);
    setIsDeptVisible(false);
    setIsPositionVisible(false);
  };

  const showSecond = () => {
    setIsDivVisible(false);
    setIsDeptVisible(true);
    setIsPositionVisible(false);
  };

  const showThird = () => {
    setIsDivVisible(false);
    setIsDeptVisible(false);
    setIsPositionVisible(true);
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    axios
      .post(BASE_URL + "/addNewDivision", newDivision)
      .then(
        function (res) {
          if(res.data === "success") {
              notifySuccess1();
          }
    
          else if(res.data === "error") {
              notifyFailed();
          }
    
          setNotif(res.data)
      }
      )      .catch((err) => console.log(err));
  };




  const handleSubmit2 = (event) => {
    event.preventDefault();
    axios
      .post(BASE_URL + "/addNewDepartment", newDepartment)
      .then(
        function (res) {
          if(res.data === "success") {
              notifySuccess2();
          }
    
          else if(res.data === "error") {
              notifyFailed();
          }
    
          setNotif(res.data)
      }
      )
      .catch((err) => console.log(err));
  };

  const handleSubmit3 = (event) => {
    event.preventDefault();
    axios
      .post(BASE_URL + "/addNewPosition", newPosition)
      .then(
        function (res) {
          if(res.data === "success") {
              notifySuccess3();
          }
    
          else if(res.data === "error") {
              notifyFailed();
          }
    
          setNotif(res.data)
      }
      )
      .catch((err) => console.log(err));
  };

  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      <div className="mx-5 p-4 flex flex-col justify-center align-middle md:w-3/4">
        <div className="flex flex-row justify-between">
          <div>
            {/* Division Collapse */}
            <details class="collapse collapse-plus bg-base-200">
              <summary
                onClick={showFirst}
                class="collapse-title text-md font-medium"
              >
                Add New Division
              </summary>
              <div class="collapse-content">
                <div
                  id="division-div"
                  style={{ display: isDivVisible ? "block" : "none" }}
                >
                  <input
                  required
                    id="div_name"
                    name="div_name"
                    type="text"
                    onChange={handleChange1}
                    placeholder="Enter New Division Name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
                  />
                  <button className="btn btn-sm" onClick={handleSubmit1}>
                    Add New Division
                  </button>
                </div>
              </div>
            </details>
          </div>

          <div>
            {/* Department Collapse */}
            <details class="collapse collapse-plus bg-base-200">
              <summary
                onClick={showSecond}
                class="collapse-title text-md font-medium"
              >
                Add New Department
              </summary>
              <div class="collapse-content collapse-plus">
                <div
                  id="department-div"
                  style={{ display: isDeptVisible ? "block" : "none" }}
                >
                  <h1>Add New Department </h1>

                  <select
                    id="div_id"
                    name="div_id"
                    className="select select-bordered w-full max-w-xs"
                    onChange={handleChange2}
                  >
                    <option disabled selected>
                      Select Existing Division
                    </option>
                    {division.map((di) => (
                      <option value={di.div_id}>{di.div_name}</option>
                    ))}
                  </select>

                  <input
                  required
                    id="dept_name"
                    name="dept_name"
                    type="text"
                    onChange={handleChange2}
                    placeholder="Enter New Department Name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
                  />
                  <button className="btn btn-sm" onClick={handleSubmit2}>
                    Add New Department
                  </button>
                </div>
              </div>
            </details>
          </div>

          <div>
            {/* Position Collapse */}
            <details class="collapse collapse-plus bg-base-200">
              <summary
                onClick={showThird}
                class="collapse-title text-md font-medium"
              >
                Add New Position
              </summary>
              <div class="collapse-content">
                <div
                  id="position-div"
                  style={{ display: isPositionVisible ? "block" : "none" }}
                >
                  <h1>Add New Position</h1>

                  <select
                    id="div_id"
                    name="div_id"
                    className="select select-bordered w-full max-w-xs"
                    onChange={handleChange3}
                  >
                    <option disabled selected>
                      Select Existing Division
                    </option>
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
                    <option disabled selected>
                      Select Existing Department
                    </option>
                    {department.map((de) => (
                      <option value={de.dept_id}>{de.dept_name}</option>
                    ))}
                  </select>

                  <input
                  required
                    id="position_name"
                    name="position_name"
                    type="text"
                    onChange={handleChange3}
                    placeholder="Enter New Position Name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
                  />

                  <button className="btn btn-sm" onClick={handleSubmit3}>
                    Add New Position
                  </button>
                </div>
              </div>
            </details>
          </div>

        </div>
      </div>
    </>
  );
};

export default HRManageDivision;
