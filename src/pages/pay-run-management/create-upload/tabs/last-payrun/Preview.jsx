import { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import Payslip from "./react-pdf/Payslip.jsx";
import { toast, ToastContainer } from "react-toastify";
const Preview = ({
  payslipInformation,
  unprocessedPayables,
  groupTotals,
  netBeforeTaxes,
  netPayEarnings,
  notes,
}) => {
  // Base URL for Axios
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [groupTotal, setGroupTotal] = useState();

  useEffect(() => {
    calculateGroupTotal(unprocessedPayables);
  }, [payslipInformation, unprocessedPayables, netBeforeTaxes, netPayEarnings]);

  const saveToDatabase = async () => {
    try {
      toast.promise(
        axios.post(BASE_URL + `/mp-createPayslip/${"Last Payrun"}`, [
          payslipInformation,
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

  const calculateGroupTotal = (data) => {
    const groups = [...new Set(data.map((obj) => obj["pay_item_group"]))];

    const totals = groups.map((group) => {
      const newGroup = data.filter(
        (payItem) => payItem.pay_item_group === group
      );
      const lastPayGroup = newGroup.reduce(
        (sum, item) => sum + parseFloat(item.last_pay_amount),
        0
      );
      const ytdGroup = newGroup.reduce(
        (sum, item) =>
          sum + parseFloat(item.last_pay_amount) + parseFloat(item.ytd_amount),
        0
      );
      return {
        name: group,
        lastPay: lastPayGroup,
        ytdGroup: ytdGroup,
      };
    });
    setGroupTotal(totals);
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
          <Payslip
            payslipInformation={payslipInformation}
            unprocessedPayables={unprocessedPayables}
            groupTotals={groupTotals}
            netBeforeTaxes={netBeforeTaxes}
            netPayEarnings={netPayEarnings}
            notes={notes}
          />
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
