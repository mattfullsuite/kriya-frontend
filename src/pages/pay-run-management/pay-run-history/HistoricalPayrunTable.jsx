import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const HistoricalPayrunTable = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [filterValue, setFilterValue] = useState("");
  const [selectedOptionValue, setSelectedOptionValue] = useState("");
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const selectedOption = useRef(null);

  useEffect(() => {
    selectedOption.current.style.display = "none";
  }, []);

  const getDepartments = async () => {
    try {
      const result = await axios.get(BASE_URL + "/comp-GetDepartments");
      setDepartments(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getEmployees = async () => {
    try {
      const result = await axios.get(BASE_URL + "/em-allEmployees");
      setEmployees(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filter1OnChange = (option) => {
    setFilterValue(option);
    if (option === "department") {
      getDepartments();
      selectedOption.current.style.display = "block";
    } else if (option === "employee") {
      getEmployees();
      selectedOption.current.style.display = "block";
    } else {
      selectedOption.current.style.display = "none";
    }
    selectedOption.current.disabled = false;
  };

  const fetchInformation = () => {
    // Implement the function to fetch information based on the selected option
  };

  return (
    <>
      <div className="mt-10 p-5 w-full rounded-[15px] bg-white">
        <div className="w-fit items-center flex gap-4">
          <div className="flex flex-row gap-2 items-center">
            Filter By:
            {/* 1st Filter */}
            <select
              className="p-2 w-26 border rounded-lg"
              value={filterValue}
              onChange={(e) => {
                filter1OnChange(e.target.value);
              }}
            >
              <option value="" defaultValue>
                Select Value
              </option>
              <option value="department">Department</option>
              <option value="employee">Employee</option>
            </select>
            {/* 2nd Filter with Conditional Options */}
            <select
              ref={selectedOption}
              className="p-2 w-26 border rounded-lg"
              // onChange={handleFetchData} // Trigger on change
            >
              {filterValue === "department" &&
              departments &&
              departments.length > 0 ? (
                departments.map((row) => (
                  <option key={row.dept_id} value={row.dept_id}>
                    {row.dept_name}
                  </option>
                ))
              ) : filterValue === "employee" &&
                employees &&
                employees.length > 0 ? (
                employees.map((row) => (
                  <option
                    key={row.emp_id}
                    value={`${row.s_name}, ${row.f_name}`}
                  >
                    {`${row.s_name} ${row.f_name}`}
                  </option>
                ))
              ) : (
                <option value="">No Data Available</option>
              )}
            </select>
            <button
              className="w-32 h-8 flex bg-[#666A40] items-center justify-center fill-[#f7f7f7] text-white rounded-md hover:bg-[#f7f7f7] hover:fill-[#666A40] hover:text-[#666A40] hover:border-2 hover:border-[#666A40]"
              onClick={fetchInformation}
            >
              Display
            </button>
            <button
              className="w-32 h-8 flex bg-[#666A40] items-center justify-center fill-[#f7f7f7] text-white rounded-md hover:bg-[#f7f7f7] hover:fill-[#666A40] hover:text-[#666A40] hover:border-2 hover:border-[#666A40]"
              // onClick={() => handleDownloadClick(row)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path>
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoricalPayrunTable;
