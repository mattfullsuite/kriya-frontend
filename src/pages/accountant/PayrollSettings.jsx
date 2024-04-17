import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PIAddForm from "../../components/accountant/pay-item/AddForm.jsx";
import PIEditForm from "../../components/accountant/pay-item/EditForm.jsx";
import Headings from "../../components/universal/Headings";

import Swal from "sweetalert2";

function PayrollSettings() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  let response;
  const [userData, setUserData] = useState([]);
  const [payItemsData, setPayItemsData] = useState([]);
  //const userData = Cookies.get("userData");
  //const accountID = userData.user[0].emp_id;
  const [companyID, setCompanyID] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [rowSelected, setRowSelected] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);

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
    } catch (err) {
      console.log(err);
    }
  };

  //   const getPayItems = async (value_ID) => {
  //     try {
  //       if (value_ID != null && value_ID != undefined && value_ID != "") {
  //         const token = getToken();
  //         const response = await axios.get(
  //           `/pay-item/view/${value_ID}`
  //         );
  //         const rows = response.data.rows;
  //         // Check if response is not null before updating state
  //         if (rows) {
  //           setDataTable(rows);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error: ", error);
  //     }
  //   };

  //   const editPayItem = (payItemInfo) => {
  //     setSelectedRow(payItemInfo);
  //     setRowSelected(true);
  //   };

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
      <Headings text={"Payroll Settings"} />
      <div className="w-full h-full p-5">
        <div className="mt-5 p-3 w-full h-96 lg:w-1/2 lg:h-1/2 bg-white border-2 border-gray-200 border-solid rounded-lg overflow-x-auto">
          {/* {companyID && dataTable ? ( */}
          <div className="flex justify-between gap-2">
            <div className="flex w-32 h-12 justify-center items-center">
              <h1 className="text-2xl font-bold">Pay Items</h1>
            </div>
            {/* <div className="w-fit flex flex-row gap-2"> */}
            {/* Search Input */}
            {/* <label className="input input-bordered w-72 flex items-center gap-2">
                <input type="text" className="grow w-36" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label> */}
            {/* Add Button/Form */}
            {/* </div> */}
            <div className="w-fit flex items-end ">
              <PIAddForm fetchPayItems={() => fetchPayItems()}></PIAddForm>
            </div>
          </div>

          <table border="1" className="table">
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
                        className="btn btn-sm btn-danger bg-[#Cc0202] shadow-md px-4 text-white hover:bg-[#f7f7f7] hover:text-[#426E80] w-20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  {/* Add more cells based on your data structure */}
                </tr>
              ))}
            </tbody>
          </table>
          {/* //   ) : (
        //     <NoRecordFound />
        //   )} */}
        </div>
      </div>
    </>
  );
}

export default PayrollSettings;
