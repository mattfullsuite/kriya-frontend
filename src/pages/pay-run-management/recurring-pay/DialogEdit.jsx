import moment, { months } from "moment";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const EditDialog = ({
  employeeList,
  payItemList,
  handleRecurringPayRecord,
  recurringPay,
  handleOnChange,
  closeDialog,
}) => {
  return (
    <>
      <dialog
        id="dialog-edit"
        className="modal modal-bottom sm:modal-middle p-5 rounded-[15px]"
      >
        <ToastContainer />
        {recurringPay && (
          <div className=" p-5 w-full sm:w-[560px] md:w-[690px] rounded-[15px] bg-white">
            <div className="w-full flex justify-between">
              <div className="text-2xl font-bold">Edit Recurring Pay</div>
              <button onClick={() => closeDialog("dialog-edit")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="5"
                  stroke="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                {/* Name */}
                <label className="form-control w-full sm:max-w-64 md:max-w-80">
                  <div className="label">
                    <span className="label-text font-medium text-sm">
                      Employee
                    </span>
                  </div>
                  <select
                    className="p-2 border rounded-lg h-12"
                    name="empID"
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    value={recurringPay.empID}
                    disabled
                  >
                    <option value="" defaultValue>
                      Select an Employee
                    </option>
                    {employeeList.length > 0 &&
                      employeeList.map((emp) => (
                        <option
                          key={emp["Employee ID"]}
                          value={emp["Employee ID"]}
                        >
                          {emp["Name"]}
                        </option>
                      ))}
                  </select>
                </label>

                {/* Pay Item Name */}
                <label className="form-control w-full sm:max-w-64 md:max-w-80">
                  <div className="label">
                    <span className="label-text font-medium text-sm">
                      Pay Item Name
                    </span>
                  </div>
                  <select
                    className="p-2 border rounded-lg h-12"
                    name="payItemID"
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    value={recurringPay.payItemID}
                  >
                    <option value="" defaultValue>
                      Select a Pay Item
                    </option>
                    {payItemList.length > 0 &&
                      payItemList.map((payItem) => (
                        <option
                          key={payItem["Pay Item ID"]}
                          value={payItem["Pay Item ID"]}
                        >
                          {payItem["Name"]}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
              <div className="flex flex-col w-full gap-2 sm:flex-row">
                {/* Amount Per Cutoff */}
                <label className="form-control w-full sm:max-w-64 md:max-w-80">
                  <div className="label">
                    <span className="label-text font-medium text-sm">
                      Amount Per Cutoff
                    </span>
                  </div>
                  <input
                    name="amount"
                    className="p-2 border rounded-lg h-12"
                    type="number"
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    value={recurringPay.amount}
                  />
                </label>
                {/* Repeated */}
                <label className="form-control w-full sm:max-w-64 md:max-w-80">
                  <div className="label">
                    <span className="label-text font-medium text-sm">
                      Repeated
                    </span>
                  </div>
                  <input
                    name="repeated"
                    className="mt-2 checkbox checkbox-lg"
                    type="checkbox"
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    value={recurringPay.repeated}
                    disabled={recurringPay.repeated}
                  />
                </label>
              </div>

              <div className="w-full flex flex-col gap-2 sm:flex-row">
                <label className="form-control w-full  sm:max-w-64 md:max-w-80">
                  <div className="label">
                    <span className="label-text font-medium text-sm">
                      Date From
                    </span>
                  </div>
                  <input
                    name="dateFrom"
                    type="date"
                    className="input input-bordered w-full box-shadow-none"
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    value={recurringPay.dateFrom}
                    disabled={recurringPay.repeated}
                  />
                </label>

                <label className="form-control w-full  sm:max-w-64 md:max-w-80">
                  <div className="label">
                    <span className="label-text font-medium text-sm">
                      Date To
                    </span>
                  </div>
                  <input
                    name="dateTo"
                    type="date"
                    className="input input-bordered w-full"
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    value={recurringPay.dateTo}
                    disabled={recurringPay.repeated}
                  />
                </label>
              </div>
              <button
                id="btn-edit-submit"
                className="btn bg-[#666A40] shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto"
                onClick={() =>
                  handleRecurringPayRecord(
                    recurringPay,
                    "update",
                    "dialog-edit"
                  )
                }
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export default EditDialog;
