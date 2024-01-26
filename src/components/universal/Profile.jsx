import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";
import ButtonBack from "./ButtonBack";
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
        <div className="p-4 sm:ml-64 flex flex-col">
          <ButtonBack></ButtonBack>
          {/* <form action="POST" 
          onSubmit={saveProfile}
          ></form> */}
          <div className="flex flex-col lg:flex-row items-center">
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
              <h1 className="text-xl text-center lg:text-left lg:text-4xl font-bold tracking-wide">
                {p.f_name + " " + p.m_name + " " + p.s_name}
              </h1>

              {designation.map((d) => (
                <div className="flex">
                  {/* col 2 */}
                  <div className="mt-2 flex-col">
                    <div className="flex flex-row justify-start items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                        />
                      </svg>

                      <h1>{d.company_name}</h1>
                    </div>

                    <div className="flex flex-row justify-start items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                      </svg>

                      <h1>{d.div_name}</h1>
                    </div>

                    <div className="flex flex-row justify-start items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                        />
                      </svg>
                      {noClient(d.client_name, d)}
                    </div>
                  </div>

                  {/* col 1 */}
                  <div className="mt-2 flex-col ml-20">
                    <div className="flex flex-row justify-start items-center gap-1">
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
                          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                        />
                      </svg>

                      <h1>
                        {p.position_name} -{" "}
                        {moment(p.date_hired).format("MMMM DD, YYYY")}
                      </h1>
                    </div>

                    <div className="flex flex-row justify-start items-center gap-1">
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
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                        />
                      </svg>

                      <h1>{p.emp_num}</h1>
                    </div>

                    <div className="flex flex-row justify-start items-center gap-1">
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
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                      <h1>{p.work_email}</h1>
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
                className="btn btn-sm btn-outline normal-case mx-1"
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
                Edit
              </button>
            </div>
          )}

          {/* Contact Information */}
          <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col">
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

          {/* Personal Information */}
          <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col">
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

          {/* Employee Information */}
          {/* <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col">
            <h1 className="font-bold mb-2">Employee Information</h1>

            <div>
              <h1 className="font-bold text-sm">Date Hired</h1>
              <h1 className="ml-2 text-sm">
                {moment(p.date_hired).format("MMMM DD, YYYY")}
              </h1>
            </div> 

            <div className="divider"></div>

            <div className="flex">
              <div className="flex-1">
                <h1 className="font-bold text-sm">SSS Number</h1>
                <h1 className="text-sm ml-2">00-0000000-0</h1>
              </div>

              <div className="flex-1">
                <h1 className="font-bold text-sm">PHIC Number</h1>
                <h1 className="text-sm ml-2">00-0000000-0</h1>
              </div>

              <div className="flex-1">
                <h1 className="font-bold text-sm">TIN Number</h1>
                <h1 className="text-sm ml-2">00-0000000-0</h1>
              </div>
            </div>

            <div className="divider"></div>

            <div className="flex my-1">
              <div className="flex-1">
                <h1 className="font-bold text-sm">Rate</h1>
                <h1 className="text-sm ml-2">00-0000000-0</h1>
              </div>

              <div className="flex-1">
                <h1 className="font-bold text-sm">Basic Salary</h1>
                <h1 className="text-sm ml-2">00-0000000-0</h1>
              </div>

              <div className="flex-1"></div>
            </div>

            <div className="flex my-1">
              <div className="flex-1">
                <h1 className="font-bold text-sm">Night Differential</h1>
                <h1 className="text-sm ml-2">00-0000000-0</h1>
              </div>

              <div className="flex-1">
                <h1 className="font-bold text-sm">Bonus</h1>
                <h1 className="text-sm ml-2">00-0000000-0</h1>
              </div>

              <div className="flex-1"></div>
          </div>  */}

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
                    valStatus === false) && true
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
                  Save
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
