import { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import Payslip from "./react-pdf/Payslip.jsx";
import { toast, ToastContainer } from "react-toastify";

const Preview = ({ payslipInformation }) => {
  // Base URL for Axios
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const companyInfoInitial = {
    name: "Company Name",
    logo: "",
    tin: "TIN",
    address: "Address",
  };
  const [companyInfo, setcompanyInfo] = useState(companyInfoInitial);
  const [payslipInfo, setPaySlipInfo] = useState(payslipInformation);

  useEffect(() => {
    setPaySlipInfo(payslipInformation);
  }, [payslipInformation]);

  const saveToDatabase = async () => {
    console.log("To DB: ", payslipInfo);

    try {
      toast.promise(
        axios.post(BASE_URL + `/mp-createPayslip/${"Last Payrun"}`, [
          payslipInfo,
        ]),
        {
          pending: "Saving Payslips...",
          success: {
            render: "Payslips Has Been Saved!",
            autoClose: 3000,
          },
          error: {
            render: "Something Went Wrong!",
            autoClose: 5000,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <dialog
        id="payslip-preview"
        className="modal flex flex-col p-4 w-full overflow-y-auto"
      >
        <ToastContainer />
        <div className="flex flex-row my-2 p-2 w-full">
          <button
            className="ml-auto mr-[30px]"
            onClick={() => document.getElementById("payslip-preview").close()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="5"
              stroke="currentColor"
              className="w-6 h-6 text-white fixed"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <PDFViewer style={{ width: "80vw", height: "90vh" }}>
          <Payslip payslipInformation={payslipInfo} />
        </PDFViewer>

        <div className="flex flex-row gap-2 my-2 p-2 w-4/5 justify-end">
          <button className="btn" onClick={() => saveToDatabase()}>
            Save
          </button>

          <button
            className="btn"
            onClick={() => document.getElementById("payslip-preview").close()}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Preview;
