import React, { useState, useEffect } from "react";
//import { confirmAlert } from 'react-confirm-alert';
//import 'react-confirm-alert/src/react-confirm-alert.css'
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const FileOvertimeRequest = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [approvers, setApprover] = useState([]);
  const [overtimeDate, setOvertimeDate] = useState(new Date());
  const [mySuperior, setMySuperior] = useState([]);
  //const [supID, setSupID] = useState([]);
  let ptoCredits;

  useEffect(() => {
    const fetchApprover = async () => {
      try {
        //const res = await axios.get(BASE_URL + "/getAllApprovers");
        const ores = await axios.get(BASE_URL + "/getOwnSuperior")
        //setApprover(res.data);
        setMySuperior(ores.data)
        //setSupID(ores.data[0].superior_id)
      } catch (err) {
        console.log(err);
      }
    };
    fetchApprover();
  }, []);

  const [overtimeInfo, setOvertimeInfo] = useState({
    overtime_type: "",
    overtime_reason: "",
    hours_rendered: "",
    overtime_date: moment().format("YYYY-MM-DD"),
  });


  const handleChange = (event) => {

    setOvertimeInfo({
      ...overtimeInfo,
      [event.target.name]: [event.target.value],
      overtime_date: moment(overtimeDate).format("YYYY-MM-DD"),
    });

    console.log(JSON.stringify(overtimeInfo));

    ptoLabelChange();
    taLabelChange();
  };

  const taLabelChange = () => {
    const ta = document.getElementById("leave_hf_reason");
    const maxLength = ta.getAttribute("maxlength");

    ta.addEventListener("input", function (e) {
      const target = e.target;
      const currentLength = target.value.length;
      document.getElementById("textarea-hf-label").innerHTML =
        currentLength + "/" + maxLength;
      if (currentLength == maxLength) {
        document.getElementById("textarea-hf-label").style.color = "red";
      }
    });
  };

  const ptoLabelChange = () => {
    var count = 0.5;
    document.getElementById("hf-pto_enough_label").innerHTML =
      "Use PTO credit(/s)?";
    document.getElementById("pto_hf_checkbox").disabled = false;
    ptoCredits = document.getElementById("pto_hf_points").innerHTML;
    document.getElementById("hf-pto_enough_label").style.color = "black";
    document.getElementById("pto_hf_points").style.color = "black";

    if (count > ptoCredits) {
      document.getElementById("pto_hf_checkbox").disabled = true;
      document.getElementById("hf-pto_enough_label").innerHTML =
        "Insufficient PTOs. Considered as <b>Unpaid</b>";
      document.getElementById("pto_hf_points").style.color = "red";
    }
  };

  const handleCancel = () => {
    document.getElementById("file_an_overtime_btn").close();
    document.getElementById("leaveForm").reset();
  };

  const handleSubmit = (event) => {

    //handlePTOpoints();
    document.getElementById("submit-button").disabled = true;

    event.preventDefault();

    

    axios
      .post(BASE_URL + "/fileOvertime", overtimeInfo)
      .then((res) => {
        if (res.data === "success") {
          document.getElementById("file_an_overtime_btn").close();
          document.getElementById("overtimeForm").reset();

          notifySuccess();

          setTimeout(() => {
            window.top.location = window.top.location
            document.getElementById("submit-button").disabled = false;
          }, 3500)


        } else if (res.data === "error") {
          document.getElementById("file_an_overtime_btn").close();
          document.getElementById("overtimeForm").reset();
          notifyFailed();

          setTimeout(() => {
            window.top.location = window.top.location
            document.getElementById("submit-button").disabled = false;
          }, 3500)
        }

        setNotif(res.data);
      })
      .catch((err) => console.log(err));
    
  };


  const [notif, setNotif] = useState([]);

  const notifySuccess = () =>
    toast.success("Successfully requested overtime.", {
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

  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      {/* Buttons */}
      <div className="m-2 flex flex-col">
        <div
          //className="border-2 border-dashed border-gray-200 p-4 flex flex-col justify-center items-center gap-3 h-56 w-full rounded-lg md:w-56 cursor-pointer"
          className="w-full p-3 flex flex-col justify-center items-center bg-white text-[14px] rounded-[15px] border border-[#e4e4e4]"
          onClick={() =>
            document.getElementById("file_an_overtime_btn").showModal()
          }
        >

          <span>Request Overtime</span>
        </div>

        {/* Modal - Overtime Request   */}
        <dialog id="file_an_overtime_btn" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-center">File An Overtime </h3>

            <form
              id="overtimeForm"
              action=""
              method="dialog"
              onSubmit={handleSubmit}
            >
              <br />

              {/* Dropdown - PTO Type */}

              <label>
                <div className="label">
                  <h1 className="label-text">
                     Type of Overtime <span className="text-red-500"> *</span>
                  </h1>
                </div>
                <select
                  id="overtime_type"
                  name="overtime_type"
                  className="select select-bordered w-full mb-2"
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled selected>
                    Pick a reason for filing an overtime
                  </option>
                  <option> Regular Day Overtime</option>
                  <option> Rest Day Overtime </option>
                  <option> Special Holiday Overtime </option>
                  <option> Regular Holiday Overtime</option>
                  <option> Compulsory Overtime </option>
                  <option> Emergency Overtime </option>
                </select>
              </label>

              <div className="flex">
                {/* Date From */}
                <div className="flex-1 mx-1">
                  <label>
                    <div className="label">
                      <h1 className="label-text">
                        File to Date <span className="text-red-500"> *</span>
                      </h1>
                    </div>
                    {/* <input
                      id="leave_from"
                      name="leave_from"
                      type="date"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs mb-2"
                      onChange={handleChange}
                      onInput={disableNext}
                      min={moment().format("YYYY-MM-DD")}
                      required
                    /> */}
                    <DatePicker
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs mb-2"
                      selected={overtimeDate}
                      //minDate={new Date(moment())}
                      onChange={(date) => setOvertimeDate(date)}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="flex-1 mx-1">
                <h1 className="label-text">
                  Number of Hours to Render <span className="text-red-500"> *</span>
                </h1>
                <input
                      name="hours_rendered"
                      type="number"
                      step=".5"
                      min="0"
                      max="24"
                      className="input input-bordered w-28"
                      onChange={handleChange}
                    />
                </div>

              {/* Reason for Overtime */}
              <label className="form-control">
                <div className="label">
                  <h1 className="label-text">
                    Reason for Overtime <span className="text-red-500"> *</span>{" "}
                    <span className="text-red-500"> </span>
                  </h1>
                </div>
                <textarea
                  id="overtime_reason"
                  name="overtime_reason"
                  className="textarea textarea-bordered w-full max-w-lg mb-2"
                  placeholder="Insert Reason here..."
                  onChange={handleChange}
                  maxLength="255"
                  required
                ></textarea>
                <div className="label py-0">
                  <span className="label-text-alt"></span>
                  <span id="textarea-hf-label" className="label-text-alt">
                    0
                  </span>
                </div>
              </label>

              <label>
                <div className="label">
                  <h1 className="label-text">
                    Approver <span className="text-red-500"> *</span>
                  </h1>
                </div>
                <select
                  //id="approver_id"
                  name="approver_id"
                  className="select select-bordered w-full mb-2"
                  //onChange={handleChange}
                  required
                >

                  {mySuperior.map((appr) => (
                    <option value={appr.emp_id}>
                      {appr.f_name +
                        " " +
                        appr.s_name}
                    </option>
                  ))}
                </select>
              </label>


              {/* Button Container */}
              <div className="flex justify-end mt-3">
                <button
                  id="submit-button"
                  type="submit"
                  className="btn btn-primary mr-2"
                >
                  Submit
                </button>

                {/* Cancel Button */}
                {/* If there is a button in form, it will close the modal */}
                <button className="btn" type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default FileOvertimeRequest;
