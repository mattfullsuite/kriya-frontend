import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllRecords = async () => {
  try {
    const result = await axios.get(BASE_URL + `/rp-GetAllRecurringPay`);
    if (result.data.length > 0) {
      return result.data;
    }
    return [];
  } catch (error) {
    return "ERROR: " + error;
  }
};

export const getCertainRecord = async () => {
  try {
    const result = await axios.get(BASE_URL + ``);
    if (result.data.length > 0) {
      return result.data;
    }
    return [];
  } catch (error) {
    return "ERROR: " + error;
  }
};
