import { ToastContainer } from "react-toastify";

const AddDialog = ({
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
        id="dialog-add"
        className="modal modal-bottom sm:modal-middle p-5 rounded-[15px]"
      >
        <ToastContainer />
        <div className=" p-5 w-full sm:w-[560px] md:w-[690px] rounded-[15px] bg-white">
          <div className="w-full flex justify-between">
            <div className="text-2xl font-bold">Add Recurring Pay</div>
            <button onClick={() => closeDialog("dialog-add")}>
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
              {/* Total Amount */}
              <label className="form-control w-full sm:max-w-64 md:max-w-80">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Total Amount
                  </span>
                </div>
                <input
                  name="totalAmount"
                  className="p-2 border rounded-lg h-12"
                  type="number"
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  value={recurringPay.totalAmount}
                />
              </label>

              {/* Number of Payrun */}
              <label className="form-control w-full sm:max-w-64 md:max-w-80">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Number of Payrun
                  </span>
                </div>
                <input
                  name="numPayrun"
                  className="p-2 border rounded-lg h-12"
                  type="number"
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  value={recurringPay.numPayrun}
                />
              </label>
            </div>

            {/* Deduction Per Payrun */}
            <label className="form-control w-full sm:max-w-64 md:max-w-80">
              <div className="label">
                <span className="label-text font-medium text-sm">
                  Deduction Per Payrun
                </span>
              </div>
              <input
                name="deductionsPerPayrun"
                className="p-2 w-26 border rounded-lg h-12"
                type="number"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                value={recurringPay.deductionsPerPayrun}
              />
            </label>
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
                />
              </label>
            </div>
            <button
              id="btn-add-submit"
              className="btn bg-[#666A40] shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto"
              onClick={() =>
                handleRecurringPayRecord(recurringPay, "create", "dialog-add")
              }
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddDialog;
