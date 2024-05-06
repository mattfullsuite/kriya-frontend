import Headings from "../../components/universal/Headings";
import { useRef } from "react";
import NewEmployeeContainer from "./components/NewEmployeeContainer";
import EmployeeSeparated from "./components/EmployeeSeparated";
import DataTable from "react-data-table-component";
import AllEmployees from "./components/AllEmployees";

const EmployeeManagement = () => {
  const newEmpRefChevron = useRef(null);
  const newEmpRefContainer = useRef(null);

  const empSeparatedChevron = useRef(null);
  const empSeparatedContainer = useRef(null);

  const allEmployeesChevron = useRef(null);
  const allEmployeesContainer = useRef(null);

  const handleExpand = () => {
    if (
      newEmpRefContainer.current.classList.contains("max-h-0") ||
      empSeparatedContainer.current.classList.contains("max-h-0") ||
      allEmployeesContainer.current.classList.contains("max-h-0")
    ) {
      newEmpRefContainer.current.classList.remove("max-h-0");
      empSeparatedContainer.current.classList.remove("max-h-0");
      allEmployeesContainer.current.classList.remove("max-h-0");

      newEmpRefContainer.current.classList.add("max-h-[1000px]");
      empSeparatedContainer.current.classList.add("max-h-[1000px]");
      allEmployeesContainer.current.classList.add("max-h-[1000px]");

      newEmpRefChevron.current.classList.add("-rotate-180");
      empSeparatedChevron.current.classList.add("-rotate-180");
      allEmployeesChevron.current.classList.add("-rotate-180");
    }
  };

  const handleCollapse = () => {
    if (
      newEmpRefContainer.current.classList.contains("max-h-[1000px]") ||
      empSeparatedContainer.current.classList.contains("max-h-[1000px]") ||
      allEmployeesContainer.current.classList.contains("max-h-[1000px]")
    ) {
      newEmpRefContainer.current.classList.remove("max-h-[1000px]");
      empSeparatedContainer.current.classList.remove("max-h-[1000px]");
      allEmployeesContainer.current.classList.remove("max-h-[1000px]");

      newEmpRefContainer.current.classList.add("max-h-0");
      empSeparatedContainer.current.classList.add("max-h-0");
      allEmployeesContainer.current.classList.add("max-h-0");

      newEmpRefChevron.current.classList.remove("-rotate-180");
      empSeparatedChevron.current.classList.remove("-rotate-180");
      allEmployeesChevron.current.classList.remove("-rotate-180");
    }
  };

  return (
    <div className="box-border max-w-[1100px] m-auto">
      <Headings text={"Employee Management"} />

      <div className="box-border flex flex-row flex-nowrap justify-end items-center gap-2 mt-5 mx-[15px]">
        <button className="px-4 py-2 bg-[#DBDDC5] rounded-[8px] focus:outline-none text-[#36454F] text-[14px] border-[1.2px] border-[#DBDDC5]" onClick={handleExpand}>
          Expand All
        </button>

        <button className="px-4 py-2 bg-transparent rounded-[8px] focus:outline-none text-[#36454F] text-[14px] border-[1.2px] border-[#36454F]" onClick={handleCollapse}>
          Collapse All
        </button>
      </div>

      <NewEmployeeContainer
        newEmpRefChevron={newEmpRefChevron}
        newEmpRefContainer={newEmpRefContainer}
      />

      <EmployeeSeparated
        empSeparatedChevron={empSeparatedChevron}
        empSeparatedContainer={empSeparatedContainer}
      />

      <AllEmployees
        allEmployeesChevron={allEmployeesChevron}
        allEmployeesContainer={allEmployeesContainer}
      />
    </div>
  );
};

export default EmployeeManagement;
