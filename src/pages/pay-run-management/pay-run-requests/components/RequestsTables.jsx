const RequestsTable = (props) => {
  const data = props.requestData;
  return (
    <>
      <div className="mt-10 p-5 w-full rounded-[15px] bg-white">
        <div className="w-fit flex gap-4 ml-auto ">
          <input
            type="text"
            className=" w-96 border rounded-full bg-[#F5F5F5]"
          />
          <select className="p-2 w-26 border rounded-lg">
            <option disabled selected>
              Filter
            </option>
          </select>
        </div>
        <div>
          <table className="min-w-full">
            <thead className="h-14 text-left border-b">
              <tr className="text-left">
                <th>Date and Time Generated</th>
                <th>Duration</th>
                <th>Pay Date</th>
                <th>Source</th>
                <th>Action</th>
              </tr>
            </thead>
            {data.length > 0 && (
              <tbody>
                {data.map((row) => (
                  <tr
                    key={row.id}
                    className="h-16 border-b  hover:bg-[#EEEEEE]"
                  >
                    <td>{row.dateTimeGenerated}</td>
                    <td>{row.duration}</td>
                    <td>{row.payDate}</td>
                    <td>{row.source}</td>
                    <td>
                      <button className="w-24 h-8 bg-[#9E978E] bg-opacity-20 text-[#9E978E] rounded-md">
                        View
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

export default RequestsTable;
