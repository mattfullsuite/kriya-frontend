import DataTable from "react-data-table-component";

const GroupDialog = (props) => {
  const data = props.dataAllPayslip;

  const columns = [
    { name: "ID", selector: (row) => row.emp_num, sortable: true },
    {
      name: "Name",
      selector: (row) => row.emp_name,
      cell: (row) => {
        return (
          <>
            <div className="w-40">{row.emp_name}</div>
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.work_email,
      cell: (row) => {
        return (
          <>
            <div className="w-40">{row.work_email}</div>
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Dates",
      selector: (row) => row.dates,
      cell: (row) => {
        return (
          <>
            <div className="w-fit">{row.dates}</div>
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Payables",
      selector: (row) => row.payables,
      cell: (row) => {
        return (
          <>
            <div className="w-fit">{row.payables}</div>
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Totals",
      selector: (row) => row.totals,
      cell: (row) => {
        return (
          <>
            <div className="w-fit">{row.totals}</div>
          </>
        );
      },
      sortable: true,
    },
    { name: "Net Salary", selector: (row) => row.net_salary, sortable: true },
    {
      name: "Generated By",
      selector: (row) => row.generated_by,
      sortable: true,
    },
    { name: "Source", selector: (row) => row.source, sortable: true },
    {
      name: "Date Time Created",
      selector: (row) => row.created_at,
      cell: (row) => {
        return (
          <>
            <div className="w-fit">{row.created_at}</div>
          </>
        );
      },
      sortable: true,
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