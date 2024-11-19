import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PIAddForm from "./pay-item/AddForm.jsx";
import PIEditForm from "./pay-item/EditForm.jsx";
import Headings from "../../../components/universal/Headings.jsx";

import Swal from "sweetalert2";

import MonthlyWorkingDays from "./MonthlyWorkingDays.jsx";
import MonthlyPayrollFrequency from "./MonthlyPayrollFrequency.jsx";

function PayRunSettings() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let response;
  const [userData, setUserData] = useState([]);
  const [payItemsData, setPayItemsData] = useState([]);

  useEffect(() => {
    fetchUserProfile();

    getPayItems();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(BASE_URL + "/login");

      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPayItems = async () => {
    const payItems = await fetchPayItems();
    if (payItems && payItems.length > 0) {
      setPayItemsData(payItems);
    } else {
      await createDefaultPayItems();
      // Retry fetching after creating default pay items
      const newPayItems = await fetchPayItems();
      if (newPayItems && newPayItems.length > 0) {
        setPayItemsData(newPayItems);
      }
    }
  };
  const fetchPayItems = async () => {
    try {
      const result = await axios.get(BASE_URL + "/mp-getPayItem");
      if (result.data.length > 0) {
        setPayItemsData(result.data);
        return result.data;
      } else {
        return [];
      }
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  const createDefaultPayItems = async () => {
    try {
      const result = await axios.post(
        BASE_URL + "/mp-CreateDefaultPayItemsForPH"
      );
      if (result.status !== 200) {
        console.error("Failed to Create Default Pay Items");
      }
    } catch (err) {
      console.error("Error creating default pay items:", err);
    }
  };

  const toggleDelete = (rowID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#Cc0202",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        //delete pay item
        deletePayItem(rowID);
      }
    });
  };

  const deletePayItem = async (recordID) => {
    let status = "";
    let message = "";

    try {
      response = await axios.delete(BASE_URL + `/mp-deletePayItem/${recordID}`);
      if (response.status === 200) {
        status = "success";
        message = "Record deleted successfully!";

        fetchPayItems();
      } else {
        console.error("Failed to delete record");
        status = "error";
        message = "Failed to delete record";
      }
    } catch (error) {
      console.error("Error viewing accounts: ", error);
      status = "error";
      message = "Failed to delete record";
    } finally {
      showAlert(status, message);
    }
  };

  const showAlert = (status, title) => {
    Swal.fire({
      icon: status,
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const defaultPayItems = [
    "Basic Pay",
    "Night Differential",
    "Regular OT",
    "Regular Holiday OT",
    "Special Holiday OT",
    "Rest Day OT",
    "Special Holiday Premium Pay",
    "Regular Holiday Premium Pay",
    "13th Month Bonus - Taxable",
    "13th Month Bonus - Non-Taxable",
    "Absences",
    "Undertime / Tardiness",
    "Undertime",
    "Tardiness",
    "SSS (EE)",
    "HDMF (EE)",
    "PHIC (EE)",
    "SSS Provident Fund (EE)",
    "SSS Loan",
    "HDMF Loan",
    "Salary Loan Repayment",
    "SSS (ER)",
    "SSS (ECC)",
    "PHIC (ER)",
    "HDMF (ER)",
    "SSS Provident Fund (ER)",
    "Tax Withheld",
    "Tax Refund",
  ];

  return (
    <>
      <div className="p-5">
        <Headings text={"Payrun Settings"} />

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-2">
          <div className="lg:col-span-2 xl:col-span-2 p-5 w-full h-[500px] bg-white border-2 border-gray-200 border-solid rounded-lg">
            <div className="flex justify-between gap-2">
              <div className="flex w-32 h-12 justify-center items-center">
                <h1 className="text-2xl font-bold">Pay Items</h1>
              </div>
              <div className="w-fit flex items-end ">
                <PIAddForm fetchPayItems={() => fetchPayItems()}></PIAddForm>
              </div>
            </div>
            <div className="mt-5 h-4/5 overflow-auto">
              <table border="1" className="table ">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Group</th>
                    <th>1601C Tag</th>
                    <th className="w-40">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payItemsData.map((row) => (
                    <tr key={row.pay_items_id}>
                      <td>{row.pay_item_name}</td>
                      <td>{row.pay_item_category}</td>
                      <td>{row.pay_item_type}</td>
                      <td>{row.pay_item_group}</td>
                      <td>{row.pay_item_1601c_tag}</td>
                      <td>
                        <div className="flex justify-between gap-1">
                          {!defaultPayItems.includes(row.pay_item_name) && (
                            <>
                              <PIEditForm
                                payItemID={row.pay_items_id}
                                payItemData={row}
                                fetchPayItems={() => fetchPayItems()}
                              ></PIEditForm>
                              <button
                                onClick={() => toggleDelete(row.pay_items_id)}
                                className="btn btn-sm btn-danger bg-[#Cc0202] shadow-md px-4 text-white hover:bg-[#Cc0202] hover:opacity-60 w-12"
                              >
                                <svg
                                  width="13"
                                  height="14"
                                  viewBox="0 0 13 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.4006 6.59681V12.6255C10.4006 12.838 10.2445 13.0103 10.0518 13.0103H2.60939C2.41672 13.0103 2.26053 12.838 2.26053 12.6255V6.59681M5.16771 10.4449V6.59681M7.49345 10.4449V6.59681M11.5635 4.0312H8.65633M8.65633 4.0312V1.85063C8.65633 1.6381 8.50016 1.46582 8.30747 1.46582H4.3537C4.16103 1.46582 4.00484 1.6381 4.00484 1.85063V4.0312M8.65633 4.0312H4.00484M1.09766 4.0312H4.00484"
                                    stroke="white"
                                    stroke-width="1.95694"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-1 justify-between gap-2 lg:grid lg:grid-cols-2 xl:col-span-2 ">
            <MonthlyWorkingDays />
            <MonthlyPayrollFrequency />
          </div>
        </div>
      </div>
    </>
  );
}

export default PayRunSettings;
