import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  checkCategoryName,
  checkPayItem,
  showAlert,
} from "../../../assets/manage-payroll/global.js";

function AddForm(props) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let response;
  const data = {
    name: "",
    category: "",
  };

  const [payItem, setPayItem] = useState(data);
  const [errors, setErrors] = useState(data);

  const addPayItem = async () => {
    let status = "";
    let message = "";

    try {
      response = await axios.post(BASE_URL + "/mp-addPayItem", payItem);
      console.log(payItem);
      if (response.status === 200) {
        setPayItem(data);
        props.fetchPayItems();
        // console.log("after", payItem);
        document.getElementById("add-form").close();
        status = "success";
        message = "Record was added successfully.";
      } else {
        status = "error";
        message = "Error adding the record";
      }
    } catch (error) {
      console.error("Error adding payable: ", error);
      status = "error";
      message = "Error adding the record";
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
      addPayItem();
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
      {/* {props.comp_id && ( */}
      <button
        className="btn bg-[#666A40] hover:bg-[#666A40] hover:opacity-60 shadow-md text-white"
        onClick={() => document.getElementById("add-form").showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add
      </button>
      {/* )} */}

      <dialog id="add-form" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold ">Add Pay Item</h1>
            <button
              className="ml-auto"
              onClick={() => document.getElementById("add-form").close()}
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
                <option>Deductions</option>
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
                className="btn flex w-full bg-[#666A40] shadow-md text-white hover:bg-[#666A40] hover:opacity-60"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <button
                className="btn flex w-full shadow-md"
                onClick={() => document.getElementById("add-form").close()}
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

export default AddForm;
