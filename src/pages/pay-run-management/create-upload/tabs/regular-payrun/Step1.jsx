import { useEffect, useRef, useState } from "react";
import moment from "moment";
import axios from "axios";
import UploadPayItems from "./UploadPayItems";

const Step1 = ({
  datePeriod,
  setDatePeriod,
  setContributions,
  divisions,
  setDivisions,
  departments,
  setDepartments,
  generateList,
  uploadButtonState,
  payItems,
  setUploadedData,
  selectedCategory,
  setSelectedCategory,
  selectedCategoryOption,
  setSelectedCategoryOption,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const dropDownCategoryOption = useRef(null);
  const datePickerFrom = useRef(null);
  const datePickerTo = useRef(null);
  const datePickerPayment = useRef(null);

  const contributionSSS = useRef(null);
  const contributionPHIC = useRef(null);
  const contributionHDMF = useRef(null);

  const buttonGenerate = useRef(null);

  useEffect(() => {
    fetchDivision();
    fetchDepartment();
    dropDownCategoryOption.current.disabled = true;

    datePickerFrom.current.disabled = true;
    datePickerTo.current.disabled = true;
    datePickerPayment.current.disabled = true;

    contributionSSS.current.disabled = true;
    contributionPHIC.current.disabled = true;
    contributionHDMF.current.disabled = true;
  }, []);

  useEffect(() => {
    buttonGenerate.current.disabled = !validateDatePeriod(datePeriod);

    contributionSSS.current.disabled = !validateDatePeriod(datePeriod);
    contributionPHIC.current.disabled = !validateDatePeriod(datePeriod);
    contributionHDMF.current.disabled = !validateDatePeriod(datePeriod);
  }, [datePeriod]);

  const fetchDivision = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/comp-GetDivisions`);
      setDivisions(response.data);
    } catch (error) {
      console.error("Error fetching divisions:", error);
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/comp-GetDepartments`);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const onCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);

    if (value) {
      dropDownCategoryOption.current.disabled = false;
    } else {
      dropDownCategoryOption.current.disabled = true;
    }
  };

  const onCategoryOptionChange = (e) => {
    const value = e.target.value;
    setSelectedCategoryOption(value);

    if (value) {
      datePickerFrom.current.disabled = false;
      datePickerTo.current.disabled = false;
      datePickerPayment.current.disabled = false;
    } else {
      datePickerFrom.current.disabled = true;
      datePickerTo.current.disabled = true;
      datePickerPayment.current.disabled = true;
    }
  };

  const onDateChange = (e) => {
    const { name, value } = e.target;
    setDatePeriod((prevState) => ({ ...prevState, [name]: value }));
  };

  const onContributionChange = (e) => {
    const { name } = e.target;
    setContributions((prevContributions) => ({
      ...prevContributions,
      [name]: !prevContributions[name],
    }));
  };

  function validateDatePeriod(datePeriod) {
    // Check if all keys have values
    const allKeysHaveValue = Object.values(datePeriod).every(
      (value) => value !== null && value !== undefined
    );

    // Convert dates to Moment.js objects for comparison
    const fromDate = moment(datePeriod.From);
    const toDate = moment(datePeriod.To);
    const paymentDate = moment(datePeriod.Payment);

    // Compare dates
    const fromLessThanTo = fromDate.isBefore(toDate);
    const paymentGreaterThanOrEqualToTo = paymentDate.isSameOrAfter(toDate);

    // Return true if all conditions are met, false otherwise
    return allKeysHaveValue && fromLessThanTo && paymentGreaterThanOrEqualToTo;
  }

  return (
    <>
      <div className="flex flex-col border-2  border-[#E4E4E4] rounded-[15px] p-5 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* 1st Filter */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium text-sm">Filter</span>
              </div>
              <select
                className="p-2 w-26 border rounded-lg h-12"
                name="type"
                defaultValue=""
                onChange={(e) => {
                  onCategoryChange(e);
                }}
              >
                <option value="" defaultValue>
                  Select Value
                </option>
                <option value="division">Division</option>
                <option value="department">Department</option>
              </select>
            </label>

            {/* 2nd Filter */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium text-sm">
                  {selectedCategory && selectedCategory == "division"
                    ? "Division"
                    : selectedCategory && selectedCategory == "department"
                    ? "Department"
                    : "Option"}
                </span>
              </div>
              <select
                ref={dropDownCategoryOption}
                className="p-2 w-26 border rounded-lg h-12"
                name="type"
                defaultValue=""
                onChange={(e) => {
                  onCategoryOptionChange(e);
                }}
              >
                <option value="">Select Value</option>
                {selectedCategory === "division" && divisions.length > 0
                  ? divisions.map((division) => (
                      <option key={division.div_id} value={division.div_id}>
                        {division.div_name}
                      </option>
                    ))
                  : selectedCategory === "department" && departments.length > 0
                  ? departments.map((department) => (
                      <option
                        key={department.dept_id}
                        value={department.dept_id}
                      >
                        {department.dept_name}
                      </option>
                    ))
                  : null}
              </select>
            </label>
          </div>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium text-sm">Date From</span>
            </div>
            <input
              ref={datePickerFrom}
              type="date"
              className="input input-bordered w-full box-shadow-none"
              name="From"
              onChange={(e) => {
                onDateChange(e);
              }}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium text-sm">Date To</span>
            </div>
            <input
              ref={datePickerTo}
              type="date"
              className="input input-bordered w-full"
              name="To"
              onChange={(e) => {
                onDateChange(e);
              }}
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text font-medium text-sm">
                Payment Date
              </span>
            </div>
            <input
              ref={datePickerPayment}
              type="date"
              className="input input-bordered w-full"
              name="Payment"
              onChange={(e) => {
                onDateChange(e);
              }}
            />
          </label>
          <div className="flex flex-col border-[#E4E4E4] rounded-[15px] bg-white">
            <h1 className="text-base font-bold">Contributions</h1>

            <div className="flex flex-row">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">SSS</span>
                  <input
                    ref={contributionSSS}
                    name="SSS"
                    type="checkbox"
                    className="toggle"
                    onChange={(e) => onContributionChange(e)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">PHIC</span>
                  <input
                    ref={contributionPHIC}
                    name="PHIC"
                    type="checkbox"
                    className="toggle"
                    onChange={(e) => onContributionChange(e)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">HDMF</span>
                  <input
                    ref={contributionHDMF}
                    name="HDMF"
                    type="checkbox"
                    className="toggle"
                    onChange={(e) => onContributionChange(e)}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="mt-auto ml-auto col-span-2">
            <button
              ref={buttonGenerate}
              type="button"
              className="btn bg-[#666A40] mt-auto shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto  mr-2"
              onClick={generateList}
            >
              Generate
            </button>

            <UploadPayItems
              uploadButtonState={uploadButtonState}
              payItems={payItems}
              setUploadedData={setUploadedData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
