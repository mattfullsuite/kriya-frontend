import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import contributionTable from "../../../assets/calculation_table/contributions.json";
import TaxTable from "../../../assets/tax-table.json";

// Components Import
import Step1 from "./Step1";
import Step2 from "./Step 2";
import Step3 from "./Step3";

const RegularPayrun = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [datePeriod, setDatePeriod] = useState({
    From: null,
    To: null,
    Payment: null,
  });

  const [employeeList, setEmployeeList] = useState(null);
  const [payItems, setPayItems] = useState(null);
  const [payrollFrequency, setPayrollFrequency] = useState(null);
  const [contributions, setContributions] = useState({
    SSS: false,
    PHIC: false,
    HDMF: false,
  });
  const [processedData, setProcessedData] = useState(null);

  useEffect(() => {
    setProcessedData(employeeList);
  }, [employeeList]);

  const generateList = async () => {
    const employeeList = await getEmployeeList();
    const payItems = await getPayItems();
    const frequency = await getPayrollMonthlyFrequency();
    const appendedList = appendPayItemsToEmployee(employeeList, payItems);
    setEmployeeList(computeContribution(appendedList, frequency));
  };

  const computeContribution = (list, frequency) => {
    const selectedContributions = checkContributions();
    selectedContributions.forEach((contribution) => {
      list.forEach((employee) => {
        const contributionValue = compute(contribution, employee["Basic Pay"]);
        Object.entries(contributionValue).forEach(([key, value]) => {
          if (value != 0) {
            employee[key] = value;
          }
        });
      });
    });
    if (frequency > 1) {
      list.forEach((employee) => {
        employee["Basic Pay"] = parseFloat(
          employee["Basic Pay"] / frequency
        ).toFixed(2);
      });
    }
    return list;
  };

  const compute = (contribution, value) => {
    switch (contribution) {
      case "SSS":
        return { "SSS (EE)": computation(contribution, value) };
      case "PHIC":
        return { "PHIC (EE)": computationWithFormula(contribution, value) };
      case "HDMF":
        return { "HDMF (EE)": computationWithFormula(contribution, value) };
    }
  };

  const computation = (contributionName, value) => {
    for (const range of contributionTable[contributionName]) {
      if (value > range.min && (value <= range.max || range.max === null)) {
        return (parseFloat(range.ee_contribution) * -1).toFixed(2);
      }
    }
    return 0;
  };

  const computationWithFormula = (contributionName, value) => {
    for (const range of contributionTable[contributionName]) {
      if (value > range.min && (value <= range.max || range.max === null)) {
        const compute = new Function("x", `return ${range.ee_contribution}`);
        return (parseFloat(compute(value)) * -1).toFixed(2);
      }
    }
    return 0;
  };

  const checkContributions = () => {
    const trueKeys = Object.keys(contributions).filter(
      (key) => contributions[key] === true
    );
    return trueKeys;
  };

  const getEmployeeList = async () => {
    try {
      const employees = await axios.get(BASE_URL + "/ep-getActiveEmployees");
      return employees.data;
    } catch (err) {
      console.error(err);
    }
  };

  const getPayItems = async () => {
    try {
      const payItems = await axios.get(BASE_URL + "/mp-getPayItem");
      setPayItems(payItems.data);
      getTypes(payItems.data);
      return payItems.data;
    } catch (err) {
      console.error(err);
    }
  };

  const getPayrollMonthlyFrequency = async () => {
    try {
      const configuration_name = "Monthly Payroll Frequency";
      const response = await axios.get(
        BASE_URL + `/comp-config-GetCompanyConfiguration/${configuration_name}`
      );
      if (response.status === 200) {
        setPayrollFrequency(response.data[0].configuration_value);
        return response.data[0].configuration_value;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const appendPayItemsToEmployee = (employeeList, payItems) => {
    let transformedPayItems = payItems.reduce((acc, item) => {
      // acc[item.pay_items_id] = 0;
      acc[item.pay_item_name] = 0;
      return acc;
    }, {});

    delete transformedPayItems["Basic Pay"];
    // Append the transformed pay items data to each employee
    employeeList.forEach((employee) => {
      employee["Hire Date"] = moment(employee["Hire Date"]).format(
        "MMMM DD, YYYY"
      );
      if (employee["Basic Pay"] == null) {
        employee["Basic Pay"] = 0;
      }
      Object.assign(employee, transformedPayItems);
    });
    return employeeList;
  };

  const getTypes = (payItems) => {
    const data = [...new Set(payItems.map((item) => item["pay_item_type"]))];
  };

  const step2NextClick = () => {
    // document.getElementById("step-2").style.display = "none";
    // document.getElementById("step-3").style.display = "block";
    document.getElementById("step-3").show();
    taxWithheldComputation(employeeList, payItems, payrollFrequency);
  };

  const taxWithheldComputation = (employees, payItems, payrollFrequency) => {
    if (employees && payItems && payrollFrequency) {
      let taxables = payItems.filter(
        (payItem) =>
          payItem.pay_item_group == "Taxable" ||
          payItem.pay_item_group == "Pre-Tax Deduction"
      );
      employees.forEach((employee) => {
        let preTaxValue = 0;
        taxables.forEach((taxable) => {
          preTaxValue =
            parseFloat(preTaxValue) +
            parseFloat(employee[taxable.pay_item_name]);
        });
        if (preTaxValue > 0) {
          const taxContribution = computeTax(
            preTaxValue * (12 * payrollFrequency),
            TaxTable["PH"]
          );
          employee["Tax Withheld"] = parseFloat(
            (taxContribution / (12 * payrollFrequency)) * -1
          ).toFixed(2);
        }
      });
      setProcessedData(employees);
    }
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

  const step3FinalizeClick = (data) => {
    const processedRecords = processData(data, payItems);
    const batches = splitToBatches(processedRecords, 10);
    console.log("Batches", batches);
  };

  const processData = (employees, payItems) => {
    const categories = [
      ...new Set(payItems.map((item) => item.pay_item_category)),
    ];

    employees.forEach((employee) => {
      const categoryTotal = {};
      const payables = {};
      let netPay = 0;

      categories.forEach((category) => {
        categoryTotal[category] = 0.0;
        const categoryObject = {};

        const payItemList = payItems.filter(
          (payItem) => payItem.pay_item_category === category
        );

        payItemList.forEach((payItem) => {
          if (
            employee[payItem.pay_item_name] !== undefined &&
            employee[payItem.pay_item_name] !== null
          ) {
            const value = parseFloat(employee[payItem.pay_item_name]) || 0;

            if (value !== 0) {
              categoryObject[payItem.pay_item_name] = value;
              categoryTotal[category] += value;
              netPay += value;
            } else {
              categoryObject[payItem.pay_item_name] = 0;
            }

            delete employee[payItem.pay_item_name];
          } else {
            categoryObject[payItem.pay_item_name] = 0;
          }
        });

        payables[category] = categoryObject;
      });

      employee["Pay Items"] = payables;
      employee["Totals"] = categoryTotal;
      employee["Net Pay"] = netPay;
      employee["Dates"] = datePeriod;
    });

    return employees;
  };

  const splitToBatches = (array, batchSize) => {
    const batches = [];
    for (let i = 0; i < array.length; i += batchSize) {
      const batch = array.slice(i, i + batchSize);
      batches.push(batch);
    }
    return batches;
  };

  return (
    <>
      <div className="mt-10">
        <Step1
          datePeriod={datePeriod}
          setDatePeriod={setDatePeriod}
          contributions={contributions}
          setContributions={setContributions}
          generateList={generateList}
        />
        <Step2
          employeeList={employeeList}
          setEmployeeList={setEmployeeList}
          payItems={payItems}
          nextClick={step2NextClick}
        />
        <Step3
          employeeRecords={processedData}
          finalizeClick={step3FinalizeClick}
          payItems={payItems}
        />
      </div>
    </>
  );
};

export default RegularPayrun;
