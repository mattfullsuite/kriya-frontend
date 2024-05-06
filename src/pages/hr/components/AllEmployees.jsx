import DataTable from "react-data-table-component";
import ContainerHeadings from "./ContainerHeading";

const AllEmployees = ({ allEmployeesChevron, allEmployeesContainer }) => {
  const setStatus = (status) => {
    if (status === 0) {
      return (
        <div className="bg-[#FF974D] px-2 py-1 rounded-[5px] text-[#363636]">
          Open
        </div>
      );
    } else if (status === 1) {
      return (
        <div className="bg-[#FFDB58] px-2 py-1 rounded-[5px] text-[#363636]">
          Pending
        </div>
      );
    } else if (status === 2) {
      return (
        <div className="bg-[#B2D9D9] px-2 py-1 rounded-[5px] text-[#363636]">
          Completed
        </div>
      );
    }
  };

  const seperatedEmployeeColumn = [
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
      selector: (row) => <p className="text-[#363636]">{row.role}</p>,
      grow: 1,
    },

    {
      name: "Direct Manager",
      selector: (row) => <p className="text-[#363636]">{row.direct_manager}</p>,
      grow: 1,
    },

    {
      name: "Hire Date",
      selector: (row) => <p className="text-[#363636]">{row.hire_date}</p>,
      width: "120px",
    },

    {
      name: "Separation Date",
      selector: (row) => (
        <p className="text-[#363636]">{row.separation_date}</p>
      ),
      width: "120px",
    },

    {
      name: "Action",
      selector: (row) => (
        <button className="bg-[#ECEAE8] px-4 py-2 rounded-[5px] text-[#666A40] font-medium">
          View
        </button>
      ),
      width: "100px",
    },
  ];

  const separatedEmployeeData = [
    {
      emp_num: "OCCI-0276",
      f_name: "Marvin",
      m_name: "Directo",
      s_name: "Bautista",
      role: "Software Engineer",
      direct_manager: "Matt Wilfred Salvador",
      hire_date: "2024/05/04",
      separation_date: "--",
    },
  ];

  const handleAllEmpContainer = () => {
    if (allEmployeesContainer.current.classList.contains("max-h-0")) {
      allEmployeesContainer.current.classList.add("max-h-[1000px]");
      allEmployeesContainer.current.classList.remove("max-h-0");
      allEmployeesChevron.current.classList.add("-rotate-180");
    } else {
      allEmployeesContainer.current.classList.remove("max-h-[1000px]");
      allEmployeesContainer.current.classList.add("max-h-0");
      allEmployeesChevron.current.classList.remove("-rotate-180");
    }
  };
  return (
    <div className="box-border bg-white p-5 rounded-[15px] border border-[#E4E4E4] mt-5">
      <div className="flex flex-nowrap justify-between items-center">
        <ContainerHeadings text={"All Employees"} />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-[#666A40] transition-all cursor-pointer"
          ref={allEmployeesChevron}
          onClick={handleAllEmpContainer}
        >
          <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
        </svg>
      </div>

      <div
        className="transition-all box-border overflow-y-hidden max-h-0"
        ref={allEmployeesContainer}
      >
        <div className="box-border flex flex-row flex-nowrap justify-start gap-2 pt-10 pb-5 max-w-[700px]">
          <button className="bg-[#666A40] px-3 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-white w-6 h-6"
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
            <span className="text-white text-[14px]">Add New</span>
          </button>

          <input
            type="text"
            className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] flex-1"
            placeholder="Search Employee..."
          />

          <select className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] w-[100px]">
            <option>Filter</option>
          </select>
        </div>

        <DataTable
          columns={seperatedEmployeeColumn}
          data={separatedEmployeeData}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default AllEmployees;
