import React, { useState, useEffect } from 'react';
import axios from "axios";
import DataTable from "react-data-table-component";
import ContainerHeadings from "./ContainerHeading";
import { Link } from "react-router-dom";
import moment from "moment";

const NewEmployeeContainer = ({ newEmpRefChevron, newEmpRefContainer }) => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState(employees);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deactivated, setDeactivated] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [all, setAll] = useState([]);
  const [probationary, setProbationary] = useState([]);
  const [regular, setRegular] = useState([]);
  const [parttime, setPartTime] = useState([]);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get(BASE_URL + "/em-newEmployees");
        const res2 = await axios.get(BASE_URL + "/deactivatedAccounts");
        const res3 = await axios.get(BASE_URL + "/allEmployees");
        const res4 = await axios.get(BASE_URL + "/regularEmployees");
        const res5 = await axios.get(BASE_URL + "/probationaryEmployees");
        const res6 = await axios.get(BASE_URL + "/parttimeEmployees");
        setAll(res3.data);
        setProbationary(res5.data);
        setRegular(res4.data);
        setPartTime(res6.data);
        setEmployees(res.data);
        setFilter(res);
        setRecords(res.data);
        setIsLoading(false);
        setDeactivated(res2.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmployees();
  }, []);

  function handleFilter(event) {
    const newData = employees.filter((row) => {
      return row.searchable
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }
  
  const setStatus = (status) => {
    if (status === 0) {
      return (
        <div className="bg-[#FF974D] px-2 py-1 rounded-[5px] text-[#363636]">
          Not yet started
        </div>
      );
    } else if (status === 1) {
      return (
        <div className="bg-[#FFDB58] px-2 py-1 rounded-[5px] text-[#363636]">
          In progress
        </div>
      );
    } else if (status === 2) {
      return (
        <div className="bg-[#7DDA74] px-2 py-1 rounded-[5px] text-[#363636]">
          Completed
        </div>
      );
    }
  };

  const newEmployeeColumn = [
    {
      name: "Employee Number",
      selector: (row) => (
        <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1 my-2">
          <div className="box-border w-10 h-10 rounded-full bg-[#d9d9d9] flex justify-center items-center text-[#666A40] font-bold text-[20px]">
            {row.emp_num.charAt(0)}
          </div>

          <p className="text-[#363636] flex-1">{row.emp_num}</p>
        </div>
      ),
      width: "150px",
    },

    {
      name: "Name",
      selector: (row) => (
        <p className="text-[#363636]">
          {row.s_name + ", " + row.f_name + " " + row.m_name}
        </p>
      ),
      grow: 1,
    },

    {
      name: "Role",
      selector: (row) => <p className="text-[#363636]">{row.position_name}</p>,
      grow: 1,
    },

    {
      name: "Direct Manager",
      selector: (row) => <p className="text-[#363636]">{row.superior_f_name + " " + row.superior_s_name}</p>,
      grow: 1,
    },

    {
      name: "Hire Date",
      selector: (row) => <p className="text-[#363636]">{moment(row.date_hired).format("MMM DD YYYY")}</p>,
      width: "120px",
    },

    {
      name: "Onboarding Status",
      selector: (row) => setStatus(row.onboarding_status),
      width: "150px",
    },

    {
      name: "Action",
      selector: (row) => (
        <Link to={`/hr/employees/view-employee/` + row.emp_id}>
          <a className="btn btn-active btn-xs btn-info">View</a>
        </Link>
      ),
      width: "100px",
    },
  ];

  const newEmployeeData = [
    {
      emp_num: "OCCI-0276",
      f_name: "Marvin",
      m_name: "Directo",
      s_name: "Bautista",
      role: "Software Engineer",
      direct_manager: "Matt Wilfred Salvador",
      hire_date: "2024/05/04",
      onboarding_status: 0,
    },

    {
      emp_num: "OCCI-0276",
      f_name: "Marvin",
      m_name: "Directo",
      s_name: "Bautista",
      role: "Software Engineer",
      direct_manager: "Matt Wilfred Salvador",
      hire_date: "2024/05/04",
      onboarding_status: 2,
    },

    {
      emp_num: "OCCI-0276",
      f_name: "Marvin",
      m_name: "Directo",
      s_name: "Bautista",
      role: "Software Engineer",
      direct_manager: "Matt Wilfred Salvador",
      hire_date: "2024/05/04",
      onboarding_status: 1,
    },

    {
      emp_num: "OCCI-0276",
      f_name: "Marvin",
      m_name: "Directo",
      s_name: "Bautista",
      role: "Software Engineer",
      direct_manager: "Matt Wilfred Salvador",
      hire_date: "2024/05/04",
      onboarding_status: 0,
    },

    {
      emp_num: "OCCI-0276",
      f_name: "Marvin",
      m_name: "Directo",
      s_name: "Bautista",
      role: "Software Engineer",
      direct_manager: "Matt Wilfred Salvador",
      hire_date: "2024/05/04",
      onboarding_status: 0,
    },

    {
      emp_num: "OCCI-0276",
      f_name: "Marvin",
      m_name: "Directo",
      s_name: "Bautista",
      role: "Software Engineer",
      direct_manager: "Matt Wilfred Salvador",
      hire_date: "2024/05/04",
      onboarding_status: 2,
    },
  ];

  const handleNewEmpContainer = () => {
    if (newEmpRefContainer.current.classList.contains("max-h-0")) {
      newEmpRefContainer.current.classList.add("max-h-[1000px]");
      newEmpRefContainer.current.classList.remove("max-h-0");
      newEmpRefChevron.current.classList.add("-rotate-180");
    } else {
      newEmpRefContainer.current.classList.remove("max-h-[1000px]");
      newEmpRefContainer.current.classList.add("max-h-0");
      newEmpRefChevron.current.classList.remove("-rotate-180");
    }
  };

  return (
    <>
      <div className="box-border bg-white p-5 rounded-[15px] border border-[#E4E4E4] mt-5 overflow-auto grid">
        <div className="box-border flex flex-nowrap justify-between items-center">
          <ContainerHeadings text={"New Employees"} />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-7 h-7 fill-[#666A40] transition-all cursor-pointer"
            ref={newEmpRefChevron}
            onClick={handleNewEmpContainer}
          >
            <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
          </svg>
        </div>

        <div
          className="transition-all box-border overflow-y-hidden max-h-0"
          ref={newEmpRefContainer}
        >
          <div className="box-border flex flex-row flex-nowrap justify-start gap-2 pt-10 pb-5 max-w-[700px]">
            <input
              type="text"
              className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] flex-1"
              placeholder="Search Employee..."
              onChange={handleFilter}
            />

            <select className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] w-[100px]">
              <option>Filter</option>
            </select>
          </div>

          <div className="box-border overflow-x-auto">
            <DataTable
              columns={newEmployeeColumn}
              data={records}
              pagination
              highlightOnHover
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewEmployeeContainer;