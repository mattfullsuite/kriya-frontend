import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

import TaxTable from "../../assets/tax-table.json";

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
  const [selectedEmployeeYTD, setSelectedEmployeeYTD] = useState([]);
  const [netPayBeforeTax, setNetPayBeforeTax] = useState({});
  const [taxWithheld, setTaxWithheld] = useState({});
  const [netPayEarning, setNetPayEarning] = useState({});
  const [companyPayItems, setCompanyPayItems] = useState([]);
  const [groupTotals, setGroupTotals] = useState({});

  const handleYTDInput = (input) => {
    const { name, value } = input;

    setSelectedEmployeeYTD((prevEmployeeYTD) =>
      prevEmployeeYTD.map((item) =>
        item.pay_item_name === name ? { ...item, last_pay_amount: value } : item
      )
    );
  };

  function computeTax(value, taxTable) {
    let tax = 0;
    taxTable.forEach((taxBracket) => {
      if (
        value > taxBracket.min &&
        (value <= taxBracket.max || taxBracket.max === null)
      ) {
        const compute = new Function("x", `return ${taxBracket.formula}`);
        tax = compute(value);
      }
    });
    return tax.toFixed(2);
  }

  const fetchOffBoardingEmployees = async () => {
    try {
      const res = await axios.get(BASE_URL + `/mp-getOffBoardingEmployees`);
      setOffBoardingEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getCompanyPayItems = async () => {
    try {
      const res = await axios.get(BASE_URL + `/mp-getPayItem`);
      setCompanyPayItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getEmployeePayslipCurrentYear = async (empID) => {
    try {
      const res = await axios.get(
        BASE_URL + `/mp-getEmployeePayslipCurrentYear/${empID}`
      );
      console.log("Employee's YTD Pay Items:", res.data);
      setSelectedEmployeeYTD(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOffBoardingEmployees();
    getCompanyPayItems();
    calculateTotalPerGroup();
  }, [selectedEmployeeYTD]);

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
  const computeTaxWithheld = (value) => {
    const taxContribution = computeTax(value, TaxTable["PH"]);
    setTaxWithheld({ tax: taxContribution });
  };

  const calculateTotalPerGroup = () => {
    const totals = [];

    const payItemGroup = [
      "Taxable",
      "Non-Taxable",
      "Pre-Tax Deduction",
      "Post-Tax Deduction",
      "Post-Tax Addition",
    ];

    payItemGroup.forEach((group) => {
      const groupTotal = {};

      const newGroup = selectedEmployeeYTD.filter(
        (payItem) => payItem.pay_item_group == group
      );

      groupTotal.name = group;

      const lastPayGroup = newGroup.reduce(
        (sum, item) => sum + parseFloat(item.last_pay_amount),
        0
      );

      groupTotal.lastPay = lastPayGroup;
      const totalGroup = newGroup.reduce(
        (sum, item) =>
          sum + parseFloat(item.last_pay_amount) + parseFloat(item.ytd_amount),
        0
      );

      groupTotal.totalGroup = totalGroup;
      totals.push(groupTotal);
    });

    setGroupTotals(totals);

    let netPayBeforeTax = { lastPayBeforeTax: 0, totalBeforeTax: 0 };
    let netPay = { lastPayNet: 0, totalNet: 0 };
    totals.forEach((total) => {
      if (
        total.name == "Taxable" ||
        total.name == "Non-Taxable" ||
        total.name == "Pre-Tax Deduction"
      ) {
        netPayBeforeTax.lastPayBeforeTax += total.lastPay;
        netPayBeforeTax.totalBeforeTax += total.totalGroup;
      }
      netPay.lastPayNet += total.lastPay;
      netPay.totalNet += total.totalGroup;
    });
    // console.log(netPayBeforeTax);

    setNetPayBeforeTax({
      netLastPay: netPayBeforeTax.lastPayBeforeTax,
      totalBeforeTax: netPayBeforeTax.totalBeforeTax,
    });

    computeTaxWithheld(netPayBeforeTax.totalBeforeTax);
    setNetPayEarning(netPay);
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
                {offBoardingEmployees.length > 1 &&
                  offBoardingEmployees.map((emp) => (
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
      {selectedEmployeeYTD.length > 0 && (
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
                <td className="font-bold">Taxable</td>
                <td>{groupTotals[0].lastPay.toFixed(2)}</td>
                <td>{groupTotals[0].totalGroup.toFixed(2)}</td>
              </tr>
              {selectedEmployeeYTD.length > 0 &&
                selectedEmployeeYTD
                  .filter((payItem) => payItem.pay_item_group == "Taxable")
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_item_name}</td>
                      <td>
                        <input
                          type="text"
                          value={item.last_pay_amount}
                          name={item.pay_item_name}
                          onChange={(e) => handleYTDInput(e.target)}
                        />
                      </td>
                      <td>
                        {(
                          parseFloat(item.last_pay_amount) +
                          parseFloat(item.ytd_amount)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              <tr
                button
                className="btn btn-outline bg-transparent text-[#B2AC88] hover:bg-transparent hover:text-[#B2AC88] border-none"
              >
                + Add Item
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold">Non-Taxable</td>
                <td>{groupTotals[1].lastPay.toFixed(2)}</td>
                <td>{groupTotals[1].totalGroup.toFixed(2)}</td>
              </tr>
              {selectedEmployeeYTD.length > 0 &&
                selectedEmployeeYTD
                  .filter((payItem) => payItem.pay_item_group == "Non-Taxable")
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_item_name}</td>
                      <td>
                        <input
                          type="text"
                          value={item.last_pay_amount}
                          name={item.pay_item_name}
                          onChange={(e) => handleYTDInput(e.target)}
                        />
                      </td>
                      <td>
                        {(
                          parseFloat(item.last_pay_amount) +
                          parseFloat(item.ytd_amount)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              <tr
                button
                className="btn btn-outline bg-transparent text-[#B2AC88] hover:bg-transparent hover:text-[#B2AC88] border-none"
              >
                + Add Item
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold">Pre-Tax Deduction</td>
                <td>{groupTotals[2].lastPay.toFixed(2)}</td>
                <td>{groupTotals[2].totalGroup.toFixed(2)}</td>
              </tr>
              {selectedEmployeeYTD.length > 0 &&
                selectedEmployeeYTD
                  .filter(
                    (payItem) => payItem.pay_item_group == "Pre-Tax Deduction"
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_item_name}</td>
                      <td>
                        <input
                          type="text"
                          value={item.last_pay_amount}
                          name={item.pay_item_name}
                          onChange={(e) => handleYTDInput(e.target)}
                        />
                      </td>
                      <td>
                        {(
                          parseFloat(item.last_pay_amount) +
                          parseFloat(item.ytd_amount)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              <tr
                button
                className="btn btn-outline bg-transparent text-[#B2AC88] hover:bg-transparent hover:text-[#B2AC88] border-none"
              >
                + Add Item
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#666A40] text-white font-bold">
                <td className="font-bold">Net Pay Before Tax Deduction</td>
                <td>{netPayBeforeTax.netLastPay.toFixed(2)}</td>
                <td>{netPayBeforeTax.totalBeforeTax.toFixed(2)}</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#666A40] text-white font-bold">
                <td className="font-bold">TAX WITHHELD</td>
                <td></td>
                <td>{taxWithheld.tax}</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold">Post-Tax Deduction</td>
                <td>{groupTotals[3].lastPay.toFixed(2)}</td>
                <td>{groupTotals[3].totalGroup.toFixed(2)}</td>
              </tr>
              {selectedEmployeeYTD.length > 0 &&
                selectedEmployeeYTD
                  .filter(
                    (payItem) => payItem.pay_item_group == "Post-Tax Deduction"
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_item_name}</td>
                      <td>
                        <input
                          type="text"
                          value={item.last_pay_amount}
                          name={item.pay_item_name}
                          onChange={(e) => handleYTDInput(e.target)}
                        />
                      </td>
                      <td>
                        {(
                          parseFloat(item.last_pay_amount) +
                          parseFloat(item.ytd_amount)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              <tr
                button
                className="btn btn-outline bg-transparent text-[#B2AC88] hover:bg-transparent hover:text-[#B2AC88] border-none"
              >
                + Add Item
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold">Post-Tax Addition</td>
                <td>{groupTotals[4].lastPay.toFixed(2)}</td>
                <td>{groupTotals[4].totalGroup.toFixed(2)}</td>
              </tr>
              {selectedEmployeeYTD.length > 0 &&
                selectedEmployeeYTD
                  .filter(
                    (payItem) => payItem.pay_item_group == "Post-Tax Addition"
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_item_name}</td>
                      <td>
                        <input
                          type="text"
                          value={item.last_pay_amount}
                          name={item.pay_item_name}
                          onChange={(e) => handleYTDInput(e.target)}
                        />
                      </td>
                      <td>
                        {(
                          parseFloat(item.last_pay_amount) +
                          parseFloat(item.ytd_amount)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              <tr
                button
                className="btn btn-outline bg-transparent text-[#B2AC88] hover:bg-transparent hover:text-[#B2AC88] border-none"
              >
                + Add Item
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#666A40] text-white font-bold">
                <td className="font-bold">NET PAY EARNINGS</td>
                <td>{netPayEarning.lastPayNet.toFixed(2)}</td>
                <td>{netPayEarning.totalNet.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default LastPayrun;
