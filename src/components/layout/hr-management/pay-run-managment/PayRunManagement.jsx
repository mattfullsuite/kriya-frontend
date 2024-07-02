import { useRef } from "react";
import { NavLink } from "react-router-dom";

const PayRunManagement = (props) => {
  const user = props.user;
  const userRole = props.userRole;

  return (
    <>
      {(userRole === 4 || userRole === 1) && (
        // <div>
        //   <div className="dropdown dropdown-hover">
        <>
        <div className="flex flex-row justify-between items-center">
          <NavLink to={"/" + user + "/hr-management/pay-run-management"}>
            {(isActive) => {
              return isActive.isActive ? (
                <div
                  tabIndex="0"
                  role="button"
                  className="box-border flex flex-row justify-between items-center ml-[4.1rem] relative group/payrun"
                >
                  <span className="text-[#90946f] text-[14px] select-none">
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

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-[#A9A9A9] w-5 h-5 mr-2 transition cursor-pointer"
          >
            <path d="M16.939 7.939 12 12.879l-4.939-4.94-2.122 2.122L12 17.121l7.061-7.06z"></path>
          </svg>
        </div>

        <div className="flex flex-col">

        </div>
        </>
        //     <ul
        //       tabIndex="0"
        //       className="dropdown-content z-[1] menu p-2 shadow rounded-[16px] w-52 ml-20 bg-[#E2E4CB]"
        //     >
        //       <NavLink
        //         to={"/" + user + "/hr-management/pay-run-create-upload/"}
        //       >
        //         <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
        //           <span className="group-hover/list:text-white">
        //             Create/Upload Payrun
        //           </span>
        //         </li>
        //       </NavLink>
        //       <NavLink to={"/" + user + "/hr-management/pay-run-reports/"}>
        //         <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
        //           <span className="group-hover/list:text-white">
        //             Payrun Reports
        //           </span>
        //         </li>
        //       </NavLink>
        //       <NavLink to={"/" + user + "/hr-management/pay-run-requests/"}>
        //         <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
        //           <span className="group-hover/list:text-white">
        //             Payroll Requests
        //           </span>
        //         </li>
        //       </NavLink>
        //       <NavLink to={"/" + user + "/hr-management/pay-run-settings/"}>
        //         <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
        //           <span className="group-hover/list:text-white">
        //             Payrun Settings
        //           </span>
        //         </li>
        //       </NavLink>
        //     </ul>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default PayRunManagement;
