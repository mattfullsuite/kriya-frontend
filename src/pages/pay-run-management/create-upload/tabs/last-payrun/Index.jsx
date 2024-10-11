import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

import EmployeeSelection from "./EmployeeSelection";
import CalculationTable from "./CalculationTable";
import Preview from "./Preview";
import AddNotes from "./AddNotes";

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
    Totals: { Earnings: 0.0, Deductions: 0.0 },
    "Net Pay": 0.0,
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
  const [groupTotals, setGroupTotals] = useState({});
  const [netPayBeforeTax, setNetPayBeforeTax] = useState({
    lastPay: 0,
    ytdGroup: 0,
  });
  const [netPayEarning, setNetPayEarning] = useState({
    lastPay: 0,
    ytdGroup: 0,
  });
  const [notes, setNotes] = useState("");

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
    groupTotals,
    netBeforeTaxes,
    netPayEarnings
  ) => {
    setPreviewData(data);
    setPayables(payables);
    setGroupTotals(groupTotals);
    setNetPayBeforeTax(netBeforeTaxes);
    setNetPayEarning(netPayEarnings);
    document.getElementById("payslip-preview").showModal();
  };

  const displayAddNotes = () => {
    document.getElementById("add-notes").showModal();
  };

  const submitNotes = (note) => {
    setNotes(note);
    document.getElementById("add-notes").close();
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
        addNotes={displayAddNotes}
        notes={notes}
      />
      <Preview
        payslipInformation={previewData}
        unprocessedPayables={payables}
        groupTotals={groupTotals}
        netBeforeTaxes={netPayBeforeTax}
        netPayEarnings={netPayEarning}
        notes={notes}
      />
      <AddNotes submitNotes={submitNotes} />
    </div>
  );
};
export default LastPayrun;
