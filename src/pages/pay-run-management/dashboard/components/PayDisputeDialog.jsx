import Headings from "../../../../components/universal/Headings";

const PayDisputeDialog = () => {
  return (
    <>
      <dialog id="dispute-dialog">
        <div className="p-5 w-[600px] lg">
          <div className="flex">
            <Headings text={"View Pay Dispute"} />
            <button
              onClick={() => document.getElementById("dispute-dialog").close()}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1924 24.2109L17 19.4033L21.8076 24.2109L24.2114 21.8071L19.4038 16.9995L24.2114 12.1919L21.8076 9.78809L17 14.5957L12.1924 9.78809L9.78857 12.1919L14.5962 16.9995L9.78857 21.8071L12.1924 24.2109Z"
                  fill="#E4E4E4"
                  fill-opacity="0.894118"
                />
                <path
                  d="M17 34C26.3738 34 34 26.3738 34 17C34 7.6262 26.3738 0 17 0C7.6262 0 0 7.6262 0 17C0 26.3738 7.6262 34 17 34ZM17 3.4C24.4987 3.4 30.6 9.5013 30.6 17C30.6 24.4987 24.4987 30.6 17 30.6C9.5013 30.6 3.4 24.4987 3.4 17C3.4 9.5013 9.5013 3.4 17 3.4Z"
                  fill="#E4E4E4"
                  fill-opacity="0.894118"
                />
              </svg>
            </button>
          </div>
          <div className="flex">
            <div className="w-1/2">From: Employee Name </div>
            <div className="w-1/2">
              Status:
              <select>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2">Date Raised: MM/DD/YY</div>
            <div className="w-1/2">Date Closed: MM/DD/YY</div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PayDisputeDialog;
