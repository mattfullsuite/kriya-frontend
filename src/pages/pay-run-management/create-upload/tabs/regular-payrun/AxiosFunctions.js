// Imports
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const GetPayrollNotifRecordInfo = async (empID) => {
  try {
    const result = await axios.get(
      BASE_URL + `/rp-GetPayrollNotifRecordInfo/${empID}`
    );
    if (result.data.length > 0) {
      return result.data;
    }
    return [];
  } catch (error) {
    return "ERROR: " + error;
  }
};
