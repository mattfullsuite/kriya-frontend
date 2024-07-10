import DataTable from "react-data-table-component";
import moment from "moment";

const AllReviewTasks = ({setStatus, allTasksData}) => {

  const columns = [
    {
      name: "Task",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">{row.target_task}</p>
      ),
      width: "300px",
    },

    {
      name: "Notes",
      selector: (row) => (
        <a className="text-[#008080] text-[12px] underline">Review Notes</a>
      ),
    },

    {
      name: "Assigned To",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">{row.a_fname + " " + row.a_sname}</p>
      ),
    },

    {
      name: "Assigned By",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">{row.r_fname + " " + row.r_sname}</p>
      ),
    },

    {
      name: "Date Assigned",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {moment(row.date_created).format("MMMM DD, YYYY")}
        </p>
      ),
      sortable: true,
    },

    {
      name: "Target Date",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {moment(row.target_date).format("MMMM DD, YYYY")}
        </p>
      ),
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => 
      <select defaultValue={row.status} className="outline-none border-2 border-black px-2 py-1 rounded-[8px]">
        <option value={1}>Pending</option>
        <option value={2}>Returned</option>
        <option value={3}>Finished</option>
        <option value={9}>For Reviewx</option>

      </select>,
      width: "140px"
    },
  ];

  return (
    <DataTable columns={columns} data={allTasksData} highlightOnHover pagination />
  );
};

export default AllReviewTasks;