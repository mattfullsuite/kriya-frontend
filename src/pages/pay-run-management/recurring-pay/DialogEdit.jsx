const EditDialog = (recordData) => {
  return (
    <>
      <dialog
        id="dialog-edit"
        className="modal modal-bottom sm:modal-middle p-5 rounded-[15px]"
      >
        <div className=" p-5 w-full sm:w-[560px] md:w-[690px] rounded-[15px] bg-white">
          <div className="w-full flex justify-between">
            <div className="text-2xl font-bold">Edit Recurring Pay</div>
            <button
              onClick={() => document.getElementById("dialog-edit").close()}
            >
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
                  name="type"
                  // value={selectedCategory}
                  // onChange={(e) => {
                  //   onEmployeeChange(e);
                  // }}
                >
                  <option value="" defaultValue>
                    Select an Employee
                  </option>
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
                  name="type"
                  // value={selectedCategory}
                  // onChange={(e) => {
                  //   onPayItemChange(e);
                  // }}
                >
                  <option value="" defaultValue>
                    Select a Pay Item
                  </option>
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
                <input className="p-2 border rounded-lg h-12" type="number" />
              </label>

              {/* Number of Payrun */}
              <label className="form-control w-full sm:max-w-64 md:max-w-80">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Number of Payrun
                  </span>
                </div>
                <input className="p-2 border rounded-lg h-12" type="number" />
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
                className="p-2 w-26 border rounded-lg h-12"
                type="number"
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
                  type="date"
                  className="input input-bordered w-full box-shadow-none"
                />
              </label>

              <label className="form-control w-full  sm:max-w-64 md:max-w-80">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Date To
                  </span>
                </div>
                <input type="date" className="input input-bordered w-full" />
              </label>
            </div>

            {/* Name */}
            <label className="form-control w-full sm:max-w-64 md:max-w-80">
              <div className="label">
                <span className="label-text font-medium text-sm">Status</span>
              </div>
              <select
                className="p-2 border rounded-lg h-12"
                name="status"
                // value={selectedCategory}
                // onChange={(e) => {
                //   onEmployeeChange(e);
                // }}
              >
                <option value="" defaultValue>
                  Select a Status
                </option>
                <option value="0" defaultValue>
                  Not Completed
                </option>
                <option value="1" defaultValue>
                  Completed
                </option>
              </select>
            </label>
            <button className="btn bg-[#666A40] shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto">
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditDialog;
