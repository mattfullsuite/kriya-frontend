import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PIAddForm from "./pay-item/AddForm.jsx";
import PIEditForm from "./pay-item/EditForm.jsx";
import Headings from "../../../components/universal/Headings.jsx";

import Swal from "sweetalert2";

function PayRunSettings() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let response;
  const [userData, setUserData] = useState([]);
  const [payItemsData, setPayItemsData] = useState([]);

  useEffect(() => {
    fetchUserProfile();
    fetchPayItems();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(BASE_URL + "/login");

      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPayItems = async () => {
    try {
      const payitems_res = await axios.get(BASE_URL + "/mp-getPayItem");
      setPayItemsData(payitems_res.data);
      // console.log(payitems_res.data);
    } catch (err) {
      console.log(err);
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

  return (
    <>
      <Headings text={"Payrun Settings"} />

      <div className="mt-10 p-5 w-full h-96 lg:w-1/2 lg:max-h-1/2 bg-white border-2 border-gray-200 border-solid rounded-lg">
        {/* {companyID && dataTable ? ( */}
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
                <th className="w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payItemsData.map((row) => (
                <tr key={row.pay_items_id}>
                  <td>{row.pay_item_name}</td>
                  <td>{row.pay_item_category}</td>
                  <td>
                    <div className="flex justify-between gap-1">
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
                    </div>
                  </td>
                  {/* Add more cells based on your data structure */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PayRunSettings;
