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
      <div>
        <div className="flex flex-col border-2  border-[#E4E4E4] rounded-[15px] p-5 bg-white">
          <div className="w-full">
            <h1 className="text-base font-bold">Period Covered</h1>
            <div className="flex flex-col lg:flex-row gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Date From
                  </span>
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
                  <span className="label-text font-medium text-sm">
                    Date To
                  </span>
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
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full mt-5 ">
              <button
                type="button"
                className="btn text-white bg-[#5C9CB7] shadow-md w-1/3"
                //onClick={sendData}
                //disabled={!sendEnable}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="mt-5 w-full h-96 bg-white rounded-[15px] border-2"></div>
      </div>
    </>
  );
}
export default RunRegularPayroll;
