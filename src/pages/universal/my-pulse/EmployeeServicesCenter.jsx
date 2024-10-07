import { Link, NavLink, Outlet, Route, Routes } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import SuggestionBox from "./components/suggestion-box/SuggestionBox";
import SendEmployeeTicket from "./components/suggestion-box/SendEmployeeTicket";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import SocketService from "../../../assets/SocketService";
import axios from "axios";

export const EmployeeServicesCenterContext = createContext();

const EmployeeServicesCenter = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  focusBorder,
  hoverList,
  activeList,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [countSuggestionBox, setCountSuggestionBox] = useState(0);
  const socket = SocketService.getSocket();
  const [messageTab, setMessageTab] = useState("employeeTickets");
  const navigate = useNavigate();
  const [cookie] = useCookies(["user"]);
  const role =
    cookie.user.emp_role === 1
      ? `hr`
      : cookie.user.emp_role === 2
      ? `regular`
      : cookie.user.emp_role === 3
      ? `manager`
      : null;

  useEffect(() => {
    axios.get(BASE_URL + "/sb-get-suggestion-box-count").then(({ data }) => {
      setCountSuggestionBox(data[0].sb_count);
    });
  }, []);

  useEffect(() => {
    socket.on("addSuggestionBoxCount", (data) => {
      setCountSuggestionBox((prev) => prev + data.count);
    });

    socket.on("minusSuggestionBoxCount", (data) => {
      setCountSuggestionBox((prev) => prev - data);
    });
  }, [socket]);

  return (
    <>
      <EmployeeServicesCenterContext.Provider
        value={{
          bgColor: bgColor,
          hoverColor: hoverColor,
          disabledColor: disabledColor,
          fillColor: fillColor,
          textColor: textColor,
          focusBorder: focusBorder,
          hoverList: hoverList,
          activeList: activeList,
        }}
      >
        <div className="flex flex-row justify-between">
          <div className="w-[350px] min-h-screen max-h-screen bg-white border-l border-r border-[#e4e4e4] flex flex-col justify-between">
            <div>
              <div className="relative w-full p-5">
                <p className="text-[#363636] text-[18px] font-bold leading-none">
                  Employee Services Center
                </p>

                {messageTab === "suggestionBox" && (
                  <Link
                    to={`/${role}/my-pulse/employee-services-center/suggestion-box/new-request-or-complaint`}
                    className={`transition-all ${bgColor} ${hoverColor} p-2 rounded-[8px] flex justify-center items-center absolute top-[22%] right-5`}
                  >
                    <svg
                      viewBox="0 0 16 15"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white h-4 w-4 leading-none"
                    >
                      <path
                        d="M13.7146 0.286134H2.28599C1.49814 0.286134 0.857422 0.924705 0.857422 1.70899V10.2918C0.857422 11.0761 1.49814 11.7147 2.28599 11.7147H4.42885V14.5718L8.96528 11.7147H13.7146C14.5024 11.7147 15.1431 11.0761 15.1431 10.2918V1.70899C15.142 1.33098 14.9909 0.968869 14.7231 0.702113C14.4553 0.435357 14.0926 0.285753 13.7146 0.286134ZM11.5717 6.7147H8.71456V9.57185H7.28599V6.7147H4.42885V5.28613H7.28599V2.42899H8.71456V5.28613H11.5717V6.7147Z"
                        fill="white"
                      />
                    </svg>
                  </Link>
                )}
              </div>

              <div className="flex flex-row justify-between mt-5 p-5 pb-0">
                <button
                  className={`flex-1 outline-none relative`}
                  onClick={() => {
                    setMessageTab("employeeTickets");
                    navigate(
                      `/${role}/my-pulse/employee-services-center/employee-ticket`
                    );
                  }}
                >
                  <p
                    className={`${
                      messageTab === "employeeTickets"
                        ? textColor
                        : `text-[#cbcbcb]`
                    } text-center text-[14px] select-none`}
                  >
                    Employee Tickets
                  </p>

                  {messageTab === "employeeTickets" && (
                    <div
                      className={`${bgColor} w-full h-[2px] mt-2 absolute`}
                    />
                  )}
                </button>

                <button
                  className="flex-1 outline-none relative"
                  onClick={() => {
                    setMessageTab("suggestionBox");
                    navigate(
                      `/${role}/my-pulse/employee-services-center/suggestion-box`
                    );
                  }}
                >
                  <div
                    className={`${
                      messageTab === "suggestionBox"
                        ? textColor
                        : `text-[#cbcbcb]`
                    } text-center text-[14px] select-none`}
                  >
                    <span>Suggestion Box</span>

                    {countSuggestionBox != 0 && (
                      <div className="absolute -right-2 top-0 w-2 h-2 rounded-full text-white font-medium text-[12px] bg-red-500 mr-5" />
                    )}
                  </div>

                  {messageTab === "suggestionBox" && (
                    <div
                      className={`${bgColor} w-full h-[2px] mt-2 absolute`}
                    />
                  )}
                </button>
              </div>
            </div>

            {messageTab === "employeeTickets" ? (
              <SendEmployeeTicket />
            ) : (
              <SuggestionBox />
            )}
          </div>

          <div className="min-h-screen max-h-screen flex-1 overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </EmployeeServicesCenterContext.Provider>
    </>
  );
};

export default EmployeeServicesCenter;
