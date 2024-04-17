import { useState } from "react";
import Headings from "../../components/universal/Headings";
const MyPayslip = () => {
  const [payslipRecords, setPayslipRecords] = useState([]);

  console.log(payslipRecords.length);

  return (
    <>
      <div className="max-w-[1300px] m-auto">
        <Headings text={"My Payslips"} />
        <div className="bg-white box-border p-5 w-full rounded-[15px] border border-[#E4E4E4] mt-2 flex flex-col justify-between gap-5 min-h-[300px] relative">
          <span className="font-bold text-[#363636] text-[16px]">
            Recent Payslips
          </span>
          <div className="mt-5 p-2 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
            {payslipRecords.length > 0 ? (
              <table border="1" className="table min-w-[1200px]">
                <thead>
                  <tr>
                    <th>Pay Date</th>
                    <th>Pay Period</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {payslipRecords.map((row) => (
                    <tr key={row.id}>
                      <td>{row.dates["Payment"]}</td>
                      <td>
                        <p className="indent-5">
                          {row.dates["From"]} to {row.dates["To"]}
                        </p>
                      </td>
                      <td>
                        <button>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span>No Record Found</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPayslip;
