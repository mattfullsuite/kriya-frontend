import { Outlet } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import EmployeeInitiated from "./components/suggestion-box/EmployeeInitiated";
import Disputes from "./components/suggestion-box/Disputes";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { HrEmployeeContext } from "../../../Layout/HREmployee";
import SocketService from "../../../../src/assets/SocketService";
import axios from "axios";

export const TicketsContext = createContext();

const SuggestionBox = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  lightColor,
  focusBorder,
  hoverList,
  activeList,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [messageTab, setMessageTab] = useState("employeeInitiated");
  const [access] = useCookies(["access"]);
  const socket = SocketService.getSocket();
  const [countTicket, setCountTicket] = useState(0);


  useEffect(() => {

  }, []);

  useEffect(() => {
    socket.on("addTicketCount", (data) => {
      setCountTicket((prevCount) => prevCount + data.count);
    });

    socket.on("minusTicketCount", (data) => {
      setCountTicket((prevCount) => prevCount - data);
    });
  }, [socket]);

  useEffect(() => {
    axios
    .get(BASE_URL + "/sb-get-ticket-count")
    .then(({ data }) => {
      setCountTicket(data[0].ticket_count);
    })
    .catch((err) => console.log(err));
  } , [])

  return (
    <TicketsContext.Provider
      value={{
        bgColor: bgColor,
        hoverColor: hoverColor,
        disabledColor: disabledColor,
        fillColor: fillColor,
        textColor: textColor,
        focusBorder: focusBorder,
        lightColor: lightColor,
        hoverList: hoverList,
        activeList: activeList,
      }}
    >
      <div className="flex flex-row justify-between">
        <div className="w-[350px] min-h-screen max-h-screen bg-white border-l border-r border-[#e4e4e4] flex flex-col justify-between">
          <div>
            <div className="flex flex-row justify-between items-center px-5 pt-5">
              <p className="text-[#363636] text-[20px] font-bold leading-none">
                Tickets
              </p>
            </div>

            <div className="flex flex-row justify-between mt-5 p-5 pb-0">
              <button
                className={`flex-1 outline-none relative`}
                onClick={() => {
                  setMessageTab("employeeInitiated");
                }}
              >
                <div
                  className={`${
                    messageTab === "employeeInitiated"
                      ? textColor
                      : `text-[#cbcbcb]`
                  } text-center text-[12px] select-none`}
                >
                  <span>Employee Initiated</span>

                  {countTicket != 0 && (
                    <div className="absolute -right-7 top-0 w-2 h-2 rounded-full text-white font-medium text-[12px] bg-red-500 mr-5" />
                  )}
                </div>

                {messageTab === "employeeInitiated" && (
                  <div className={`${bgColor} w-full h-[2px] mt-2 absolute`} />
                )}
              </button>

              {(access.access[0].access_attendance === 1 ||
                access.access[0].access_payroll === 1) && (
                <button
                  className={`flex-1 outline-none relative`}
                  onClick={() => {
                    setMessageTab("disputes");
                  }}
                >
                  <p
                    className={`${
                      messageTab === "disputes" ? textColor : `text-[#cbcbcb]`
                    } text-center text-[12px] select-none`}
                  >
                    Disputes
                  </p>

                  {messageTab === "disputes" && (
                    <div
                      className={`${bgColor} w-full h-[2px] mt-2 absolute`}
                    />
                  )}
                </button>
              )}

              <button
                className="flex-1 outline-none relative"
                onClick={() => {
                  setMessageTab("automated");
                }}
              >
                <p
                  className={`${
                    messageTab === "automated" ? textColor : `text-[#cbcbcb]`
                  } text-center text-[12px] select-none`}
                >
                  Automated
                </p>

                {messageTab === "automated" && (
                  <div className={`${bgColor} w-full h-[2px] mt-2 absolute`} />
                )}
              </button>
            </div>
          </div>

          {messageTab === "employeeInitiated" ? (
            <EmployeeInitiated />
          ) : messageTab === "disputes" ? (
            <Disputes />
          ) : messageTab === "automated" ? null : null}
        </div>

        <div className="min-h-screen max-h-screen flex-1 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </TicketsContext.Provider>
  );
};

export default SuggestionBox;
