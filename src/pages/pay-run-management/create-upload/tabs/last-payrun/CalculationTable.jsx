import { useEffect, useState } from "react";
import TaxTable from "../../../assets/tax-table.json";
import moment from "moment";

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

  const handleYTDInput = (name, value) => {
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

      const newGroup = selectedEmployeeTotals.filter(
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
    computeNetPayBeforeTax(totals);
    computeTaxWithheld(totals);
  };

  const computeNetPayBeforeTax = (totals) => {
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

    setNetPayBeforeTax({
      netLastPay: netPayBeforeTax.lastPayBeforeTax,
      totalBeforeTax: netPayBeforeTax.totalBeforeTax,
    });
    setNetPayEarning(netPay);
  };

  const computeTaxWithheld = (totals) => {
    let taxWithheldValue = 0;
    totals.forEach((total) => {
      if (total.name == "Taxable" || total.name == "Pre-Tax Deduction") {
        taxWithheldValue += total.totalGroup;
      }
    });

    const taxContribution = computeTax(taxWithheldValue, TaxTable["PH"]);
    setTaxWithheld({ tax: taxContribution });
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

  const itializeEmployeePayables = (empData, empPayables) => {
    if (empData === undefined) {
      return;
    }
    handleYTDInput("Basic Pay", empData.current_basic_pay);
    handleYTDInput("Night Differential", empData.night_differential);
    handleYTDInput(
      "13th Month Bonus - Non Taxable",
      empData.thirteenth_month_pay
    );
    handlePayItemDropDown("13th Month Bonus - Non Taxable");
  };

  useEffect(() => {
    calculateTotalPerGroup();
  }, [selectedEmployeeTotals]);

  useEffect(() => {
    setselectedEmployeeTotals(employeePayables);
    itializeEmployeePayables(employeeInformation, employeePayables);
  }, [employeePayables]);

  const handlePreviewClick = (empInfo, empPayables) => {
    const payslipInfo = processDataForPayslip(empInfo, empPayables);
    console.log(payslipInfo);
    onPreview(payslipInfo);
  };

  const processDataForPayslip = (empInfo, empPayables) => {
    const processedData = {
      "Employee ID": empInfo.emp_num,
      "Last Name": empInfo.s_name,
      "First Name": empInfo.f_name,
      "Middle Name": empInfo.m_name,
      Email: empInfo.work_email,
      "Job Title": empInfo.position_name,
      "Hire Date": moment(empInfo.date_hired).format("YYYY-MM-DD"),
      Dates: {
        From: "2024-01-01",
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

  const addCommasAndFormatDecimal = (number) => {
    if (typeof number == "number") {
      let parts = number.toFixed(2).toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } else {
      return number;
    }
  };
  return (
    <>
      {selectedEmployeeTotals.length > 0 && (
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
                <td>{addCommasAndFormatDecimal(groupTotals[0].lastPay)}</td>
                <td>{addCommasAndFormatDecimal(groupTotals[0].totalGroup)}</td>
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
                      <td>
                        <input
                          type="text"
                          value={addCommasAndFormatDecimal(
                            item.last_pay_amount
                          )}
                          name={item.pay_item_name}
                          onChange={(e) =>
                            handleYTDInput(e.target.name, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        {addCommasAndFormatDecimal(
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
                          <option value={item.pay_item_name}>
                            {item.pay_item_name}
                          </option>
                        ))}
                    <option>+ Add New Pay Item</option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold">Non-Taxable</td>
                <td>{addCommasAndFormatDecimal(groupTotals[1].lastPay)}</td>
                <td>{addCommasAndFormatDecimal(groupTotals[1].totalGroup)}</td>
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
                      <td>
                        <input
                          type="text"
                          value={addCommasAndFormatDecimal(
                            item.last_pay_amount
                          )}
                          name={item.pay_item_name}
                          onChange={(e) =>
                            handleYTDInput(e.target.name, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        {addCommasAndFormatDecimal(
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
                          <option value={item.pay_item_name}>
                            {item.pay_item_name}
                          </option>
                        ))}
                    <option>+ Add New Pay Item</option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold">Pre-Tax Deduction</td>
                <td>{addCommasAndFormatDecimal(groupTotals[2].lastPay)}</td>
                <td>{addCommasAndFormatDecimal(groupTotals[2].totalGroup)}</td>
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
                      <td>
                        <input
                          type="text"
                          value={addCommasAndFormatDecimal(
                            item.last_pay_amount
                          )}
                          name={item.pay_item_name}
                          onChange={(e) =>
                            handleYTDInput(e.target.name, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        {addCommasAndFormatDecimal(
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
                          <option value={item.pay_item_name}>
                            {item.pay_item_name}
                          </option>
                        ))}
                    <option>+ Add New Pay Item</option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#666A40] text-white font-bold">
                <td className="font-bold">Net Pay Before Tax Deduction</td>
                <td>{addCommasAndFormatDecimal(netPayBeforeTax.netLastPay)}</td>
                <td>
                  {addCommasAndFormatDecimal(netPayBeforeTax.totalBeforeTax)}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#666A40] text-white font-bold">
                <td className="font-bold">TAX WITHHELD</td>
                <td>
                  {selectedEmployeeTotals.length > 0 &&
                    selectedEmployeeTotals
                      .filter(
                        (payItem) => payItem.pay_item_name === "Tax Withheld"
                      )
                      .map((payItem, index) => (
                        <div key={index}>
                          {addCommasAndFormatDecimal(
                            payItem.ytd_amount - taxWithheld.tax
                          )}
                        </div>
                      ))}
                </td>
                <td>{addCommasAndFormatDecimal(-1 * taxWithheld.tax)}</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold">Post-Tax Deduction</td>
                <td>{addCommasAndFormatDecimal(groupTotals[3].lastPay)}</td>
                <td>{addCommasAndFormatDecimal(groupTotals[3].totalGroup)}</td>
              </tr>
              {selectedEmployeeTotals.length > 0 &&
                selectedEmployeeTotals
                  .filter(
                    (payItem) =>
                      payItem.pay_item_group == "Post-Tax Deduction" &&
                      payItem.visible == true
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_item_name}</td>
                      <td>
                        <input
                          type="text"
                          value={addCommasAndFormatDecimal(
                            item.last_pay_amount
                          )}
                          name={item.pay_item_name}
                          onChange={(e) =>
                            handleYTDInput(e.target.name, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        {addCommasAndFormatDecimal(
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
                            payItem.visible == false
                        )
                        .map((item, index) => (
                          <option value={item.pay_item_name}>
                            {item.pay_item_name}
                          </option>
                        ))}
                    <option>+ Add New Pay Item</option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold">Post-Tax Addition</td>
                <td>{addCommasAndFormatDecimal(groupTotals[4].lastPay)}</td>
                <td>{addCommasAndFormatDecimal(groupTotals[4].totalGroup)}</td>
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
                      <td>
                        <input
                          type="text"
                          value={addCommasAndFormatDecimal(
                            item.last_pay_amount
                          )}
                          name={item.pay_item_name}
                          onChange={(e) =>
                            handleYTDInput(e.target.name, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        {addCommasAndFormatDecimal(
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
                          <option value={item.pay_item_name}>
                            {item.pay_item_name}
                          </option>
                        ))}
                    <option>+ Add New Pay Item</option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#666A40] text-white font-bold">
                <td className="font-bold">NET PAY EARNINGS</td>
                <td>{addCommasAndFormatDecimal(netPayEarning.lastPayNet)}</td>
                <td>{addCommasAndFormatDecimal(netPayEarning.totalNet)}</td>
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
                        selectedEmployeeTotals
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
