import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const DialogEdit = ({ data, getCompanyList }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const initialValue = {
    company_name: "",
    company_loc: "",
    company_logo: "",
  };
  const [companyDetails, setCompanyDetails] = useState(initialValue);
  useEffect(() => {
    setCompanyDetails(data);
  }, [data]);
  const handleSubmit = () => {
    document.getElementById("dialog-button-edit").disabled = true;

    const promise = axios.patch(
      BASE_URL + `/cm-UpdateCompany/${companyDetails.company_id}`,
      companyDetails,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.promise(promise, {
      pending: {
        render: "Submitting, please wait...",
        className: "pending",
      },
      success: {
        render: "Company updated successfully!",
        className: "success",
        autoClose: 2000,
        onClose: () => {
          getCompanyList();
          document.getElementById("dialog-button-edit").disabled = false;
          document.getElementById("dialog-edit").close();
          setCompanyDetails(initialValue);
        },
      },
      error: {
        render({ data }) {
          return `Failed to update company: ${data.company_name}`;
        },
        autoClose: 3000,
        onClose: () => {
          document.getElementById("dialog-button-edit").disabled = false;
          document.getElementById("dialog-edit").close();
        },
        autoClose: 3000,
      },
    });

    promise.catch((err) => console.error(err));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({
      ...companyDetails,
      [name]: value,
    });
  };

  const handleLogoChange = (e) => {
    const logoFile = e.target.files[0];
    setCompanyDetails({
      ...companyDetails,
      company_logo: logoFile,
    });
  };

  return (
    <>
      <dialog
        id="dialog-edit"
        className="modal modal-bottom sm:modal-middle p-5 rounded-[15px]"
      >
        <ToastContainer />
        <div className="modal-box">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold ">Edit Company</h1>
            <button
              className="ml-auto"
              onClick={() => document.getElementById(`dialog-edit`).close()}
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
          <div>
            Name:
            <input
              required
              name="company_name"
              className={`input input-bordered w-full`}
              value={companyDetails?.company_name}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            Address:
            <input
              required
              name="company_loc"
              className={`input input-bordered w-full`}
              value={companyDetails?.company_loc}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            Logo:
            <input
              required
              id="company_logo"
              name="company_logo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleLogoChange(e);
              }}
              // placeholder="Enter Address"
              className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
            />
          </div>
          {/* Submit Button */}
          <div className="flex md:flex-row gap-2 mt-2 justify-end">
            <div className="flex flex-col w-full md:w-auto">
              <button
                id="dialog-button-edit"
                className="btn flex w-full bg-[#666A40] shadow-md text-white hover:bg-[#666A40] hover:opacity-60"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <button
                className="btn flex w-full shadow-md"
                onClick={() => document.getElementById(`dialog-edit`).close()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DialogEdit;
