// Imports
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const GetDepartments = async () => {
  try {
    const result = await axios.get(BASE_URL + "/comp-GetDepartments");
    return result.data;
  } catch (err) {
    console.error(err);
  }
};
