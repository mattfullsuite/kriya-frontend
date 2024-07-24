import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyFailed } from "../../../../../assets/toast";

const SendComplaint = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  focusBorder,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  // useStates
  const [notif, setNotif] = useState("");
  const [hr, setHr] = useState([]);
  const [complaintMessage, setComplaintMessage] = useState({
    complaint_subject: "",
    complaint_content: "",
    hr_id: null,
    is_anonymous: false,
  });
  // end of useStates

  useEffect(() => {
    axios
      .get(BASE_URL + "/sb-get-hr")
      .then((response) => setHr(response.data))
      .catch((err) => console.log("Error in getting hr: " + err.message));
  }, []);

  const handleSubmitComplaint = () => {
    axios
      .post(BASE_URL + "/sb-insert-complaint", complaintMessage)
      .then(() => {
        navigate("/hr/my-pulse/suggestion-box");
      })
      .catch((err) => {
        notifyFailed(err.message);
        setNotif("error");
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center gap-10 p-5 max-w-[500px] m-auto">
      <div className="flex flex-col justify-center items-center gap-2">
        <svg
          viewBox="0 0 37 37"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <path
            d="M18.5 0C8.2991 0 0 8.2991 0 18.5C0 28.7009 8.2991 37 18.5 37C28.7009 37 37 28.7009 37 18.5C37 8.2991 28.7009 0 18.5 0ZM20.35 27.75H16.65V16.65H20.35V27.75ZM20.35 12.95H16.65V9.25H20.35V12.95Z"
            fill="#8B8B8B"
          />
        </svg>

        <p className="text-center text-[11px] text-[#8b8b8b]">
          All complaints submitted to HR will be treated with the utmost
          confidentiality. However, it is important to note that in certain
          circumstances, confidentiality may be limited by legal or
          organizational requirements. HR will make every effort to protect your
          privacy within the bounds of these obligations.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <p className="text-[14px] text-[#363636] font-medium ml-[8px]">
            Type of Complaint
          </p>

          <input
            type="text"
            placeholder="Type your complaint here..."
            onChange={(e) =>
              setComplaintMessage({
                ...complaintMessage,
                complaint_subject: e.target.value,
              })
            }
            className={`w-full outline-none transition border border-[#e4e4e4] ${focusBorder} rounded-[8px] text-[12px] px-3 py-2 mt-2`}
          />
          {complaintMessage.complaint_subject.length > 50 && (
            <div className="flex justify-start items-center gap-1 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-red-500"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
              </svg>
              <span className="text-[12px] text-red-500">
                Should not be more than 50 characters
              </span>
            </div>
          )}
        </div>

        <div>
          <p className="text-[14px] text-[#363636] font-medium ml-[8px]">
            Reason
          </p>

          <textarea
            placeholder="Explain your complaint"
            onChange={(e) =>
              setComplaintMessage({
                ...complaintMessage,
                complaint_content: e.target.value,
              })
            }
            className={`w-full outline-none transition border border-[#e4e4e4] ${focusBorder} rounded-[8px] text-[12px] h-[120px] resize-none p-3 mt-2`}
          />

          {complaintMessage.complaint_content.length > 255 && (
            <div className="flex justify-start items-center gap-1 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-red-500"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
              </svg>
              <span className="text-[12px] text-red-500">
                Should not be more than 255 characters
              </span>
            </div>
          )}
        </div>

        <div>
          <p className="text-[14px] text-[#363636] font-medium ml-[8px]">
            Send to:
          </p>

          <select
            defaultValue={complaintMessage.hr_id}
            onChange={(e) =>
              setComplaintMessage({
                ...complaintMessage,
                hr_id: e.target.value,
              })
            }
            className={`w-full outline-none transition border border-[#e4e4e4] ${focusBorder} rounded-[8px] text-[12px] px-3 py-2 mt-2`}
          >
            <option value={null}>All HR</option>
            {hr.map((emp) => (
              <option value={emp.emp_id}>
                {emp.f_name + " " + emp.s_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row justify-start items-center gap-1">
          <input
            type="checkbox"
            onClick={(e) => setComplaintMessage({...complaintMessage, is_anonymous: e.target.checked})}
            className="apperance-none"
          />

          <span className="text-[12px] text-[#363636] leading-none">
            Send anonymously
          </span>
        </div>
      </div>

      <button
        className={`self-end transition-all outline-none ${bgColor} ${hoverColor} ${disabledColor} px-3 py-2 rounded-[8px] flex justify-center items-center gap-2`}
        onClick={handleSubmitComplaint}
        disabled={
          complaintMessage.complaint_subject.length <= 0 ||
          complaintMessage.complaint_subject.length > 50 ||
          complaintMessage.complaint_content.length <= 0 ||
          complaintMessage.complaint_content.length > 255
            ? true
            : false
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="fill-white h-5 w-5"
        >
          <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
        </svg>

        <span className="leading-none text-[14px] text-white">Send</span>
      </button>
    </div>
  );
};

export default SendComplaint;
