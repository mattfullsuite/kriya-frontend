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

const FileHalfDayLeave = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [approvers, setApprover] = useState([]);
  const [leaveFrom, setLeaveFrom] = useState(new Date());
  const [leaveTo, setLeaveTo] = useState(new Date());
  const [holiday, setHoliday] = useState([]);
  const [ptos, setPtos] = useState([]);
  const [myApproved, setMyApproved] = useState([]);
  const [myPending, setMyPending] = useState([]);
  const [mySuperior, setMySuperior] = useState([]);
  //const [supID, setSupID] = useState([]);
  let ptoCredits;

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchApprover = async () => {
      try {
        //const res = await axios.get(BASE_URL + "/getAllApprovers");
        const hres = await axios.get(BASE_URL + "/holidays");
        const pres = await axios.get(BASE_URL + "/blockPendingLeaves");
        const ares = await axios.get(BASE_URL + "/blockApprovedLeaves");
        const ores = await axios.get(BASE_URL + "/getOwnSuperior");
        //setApprover(res.data);
        setHoliday(hres.data);
        setMyApproved(ares.data);
        setMyPending(pres.data);
        setMySuperior(ores.data);
        //setSupID(ores.data[0].superior_id)
      } catch (err) {
        console.log(err);
      }
    };
    fetchApprover();
  }, []);

  const [leaveInfo, setLeaveInfo] = useState({
    leave_type: "",
    leave_reason: "",
    leave_from: moment().format("YYYY-MM-DD"),
    leave_to: moment().format("YYYY-MM-DD"),
  });

  const isWorkday = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    //const formattedDate = moment(date).format('YYYY-MM-DD')
    const day = date.getDay();
    return (
      day !== 0 && day !== 6 && !JSON.stringify(holiday).includes(formattedDate)
      //!JSON.stringify(myApproved).includes(formattedDate)
      //!JSON.stringify(myPending).includes(formattedDate)
    );
  };

  const handlePTOpoints = () => {
    if (document.getElementById("pto_hf_checkbox").checked) {
      setLeaveInfo({ ...leaveInfo, use_pto_points: [0.5] });
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
      leave_to: moment(leaveFrom).format("YYYY-MM-DD"),
    });

    // console.log(leaveFrom < leaveTo && isWorkday(leaveFrom) && isWorkday(leaveTo))
    // console.log(leaveFrom <= leaveTo )
    // console.log(isWorkday(leaveFrom))
    // console.log(isWorkday(leaveTo))

    console.log(JSON.stringify(leaveInfo));
    //countRegularDays(leaveFrom, leaveTo);

    // console.log(JSON.stringify(myPending))
    // console.log(JSON.stringify(myApproved))

    ptoLabelChange();
    taLabelChange();
    // disableSubmit();
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

  const disableSubmit = () => {
    const sub = document.getElementById("submit-button");

    if (leaveInfo.leave_type != "" && leaveInfo.approver_id != "") {
      sub.disabled = false;
    }
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
    document.getElementById("file_a_half_day_leave_btn").close();
    document.getElementById("leaveForm").reset();
    //window.location.reload();
  };

  const handleSubmit = (event) => {
    setIsDisabled(true);
    //handlePTOpoints();
    //document.getElementById("submit-button").disabled = true;

    event.preventDefault();

    // if (leaveFrom <= leaveTo && isWorkday(leaveFrom) && isWorkday(leaveTo)){

    axios
      .post(BASE_URL + "/fileLeave", leaveInfo)
      .then((res) => {
        if (res.data === "success") {
          document.getElementById("file_a_half_day_leave_btn").close();
          document.getElementById("leaveForm").reset();

          notifySuccess();

          setTimeout(() => {
            window.top.location = window.top.location;
            document.getElementById("submit-button").disabled = false;
          }, 3500);
          // window.location.reload();
        } else if (res.data === "error") {
          document.getElementById("file_a_half_day_leave_btn").close();
          document.getElementById("leaveForm").reset();
          notifyFailed();

          setTimeout(() => {
            window.top.location = window.top.location;
            document.getElementById("submit-button").disabled = false;
          }, 3500);
        }

        setNotif(res.data);
      })

      // .then((res) => console.log(JSON.stringify(leaveInfo)))
      .catch((err) => console.log(err));

    // } else {
    //   // document.getElementById("file_a_half_day_leave_btn").close();
    //   // document.getElementById("leaveForm").reset();
    //   // document.getElementById("submit-button").disabled = false;

    //   // alert("Date error!")
    //   document.getElementById("file_a_half_day_leave_btn").close();
    //   document.getElementById("leaveForm").reset();
    //   notifyFailed();

    //   setTimeout(() => {
    //     window.top.location = window.top.location
    //     document.getElementById("submit-button").disabled = false;
    //   }, 3500)

    //   setNotif("error");

    // }

    // axios
    //   .post("http://localhost:6197/subtractPTO", leaveInfo)
    //   .then((res) => console.log("PTO temporary subtracted"))
    //   .catch((err) => console.log(err));

    // document.getElementById("file_a_half_day_leave_btn").close();
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
          //className="border-2 border-dashed border-gray-200 p-4 flex flex-col justify-center items-center gap-3 h-56 w-full rounded-lg md:w-56 cursor-pointer"
          className="w-full p-3 flex flex-col justify-center items-center bg-white text-[14px] rounded-[15px] border border-[#e4e4e4]"
          onClick={() =>
            document.getElementById("file_a_half_day_leave_btn").showModal()
          }
        >
          {/* <svg
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
          </svg> */}

          <span>File a Half Day Leave</span>
        </div>

        {/* Modal - File A Leave   */}
        <dialog id="file_a_half_day_leave_btn" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-center">
              File A Half Day Leave
            </h3>

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
                    Type of Half Day Leave{" "}
                    <span className="text-red-500"> *</span>
                  </h1>
                </div>
                <select
                  id="leave_type"
                  name="leave_type"
                  className="select select-bordered w-full mb-2"
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled selected>
                    Pick a reason for filing a leave
                  </option>
                  <option> Sick Leave (Half Day)</option>
                  <option> Adverse Weather Leave (Half Day)</option>
                  <option> Study Leave (Half Day)</option>
                  <option> Emergency Leave (Half Day)</option>
                  <option> Other/Special Leave (Half Day)</option>
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
                      //id="leave_from"
                      //name="leave_from"
                      // type="date"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs mb-2"
                      selected={leaveFrom}
                      //minDate={new Date(moment())}
                      onChange={(date) => setLeaveFrom(date)}
                      //filterDate={isWorkday}
                      //onSelect={setLeaveInfo({ ...leaveInfo, leave_from: leaveFrom })}
                      //onInput={disableNext}
                      //min={moment().format("YYYY-MM-DD")}
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
                  id="leave_hf_reason"
                  name="leave_reason"
                  className="textarea textarea-bordered w-full max-w-lg mb-2"
                  placeholder="Reason for Leave..."
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
                  {/* <option value="" disabled selected>
                    Choose your approver
                  </option>

                  {approvers.map((appr) => (
                    <option value={appr.emp_id}>
                      {appr.f_name +
                        " " +
                        appr.s_name +
                        " (" +
                        appr.dept_name + ")"}
                    </option>
                  ))} */}

                  {mySuperior.map((appr) => (
                    <option value={appr.emp_id}>
                      {appr.f_name + " " + appr.s_name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="divider"></div>

              {/* Current PTO Points */}
              <h1 className="text-md text-center mb-2 font-semibold">
                Current PTO Points
              </h1>
              {ptos.map((pto) => (
                <h1
                  id="pto_hf_points"
                  className="text-4xl font-bold mb-2 text-center"
                >
                  {pto.leave_balance}
                </h1>
              ))}

              {/* Use PTO Checkbox */}
              <div className="flex flex-col justify-center items-center h-full">
                <div className="flex items-center">
                  <input
                    id="pto_hf_checkbox"
                    name="use_pto_points"
                    type="checkbox"
                    className="checkbox checkbox-sm mr-3"
                    onChange={handleChange}
                    //onClick={checkPTO}
                  />
                  <h1 id="hf-pto_enough_label" className="ptos_labels">
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
                  //onClick={handleSubmit}
                  onClick={handlePTOpoints}
                  disabled={isDisabled}
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

export default FileHalfDayLeave;
