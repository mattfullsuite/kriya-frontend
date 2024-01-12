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

  const [valFName, setValFName] = useState("");
  const [isLengthFName, setIsLengthFName] = useState("");
  const [valMName, setValMName] = useState("");
  const [isLengthMName, setIsLengthMName] = useState("");
  const [valSName, setValSName] = useState("");
  const [isLengthSName, setIsLengthSName] = useState("");
  const [valDob, setValDob] = useState("");
  const [valStatus, setStatus] = useState("");
  const [valSex, setSex] = useState("");
  const [valGender, setGender] = useState("");
  const [valPermanentAddress, setPermanentAddress] = useState("");
  const [valCurrentAddress, setCurrentAddress] = useState("");
  const [valPersonalEmail, setValPersonalEmail] = useState("");
  const [isLengthPersonalEmail, setIsLengthPersonalemail] = useState("");
  const [valPersonalPhone, setPersonalPhone] = useState("");
  const [isLengthPersonalPhone, setIsLengthPersonalPhone] = useState("");
  const [valCompany, setValCompany] = useState("");
  const [valCompanyID, setValCompanyID] = useState("");
  const [valCompanyIDExists, setValCompanyIDExists] = useState("");
  const [isLengthCompanyID, setIsLengthCompanyID] = useState("");
  const [isWorkEmailExists, setIsWorkEmailExists] = useState("");
  const [valWorkEmail, setValWorkEmail] = useState("");
  const [isLengthWorkEmail, setIsLengthWorkEmail] = useState("");
  // -- POSITION VALIDATION -- //
  const [valDivision, setValDivision] = useState("");
  const [valDivID, setValDivID] = useState(0);
  const [isDeptDisabled, setDeptDisdabled] = useState(true);
  const [valDepartment, setValDepartment] = useState("");
  const [valDeptID, setValDeptID] = useState(0);
  const [isPositionDisabled, setPositionDisabled] = useState(true);
  const [valPosition, setValPosition] = useState("");

  const [valClientCluster, setValClientCLuster] = useState("");
  const [valEmpStatus, setValEmpStatus] = useState("");
  const [valEmpRole, setValEmpRole] = useState("");

  const [valDateHired, setValDateHired] = useState("");
  const [valDateReg, setValDateReg] = useState(true);
  const [valFile, setValFile] = useState("");
  const [valFileSize, setValFileSize] = useState("");

  function checkName(event) {
    const regex =
      /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+)*(?:(?!  +|\d|[^a-zA-Z-\s]).)*(?: [a-zA-Z]+)*$/;
    const id = event.target.id;
    const name = event.target.value;
    const length = name.length;
    var isTrue = regex.test(name);

    if (id === "f_name") {
      !isTrue ? setValFName(false) : setValFName(true);

      length >= 2 && length <= 100
        ? setIsLengthFName(true)
        : setIsLengthFName(false);
    } else if (id === "m_name") {
      !isTrue ? setValMName(false) : setValMName(true);

      length >= 2 && length <= 100
        ? setIsLengthMName(true)
        : setIsLengthMName(false);
    } else if (id === "s_name") {
      !isTrue ? setValSName(false) : setValSName(true);

      length >= 2 && length <= 100
        ? setIsLengthSName(true)
        : setIsLengthSName(false);
    }
  }

  function isEighteenOrOlder(value) {
    const birthDate = new Date(value);

    const ageDifference = Date.now() - birthDate.getTime();
    const ageInYears = new Date(ageDifference).getUTCFullYear() - 1970;

    ageInYears >= 18 ? setValDob(true) : setValDob(false);
  }

  function checkCivilStatus(value) {
    value !== "Select civil status" ? setStatus(true) : setStatus(false);
  }

  function checkSex(value) {
    value != "Select sex" ? setSex(true) : setSex(false);
  }

  function checkGender(value) {
    const regex =
      /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+)*(?:(?!  +|\d|[^a-zA-Z-\s]).)*(?: [a-zA-Z]+)*$/;
    const gender = value.target.value;
    const isTrue = regex.test(gender);

    setGender(isTrue);
    gender.length == 0 && setGender(true);
  }

  function checkAddress(event) {
    const address = event.target.value;
    const regex = /^[A-Za-z0-9#().,\s-]+(?:\s*[A-Za-z0-9#().,\s-]+)*$/;
    const isTrue = regex.test(address);
    const name = event.target.name;

    if (name === "p_address") {
      setPermanentAddress(isTrue);
    } else if (name === "c_address") {
      setCurrentAddress(isTrue);
    }
  }

  function checkEmail(event) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = event.target.value;
    const name = event.target.name;
    const isTrue = regex.test(email);

    if (name === "personal_email") {
      !isTrue ? setValPersonalEmail(false) : setValPersonalEmail(true);
      email.length === 0
        ? setIsLengthPersonalemail(false)
        : setIsLengthPersonalemail(true);
    } else if (name === "work_email") {
      !isTrue ? setValWorkEmail(false) : setValWorkEmail(true);
      email.length === 0
        ? setIsLengthWorkEmail(false)
        : setIsLengthWorkEmail(true);
    }
  }

  function checkPhoneNumber(event) {
    const regex = /^(09|\+639)\d{9}$/;
    const phone = event.target.value;
    const input_name = event.target.name;
    const isTrue = regex.test(phone);

    !isTrue ? setPersonalPhone(false) : setPersonalPhone(true);
    phone.length === 0
      ? setIsLengthPersonalPhone(false)
      : setIsLengthPersonalPhone(true);
  }

  function checkCompany(event) {
    const company = event.target.value;

    company === "Company" ? setValCompany(false) : setValCompany(true);
  }

  function checkCompanyID(event) {
    const companyID = event.target.value;
    const regex = /^[A-Z0-9\-]+$/;
    const isTrue = regex.test(companyID);

    !isTrue ? setValCompanyID(false) : setValCompanyID(true);

    if (companyID.length === 0) {
      setIsLengthCompanyID(false);
      setValCompanyID(true);
    } else {
      setIsLengthCompanyID(true);
    }
  }

  function isFoundCompanyID() {
    userReference.some((element) => {
      const emp_num_box = document.getElementById("emp_num");

      if (element.emp_num === emp_num_box.value) {
        setValCompanyIDExists(false);
        return (document.getElementById("emp_num_label").innerHTML = " *");
      } else {
        setValCompanyIDExists(true);
        document.getElementById("emp_num_label").innerHTML = " *";
      }
    });
  }

  function isFoundWorkEmail() {
    userReference.some((element) => {
      const email_box = document.getElementById("work_email");

      if (element.work_email === email_box.value) {
        setIsWorkEmailExists(true);
        return (document.getElementById("work_email_label").innerHTML = " *");
      } else {
        setIsWorkEmailExists(false);
        document.getElementById("work_email_label").innerHTML = " *";
      }
    });
  }

  function checkDivision(event) {
    const div = event.target.value;

    if (div === "Select Division") {
      setValDivision(false);
      setDeptDisdabled(true);
      setPositionDisabled(true);
    } else {
      setValDivision(true);
      setValDivID(event.target.value);
      setDeptDisdabled(false);
      setValDeptID(0);
    }
  }

  function checkPosition(event) {
    const position = event.target.value;

    position === "Select Position"
      ? setValPosition(false)
      : setValPosition(true);
  }

  function checkDepartment(event) {
    const dept = event.target.value;

    if (dept === "Select Department") {
      setValDepartment(false);
      setPositionDisabled(true);
    } else {
      setValDepartment(true);
      setValDeptID(event.target.value);
      setPositionDisabled(false);
    }
  }

  function checkClientCluster(event) {
    const clientCluster = event.target.value;

    clientCluster === "Select Client/Cluster"
      ? setValClientCLuster(false)
      : setValClientCLuster(true);
  }

  function checkEmpRole(event) {
    const role = event.target.value;

    role == "Select Employment Role"
      ? setValEmpRole(false)
      : setValEmpRole(true);
  }

  function checkEmpStatus(event) {
    const status = event.target.value;

    status === "Select Employment Status"
      ? setValEmpStatus(false)
      : setValEmpStatus(true);
  }

  function checkDate(event) {
    const name = event.target.name;

    if (name === "date_hired") {
      const inputDate = new Date(event.target.value);
      const today = new Date();
      inputDate > today ? setValDateHired(false) : setValDateHired(true);

    } 
    // else if (name === "date_regularization") {
    //   const inputDate = new Date(event.target.value);
    //   const today = new Date();

    //   inputDate <= today ? setValDateReg(false) : setValDateReg(true);
    // }
  }

  function checkFile(event) {
    const file = event.target.files[0];

    console.log(file);

    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const fileSize = file.size / 1024;

      fileExtension == "jpg" ||
      fileExtension == "png" ||
      fileExtension == "webp"
        ? setValFile(true)
        : setValFile(false);

      console.log(fileSize);

      fileSize > 2048.0 ? setValFileSize(false) : setValFileSize(true);
    } else {
      setValFile(true);
      setValFileSize(true);
    }
  }

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
    isFoundWorkEmail();
    isFoundCompanyID();
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
            navigate("/hrDashboard");
          }, 3500);
        } else if (response.data == "error") {
          notifyFailed();
        }

        setNotif(response.data);
      })
      .catch(function (err) {
        notifyFailed();
        setNotif("error");
      });
  };

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
                    id="f_name"
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        f_name: e.target.value,
                      });

                      checkName(e);
                    }}
                    type="text"
                    className="input input-bordered w-full "
                  />
                  {/* VALIDATION UI */}
                  {valFName === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        First name must only contain no consecutive space,
                        letter, and '-'.
                      </span>
                    </div>
                  )}
                  {isLengthFName === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Length must be 2-100 characters.
                      </span>
                    </div>
                  )}
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
                    id="m_name"
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        m_name: e.target.value,
                      });

                      checkName(e);
                    }}
                    type="text"
                    className="input input-bordered w-full "
                  />
                  {valMName === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Middle name must only contain no consecutive space,
                        letter, and '-'.
                      </span>
                    </div>
                  )}
                  {isLengthMName === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Length must be 2-100 characters.
                      </span>
                    </div>
                  )}
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
                    id="s_name"
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        s_name: e.target.value,
                      });

                      checkName(e);
                    }}
                    type="text"
                    className="input input-bordered w-full "
                  />
                  {valSName === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Surname must only contain letters, no consecutive
                        spaces, or '-'.
                      </span>
                    </div>
                  )}
                  {isLengthSName === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Length must be 2-100 characters.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({ ...employeeInfo, dob: e.target.value });
                      isEighteenOrOlder(e.target.value);
                    }}
                    type="date"
                    max={moment().format("YYYY-MM-DD")}
                    className="input input-bordered w-full"
                  />

                  {valDob === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Employee must be 18 years old and above.
                      </span>
                    </div>
                  )}
                </label>

                {/* Civil Status */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Civil Status</span>
                  </div>
                  <select
                    name="civil_status"
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        civil_status: e.target.value,
                      });

                      checkCivilStatus(e.target.value);
                    }}
                    className="select select-bordered w-full"
                  >
                    <option>Select civil status</option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Widowed</option>
                  </select>

                  {valStatus === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        This is a required field.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({ ...employeeInfo, sex: e.target.value });
                      checkSex(e.target.value);
                    }}
                    className="select select-bordered w-full"
                  >
                    <option>Select sex</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>

                  {valSex === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        This is a required field.
                      </span>
                    </div>
                  )}
                </label>

                {/* Gender */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    name="gender"
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        gender: e.target.value,
                      });

                      checkGender(e);
                    }}
                    type="text"
                    className="input input-bordered w-full"
                  />

                  {valGender === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Invalid format.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        p_address: e.target.value,
                      });

                      checkAddress(e);
                    }}
                    type="text"
                    className="input input-bordered w-full"
                  />
                  {valPermanentAddress === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Invalid address.
                      </span>
                    </div>
                  )}
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
                        onChange={(e) => {
                          setEmployeeInfo({
                            ...employeeInfo,
                            c_address: e.target.value,
                          });

                          checkAddress(e);
                        }}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        c_address: e.target.value,
                      });

                      checkAddress(e);
                    }}
                    type="text"
                    className="input input-bordered w-full"
                  />

                  {valCurrentAddress === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Invalid address.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        personal_email: e.target.value,
                      });

                      checkEmail(e);
                    }}
                    type="email"
                    className="input input-bordered w-full "
                  />

                  {valPersonalEmail === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Invalid email format.
                      </span>
                    </div>
                  )}

                  {isLengthPersonalEmail === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        This is a required field.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        contact_num: e.target.value,
                      });
                      checkPhoneNumber(e);
                    }}
                    type="tel"
                    className="input input-bordered w-full "
                  />

                  {valPersonalPhone === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Invalid phone format.
                      </span>
                    </div>
                  )}
                  {isLengthPersonalPhone === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        This is a required field.
                      </span>
                    </div>
                  )}
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
                  <div className="flex gap-1">
                    <select
                      id="company_id"
                      name="company_id"
                      className="select select-bordered w-32"
                      onChange={(e) => {
                        setEmployeeInfo({
                          ...employeeInfo,
                          company_id: e.target.value,
                        });
                        checkCompany(e);
                      }}
                    >
                      <option>Company</option>
                      {companies.map((c) => (
                        <option value={c.company_id}>{c.company_name}</option>
                      ))}
                    </select>

                    <input
                      id="emp_num"
                      name="emp_num"
                      onChange={(e) => {
                        setEmployeeInfo({
                          ...employeeInfo,
                          emp_num: e.target.value,
                        });

                        checkCompanyID(e);
                        isFoundCompanyID();
                      }}
                      type="text"
                      className="input input-bordered w-full "
                    />
                  </div>

                  {valCompany === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Company is a required field.
                      </span>
                    </div>
                  )}

                  {valCompanyIDExists === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        ID already exists.
                      </span>
                    </div>
                  )}

                  {valCompanyID === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        ID must only contain capital letters, numbers, and '-'.
                      </span>
                    </div>
                  )}

                  {isLengthCompanyID === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Company ID is a required field.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        work_email: e.target.value,
                      });
                      checkEmail(e);
                      isFoundWorkEmail();
                    }}
                    type="email"
                    className="input input-bordered w-full "
                  />

                  {isWorkEmailExists === true && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Email already exists.
                      </span>
                    </div>
                  )}
                  {valWorkEmail === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Invalid format.
                      </span>
                    </div>
                  )}
                  {isLengthWorkEmail === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        This is a required field.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        div_id: e.target.value,
                      });

                      checkDivision(e);
                    }}
                  >
                    <option>Select Division</option>
                    {divisions.map((di) => (
                      <option value={di.div_id}>{di.div_name}</option>
                    ))}
                  </select>

                  {valDivision === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        This is a required field.
                      </span>
                    </div>
                  )}
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
                    disabled={isDeptDisabled}
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        dept_id: e.target.value,
                      });

                      checkDepartment(e);
                    }}
                  >
                    <option>Select Department</option>
                    {departments.map(
                      (de) =>
                        de.div_id == valDivID && (
                          <option value={de.dept_id}>{de.dept_name}</option>
                        )
                    )}
                  </select>

                  {valDepartment === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        This is a required field.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        client_id: e.target.value,
                      });

                      checkClientCluster(e);
                    }}
                  >
                    <option>Select Client/Cluster</option>
                    {clients.map((c) => (
                      <option value={c.client_id}>{c.client_name}</option>
                    ))}
                  </select>

                  {valClientCluster === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        This is a required field.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        position_id: e.target.value,
                      });
                      checkPosition(e);
                    }}
                    disabled={isPositionDisabled}
                  >
                    <option>Select Position</option>
                    {positions.map(
                      (p) =>
                        valDeptID == p.dept_id && (
                          <option value={p.position_id}>
                            {p.position_name}
                          </option>
                        )
                    )}
                  </select>

                  {valPosition === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        This is a required field.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        emp_status: e.target.value,
                      });

                      checkEmpStatus(e);
                    }}
                    className="select select-bordered w-full "
                  >
                    <option>Select Employment Status</option>
                    <option>Probationary</option>
                    <option>Regular</option>
                    <option>Part-time</option>
                  </select>

                  {valEmpStatus === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        This is a required field.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        emp_role: e.target.value,
                      });

                      checkEmpRole(e);
                    }}
                    className="select select-bordered w-full "
                  >
                    <option>Select Employment Role</option>
                    <option value="3">Manager</option>
                    <option value="2">Regular Employee</option>
                    <option value="1">HR</option>
                    <option value="0">Administrator</option>
                  </select>

                  {valEmpRole === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        This is a required field.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        date_hired: e.target.value,
                      });

                      checkDate(e);
                    }}
                    onInput={disableNext}
                    type="date"
                    className="input input-bordered w-full "
                  />

                  {valDateHired === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Invalid date.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        date_regularization: e.target.value,
                      });

                      checkDate(e);
                    }}
                    type="date"
                    className="input input-bordered w-full "
                  />

                  {valDateReg === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Invalid date.
                      </span>
                    </div>
                  )}
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
                    onChange={(e) => {
                      handleChange(e);
                      checkFile(e);
                    }}
                    type="file"
                    accept="image/*"
                    className="file-input w-full max-w-xs"
                  />

                  {valFile === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        Invalid file format.
                      </span>
                    </div>
                  )}

                  {valFileSize === false && (
                    <div className="flex flex-row justify-start items-center gap-1 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-[12px] text-red-500">
                        File size must not exceed to 2MB.
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="flex justify-end m-2">
              <input type="submit" value="Submit" className="btn" 
              disabled = {(
                valFName === false || valFName === "" ||
                isLengthFName === false || isLengthFName === "" ||
                valMName === false || valMName === "" ||
                isLengthMName === false || isLengthMName === "" ||
                valSName === false || valSName === "" ||
                isLengthSName === false || isLengthSName === "" ||
                valDob === false || valDob === "" ||
                valStatus === false || valStatus === "" ||
                valSex === false || valSex === "" ||
                valGender === false ||
                valPermanentAddress === false || valPermanentAddress === "" ||
                valCurrentAddress === false || valCurrentAddress === "" ||
                valPersonalEmail === false || valPersonalEmail === "" ||
                isLengthPersonalEmail === false || isLengthPersonalEmail === "" ||
                valPersonalPhone === false || valPersonalPhone === "" ||
                isLengthPersonalPhone === false || isLengthPersonalPhone === "" ||
                valCompany === false || valCompany === "" ||
                valCompanyID === false || valCompanyID === "" ||
                valCompanyIDExists === false || valCompanyIDExists === "" ||
                isLengthCompanyID === false || isLengthCompanyID === "" ||
                isWorkEmailExists === true || isWorkEmailExists === "" || 
                valWorkEmail === false || valWorkEmail === "" ||
                isLengthWorkEmail === false || isLengthWorkEmail === "" ||
                valDivision === false || valDivision === "" ||
                valDivID === 0 ||
                isDeptDisabled === true ||
                valDepartment === false || valDepartment === "" ||
                valDeptID === 0 ||
                isPositionDisabled === true ||
                valPosition === false || valPosition === "" ||
                valClientCluster === false || valClientCluster === "" ||
                valEmpStatus === false || valEmpStatus === "" ||
                valEmpRole === false || valEmpRole === "" ||
                valDateHired === false || valDateHired === "" ||
                valDateReg === false || valDateReg === "" ||
                valFile === false ||
                valFileSize === false
              ) && true}
              
              />
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default HRFormAddEmployee;
