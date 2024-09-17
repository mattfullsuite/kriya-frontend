import { useEffect, useRef, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import {
  addCommaAndFormatDecimal,
  addComma,
  formatDecimal,
} from "./../assets/addCommaAndFormatDecimal";
import Select from "react-select";

const HistoricalPayrunTable = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [filterValues, setFilterValues] = useState({
    type: "",
    option: [],
    from: "",
    to: "",
  });
  const [transformedData, setTransformedData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const [typeOption, setTypeOption] = useState(true);
  const dateFromRef = useRef(null);
  const dateToRef = useRef(null);

  const [options, setOptions] = useState(null);
  const selectRef = useRef(null);

  useEffect(() => {
    setTypeOption(true);
    dateFromRef.current.disabled = true;
    dateToRef.current.disabled = true;
  }, []);

  const getDepartments = async () => {
    try {
      const result = await axios.get(BASE_URL + "/comp-GetDepartments");
      setOptions(transformDepartments(result.data, "department"));
    } catch (err) {
      console.error(err);
    }
  };

  const getEmployees = async () => {
    try {
      const result = await axios.get(BASE_URL + "/em-allEmployees");
      setOptions(transformDepartments(result.data, "employee"));
    } catch (err) {
      console.error(err);
    }
  };

  const filterTypeChange = (e) => {
    onValueChange(e);
    if (e.target.value === "department") {
      getDepartments();
      setTypeOption(false);
    } else if (e.target.value === "employee") {
      getEmployees();
      setTypeOption(false);
    } else {
      setTypeOption(true);
      setFilterValues({
        type: "",
        option: [],
        from: "",
        to: "",
      });
    }
    clearSelect();
  };

  const filterOptionChange = (e) => {
    const selectedValues = e.target.value; // This will be an array of selected option values

    // Update the filterValues state with the selected options
    setFilterValues((prevValues) => ({
      ...prevValues,
      option: selectedValues,
    }));

    // Disable the date fields if no options are selected
    if (selectedValues.length === 0) {
      dateFromRef.current.disabled = true;
      dateToRef.current.disabled = true;
      return;
    }

    // Enable the date fields when options are selected
    dateFromRef.current.disabled = false;
    dateToRef.current.disabled = false;
  };

  const clearSelect = () => {
    if (selectRef.current) {
      selectRef.current.clearValue(); // Clear selected values
    }
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
    try {
      const response = await axios.get(
        BASE_URL + "/mp-getPayslipsUsingFilter",
        {
          params: filterValues,
        }
      );

      if (response.data.length > 0) {
        const responseData = response.data;

        if (filterValues.type == "employee") {
          processEmployeeData(responseData, payItems);
        } else if (filterValues.type == "department") {
          processDepartmentData(responseData, payItems);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const processEmployeeData = (employeeData, payItems) => {
    setSelectedOption(
      employeeData[0]["Last Name"] +
        ", " +
        employeeData[0]["First Name"] +
        " " +
        employeeData[0]["Middle Name"] +
        " (" +
        filterValues.from +
        " to " +
        filterValues.to +
        ")"
    );

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

  const processDepartmentData = (employeeData, payItems) => {
    // Set the selected employee information
    setSelectedOption(
      employeeData[0]["dept_name"] +
        " (" +
        filterValues.from +
        " to " +
        filterValues.to +
        ")"
    );

    const categories = ["Earnings", "Deductions", "Taxes"];
    const dates = [];
    let processedData = [];

    // Extract dates from employee data
    employeeData.forEach((record) => {
      if (!dates.includes(record["Date Payment"])) {
        dates.push(record["Date Payment"]);
      }
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
          // Filter employee data by date
          const payslipData = employeeData.filter(
            (data) => data["Date Payment"] === date
          );

          // Sum the amounts for each pay item per date
          const totalAmount = payslipData.reduce((sum, data) => {
            const payables = JSON.parse(data["payables"]);
            const amount =
              payables[category] && payables[category][payItem.pay_item_name]
                ? parseFloat(payables[category][payItem.pay_item_name])
                : 0;
            return sum + amount;
          }, 0);

          record[date] = totalAmount.toFixed(2); // Convert to string with 2 decimals
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

        // Sum the category totals per date
        const totalAmount = payslipData.reduce((sum, data) => {
          const totals = JSON.parse(data["totals"]);
          const amount = totals[category] ? parseFloat(totals[category]) : 0;
          return sum + amount;
        }, 0);

        totalsRecord[date] = totalAmount.toFixed(2);
      });

      processedData.push(totalsRecord);
    });

    // Add net pay
    let netPayRecord = { "Pay Item": "Net Pay" };

    dates.forEach((date) => {
      const payslipData = employeeData.filter(
        (data) => data["Date Payment"] === date
      );

      // Sum net pay per date
      const totalNetPay = payslipData.reduce((sum, data) => {
        const netPay = data.net_salary ? parseFloat(data.net_salary) : 0;
        return sum + netPay;
      }, 0);

      netPayRecord[date] = totalNetPay.toFixed(2);
    });

    processedData.push(netPayRecord);

    setTransformedData(processedData);
  };

  const downloadCSV = (data) => {
    if (!data || data.length === 0) {
      console.error("No data available to download.");
      return;
    }

    // Extract CSV headers from the keys of the first object
    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Add the headers to the CSV
    csvRows.push(headers.join(","));

    // Convert each row of data into a CSV string
    data.forEach((row) => {
      const values = headers.map((header) => `"${row[header] || ""}"`);
      csvRows.push(values.join(","));
    });

    // Create a Blob from the CSV data
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${selectedOption}.csv`);
    document.body.appendChild(link);

    // Trigger the download and remove the link
    link.click();
    document.body.removeChild(link);
  };

  const transformDepartments = (data, type) => {
    if (type == "department") {
      return data.map(({ dept_id, dept_name }) => ({
        value: dept_id,
        label: dept_name,
      }));
    } else {
      return data.map(({ emp_id, s_name, f_name }) => ({
        value: emp_id,
        label: s_name + ", " + f_name,
      }));
    }
  };

  return (
    <>
      <div className="mt-10 w-full  grid">
        <div className="w-full items-center gap-4 p-5 bg-white">
          <div className="flex flex-row gap-2 items-start">
            <div className="w-fit flex flex-row gap-2 items-start">
              <label>
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Filter By:
                  </span>
                </div>
                {/* 1st Filter */}
                <select
                  className="p-2 w-26 border rounded-lg h-10"
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
              </label>
              <label>
                {/* 2nd Filter with Conditional Options */}
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Filter Option:
                  </span>
                </div>
                <Select
                  ref={selectRef}
                  className=" border rounded-lg w-72"
                  name="option"
                  options={options}
                  onChange={(selectedOptions) => {
                    filterOptionChange({
                      target: {
                        value: selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : [],
                      },
                    });
                  }}
                  isClearable
                  isMulti
                  placeholder="Select Options"
                  isDisabled={typeOption}
                />
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
                  className="input input-bordered w-full box-shadow-none h-10"
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
                  className="input input-bordered w-full h-10"
                  name="to"
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                />
              </label>
            </div>
            <div className="flex flex-row gap-2 ml-auto pt-7" id="button">
              <button
                className="w-32 h-12 flex bg-[#666A40] items-center justify-center fill-[#f7f7f7] text-white rounded-md hover:bg-[#f7f7f7] hover:fill-[#666A40] hover:text-[#666A40] hover:border-2 hover:border-[#666A40]"
                onClick={fetchInformation}
              >
                Display
              </button>
              <button
                className="w-32 h-12 flex bg-[#666A40] items-center justify-center fill-[#f7f7f7] text-white rounded-md hover:bg-[#f7f7f7] hover:fill-[#666A40] hover:text-[#666A40] hover:border-2 hover:border-[#666A40]"
                onClick={() => downloadCSV(transformedData)}
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
        {transformedData && transformedData.length > 0 && (
          <div className="my-5 w-full overflow-auto border rounded-xl  bg-white max-h-[800px]">
            <table>
              <tr className="text-right whitespace-nowrap p-2 border-b-4 font-bold border-gray-400">
                {Object.keys(transformedData[0]).map((key, index) =>
                  index === 0 ? (
                    <td
                      className="text-left p-2 sticky top-0 left-0 bg-white z-20"
                      key={key}
                    >
                      {key}
                    </td>
                  ) : (
                    <td className="p-2 sticky top-0 bg-white z-10" key={key}>
                      {moment(key).format("MMM DD, YYYY")}
                    </td>
                  )
                )}
              </tr>

              {transformedData.map((data, rowIndex) => (
                <tr
                  className={`text-right whitespace-nowrap p-2 ${
                    rowIndex === transformedData.length - 1
                      ? "border-t-4 border-gray-400 sticky bottom-0 bg-white z-20"
                      : ""
                  }`}
                >
                  {Object.keys(data).map((column, index) =>
                    index === 0 ? (
                      <td className="text-left p-2 font-medium sticky left-0 bg-white z-10">
                        {data[column]}
                      </td>
                    ) : (
                      <td className="p-2">
                        {addComma(formatDecimal(data[column]))}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default HistoricalPayrunTable;
