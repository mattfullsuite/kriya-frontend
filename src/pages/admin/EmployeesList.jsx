import React from "react";
import { Link } from "react-router-dom";
import EmployeeListComponent from "../../components/universal/EmployeeListComponent";
import HRSideBar from "../../components/hr/HRSideBar";

const EmployeesList = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="w-full flex flex-row flex-nowrap items-center justify-between md:w-1/3 m-5">
          <h1 className="text-3xl font-bold">Employees</h1>

          <Link to="/hr/employees/add-employee">
            <button className="btn btn-active btn-sm normal-case">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add
            </button>
          </Link>
        </div>

        <div className="p-5">
          <EmployeeListComponent />
        </div>
      </div>
    </div>
  );
};

export default EmployeesList;
