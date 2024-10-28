import { useEffect, useState, useRef } from "react";
import Headings from "../../../../components/universal/Headings";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import moment from "moment";

function ViewPayDispute(props) {
  const [payDisputeInfo, setPayDisputeInfo] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const selectRef = useRef();

  const toastNotification = (type, message) => {
    const properties = {
      position: "top-right",
      autoClose: 2250,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };
    type == "success"
      ? toast.success(message, properties)
      : toast.error(message, properties);
  };

  const updateDispute = async () => {
    document.getElementById("button-update").disabled = true;
    await axios
      .patch(BASE_URL + "/d-updateUserDispute", payDisputeInfo)
      .then(function (response) {
        if (response.status === 200) {
          toastNotification("success", "Request Updated!");
          setTimeout(() => {
            document.getElementById("edit-form").close();
            document.getElementById("button-update").disabled = false;
          }, 2000);
          props.fetchRecords();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setPayDisputeInfo(props.payDisputeInfo);
  }, [props.payDisputeInfo]);

  useEffect(() => {}, [payDisputeInfo?.dispute_status]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPayDisputeInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <dialog id={`edit-form`} className="modal ">
        <ToastContainer />
        <div className="flex flex-col p-5 w-[600px] bg-white rounded-[15px] gap-5">
          <div className="flex flex-row">
            {/* Header */}
            <Headings text="View Dispute" />
            {/* Close Button */}
            <button
              className="ml-auto"
              onClick={() => document.getElementById(`edit-form`).close()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col justify-between">
            <div className="w-full flex flex-row items-center">
              {/* Requester */}
              <div className="w-3/5">
                <label>Employee Name: {payDisputeInfo?.name}</label>
              </div>

              {/* Status */}
              <div className="w-2/5">
                <label>Status:</label>&nbsp;
                <select
                  ref={selectRef}
                  name="dispute_status"
                  className="p-1 w-28  rounded border-2 border-black"
                  onChange={(e) => handleChange(e)}
                  value={payDisputeInfo?.dispute_status}
                >
                  <option value="0">Pending</option>
                  <option value="1">Accepted</option>
                  <option value="2">Declined</option>
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="flex flex-row justify-between">
              <div className="w-3/5">
                {/* Date Raised */}
                <label>
                  Date Raised: &nbsp;
                  {moment(payDisputeInfo?.raised_at).format("MMM DD, YYYY")}
                </label>
              </div>
              <div className="w-2/5">
                <label>
                  Date Closed: &nbsp;
                  {payDisputeInfo?.closed_at
                    ? moment(payDisputeInfo?.closed_at).format("MMM DD, YYYY")
                    : "--/--/--"}
                </label>
              </div>
            </div>
          </div>
          {/* Type of Complaint */}
          <label>
            Issue Raised:
            <select
              disabled
              className="w-full mt-2 p-2 rounded-[15px] bg-[#F7F7F7] text-black"
              value={payDisputeInfo?.dispute_title}
            >
              <option defaultValue className="text-[#8B8B8B]" value="">
                Select a Complaint
              </option>
              <option value="Payroll Computation">Payroll Computation</option>
              <option value="Earnings Computation">Earnings Computation</option>
              <option value="Deductions Computatio">
                Deductions Computation
              </option>
              <option value="Salary Dispute">Salary Dispute</option>
            </select>
          </label>
          {/* Reason */}
          <div>
            <label>
              Reasons:
              <textarea
                disabled
                className="mt-2 p-2 w-full h-80 rounded-[15px] bg-[#F7F7F7]"
                value={payDisputeInfo?.dispute_body}
              />
            </label>
          </div>
          <div className="flex gap-2 justify-end">
            {/* Update */}
            <button
              id="button-update"
              className={` w-40  ${props.bgColor} text-white rounded-md disabled:bg-gray-400 `}
              onClick={() => updateDispute()}
            >
              Update
            </button>

            {/* Cancel */}
            <button
              className={` w-40 bg-[#E4E4E4] text-[#36454F] rounded-md`}
              onClick={() => document.getElementById("edit-form").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ViewPayDispute;
