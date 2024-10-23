import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

import {
  createRecord,
  updateRecord,
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
    status: "",
  };

  const [recurringPay, setRecurringPay] = useState(initialValueRP);

  useEffect(() => {
    retrieveAllrecords();
    getEmployeeRecords();
    getPayItemRecords();
    setRecurringPay(initialValueRP);
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
    setRecurringPay({
      id: recordData["ID"],
      empID: recordData["Employee ID"],
      payItemID: recordData["Pay Item ID"],
      totalAmount: recordData["Total Amount"],
      numPayrun: recordData["Number of Payrun"],
      deductionsPerPayrun: recordData["Deduction Per Payrun"],
      dateFrom: moment(recordData["Date Start"]).format("YYYY-MM-DD"),
      dateTo: moment(recordData["Date End"]).format("YYYY-MM-DD"),
      status: recordData["Complete"],
    });
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
  const handleRecurringPayRecord = async (data, action, dialogId) => {
    const buttonIDs = {
      create: "btn-add-submit",
      update: "btn-edit-submit",
    };

    document.getElementById(buttonIDs[action]).disabled = true;
    try {
      const actions = {
        create: createRecord,
        update: updateRecord,
      };

      toast.promise(actions[action](data), {
        pending: {
          render:
            action === "create" ? "Creating Record..." : "Updating Record...",
          className: "pending",
          onOpen: () => {},
        },
        success: {
          render: action === "create" ? "Record Created!" : "Record Updated!",
          className: "success",
          autoClose: 2000,
          onClose: () => {
            retrieveAllrecords();
            document.getElementById(dialogId).close();
            setRecurringPay(initialValueRP);

            document.getElementById(buttonIDs[action]).disabled = false;
          },
        },
        error: {
          render: "Something Went Wrong!",
          autoClose: 5000,
          onClose: () => {
            document.getElementById(buttonIDs[action]).disabled = false;
          },
        },
      });
    } catch (err) {
      console.error(err);
      toast.error(`Something Went Wrong! Error: ${err}`, { autoClose: 3000 });
    }
  };
  const handleOnChange = async (e) => {
    const { name, value } = e.target;

    // Update the state first
    setRecurringPay((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Only trigger computation if totalAmount or numPayrun is changed
    if (name === "totalAmount" || name === "numPayrun") {
      computation(name, value);
    }
  };

  const computation = (name, value) => {
    // Get current values from the state
    const { totalAmount, numPayrun } = recurringPay;

    // Case 1: If totalAmount is entered and numPayrun is present, calculate deductionsPerPayrun
    if (name === "totalAmount" && numPayrun) {
      setRecurringPay((prev) => ({
        ...prev,
        deductionsPerPayrun: value / numPayrun,
      }));
    }

    // Case 2: If numPayrun is entered and totalAmount is present, calculate deductionsPerPayrun
    if (name === "numPayrun" && totalAmount) {
      setRecurringPay((prev) => ({
        ...prev,
        deductionsPerPayrun: totalAmount / value,
      }));
    }
  };

  const closeDialog = (name) => {
    document.getElementById(name).close();
    setRecurringPay(initialValueRP);
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
          handleRecurringPayRecord={handleRecurringPayRecord}
          employeeList={employeeList}
          payItemList={payItemList}
          recurringPay={recurringPay}
          handleOnChange={handleOnChange}
          closeDialog={closeDialog}
        />
        <EditDialog
          handleRecurringPayRecord={handleRecurringPayRecord}
          employeeList={employeeList}
          payItemList={payItemList}
          recurringPay={recurringPay}
          handleOnChange={handleOnChange}
          closeDialog={closeDialog}
        />
      </div>
    </>
  );
};

export default RecurringPay;
