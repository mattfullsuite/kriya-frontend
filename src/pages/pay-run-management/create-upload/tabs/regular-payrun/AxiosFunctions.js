// Imports
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
//--------------------Start Of Payroll Notif--------------------
export const GetPayrollNotifRecordInfo = async (empID) => {
  try {
    const result = await axios.get(
      BASE_URL + `/mp-pn-GetPayrollNotifRecordInfo/${empID}`
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
      BASE_URL + `/mp-pn-CreatePayrollNotifDraft`,
      payrollNotifList
    );
    return result;
  } catch (error) {
    return "ERROR: " + error;
  }
};

export const CheckForPayrollNotificationDraft = async (payrollNotifList) => {
  try {
    const result = await axios.post(
      BASE_URL + `/mp-pn-CreatePayrollNotifDraft`,
      payrollNotifList
    );
    return result;
  } catch (error) {
    return "ERROR: " + error;
  }
};

export const DeletePayrollNotificationDraft = async () => {
  try {
    const result = await axios.delete(
      BASE_URL + `/mp-pn-DeletePayrollNotifDraft/:finalize`
    );
    return result;
  } catch (error) {
    console.error("Error:", error);
    return "ERROR: ", error;
  }
};
//--------------------End Of Payroll Notif--------------------

//--------------------Start Of Regular Payrun--------------------

export const DeleteDraftedData = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/mp-deleteDraftedPayslips`);
    return response.status === 200;
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
};
//--------------------End Of Regular Payrun--------------------
