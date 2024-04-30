import { useRef } from "react";
import { NavLink } from "react-router-dom";

const PayRunManagement = (props) => {
  const user = props.user;
  const userColor = props.userColor;
  const userRole = props.userRole;
  const managePayrollSubnav = useRef(null);
  const managePayrollChevron = useRef(null);

  return (
    <>
      {(userRole === 4 || userRole === 1) && (
        <div>
          <div class="dropdown dropdown-hover">
            <NavLink to={"/" + user + "/hr-management/pay-run-management"}>
              {(isActive) => {
                return isActive.isActive ? (
                  <div
                    tabindex="0"
                    role="button"
                    className="box-border flex flex-row justify-between items-center ml-[4.1rem] relative group/payrun"
                  >
                    <span className="text-[#A9A9A9] text-[14px] select-none">
                      Payrun Management
                    </span>
                    {/* 
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-[#A9A9A9] mr-3"
                    >
                      <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                    </svg> */}
                  </div>
                ) : (
                  <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                    Payrun Management
                  </span>
                );
              }}
            </NavLink>

            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu p-2 shadow rounded-[16px] w-52 ml-20 bg-[#E2E4CB]"
            >
              <NavLink
                to={"/" + user + "/hr-management/pay-run-create-upload/"}
              >
                <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
                  <a className="group-hover/list:text-white">
                    Create/Upload Payroll
                  </a>
                </li>
              </NavLink>
              <NavLink to={"/" + user + "/hr-management/pay-run-reports/"}>
                <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
                  <a className="group-hover/list:text-white">Payroll Reports</a>
                </li>
              </NavLink>
              <NavLink to={"/" + user + "/hr-management/pay-run-requests/"}>
                <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
                  <a className="group-hover/list:text-white">
                    Payroll Requests
                  </a>
                </li>
              </NavLink>
              <NavLink to={"/" + user + "/hr-management/pay-run-settings/"}>
                <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
                  <a className="group-hover/list:text-white">Payrun Settings</a>
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PayRunManagement;
