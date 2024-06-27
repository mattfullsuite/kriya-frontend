import { useEffect, useState } from "react";

import { addCommaAndFormatDecimal } from "../../../assets/addCommaAndFormatDecimal.js";

const PreviewDialog = ({ data }) => {
  const [previewData, setPreviewData] = useState(data);

  useEffect(() => {
    setPreviewData(data);
  }, [data]);
  return (
    <dialog id="row-data" className="modal">
      {previewData && (
        <>
          <div className="modal-box p-0 w-11/12 max-w-3xl">
            <div className="flex flex-col px-5 py-5 bg-gradient-to-br  from-[#666A40] to-[#a0a47d]  text-white justify-end">
              <div className="flex flex-row">
                <button
                  className="m-r ml-auto"
                  onClick={() => document.getElementById("row-data").close()}
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
              <div className="flex flex-row justify-between mt-5">
                <div className="w-full font-bold">
                  {previewData["Employee ID"]}
                </div>
                <div className="w-full text-end">
                  <span className="font-bold">Hire Date: </span>
                  <span>{previewData["Hire Date"]}</span>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-2">
                <div className="w-full font-bold">
                  {previewData["First Name"]} {previewData["Middle Name"]}{" "}
                  {previewData["Last Name"]}
                </div>
                <div className="w-full text-end">
                  <span className="font-bold">Pay Period: </span>
                  <span>{previewData.Dates["From"]}</span>
                  <span className="font-bold"> to </span>
                  <span>{previewData.Dates["To"]}</span>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-2">
                <div className="w-full font-bold">
                  {previewData["Job Title"]}
                </div>
                <div className="w-full text-end">
                  <span className="font-bold">Pay Day: </span>
                  {data.Dates["Payment"]}
                </div>
              </div>
            </div>
            <div className="flex flex-row px-5 pb-5">
              <div className="flex flex-col lg:flex-row w-full">
                <div className="w-full">
                  <h1 className="font-bold mx-3 mt-3">Pay Calculation</h1>
                  <hr className="mt-1 border h-[5px] bg-[#000000]"></hr>
                  {Object.entries(previewData["Pay Items"]).map(
                    ([category, payItems]) => (
                      <>
                        {parseFloat(previewData["Totals"][category]) != 0 && (
                          <>
                            <div
                              className="flex flex-row justify-between"
                              key={category}
                            >
                              <h1 className="font-bold mx-3 mt-3 pl-5">
                                {category}
                              </h1>
                              <h1 className="font-bold mx-3 mt-3">
                                Amount PHP
                              </h1>
                            </div>
                            <hr className="mt-1 border h-[5px] bg-[#000000] ml-5"></hr>
                            {Object.entries(payItems).map(
                              ([payItem, amount]) => {
                                if (parseFloat(amount) != 0) {
                                  return (
                                    <>
                                      <div
                                        className="flex flex-row justify-between"
                                        key={payItem}
                                      >
                                        <h1 className="mx-3 mt-3 pl-10">
                                          {payItem}
                                        </h1>
                                        <h1 className="mx-3 mt-3">
                                          {addCommaAndFormatDecimal(
                                            parseFloat(amount)
                                          )}
                                        </h1>
                                      </div>
                                    </>
                                  );
                                }
                              }
                            )}
                            <hr className="mt-1 border h-[5px] bg-[#000000] ml-5"></hr>
                            <div className="flex flex-row justify-between mb-5">
                              <h1 className="font-bold mx-3 mt-3 pl-5">
                                Total {category}
                              </h1>
                              <h1 className="mx-3 mt-3">
                                {addCommaAndFormatDecimal(
                                  parseFloat(previewData["Totals"][category])
                                )}
                              </h1>
                            </div>
                            <hr className="mt-1 border h-[5px] bg-[#000000]"></hr>
                          </>
                        )}
                      </>
                    )
                  )}

                  <div className="flex flex-row justify-between border-t-3">
                    <h1 className="font-bold mx-3 mt-3">Take Home Pay</h1>
                    <h1 className="mx-3 mt-3">
                      {addCommaAndFormatDecimal(previewData["Net Pay"])}
                    </h1>
                  </div>
                  <hr className="mt-1 border h-[5px] bg-[#000000]"></hr>
                </div>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </>
      )}
    </dialog>
  );
};

export default PreviewDialog;
