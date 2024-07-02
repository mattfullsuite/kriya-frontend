import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import ButtonBack from "../universal/ButtonBack";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  checkName,
  nameLength,
  isEighteenOrOlder,
  checkCivilStatus,
  checkSex,
  checkGender,
  checkAddress,
  checkEmail,
  checkPhoneNumber,
  checkDivision,
  checkPosition,
  checkDepartment,
  checkClientCluster,
  checkEmpRole,
  checkEmpStatus,
  checkFile,
  lengthEmail,
  lengthPhone,
  checkFileSize,
  checkHiredReg,
  checkHiredSeparate,
  checkRegHired,
  checkRegSeparate,
  checkSeparateHired,
  checkDateFormat,
} from "../../assets/constraints";

const notifySuccess = () =>
  toast.success("Successfully Updated!", {
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

const HRFormEditEmployee = () => {
  const { emp_id } = useParams();
  const [fetchData, setFetchData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  const [employeeInfo, setEmployeeInfo] = useState({
    emp_num: "",
    work_email: "",
    f_name: "",
    m_name: "",
    s_name: "",
    emp_role: "",
    emp_pic: "",
    personal_email: "",
    contact_num: "",
    dob: "",
    p_address: "",
    c_address: "",
    date_hired: "",
    date_regularization: "",
    date_separated: "",
    emp_status: "",
    sex: "",
    gender: "",
    civil_status: "",
    company_id: "",
    div_id: "",
    dept_id: "",
    client_id: "",
    position_id: "",
    sss_number: "",
    phic_number: "",
    hdmf_number: "",
    tin: "",
  });

  useEffect(() => {
    const fetchOldData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/ep-viewEmployee/${emp_id}`);
        setFetchData(res.data);
        setEmployeeInfo({
          ...employeeInfo,
          emp_num: res.data[0].emp_num,
          work_email: res.data[0].work_email,
          f_name: res.data[0].f_name,
          m_name: res.data[0].m_name,
          s_name: res.data[0].s_name,
          emp_role: res.data[0].emp_role,
          emp_pic: res.data[0].emp_pic,
          personal_email: res.data[0].personal_email,
          contact_num: res.data[0].contact_num,
          dob: res.data[0].dob,
          p_address: res.data[0].p_address,
          c_address: res.data[0].c_address,
          date_hired: res.data[0].date_hired,
          date_regularization: res.data[0].date_regularization,
          date_separated: res.data[0].date_separated,
          emp_status: res.data[0].emp_status,
          sex: res.data[0].sex,
          gender: res.data[0].gender,
          civil_status: res.data[0].civil_status,
          company_id: res.data[0].company_id,
          div_id: res.data[0].div_id,
          dept_id: res.data[0].dept_id,
          client_id: res.data[0].client_id,
          position_id: res.data[0].position_id,
        });

        setValDivID(res.data[0].div_id);
        setValDeptID(res.data[0].dept_id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOldData();
    fetchUserContributions();
  }, []);

  const fetchUserContributions = () => {
    console.log("User Contribution");
  };

  const [userReference, setUserReferences] = useState([]);

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
  const [valSName, setValSName] = useState("");
  const [isLengthSName, setIsLengthSName] = useState("");
  const [valDob, setValDob] = useState("");
  const [valStatus, setStatus] = useState("");
  const [valSex, setSex] = useState("");
  const [valGender, setGender] = useState("");
  const [valPermanentAddress, setPermanentAddress] = useState("");
  const [valCurrentAddress, setCurrentAddress] = useState("");
  const [valPersonalEmail, setValPersonalEmail] = useState("");
  const [isLengthPersonalEmail, setIsLengthPersonalEmail] = useState("");
  const [valPersonalPhone, setPersonalPhone] = useState("");
  const [isLengthPersonalPhone, setIsLengthPersonalPhone] = useState("");

  // -- POSITION VALIDATION -- //
  const [valDivision, setValDivision] = useState("");
  const [valDivID, setValDivID] = useState(0);
  const [valDepartment, setValDepartment] = useState("");
  const [valDeptID, setValDeptID] = useState(0);
  const [valPosition, setValPosition] = useState("");

  const [valClientCluster, setValClientCLuster] = useState("");
  const [valEmpStatus, setValEmpStatus] = useState("");
  const [valEmpRole, setValEmpRole] = useState("");

  const [valHiredReg, setValHiredReg] = useState("");
  const [valHiredSeparate, setValHiredSeparate] = useState("");
  const [dHiredValid, setDHiredValid] = useState("");

  const [valRegHired, setValRegHired] = useState("");
  const [valRegSeparate, setValRegSeparate] = useState("");
  const [dRegValid, setDRegValid] = useState("");

  const [valSeparateHired, setValSeparateHired] = useState("");
  const [valFile, setValFile] = useState("");
  const [valFileSize, setValFileSize] = useState("");

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

  const handleChange = (event) => {
    setEmployeeInfo({ ...employeeInfo, emp_pic: event.target.files[0] });
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

    document.getElementById("submit_btn").disabled = true;

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
    data.append("date_separated", employeeInfo.date_separated);
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
      .patch(`${BASE_URL}/ep-editEmployee/${emp_id}`, data)
      .then((response) => {
        if (response.data == "success") {
          notifySuccess();

          setTimeout(function () {
            navigate("/hr/employees");
          }, 3500);
        } else if (response.data == "error") {
          notifyFailed();

          document.getElementById("submit_btn").disabled = false;
        }

        setNotif(response.data);
      })
      .catch(function (err) {
        notifyFailed();
        setNotif("error");
      });
    updateContributions();
  };

  const updateContributions = () => {
    const data = new FormData();
    console.log(employeeInfo);
    data.append("sss_number", employeeInfo.sss_number);
    data.append("phic_number", employeeInfo.phic_number);
    data.append("hdmf_number", employeeInfo.hdmf_number);
    data.append("sss_number", employeeInfo.tin);
    console.log("Contributions: ", data);
  };

  const handleInput = (input) => {
    const name = input.target.name;
    const value = input.target.value;

    setEmployeeInfo({
      ...employeeInfo,
      [name]: value,
    });
  };

  return (
    <>
      <>
        {notif != "" && notif === "success" && <ToastContainer />}
        {notif != "" && notif === "error" && <ToastContainer />}
        <div className="flex flex-col">
          <ButtonBack />
          <div className="m-2">
            <h1 className="text-3xl font-bold tracking-wide">Edit Employee</h1>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="m-2 p-3 border border-[#E4E4E4] rounded-[15px] bg-white flex flex-1 flex-col">
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

                      setValFName(checkName(e));
                      setIsLengthFName(nameLength(e));
                    }}
                    type="text"
                    maxlength="100"
                    value={employeeInfo.f_name}
                    className="input input-bordered w-full "
                    required
                  />
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
                        letter, ñ, (-) and (').
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

                      setValMName(checkName(e));
                    }}
                    type="text"
                    maxlength="100"
                    value={employeeInfo.m_name}
                    className="input input-bordered w-full "
                    required
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
                        letter, ñ, (-) and (').
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

                      setValSName(checkName(e));
                      setIsLengthSName(nameLength(e));
                    }}
                    type="text"
                    maxlength="100"
                    value={employeeInfo.s_name}
                    className="input input-bordered w-full "
                    required
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
                        Surname must only contain no consecutive space, letter,
                        ñ, (-) and (').
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
                      setValDob(isEighteenOrOlder(e.target.value));
                    }}
                    type="date"
                    max={moment().format("YYYY-MM-DD")}
                    className="input input-bordered w-full"
                    value={moment(employeeInfo.dob).format("YYYY-MM-DD")}
                    required
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
                      setStatus(checkCivilStatus(e.target.value));
                    }}
                    className="select select-bordered w-full"
                    value={employeeInfo.civil_status}
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
                      setSex(checkSex(e.target.value));
                    }}
                    className="select select-bordered w-full"
                    value={employeeInfo.sex}
                    required
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

                      setGender(checkGender(e));
                    }}
                    type="text"
                    value={employeeInfo.gender}
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

                      setPermanentAddress(checkAddress(e));
                    }}
                    type="text"
                    value={employeeInfo.p_address}
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

                          setCurrentAddress(checkAddress(e));
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

                      setCurrentAddress(checkAddress(e));
                    }}
                    type="text"
                    value={employeeInfo.c_address}
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
            <div className="m-2 p-3 border border-[#E4E4E4] rounded-[15px] bg-white flex flex-1 flex-col">
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

                      setValPersonalEmail(checkEmail(e));
                      setIsLengthPersonalEmail(lengthEmail(e));
                    }}
                    type="email"
                    value={employeeInfo.personal_email}
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
                      setPersonalPhone(checkPhoneNumber(e));
                      setIsLengthPersonalPhone(lengthPhone(e));
                    }}
                    type="tel"
                    value={employeeInfo.contact_num}
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

            <div className="m-2 p-3 border border-[#E4E4E4] rounded-[15px] bg-white flex flex-1 flex-col">
              <h1 className="font-bold mb-2">Contributions</h1>

              <div className="flex flex-col md:flex-row">
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">SSS Number</span>
                  </div>
                  <input
                    type="text"
                    name="sss_number"
                    className="input input-bordered w-full "
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </label>

                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">PHIC Number</span>
                  </div>
                  <input
                    type="text"
                    name="phic_number"
                    className="input input-bordered w-full"
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </label>
              </div>

              <div className="flex flex-col md:flex-row">
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">HDMF Number</span>
                  </div>
                  <input
                    type="text"
                    name="hdmf_number"
                    className="input input-bordered w-full "
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </label>

                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">TIN</span>
                  </div>
                  <input
                    type="text"
                    name="tin"
                    className="input input-bordered w-full "
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Employee Information */}
            <div className="m-2 p-3 border border-[#E4E4E4] rounded-[15px] bg-white flex flex-1 flex-col">
              <h1 className="font-bold mb-2">Employee Information</h1>

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
                        dept_id: "Select Department",
                        position_id: "Select Position",
                      });

                      setValDivision(checkDivision(e));
                      setValDivID(e.target.value);
                      setValDeptID(0);
                      setValDepartment(false);
                      setValPosition(false);
                    }}
                    value={employeeInfo.div_id}
                  >
                    <option>Select Division</option>
                    {divisions.map((di) => (
                      //<option value={di.div_id} selected={employeeInfo.div_id === di.div_id && true}>{di.div_name}{employeeInfo.div_id}</option>
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
                    className="select select-bordered w-full"
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        dept_id: e.target.value,
                        position_id: "Select Position",
                      });
                      setValDepartment(checkDepartment(e));
                      setValDeptID(e.target.value);
                    }}
                    value={employeeInfo.dept_id}
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

                      setValClientCLuster(checkClientCluster(e));
                    }}
                    value={employeeInfo.client_id}
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
                      setValPosition(checkPosition(e));
                    }}
                    value={employeeInfo.position_id}
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

                      setValEmpStatus(checkEmpStatus(e));
                    }}
                    value={employeeInfo.emp_status}
                    className="select select-bordered w-full"
                    required
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

                      setValEmpRole(checkEmpRole(e));
                    }}
                    value={employeeInfo.emp_role}
                    className="select select-bordered w-full "
                    required
                  >
                    <option>Select Employment Role</option>
                    <option value="3">Manager</option>
                    <option value="2">Regular Employee</option>
                    <option value="1">HR</option>
                    <option>Administrator</option>
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

                      setDHiredValid(checkDateFormat(e.target.value));

                      setValHiredReg(
                        checkHiredReg(
                          e.target.value,
                          employeeInfo.date_regularization
                        )
                      );

                      setValHiredSeparate(
                        checkHiredSeparate(
                          e.target.value,
                          employeeInfo.date_separated
                        )
                      );
                    }}
                    onInput={disableNext}
                    value={moment(employeeInfo.date_hired).format("YYYY-MM-DD")}
                    type="date"
                    className="input input-bordered w-full "
                  />
                  {dHiredValid === false && (
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
                  {valHiredReg === false && (
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
                        Must not be later than the date regularized.
                      </span>
                    </div>
                  )}
                  {valHiredSeparate === false && (
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
                        Must not be later than the date separated.
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

                      setDRegValid(setDRegValid(e.target.value));

                      setValRegHired(
                        checkRegHired(e.target.value, employeeInfo.date_hired)
                      );
                      setValRegSeparate(
                        checkRegSeparate(
                          e.target.value,
                          employeeInfo.date_separated
                        )
                      );
                    }}
                    value={moment(employeeInfo.date_regularization).format(
                      "YYYY-MM-DD"
                    )}
                    type="date"
                    className="input input-bordered w-full "
                  />
                  {dRegValid === false && (
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
                  {valRegHired === false && (
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
                        Must not be later than the date hired.
                      </span>
                    </div>
                  )}
                  {valRegSeparate === false && (
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
                        Must not be later than the date separated.
                      </span>
                    </div>
                  )}
                </label>

                {/* Date Separated*/}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Date Separated</span>
                  </div>
                  <input
                    name="date_separated"
                    value={
                      employeeInfo.date_separated != null
                        ? moment(employeeInfo.date_separated).format(
                            "YYYY-MM-DD"
                          )
                        : ""
                    }
                    onChange={(e) => {
                      setEmployeeInfo({
                        ...employeeInfo,
                        date_separated: e.target.value,
                      });

                      console.log(e.target.value);

                      setValSeparateHired(
                        checkSeparateHired(
                          e.target.value,
                          employeeInfo.date_hired
                        )
                      );
                    }}
                    type="date"
                    className="input input-bordered w-full "
                  />
                  {valSeparateHired === false && (
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
                        Must not be later than the date hired.
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
                      setValFile(checkFile(e));
                      setValFileSize(checkFileSize(e));
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
              <input
                type="submit"
                value="Submit"
                className="btn bg-[#90946f] hover:bg-[#797c5d] normal-case text-white"
                id="submit_btn"
                disabled={
                  (valFName === false ||
                    isLengthFName === false ||
                    valMName === false ||
                    valSName === false ||
                    isLengthSName === false ||
                    valDob === false ||
                    valStatus === false ||
                    valSex === false ||
                    valGender === false ||
                    valPermanentAddress === false ||
                    valCurrentAddress === false ||
                    valPersonalEmail === false ||
                    isLengthPersonalEmail === false ||
                    valPersonalPhone === false ||
                    isLengthPersonalPhone === false ||
                    valDivision === false ||
                    valDivID === 0 ||
                    valDepartment === false ||
                    valDeptID === 0 ||
                    valPosition === false ||
                    valClientCluster === false ||
                    valEmpStatus === false ||
                    valHiredReg === false ||
                    valHiredSeparate === false ||
                    dHiredValid === false ||
                    valRegHired === false ||
                    valRegSeparate === false ||
                    dRegValid === false ||
                    valSeparateHired === false ||
                    valEmpRole === false ||
                    valFile === false ||
                    valFileSize === false) &&
                  true
                }
              />
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default HRFormEditEmployee;
