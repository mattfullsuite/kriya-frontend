import DataTable from "react-data-table-component";
import moment from "moment";

const MyFinishedTasks = ({setStatus}) => {
  const columns = [
    {
      name: "Task",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">{row.task}</p>
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
        <p className="text-[#363636] text-[12px]">{row.assigned_to}</p>
      ),
    },

    {
      name: "Assigned By",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">{row.assigned_by}</p>
      ),
    },

    {
      name: "Date Assigned",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {moment(row.date_assigned).format("MMMM DD, YYYY")}
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
      selector: (row) => <>{setStatus(row.status)}</>,
    },
  ];

  const data = [
    {
      task: "Be true hahaha",
      assigned_to: "Marvin Bautista",
      assigned_by: "Matt Wilfred Salvador",
      date_assigned: "2024-03-03",
      target_date: "2024-04-04",
      status: 5,
    },
    {
      task: "Create a new and improved product offer",
      assigned_to: "Marvin Bautista",
      assigned_by: "Matt Wilfred Salvador",
      date_assigned: "2024-03-03",
      target_date: "2024-04-04",
      status: 2,
    },
    {
      task: "Create a new and improved product offer",
      assigned_to: "Marvin Bautista",
      assigned_by: "Matt Wilfred Salvador",
      date_assigned: "2024-03-03",
      target_date: "2024-04-04",
      status: 3,
    },
    {
      task: "Create a new and improved product offer",
      assigned_to: "Marvin Bautista",
      assigned_by: "Matt Wilfred Salvador",
      date_assigned: "2024-03-03",
      target_date: "2024-04-04",
      status: 2,
    },
    {
      task: "Create a new and improved product offer",
      assigned_to: "Marvin Bautista",
      assigned_by: "Matt Wilfred Salvador",
      date_assigned: "2024-03-03",
      target_date: "2024-04-04",
      status: 1,
    },
  ];

  return (
    <DataTable columns={columns} data={data} highlightOnHover pagination />
  );
};

export default MyFinishedTasks;
