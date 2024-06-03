import { useEffect, useState } from "react";
import moment from "moment";

const EmployeeSelection = ({ employeeList, onPopulate }) => {
  const selectedEmployeeInitial = {
    name: "",
    emp_num: "",
    date_hired: "",
    date_separated: "",
    end_date_13th_month: "",
    base_pay: "0.00",
    recent_payment: "",
    thirteenth_month_pay: "0.00",
    num_of_days_worked: 0,
    night_differential: 0,
  };

  const [selectedEmployee, setSelectedEmployee] = useState(
    selectedEmployeeInitial
  );

  const [nightDifferential, setNightDifferential] = useState(false);

  const handleEmployeeSelected = (empInfo) => {
    if (empInfo == "") {
      setSelectedEmployee(selectedEmployeeInitial);
      return;
    }
    setSelectedEmployee(JSON.parse(empInfo));
  };

  const handleOnChange = (name, value) => {
    if (name == "end_date_13th_month") {
      name = "thirteenth_month_pay";
      value = thirteenthMonthPayCalculation(value);
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
    return numDays * (selectedEmployee.base_pay / 365);
  };

  // Computation for the Daily and Hourly rate
  const assumedWorkingDays = 22;

  const computeTotalBasePay = (numOfDays) => {
    const dailyRate = computeDailyRate(selectedEmployee.base_pay);
    const hourlyRate = computeHourlyRate(dailyRate);
    const totalBasePay = hourlyRate * (numOfDays * 8);
    console.log(nightDifferential);
    handleNightDifferential(nightDifferential);
    handleOnChange("current_basic_pay", totalBasePay);
    handleOnChange("num_of_days_worked", numOfDays);
  };

  const computeDailyRate = (basePay) => {
    return basePay / assumedWorkingDays;
  };

  const computeHourlyRate = (dailyRate) => {
    return parseFloat(dailyRate / 8);
  };

  const computeNightDifferential = () => {
    return (
      computeHourlyRate(computeDailyRate(selectedEmployee.base_pay)) *
      0.1 *
      parseFloat(selectedEmployee.num_of_days_worked * 8)
    );
  };

  const handleNightDifferential = (status) => {
    let nightDifferentialValue = 0.0;
    if (status == true) {
      nightDifferentialValue += computeNightDifferential();
    }
    handleOnChange("night_differential", nightDifferentialValue);
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
                {employeeList.length > 1 &&
                  employeeList.map((emp) => (
                    <option
                      key={JSON.stringify(emp).emp_num}
                      value={JSON.stringify(emp)}
                    >
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
              <p className="mt-4 text-right pr-4">Pro-rated 13th Month Pay:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                type="text"
                placeholder="Type here"
                value={
                  selectedEmployee?.thirteenth_month_pay !== undefined
                    ? parseFloat(selectedEmployee.thirteenth_month_pay).toFixed(
                        2
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
                onChange={(e) => computeTotalBasePay(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Night Differential: </p>
            </td>
            <td>
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
