import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import moment from "moment/moment";

const HistoricalPayrunTable = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [filterValues, setFilterValues] = useState({
    type: "",
    option: "",
    from: "",
    to: "",
  });
  const [transformedData, setTransformedData] = useState([]);

  const typeOption = useRef(null);
  const dateFromRef = useRef(null);
  const dateToRef = useRef(null);

  useEffect(() => {
    typeOption.current.disabled = true;
    dateFromRef.current.disabled = true;
    dateToRef.current.disabled = true;
  }, []);

  const getDepartments = async () => {
    try {
      const result = await axios.get(BASE_URL + "/comp-GetDepartments");
      setDepartments(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getEmployees = async () => {
    try {
      const result = await axios.get(BASE_URL + "/em-allEmployees");
      setEmployees(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filterTypeChange = (e) => {
    onValueChange(e);
    if (e.target.value === "department") {
      getDepartments();
      typeOption.current.disabled = false;
    } else if (e.target.value === "employee") {
      getEmployees();
      typeOption.current.disabled = false;
    } else {
      typeOption.current.disabled = true;
    }
  };

  const filterOptionChange = (e) => {
    onValueChange(e);
    if (e.target.value == "") {
      dateFromRef.current.disabled = true;
      dateToRef.current.disabled = true;
      return;
    }
    dateFromRef.current.disabled = false;
    dateToRef.current.disabled = false;
  };

  const onValueChange = (e) => {
    setFilterValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getPayItems = async () => {
    try {
      const response = await axios.get(BASE_URL + "/mp-getPayItem");
      if (response.data.length > 0) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInformation = async () => {
    let payItems = await getPayItems();
    // payItems = payItems.map((payItem) => payItem.pay_item_name);
    try {
      const response = await axios.get(
        BASE_URL + "/mp-getPayslipsUsingFilter",
        {
          params: filterValues,
        }
      );
      if (response.data.length > 0) {
        if (filterValues.type == "employee") {
          processEmployeeData(response.data, payItems);
        } else {
          console.log("Process Department");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const processEmployeeData = (employeeData, payItems) => {
    const categories = ["Earnings", "Deductions", "Taxes"];
    const dates = [];
    let processedData = [];

    // Extract dates from employee data
    employeeData.forEach((record) => {
      dates.push(record["Date Payment"]);
    });

    // Process each category
    categories.forEach((category) => {
      const filteredPayItems = payItems.filter(
        (payItem) => payItem.pay_item_category === category
      );

      // Process each pay item within the category
      filteredPayItems.forEach((payItem) => {
        let record = {};
        record["Pay Item"] = payItem.pay_item_name;

        dates.forEach((date) => {
          const payslipData = employeeData.filter(
            (data) => data["Date Payment"] === date
          );

          if (payslipData.length > 0) {
            const payables = JSON.parse(payslipData[0]["payables"]);
            record[date] =
              payables[category] && payables[category][payItem.pay_item_name]
                ? payables[category][payItem.pay_item_name]
                : "0.00";
          } else {
            record[date] = "0.00";
          }
        });

        processedData.push(record);
      });
    });

    // Add category totals
    categories.forEach((category) => {
      let totalsRecord = {};
      totalsRecord["Pay Item"] = `Total ${category}`;

      dates.forEach((date) => {
        const payslipData = employeeData.filter(
          (data) => data["Date Payment"] === date
        );

        if (payslipData.length > 0) {
          const totals = JSON.parse(payslipData[0]["totals"]);
          totalsRecord[date] = totals[category] ? totals[category] : "0.00";
        } else {
          totalsRecord[date] = "0.00";
        }
      });

      processedData.push(totalsRecord);
    });

    // Add net pay
    let netPayRecord = { "Pay Item": "Net Pay" };

    dates.forEach((date) => {
      const payslipData = employeeData.filter(
        (data) => data["Date Payment"] === date
      );

      if (payslipData.length > 0) {
        netPayRecord[date] = payslipData[0].net_salary
          ? payslipData[0].net_salary.toFixed(2)
          : "0.00";
      } else {
        netPayRecord[date] = "0.00";
      }
    });

    processedData.push(netPayRecord);

    setTransformedData(processedData);
  };

  return (
    <>
      <div className="mt-10 p-5 w-full rounded-[15px] bg-white">
        <div className="w-full items-center gap-4">
          <div className="flex flex-row gap-2 items-end">
            <div className="w-[400px]">
              <label>
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Filter By:
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  {/* 1st Filter */}
                  <select
                    className="p-2 w-26 border rounded-lg h-12"
                    value={filterValues.type}
                    name="type"
                    onChange={(e) => {
                      filterTypeChange(e);
                    }}
                  >
                    <option value="" defaultValue>
                      Select Value
                    </option>
                    <option value="department">Department</option>
                    <option value="employee">Employee</option>
                  </select>

                  {/* 2nd Filter with Conditional Options */}
                  <select
                    ref={typeOption}
                    className="p-2 w-26 border rounded-lg w-72"
                    name="option"
                    onChange={(e) => {
                      filterOptionChange(e);
                    }}
                  >
                    <option value="">Select an Option</option>
                    {filterValues.type === "department" &&
                    departments &&
                    departments.length > 0
                      ? departments.map((row) => (
                          <option key={row.dept_id} value={row.dept_id}>
                            {row.dept_name}
                          </option>
                        ))
                      : filterValues.type === "employee" &&
                        employees &&
                        employees.length > 0
                      ? employees.map((row) => (
                          <option key={row.emp_id} value={row.emp_id}>
                            {`${row.s_name}, ${row.f_name}`}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </label>
            </div>

            <div className="flex flex-row gap-2">
              <label className="form-control w-40">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Date From
                  </span>
                </div>
                <input
                  ref={dateFromRef}
                  type="date"
                  className="input input-bordered w-full box-shadow-none"
                  name="from"
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                />
              </label>

              <label className="form-control w-40">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Date To
                  </span>
                </div>
                <input
                  ref={dateToRef}
                  type="date"
                  className="input input-bordered w-full"
                  name="to"
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                />
              </label>
            </div>
            <div className="flex flex-row gap-2 ml-auto" id="button">
              <button
                className="w-32 h-12 flex bg-[#666A40] items-center justify-center fill-[#f7f7f7] text-white rounded-md hover:bg-[#f7f7f7] hover:fill-[#666A40] hover:text-[#666A40] hover:border-2 hover:border-[#666A40]"
                onClick={fetchInformation}
              >
                Display
              </button>
              <button
                className="w-32 h-12 flex bg-[#666A40] items-center justify-center fill-[#f7f7f7] text-white rounded-md hover:bg-[#f7f7f7] hover:fill-[#666A40] hover:text-[#666A40] hover:border-2 hover:border-[#666A40]"
                // onClick={() => handleDownloadClick(row)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path>
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="my-5 w-full overflow-auto border">
          <table>
            <tr className="text-right whitespace-nowrap">
              {transformedData &&
                transformedData.length > 0 &&
                Object.keys(transformedData[0]).map((key, index) =>
                  index === 0 ? (
                    <td className="text-left " key={key}>
                      {key}
                    </td>
                  ) : (
                    <td className="p-2" key={key}>
                      {moment(key).format("MMM DD, YYYY")}
                    </td>
                  )
                )}
            </tr>

            {transformedData &&
              transformedData.length > 0 &&
              transformedData.map((data) => (
                <tr className="text-right whitespace-nowrap">
                  {Object.keys(data).map((column, index) =>
                    index === 0 ? (
                      <td className="text-left">{data[column]}</td>
                    ) : (
                      <td>{data[column]}</td>
                    )
                  )}
                </tr>
              ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default HistoricalPayrunTable;
