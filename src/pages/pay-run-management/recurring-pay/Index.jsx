import { useEffect, useState } from "react";
import {
  createRecord,
  getAllRecords,
  getEmployeeList,
  getPayItemList,
} from "./AxiosFunctions";

import Headings from "../../../components/universal/Headings";
import RecurringPayRecords from "./RecurringPayRecords";
import AddDialog from "./DialogAdd";
import EditDialog from "./DialogEdit";

const RecurringPay = () => {
  const [recurringPayList, setRecurringPayList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [payItemList, setPayItemList] = useState([]);

  useEffect(() => {
    retrieveAllrecords();
    getEmployeeRecords();
    getPayItemRecords();
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

  const getEmployeeRecords = async () => {
    const retrievedList = await getEmployeeList();
    if (retrievedList.length > 0) {
      setEmployeeList(retrievedList);
    }
  };

  const getPayItemRecords = async () => {
    const retrievedList = await getPayItemList();
    if (retrievedList.length > 0) {
      setPayItemList(retrievedList);
    }
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
        <AddDialog
          createRecord={createRecord}
          employeeList={employeeList}
          payItemList={payItemList}
        />
        <EditDialog />
      </div>
    </>
  );
};

export default RecurringPay;
