import { useRef } from "react";
import { NavLink } from "react-router-dom";

function ManagePayroll(props) {
  const user = props.user;
  const userColor = props.userColor;
  const userRole = props.userRole;
  console.log("User Role:_", userRole);
  const managePayrollSubnav = useRef(null);
  const managePayrollChevron = useRef(null);

  const handleManagePayrollSubnav = () => {
    if (managePayrollSubnav.current.classList.contains("hidden")) {
      managePayrollSubnav.current.classList.remove("hidden");
      managePayrollChevron.current.classList.remove("rotate-180");
    } else {
      managePayrollSubnav.current.classList.add("hidden");
      managePayrollChevron.current.classList.add("rotate-180");
    }
  };
  return (
    <>
      {(userRole === 4 || userRole === 1) && (
        <div>
          {/* Payroll Management */}
          <div className="box-border flex flex-row justify-between items-center">
            <NavLink to={"/" + user + "/manage-payroll"} className="flex-1">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[${userColor}] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className={`w-5 h-5 fill-[${userColor}]`}
                        >
                          <path d="M19 3h-2.25a1 1 0 0 0-1-1h-7.5a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 17H5V5h2v2h10V5h2v15z"></path>
                        </svg>
                        <span
                          className={`text-[${userColor}] text-[14px] select-none`}
                        >
                          Manage Payroll
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#A9A9A9]"
                        >
                          <path d="M19 3h-2.25a1 1 0 0 0-1-1h-7.5a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 17H5V5h2v2h10V5h2v15z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px] select-none">
                          Manage Payroll
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-[#A9A9A9] w-6 h-6 mr-2 transition cursor-pointer"
              ref={managePayrollChevron}
              onClick={handleManagePayrollSubnav}
            >
              <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
            </svg>
          </div>

          {/* Payroll Management SubNav */}
          <div
            className="box-border flex flex-col gap-3"
            ref={managePayrollSubnav}
          >
            <NavLink to={"/" + user + "/manage-payroll/run-regular-payroll"}>
              {(isActive) => {
                return isActive.isActive ? (
                  <span
                    className={`text-[${userColor}] text-[14px] ml-[4.1rem] select-none`}
                  >
                    Run Regular Payroll
                  </span>
                ) : (
                  <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                    Run Regular Payroll
                  </span>
                );
              }}
            </NavLink>

            <NavLink to={"/" + user + "/manage-payroll/run-last-pay"}>
              {(isActive) => {
                return isActive.isActive ? (
                  <span
                    className={`text-[${userColor}] text-[14px] ml-[4.1rem] select-none`}
                  >
                    Run Last Pay
                  </span>
                ) : (
                  <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                    Run Last Pay
                  </span>
                );
              }}
            </NavLink>

            <NavLink to={"/" + user + "/manage-payroll/payroll-settings"}>
              {(isActive) => {
                return isActive.isActive ? (
                  <span
                    className={`text-[${userColor}] text-[14px] ml-[4.1rem] select-none`}
                  >
                    Payroll Settings
                  </span>
                ) : (
                  <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                    Payroll Settings
                  </span>
                );
              }}
            </NavLink>

            <NavLink to={"/" + user + "/manage-payroll/upload-a-pay-register"}>
              {(isActive) => {
                return isActive.isActive ? (
                  <span
                    className={`text-[${userColor}] text-[14px] ml-[4.1rem] select-none`}
                  >
                    Upload a Pay Register
                  </span>
                ) : (
                  <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                    Upload a Pay Register
                  </span>
                );
              }}
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
export default ManagePayroll;
