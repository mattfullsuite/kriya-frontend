import Headings from "../../../components/universal/Headings";

const AddRecurringPay = () => {
  return (
    <>
      <dialog>
        <div className="mt-10 p-5 w-full rounded-[15px] bg-white">
          <div className=" flex flex-col gap-2 ">
            <div className="flex flex-col gap-2 lg:flex-row">
              {/* Name */}
              <label className="form-control w-full max-w-72">
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
              <label className="form-control w-full max-w-72">
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
            <div className="flex flex-col w-full gap-2 lg:flex-row">
              {/* Total Amount */}
              <label className="form-control w-full max-w-72">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Total Amount
                  </span>
                </div>
                <input className="p-2 border rounded-lg h-12" type="number" />
              </label>

              {/* Number of Payrun */}
              <label className="form-control w-full max-w-72">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Number of Payrun
                  </span>
                </div>
                <input className="p-2 border rounded-lg h-12" type="number" />
              </label>
            </div>

            {/* Deduction Per Payrun */}
            <label className="form-control w-full max-w-72">
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
            <div className="w-full flex flex-col gap-2 lg:flex-row">
              <label className="form-control w-full max-w-72">
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

              <label className="form-control w-full max-w-72">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Date To
                  </span>
                </div>
                <input type="date" className="input input-bordered w-full" />
              </label>
            </div>
            <button className="btn bg-[#666A40] shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto">
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddRecurringPay;
