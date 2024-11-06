import { GetPayrollNotifRecordInfo } from "../AxiosFunctions";

export const ComputePayrollNotif = async (uploadedPayrollNotif, payItems) => {
  const computedPayItems = {
    "Basic Pay": 0,
    Absences: 0,
    Undertime: 0,
    "Special Holiday Incremental Pay": 0,
    "Regular Holiday Incremental Pay": 0,
    "Regular OT": 0,
    "Special Holiday OT": 0,
    "Regular Holiday OT": 0,
    "Rest Day OT": 0,
    "Night Differential": 0,
    "PTO Conversion": 0,
  };
  console.log("Payroll Notif js", uploadedPayrollNotif);
  await getEmployeeInfo(uploadedPayrollNotif);
};

const getEmployeeInfo = async (empRecords) => {
  if (empRecords.length === 0) {
    return;
  }
  console.log("EMP REC", empRecords);
  const employeeList = [];
  for (const record of empRecords) {
    console.log("RECORD:", record);
    // employeeList.push(await getEmployeeInfo(record["Employee ID"]));
  }
  return employeeList;
};

const computeBasicPay = () => {};
const computeAbsences = () => {};
const computeUndertime = () => {};
const computeSpecialHolidayIncrementalPay = () => {};
const computeRegularHolidayIncrementalPay = () => {};
const computeRegularOT = () => {};
const computeSpecialHolidayOT = () => {};
const computeRegularHolidayOT = () => {};
const computeRestDayOT = () => {};
const computeNightDifferential = () => {};
const computePTOConversion = () => {};
