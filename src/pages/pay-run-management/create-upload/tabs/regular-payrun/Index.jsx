import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

// Components Import
import DateRangePicker from "./DateRangePicker";
import EmployeeList from "./EmployeeList";

const RegularPayrun = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [datePeriod, setDatePeriod] = useState({
    From: null,
    To: null,
    Payment: null,
  });

  useEffect(() => {
    console.log(datePeriod);
  }, [datePeriod]);

  const generateList = () => {
    console.log("Clicked");
    getPayItems();
  };

  const getEmployeeList = () => {};

  const getPayItems = async () => {
    try {
      const payitems_res = await axios.get(BASE_URL + "/mp-getPayItem");

      console.log(payitems_res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const appendPayItemsToEmployee = () => {};

  return (
    <>
      <div className="mt-10">
        <DateRangePicker
          datePeriod={datePeriod}
          setDatePeriod={setDatePeriod}
          generateList={generateList}
        />
        <EmployeeList />
      </div>
    </>
  );
};

export default RegularPayrun;
