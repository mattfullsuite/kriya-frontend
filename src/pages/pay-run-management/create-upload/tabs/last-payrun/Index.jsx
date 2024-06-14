import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

import EmployeeSelection from "./EmployeeSelection";
import CalculationTable from "./CalculationTable";
import Preview from "./Preview";

const LastPayrun = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [offBoardingEmployees, setOffBoardingEmployees] = useState([]);
  const [selectedEmployeeTotals, setselectedEmployeeTotals] = useState([]);
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState();

  const payslipInfoInitial = {
    "Employee ID": "Employee ID",
    "Last Name": "Last Name",
    "First Name": "First Name",
    "Middle Name": "Middle Name",
    Email: "Email",
    "Job Title": "Job Title",
    "Hire Date": moment().format("YYYY-MM-DD"),
    Dates: {
      From: moment().format("YYYY-MM-DD"),
      To: moment().format("YYYY-MM-DD"),
      Payment: moment().format("YYYY-MM-DD"),
    },
    "Pay Items": {
      Earnings: { payitem1: "1.0", payitem2: "2.0" },
      Deductions: { payitem1: "-1.0", payitem2: "-2.0" },
    },
    Totals: { Earnings: 3.0, Deductions: -3.0 },
    "Net Pay": 1000.0,
    source: "Created",
    company_name: "",
    company_loc: "",
  };
  const [previewData, setPreviewData] = useState(payslipInfoInitial);
  const payablesInitial = [
    {
      pay_item_name: "",
      pay_item_category: "",
      pay_item_type: "",
      pay_item_group: "",
      last_pay_amount: "",
      ytd_amount: "",
      visible: true,
    },
  ];
  const [payables, setPayables] = useState(payablesInitial);
  const [netPayBeforeTax, setNetPayBeforeTax] = useState({
    lastPay: 0,
    ytdGroup: 0,
  });
  const [netPayEarning, setNetPayEarning] = useState({
    lastPay: 0,
    ytdGroup: 0,
  });

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
      console.error(err);
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

  const handlePreviewPayslip = (
    data,
    payables,
    netBeforeTaxes,
    netPayEarnings
  ) => {
    setPreviewData(data);
    setPayables(payables);
    setNetPayBeforeTax(netBeforeTaxes);
    setNetPayEarning(netPayEarnings);
    document.getElementById("payslip-preview").showModal();
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
      <Preview
        payslipInformation={previewData}
        unprocessedPayables={payables}
        netBeforeTaxes={netPayBeforeTax}
        netPayEarnings={netPayEarning}
      />
    </div>
  );
};
export default LastPayrun;
