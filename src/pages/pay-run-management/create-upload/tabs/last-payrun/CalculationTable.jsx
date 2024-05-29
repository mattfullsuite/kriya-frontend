import { useEffect, useState } from "react";
import TaxTable from "../../../assets/tax-table.json";

const CalculationTable = ({
  employeeInformation,
  employeePayables,
  //   selectedEmployeeTotals,
  //   setselectedEmployeeTotals,
  onPreview,
}) => {
  const [groupTotals, setGroupTotals] = useState({});
  const [selectedEmployeeTotals, setselectedEmployeeTotals] = useState([]);

  const handleYTDInput = (input) => {
    console.log("Value", selectedEmployeeTotals);
    console.log(input.value);
    console.log(input.name);
    const { name, value } = input;
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

  const [netPayBeforeTax, setNetPayBeforeTax] = useState({});

  const [taxWithheld, setTaxWithheld] = useState({});
  const [netPayEarning, setNetPayEarning] = useState({});

  const calculateTotalPerGroup = () => {
    const totals = [];
    // console.log(selectedEmployeeTotals);

    const payItemGroup = [
      "Taxable",
      "Non-Taxable",
      "Pre-Tax Deduction",
      "Post-Tax Deduction",
      "Post-Tax Addition",
    ];

    payItemGroup.forEach((group) => {
      //   console.log(selectedEmployeeTotals);
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

    console.log(totals);
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

  const computeTaxWithheld = (value) => {
    const taxContribution = computeTax(value, TaxTable["PH"]);
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

  useEffect(() => {
    calculateTotalPerGroup();
  }, [selectedEmployeeTotals]);

  useEffect(() => {
    console.log("Initialize value");
    setselectedEmployeeTotals(employeePayables);
  }, [employeePayables]);

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
                <td>{groupTotals[0].lastPay.toFixed(2)}</td>
                <td>{groupTotals[0].totalGroup.toFixed(2)}</td>
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
                <td>{groupTotals[1].lastPay.toFixed(2)}</td>
                <td>{groupTotals[1].totalGroup.toFixed(2)}</td>
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
              <tr>
                <td>
                  <select className=" p-2 bg-transparent text-[#B2AC88] hover:bg-transparent hover:text-[#B2AC88] ">
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
                <td>{groupTotals[2].lastPay.toFixed(2)}</td>
                <td>{groupTotals[2].totalGroup.toFixed(2)}</td>
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
                <td>{netPayBeforeTax.netLastPay.toFixed(2)}</td>
                <td>{netPayBeforeTax.totalBeforeTax.toFixed(2)}</td>
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
                          {(payItem.ytd_amount - taxWithheld.tax).toFixed(2)}
                        </div>
                      ))}
                </td>
                <td>{(-1 * taxWithheld.tax).toFixed(2)}</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="bg-[#E6E7DD]">
                <td className="font-bold">Post-Tax Deduction</td>
                <td>{groupTotals[3].lastPay.toFixed(2)}</td>
                <td>{groupTotals[3].totalGroup.toFixed(2)}</td>
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
                <td>{groupTotals[4].lastPay.toFixed(2)}</td>
                <td>{groupTotals[4].totalGroup.toFixed(2)}</td>
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
                <td>{netPayEarning.lastPayNet.toFixed(2)}</td>
                <td>{netPayEarning.totalNet.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CalculationTable;
