import { useEffect, useMemo, useState } from "react";
import TaxTable from "../../../assets/calculation_table/tax-table.json";
import moment from "moment";
import { addCommaAndFormatDecimal } from "../../../assets/addCommaAndFormatDecimal";
import { NewInput } from "./NewInput";

const CalculationTable = ({
  employeeInformation,
  employeePayables,
  onPreview,
}) => {
  const [groupTotals, setGroupTotals] = useState({});
  const [selectedEmployeeTotals, setselectedEmployeeTotals] = useState([]);
  const [netPayBeforeTax, setNetPayBeforeTax] = useState({});
  const [taxWithheld, setTaxWithheld] = useState({});
  const [netPayEarning, setNetPayEarning] = useState({});

  const handleInput = (name, value) => {
    setselectedEmployeeTotals((prevEmployeeYTD) =>
      prevEmployeeYTD.map((item) =>
        item.pay_item_name === name ? { ...item, last_pay_amount: value } : item
      )
    );
  };

  const handlePayItemDropDown = (value) => {
    setselectedEmployeeTotals((prevEmployeeYTD) =>
      prevEmployeeYTD.map((item) =>
        item.pay_item_name === value ? { ...item, visible: true } : item
      )
    );
  };

  const computeTaxWithheld = (totals) => {
    let taxWithheldValue = 0;
    totals.forEach((total) => {
      if (total.name == "Taxable" || total.name == "Pre-Tax Deduction") {
        taxWithheldValue += total.totalGroup;
      }
    });

    const taxContribution = computeTax(taxWithheldValue, TaxTable["PH"]);
    setTaxWithheld({ tax: taxContribution * -1 });
    return taxContribution;
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
    return tax;
  }

  const itializeEmployeePayables = (empData, empPayables) => {
    if (empData === undefined) {
      return;
    }
    handleInput("Basic Pay", empData.current_basic_pay);
    handlePayItemDropDown("Basic Pay");
    handleInput("Night Differential", empData.night_differential);
    handlePayItemDropDown("13th Month Bonus - Non-Taxable");
    if (parseFloat(empData.night_differential) !== 0) {
      handlePayItemDropDown("Night Differential");
    }
    handleInput("13th Month Bonus - Non-Taxable", empData.thirteenth_month_pay);
  };

  const calculationForEverything = (data) => {
    const currentData = data;
    const preTaxGroup = ["Taxable", "Non-Taxable", "Pre-Tax Deduction"];
    const preTaxTotal = [];
    let netPayBeforeTax = { netLastPay: 0, totalBeforeTax: 0 };
    preTaxGroup.forEach((group) => {
      const groupTotal = {};

      const newGroup = currentData.filter(
        (payItem) => payItem.pay_item_group == group
      );

      groupTotal.name = group;

      const lastPayGroup = newGroup.reduce(
        (sum, item) => sum + parseFloat(item.last_pay_amount),
        0
      );

      groupTotal.lastPay = lastPayGroup;
      netPayBeforeTax.netLastPay += lastPayGroup;
      const totalGroup = newGroup.reduce(
        (sum, item) =>
          sum + parseFloat(item.last_pay_amount) + parseFloat(item.ytd_amount),
        0
      );

      groupTotal.totalGroup = totalGroup;
      netPayBeforeTax.totalBeforeTax += totalGroup;

      preTaxTotal.push(groupTotal);
    });

    const taxWithheld = computeTaxWithheld(preTaxTotal);

    let taxDue;
    //compute TaxDue
    currentData.forEach((item) => {
      if (item.pay_item_name === "Tax Withheld") {
        taxDue = Math.abs(item.ytd_amount) - Math.abs(taxWithheld);
        item.last_pay_amount = taxDue;
      }
    });

    //Assign Tax Withheld
    // currentData.forEach((item) => {
    //   if (item.pay_item_name === "Tax Withheld") {
    // if (taxDue < 0) {
    // } else {
    //   item.last_pay_amount = 0;
    // }
    //   }
    // });

    //Assign Tax Refund
    // currentData.forEach((item) => {
    //   if (item.pay_item_name === "Tax Refund - Current Year") {
    //     if (taxDue > 0) {
    //       item.last_pay_amount = taxDue;
    //     } else {
    //       item.last_pay_amount = 0;
    //     }
    //   }
    // });

    const taxesGroup = ["Taxes"];
    const taxesTotal = [];
    taxesGroup.forEach((group) => {
      const groupTotal = {};

      const newGroup = currentData.filter(
        (payItem) => payItem.pay_item_group == group
      );

      groupTotal.name = group;

      const lastPayGroup = newGroup.reduce(
        (sum, item) => sum + parseFloat(item.last_pay_amount),
        0
      );

      groupTotal.lastPay = lastPayGroup;
      let totalGroup = newGroup.reduce(
        (sum, item) =>
          sum + parseFloat(item.last_pay_amount) + parseFloat(item.ytd_amount),
        0
      );
      if (totalGroup < 0) {
        totalGroup = totalGroup;
      }
      groupTotal.totalGroup = totalGroup;
      taxesTotal.push(groupTotal);
    });

    const postTaxGroup = ["Post-Tax Deduction", "Post-Tax Addition"];
    const postTaxTotal = [];
    postTaxGroup.forEach((group) => {
      const groupTotal = {};

      const newGroup = currentData.filter(
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
      postTaxTotal.push(groupTotal);
    });
    setGroupTotals(preTaxTotal.concat(taxesTotal.concat(postTaxTotal)));

    setNetPayBeforeTax(netPayBeforeTax);
    const sumPreTax = preTaxTotal.reduce(
      (accumulator, currentValue) => accumulator + currentValue.lastPay,
      0
    );
    const sumPostTax = postTaxTotal.reduce(
      (accumulator, currentValue) => accumulator + currentValue.lastPay,
      0
    );

    const sumPreTaxTotalGroup = preTaxTotal.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalGroup,
      0
    );
    const sumPostTaxTotalGroup = postTaxTotal.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalGroup,
      0
    );

    const netLastPay = sumPreTax + sumPostTax;
    const netTotalGroup = sumPreTaxTotalGroup + sumPostTaxTotalGroup;
    setNetPayEarning({
      lastPayNet: netLastPay + taxDue,
      totalNet: netTotalGroup + taxDue,
    });
    return currentData;
  };

  useEffect(() => {
    setselectedEmployeeTotals(calculationForEverything(selectedEmployeeTotals));
    console.log(selectedEmployeeTotals);
  }, [selectedEmployeeTotals]);

  useEffect(() => {
    setselectedEmployeeTotals(employeePayables);
    itializeEmployeePayables(employeeInformation, employeePayables);
  }, [employeePayables]);

  const handlePreviewClick = (
    empInfo,
    empPayables,
    groupTotals,
    netBeforeTaxes,
    netPayEarnings
  ) => {
    const payslipInfo = processDataForPayslip(empInfo, empPayables);
    onPreview(
      payslipInfo,
      empPayables,
      groupTotals,
      netBeforeTaxes,
      netPayEarnings
    );
  };

  const processDataForPayslip = (empInfo, empPayables) => {
    const processedData = {
      "Company Name": empInfo.company_name,
      "Company TIN": empInfo.company_tin,
      "Company Address": empInfo.company_loc,
      "Employee ID": empInfo.emp_num,
      "Last Name": empInfo.s_name,
      "First Name": empInfo.f_name,
      "Middle Name": empInfo.m_name,
      Email: empInfo.work_email,
      "Job Title": empInfo.position_name,
      "Hire Date": moment(empInfo.date_hired).format("YYYY-MM-DD"),
      Dates: {
        From: moment(empInfo.recent_duration_to)
          .add(1, "days")
          .format("YYYY-MM-DD"),
        To: moment(empInfo.date_separated).format("YYYY-MM-DD"),
        Payment: moment().format("YYYY-MM-DD"),
      },
      source: "Created",
    };

    return Object.assign(processedData, processPayable(empPayables));
  };

  const processPayable = (data) => {
    let processedData = {
      "Pay Items": {},
      Totals: {},
      "Net Pay": 0,
    };

    // Get categories of of payables
    const categories = getUniqueValues(data, "pay_item_category");

    // Loop within the categories
    categories.forEach((category) => {
      processedData["Pay Items"][category] = {};

      const payables = data.filter(
        (employee) => employee.pay_item_category === category
      );

      let total = 0;

      payables.forEach((payable) => {
        processedData["Pay Items"][category][payable.pay_item_name] =
          payable.last_pay_amount;
        total += parseFloat(payable.last_pay_amount);
      });
      processedData.Totals[category] = total;
      processedData["Net Pay"] += total;
    });
    return processedData;
  };

  const getUniqueValues = (array, key) => {
    return [...new Set(array.map((item) => item[key]))];
  };

  return (
    <>
      {selectedEmployeeTotals.length > 0 && (
        <div className="p-2 w-2/3 overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-[#666A40] text-white">
                <th>Last Payrun Calculation</th>
                <th className="text-right">Last Pay</th>
                <th className="text-right">Total Earnings</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold w-1/2">Taxable</td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(groupTotals[0].lastPay)}
                </td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(groupTotals[0].totalGroup)}
                </td>
              </tr>
              {selectedEmployeeTotals.length > 0 &&
                selectedEmployeeTotals
                  .filter(
                    (payItem) =>
                      payItem.pay_item_group == "Taxable" &&
                      payItem.visible == true
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_item_name}</td>
                      <td className="text-right">
                        <NewInput data={item} onValueChange={handleInput} />
                      </td>
                      <td className="text-right">
                        {addCommaAndFormatDecimal(
                          parseFloat(item.last_pay_amount) +
                            parseFloat(item.ytd_amount)
                        )}
                      </td>
                    </tr>
                  ))}
              <tr>
                <td>
                  <select
                    className=" p-2 bg-transparent text-[#B2AC88] hover:bg-transparent hover:text-[#B2AC88]"
                    onChange={(e) => handlePayItemDropDown(e.target.value)}
                  >
                    <option defaultValue>+ Add Item</option>
                    {selectedEmployeeTotals.length > 0 &&
                      selectedEmployeeTotals
                        .filter(
                          (payItem) =>
                            payItem.pay_item_group == "Taxable" &&
                            payItem.visible == false
                        )
                        .map((item, index) => (
                          <option key={index} value={item.pay_item_name}>
                            {item.pay_item_name}
                          </option>
                        ))}
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold w-1/2">Non-Taxable</td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(groupTotals[1].lastPay)}
                </td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(groupTotals[1].totalGroup)}
                </td>
              </tr>
              {selectedEmployeeTotals.length > 0 &&
                selectedEmployeeTotals
                  .filter(
                    (payItem) =>
                      payItem.pay_item_group == "Non-Taxable" &&
                      payItem.visible == true
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_item_name}</td>
                      <td className="text-right">
                        <NewInput data={item} onValueChange={handleInput} />
                      </td>
                      <td className="text-right">
                        {addCommaAndFormatDecimal(
                          parseFloat(item.last_pay_amount) +
                            parseFloat(item.ytd_amount)
                        )}
                      </td>
                    </tr>
                  ))}
              <tr>
                <td>
                  <select
                    className=" p-2 bg-transparent text-[#B2AC88] hover:bg-transparent hover:text-[#B2AC88] "
                    onChange={(e) => handlePayItemDropDown(e.target.value)}
                  >
                    <option defaultValue>+ Add Item</option>
                    {selectedEmployeeTotals.length > 0 &&
                      selectedEmployeeTotals
                        .filter(
                          (payItem) =>
                            payItem.pay_item_group == "Non-Taxable" &&
                            payItem.visible == false
                        )
                        .map((item, index) => (
                          <option key={index} value={item.pay_item_name}>
                            {item.pay_item_name}
                          </option>
                        ))}
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold w-1/2">Pre-Tax Deduction</td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(groupTotals[2].lastPay)}
                </td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(groupTotals[2].totalGroup)}
                </td>
              </tr>
              {selectedEmployeeTotals.length > 0 &&
                selectedEmployeeTotals
                  .filter(
                    (payItem) =>
                      payItem.pay_item_group == "Pre-Tax Deduction" &&
                      payItem.visible == true
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_item_name}</td>
                      <td className="text-right">
                        <NewInput data={item} onValueChange={handleInput} />
                      </td>
                      <td className="text-right">
                        {addCommaAndFormatDecimal(
                          parseFloat(item.last_pay_amount) +
                            parseFloat(item.ytd_amount)
                        )}
                      </td>
                    </tr>
                  ))}
              <tr>
                <td>
                  <select
                    className=" p-2 bg-transparent text-[#B2AC88] hover:bg-transparent hover:text-[#B2AC88]"
                    onChange={(e) => handlePayItemDropDown(e.target.value)}
                  >
                    <option defaultValue>+ Add Item</option>
                    {selectedEmployeeTotals.length > 0 &&
                      selectedEmployeeTotals
                        .filter(
                          (payItem) =>
                            payItem.pay_item_group == "Pre-Tax Deduction" &&
                            payItem.visible == false
                        )
                        .map((item, index) => (
                          <option key={index} value={item.pay_item_name}>
                            {item.pay_item_name}
                          </option>
                        ))}
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#666A40] text-white font-bold">
                <td className="font-bold w-1/2">
                  Net Pay Before Tax Deduction
                </td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(netPayBeforeTax.netLastPay)}
                </td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(netPayBeforeTax.totalBeforeTax)}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold" colSpan="3">
                  Taxes
                </td>
              </tr>
              <tr className="">
                <td className="font-bold w-1/2">Tax Withheld</td>
                <td className="text-right w-1/4">
                  {selectedEmployeeTotals.length > 0 &&
                    selectedEmployeeTotals
                      .filter(
                        (payItem) => payItem.pay_item_name === "Tax Withheld"
                      )
                      .map((payItem, index) => (
                        <div key={index}>
                          {addCommaAndFormatDecimal(
                            Math.abs(payItem.ytd_amount) -
                              Math.abs(taxWithheld.tax)
                          )}
                        </div>
                      ))}
                </td>
                <td className="text-right w-1/4">
                  {selectedEmployeeTotals.length > 0 &&
                    selectedEmployeeTotals
                      .filter(
                        (payItem) => payItem.pay_item_name === "Tax Withheld"
                      )
                      .map((payItem, index) => (
                        <div key={index}>
                          {addCommaAndFormatDecimal(
                            Math.abs(payItem.ytd_amount)
                          )}
                        </div>
                      ))}
                </td>
              </tr>
              <tr className="">
                <td className="font-bold w-1/2">Tax Due</td>
                <td className="text-right w-1/4"></td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(Math.abs(taxWithheld.tax))}
                </td>
              </tr>
              <tr className="">
                <td className="font-bold w-1/2">Tax Refund (Tax Payable)</td>
                <td className="text-right w-1/4"></td>
                <td className="text-right w-1/4">
                  {selectedEmployeeTotals.length > 0 &&
                    selectedEmployeeTotals
                      .filter(
                        (payItem) => payItem.pay_item_name === "Tax Withheld"
                      )
                      .map((payItem, index) => (
                        <div key={index}>
                          {addCommaAndFormatDecimal(
                            Math.abs(payItem.ytd_amount) -
                              Math.abs(taxWithheld.tax)
                          )}
                        </div>
                      ))}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold w-1/2">Post-Tax Deduction</td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(groupTotals[4].lastPay)}
                </td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(groupTotals[4].totalGroup)}
                </td>
              </tr>
              {selectedEmployeeTotals.length > 0 &&
                selectedEmployeeTotals
                  .filter(
                    (payItem) =>
                      payItem.pay_item_group == "Post-Tax Deduction" &&
                      payItem.visible == true &&
                      payItem.pay_item_name != "Tax Withheld"
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_item_name}</td>
                      <td className="text-right">
                        <NewInput data={item} onValueChange={handleInput} />
                      </td>
                      <td className="text-right">
                        {addCommaAndFormatDecimal(
                          parseFloat(item.last_pay_amount) +
                            parseFloat(item.ytd_amount)
                        )}
                      </td>
                    </tr>
                  ))}
              <tr>
                <td>
                  <select
                    className=" p-2 bg-transparent text-[#B2AC88] hover:bg-transparent hover:text-[#B2AC88] "
                    onChange={(e) => handlePayItemDropDown(e.target.value)}
                  >
                    <option defaultValue>+ Add Item</option>
                    {selectedEmployeeTotals.length > 0 &&
                      selectedEmployeeTotals
                        .filter(
                          (payItem) =>
                            payItem.pay_item_group == "Post-Tax Deduction" &&
                            payItem.visible == false &&
                            payItem.pay_item_name != "Tax Withheld"
                        )
                        .map((item, index) => (
                          <option key={index} value={item.pay_item_name}>
                            {item.pay_item_name}
                          </option>
                        ))}
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold w-1/2">Post-Tax Addition</td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(groupTotals[4].lastPay)}
                </td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(groupTotals[4].totalGroup)}
                </td>
              </tr>
              {selectedEmployeeTotals.length > 0 &&
                selectedEmployeeTotals
                  .filter(
                    (payItem) =>
                      payItem.pay_item_group == "Post-Tax Addition" &&
                      payItem.visible == true
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_item_name}</td>
                      <td className="text-right">
                        <NewInput data={item} onValueChange={handleInput} />
                      </td>
                      <td className="text-right">
                        {addCommaAndFormatDecimal(
                          parseFloat(item.last_pay_amount) +
                            parseFloat(item.ytd_amount)
                        )}
                      </td>
                    </tr>
                  ))}
              <tr>
                <td>
                  <select
                    className=" p-2 bg-transparent text-[#B2AC88] hover:bg-transparent hover:text-[#B2AC88]"
                    onChange={(e) => handlePayItemDropDown(e.target.value)}
                  >
                    <option defaultValue>+ Add Item</option>
                    {selectedEmployeeTotals.length > 0 &&
                      selectedEmployeeTotals
                        .filter(
                          (payItem) =>
                            payItem.pay_item_group == "Post-Tax Addition" &&
                            payItem.visible == false
                        )
                        .map((item, index) => (
                          <option key={index} value={item.pay_item_name}>
                            {item.pay_item_name}
                          </option>
                        ))}
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#666A40] text-white font-bold">
                <td className="font-bold">NET PAY EARNINGS</td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(netPayEarning.lastPayNet)}
                </td>
                <td className="text-right w-1/4">
                  {addCommaAndFormatDecimal(netPayEarning.totalNet)}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td colSpan={3} className="text-right">
                  <button
                    className="btn bg-[rgb(102,106,64)] text-white"
                    onClick={() =>
                      handlePreviewClick(
                        employeeInformation,
                        selectedEmployeeTotals,
                        groupTotals,
                        netPayBeforeTax,
                        netPayEarning
                      )
                    }
                  >
                    Preview
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CalculationTable;
