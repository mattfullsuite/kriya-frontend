const PayrollNotification = ({ buttonPayrollNotifState }) => {
  return (
    <>
      <label
        htmlFor="uploadFile"
        className={
          buttonPayrollNotifState
            ? "btn bg-[#666A40] mt-auto shadow-md w-48 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto"
            : "btn btn-disabled w-48 ml-auto"
        }
      >
        Payroll Notification
        <input
          type="file"
          accept=".xlsx, .csv"
          className=" hidden"
          id="uploadFile"
          onChange={(e) => {
            // uploadFile(e);
          }}
        />
      </label>
    </>
  );
};

export default PayrollNotification;
