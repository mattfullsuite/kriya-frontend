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

const DashBButtons = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [approvers, setApprover] = useState([]);
  const [leaveFrom, setLeaveFrom] = useState(new Date());
  const [leaveTo, setLeaveTo] = useState(new Date());
  const [holiday, setHoliday] = useState([]);
  const [ptos, setPtos] = useState([]);
  const [myApproved, setMyApproved] = useState([]);
  const [myPending, setMyPending] = useState([]);
  let ptoCredits;

  useEffect(() => {
    const fetchApprover = async () => {
      try {
        const res = await axios.get(BASE_URL + "/getAllApprovers");
        const hres = await axios.get(BASE_URL + "/holidays");
        const pres = await axios.get(BASE_URL + "/myPendingLeaves");
        const ares = await axios.get(BASE_URL + "/myApprovedLeaves");
        setApprover(res.data);
        setHoliday(hres.data);
        setMyApproved(ares.data);
        setMyPending(pres.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApprover();
  }, []);

  const [leaveInfo, setLeaveInfo] = useState({
    leave_type: "",
    leave_reason: "",
    leave_from: "",
    leave_to: "",
    approver_id: "",
    use_pto_points: "",
  });

  const isWorkday = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const day = date.getDay();
    return (
      day !== 0 &&
      day !== 6 &&
      !JSON.stringify(holiday).includes(formattedDate) &&
      !JSON.stringify(myApproved).includes(formattedDate) &&
      !JSON.stringify(myPending).includes(formattedDate)
    );
  };

  const handlePTOpoints = () => {
    if (document.getElementById("pto_checkbox").checked) {
      var count = countRegularDays(leaveFrom, leaveTo);
      setLeaveInfo({ ...leaveInfo, use_pto_points: [count] });
    } else {
      setLeaveInfo({ ...leaveInfo, use_pto_points: [0] });
    }
  };

  // const [ptos, setPtos] = useState([]);
  // let ptoCredits;

  useEffect(() => {
    const fetchUserPTO = async () => {
      try {
        const res = await axios.get(BASE_URL + "/getUserPTO");
        setPtos(res.data);
        ptoCredits = res.data[0].leave_balance;
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPTO();
  }, []);

  const handleChange = (event) => {
    setLeaveInfo({
      ...leaveInfo,
      [event.target.name]: [event.target.value],
      leave_from: moment(leaveFrom).format("YYYY-MM-DD"),
      leave_to: moment(leaveTo).format("YYYY-MM-DD"),
    });

    console.log(JSON.stringify(leaveInfo));
    countRegularDays(leaveFrom, leaveTo);

    ptoLabelChange();
    taLabelChange();
    // disableSubmit();
  };

  const taLabelChange = () => {
    const ta = document.getElementById("leave_reason");
    const maxLength = ta.getAttribute("maxlength");

    ta.addEventListener("input", function (e) {
      const target = e.target;
      const currentLength = target.value.length;
      document.getElementById("textarea-label").innerHTML =
        currentLength + "/" + maxLength;
      if (currentLength == maxLength) {
        document.getElementById("textarea-label").style.color = "red";
      }
    });
  };

  const disableSubmit = () => {
    const sub = document.getElementById("submit-button");

    if (leaveInfo.leave_type != "" && leaveInfo.approver_id != "") {
      sub.disabled = false;
    }
  };

  const ptoLabelChange = () => {
    var count = countRegularDays(leaveFrom, leaveTo);
    document.getElementById("pto_enough_label").innerHTML =
      "Use PTO credit(/s)?";
    document.getElementById("pto_checkbox").disabled = false;
    ptoCredits = document.getElementById("pto_points").innerHTML;
    document.getElementById("pto_enough_label").style.color = "black";
    document.getElementById("pto_points").style.color = "black";

    if (count > ptoCredits) {
      document.getElementById("pto_checkbox").disabled = true;
      document.getElementById("pto_enough_label").innerHTML =
        "Insufficient PTOs. Considered as <b>Unpaid</b>"
      document.getElementById("pto_points").style.color = "red";
    }
  };

  const handleCancel = () => {
    document.getElementById("file_a_leave_btn").close();
    document.getElementById("leaveForm").reset();
    window.location.reload();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(BASE_URL + "/fileLeave", leaveInfo)
      .then((res) => {
        if (res.data === "success") {
          console.log("tite")
    document.getElementById("file_a_leave_btn").close();
        document.getElementById("leaveForm").reset();


          notifySuccess();

          setTimeout(() => {
            window.location.reload();
          }, 3500)
              // window.location.reload();


        } else if (res.data === "error") {
          notifyFailed();
        }

        setNotif(res.data);
      })
      
      // .then((res) => console.log(JSON.stringify(leaveInfo)))
      .catch((err) => console.log(err));

    // axios
    //   .post("http://localhost:6197/subtractPTO", leaveInfo)
    //   .then((res) => console.log("PTO temporary subtracted"))
    //   .catch((err) => console.log(err));

    // document.getElementById("file_a_leave_btn").close();
    // document.getElementById("leaveForm").reset();
    // window.location.reload();
    // alert("Successfully filed leave!");
  };

  const countRegularDays = (date1, date2) => {
    var count = 0;

    var startDate = moment(date1).startOf("day");
    var lastDate = moment(date2).startOf("day");

    //moment().format("YYYY-MM-DD")

    for (var current = startDate; current <= lastDate; current.add(1, "d")) {
      var day = moment(current).day();
      const formattedDate = current.toISOString().split("T")[0];
      if (
        day !== 0 &&
        day !== 6 &&
        !JSON.stringify(holiday).includes(formattedDate)
      ) {
        count += 1;
      }
    }
    console.log("Count: " + count);

    return count;
  };

  const [notif, setNotif] = useState([]);

  const notifySuccess = () =>
    toast.success("Successfully filed a leave.", {
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
          className="border-2 border-dashed border-gray-200 p-4 flex flex-col justify-center items-center gap-3 h-56 w-full rounded-lg md:w-56 cursor-pointer"
          onClick={() =>
            document.getElementById("file_a_leave_btn").showModal()
          }
        >
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>

          <span>File a leave</span>
        </div>

        {/* Modal - File A Leave   */}
        <dialog id="file_a_leave_btn" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-center">File A Leave</h3>

            <form
              id="leaveForm"
              action=""
              method="dialog"
              onSubmit={handleSubmit}
            >
              <br />

              {/* Dropdown - PTO Type */}

              <label>
                <div className="label">
                  <h1 className="label-text">
                    Type of Leave <span className="text-red-500"> *</span>
                  </h1>
                </div>
                <select
                  id="leave_type"
                  name="leave_type"
                  className="select select-bordered w-full mb-2"
                  onChange={handleChange}
                  required
                >
                  <option value="" hidden>
                    Pick a reason for filing a leave
                  </option>
                  <option>Sick Leave</option>
                  <option>Bereavement Leave</option>
                  <option>Maternity or Paternity Leave</option>
                  <option>Vacation Leave</option>
                  <option>Adverse Weather Leave</option>
                  <option>Study Leave</option>
                  <option>Emergency Leave</option>
                  <option>Other/Special Leave</option>
                </select>
              </label>

              <div className="flex">
                {/* Date From */}
                <div className="flex-1 mx-1">
                  <label>
                    <div className="label">
                      <h1 className="label-text">
                        Date From <span className="text-red-500"> *</span>
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
                      //id="leave_from"
                      //name="leave_from"
                      // type="date"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs mb-2"
                      selected={leaveFrom}
                      minDate={new Date(moment())}
                      onChange={(date) => setLeaveFrom(date)}
                      filterDate={isWorkday}
                      //onSelect={setLeaveInfo({ ...leaveInfo, leave_from: leaveFrom })}
                      //onInput={disableNext}
                      //min={moment().format("YYYY-MM-DD")}
                      required
                    />
                  </label>
                </div>

                <div className="flex-1 mx-1">
                  {/* Date To */}

                  <label className="form-control">
                    <div className="label">
                      <h1 className="label-text">
                        Date To <span className="text-red-500"> *</span>
                      </h1>
                    </div>
                    {/* <input
                      id="leave_to"
                      name="leave_to"
                      type="date"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs mb-2"
                      min={moment().format("YYYY-MM-DD")}
                      onChange={handleChange}
                      required
                    /> */}

                    <DatePicker
                      //id="leave_to"
                      //name="leave_to"
                      className="input input-bordered w-full max-w-xs mb-2"
                      //min={moment().format("YYYY-MM-DD")}
                      selected={leaveTo}
                      filterDate={isWorkday}
                      minDate={leaveFrom}
                      onChange={(date) =>
                        setLeaveTo(date) &&
                        setLeaveInfo({
                          ...leaveInfo,
                          leave_to: moment(leaveTo).format("YYYY-MM-DD"),
                        })
                      }
                      //onSelect={setLeaveInfo({ ...leaveInfo, leave_to: leaveTo })}
                      required
                    />
                  </label>
                </div>
              </div>

              {/* Reason for Leave */}
              <label className="form-control">
                <div className="label">
                  <h1 className="label-text">
                    Reason for Leave <span className="text-red-500"> *</span>{" "}
                    <span className="text-red-500"> </span>
                  </h1>
                </div>
                <textarea
                  id="leave_reason"
                  name="leave_reason"
                  className="textarea textarea-bordered w-full max-w-lg mb-2"
                  placeholder="Reason for Leave..."
                  onChange={handleChange}
                  maxLength="255"
                  required
                ></textarea>
                <div className="label py-0">
                  <span className="label-text-alt"></span>
                  <span id="textarea-label" className="label-text-alt">
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
                  id="approver_id"
                  name="approver_id"
                  className="select select-bordered w-full mb-2"
                  onChange={handleChange}
                  required
                >
                  <option value="" hidden>
                    Choose your approver
                  </option>

                  {approvers.map((appr) => (
                    <option value={appr.emp_id}>
                      {appr.f_name +
                        " " +
                        appr.s_name +
                        " (" +
                        appr.dept_name +
                        ")"}
                    </option>
                  ))}
                </select>
              </label>

              <div className="divider"></div>

              {/* Current PTO Points */}
              <h1 className="text-md text-center mb-2 font-semibold">Current PTO Points</h1>
              {ptos.map((pto) => (
                <h1
                  id="pto_points"
                  className="text-4xl font-bold mb-2 text-center"
                >
                  {pto.leave_balance}
                </h1>
              ))}

              {/* Use PTO Checkbox */}
              <div className="flex flex-col justify-center items-center h-full">
                <div className="flex items-center">
                  <input
                    id="pto_checkbox"
                    name="use_pto_points"
                    type="checkbox"
                    className="checkbox checkbox-sm mr-3"
                    onChange={handleChange}
                    //onClick={checkPTO}
                  />
                  <h1 id="pto_enough_label" className="ptos_labels">
                    Use PTO credit(/s)?
                  </h1>
                </div>
              </div>

              <div className="divider"></div>

              {/* Button Container */}
              <div className="flex justify-end mt-3">
                <button
                  id="submit-button"
                  type="submit"
                  className="btn btn-primary mr-2"
                  onClick={handlePTOpoints}
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

export default DashBButtons;
