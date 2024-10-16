import React from "react";
import Headings from "../../components/universal/Headings";
import HRManageHoliday from "../../components/hr/HRManageHoliday";
import HRManageDivision from "../../components/hr/HRManageDivision";
import HRManageLeads from "../../components/hr/HRManageLeads";
import HRManageSuperior from "../../components/hr/HRManageSuperior";
import HRControlAccess from "../../components/hr/HRControlAccess";
import HRShiftChange from "../../components/hr/HRShiftChange";
import HRTickets from "../../components/hr/HRTickets.jsx";
import { NavLink, Outlet } from "react-router-dom";

const ListTile = ({ label, link }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive ? `bg-[#90946F] text-white` : `text-[#363636]`
        } text-[14px] p-3 rounded-[8px]`
      }
      to={link}
    >
      {label}
    </NavLink>
  );
};

// const HRManage = () => {
//   return (
//     <div className="max-w-[1300px] m-auto p-5">
//       <div className="flex flex-col">
//         <Headings text={"Preferences"} />

//         <div className="collapse collapse-arrow bg-white border border-[#e4e4e4] rounded-[15px] mt-10 mb-3">
//           <input type="radio" name="my-accordion-2" />
//           <div className="collapse-title text-l font-bold">
//             - Assign New Lead
//           </div>
//           <div className="collapse-content">
//             <HRManageLeads />
//           </div>
//         </div>

//         <div className="collapse collapse-arrow bg-white border border-[#e4e4e4] rounded-[15px] mb-3">
//           <input type="radio" name="my-accordion-2" />
//           <div className="collapse-title text-l font-bold">
//             - Create New Designation
//           </div>
//           <div className="collapse-content">
//             <HRManageDivision />
//           </div>
//         </div>

//         <div className="collapse collapse-arrow bg-white border border-[#e4e4e4] rounded-[15px] mb-3">
//           <input type="radio" name="my-accordion-2" />
//           <div className="collapse-title text-l font-bold">
//             - Add New Holidays/Events
//           </div>
//           <div className="collapse-content">
//             <HRManageHoliday />
//           </div>
//         </div>

//         <div className="collapse collapse-arrow bg-white border border-[#e4e4e4] rounded-[15px] mb-3">
//           <input type="radio" name="my-accordion-2" />
//           <div className="collapse-title text-l font-bold">
//             - Assign Superior
//           </div>
//           <div className="collapse-content">
//             <HRManageSuperior />
//           </div>
//         </div>

//         <div className="collapse collapse-arrow bg-white border border-[#e4e4e4] rounded-[15px] mb-3">
//           <input type="radio" name="my-accordion-2" />
//           <div className="collapse-title text-l font-bold">
//             - Control HR Access
//           </div>
//           <div className="collapse-content">
//             <HRControlAccess />
//           </div>
//         </div>

//         <div className="collapse collapse-arrow bg-white border border-[#e4e4e4] rounded-[15px] mb-3">
//           <input type="radio" name="my-accordion-2"/>
//           <div className="collapse-title text-l font-bold">
//             - Change Employee's Shift
//           </div>
//           <div className="collapse-content">
//             <HRShiftChange/>
//           </div>
//         </div>

//         <div className="collapse collapse-arrow bg-white border border-[#e4e4e4] rounded-[15px] mb-3">
//           <input type="radio" name="my-accordion-2"/>
//           <div className="collapse-title text-l font-bold">
//             - Tickets (Temporary)
//           </div>
//           <div className="collapse-content">
//             <HRTickets/>
//           </div>
//         </div>

//         {/* <div className="mt-20">
//           <HRManageLeads/>
//         </div>
//         <div className="mt-10">
//           <HRManageDivision/>
//         </div>
//         <div className="mt-20">
//           <HRManageHoliday/>
//         </div> */}
//       </div>
//     </div>
//   );
// };

const HRManage = () => {
  return (
    <>
      <div className="flex">
        <div className="w-[320px] bg-white border-l border-r border-[#e4e4e4] h-screen">
          <div className="p-5">
            <Headings text={"Preferences"} />
          </div>

          <div className="flex flex-col w-full mt-10 px-3">
            <ListTile label={"Designation"} link={"designation"} />

            <ListTile
              label={"Holidays & Events"}
              link={"holidays-and-events"}
            />

            <ListTile label={"Employee Superior List"} link={"superiors"} />

            <ListTile
              label={"Control Access Roles"}
              link={"control-access-roles"}
            />

            <ListTile label={"Employee Shift"} link={"employee-shift"} />

            <ListTile label={"Device Management"} link={"device-management"} />
          </div>
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HRManage;
