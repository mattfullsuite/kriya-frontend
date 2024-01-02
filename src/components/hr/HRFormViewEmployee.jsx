import moment from "moment";
import Axios from "axios";
import { React, useEffect, useState } from "react";
import ButtonBack from "../universal/ButtonBack";
import {useParams, Link} from "react-router-dom"

const HRFormViewEmployee = () => {
  const {emp_id} = useParams()
  const [profile, setProfile] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [ptoInfo, setPtoInfo] = useState({
    new_pto_balance: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await Axios.get(`${BASE_URL}/viewEmployee/${emp_id}`);
        setProfile(res.data);
        setPtoInfo({...ptoInfo, new_pto_balance: res.data[0].leave_balance})
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);


  const handleChange = (event) => {
    setPtoInfo({ ...ptoInfo, [event.target.name]: [event.target.value] });

    console.log(JSON.stringify(ptoInfo))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios
      .post(`${BASE_URL}/setPTO/${emp_id}`, ptoInfo)
      .then((res) => console.log(JSON.stringify(ptoInfo)))
      .catch((err) => console.log(err));

      document.getElementById("manage-pto").close();
      document.getElementById("pto-manage").reset();

      // window.location.reload();
      alert("Successfully set new PTO to: " + JSON.stringify(ptoInfo));
  };

  ///setPTO/:emp_id

  return (
    <>
      {profile.map((p) => (
        <div className="p-4 sm:ml-64 flex flex-col">
          <ButtonBack></ButtonBack>

          {/* Name, Primary */}
          <div className="m-2 p-3">
            <h1 className="text-4xl font-bold tracking-wide">
              {/* Marco Eliseo Antero */}
              {p.f_name + " " + p.m_name + " " + p.s_name}
            </h1>
            <h1>{p.work_email}</h1>
            <h1>{p.title}</h1>
            <h1>{p.emp_num}</h1>
          </div>

          <div className="text-right mr-2">
            {" "}
            <Link to={`/editemployee/` + p.emp_id}>
            <button className="btn btn-sm btn-outline normal-case mx-1">
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

            </Link>
            
            <button
              className="btn btn-sm btn-outline normal-case mx-1"
              onClick={() => document.getElementById("manage-pto").showModal()}
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              Manage PTO
            </button>
          </div>

          <dialog
            id="manage-pto"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box justify-center">
            <form 
            method="dialog"
            >
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => 
                  document.getElementById("manage-pto").close() && 
                  document.getElementById("pto-manage").reset()}>
                  ✕
                </button>
              </form >
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-xl mb-2 text-center">PTO Management</h3>
                <p className="text-md text-center">{p.emp_num}</p>
                <p className="text-lg font-bold text-center">{p.f_name + " " + p.m_name + " " + p.s_name}</p>
                <p className="text-sm mb-1 text-center">Current PTO: {p.leave_balance}</p>
                  <form id="pto-manage" onSubmit={handleSubmit} action="">
                  <div className="flex flex-col gap-3 items-center">
                    <input
                      name="new_pto_balance"
                      type="number"
                      step="0.5"
                      min="0"
                      max="15"
                      className="input input-bordered w-28"
                      value={ptoInfo.new_pto_balance}
                      onChange={handleChange}
                    />
                    <button value={p.emp_id} type="submit" className="btn btn-md max-w-xs">Save</button>
                    </div>
                  </form>
              </div>
            </div>
          </dialog>
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
                  value={p.personal_email}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                  readonly
                />
              </label>

              {/* Contact Number */}
              <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">Contact Number</span>
                </div>
                <input
                  value={p.contact_num}
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
                  value={p.emergency_contact_name}
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
                  value={p.emergency_contact_num}
                  type="text"
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
                  value={p.civil_status}
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
        </div>
      ))}
    </>
  );
};

export default HRFormViewEmployee;
