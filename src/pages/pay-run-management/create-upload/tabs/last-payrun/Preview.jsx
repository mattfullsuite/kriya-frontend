import { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import Payslip from "./react-pdf/Payslip.jsx";
import { toast, ToastContainer } from "react-toastify";
import { addCommaAndFormatDecimal } from "../../../assets/addCommaAndFormatDecimal.js";

const Preview = ({
  payslipInformation,
  unprocessedPayables,
  netBeforeTaxes,
  netPayEarnings,
}) => {
  console.log(
    "Preview Dialog Parameters: ",
    payslipInformation,
    unprocessedPayables,
    netBeforeTaxes,
    netPayEarnings
  );
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
  const [selectedEmployeeData, setSelectedEmployeeData] = useState();
  const [groupTotal, setGroupTotal] = useState();
  const [netPayBeforeTax, setNetPayBeforeTax] = useState({
    lastPay: 0,
    ytdGroup: 0,
  });
  const [netPayEarning, setNetPayEarning] = useState({
    lastPay: 0,
    ytdGroup: 0,
  });

  useEffect(() => {
    setPaySlipInfo(payslipInformation);
    setSelectedEmployeeData(unprocessedPayables);
    calculateGroupTotal(unprocessedPayables);
    setNetPayBeforeTax(netBeforeTaxes);
    setNetPayEarning(netPayEarnings);
  }, [payslipInformation, unprocessedPayables, netBeforeTaxes, netPayEarnings]);

  const saveToDatabase = async () => {
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

  const calculateGroupTotal = (data) => {
    const netPay = { lastPay: 0, ytdGroup: 0 };
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
      netPay.lastPay += lastPayGroup;
      netPay.ytdGroup += ytdGroup;
      return {
        name: group,
        lastPay: lastPayGroup,
        ytdGroup: ytdGroup,
      };
    });
    setGroupTotal(totals);
    // console.log("Group Totals: ", totals);
    // setNetPayEarning(netPay);
    // console.log("Net Pay: ", netPay);
    // calculateNetBeforeTax(totals);
  };

  const calculateNetBeforeTax = (data) => {
    const netBeforeTax = { lastPay: 0, ytdGroup: 0 };
    data.forEach((group) => {
      if (
        group.name == "Taxable" ||
        group.name == "Non-Taxable" ||
        group.name == "Pre-Tax Deduction"
      ) {
        netBeforeTax.lastPay += group.lastPay;
        netBeforeTax.ytdGroup += group.lastPay;
      }
    });
    setNetPayBeforeTax({
      lastPay: netBeforeTax.lastPay,
      ytdGroup: netBeforeTax.ytdGroup,
    });
    console.log("Net Before Totals: ", netBeforeTax);
  };

  // const renderRow = (groupName) => {
  //   return (
  //     groupTotal.length > 0 &&
  //     groupTotal[groupName]?.lastPay !== 0 &&
  //     groupTotal[groupName]?.ytdGroup !== 0 && (
  //       <tbody>
  //         {groupTotal
  //           .filter((payItem) => payItem.name === groupName)
  //           .map((item, index) => (
  //             <tr key={index} className="bg-[#E6E7DD]">
  //               <td className="font-bold w-1/2">{item.name}</td>
  //               <td className="text-right w-1/4">
  //                 {addCommaAndFormatDecimal(item.lastPay)}
  //               </td>
  //               <td className="text-right w-1/4">
  //                 {addCommaAndFormatDecimal(item.ytdGroup)}
  //               </td>
  //             </tr>
  //           ))}
  //         {selectedEmployeeData.length > 0 &&
  //           selectedEmployeeData
  //             .filter(
  //               (payItem) =>
  //                 payItem.pay_item_group === groupName &&
  //                 payItem.visible === true
  //             )
  //             .map((item, index) => (
  //               <tr key={index}>
  //                 <td>{item.pay_item_name}</td>
  //                 <td className="text-right">
  //                   {addCommaAndFormatDecimal(item.last_pay_amount)}
  //                 </td>
  //                 <td className="text-right">
  //                   {addCommaAndFormatDecimal(
  //                     parseFloat(item.last_pay_amount) +
  //                       parseFloat(item.ytd_amount)
  //                   )}
  //                 </td>
  //               </tr>
  //             ))}
  //       </tbody>
  //     )
  //   );
  // };

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
            payslipInformation={payslipInfo}
            unprocessedPayables={unprocessedPayables}
            groupTotals={groupTotal}
            netBeforeTaxes={netPayBeforeTax}
            netPayEarnings={netPayEarning}
          />
        </PDFViewer>

        {/* {selectedEmployeeData && (
          <div className="p-2 w-2/3 overflow-x-auto bg-white">
            <table className="table">
              <thead>
                <tr className="bg-[#666A40] text-white">
                  <th>Last Payrun Calculation</th>
                  <th>Last Pay</th>
                  <th>Total Earnings</th>
                </tr>
              </thead>
              {renderRow("Taxable")}
              {renderRow("Non-Taxable")}
              {renderRow("Pre-Tax Deduction")}

              <tbody>
                <tr className="bg-[#666A40] text-white font-bold">
                  <td className="font-bold w-1/2">
                    Net Pay Before Tax Deduction
                  </td>
                  <td className="text-right w-1/4">
                    {addCommaAndFormatDecimal(netPayBeforeTax.lastPay)}
                  </td>
                  <td className="text-right w-1/4">
                    {addCommaAndFormatDecimal(netPayBeforeTax.ytdGroup)}
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr className="bg-[#E6E7DD]">
                  <td className="font-bold" colSpan="3">
                    Taxes
                  </td>
                </tr>
                <tr className="">
                  <td className="font-bold w-1/2">
                    Withheld Taxes During The Year
                  </td>
                  <td className="text-right w-1/4"></td>
                  <td className="text-right w-1/4">
                    {selectedEmployeeData.length > 0 &&
                      selectedEmployeeData
                        .filter(
                          (payItem) => payItem.pay_item_name === "Tax Withheld"
                        )
                        .map((payItem, index) => (
                          <div key={index}>
                            {addCommaAndFormatDecimal(
                              Math.abs(payItem.ytd_amount)
                            )}
                          </div>
                        ))}
                  </td>
                </tr>
                <tr className="">
                  <td className="font-bold w-1/2">Tax Due</td>
                  <td className="text-right w-1/4"></td>
                  <td className="text-right w-1/4">
                    {selectedEmployeeData.length > 0 &&
                      selectedEmployeeData
                        .filter(
                          (payItem) => payItem.pay_item_name === "Tax Withheld"
                        )
                        .map((payItem, index) => (
                          <div key={index}>
                            {addCommaAndFormatDecimal(
                              Math.abs(payItem.last_pay_amount)
                            )}
                          </div>
                        ))}
                  </td>
                </tr>
                <tr className="">
                  <td className="font-bold w-1/2">Tax Refund (Tax Payable)</td>
                  <td className="text-right w-1/4">
                    {selectedEmployeeData.length > 0 &&
                      selectedEmployeeData
                        .filter(
                          (payItem) => payItem.pay_item_name === "Tax Withheld"
                        )
                        .map((payItem, index) => (
                          <div key={index}>
                            {addCommaAndFormatDecimal(
                              Math.abs(payItem.ytd_amount) -
                                Math.abs(payItem.last_pay_amount)
                            )}
                          </div>
                        ))}
                  </td>
                  <td className="text-right w-1/4">
                    {selectedEmployeeData.length > 0 &&
                      selectedEmployeeData
                        .filter(
                          (payItem) =>
                            payItem.pay_item_name ===
                            "Tax Refund - Current Year"
                        )
                        .map((payItem, index) => (
                          <div key={index}>
                            {addCommaAndFormatDecimal(
                              Math.abs(payItem.last_pay_amount)
                            )}
                          </div>
                        ))}
                  </td>
                </tr>
              </tbody>
              {renderRow("Post-Tax Deduction")}
              {renderRow("Post-Tax Addition")}

              <tbody>
                <tr className="bg-[#666A40] text-white font-bold">
                  <td className="font-bold">NET PAY EARNINGS</td>
                  <td className="text-right w-1/4">
                    {addCommaAndFormatDecimal(netPayEarning.lastPay)}
                  </td>
                  <td className="text-right w-1/4">
                    {addCommaAndFormatDecimal(netPayEarning.ytdGroup)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )} */}

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
