import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  addCommaAndFormatDecimal,
  addComma,
  removeComma,
  formatDecimal,
} from "../../../assets/addCommaAndFormatDecimal";

const EmployeeSelection = ({ employeeList, onPopulate }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const selectedEmployeeInitial = {
    name: "",
    emp_num: "",
    date_hired: "",
    date_separated: "",
    date_of_payment: "",
    end_date_13th_month: "",
    base_pay: 0,
    daily_rate: 0,
    hourly_rate: 0,
    recent_payment: "",
    thirteenth_month_pay: "0.00",
    num_of_days_worked: 0,
    night_differential: 0,
    company_name: "",
    company_loc: "",
  };

  const [selectedEmployee, setSelectedEmployee] = useState(
    selectedEmployeeInitial
  );
  const [selectedEmployeeComputation, setSelectedEmployeeComputation] =
    useState(selectedEmployeeInitial);

  const [formattedMonthlyBasePay, setFormattedMonthlyBasePay] = useState(0);

  const [nightDifferential, setNightDifferential] = useState(false);

  const [numWorkDays, setNumWorkDays] = useState({});

  useEffect(() => {
    getNumWorkDays();
  }, []);

  const getNumWorkDays = async () => {
    try {
      const response = await axios.get(
        BASE_URL +
          `/comp-config-GetCompanyConfiguration/${"Monthly Working Days"}`
      );
      if (response.status === 200) {
        setNumWorkDays(response.data[0].configuration_value);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmployeeSelected = (empInfo) => {
    if (empInfo == "") {
      setSelectedEmployee(selectedEmployeeInitial);
      return;
    }
    setSelectedEmployee(JSON.parse(empInfo));
  };

  const handleOnChange = (name, value) => {
    if (name == "base_pay") {
      const dailyRate = computeDailyRate(parseFloat(removeComma(value)));
      handleOnChange("daily_rate", dailyRate);
      const hourlyRate = computeHourlyRate(dailyRate);
      handleOnChange("hourly_rate", hourlyRate);
      setFormattedMonthlyBasePay(addComma(value));
    }
    if (name == "end_date_13th_month") {
      name = "thirteenth_month_pay";
      value = thirteenthMonthPayCalculation(value);
    }
    if (name == "num_of_days_worked") {
      computeTotalBasePay(value);
    }
    if (typeof value == "string" && value.includes(",")) {
      value = removeComma(value);
    }
    setSelectedEmployee((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleOnLeave = (name, value) => {
    handleOnChange(name, formatDecimal(value));
  };

  const thirteenthMonthPayCalculation = (endDate) => {
    const startOfYear = moment().startOf("year");
    const dateHired = moment(selectedEmployee.date_hired, "YYYY-MM-DD");

    // Use date hired or start of year
    const dateToUse = dateHired.isBefore(startOfYear) ? startOfYear : dateHired;

    // Calculate number of days from the end date and the date used
    const numDays = moment(endDate, "YYYY-MM-DD").diff(dateToUse, "days");

    // Calculate 13th month pay
    return (numDays * (parseFloat(selectedEmployee.base_pay) / 365)).toFixed(2);
  };

  const computeTotalBasePay = (numOfDays) => {
    const dailyRate = computeDailyRate(parseFloat(selectedEmployee.base_pay));
    handleOnChange("daily_rate", dailyRate);
    const hourlyRate = computeHourlyRate(dailyRate);
    handleOnChange("hourly_rate", hourlyRate);
    const totalBasePay = (hourlyRate * (numOfDays * 8)).toFixed(2);
    handleNightDifferential(nightDifferential);
    handleOnChange("current_basic_pay", totalBasePay);
  };

  const computeDailyRate = (basePay) => {
    return basePay / numWorkDays;
  };

  const computeHourlyRate = (dailyRate) => {
    return parseFloat(dailyRate / 8);
  };

  const computeNightDifferential = () => {
    return parseFloat(
      (
        computeHourlyRate(
          computeDailyRate(parseFloat(selectedEmployee.base_pay))
        ) *
        0.1 *
        parseFloat(selectedEmployee.num_of_days_worked * 8)
      ).toFixed(2)
    );
  };

  const handleNightDifferential = (status) => {
    let nightDifferentialValue = 0.0;
    if (status == true) {
      nightDifferentialValue =
        nightDifferentialValue + computeNightDifferential();
    }
    handleOnChange(
      "night_differential",
      nightDifferentialValue.toFixed(2).toString()
    );
  };

  const handleNightDifferentialToggle = () => {
    const status = nightDifferential;
    setNightDifferential((value) => !value);
    handleNightDifferential(!status);
  };

  const handlePopulate = () => {
    onPopulate(selectedEmployee);
  };

  return (
    <>
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
                <option key={""} value={""}>
                  Select an Employee
                </option>
                {employeeList.length > 0 &&
                  employeeList.map((emp, index) => (
                    <option key={index} value={JSON.stringify(emp)}>
                      {emp.name}
                    </option>
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
                className="input input-bordered input-sm w-full mt-4"
                disabled
              />
            </td>
          </tr>
          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Monthly Base Pay:</p>
            </td>
            <td>
              <input
                name="base_pay"
                value={formattedMonthlyBasePay}
                type="text"
                className="input input-bordered input-sm w-full mt-4"
                onChange={(e) => {
                  handleOnChange(e.target.name, e.target.value);
                }}
                onBlur={(e) => {
                  handleOnLeave(e.target.name, e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Daily Rate:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                name="daily_rate"
                value={
                  selectedEmployee.daily_rate
                    ? addCommaAndFormatDecimal(
                        parseFloat(selectedEmployee.daily_rate)
                      )
                    : "0.00"
                }
                type="text"
                className="input input-bordered input-sm w-full mt-4"
                disabled
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Hourly Rate:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                name="hourly_rate"
                value={
                  selectedEmployee.hourly_rate
                    ? addCommaAndFormatDecimal(
                        parseFloat(selectedEmployee.hourly_rate)
                      )
                    : "0.00"
                }
                type="text"
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
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Payment Date:</p>
            </td>
            <td>
              <input
                value={moment(selectedEmployee.date_of_payment).format(
                  "YYYY-MM-DD"
                )}
                type="date"
                className="input input-bordered input-sm w-full mt-4"
                name="date_of_payment"
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
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
                type="date"
                className="input input-bordered input-sm w-full mt-4"
                name="end_date_13th_month"
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
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
              <p className="mt-4 text-right pr-4">Pro-rated 13th Month Pay:</p>
            </td>
            <td>
              <input
                type="text"
                value={
                  selectedEmployee.thirteenth_month_pay
                    ? addCommaAndFormatDecimal(
                        parseFloat(selectedEmployee.thirteenth_month_pay)
                      )
                    : "0.00"
                }
                className="input input-bordered input-sm w-full mt-4"
                disabled
              />
            </td>
          </tr>
          <tr>
            <td>
              <p className="mt-4 text-right pr-4">No. Of Days Worked: </p>
            </td>
            <td>
              <input
                type="number"
                value={selectedEmployee.num_of_days_worked}
                name="num_of_days_worked"
                className="input input-bordered input-sm w-full mt-4"
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Night Differential: </p>
            </td>
            <td className="mt-4 pr-4 flex">
              <input
                type="checkbox"
                onChange={() =>
                  handleNightDifferentialToggle(nightDifferential)
                }
                className="toggle"
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
    </>
  );
};

export default EmployeeSelection;
