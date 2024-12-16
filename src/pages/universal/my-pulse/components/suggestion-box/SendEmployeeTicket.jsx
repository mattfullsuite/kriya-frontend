import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { notifyFailed, notifySuccess } from "../../../../../assets/toast";
import SocketService from "../../../../../assets/SocketService";
import { useCookies } from "react-cookie";
import { EmployeeServicesCenterContext } from "../../EmployeeServicesCenter";

const SendEmployeeTicket = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const socket = SocketService.getSocket();
  const [cookies] = useCookies(["user"]);

  const [notif, setNotif] = useState("");
  const [employeeTicket, setEmployeeTicket] = useState({
    dispute_type: "",
    dispute_date: "",
    dispute_title: "",
    dispute_body: "",
  });

  const type1Ref = useRef(null);
  const type2Ref = useRef(null);
  const dateDisputeRef = useRef(null);
  const subjectRef = useRef(null);
  const reasonRef = useRef(null);
  const submitBtnRef = useRef(null);

  const sbTheme = useContext(EmployeeServicesCenterContext);

  useEffect(() => {
    socket.emit("joinRoom", `employeeTicket-${cookies.user.emp_id}`);

    return () => {
      socket.emit("leaveRoom", `employeeTicket-${cookies.user.emp_id}`);
    };
  }, []);

  const handleSubmit = () => {
    submitBtnRef.current.disabled = true;

    axios
      .post(BASE_URL + "/d-createDispute", employeeTicket)
      .then(() => {
        type1Ref.current.checked = false;
        type2Ref.current.checked = false;
        dateDisputeRef.current.value = "";
        subjectRef.current.value = "";
        reasonRef.current.value = "";
        submitBtnRef.current.disabled = true;
        notifySuccess("Sent successfully!");
        setNotif("success");
      })
      .catch((err) => {
        notifyFailed(err.message);
        submitBtnRef.current.disabled = false;
        setNotif("error");
      });
  };

  return (
    <>
      {notif != "" && notif === "error" && <ToastContainer />}
      {notif != "" && notif === "success" && <ToastContainer />}

      <div className="flex-1 flex flex-col justify-start p-5 mt-10 overflow-y-auto">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-[14px] text-[#363636] font-medium ml-[8px]">
              Dispute type
            </p>

            <div className="mt-2 flex justify-start items-center gap-3 px-2">
              <div className="flex flex-row justify-start items-center gap-1">
                <input
                  type="radio"
                  name="type"
                  value={"Attendance Dispute"}
                  onChange={(e) =>
                    setEmployeeTicket({
                      ...employeeTicket,
                      dispute_type: e.target.value,
                    })
                  }
                  ref={type1Ref}
                />

                <label className="text-[#363636] text-[12px]">Attendance</label>
              </div>

              <div className="flex flex-row justify-start items-center gap-1">
                <input
                  type="radio"
                  name="type"
                  value={"Pay Dispute"}
                  onChange={(e) =>
                    setEmployeeTicket({
                      ...employeeTicket,
                      dispute_type: e.target.value,
                    })
                  }
                  ref={type2Ref}
                />

                <label className="text-[#363636] text-[12px]">Payroll</label>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[14px] text-[#363636] font-medium ml-[8px]">
              Date to dispute
            </p>

            <input
              type="date"
              placeholder="Type your request here..."
              className={`w-full outline-none transition border border-[#e4e4e4] ${sbTheme.focusBorder} rounded-[8px] text-[12px] px-3 py-2 mt-2`}
              onChange={(e) =>
                setEmployeeTicket({
                  ...employeeTicket,
                  dispute_date: e.target.value,
                })
              }
              ref={dateDisputeRef}
            />
          </div>

          <div>
            <p className="text-[14px] text-[#363636] font-medium ml-[8px]">
              Subject
            </p>

            <input
              type="text"
              placeholder="Type your request here..."
              className={`w-full outline-none transition border border-[#e4e4e4] ${sbTheme.focusBorder} rounded-[8px] text-[12px] px-3 py-2 mt-2`}
              onChange={(e) =>
                setEmployeeTicket({
                  ...employeeTicket,
                  dispute_title: e.target.value,
                })
              }
              ref={subjectRef}
            />

            {employeeTicket.dispute_title.length > 100 && (
              <div className="flex justify-start items-center gap-1 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-red-500"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
                </svg>
                <span className="text-[12px] text-red-500">
                  Should not be more than 100 characters
                </span>
              </div>
            )}
          </div>

          <div>
            <p className="text-[14px] text-[#363636] font-medium ml-[8px]">
              Reason
            </p>

            <textarea
              placeholder="Elaborate your concern"
              className={`w-full outline-none transition border border-[#e4e4e4] ${sbTheme.focusBorder} rounded-[8px] text-[12px] h-[120px] resize-none p-3 mt-2`}
              onChange={(e) =>
                setEmployeeTicket({
                  ...employeeTicket,
                  dispute_body: e.target.value,
                })
              }
              ref={reasonRef}
            />

            {employeeTicket.dispute_body.length > 255 && (
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
        </div>

        <button
          className={`self-end transition-all outline-none ${sbTheme.bgColor} ${sbTheme.hoverColor} ${sbTheme.disabledColor} px-3 py-2 rounded-[8px] flex justify-center items-center gap-2 mt-3`}
          onClick={handleSubmit}
          ref={submitBtnRef}
          disabled={
            employeeTicket.dispute_type === "" ||
            employeeTicket.dispute_date === "" ||
            employeeTicket.dispute_title === "" ||
            employeeTicket.dispute_title.length === 0 ||
            employeeTicket.dispute_title.length >= 100 ||
            employeeTicket.dispute_body === "" ||
            employeeTicket.dispute_body.length === 0 ||
            employeeTicket.dispute_body.length >= 255
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
    </>
  );
};

export default SendEmployeeTicket;
