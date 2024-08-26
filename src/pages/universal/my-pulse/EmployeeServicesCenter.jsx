import { Link, NavLink, Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import SuggestionBox from "./components/suggestion-box/SuggestionBox";

export const EmployeeServicesCenterContext = createContext();

const EmployeeServicesCenter = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  focusBorder,
}) => {
  const [messageTab, setMessageTab] = useState("employeeTickets");

  return (
    <EmployeeServicesCenterContext.Provider
      value={{
        bgColor: bgColor,
        hoverColor: hoverColor,
        disabledColor: disabledColor,
        fillColor: fillColor,
        textColor: textColor,
        accentColor: accentColor,
        focusBorder: focusBorder,
      }}
    >
      <div className="flex flex-row justify-between">
        <div className="w-[350px] min-h-screen max-h-screen bg-white border-l border-r border-[#e4e4e4] flex flex-col justify-between">
          <div>
            <div className="flex flex-row justify-between items-center px-5 pt-5">
              <p className="text-[#363636] text-[18px] font-bold leading-none">
                Employee Services Center
              </p>

              <Link
                to={`${
                  messageTab === `suggestionBox` &&
                  `/hr/my-pulse/employee-services-center/new-request-or-complaint`
                }`}
                className={`transition-all ${bgColor} ${hoverColor} p-2 rounded-[8px] flex justify-center items-center`}
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
            </div>

            <div className="flex flex-row justify-between mt-5 p-5 pb-0">
              <button
                className={`flex-1 outline-none relative`}
                onClick={() => {
                  setMessageTab("employeeTickets");
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
                  <div className={`${bgColor} w-full h-[2px] mt-2 absolute`} />
                )}
              </button>

              <button
                className="flex-1 outline-none relative"
                onClick={() => {
                  setMessageTab("suggestionBox");
                }}
              >
                <p
                  className={`${
                    messageTab === "suggestionBox"
                      ? textColor
                      : `text-[#cbcbcb]`
                  } text-center text-[14px] select-none`}
                >
                  Suggestion Box
                </p>

                {messageTab === "suggestionBox" && (
                  <div className={`${bgColor} w-full h-[2px] mt-2 absolute`} />
                )}
              </button>
            </div>
          </div>

          {messageTab === "employeeTickets" ? (
            // <RequestMessages />
            null
          ) : (
            <SuggestionBox />
          )}
        </div>

        <div className="min-h-screen max-h-screen flex-1 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </EmployeeServicesCenterContext.Provider>
  );
};

export default EmployeeServicesCenter;
