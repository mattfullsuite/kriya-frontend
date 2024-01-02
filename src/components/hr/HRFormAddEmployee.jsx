import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import ButtonBack from "../universal/ButtonBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const HRFormAddEmployee = () => {
  const [userReference, setUserReferences] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //


  const [companies, setCompanies] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [clients, setClients] = useState([]);
  const [positions, setPositions] = useState([]);
  const [notif, setNotif] = useState([]);
  const navigate = useNavigate();

  const notifySuccess = () =>
    toast.success("Successfully added!", {
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

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const res1 = await axios.get(BASE_URL + "/employeeslist");
        const res2 = await axios.get(BASE_URL + "/getAllCompanies");
        const res3 = await axios.get(BASE_URL + "/getAllDivisions");
        const res4 = await axios.get(BASE_URL + "/getAllDepartments");
        const res5 = await axios.get(BASE_URL + "/getAllClients");
        const res6 = await axios.get(BASE_URL + "/getAllPositions");
        setUserReferences(res1.data);
        setCompanies(res2.data);
        setDivisions(res3.data);
        setDepartments(res4.data);
        setClients(res5.data);
        setPositions(res6.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReferences();
  }, []);

  const isFound = () => {
    userReference.some((element) => {
      const email_box = document.getElementById("work_email");
      const emp_num_box = document.getElementById("emp_num");

      if (element.work_email === email_box.value) {
        return (document.getElementById("work_email_label").innerHTML =
          " * (Email already exists!)");
      } else {
        document.getElementById("work_email_label").innerHTML = " *";
      }

      if (element.emp_num === emp_num_box.value) {
        return (document.getElementById("emp_num_label").innerHTML =
          " * (Employee ID already exists!)");
      } else {
        document.getElementById("emp_num_label").innerHTML = " *";
      }
    });
  };

  const [employeeInfo, setEmployeeInfo] = useState({
    emp_num: "",
    work_email: "",
    f_name: "",
    m_name: "",
    s_name: "",
    emp_role: "",
    personal_email: "",
    contact_num: "",
    dob: "",
    p_address: "",
    c_address: "",
    date_hired: "",
    date_regularization: "",
    emp_status: "",
    sex: "",
    gender: "",
    civil_status: "",
    company_id: "",
    div_id: "",
    dept_id: "",
    client_id: "",
    position_id: "",
    emp_pic: null,
  });

  const handleChange = (event) => {
    setEmployeeInfo({ ...employeeInfo, emp_pic: event.target.files[0] });
    console.log(JSON.stringify(employeeInfo));
    isFound();
  };

  const disableNext = () => {
    var dateFrom = document.getElementById("date_hired").value;

    document.getElementById("date_regularization").min =
      moment(dateFrom).format("YYYY-MM-DD");
  };

  const isSameAddress = () => {
    if (document.getElementById("same_address_checkbox").checked) {
      document.getElementById("same_address_checkbox").value =
        document.getElementById("p_address").value;
      document.getElementById("c_address").value =
        document.getElementById("p_address").value;
      setEmployeeInfo({
        ...employeeInfo,
        c_address: document.getElementById("p_address").value,
      });
    } else {
      document.getElementById("c_address").value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append("emp_num", employeeInfo.emp_num);
    data.append("work_email", employeeInfo.work_email);
    data.append("f_name", employeeInfo.f_name);
    data.append("m_name", employeeInfo.m_name);
    data.append("s_name", employeeInfo.s_name);
    data.append("emp_role", employeeInfo.emp_role);
    data.append("personal_email", employeeInfo.personal_email);
    data.append("contact_num", employeeInfo.contact_num);
    data.append("dob", employeeInfo.dob);
    data.append("p_address", employeeInfo.p_address);
    data.append("c_address", employeeInfo.c_address);
    data.append("date_hired", employeeInfo.date_hired);
    data.append("date_regularization", employeeInfo.date_regularization);
    data.append("emp_status", employeeInfo.emp_status);
    data.append("sex", employeeInfo.sex);
    data.append("gender", employeeInfo.gender);
    data.append("civil_status", employeeInfo.civil_status);
    data.append("company_id", employeeInfo.company_id);
    data.append("div_id", employeeInfo.div_id);
    data.append("client_id", employeeInfo.client_id);
    data.append("position_id", employeeInfo.position_id);
    data.append("emp_pic", employeeInfo.emp_pic);

    await axios
      .post(BASE_URL + "/addNewEmployee", data)
      .then((response) => {
        if (response.data == "success") {

          notifySuccess();


          setTimeout(function () {
            navigate("/hrDashboard")
          }, 3500);
        } else if (response.data == "error") {
          notifyFailed();
        }

        setNotif(response.data);
      })
      .catch(
        function(err) {
          notifyFailed();
          setNotif("error");
        }
      );
  };

  // const addNewEmployee = async () => {
  //   const config = {
  //     headers: { "content-type": "multipart/form-data" },
  //   };
  //   await axios
  //     .post("http://localhost:6197/addNewEmployee", employeeInfo, config)
  //     .then((res) => console.log(JSON.stringify(employeeInfo)))
  //     .catch((err) => console.log(err));

  //   window.location.reload();
  //   alert("Successfully added new employee: " + employeeInfo.emp_num);
  // };

  return (
    <>
      <>
        {notif != "" && notif === "success" && <ToastContainer />}
        {notif != "" && notif === "error" && <ToastContainer />}
        <div className="p-4 sm:ml-64 flex flex-col">
          <ButtonBack></ButtonBack>
          <div className="m-2">
            <h1 className="text-3xl font-bold tracking-wide">
              Add New Employee
            </h1>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Personal Information */}
            <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col">
              <h1 className="font-bold">Personal Information</h1>

              <div className="flex flex-col md:flex-row">
                {/* First Name */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      First Name<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="f_name"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        f_name: e.target.value,
                      })
                    }
                    type="text"
                    maxlength="100"
                    className="input input-bordered w-full "
                    required
                  />
                </label>

                {/* Middle Name */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Middle Name<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="m_name"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        m_name: e.target.value,
                      })
                    }
                    type="text"
                    maxlength="100"
                    className="input input-bordered w-full "
                    required
                  />
                </label>

                {/* Surname */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Surname<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="s_name"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        s_name: e.target.value,
                      })
                    }
                    type="text"
                    maxlength="100"
                    className="input input-bordered w-full "
                    required
                  />
                </label>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Date of Birth */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Date of Birth<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="dob"
                    onChange={(e) =>
                      setEmployeeInfo({ ...employeeInfo, dob: e.target.value })
                    }
                    type="date"
                    max={moment().format("YYYY-MM-DD")}
                    className="input input-bordered w-full"
                    required
                  />
                </label>

                {/* Civil Status */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Civil Status</span>
                  </div>
                  <select
                    name="civil_status"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        civil_status: e.target.value,
                      })
                    }
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" hidden>
                      Select Civil Status
                    </option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Widowed</option>
                  </select>
                </label>

                {/* Sex */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Sex<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <select
                    name="sex"
                    onChange={(e) =>
                      setEmployeeInfo({ ...employeeInfo, sex: e.target.value })
                    }
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" hidden>
                      Select Sex
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </label>

                {/* Gender */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    name="gender"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        gender: e.target.value,
                      })
                    }
                    type="text"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Permanent Address */}
                <label className="form-control w-full max-w-5xl md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Permanent Address<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    id="p_address"
                    name="p_address"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        p_address: e.target.value,
                      })
                    }
                    type="text"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Current Address */}
                <label className="form-control w-full max-w-5xl md:mb-0 md:mr-4">
                  <div className="label pb-0">
                    <span className="label-text">
                      Current Address<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <div className="flex items-center ">
                    {" "}
                    <label className="label cursor-pointer">
                      <input
                        id="same_address_checkbox"
                        name="c_address"
                        type="checkbox"
                        value=""
                        className="checkbox checkbox-sm"
                        onClick={isSameAddress}
                        onChange={(e) =>
                          setEmployeeInfo({
                            ...employeeInfo,
                            c_address: e.target.value,
                          })
                        }
                      />
                      <span className="label-text ml-2">
                        {" "}
                        Same as Permanent Address
                      </span>
                    </label>
                  </div>
                  <input
                    id="c_address"
                    name="c_address"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        c_address: e.target.value,
                      })
                    }
                    type="text"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col">
              <h1 className="font-bold">Contact Information</h1>

              <div className="flex flex-col md:flex-row">
                {/* Personal Email */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Personal Email<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="personal_email"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        personal_email: e.target.value,
                      })
                    }
                    type="email"
                    className="input input-bordered w-full "
                  />
                </label>
                {/* Contact Number */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Contact Number<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="contact_num"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        contact_num: e.target.value,
                      })
                    }
                    type="number"
                    className="input input-bordered w-full "
                  />
                </label>
                <div></div>
              </div>
              <div className="divider"></div>
              <p className="font-semibold text-red-500 text-sm">
                Emergency Contact Information
              </p>
              <div className="flex flex-col md:flex-row">
                {/* Name */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Name</span>
                  </div>
                  <input
                    name="emergency_contact_name"
                    // onChange={handleChange}
                    type="text"
                    className="input input-bordered w-full "
                  />
                </label>

                {/* Number */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Contact Number</span>
                  </div>
                  <input
                    name="emergency_contact_num"
                    // onChange={handleChange}
                    type="number"
                    className="input input-bordered w-full "
                  />
                </label>
              </div>
            </div>

            {/* Employee Information */}
            <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col">
              <h1 className="font-bold mb-2">Employee Information</h1>

              <div className="flex flex-col w-full md:flex-row">
                {/* Employee ID */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Employee ID
                      <span id="emp_num_label" className="text-red-500">
                        {" "}
                        *
                      </span>
                    </span>
                  </div>
                  <div className="flex">
                    <select
                      id="company_id"
                      name="company_id"
                      className="select select-bordered w-32"
                      onChange={(e) =>
                        setEmployeeInfo({
                          ...employeeInfo,
                          company_id: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="" hidden>
                        Company
                      </option>
                      {companies.map((c) => (
                        <option value={c.company_id}>{c.company_name}</option>
                      ))}
                    </select>

                    <input
                      id="emp_num"
                      name="emp_num"
                      onChange={(e) =>
                        setEmployeeInfo({
                          ...employeeInfo,
                          emp_num: e.target.value,
                        })
                      }
                      type="text"
                      maxlength="100"
                      className="input input-bordered w-full "
                    />
                  </div>
                </label>

                {/* Work Email */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Work E-mail
                      <span id="work_email_label" className="text-red-500">
                        {" "}
                        *
                      </span>
                    </span>
                  </div>
                  <input
                    id="work_email"
                    name="work_email"
                    maxlength="100"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        work_email: e.target.value,
                      })
                    }
                    type="email"
                    className="input input-bordered w-full "
                    required
                  />
                </label>
              </div>

              <div className="flex flex-col w-full md:flex-row">
                {/* Division */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Division
                      <span id="division_label" className="text-red-500">
                        {" "}
                        *
                      </span>
                    </span>
                  </div>
                  <select
                    id="div_id"
                    name="div_id"
                    className="select select-bordered w-full "
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        div_id: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="" hidden>
                      Select Division
                    </option>
                    {divisions.map((di) => (
                      <option value={di.div_id}>{di.div_name}</option>
                    ))}
                  </select>
                </label>

                {/* Department */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Department
                      <span id="department_label" className="text-red-500">
                        {" "}
                        *
                      </span>
                    </span>
                  </div>
                  <select
                    id="dept_id"
                    name="dept_id"
                    className="select select-bordered w-full "
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        dept_id: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="" hidden>
                      Select Department
                    </option>
                    {departments.map((de) => (
                      <option value={de.dept_id}>{de.dept_name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex flex-col w-full md:flex-row">
                {/* Client/Cluster */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Client/Cluster
                      <span id="emp_num_label" className="text-red-500">
                        {" "}
                        *
                      </span>
                    </span>
                  </div>
                  <select
                    id="client_id"
                    name="client_id"
                    className="select select-bordered w-full "
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        client_id: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="" hidden>
                      Select Client/Cluster
                    </option>
                    {clients.map((c) => (
                      <option value={c.client_id}>{c.client_name}</option>
                    ))}
                  </select>
                </label>

                {/* Positions */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Position
                      <span id="department_label" className="text-red-500">
                        {" "}
                        *
                      </span>
                    </span>
                  </div>
                  <select
                    id="position_id"
                    name="position_id"
                    className="select select-bordered w-full "
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        position_id: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="" hidden>
                      Select Position
                    </option>
                    {positions.map((p) => (
                      <option value={p.position_id}>{p.position_name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex flex-col w-full md:flex-row">
                {/* Employment Status */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Employment Status<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <select
                    name="emp_status"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        emp_status: e.target.value,
                      })
                    }
                    className="select select-bordered w-full "
                    required
                  >
                    <option value="" hidden>
                      Select Employment Status
                    </option>
                    <option>Probationary</option>
                    <option>Regular</option>
                    <option>Part-time</option>
                  </select>
                </label>

                {/* Employee Role */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Employment Role<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <select
                    name="emp_role"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        emp_role: e.target.value,
                      })
                    }
                    className="select select-bordered w-full "
                    required
                  >
                    <option value="" hidden>
                      Select Employment Role
                    </option>
                    <option value="3">Manager</option>
                    <option value="2">Regular Employee</option>
                    <option value="1">HR</option>
                    <option value="0">Administrator</option>
                  </select>
                </label>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Date Hired */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Date Hired<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    id="date_hired"
                    name="date_hired"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        date_hired: e.target.value,
                      })
                    }
                    onInput={disableNext}
                    type="date"
                    className="input input-bordered w-full "
                    required
                  />
                </label>

                {/* Date of Regularization */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Date of Regularization
                      <span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    id="date_regularization"
                    name="date_regularization"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        date_regularization: e.target.value,
                      })
                    }
                    type="date"
                    className="input input-bordered w-full "
                    required
                  />
                </label>

                {/* Date Separated*/}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Date Separated</span>
                  </div>
                  <input
                    name="date_separated"
                    onChange={handleChange}
                    type="date"
                    className="input input-bordered w-full "
                    disabled
                  />
                </label>
              </div>

              <div className="divider"></div>

              <div className="flex flex-col md:flex-row">
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Upload Profile Picture</span>
                  </div>
                  <input
                    name="emp_pic"
                    onChange={handleChange}
                    type="file"
                    accept="image/*"
                    className="file-input w-full max-w-xs"
                  />
                </label>
              </div>

              <div className="divider"></div>

              {/* <div className="flex flex-col md:flex-row">
                
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">SSS Number</span>
                  </div>
                  <input type="text" className="input input-bordered w-full " />
                </label>

                
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">SSS Number</span>
                  </div>
                  <input type="text" className="input input-bordered w-full" />
                </label>
              </div> */}

              {/* <div className="flex flex-col md:flex-row">
          
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">HDMC Number</span>
                  </div>
                  <input type="text" className="input input-bordered w-full " />
                </label>

                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">TIN Number</span>
                  </div>
                  <input type="text" className="input input-bordered w-full " />
                </label>
              </div> */}
            </div>
            <div className="flex justify-end m-2">
              <input type="submit" value="Submit" className="btn" />
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default HRFormAddEmployee;
