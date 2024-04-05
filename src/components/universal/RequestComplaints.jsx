import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestComplaints = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [hr, setHr] = useState([]);
  const [notif, setNotif] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/getAllHR");
        setHr(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const [complaintInfo, setComplaintInfo] = useState({
    content_type: "",
    content_body: "",
    hr_id: "",
    anon_box: "",
  });

  const handleChange = (event) => {
    setComplaintInfo({
      ...complaintInfo,
      [event.target.name]: [event.target.value], anon_box : event.target.checked
    });

    console.log(JSON.stringify(complaintInfo));
  };

  const handleSubmit = (event) => {
    document.getElementById("submit-button").disabled = true;
    event.preventDefault();

    axios
      .post(BASE_URL + "/submitComplaint", complaintInfo)
      .then((res) => {
        if (res.data === "success") {
          document.getElementById("form-com").reset();
          document.getElementById("complaint_form").close();

          notifySuccess();

          setTimeout(() => {
            window.top.location = window.top.location;
            document.getElementById("submit-button").disabled = false;
          }, 3500);
        } else if (res.data === "error") {
          document.getElementById("form-com").reset();
          document.getElementById("complaint_form").close();
          notifyFailed();

          setTimeout(() => {
            window.top.location = window.top.location;
            document.getElementById("submit-button").disabled = false;
          }, 3500);
        }

        setNotif(res.data);
      })
      .catch((err) => console.log(err));
  };

  const notifySuccess = () =>
    toast.success("Successfully submitted.", {
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

  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      <div
        className="m-2 p-4 border border-[#e4e4e4] rounded-[15px] bg-white flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56 cursor-pointer"
        onClick={() => document.getElementById("complaint_form").showModal()}
      >
        <div className="flex flex-col justify-center items-center h-full gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-14 h-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>

          <span>Submit a Complaint</span>
        </div>

        <dialog id="complaint_form" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between items-center">
              <span className="text-lg font-bold">Submit a complaint</span>

              <form method="dialog" id="form-com">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
            </div>

            <div className="mt-5">
              <div className="p-3 bg-red-200 rounded-lg">
                <div className="flex flex-row gap-2 justify-start items-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="text-md font-semibold text-black">Note</span>
                </div>

                <p className="text-[12px] text-left text-black">
                  All complaints submitted to HR will be treated with the utmost
                  confidentiality. However, it is important to note that in
                  certain circumstances, confidentiality may be limited by legal
                  or organizational requirements. HR will make every effort to
                  protect your privacy within the bounds of these obligations.
                </p>
              </div>

              <div className="mt-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <p class="label-text text-left mb-1">Complaint type*</p>
                    <select
                      className="select select-bordered w-full"
                      name="content_type"
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled selected>
                        Select Complaint Type
                      </option>
                      <option>Challenges with managers/co-workers</option>
                      <option>Micromanaging</option>
                      <option>Failing to provide clear instructions</option>
                      <option>Lack of praise</option>
                      <option>Payroll and benefits</option>
                      <option>Paid and unpaid time off</option>
                      <option>Employee goals and performance reviews</option>
                      <option>Salary and job titles</option>
                      <option>Career advancement and job transfers</option>
                      <option>Harassment and discrimination</option>
                      <option>Work/Life balance</option>
                      <option>Attendance and policy issues</option>
                      <option>Others</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <p class="label-text text-left mb-1">Send to</p>
                    <select
                      className="select select-bordered w-full"
                      onChange={handleChange}
                      name="hr_id"
                      required
                    >
                      <option value="" disabled selected>
                        Select HR
                      </option>
                      <option value="0">All HR</option>

                      {hr.map((h) => (
                        <option value={h.emp_id}>
                          {h.f_name + " " + h.s_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <p class="label-text text-left mb-1">Reason*</p>

                    <textarea
                      className="textarea textarea-bordered w-full"
                      placeholder="Explain your complaint here..."
                      onChange={handleChange}
                      name="content_body"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3 flex flex-row justify-start items-center">
                    <label className="label cursor-pointer">
                      <input 
                      name="anon_box"
                      type="checkbox" 
                      className="toggle mr-2 toggle-info" 
                      onChange={handleChange}
                      />
                      <span className="label-text">Send Anonymously?</span>
                    </label>
                  </div>

                  <div className="flex flex-row justify-end items-center gap-3">
                    {/* <button className="btn btn-ghost normal-case">Cancel</button> */}
                    <button
                      className="btn btn-active normal-case"
                      id="submit-button"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default RequestComplaints;
