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

const FileOvertimeRequest = ({ bgColor, focusBorder }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [approvers, setApprover] = useState([]);
  const [overtimeDate, setOvertimeDate] = useState(new Date());
  const [mySuperior, setMySuperior] = useState([]);
  //const [supID, setSupID] = useState([]);
  let ptoCredits;

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchApprover = async () => {
      try {
        //const res = await axios.get(BASE_URL + "/getAllApprovers");
        const ores = await axios.get(BASE_URL + "/getOwnSuperior");
        //setApprover(res.data);
        setMySuperior(ores.data);
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
    setIsDisabled(true)
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
            window.top.location = window.top.location;
            document.getElementById("submit-button").disabled = false;
          }, 3500);
        } else if (res.data === "error") {
          document.getElementById("file_an_overtime_btn").close();
          document.getElementById("overtimeForm").reset();
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
          className="w-full p-3 flex flex-col justify-center items-center bg-white text-[14px] rounded-[15px] border border-[#e4e4e4] select-none cursor-pointer"
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

              <div className="mb-3">
                <div className="label">
                  <h1 className="label-text">
                    Type of Overtime <span className="text-red-500"> *</span>
                  </h1>
                </div>
                <select
                  id="overtime_type"
                  name="overtime_type"
                  className={`select select-bordered w-full mb-2 focus:outline-none ${focusBorder}`}
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
              </div>

              <div className="flex flex-row justify-between gap-2 mb-3">
                <div className="box-border flex-1">
                  <h1 className="label-text mb-1">
                    File to Date <span className="text-red-500"> *</span>
                  </h1>

                  <DatePicker
                    className={`box-border max-w-96 input input-bordered focus:outline-none ${focusBorder}`}
                    selected={overtimeDate}
                    //minDate={new Date(moment())}
                    onChange={(date) => setOvertimeDate(date)}
                    required
                  />
                </div>

                <div className="box-border flex-1">
                  <h1 className="label-text mb-1">
                    Hours to render <span className="text-red-500"> *</span>
                  </h1>

                  <input
                    name="hours_rendered"
                    type="number"
                    step=".5"
                    min="0"
                    max="24"
                    className={`box-border w-full input input-bordered focus:outline-none ${focusBorder}`}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Reason for Overtime */}
              <div className="form-control mb-3">
                <div className="label">
                  <h1 className="label-text mb-1">
                    Reason for Overtime <span className="text-red-500"> *</span>{" "}
                    <span className="text-red-500"> </span>
                  </h1>
                </div>
                <textarea
                  id="overtime_reason"
                  name="overtime_reason"
                  className={`textarea textarea-bordered w-full ${focusBorder} focus:outline-none h-32 resize-none`}
                  placeholder="Reason..."
                  onChange={handleChange}
                  maxLength="255"
                  required
                ></textarea>
              </div>

              {mySuperior.map((appr) => (
                <div className="box-border flex flex-row justify-start items-center bg-[#f7f7f7] p-3  mt-10 rounded-[15px] border border-[#e4e4e4] gap-2">
                  <div className="box-border">
                    {appr.emp_pic == null || appr.emp_pic == "" ? (
                      <div
                        className={`${bgColor} w-14 h-14 flex flex-row justify-center items-center rounded-full`}
                      >
                        <span className="text-white font-bold text-[20px]">
                          {appr.f_name.charAt(0) + appr.s_name.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <img />
                    )}
                  </div>

                  <div className="box-border flex-1">
                    <p className="font-medium font-[#363636] text-=[20px] leading-none">
                      {appr.f_name + " " + appr.s_name}
                    </p>
                    <p className="text-[#8b8b8b] text-[14px]">Approver</p>
                  </div>
                </div>
              ))}

              {/* Button Container */}
              <div className="flex justify-end mt-5 gap-2">
                <button
                  id="submit-button"
                  type="submit"
                  className={`px-4 py-2 ${bgColor} text-white rounded-[8px]`}
                  disabled={isDisabled}
                >
                  Submit
                </button>

                <button
                  className={`px-4 py-2 bg-[#e9e9e9] text-[#363636] rounded-[8px]`}
                  type="button"
                  onClick={handleCancel}
                >
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
