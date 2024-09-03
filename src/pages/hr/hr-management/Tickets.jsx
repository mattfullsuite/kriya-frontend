import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import RequestTickets from "./components/suggestion-box/RequestTickets";
import ComplaintTickets from "./components/suggestion-box/ComplaintTickets";
import EmployeeInitiated from "./components/suggestion-box/EmployeeInitiated";
import Disputes from "./components/suggestion-box/Disputes";

export const TicketsContext = createContext();

const SuggestionBox = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  lightColor,
  focusBorder,
}) => {
  const [messageTab, setMessageTab] = useState("disputes");

  return (
    <TicketsContext.Provider
      value={{
        bgColor: bgColor,
        hoverColor: hoverColor,
        disabledColor: disabledColor,
        fillColor: fillColor,
        textColor: textColor,
        accentColor: accentColor,
        focusBorder: focusBorder,
        lightColor: lightColor,
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
                <p
                  className={`${
                    messageTab === "employeeInitiated"
                      ? textColor
                      : `text-[#cbcbcb]`
                  } text-center text-[12px] select-none`}
                >
                  Employee Initiated
                </p>

                {messageTab === "employeeInitiated" && (
                  <div className={`${bgColor} w-full h-[2px] mt-2 absolute`} />
                )}
              </button>

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
                  <div className={`${bgColor} w-full h-[2px] mt-2 absolute`} />
                )}
              </button>

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
          ) : messageTab === "automated" ? (
            <ComplaintTickets />
          ) : null}
        </div>

        <div className="min-h-screen max-h-screen flex-1 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </TicketsContext.Provider>
  );
};

export default SuggestionBox;
