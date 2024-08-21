import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  checkCategoryName,
  checkPayItem,
  showAlert,
} from "../../assets/global.js";

function AddForm(props) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let response;
  const data = {
    name: "",
    category: "",
    type: "",
    group: "",
    tag_1601c: "",
  };

  const [payItem, setPayItem] = useState(data);
  const [errors, setErrors] = useState(data);

  //toggle button for submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //checks if the form is valid
    if (await isFormValid()) {
      //call the add function
      addPayItem();
    }
  };

  const addPayItem = async () => {
    let status = "";
    let message = "";
    try {
      response = await axios.post(BASE_URL + "/mp-addPayItem", payItem);
      if (response.status === 200) {
        props.fetchPayItems();
        document.getElementById("add-form").close();
        status = "success";
        message = "Record was added successfully.";
        resetForm();
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

  const resetForm = () => {
    setPayItem(data);
  };

  return (
    <>
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

      <dialog id="add-form" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col gap-4">
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
              <select
                className={`select select-bordered w-full ${
                  errors.category && `input-error`
                }`}
                name="category"
                value={payItem.category}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              >
                <option value="">Select Option</option>
                <option value="Earnings">Earnings</option>
                <option value="Taxes">Taxes</option>
                <option value="Deductions">Deductions</option>
              </select>
              {/* <input
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
                <option>Taxes</option>
                <option>Deductions</option>
              </datalist> */}
              {errors.category && (
                <span className="text-[12px] text-red-500">
                  {errors.category}
                </span>
              )}
            </div>
          </div>

          {/* Type */}
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full">
              <div className="label">
                <span className="label-text">
                  Type<span className="text-red-500"> *</span>
                </span>
              </div>
              <select
                className="select select-bordered w-full"
                name="type"
                value={payItem.type}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              >
                <option value="">Select Option</option>
                <option value="Fixed">Fixed</option>
                <option value="Calculated">Calculated</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>

          {/* Group */}
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full">
              <div className="label">
                <span className="label-text">
                  Group<span className="text-red-500"> *</span>
                </span>
              </div>
              <select
                className="select select-bordered w-full"
                name="group"
                value={payItem.group}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              >
                <option value="">Select Option</option>
                <option value="Taxable">Taxable</option>
                <option value="Non-Taxable">Non-Taxable</option>
                <option value="Pre-Tax Deduction">Pre-Tax Deduction</option>
                <option value="Taxes">Taxes</option>
                <option value="Post-Tax Deduction">Post-Tax Deduction</option>
                <option value="Post-Tax Addition">Post-Tax Addition</option>
                <option value="Info Only">Info Only</option>
              </select>
            </div>
          </div>

          {/* 1601 C */}
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full">
              <div className="label">
                <span className="label-text">
                  1601C Tag<span className="text-red-500"> *</span>
                </span>
              </div>
              <select
                className="select select-bordered w-full"
                name="tag_1601c"
                value={payItem.tag_1601c}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              >
                <option value="">Select Option</option>
                <option value="SSS, GSIS, PHIC, HDMF Mandatory Contribution, etc.">
                  SSS, GSIS, PHIC, HDMF Mandatory Contribution, etc.
                </option>
                <option value="13th Month Pay and Other Benefits">
                  13th Month Pay and Other Benefits
                </option>
                <option value="De Minimis Benefits">De Minimis Benefits</option>
                <option value="Other Non-taxable Compensation">
                  Other Non-taxable Compensation
                </option>
                <option value="Taxable Compensation not subject to w/tax other than MWEs">
                  Taxable Compensation not subject to w/tax other than MWEs
                </option>
                <option value="Net Taxable Compensation">
                  Net Taxable Compensation
                </option>
                <option value="Total Taxes Withheld">
                  Total Taxes Withheld
                </option>
                <option value="Excluded">Excluded</option>
              </select>
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
        <dialog>
          <div id="add-column" className="modal w-72 bg-black"></div>
        </dialog>
      </dialog>
    </>
  );
}

export default AddForm;
