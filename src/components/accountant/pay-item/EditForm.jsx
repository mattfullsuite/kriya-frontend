import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  checkCategoryName,
  checkPayItem,
  showAlert,
} from "../../../assets/manage-payroll/global.js";

function EditForm(props) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let response;

  const data = {
    id: props.payItemData.pay_items_id,
    name: props.payItemData.pay_item_name,
    category: props.payItemData.pay_item_category,
  };
  const [payItem, setPayItem] = useState(data);
  const [errors, setErrors] = useState({
    name: "",
    category: "",
  });

  const updatePayItem = async () => {
    let status = "";
    let message = "";

    try {
      response = await axios.patch(
        BASE_URL + `/mp-updatePayItem/${payItem.id}`,
        payItem
      );
      console.log(payItem);
      if (response.status === 200) {
        // console.log("TRUE");
        // setPayItem("");
        status = "success";
        message = "Record was updated successfully.";
        props.fetchPayItems();
        document
          .getElementById(`edit-form-${props.payItemData.pay_items_id}`)
          .close();
      } else {
        status = "error";
        message = "Error updating payable.";
      }
    } catch (error) {
      status = "error";
      message = "Error updating payable.";
      console.error("Error updating payable: ", error);
    } finally {
      showAlert(status, message);
    }
  };
  //toggle button for submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //checks if the form is valid
    if (await isFormValid()) {
      //call the add function
      updatePayItem();
    }
  };

  //on change event for inputs
  const handleOnChange = async (e) => {
    const { name, value } = e.target;

    setPayItem({
      ...payItem,
      [name]: value,
    });

    //sets error message for firstname input
    if (name == "name") {
      if (checkPayItem(value) != "") {
        setErrors({
          ...errors,
          name: checkPayItem(value),
        });
      } else {
        setErrors({ ...errors, name: "" });
      }
    }

    //sets error message for middlename input
    if (name == "category") {
      if (checkCategoryName(value) != "") {
        setErrors({
          ...errors,
          category: checkCategoryName(value),
        });
      } else {
        setErrors({ ...errors, category: "" });
      }
    }
  };

  const isFormValid = async () => {
    let newErrors = {};

    if (checkPayItem(payItem.name) != "") {
      newErrors.name = checkPayItem(payItem.name);
    }

    if (checkCategoryName(payItem.category) != "") {
      newErrors.category = checkCategoryName(payItem.category);
    }

    setErrors({ ...errors, ...newErrors });

    return Object.keys(newErrors).length == 0;
  };
  return (
    <>
      <button
        className="btn btn-sm btn-edit bg-[#426E80] shadow-md px-4 text-white hover:bg-[#f7f7f7] hover:text-[#426E80] w-20"
        onClick={() =>
          document
            .getElementById(`edit-form-${props.payItemData.pay_items_id}`)
            .showModal()
        }
      >
        Edit
      </button>

      <dialog
        id={`edit-form-${props.payItemData.pay_items_id}`}
        className="modal modal-bottom sm:modal-middle p-5 rounded-[15px]"
      >
        <div className="modal-box">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold ">Edit Pay Item</h1>
            <button
              className="ml-auto"
              onClick={() =>
                document
                  .getElementById(`edit-form-${props.payItemData.pay_items_id}`)
                  .close()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Name */}
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full">
              <div className="label">
                <span className="label-text">
                  Name<span className="text-red-500"> *</span>
                </span>
              </div>
              <input
                className={`input input-bordered w-full ${
                  errors.name && `input-error`
                }`}
                type="text"
                name="name"
                value={payItem.name}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              {errors.name && (
                <span className="text-[12px] text-red-500">{errors.name}</span>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full">
              <div className="label">
                <span className="label-text">
                  Category<span className="text-red-500"> *</span>
                </span>
              </div>
              <input
                className={`input input-bordered w-full ${
                  errors.category && `input-error`
                }`}
                type="text"
                name="category"
                list="category"
                value={payItem.category}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              <datalist id="category">
                <option>Earnings</option>
                <option>Deduction</option>
              </datalist>
              {errors.category && (
                <span className="text-[12px] text-red-500">
                  {errors.category}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex md:flex-row gap-2 mt-2 justify-end">
            <div className="flex flex-col w-full md:w-auto">
              <button
                className="btn flex w-full bg-[#426E80] shadow-md text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <button
                className="btn flex w-full shadow-md"
                onClick={() =>
                  document
                    .getElementById(
                      `edit-form-${props.payItemData.pay_items_id}`
                    )
                    .close()
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default EditForm;
