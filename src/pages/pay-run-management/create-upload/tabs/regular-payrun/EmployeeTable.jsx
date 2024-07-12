const EmployeeTable = ({ employeeList, payItems }) => {
  return (
    <>
      {employeeList && (
        <div className="mt-5 flex flex-col border-2  border-[#E4E4E4] rounded-[15px] p-5 bg-white overflow-auto">
          <table className="h-96">
            <thead className="whitespace-nowrap align-top">
              {Object?.keys(employeeList[0]).map((key) => (
                <th className="p-1 ">{key}</th>
              ))}
            </thead>
            <tr>
              <td></td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
