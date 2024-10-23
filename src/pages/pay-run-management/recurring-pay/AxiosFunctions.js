// Imports
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Get all recurring pay records
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

export const createRecord = async (data) => {
  try {
    const result = await axios.post(BASE_URL + `/rp-CreateRecurrringPay`, data);
    return result;
  } catch (error) {
    return "ERROR: " + error;
  }
};

export const updateRecord = async (data) => {
  try {
    const result = await axios.patch(BASE_URL + `/rp-UpdateRecurringPay`, data);
    if (result.status == 200) {
    }
    return [];
  } catch (error) {
    return "ERROR: " + error;
  }
};

export const getEmployeeList = async () => {
  try {
    const result = await axios.get(BASE_URL + `/rp-GetActiveEmployeesRP`);
    if (result.data.length > 0) {
      return result.data;
    }
    return [];
  } catch (error) {
    return "ERROR: " + error;
  }
};

export const getPayItemList = async () => {
  try {
    const result = await axios.get(BASE_URL + `/rp-GetRecurringPayItems`);
    if (result.data.length > 0) {
      return result.data;
    }
    return [];
  } catch (error) {
    return "ERROR: " + error;
  }
};
