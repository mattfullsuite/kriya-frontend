import { useEffect, useState } from "react";

const Step3 = ({ employeeRecords, finalizeClick }) => {
  const [employeeList, setEmployeeList] = useState();
  console.log("Step 3");
  useEffect(() => {
    if (employeeRecords) {
      setEmployeeList(employeeRecords);
      // document.getElementById("step-3").style.display = "block";
    }
  }, [employeeRecords]);
  return (
    <>
      {employeeList && (
        <div id="step-3">
          <div className="mt-5 flex flex-col border-2 border-[#E4E4E4] rounded-[15px] p-5 bg-white overflow-auto">
            <table className="h-96">
              <thead>
                <tr className="text-left align-top border-b-4">
                  {Object.keys(employeeList[0]).map((key) => (
                    <th className="px-2 h-20 w-36" key={key}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employeeList.map((employee, index) => (
                  <tr className="border-b px-4 whitespace-nowrap" key={index}>
                    {Object.keys(employee).map((key) => (
                      <td key={key}>{employee[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 w-full flex">
            <button
              type="button"
              className="btn bg-[#666A40] shadow-md w-32 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto "
              onClick={finalizeClick}
            >
              Finalize
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Step3;
