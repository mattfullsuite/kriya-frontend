import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  const initialValueRP = {
    empID: "",
    payItemID: "",
    totalAmount: "",
    numPayrun: "",
    deductionsPerPayrun: "",
    dateFrom: "",
    dateTo: "",
  };

  const [recurringPay, setRecurringPay] = useState(initialValueRP);

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

  const createRecurringPayRecord = async (data) => {
    try {
      toast.promise(createRecord(data), {
        pending: {
          render: "Creating Record...",
          className: "pending",
          onOpen: () => {},
        },
        success: {
          render: "Record Created!",
          className: "success",
          autoClose: 2000,
          onClose: () => {
            retrieveAllrecords();
            document.getElementById("dialog-add").close();
            setRecurringPay(initialValueRP);
          },
        },
        error: {
          render: "Something Went Wrong!",
          autoClose: 5000,
          onClose: () => {},
        },
      });
    } catch (err) {
      console.error(err);
      toast.error(`Something Went Wrong! Error: ${err}`, { autoClose: 3000 });
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
          createRecord={createRecurringPayRecord}
          employeeList={employeeList}
          payItemList={payItemList}
          recurringPay={recurringPay}
          setRecurringPay={setRecurringPay}
        />
        <EditDialog />
      </div>
    </>
  );
};

export default RecurringPay;
