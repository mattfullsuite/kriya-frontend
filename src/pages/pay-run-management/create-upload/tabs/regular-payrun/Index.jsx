import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

// Components Import
import DateRangePicker from "./DateRangePicker";
import EmployeeTable from "./EmployeeTable";

const RegularPayrun = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [datePeriod, setDatePeriod] = useState({
    From: null,
    To: null,
    Payment: null,
  });

  const [employeeList, setEmployeeList] = useState(null);
  const [payItems, setPayItems] = useState(null);

  const generateList = async () => {
    const employeeList = await getEmployeeList();
    const payItems = await getPayItems();
    const payrollFrequncy = await getPayrollMonthlyFrequency();

    setEmployeeList(appendPayItemsToEmployee(employeeList, payItems));
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
        <DateRangePicker
          datePeriod={datePeriod}
          setDatePeriod={setDatePeriod}
          generateList={generateList}
        />
        <EmployeeTable employeeList={employeeList} payItems={payItems} />
      </div>
    </>
  );
};

export default RegularPayrun;
