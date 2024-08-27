import { useEffect, useRef, useState } from "react";
import moment from "moment";
import UploadPayItems from "./UploadPayItems";

const Step1 = ({
  datePeriod,
  setDatePeriod,
  contributions,
  setContributions,
  generateList,
}) => {
  const buttonGenerate = useRef(null);
  const [uploadButtonState, setUploadButtonState] = useState(null);

  useEffect(() => {
    buttonGenerate.current.disabled = !validateDatePeriod(datePeriod);
  }, [datePeriod]);

  const onDateChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDatePeriod((prevState) => ({ ...prevState, [name]: value }));
  };

  const onContributionChange = (e) => {
    const name = e.target.name;
    setContributions({ ...contributions, [name]: !contributions[name] });
  };

  function validateDatePeriod(datePeriod) {
    // Check if all keys have values
    const allKeysHaveValue = Object.values(datePeriod).every(
      (value) => value !== null && value !== undefined
    );

    // Convert dates to Moment.js objects for comparison
    const fromDate = moment(datePeriod.From);
    const toDate = moment(datePeriod.To);
    const paymentDate = moment(datePeriod.Payment);

    // Compare dates
    const fromLessThanTo = fromDate.isBefore(toDate);
    const paymentGreaterThanOrEqualToTo = paymentDate.isSameOrAfter(toDate);

    // Return true if all conditions are met, false otherwise
    return allKeysHaveValue && fromLessThanTo && paymentGreaterThanOrEqualToTo;
  }

  return (
    <>
      <div className="flex flex-col border-2  border-[#E4E4E4] rounded-[15px] p-5 bg-white">
        <h1 className="text-base font-bold">Period Covered</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium text-sm">Date From</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full box-shadow-none"
              name="From"
              onChange={(e) => {
                onDateChange(e);
              }}
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
            />
          </label>
          <label className="form-control">
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
            />
          </label>
          <div className="flex flex-col border-[#E4E4E4] rounded-[15px] bg-white">
            <h1 className="text-base font-bold">Contributions</h1>

            <div className="flex flex-row">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">SSS</span>
                  <input
                    name="SSS"
                    type="checkbox"
                    className="toggle"
                    onChange={(e) => onContributionChange(e)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">PHIC</span>
                  <input
                    name="PHIC"
                    type="checkbox"
                    className="toggle"
                    onChange={(e) => onContributionChange(e)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">HDMF</span>
                  <input
                    name="HDMF"
                    type="checkbox"
                    className="toggle"
                    onChange={(e) => onContributionChange(e)}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="mt-auto ml-auto col-span-2">
            <button
              ref={buttonGenerate}
              type="button"
              className="btn bg-[#666A40] mt-auto shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto  mr-2"
              onClick={generateList}
            >
              Generate
            </button>

            <UploadPayItems />
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
