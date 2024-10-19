import { useEffect, useState } from "react";
import { getAllRecords } from "./AxiosFunctions";

import Headings from "../../../components/universal/Headings";
import RecurringPayRecords from "./RecurringPayRecords";
import AddDialog from "./DialogAdd";
import EditDialog from "./DialogEdit";

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

  const showEditRecord = (recordData) => {
    document.getElementById(`dialog-edit`).showModal();
  };

  return (
    <>
      <div className="p-5 min-w-[320px] max-w-[1300px]">
        <Headings text={"Recurring Pay Items"} />
        <RecurringPayRecords
          recurringPayList={recurringPayList}
          showAddForm={showAddForm}
          showEditRecord={showEditRecord}
        />
        <AddDialog createRecord={createRecord} />
        <EditDialog />
      </div>
    </>
  );
};

export default RecurringPay;
