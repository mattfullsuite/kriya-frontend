const PayDisputes = (props) => {
  const data = props.payDisputes;

  return (
    <>
      <div className="mt-3 p-5 rounded-[15px] bg-white">
        <div className="flex items-center pb-4">
          <span>Pay Disputes</span>
          <select className="ml-auto p-2 w-26 border rounded-lg">
            <option disabled selected>
              Filter
            </option>
            <option>New</option>
            <option>Pending</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="h-14 text-left border-b">
                <th colspan="2">Employee Name</th>
                <th>Issue Raised</th>
                <th>Date Raised</th>
                <th>Date Closed</th>
                <th>Handled By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {data.length > 0 && (
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="h-16 border-b hover:bg-[#EEEEEE]">
                    <td>
                      <img
                        src={row.empPic}
                        alt="Pic"
                        className="w-[40px] h-[40px] rounded-full"
                      />
                    </td>
                    <td>
                      <span>{row.name}</span>
                      <br />
                      <span className="text-xs">{row.department}</span>
                    </td>
                    <td>{row.issueRaised}</td>
                    <td>{row.dateRaised}</td>
                    <td>{row.dateClosed}</td>
                    <td>{row.handledBy}</td>
                    <td>
                      {row.status == "New" ? (
                        <div className="w-24 text-center rounded bg-[#FFCD6B]">
                          {row.status}
                        </div>
                      ) : row.status == "Pending" ? (
                        <div className="w-24 text-center rounded bg-[#FF974D]">
                          {row.status}
                        </div>
                      ) : row.status == "Resolved" ? (
                        <div className="w-24 text-center rounded bg-[#7DDA74]">
                          {row.status}
                        </div>
                      ) : (
                        <div className="w-24 text-center rounded bg-[#008080] bg-opacity-30">
                          {row.status}
                        </div>
                      )}
                    </td>
                    <td>
                      <button className="w-24 h-8 bg-[#9E978E] bg-opacity-20 text-[#9E978E] rounded-md">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default PayDisputes;
