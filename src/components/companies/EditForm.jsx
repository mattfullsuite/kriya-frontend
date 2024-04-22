import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  showAlert,
  checkFirstName,
  checkMiddleName,
  checkLastName,
  checkDateOfBirth,
  checkEmail,
  checkPassword,
  checkAccountType,
  formatDate
} from "../../assets/global";

function EditForm(props) {
  let response;

  const [accountData, setAccountData] = useState({
    email: props.account.email,
    first_name: props.account.first_name,
    middle_name: props.account.middle_name,
    last_name: props.account.last_name,
    date_of_birth: props.account.date_of_birth,
    password: "",
    account_type: props.account.account_type,
  });

  const [errors, setErrors] = useState({
    email: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    password: "",
    account_type: "",
  });



  const updateAccount = async (accountID) => {
    let status = "";
    let message = "";
    try {
      const response = await axios.patch(
        `/account/edit/${accountID}`,
        accountData
      );
      if (response.status === 200) {
        console.log("Record updated successfully!");
        // Additional logic if needed
        // setRowSelected(false);
        // getAccounts();
        document.getElementById(`edit-form-${props.accountID}`).close();
        props.action();
        status = "success";
        message = "Record updated successfully!";
      } else {
        status = "error";
        message = "Failed to update record";
        console.error("Failed to update record");
      }
    } catch (error) {
      status = "error";
      message = "Error updating account";
      console.error("Error updating account: ", error);
    } finally {
      showAlert(status, message);
    }
  };

  //toggle button for submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //checks if the form is valid
    if (await isFormValid()) {
      //call the update function
      updateAccount(props.accountID);
    }
  };

  //on change event for inputs
  const handleOnChange = async (e) => {
    const { name, value } = e.target;

    setAccountData({
      ...accountData,
      [name]: value,
    });

    //sets error message for firstname input
    if (name == "first_name") {
      if (checkFirstName(value) != "") {
        setErrors({
          ...errors,
          first_name: checkFirstName(value),
        });
      } else {
        setErrors({ ...errors, first_name: "" });
      }
    }

    //sets error message for middlename input
    if (name == "middle_name") {
      if (checkMiddleName(value) != "") {
        setErrors({
          ...errors,
          middle_name: checkMiddleName(value),
        });
      } else {
        setErrors({ ...errors, middle_name: "" });
      }
    }

    //sets error message for lastname input
    if (name == "last_name") {
      if (checkLastName(value) != "") {
        setErrors({
          ...errors,
          last_name: checkLastName(value),
        });
      } else {
        setErrors({ ...errors, last_name: "" });
      }
    }

    //sets error message for date of birth input
    if (name == "date_of_birth") {
      if (checkDateOfBirth(value) != "") {
        setErrors({
          ...errors,
          date_of_birth: checkDateOfBirth(value),
        });
      } else {
        setErrors({ ...errors, date_of_birth: "" });
      }
    }

    //sets error message for email input
    if (name == "email") {
      if ((await checkEmail(value, true)) != "") {
        setErrors({
          ...errors,
          email: await checkEmail(value, true),
        });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }

    //sets error message for password input
    if (name == "password") {
      if (checkPassword(value, true) != "") {
        setErrors({
          ...errors,
          password: checkPassword(value, true),
        });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }

    //sets error message for account type select
    if (name == "account_type") {
      if (checkAccountType(value) != "") {
        setErrors({
          ...errors,
          account_type: checkAccountType(value),
        });
      } else {
        setErrors({ ...errors, account_type: "" });
      }
    }
  };

  const isFormValid = async () => {
    let newErrors = {};

    if (checkFirstName(accountData.first_name) != "") {
      newErrors.first_name = checkFirstName(accountData.first_name);
    }

    if (checkMiddleName(accountData.middle_name) != "") {
      newErrors.middle_name = checkMiddleName(accountData.middle_name);
    }

    if (checkLastName(accountData.last_name) != "") {
      newErrors.last_name = checkLastName(accountData.last_name);
    }

    if (checkDateOfBirth(accountData.date_of_birth) != "") {
      newErrors.date_of_birth = checkDateOfBirth(accountData.date_of_birth);
    }

    if ((await checkEmail(accountData.email, true)) != "") {
      newErrors.email = await checkEmail(accountData.email, true);
    }

    if (checkPassword(accountData.password, true) != "") {
      newErrors.password = checkPassword(accountData.password, true);
    }

    if (checkAccountType(accountData.account_type) != "") {
      newErrors.account_type = checkAccountType(accountData.account_type);
    }

    setErrors({ ...errors, ...newErrors });

    return Object.keys(newErrors).length == 0;
  };

  return (
    <>
      <button
        className="btn btn-sm btn-edit bg-[#426E80] shadow-md px-4 m-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80] w-20"
        onClick={() =>
          document.getElementById(`edit-form-${props.accountID}`).showModal()
        }
      >
        Edit
      </button>

      <dialog
        id={`edit-form-${props.accountID}`}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold ">Edit Account</h1>

            <button
              className="m-r ml-auto"
              onClick={() =>
                document.getElementById(`edit-form-${props.accountID}`).close()
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

          {/* <form onSubmit={handleSubmit}> */}
          <div className="flex flex-col w-full gap-2">
            {/* Personal Information */}
            <div className="flex flex-col md:flex-row md:gap-2">
              {/* First Name */}
              <div className="flex flex-col">
                <div className="label">
                  <span className="label-text">
                    First Name<span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full ${
                    errors.first_name && `input-error`
                  }`}
                  type="text"
                  name="first_name"
                  value={accountData.first_name}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
                {errors.first_name && (
                  <span className="text-[12px] text-red-500">
                    {errors.first_name}
                  </span>
                )}
              </div>

              {/* Middle Name */}
              <div className="flex flex-col">
                <div className="label">
                  <span className="label-text">
                    Middle Name<span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full ${
                    errors.middle_name && `input-error`
                  }`}
                  type="text"
                  name="middle_name"
                  value={accountData.middle_name}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
                {errors.middle_name && (
                  <span className="text-[12px] text-red-500">
                    {errors.middle_name}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <div className="label">
                  <span className="label-text">
                    Last Name<span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full ${
                    errors.last_name && `input-error`
                  }`}
                  type="text"
                  name="last_name"
                  value={accountData.last_name}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
                {errors.last_name && (
                  <span className="text-[12px] text-red-500">
                    {errors.last_name}
                  </span>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col w-full">
                <div className="label">
                  <span className="label-text">
                    Date of Birth<span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full ${
                    errors.date_of_birth && `input-error`
                  }`}
                  type="date"
                  name="date_of_birth"
                  value={formatDate(accountData.date_of_birth)}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
                {errors.date_of_birth && (
                  <span className="text-[12px] text-red-500">
                    {errors.date_of_birth}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-2">
              {/* Email */}
              <div className="flex flex-col w-full">
                <div className="label">
                  <span className="label-text">
                    Email<span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full ${
                    errors.email && `input-error`
                  }`}
                  type="email"
                  name="email"
                  value={accountData.email}
                  onChange={async (e) => {
                    handleOnChange(e);
                  }}
                />
                {errors.email && (
                  <span className="text-[12px] text-red-500">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col w-full">
                <div className="label">
                  <span className="label-text">
                    Password<span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full ${
                    errors.password && `input-error`
                  }`}
                  type="password"
                  name="password"
                  value={accountData.password}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
                {errors.password && (
                  <span className="text-[12px] text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Account Type */}
              <div className="flex flex-col w-full">
                <div className="label">
                  <span className="label-text">
                    Account Type<span className="text-red-500"> *</span>
                  </span>
                </div>
                <select
                  className={`select select-bordered w-full ${
                    errors.account_type && `select-error`
                  }`}
                  name="account_type"
                  value={accountData.account_type}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                >
                  <option value="" hidden>
                    Account Type
                  </option>
                  <option>Manager</option>
                  <option>Accountant</option>
                </select>
                {errors.account_type && (
                  <span className="text-[12px] text-red-500">
                    {errors.account_type}
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
                      .getElementById(`edit-form-${props.accountID}`)
                      .close()
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </dialog>
    </>
  );
}

export default EditForm;