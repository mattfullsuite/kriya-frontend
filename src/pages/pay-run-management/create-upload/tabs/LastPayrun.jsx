import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const LastPayrun = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [offBoardingEmployees, setOffBoardingEmployees] = useState([]);
  const selectedEmployeeInitial = {
    name: "",
    emp_num: "",
    date_hired: "",
    date_separated: "",
    end_date_13th_month: "",
    base_pay: "0.00",
    recent_payment: "",
    thirteenth_month_pay: "0.00",
  };
  const [selectedEmployee, setSelectedEmployee] = useState(
    selectedEmployeeInitial
  );
  const [selectedEmployeePayslip, setSelectedEmployeePayslip] = useState({});
  const [selectedEmployeeYTD, setSelectedEmployeeYTD] = useState({});
  const [employeesPayslip, setEmployeePayslips] = useState([]);
  const [companyPayItems, setCompanyPayItems] = useState([]);

  const taxTable = [
    { min: 0, max: 250000.0, formula: 0 },
    { min: 250000.0, max: 400000.0, formula: "(x-250000.00)*.15" },
    { min: 400000.0, max: 800000.0, formula: "((x-400,000) * .20) + 22,500" },
    { min: 800000.0, max: 2000000.0, formula: "((x-800,000) * .25) + 102,500" },
    {
      min: 2000000.0,
      max: 8000000.0,
      formula: "((x-2,000,000) * .30) + 402,500",
    },
    { min: 8000000.0, max: "", formula: "((x-5,000,000) * .35) + 2, 202,500" },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name == "end_date_13th_month") {
      thirteenthMonthPayCalculation(value);
    }
    setSelectedEmployee((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const thirteenthMonthPayCalculation = (endDate) => {
    const startOfYear = moment().startOf("year");
    const dateHired = moment(selectedEmployee.date_hired, "YYYY-MM-DD");

    // Use date hired or start of year
    const dateToUse = dateHired.isBefore(startOfYear) ? startOfYear : dateHired;

    // Calculate number of days from the end date and the date used
    const numDays = moment(endDate, "YYYY-MM-DD").diff(dateToUse, "days");

    // Calculate 13th month pay
    const thirteenthMonthPay = (
      numDays *
      (selectedEmployee.base_pay / 365)
    ).toFixed(2);

    // Update the 13th month pay of selected employee
    setSelectedEmployee((previousData) => ({
      ...previousData,
      thirteenth_month_pay: thirteenthMonthPay,
    }));
  };

  const fetchOffBoardingEmployees = async () => {
    try {
      const res = await axios.get(BASE_URL + `/mp-getOffBoardingEmployees`);
      setOffBoardingEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCompanyPayItems = async () => {
    try {
      const res = await axios.get(BASE_URL + `/mp-getPayItem`);
      setCompanyPayItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getEmployeePayslipCurrentYear = async (empID) => {
    try {
      const res = await axios.get(
        BASE_URL + `/mp-getEmployeePayslipCurrentYear/${empID}`
      );
      console.log("Employee's Pay Slips", res.data);
      setEmployeePayslips(res.data);
      getYTDPayItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getYTDPayItems = (data) => {
    const payItems = companyPayItems;
    console.log("Original: ", payItems);
    data.forEach((item) => {
      const payables = JSON.parse(item.payables);
      Object.entries(payables).forEach(([key, value]) => {
        const categories = value;
        Object.entries(categories).forEach(([key, value]) => {
          // console.log(key, ":", value);
          if (payItems.length > 0) {
            payItems.forEach((itemYTD) => {
              if (itemYTD.hasOwnProperty(key)) {
                itemYTD[key] = value;
              }
            });
          }
        });
      });
    });
    console.log("Updated: ", payItems);
  };
  useEffect(() => {
    fetchOffBoardingEmployees();
    getCompanyPayItems();
  }, []);

  const handleEmployeeSelected = (empInfo) => {
    if (empInfo == "") {
      setSelectedEmployee(selectedEmployeeInitial);
      return;
    }
    setSelectedEmployee(JSON.parse(empInfo));
  };

  const handlePopulate = () => {
    if (Object.keys(selectedEmployee).length > 0) {
      const empID = selectedEmployee.emp_num;
      getEmployeePayslipCurrentYear(empID);
    } else {
      console.error("Empty!");
    }
  };

  return (
    <div className="mt-10 flex flex-col md:flex-row box-border gap-3 p-5">
      <div className="p-2 w-1/3 card rounded-[15px]">
        <table className="">
          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Employee Name:</p>
            </td>
            <td>
              <select
                className="select select-bordered select-sm w-full mt-4"
                onChange={(e) => handleEmployeeSelected(e.target.value)}
              >
                <option value={""}>Select an Employee</option>
                {offBoardingEmployees.map((emp) => (
                  <option value={JSON.stringify(emp)}>{emp.name}</option>
                ))}
              </select>
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Employee ID:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                value={selectedEmployee.emp_num}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-sm w-full mt-4"
                disabled
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Hire Date:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                value={moment(selectedEmployee.date_hired).format("YYYY-MM-DD")}
                type="date"
                className="input input-bordered input-sm w-full mt-4"
                disabled
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">End Date:</p>
            </td>
            <td>
              <input
                value={moment(selectedEmployee.date_separated).format(
                  "YYYY-MM-DD"
                )}
                type="date"
                className="input input-bordered input-sm w-full mt-4"
                name="date_separated"
                onChange={(e) => handleOnChange(e)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">End Date</p>
              <p className="text-right pr-4 text-xs">
                (13th month pay calculation)
              </p>
            </td>
            <td>
              <input
                value={moment(selectedEmployee.end_date_13th_month).format(
                  "YYYY-MM-DD"
                )}
                type="date"
                className="input input-bordered input-sm w-full mt-4"
                name="end_date_13th_month"
                onChange={(e) => handleOnChange(e)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Base Pay:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                value={Number(selectedEmployee.base_pay).toFixed(2)}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-sm w-full  mt-4"
                disabled
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Last Payrun:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                value={selectedEmployee.recent_payment}
                type="date"
                className="input input-bordered input-sm w-full mt-4"
                disabled
              />
            </td>
          </tr>
          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Pro-rated 13th</p>
              <p className="text-right pr-4">Month Pay:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                type="text"
                placeholder="Type here"
                value={selectedEmployee.thirteenth_month_pay}
                className="input input-bordered input-sm w-full mt-4"
                disabled
              />
            </td>
          </tr>
        </table>
        <div className="card-actions justify-end mt-4">
          <button
            className="btn bg-[#666A40] text-white"
            onClick={handlePopulate}
          >
            Populate
          </button>
        </div>
      </div>
      <div className="p-2 w-2/3 overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-[#666A40] text-white">
              <th>Last Payrun Calculation</th>
              <th>Last Pay</th>
              <th>Total Earnings</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Standard Pay:</td>
              <td>123456.78</td>
              <td>1234567.89</td>
            </tr>
            <tr>
              <td>Basic Pay</td>
              <td>123456.78</td>
              <td>123456.78</td>
            </tr>
            <tr>
              <td>Standard Pay Item 1</td>
              <td>123456.78</td>
              <td>123456.78</td>
            </tr>
            <tr>
              <td>Standard Pay Item 2</td>
              <td>123456.78</td>
              <td>123456.78</td>
            </tr>
            <tr>
              <td>Standard Pay Item 3</td>
              <td>123456.78</td>
              <td>123456.78</td>
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Taxable Items:</td>
              <td></td>
              <td></td>
            </tr>
            <tr
              button
              className="btn btn-outline"
              style={{
                backgroundColor: "transparent",
                color: "#B2AC88",
                border: "none",
              }}
            >
              + Add Item
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Non Taxable Items:</td>
              <td></td>
              <td></td>
            </tr>
            <tr
              button
              className="btn btn-outline"
              style={{
                backgroundColor: "transparent",
                color: "#B2AC88",
                border: "none",
              }}
            >
              + Add Item
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Pre-tax Deduction:</td>
              <td></td>
              <td></td>
            </tr>
            <tr
              button
              className="btn btn-outline"
              style={{
                backgroundColor: "transparent",
                color: "#B2AC88",
                border: "none",
              }}
            >
              + Add Item
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Post-tax Deduction:</td>
              <td></td>
              <td></td>
            </tr>
            <tr
              button
              className="btn btn-outline"
              style={{
                backgroundColor: "transparent",
                color: "#B2AC88",
                border: "none",
              }}
            >
              + Add Item
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Post-tax Income:</td>
              <td></td>
              <td></td>
            </tr>
            <tr
              button
              className="btn btn-outline"
              style={{
                backgroundColor: "transparent",
                color: "#B2AC88",
                border: "none",
              }}
            >
              + Add Item
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Income Tax Withheld:</td>
              <td></td>
              <td></td>
            </tr>
            <tr className="bg-[#666A40] text-white font-bold">
              <td className="font-bold">NET PAY EARNINGS</td>
              <td>123456.78</td>
              <td>1234567.89</td>
            </tr>
            <tr>
              <td button className="btn">
                Clear
              </td>
              <td button className="btn">
                Finalize
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LastPayrun;
