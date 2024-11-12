// Imports
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const GetPayrollNotifRecordInfo = async (empID) => {
  try {
    const result = await axios.get(
      BASE_URL + `/mp-cu-GetPayrollNotifRecordInfo/${empID}`
    );
    if (result.data.length > 0) {
      return result.data;
    }
    return [];
  } catch (error) {
    return "ERROR: " + error;
  }
};

export const CreatePayrollNotificationDraft = async (payrollNotifList) => {
  try {
    const result = await axios.post(
      BASE_URL + `/mp-cu-CreatePayrollNotifDraft`,
      payrollNotifList
    );
    return result;
  } catch (error) {
    return "ERROR: " + error;
  }
};
