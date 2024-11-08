// imports
import moment from "moment";
import { GetPayrollNotifRecordInfo } from "../AxiosFunctions";

export const ComputePayrollNotif = async (uploadedPayrollNotif) => {
  const newRecords = [];
  const employeeRecords = await getEmployeeInfo(uploadedPayrollNotif);
  console.log("EMP rec:", employeeRecords);
};

const getEmployeeInfo = async (empRecords) => {
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
