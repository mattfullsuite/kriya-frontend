import { useState } from "react";
import Headings from "../../components/universal/Headings";

function RunRegularPayroll() {
  let dates = {
    From: "",
    To: "",
    Payment: "",
  };
  const [Dates, setDates] = useState(dates); // Dates
  const onDateChange = (e) => {
    const { name, value } = e.target;

    setDates((prevPayrollDate) => ({
      ...prevPayrollDate,
      [name]: value,
    }));

    //let counter = 0;
  };
  return (
    <>
      <Headings text={"Run Regular Payroll"} />

      <div className="mt-10 flex flex-col border-2  border-[#E4E4E4] rounded-[15px] p-5 bg-white">
        <h1 className="text-base font-bold">Step 1: Set Up</h1>
        <hr className="my-2 border h-[2px] bg-[#B4B4B8]"></hr>
        <div className="flex flex-col lg:flex-row gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium text-sm">Date From</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full"
              name="From"
              onChange={(e) => {
                onDateChange(e);
              }}
              // disabled={!dateEnable}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium text-sm">Date To</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full"
              name="To"
              onChange={(e) => {
                onDateChange(e);
              }}
              // disabled={!dateEnable}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium text-sm">
                Payment Date
              </span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full"
              name="Payment"
              onChange={(e) => {
                onDateChange(e);
              }}
              //   disabled={!dateEnable}
            />
          </label>
        </div>
        <button
          type="button"
          className="btn mt-5 w-32 bg-[#EA7B2D] hover:bg-[#CC5500] shadow-md text-white m-r ml-auto"
        >
          Generate
        </button>
      </div>
      {/* Table */}
      <div className="mt-5 p-5 w-full h-96 bg-white rounded-[15px] border-2">
        <h1 className="text-base font-bold">Step 2: Employee List</h1>
        <hr className="my-2 border h-[2px] bg-[#B4B4B8]"></hr>
      </div>
    </>
  );
}
export default RunRegularPayroll;
