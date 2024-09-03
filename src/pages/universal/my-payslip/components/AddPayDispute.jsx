import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Headings from "../../../../components/universal/Headings";

function AddPayDispute({ textColor, bgColor }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const initialDispute = {
    dispute_type: "Pay Dispute",
    dispute_title: "",
    dispute_body: "",
  };

  const [dispute, setDispute] = useState(initialDispute);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDispute((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const toastNotification = (type, message) => {
    const properties = {
      position: "top-right",
      autoClose: 5000,
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

  const submitDispute = async () => {
    console.log(dispute);
    if (dispute.dispute_title == "") {
      toastNotification("warning", "Select Type of Complaint!");
      return;
    }

    await axios
      .post(BASE_URL + "/d-createDispute", dispute)
      .then(function (response) {
        if (response.status === 200) {
          document.getElementById("add-form").close();
          toastNotification("success", "Complaint Submitted!");
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // try {
    //   const response = await axios.post(BASE_URL + "/d-createDispute", dispute);
    //   console.log(response);
    //   document.getElementById("add-form").close();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Add Button */}
      <div>
        <button
          className={`p-2 ${bgColor} text-white rounded-md`}
          onClick={() => document.getElementById("add-form").showModal()}
        >
          + Submit New Ticket
        </button>
      </div>
      <dialog id="add-form" className="modal ">
        <div className="flex flex-col p-5 w-[400px] bg-white rounded-[15px] gap-5">
          <div className="flex flex-row">
            {/* Header */}
            <Headings text="Pay Dispute" />
            {/* Close Button */}
            <button
              className="m-r ml-auto"
              onClick={() => document.getElementById("add-form").close()}
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
          {/* Type of Complaint */}
          <label>
            Type of Complaint
            <select
              className="w-full p-2 rounded-[15px] bg-[#F7F7F7]"
              name="dispute_title"
              onChange={(e) => handleChange(e)}
            >
              <option defaultValue className="text-[#8B8B8B]" value="">
                Select a Complaint
              </option>
              <option value="Payroll Computation">Payroll Computation</option>
              <option value="Earnings Computation">
                Earnings Computation{" "}
              </option>
              <option value="Deductions Computation">
                Deductions Computation
              </option>
              <option value="Salary Dispute">Salary Dispute</option>
            </select>
          </label>
          {/* Reason */}
          <div>
            <label>
              Reasons
              <textarea
                placeholder="Explain your complaint"
                className="p-2 w-full h-80 rounded-[15px] bg-[#F7F7F7]"
                name="dispute_body"
                onChange={(e) => handleChange(e)}
              />
            </label>
          </div>
          {/* Send */}
          <button
            className={`p-2 w-20 flex justify-between items-center ${bgColor} text-white rounded-md m-r ml-auto`}
            onClick={() => submitDispute()}
          >
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6069 5.39619L0.976122 0.0634378C0.859005 0.00974382 0.728657 -0.0104789 0.600215 0.00511802C0.471773 0.0207149 0.350508 0.0714916 0.250499 0.151552C0.150491 0.231611 0.0758444 0.33767 0.0352263 0.457411C-0.00539171 0.577152 -0.0103142 0.705664 0.0210307 0.828022L0.850236 4.06034L6.15797 5.99946L0.850236 7.93858L0.0210307 11.1709C-0.0109039 11.2933 -0.0063923 11.4221 0.0340379 11.5422C0.074468 11.6622 0.149145 11.7685 0.249334 11.8488C0.349522 11.929 0.471079 11.9797 0.599786 11.9951C0.728493 12.0104 0.859028 11.9898 0.976122 11.9355L12.6069 6.60273C12.7244 6.5489 12.8238 6.46358 12.8934 6.35675C12.963 6.24993 13 6.126 13 5.99946C13 5.87292 12.963 5.74899 12.8934 5.64217C12.8238 5.53534 12.7244 5.45002 12.6069 5.39619Z"
                fill="white"
              />
            </svg>
            Send
          </button>
        </div>
      </dialog>
    </>
  );
}

export default AddPayDispute;
