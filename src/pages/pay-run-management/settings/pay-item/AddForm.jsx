import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  checkCategoryName,
  checkPayItem,
  showAlert,
} from "../../assets/global.js";
import DataTable from "react-data-table-component";

function AddForm(props) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let response;
  const data = {
    name: "",
    category: "",
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
    const newData = appendTable();
    console.log("New Data", newData);

    try {
      response = await axios.post(BASE_URL + "/mp-addPayItem", newData);
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

  // Computation Table

  const [computationTableData, setComputationTableData] = useState([]);
  const [columnName, setColumnName] = useState("");
  const resetForm = () => {
    setPayItem(data);
    setComputationTableData([]);
    setComputationTableColumns(defaultColumns);
    setColumnName("");
  };

  const appendTable = () => {
    // Append computationTableData to payItem
    const updatedPayItem = {
      ...payItem,
      computationTable: computationTableData,
    };
    return updatedPayItem;
  };

  const defaultColumns = [
    {
      name: "",
      selector: "",
      cell: (row, rowIndex) => {
        return (
          <button
            onClick={() => {
              // console.log("Computation Table", computationTableData);
              // setComputationTableData((prevData) => {
              //   console.log("rowIndex", rowIndex);

              //   prevData = prevData.filter((value, index) => {
              //     if (index != rowIndex) {
              //       console.log("index", index);
              //       return true;
              //     }
              //     // return index != rowIndex;
              //   });
              //   return prevData;
              // });
              deleteRow(row, rowIndex);
            }}
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
                strokeWidth="1.95694"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        );
      },
      width: "60px",
    },
    {
      name: "Range",
      selector: (row) => row["Range"],
      cell: (row, rowIndex) => {
        return (
          <input
            rowIndex={rowIndex}
            className="px-2 h-8 border w-44"
            type="text"
            name="Range"
            onChange={(e) =>
              handleTableValueChange(e.target.name, e.target.value, rowIndex)
            }
          />
        );
      },
      width: "160px",
    },
  ];
  const [computationTableColumns, setComputationTableColumns] =
    useState(defaultColumns);

  const computationTable = useRef(null);

  const handleCheckBox = () => {
    if (computationTable.current.classList.contains("hidden")) {
      computationTable.current.classList.remove("hidden");
    } else {
      computationTable.current.classList.add("hidden");
    }
  };

  const handleColumnNameChange = (value) => {
    setColumnName(value);
  };

  const addColumns = (value) => {
    if (value != "" && value != undefined && value != null) {
      const oldValue = computationTableData;
      const newValue = computationTableData.splice(1, 0);
      setComputationTableColumns((prevComputationTableColumns) => [
        ...prevComputationTableColumns,
        {
          name: value,
          selector: (row) => row[value],
          cell: (row, rowIndex) => {
            return (
              <input
                rowIndex={rowIndex}
                className="px-2 h-8 border w-48"
                type="text"
                name={value}
                onChange={(e) =>
                  handleTableValueChange(
                    e.target.name,
                    e.target.value,
                    rowIndex
                  )
                }
              />
            );
          },
          width: "160px",
        },
      ]);

      // if (computationTableData.length > 0) {
      //   computationTableData.forEach((item) => {
      //     item[value] = "";
      //   });
      // }
    }
  };

  const addRow = () => {
    setComputationTableData((prevComputationTable) => [
      ...prevComputationTable,
      {},
    ]);
  };

  const deleteRow = (row, index, table) => {
    console.log("Row: ", row);
    console.log("Index: ", index);
    const oldValue = computationTableData;
    console.log("Old Value", oldValue);
    const newValue = oldValue.filter((item) => item.index != index);
    console.log("New Value", newValue);
    setComputationTableData(newValue);
  };

  const handleTableValueChange = (name, value, rowIndex) => {
    setComputationTableData((prevData) => {
      prevData[rowIndex] = { ...prevData[rowIndex], [name]: value };
      return prevData;
    });
  };

  useEffect(() => {
    console.log(computationTableData);
  }, [computationTableData]);

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

          {/* Computation Table */}
          <div className="p-2 w-full h-fit rounded-[15px]">
            <label>
              <input type="checkbox" onChange={handleCheckBox} />

              <span className=" pl-2">Computation Table</span>
            </label>
            <div className="hidden" ref={computationTable}>
              <div className="py-2 flex flex-col md:flex-row gap-2">
                <label className="input input-bordered w-2/3 flex items-center gap-0 p-0">
                  <input
                    className="px-2 w-4/5 rounded-r-none"
                    type="text"
                    placeholder="Add Column"
                    value={columnName}
                    onChange={(e) => {
                      handleColumnNameChange(e.target.value);
                    }}
                  />
                  <button
                    className="btn flex w-1/5 bg-[#666A40] rounded-l-none border-none shadow-md text-white text-2xl hover:bg-[#666A40] hover:opacity-60"
                    onClick={() => addColumns(columnName)}
                  >
                    +
                  </button>
                </label>
                <button
                  className="btn flex w-full md:w-1/3 bg-[#666A40] shadow-md text-white hover:bg-[#666A40] hover:opacity-60"
                  onClick={() => addRow()}
                >
                  + Add Row
                </button>
              </div>
              <DataTable
                className="border h-72 overflow-y-auto"
                columns={computationTableColumns}
                data={computationTableData}
              />
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
