import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { addCommaAndFormatDecimal } from "../../../assets/addCommaAndFormatDecimal.js";

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
    await axios
      .post(BASE_URL + `/mp-createPayslip/${"Created"}`, [payslipInfo])
      .then(function (response) {
        if (response.data) {
          document.getElementById("payslip-preview").close();
          Swal.fire({
            icon: "success",
            title: "Payslips Saved!",
            text: "Record has been uploaded to the database.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch(function (error) {
        document.getElementById("payslip-preview").close();
        Swal.fire({
          icon: "error",
          title: "Something Went Wrong! ",
          html: "<strong>" + "Error:" + "</strong>" + "<br />" + error,
          showConfirmButton: false,
          timer: 20000,
        });
        console.error("Error: ", error);
      });
  };

  return (
    <>
      <dialog
        id="payslip-preview"
        className="modal flex flex-col p-4 w-full overflow-y-auto"
      >
        <div className="flex flex-row my-2 p-2 w-[797px] bg-white">
          <button className="btn" onClick={() => saveToDatabase()}>
            Save and Download
          </button>

          <button
            className="m-r ml-auto"
            onClick={() => document.getElementById("payslip-preview").close()}
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
        <div className="flex flex-col mx-auto p-10 h-[1123px] w-[797px] border bg-white flex-shrink-0">
          <header className="text-center">
            <img
              src={companyInfo.logo}
              alt="Logo"
              className="mx-auto my-2 h-16"
            />
            <h5 className="w-60 mx-auto font-semibold">{companyInfo.name}</h5>
            <h5 className="w-[250px] mx-auto pt-2.5">{companyInfo.tin}</h5>
            <h5 className="w-[350px] mx-auto pt-2.5">{companyInfo.address}</h5>
          </header>

          <h2 className="text-center font-semibold text-4xl my-6">Payslip</h2>
          <div className="flex justify-between pb-5">
            <div className="w-1/2">
              <h5 className="font-semibold">{payslipInfo["Employee ID"]}</h5>
              <p>
                {payslipInfo["First Name"]} {payslipInfo["Middle Name"]}{" "}
                {payslipInfo["Last Name"]}
              </p>
              <p>{payslipInfo["Job Title"]}</p>
            </div>
            <div className="w-1/2">
              <h5>
                <span className="font-semibold">Hire Date: </span>
                {payslipInfo["Hire Date"]}
              </h5>
              <h5>
                <span className="font-semibold">Pay Period: </span>
                {moment(payslipInfo["Dates"]["From"]).format("MMM. DD, YYYY")}
                &nbsp; to &nbsp;
                {moment(payslipInfo["Dates"]["To"]).format("MMM. DD, YYYY")}
              </h5>
              <h5>
                <span className="font-semibold">Pay Day: </span>
                {moment(payslipInfo["Dates"]["Payment"]).format(
                  "MMM. DD, YYYY"
                )}
              </h5>
            </div>
          </div>

          {/* // PAY ITEMS START */}
          <table className="w-full mb-2.5">
            {Object.entries(payslipInfo["Pay Items"]).map(
              ([categoryName, payables]) => (
                <>
                  <thead>
                    <tr className="text-left border-b-2 border-black">
                      <th className="p-2">{categoryName}</th>
                      <th className="p-2"></th>
                      <th className="p-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  {Object.entries(payables).map(
                    ([payableName, payItem]) =>
                      payItem != 0 && (
                        <>
                          <tbody>
                            <tr className="text-left border-t-2">
                              <td className="p-2 font-light">{payableName}</td>
                              <td className="p-2"></td>
                              <td className="p-2 text-right font-light">
                                {addCommaAndFormatDecimal(parseFloat(payItem))}
                              </td>
                            </tr>
                          </tbody>
                        </>
                      )
                  )}
                  <tbody>
                    <tr className="text-left border-t-2 border-black">
                      <td className="p-2">Total {categoryName}:</td>
                      <td className="p-2"></td>
                      <td className="p-2 text-right">
                        {addCommaAndFormatDecimal(
                          parseFloat(payslipInfo["Totals"][categoryName])
                        )}
                      </td>
                    </tr>
                  </tbody>
                </>
              )
            )}
          </table>

          {/* PAY ITEMS END */}

          <hr className="my-4" />

          <div className="w-full">
            <div className="w-3/5 flex float-right">
              <div className="w-1/2 mr-2">
                <p className="text-2xl text-right font-semibold">
                  {" "}
                  Take Home Pay: &nbsp;
                </p>
              </div>
              <div className="w-1/2">
                <p className="text-2xl text-right font-semibold">
                  {" "}
                  {addCommaAndFormatDecimal(parseFloat(payslipInfo["Net Pay"]))}
                </p>
              </div>
            </div>
          </div>

          <footer className="mt-auto mx-auto h-10 w-full text-center">
            <h1 className="my-auto">This is a system generated payslip.</h1>
          </footer>
        </div>
      </dialog>
    </>
  );
};

export default Preview;
