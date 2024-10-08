import DataTable from "react-data-table-component";

const GroupDialog = (props) => {
  const data = props.dataAllPayslip;
  const columns = [
    {
      name: "ID",
      selector: (row) => row.emp_num,
      cell: (row) => {
        return (
          <>
            <div className="py-4 h-full">{row.emp_num}</div>
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.emp_name,
      cell: (row) => {
        return (
          <>
            <div className="py-4 h-full">{row.emp_name}</div>
          </>
        );
      },
      sortable: true,
      width: "200px",
    },
    {
      name: "Email",
      selector: (row) => row.work_email,
      cell: (row) => {
        return (
          <>
            <div className="py-4 h-full">{row.work_email}</div>
          </>
        );
      },
      sortable: true,
      width: "200px",
    },
    {
      name: "Date From",
      selector: (row) => row["Date From"],
      cell: (row) => {
        return (
          <div className="py-4 h-full">
            <table>
              <tr>
                <td className=" font-bold">Date From :</td>
              </tr>
              <tr>
                <td className="pl-2">{row["Date From"]}</td>
              </tr>
            </table>
          </div>
        );
      },
      sortable: true,
      width: "120px",
    },
    {
      name: "Dates To",
      selector: (row) => row["Date To"],
      cell: (row) => {
        return (
          <div className="py-4 h-full">
            <table>
              <tr>
                <td className=" font-bold">Date To :</td>
              </tr>
              <tr>
                <td className="pl-2">{row["Date To"]}</td>
              </tr>
            </table>
          </div>
        );
      },
      sortable: true,
      width: "120px",
    },
    {
      name: "Dates Payment",
      selector: (row) => row["Date Payment"],
      cell: (row) => {
        return (
          <div className="py-4 h-full">
            <table>
              <tr>
                <td className=" font-bold">Date Payment :</td>
              </tr>
              <tr>
                <td className="pl-2">{row["Date Payment"]}</td>
              </tr>
            </table>
          </div>
        );
      },
      sortable: true,
      width: "120px",
    },
    {
      name: "Payables",
      selector: (row) => row.payables,
      cell: (row) => {
        return (
          <div className="py-4 h-full">
            {Object.entries(JSON.parse(row.payables)).map(
              ([category, pay_item]) => (
                <>
                  <table>
                    <tr>
                      <td colspan="3">
                        <span className="font-bold">{category}</span> : <br />
                      </td>
                    </tr>
                    {Object.entries(pay_item).map(([payItem, amount]) => (
                      <>
                        <tr key={payItem}>
                          <td>&bull;</td>
                          <td className="pl-2 font-semibold">{payItem}:</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td className="pl-4">{amount}</td>
                        </tr>
                      </>
                    ))}
                  </table>
                </>
              )
            )}
          </div>
        );
      },
      sortable: true,
      width: "260px",
    },
    {
      name: "Totals",
      selector: (row) => row.totals,
      cell: (row) => {
        return (
          <div className="py-4 h-full">
            {Object.entries(JSON.parse(row.totals)).map(([key, value]) => (
              <table>
                <tr>
                  <td className=" font-bold">{key} :</td>
                </tr>
                <tr>
                  <td className="pl-2">{value}</td>
                </tr>
              </table>
            ))}
          </div>
        );
      },
      sortable: true,
      width: "140px",
    },
    {
      name: "Net Salary",
      selector: (row) => row.net_salary,
      cell: (row) => {
        return (
          <>
            <div className="py-4 h-full">{row.net_salary}</div>
          </>
        );
      },
      sortable: true,
      width: "120px",
    },
    {
      name: "Generated By",
      selector: (row) => row.generated_by,
      cell: (row) => {
        return (
          <>
            <div className="py-4 h-full">{row.generated_by}</div>
          </>
        );
      },
      sortable: true,
      width: "180px",
    },
    {
      name: "Source",
      selector: (row) => row.source,
      cell: (row) => {
        return (
          <>
            <div className="py-4 h-full">{row.source}</div>
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Date Time Created",
      selector: (row) => row.created_at,
      cell: (row) => {
        return (
          <>
            <div className="py-4 h-full">{row.created_at}</div>
          </>
        );
      },
      sortable: true,
      width: "200px",
    },
  ];

  return (
    <>
      <dialog id="group-records" className="modal  w-full">
        <div className="modal-box p-[15px] w-11/12 max-w-[1320px]">
          <div className="flex flex-row">
            <button
              className="m-r ml-auto"
              onClick={() => document.getElementById("group-records").close()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
          />
        </div>
      </dialog>
    </>
  );
};

export default GroupDialog;
