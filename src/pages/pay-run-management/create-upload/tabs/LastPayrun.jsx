const LastPayrun = () => {
  return (
    <div className="mt-10 flex flex-col md:flex-row box-border gap-3 p-5">
      <div className="p-2 w-1/3 card rounded-[15px]">
        <table className="">
          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Employee Name:</p>
            </td>
            <td>
              <input
                type="text"
                placeholder="Search Employee"
                className="input input-bordered input-sm w-full mt-4"
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Employee ID:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-sm w-full mt-4"
                disabled
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Hire Date:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                type="date"
                className="input input-bordered input-sm w-full mt-4"
                disabled
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">End Date:</p>
            </td>
            <td>
              <input
                type="date"
                className="input input-bordered input-sm w-full mt-4"
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">End Date</p>
              <p className="text-right pr-4 text-xs">
                (13th month pay calculation)
              </p>
            </td>
            <td>
              <input
                type="date"
                className="input input-bordered input-sm w-full mt-4"
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Base Pay:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-sm w-full  mt-4"
                disabled
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Last Payrun:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                type="date"
                className="input input-bordered input-sm w-full mt-4"
                disabled
              />
            </td>
          </tr>
          <tr>
            <td>
              <p className="mt-4 text-right pr-4">Pro-rated 13th</p>
              <p className="text-right pr-4">Month Pay:</p>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #e4e4e4",
                  backgroundColor: "#f2f2f2",
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-sm w-full mt-4"
                disabled
              />
            </td>
          </tr>
        </table>
        <div className="card-actions justify-end mt-4">
          <button className="btn bg-[#666A40] text-white">Populate</button>
        </div>
      </div>
      <div className="p-2 w-2/3 overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-[#666A40] text-white">
              <th>Last Payrun Calculation</th>
              <th>Last Pay</th>
              <th>Total Earnings</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Standard Pay:</td>
              <td>123456.78</td>
              <td>1234567.89</td>
            </tr>
            <tr>
              <td>Basic Pay</td>
              <td>123456.78</td>
              <td>123456.78</td>
            </tr>
            <tr>
              <td>Standard Pay Item 1</td>
              <td>123456.78</td>
              <td>123456.78</td>
            </tr>
            <tr>
              <td>Standard Pay Item 2</td>
              <td>123456.78</td>
              <td>123456.78</td>
            </tr>
            <tr>
              <td>Standard Pay Item 3</td>
              <td>123456.78</td>
              <td>123456.78</td>
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Taxable Items:</td>
              <td></td>
              <td></td>
            </tr>
            <tr
              button
              className="btn btn-outline"
              style={{
                backgroundColor: "transparent",
                color: "#B2AC88",
                border: "none",
              }}
            >
              + Add Item
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Non Taxable Items:</td>
              <td></td>
              <td></td>
            </tr>
            <tr
              button
              className="btn btn-outline"
              style={{
                backgroundColor: "transparent",
                color: "#B2AC88",
                border: "none",
              }}
            >
              + Add Item
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Pre-tax Deduction:</td>
              <td></td>
              <td></td>
            </tr>
            <tr
              button
              className="btn btn-outline"
              style={{
                backgroundColor: "transparent",
                color: "#B2AC88",
                border: "none",
              }}
            >
              + Add Item
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Post-tax Deduction:</td>
              <td></td>
              <td></td>
            </tr>
            <tr
              button
              className="btn btn-outline"
              style={{
                backgroundColor: "transparent",
                color: "#B2AC88",
                border: "none",
              }}
            >
              + Add Item
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Post-tax Income:</td>
              <td></td>
              <td></td>
            </tr>
            <tr
              button
              className="btn btn-outline"
              style={{
                backgroundColor: "transparent",
                color: "#B2AC88",
                border: "none",
              }}
            >
              + Add Item
            </tr>
            <tr className="bg-[#E6E7DD]">
              <td className="font-bold">Income Tax Withheld:</td>
              <td></td>
              <td></td>
            </tr>
            <tr className="bg-[#666A40] text-white font-bold">
              <td className="font-bold">NET PAY EARNINGS</td>
              <td>123456.78</td>
              <td>1234567.89</td>
            </tr>
            <tr>
              <td button className="btn">
                Clear
              </td>
              <td button className="btn">
                Finalize
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LastPayrun;
