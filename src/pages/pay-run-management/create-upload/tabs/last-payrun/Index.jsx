import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeSelection from "./EmployeeSelection";
import CalculationTable from "./CalculationTable";

const LastPayrun = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [offBoardingEmployees, setOffBoardingEmployees] = useState([]);
  const [selectedEmployeeTotals, setselectedEmployeeTotals] = useState([]);
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState();

  const fetchOffBoardingEmployees = async () => {
    try {
      const res = await axios.get(BASE_URL + `/mp-getOffBoardingEmployees`);
      setOffBoardingEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getEmployeePayslipCurrentYear = async (empID) => {
    try {
      const res = await axios.get(
        BASE_URL + `/mp-getEmployeePayslipCurrentYear/${empID}`
      );

      setselectedEmployeeTotals(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOffBoardingEmployees();
  }, [selectedEmployeeTotals]);

  const handlePopulateInfo = (data) => {
    setSelectedEmployeeInfo(data);
    const empID = data.emp_num;
    getEmployeePayslipCurrentYear(empID);
  };

  const handlePreviewPayslip = (data) => {
    console.log(data);
  };

  return (
    <div className="mt-10 flex flex-col md:flex-row box-border gap-3 p-5">
      <EmployeeSelection
        employeeList={offBoardingEmployees}
        onPopulate={handlePopulateInfo}
      />
      <CalculationTable
        employeeInformation={selectedEmployeeInfo}
        employeePayables={selectedEmployeeTotals}
        onPreview={handlePreviewPayslip}
      />
    </div>
  );
};
export default LastPayrun;
