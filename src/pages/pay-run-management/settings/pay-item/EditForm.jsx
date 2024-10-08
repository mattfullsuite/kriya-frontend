import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  checkCategoryName,
  checkPayItem,
  showAlert,
} from "../../assets/global.js";

function EditForm(props) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let response;
  const cols = [];
  let tableData = props.payItemData.computation_table;
  if (tableData == undefined || tableData == null) {
    tableData = [];
  } else {
    tableData = JSON.parse(tableData);
    console.log("Table:", tableData);
    // Object.keys(tableData[0]).map((i) => {
    //   if (i != "Range") {
    //     cols.push(i);
    //   }
    // });
    // console.log("Colunns:", cols);
  }

  const data = {
    id: props.payItemData.pay_items_id,
    name: props.payItemData.pay_item_name,
    category: props.payItemData.pay_item_category,
    type: props.payItemData.pay_item_type,
    group: props.payItemData.pay_item_group,
    tag_1601c: props.payItemData.tag_1601c,
    // computation_table: tableData,
  };
  // console.log("computation table: ", props.payItem.computation_table);
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
      if (response.status === 200) {
        status = "success";
        message = "Record was updated successfully.";
        props.fetchPayItems();
        document
          .getElementById(`edit-form-${props.payItemData.pay_items_id}`)
          .close();
        resetForm();
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

  // Computation Table

  const [computationTableData, setComputationTableData] = useState([]);

  const resetForm = () => {
    setPayItem(data);
    setComputationTableData([]);
  };

  return (
    <>
      <button
        className="btn btn-sm btn-edit  bg-[#666A40] shadow-md px-4 text-white hover:bg-[#666A40] hover:opacity-60 w-12"
        onClick={() =>
          document
            .getElementById(`edit-form-${props.payItemData.pay_items_id}`)
            .showModal()
        }
      >
        <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.46582 13.01H11.9317M6.82774 3.27982L8.47233 1.46582L11.3503 4.64032L9.70573 6.45429M6.82774 3.27982L3.56787 6.87559C3.45883 6.99584 3.39757 7.159 3.39757 7.32908V10.2379H6.03472C6.18891 10.2379 6.33677 10.1704 6.44585 10.0501L9.70573 6.45429M6.82774 3.27982L9.70573 6.45429"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
