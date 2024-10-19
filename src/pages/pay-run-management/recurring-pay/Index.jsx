import { useEffect, useState } from "react";
import { getAllRecords } from "./AxiosFunctions";

import Headings from "../../../components/universal/Headings";
import RecurringPayRecords from "./RecurringPayRecords";
import AddRecurringPay from "./AddRecurringPay";

const RecurringPay = () => {
  const [recurringPayList, setRecurringPayList] = useState([]);

  useEffect(() => {
    retrieveAllrecords();
  }, []);

  const retrieveAllrecords = async () => {
    const retrievedList = await getAllRecords();
    if (retrievedList.length > 0) {
      setRecurringPayList(retrievedList);
    }
  };

  const showAddForm = () => {
    document.getElementById(`dialog-add`).showModal();
  };

  return (
    <>
      <div className="p-5 min-w-[320px] max-w-[1300px]">
        <Headings text={"Recurring Pay Items"} />
        <RecurringPayRecords
          recurringPayList={recurringPayList}
          showAddForm={showAddForm}
        />
        <AddRecurringPay />
      </div>
    </>
  );
};

export default RecurringPay;
