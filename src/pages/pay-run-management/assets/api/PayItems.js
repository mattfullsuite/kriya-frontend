// Imports
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// region GET PAY ITEMS
export const GetPayItems = async () => {
  try {
    const result = await axios.get(BASE_URL + "/mp-getPayItem");
    if (result.data.length > 0) {
      return result.data;
    }
    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
// endregion
