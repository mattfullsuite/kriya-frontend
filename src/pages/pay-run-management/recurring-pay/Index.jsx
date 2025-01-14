import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

import {
  createRecord,
  updateRecord,
  getAllRecords,
  getEmployeeRecords,
  getEmployeeList,
  getPayItemList,
} from "./AxiosFunctions";

import Headings from "../../../components/universal/Headings";
import RecurringPayRecords from "./RecurringPayRecords";
import AddDialog from "./DialogAdd";
import EditDialog from "./DialogEdit";

const RecurringPay = ({ empID = "" }) => {
  const [recurringPayList, setRecurringPayList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [payItemList, setPayItemList] = useState([]);

  const initialValueRP = {
    empID: "",
    payItemID: "",
    amount: "",
    repeated: false,
    dateFrom: "",
    dateTo: "",
  };

  const [recurringPay, setRecurringPay] = useState(initialValueRP);
  useEffect(() => {
    if (empID == "") {
      retrieveAllRecords();
    } else {
      retrieveEmployeeRPRecords(empID);
    }
    retrieveEmployeeList();
    getPayItemRecords();
    setRecurringPay(initialValueRP);
  }, []);

  const retrieveAllRecords = async () => {
    const retrievedList = await getAllRecords();
    if (retrievedList.length > 0) {
      setRecurringPayList(retrievedList);
    }
  };

  const retrieveEmployeeRPRecords = async () => {
    const retrievedList = await getEmployeeRecords(empID);
    console.log(retrievedList);
    if (retrievedList.length > 0) {
      setRecurringPayList(retrievedList);
    }
  };

  const showAddForm = (empID) => {
    setRecurringPay((prev) => ({ ...prev, empID: empID }));
    document.getElementById(`dialog-add`).showModal();
  };

  const showEditRecord = (recordData) => {
    setRecurringPay({
      id: recordData["ID"],
      empID: recordData["Employee ID"],
      payItemID: recordData["Pay Item ID"],
      amount: recordData["Amount"],
      repeated: recordData["Repeated"],
      dateFrom: moment(recordData["Date Start"]).format("YYYY-MM-DD"),
      dateTo: moment(recordData["Date End"]).format("YYYY-MM-DD"),
    });
    document.getElementById(`dialog-edit`).showModal();
  };

  const retrieveEmployeeList = async () => {
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
    if (data.repeated == true) {
      data.dateFrom = "";
      data.dateTo = "";
    }
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
            if (empID == "") {
              retrieveAllRecords();
            } else {
              retrieveEmployeeRPRecords(empID);
            }
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
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRecurringPay((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setRecurringPay((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const closeDialog = (name) => {
    document.getElementById(name).close();
    setRecurringPay(initialValueRP);
  };

  return (
    <>
      <div className={`${empID ? "p-0" : "p-5"} min-w-[320px] max-w-[1300px]"`}>
        {!empID && <Headings text={"Recurring Pay Items"} />}
        <RecurringPayRecords
          recurringPayList={recurringPayList}
          showAddForm={showAddForm}
          showEditRecord={showEditRecord}
          empID={empID}
        />
        <AddDialog
          handleRecurringPayRecord={handleRecurringPayRecord}
          employeeList={employeeList}
          payItemList={payItemList}
          recurringPay={recurringPay}
          handleOnChange={handleOnChange}
          closeDialog={closeDialog}
          empID={empID}
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
