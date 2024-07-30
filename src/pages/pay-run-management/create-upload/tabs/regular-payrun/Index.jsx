import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import contributionTable from "../../../assets/calculation_table/contributions.json";

// Components Import
import EmployeeTable from "./EmployeeTable";
import Step1 from "./Step1";

const RegularPayrun = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [datePeriod, setDatePeriod] = useState({
    From: null,
    To: null,
    Payment: null,
  });

  const [employeeList, setEmployeeList] = useState(null);
  const [payItems, setPayItems] = useState(null);
  const [contributions, setContributions] = useState({
    SSS: false,
    PHIC: false,
    HDMF: false,
  });

  const generateList = async () => {
    const employeeList = await getEmployeeList();
    const payItems = await getPayItems();
    const payrollFrequncy = await getPayrollMonthlyFrequency();
    const appendedList = appendPayItemsToEmployee(employeeList, payItems);
    // setEmployeeList(appendedList);
    setEmployeeList(computeContribution(appendedList));
  };

  const computeContribution = (list) => {
    console.log(list);
    const selectedContributions = checkContributions();
    selectedContributions.forEach((contribution) => {
      list.forEach((employee) => {
        const contributionValue = compute(contribution, employee["Basic Pay"]);
        Object.entries(contributionValue).forEach(([key, value]) => {
          if (value > 0) {
            employee[key] = value;
          }
        });
      });
    });
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
        return range.ee_contribution;
      }
    }
    return 0;
  };

  const computationWithFormula = (contributionName, value) => {
    for (const range of contributionTable[contributionName]) {
      if (value > range.min && (value <= range.max || range.max === null)) {
        const compute = new Function("x", `return ${range.ee_contribution}`);
        return Math.round(compute(value), 2);
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
    console.log("Get types: ", payItems);
    console.log("Get types: ", data);
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
        <EmployeeTable employeeList={employeeList} payItems={payItems} />
      </div>
    </>
  );
};

export default RegularPayrun;
