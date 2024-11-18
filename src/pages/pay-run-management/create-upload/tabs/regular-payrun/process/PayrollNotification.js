// imports
import moment from "moment";
import {
  GetPayrollNotifRecordInfo,
  CreatePayrollNotificationDraft,
} from "../AxiosFunctions";

export const ComputePayrollNotif = async (
  uploadedPayrollNotif,
  additionalPayItem
) => {
  const employeeRecords = await getEmployeeInfo(
    uploadedPayrollNotif,
    additionalPayItem
  );
  return employeeRecords;
};

const getEmployeeInfo = async (empRecords, additionalPayItem) => {
  if (empRecords.length === 0) {
    return;
  }
  const employeeList = [];
  for (const record of empRecords) {
    const data = (await GetPayrollNotifRecordInfo(record["Employee ID"]))[0];
    const newEmpInfo = {};
    // Asssign Values
    newEmpInfo["Employee ID"] = record["Employee ID"];
    newEmpInfo["Email"] = data["Email"];
    newEmpInfo["Last Name"] = data["Last Name"];
    newEmpInfo["First Name"] = data["First Name"];
    newEmpInfo["Middle Name"] = data["Middle Name"];
    newEmpInfo["Job Title"] = data["Job Title"];
    newEmpInfo["Hire Date"] = moment(data["Hire Date"]).format("YYYY-MM-DD");
    newEmpInfo["Basic Pay"] =
      data["Basic Pay"] / data["Monthly Payroll Frequency"];
    // Computations
    newEmpInfo["Night Differential"] = computeNightDifferential(
      record["Night Differential (Hours)"],
      data["Basic Pay"],
      data["Monthly Working Days"]
    );
    newEmpInfo["Special Holiday Premium Pay"] = computeSpecialHolidayPremiumPay(
      record["Special Holiday (Hours)"],
      data["Basic Pay"],
      data["Monthly Working Days"]
    );
    newEmpInfo["Regular Holiday Premium Pay"] = computeRegularHolidayPremiumPay(
      record["Regular Holiday (Hours)"],
      data["Basic Pay"],
      data["Monthly Working Days"]
    );
    newEmpInfo["Regular OT"] = computeRegularOT(
      record["Regular OT (Hours)"],
      data["Basic Pay"],
      data["Monthly Working Days"]
    );
    newEmpInfo["Special Holiday OT"] = computeSpecialHolidayOT(
      record["Special Holiday OT (Hours)"],
      data["Basic Pay"],
      data["Monthly Working Days"]
    );
    newEmpInfo["Regular Holiday OT"] = computeRegularHolidayOT(
      record["Regular Holiday OT (Hours)"],
      data["Basic Pay"],
      data["Monthly Working Days"]
    );
    newEmpInfo["Rest Day OT"] = computeRestDayOT(
      record["Rest Day OT (Hours)"],
      data["Basic Pay"],
      data["Monthly Working Days"]
    );
    newEmpInfo["PTO Conversion"] = computePTOConversion(
      record["PTO Conversion (Days)"],
      data["Basic Pay"],
      data["Monthly Working Days"]
    );

    newEmpInfo["Absences"] = computeAbsences(
      record["Absences (Days)"],
      data["Basic Pay"],
      data["Monthly Working Days"]
    );
    newEmpInfo["Undertime"] = computeUndertime(
      record["Undertime/Tardiness (Hours)"],
      data["Basic Pay"],
      data["Monthly Working Days"]
    );

    if (additionalPayItem.length > 0) {
      additionalPayItem.forEach((item) => {
        newEmpInfo[item] = record[item];
      });
    }

    employeeList.push(newEmpInfo);
  }
  return employeeList;
};

const computeAbsences = (days, basicPay, numWorkDays) => {
  return -1 * (days * (basicPay / numWorkDays)).toFixed(2);
};
const computeUndertime = (hours, basicPay, numWorkDays) => {
  return -1 * (hours * (basicPay / numWorkDays / 8)).toFixed(2);
};
const computeSpecialHolidayPremiumPay = (hours, basicPay, numWorkDays) => {
  return (hours * (basicPay / numWorkDays / 8) * 0.3).toFixed(2);
};
const computeRegularHolidayPremiumPay = (hours, basicPay, numWorkDays) => {
  return (hours * (basicPay / numWorkDays / 8)).toFixed(2);
};
const computeRegularOT = (hours, basicPay, numWorkDays) => {
  return (hours * (basicPay / numWorkDays / 8) * 1.25).toFixed(2);
};
const computeSpecialHolidayOT = (hours, basicPay, numWorkDays) => {
  return (hours * (basicPay / numWorkDays / 8) * 1.3 * 1.25).toFixed(2);
};
const computeRegularHolidayOT = (hours, basicPay, numWorkDays) => {
  return (hours * (basicPay / numWorkDays / 8) * 2.25).toFixed(2);
};
const computeRestDayOT = (hours, basicPay, numWorkDays) => {
  return (hours * (basicPay / numWorkDays / 8) * 1.3).toFixed(2);
};
const computeNightDifferential = (hours, basicPay, numWorkDays) => {
  return (hours * (basicPay / numWorkDays / 8) * 0.1).toFixed(2);
};
const computePTOConversion = (days, basicPay, numWorkDays) => {
  return (days * (basicPay / numWorkDays)).toFixed(2);
};
export const checkHeaders = (uploadedHeaders, payItems) => {
  const requiredHeaders = [
    "Employee ID",
    "Night Differential (Hours)",
    "Absences (Days)",
    "Undertime/Tardiness (Hours)",
    "Special Holiday (Hours)",
    "Regular Holiday (Hours)",
    "Regular OT (Hours)",
    "Special Holiday OT (Hours)",
    "Regular Holiday OT (Hours)",
    "Rest Day OT (Hours)",
    "PTO Conversion (Days)",
  ];
  const payItemNames = payItems.map((item) => item.pay_item_name);

  // Arrays to collect missing headers
  const missingRequiredHeaders = [];
  const missingPayItems = [];
  // Array to collect additional pay item header
  const additionalPayItem = [];

  // Check for missing required headers
  requiredHeaders.forEach((header) => {
    if (!uploadedHeaders.includes(header)) {
      missingRequiredHeaders.push(header);
    }
  });

  if (missingRequiredHeaders.length === 0) {
    // Check for missing pay items
    uploadedHeaders.forEach((header) => {
      if (!requiredHeaders.includes(header) && !payItemNames.includes(header)) {
        missingPayItems.push(header);
      }
    });
    if (missingPayItems.length === 0) {
      uploadedHeaders.forEach((header) => {
        if (
          !requiredHeaders.includes(header) &&
          payItemNames.includes(header)
        ) {
          additionalPayItem.push(header);
        }
      });
    }
  }

  return {
    requiredHeaders: missingRequiredHeaders,
    payItems: missingPayItems,
    additionalPayItem: additionalPayItem,
  };
};

export const SavePayrollNotifDraft = async (
  recordList,
  payItems,
  datePeriod
) => {
  const payItemLookup = payItems.reduce((lookup, item) => {
    lookup[item.pay_item_name] = item.pay_items_id;
    return lookup;
  }, {});

  const transformedList = [];

  recordList.forEach((record) => {
    const transformedData = Object.keys(record)
      .filter((key) => payItemLookup[key])
      .map((key) => ({
        empID: record["Employee ID"],
        payItemID: payItemLookup[key],
        amount: record[key],
      }));
    transformedData.forEach((data) => {
      if (data.amount === 0) return;
      transformedList.push(data);
    });
  });

  const result = await CreatePayrollNotificationDraft({
    recordList: transformedList,
    datePeriod: datePeriod,
  });
  return result;
};

export const ProcessPayrollNotifDraft = (payrollData, payItems) => {
  // Group payroll entries by Employee ID
  const payrollByEmployee = payrollData.reduce((acc, entry) => {
    const empId = entry["Employee ID"];
    if (!acc[empId]) acc[empId] = [];
    acc[empId].push(entry);
    return acc;
  }, {});

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Process each employee's payroll entries
  return Object.values(payrollByEmployee).map((entries) => {
    const firstEntry = entries[0]; // Assuming all entries have the same employee details

    // Initialize payables categories without initial value for Basic Pay
    const payables = {
      Earnings: {},
      Deductions: {},
      Taxes: {},
    };

    // Map pay items from the payItems array
    payItems.forEach((item) => {
      const category = item.pay_item_category;
      const name = item.pay_item_name;

      if (category === "Earnings") {
        payables.Earnings[name] = 0;
      } else if (category === "Deductions") {
        payables.Deductions[name] = 0;
      } else if (category === "Taxes") {
        payables.Taxes[name] = 0;
      }
    });

    // Aggregate amounts for each pay item
    entries.forEach((entry) => {
      const matchedItem = payItems.find(
        (item) => item.pay_items_id === parseInt(entry.pay_item_id)
      );
      if (matchedItem) {
        const { pay_item_name, pay_item_category } = matchedItem;

        if (pay_item_category === "Earnings") {
          payables.Earnings[pay_item_name] =
            (payables.Earnings[pay_item_name] || 0) + entry.amount;
        } else if (pay_item_category === "Deductions") {
          payables.Deductions[pay_item_name] =
            (payables.Deductions[pay_item_name] || 0) + entry.amount;
        } else if (pay_item_category === "Taxes") {
          payables.Taxes[pay_item_name] =
            (payables.Taxes[pay_item_name] || 0) + entry.amount;
        }
      }
    });

    // Calculate totals
    const totals = {
      Earnings: Object.values(payables.Earnings).reduce(
        (sum, val) => sum + val,
        0
      ),
      Deductions: Object.values(payables.Deductions).reduce(
        (sum, val) => sum + val,
        0
      ),
      Taxes: Object.values(payables.Taxes).reduce((sum, val) => sum + val, 0),
    };
    const netSalary = totals.Earnings + totals.Deductions + totals.Taxes;

    // Construct final output structure for each employee
    return {
      "Date From": formatDate(firstEntry.date_from),
      "Date Payment": formatDate(firstEntry.date_payment),
      "Date To": formatDate(firstEntry.date_to),
      Email: firstEntry.Email,
      "Employee ID": firstEntry["Employee ID"],
      "First Name": firstEntry["First Name"],
      "Hire Date": formatDate(firstEntry["Hire Date"]),
      "Job Title": firstEntry["Job Title"],
      "Last Name": firstEntry["Last Name"],
      "Middle Name": firstEntry["Middle Name"],
      "Net Salary": parseFloat(netSalary.toFixed(2)),
      "Previous Net Pay 1": null,
      "Previous Net Pay 2": null,
      "Previous Net Pay 3": null,
      created_at: `${formatDate(
        new Date()
      )} ${new Date().toLocaleTimeString()}`,
      generated_by: `${firstEntry["First Name"]} ${firstEntry["Last Name"]}`,
      id: parseInt(firstEntry["Employee ID"].split("-")[1]),
      payables: payables,
      source: "Regular Payrun",
      totals: totals,
    };
  });
};
