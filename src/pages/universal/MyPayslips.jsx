import { useEffect, useState } from "react";
import Headings from "../../components/universal/Headings";
import axios from "axios";
const { format } = require("date-fns");

const MyPayslip = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [payslipRecords, setPayslipRecords] = useState([]);

  //Fetch Payslip of User
  const fetchUserPayslips = async () => {
    try {
      const res = await axios.get(BASE_URL + "/mp-getUserPayslip");
      // Parse String JSON to JSON
      res.data.forEach((item) => {
        item.dates = JSON.parse(item.dates);
        // Format dates
        for (let key in item.dates) {
          item.dates[key] = format(new Date(item.dates[key]), "MMMM dd, yyyy");
        }
        item.payables = JSON.parse(item.payables);
        item.totals = JSON.parse(item.totals);
      });
      setPayslipRecords(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserPayslips();
  }, []);

  return (
    <>
      <div className="max-w-[1300px] m-auto">
        <Headings text={"My Payslips"} />

        <div className="bg-white box-border p-5 w-full rounded-[15px] border border-[#E4E4E4] mt-2 flex flex-col justify-between gap-5 min-h-[300px] relative">
          <span className="font-bold text-[#363636] text-[16px]">
            Pay Disputes
          </span>
        </div>

        {/* Recent Payslips */}
        <div className="bg-white box-border p-5 w-full rounded-[15px] border border-[#E4E4E4] mt-2 flex flex-col justify-between gap-5 min-h-[500px] relative">
          <span className="font-bold text-[#363636] text-[16px]">
            Recent Payslips
          </span>
          <div className="mt-5 p-2 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
            {payslipRecords.length > 0 ? (
              <table className="table ">
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
                      <td>
                        <span className="text-black">
                          {row.dates["Payment"]}
                        </span>
                      </td>
                      <td>
                        <p>
                          {row.dates["From"]} to {row.dates["To"]}
                        </p>
                      </td>
                      <td>
                        <button className="text-[12px] font-semibold text-[#CC5500] bg-[#F5DDCC] px-3 py-2 rounded-[8px]">
                          View
                        </button>
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
