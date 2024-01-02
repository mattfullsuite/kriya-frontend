import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";
import ButtonBack from "./ButtonBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [profile, setProfile] = useState([]);
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
          <div className="flex items-center">
            {profile.map((user) => (
              <div className="flex justify-center mt-5  mb-5">
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
              <h1 className="text-4xl font-bold tracking-wide">
                {/* Marco Eliseo Antero */}
                {p.f_name + " " + p.m_name + " " + p.s_name}
              </h1>

              <div className="mt-2">
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

                  <h1>{p.position_name}</h1>
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
              </div>
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
                  onChange={handleChange}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
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
                  onChange={handleChange}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
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
                  id="emergency_contact_name"
                  value={newInfo.emergency_contact_name}
                  onChange={handleChange}
                  maxLength="255"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
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
                  onChange={handleChange}
                  type="text"
                  maxLength="22"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
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
                <input
                  id="civil_status"
                  name="civil_status"
                  value={newInfo.civil_status}
                  onChange={handleChange}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
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
          <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col">
            <h1 className="font-bold mb-2">Employee Information</h1>

            <div>
              <h1 className="font-bold text-sm">Date Hired</h1>
              <h1 className="ml-2 text-sm">
                {moment(p.date_hired).format("MMMM DD, YYYY")}
              </h1>
            </div>

            {/* <div className="divider"></div>

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

              <div className="flex-1"></div> */}
            {/* </div> */}
          </div>
          {/* //test */}

          {visible && (
            <div className="mx-1 mt-4 flex justify-end">
              <div className="">
                <button
                  id="save-button"
                  className="btn btn-sm btn-outline normal-case mx-1"
                  onClick={disableFields}
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
