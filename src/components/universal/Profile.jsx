import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  checkCivilStatus,
  checkEmail,
  checkName,
  checkPhoneNumber,
  lengthEmail,
  lengthPhone,
  nameLength,
} from "../../assets/constraints";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [newInfo, setNewInfo] = useState({
    personal_email: "",
    contact_num: "",
    emergency_contact_name: "",
    emergency_contact_num: "",
    civil_status: "",
  });
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  const [valPersonalEmail, setValPersonalEmail] = useState("");
  const [isLengthPersonalEmail, setIsLengthPersonalEmail] = useState("");

  const [valPersonalPhone, setPersonalPhone] = useState("");
  const [isLengthPersonalPhone, setIsLengthPersonalPhone] = useState("");

  const [valEName, setValEName] = useState("");
  const [isLengthEName, setIsLengthEName] = useState("");
  const [valEContact, setValEContact] = useState("");
  const [isLengthEContact, setIsLengthEContact] = useState("");

  const [valStatus, setValStatus] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/myProfile");
        setProfile(res.data);
        setNewInfo({
          ...newInfo,
          personal_email: res.data[0].personal_email,
          contact_num: res.data[0].contact_num,
          emergency_contact_name: res.data[0].emergency_contact_name,
          emergency_contact_num: res.data[0].emergency_contact_num,
          civil_status: res.data[0].civil_status,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchEmpDesignation = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/getOwnEmpDesignation");
        setDesignation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmpDesignation();
  });

  const enableFields = (event) => {
    if (event.currentTarget.id === "edit-button") {
      setVisible(true);
      setVisible2(false);
      document.getElementById("personal_email").disabled = false;
      document.getElementById("contact_num").disabled = false;
      document.getElementById("emergency_contact_name").disabled = false;
      document.getElementById("emergency_contact_num").disabled = false;
      document.getElementById("civil_status").disabled = false;
    }
  };

  const disableFields = (event) => {
    if (event.currentTarget.id === "save-button") {
      setVisible(false);
      setVisible2(true);
      document.getElementById("personal_email").disabled = true;
      document.getElementById("contact_num").disabled = true;
      document.getElementById("emergency_contact_name").disabled = true;
      document.getElementById("emergency_contact_num").disabled = true;
      document.getElementById("civil_status").disabled = true;

      saveProfile();
    }
  };

  const handleChange = (event) => {
    setNewInfo({ ...newInfo, [event.target.name]: [event.target.value] });
    console.log(JSON.stringify(newInfo));
  };

  const [notif, setNotif] = useState([]);

  const notifySuccess = () =>
    toast.success("Successfully edited your profile.", {
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
    toast.error("Something went wrong.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const saveProfile = () => {
    Axios.post(`${BASE_URL}/editMyProfile`, newInfo)
      .then((res) => {
        if (res.data === "success") {
          notifySuccess();
        } else if (res.data === "error") {
          notifyFailed();
        }

        setNotif(res.data);
      })
      .catch((err) => console.log(err));

    // .then((res) => console.log(JSON.stringify(newInfo)))

    //window.location.reload();
    // alert("Successfully edited your profile!");
  };

  function noClient(client, sName) {
    if (client === "Not Applicable") {
      return <h1>{sName.dept_name}</h1>;
    } else {
      return (
        <h1>
          {sName.dept_name} - {sName.client_name}
        </h1>
      );
    }
  }

  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      {profile.map((p) => (
        <div className="flex flex-col">
          {/* <form action="POST" 
          onSubmit={saveProfile}
          ></form> */}
          <label htmlFor="my-drawer-2" className="xl:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-[#363636] dark:fill-[#e7e7e7]"
            >
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
            </svg>
          </label>

          <div className="flex flex-col lg:flex-row items-center bg-white p-3 rounded-[15px] border border-[#e4e4e4]">
            {profile.map((user) => (
              <div className="flex justify-center">
                {user.emp_pic == "" || user.emp_pic == null ? (
                  <div className="h-32 w-32 bg-gray-500 rounded-full flex justify-center items-center text-5xl text-white font-medium m-2 ring-2 ring-white">
                    {user.f_name.charAt(0) + user.s_name.charAt(0)}
                  </div>
                ) : (
                  <img
                    className="h-32 w-32 rounded-full m-2 ring-2 ring-white"
                    src={"../uploads/" + user.emp_pic}
                  />
                )}
              </div>
            ))}

            {/* Name, Primary */}
            <div className="m-2 p-3">
              <h1 className="text-xl text-center lg:text-left lg:text-4xl font-bold tracking-wide text-[#363636]">
                {p.f_name + " " + p.m_name + " " + p.s_name}
              </h1>

              {designation.map((d) => (
                <div className="flex">
                  {/* col 2 */}
                  <div className="mt-2 flex-col">
                    <div className="flex flex-row justify-start items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#363636] w-6 h-6"
                      >
                        <path d="M17 2H7a2 2 0 0 0-2 2v17a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2zm-6 14H8v-2h3v2zm0-4H8v-2h3v2zm0-4H8V6h3v2zm5 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V6h3v2z"></path>
                      </svg>

                      <h1 className="text-[#363636]">{d.company_name}</h1>
                    </div>

                    <div className="flex flex-row justify-start items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#363636] h-6 w-6"
                      >
                        <path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"></path>
                        <path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"></path>
                      </svg>

                      <h1 className="text-[#363636]">{d.div_name}</h1>
                    </div>

                    <div className="flex flex-row justify-start items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#363636] w-6 h-6"
                      >
                        <path d="M18.991 2H9.01C7.899 2 7 2.899 7 4.01v5.637l-4.702 4.642A1 1 0 0 0 3 16v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4.009C21 2.899 20.102 2 18.991 2zm-8.069 13.111V20H5v-5.568l2.987-2.949 2.935 3.003v.625zM13 9h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path>
                        <path d="M7 15h2v2H7z"></path>
                      </svg>
                      {noClient(d.client_name, d)}
                    </div>
                  </div>

                  {/* col 1 */}
                  <div className="mt-2 flex-col ml-20">
                    <div className="flex flex-row justify-start items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#363636] w-6 h-6"
                      >
                        <path d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v3h20V8c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm5 10h-4v-2H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-8v2z"></path>
                      </svg>

                      <h1 className="text-[#363636]">
                        {p.position_name} -{" "}
                        {moment(p.date_hired).format("MMMM DD, YYYY")}
                      </h1>
                    </div>

                    <div className="flex flex-row justify-start items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#363636] w-6 h-6"
                      >
                        <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM8.715 8c1.151 0 2 .849 2 2s-.849 2-2 2-2-.849-2-2 .848-2 2-2zm3.715 8H5v-.465c0-1.373 1.676-2.785 3.715-2.785s3.715 1.412 3.715 2.785V16zM19 15h-4v-2h4v2zm0-4h-5V9h5v2z"></path>
                      </svg>

                      <h1 className="text-[#363636]">{p.emp_num}</h1>
                    </div>

                    <div className="flex flex-row justify-start items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-[#363636] h-6 w-6"
                      >
                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path>
                      </svg>
                      <h1  className="text-[#363636]">{p.work_email}</h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {visible2 && (
            <div className="ml-1 mt-10">
              <button
                id="edit-button"
                className="btn btn-sm btn-outline normal-case mx-1 bg-white border-[#e4e4e4]"
                onClick={enableFields}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Update Profile
              </button>
            </div>
          )}

          {/* Personal Information */}
          <div className="mt-5 p-5 border border-[#e4e4e4] rounded-[15px] bg-white dark:border-gray-700 flex flex-1 flex-col">
            <h1 className="font-bold">Personal Information</h1>

            <div className="flex flex-col md:flex-row">
              {/* Date of Birth */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">Date of Birth</span>
                </div>
                <input
                  value={moment(p.dob).format("MMMM DD, YYYY")}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>

              {/* Sex */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">Sex</span>
                </div>
                <input
                  value={p.sex}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>
            </div>
            <div className="flex flex-col md:flex-row">
              {/* Civil Status */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">Civil Status</span>
                </div>
                {/* <input
                  id="civil_status"
                  name="civil_status"
                  value={newInfo.civil_status}
                  onChange={handleChange}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                /> */}
                <select
                  id="civil_status"
                  name="civil_status"
                  onChange={(e) => {
                    handleChange(e);
                    setValStatus(checkCivilStatus(e.target.value));
                  }}
                  className="select select-bordered w-full max-w-xs"
                  value={newInfo.civil_status}
                  required
                  disabled
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
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Permanent Address */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">Permanent Address</span>
                </div>
                <input
                  value={p.p_address}
                  type="text"
                  className="input input-bordered w-full"
                  disabled
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Current Address */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">Current Address</span>
                </div>
                <input
                  value={p.c_address}
                  type="text"
                  className="input input-bordered w-full"
                  disabled
                />
              </label>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-5 p-5 border border-[#e4e4e4] rounded-[15px] bg-white dark:border-gray-700 flex flex-1 flex-col">
            <h1 className="font-bold">Contact Information</h1>

            <div className="flex flex-col md:flex-row">
              {/* Personal Email */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">Personal Email</span>
                </div>
                <input
                  id="personal_email"
                  name="personal_email"
                  value={newInfo.personal_email}
                  onChange={(e) => {
                    handleChange(e);

                    setValPersonalEmail(checkEmail(e));
                    setIsLengthPersonalEmail(lengthEmail(e));
                  }}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
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
              </label>

              {/* Contact Number */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">Contact Number</span>
                </div>
                <input
                  id="contact_num"
                  name="contact_num"
                  value={newInfo.contact_num}
                  onChange={(e) => {
                    handleChange(e);
                    setPersonalPhone(checkPhoneNumber(e));
                    setIsLengthPersonalPhone(lengthPhone(e));
                  }}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
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
                  id="emergency_contact_name"
                  value={newInfo.emergency_contact_name}
                  onChange={(e) => {
                    setValEName(checkName(e));
                    setIsLengthEName(nameLength(e));
                    handleChange(e);
                  }}
                  maxLength="255"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
                {isLengthEName === false && (
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
                {valEName === false && (
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
                      First name must only contain no consecutive space, letter,
                      ñ, (-) and (').
                    </span>
                  </div>
                )}
              </label>

              {/* Number */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">Number</span>
                </div>
                <input
                  name="emergency_contact_num"
                  id="emergency_contact_num"
                  value={newInfo.emergency_contact_num}
                  onChange={(e) => {
                    handleChange(e);

                    setValEContact(checkPhoneNumber(e));
                    setIsLengthEContact(lengthPhone(e));
                  }}
                  type="text"
                  maxLength="22"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
                {isLengthEContact === false && (
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
                {valEContact === false && (
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
              </label>
            </div>
          </div>

          {/* Employee Information */}
          <div className="mt-5 p-5 border border-[#e4e4e4] rounded-[15px] bg-white dark:border-gray-700 flex flex-1 flex-col">
            <h1 className="font-bold">Employment Information</h1>

            <div className="flex flex-col md:flex-row">
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">Date of Hire</span>
                </div>
                <input
                  value={"2023-12-04"}
                  type="date"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>

              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">Regularization Date</span>
                </div>
                <input
                  value={"2024-06-04"}
                  type="date"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
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
              </label>
            </div>

            <div className="flex flex-col md:flex-row">
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">
                    Date of Last Salary Increase
                  </span>
                </div>
                <input
                  name="emergency_contact_name"
                  id="emergency_contact_name"
                  value={"2024-06-04"}
                  type="date"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Personal Email */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">SSS No.</span>
                </div>
                <input
                  value={"01-3192282-4"}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>

              {/* Contact Number */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">HDMF No.</span>
                </div>
                <input
                  value="123456789101"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row">
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">PHIC No.</span>
                </div>
                <input
                  value={"06-251225843-9"}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>

              {/* Contact Number */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">TIN</span>
                </div>
                <input
                  value="620-500-019-000"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>
            </div>
          </div>

          <div className="mt-5 p-5 border border-[#e4e4e4] rounded-[15px] bg-white dark:border-gray-700 flex flex-1 flex-col">
            <h1 className="font-bold">Documents</h1>

            <table className="table mt-5">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date Added</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="flex flex-row flex-nowrap justify-start items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-[#363636] h-6 w-6"
                    >
                      <path d="M12.186 14.552c-.617 0-.977.587-.977 1.373 0 .791.371 1.35.983 1.35.617 0 .971-.588.971-1.374 0-.726-.348-1.349-.977-1.349z"></path>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.155 17.454c-.426.354-1.073.521-1.864.521-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432.42.312.684.81.684 1.522 0 .775-.282 1.309-.672 1.639zm2.99.546c-1.2 0-1.901-.906-1.901-2.058 0-1.211.773-2.116 1.967-2.116 1.241 0 1.919.929 1.919 2.045-.001 1.325-.805 2.129-1.985 2.129zm4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174-1.397 0-2.117-.869-2.117-2.021 0-1.379.983-2.146 2.207-2.146.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338 0 .809.48 1.318 1.296 1.318zM14 9h-1V4l5 5h-4z"></path>
                      <path d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018.828.006 1.367-.449 1.367-1.415.006-.84-.485-1.284-1.271-1.284z"></path>
                    </svg>

                    <span className="text-[12px] text-[#363636]">
                      Notice of Regularization
                    </span>
                  </td>
                  <td className="text-[12px] text-[#363636]">
                    February 28, 2024
                  </td>
                  <td className="text-[12px] text-[#363636]">Word Document</td>
                  <td className="text-[10px] text-[#363636]">
                    <button className="text-[12px] font-semibold text-[#CC5500] bg-[#F5DDCC] px-3 py-2 rounded-[8px]">
                      View
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="flex flex-row flex-nowrap justify-start items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-[#363636] h-6 w-6"
                    >
                      <path d="M12.186 14.552c-.617 0-.977.587-.977 1.373 0 .791.371 1.35.983 1.35.617 0 .971-.588.971-1.374 0-.726-.348-1.349-.977-1.349z"></path>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.155 17.454c-.426.354-1.073.521-1.864.521-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432.42.312.684.81.684 1.522 0 .775-.282 1.309-.672 1.639zm2.99.546c-1.2 0-1.901-.906-1.901-2.058 0-1.211.773-2.116 1.967-2.116 1.241 0 1.919.929 1.919 2.045-.001 1.325-.805 2.129-1.985 2.129zm4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174-1.397 0-2.117-.869-2.117-2.021 0-1.379.983-2.146 2.207-2.146.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338 0 .809.48 1.318 1.296 1.318zM14 9h-1V4l5 5h-4z"></path>
                      <path d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018.828.006 1.367-.449 1.367-1.415.006-.84-.485-1.284-1.271-1.284z"></path>
                    </svg>

                    <span className="text-[12px] text-[#363636]">
                      Notice of Regularization
                    </span>
                  </td>
                  <td className="text-[12px] text-[#363636]">
                    February 28, 2024
                  </td>
                  <td className="text-[12px] text-[#363636]">Word Document</td>
                  <td className="text-[10px] text-[#363636]">
                    <button className="text-[12px] font-semibold text-[#CC5500] bg-[#F5DDCC] px-3 py-2 rounded-[8px]">
                      View
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="flex flex-row flex-nowrap justify-start items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-[#363636] h-6 w-6"
                    >
                      <path d="M12.186 14.552c-.617 0-.977.587-.977 1.373 0 .791.371 1.35.983 1.35.617 0 .971-.588.971-1.374 0-.726-.348-1.349-.977-1.349z"></path>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.155 17.454c-.426.354-1.073.521-1.864.521-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432.42.312.684.81.684 1.522 0 .775-.282 1.309-.672 1.639zm2.99.546c-1.2 0-1.901-.906-1.901-2.058 0-1.211.773-2.116 1.967-2.116 1.241 0 1.919.929 1.919 2.045-.001 1.325-.805 2.129-1.985 2.129zm4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174-1.397 0-2.117-.869-2.117-2.021 0-1.379.983-2.146 2.207-2.146.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338 0 .809.48 1.318 1.296 1.318zM14 9h-1V4l5 5h-4z"></path>
                      <path d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018.828.006 1.367-.449 1.367-1.415.006-.84-.485-1.284-1.271-1.284z"></path>
                    </svg>

                    <span className="text-[12px] text-[#363636]">
                      Notice of Regularization
                    </span>
                  </td>
                  <td className="text-[12px] text-[#363636]">
                    February 28, 2024
                  </td>
                  <td className="text-[12px] text-[#363636]">Word Document</td>
                  <td className="text-[10px] text-[#363636]">
                    <button className="text-[12px] font-semibold text-[#CC5500] bg-[#F5DDCC] px-3 py-2 rounded-[8px]">
                      View
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="flex flex-row flex-nowrap justify-start items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-[#363636] h-6 w-6"
                    >
                      <path d="M12.186 14.552c-.617 0-.977.587-.977 1.373 0 .791.371 1.35.983 1.35.617 0 .971-.588.971-1.374 0-.726-.348-1.349-.977-1.349z"></path>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.155 17.454c-.426.354-1.073.521-1.864.521-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432.42.312.684.81.684 1.522 0 .775-.282 1.309-.672 1.639zm2.99.546c-1.2 0-1.901-.906-1.901-2.058 0-1.211.773-2.116 1.967-2.116 1.241 0 1.919.929 1.919 2.045-.001 1.325-.805 2.129-1.985 2.129zm4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174-1.397 0-2.117-.869-2.117-2.021 0-1.379.983-2.146 2.207-2.146.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338 0 .809.48 1.318 1.296 1.318zM14 9h-1V4l5 5h-4z"></path>
                      <path d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018.828.006 1.367-.449 1.367-1.415.006-.84-.485-1.284-1.271-1.284z"></path>
                    </svg>

                    <span className="text-[12px] text-[#363636]">
                      Notice of Regularization
                    </span>
                  </td>
                  <td className="text-[12px] text-[#363636]">
                    February 28, 2024
                  </td>
                  <td className="text-[12px] text-[#363636]">Word Document</td>
                  <td className="text-[10px] text-[#363636]">
                    <button className="text-[12px] font-semibold text-[#CC5500] bg-[#F5DDCC] px-3 py-2 rounded-[8px]">
                      View
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="flex flex-row flex-nowrap justify-start items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-[#363636] h-6 w-6"
                    >
                      <path d="M12.186 14.552c-.617 0-.977.587-.977 1.373 0 .791.371 1.35.983 1.35.617 0 .971-.588.971-1.374 0-.726-.348-1.349-.977-1.349z"></path>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.155 17.454c-.426.354-1.073.521-1.864.521-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432.42.312.684.81.684 1.522 0 .775-.282 1.309-.672 1.639zm2.99.546c-1.2 0-1.901-.906-1.901-2.058 0-1.211.773-2.116 1.967-2.116 1.241 0 1.919.929 1.919 2.045-.001 1.325-.805 2.129-1.985 2.129zm4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174-1.397 0-2.117-.869-2.117-2.021 0-1.379.983-2.146 2.207-2.146.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338 0 .809.48 1.318 1.296 1.318zM14 9h-1V4l5 5h-4z"></path>
                      <path d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018.828.006 1.367-.449 1.367-1.415.006-.84-.485-1.284-1.271-1.284z"></path>
                    </svg>

                    <span className="text-[12px] text-[#363636]">
                      Notice of Regularization
                    </span>
                  </td>
                  <td className="text-[12px] text-[#363636]">
                    February 28, 2024
                  </td>
                  <td className="text-[12px] text-[#363636]">Word Document</td>
                  <td className="text-[10px] text-[#363636]">
                    <button className="text-[12px] font-semibold text-[#CC5500] bg-[#F5DDCC] px-3 py-2 rounded-[8px]">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {visible && (
            <div className="mx-1 mt-4 flex justify-end">
              <div className="">
                <button
                  id="save-button"
                  className="btn btn-sm btn-outline normal-case mx-1"
                  onClick={disableFields}
                  disabled={
                    (valPersonalEmail === false ||
                      isLengthPersonalEmail === false ||
                      valPersonalPhone === false ||
                      isLengthPersonalPhone === false ||
                      valEName === false ||
                      isLengthEName === false ||
                      valEContact === false ||
                      isLengthEContact === false ||
                      valStatus === false) &&
                    true
                  }
                  // const [valPersonalEmail, setValPersonalEmail] = useState("");
                  // const [isLengthPersonalEmail, setIsLengthPersonalEmail] = useState("");

                  // const [valPersonalPhone, setPersonalPhone] = useState("");
                  // const [isLengthPersonalPhone, setIsLengthPersonalPhone] = useState("");

                  // const [valEName, setValEName] = useState("");
                  // const [isLengthEName, setIsLengthEName] = useState("");
                  // const [valEContact, setValEContact] = useState("");
                  // const [isLengthEContact, setIsLengthEContact] = useState("");

                  // const [valStatus, setValStatus] = useState("");
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    data-slot="icon"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                    />
                  </svg>
                  Save Profile
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Profile;