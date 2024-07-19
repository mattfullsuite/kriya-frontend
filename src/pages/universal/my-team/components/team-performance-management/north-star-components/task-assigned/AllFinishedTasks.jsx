import DataTable from "react-data-table-component";
import moment from "moment";

<<<<<<< HEAD
const AllFinishedTasks = ({setStatus}) => {
=======
const AllFinishedTasks = ({setStatus, finishedTasksData}) => {
>>>>>>> heroku/main-merging
  const columns = [
    {
      name: "Task",
      selector: (row) => (
<<<<<<< HEAD
        <p className="text-[#363636] text-[12px]">{row.task}</p>
=======
        <p className="text-[#363636] text-[12px]">{row.target_task}</p>
>>>>>>> heroku/main-merging
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
<<<<<<< HEAD
        <p className="text-[#363636] text-[12px]">{row.assigned_to}</p>
=======
        <p className="text-[#363636] text-[12px]">{row.a_fname + " " + row.a_sname}</p>
>>>>>>> heroku/main-merging
      ),
    },

    {
      name: "Date Assigned",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
<<<<<<< HEAD
          {moment(row.date_assigned).format("MMMM DD, YYYY")}
=======
          {moment(row.date_created).format("MMMM DD, YYYY")}
>>>>>>> heroku/main-merging
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
<<<<<<< HEAD
  ];

  const data = [
    {
      task: "Be true",
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
=======

    {
      name: "Finished Date",
      selector: (row) => (
        <p className="text-[#363636] text-[12px]">
          {(row.finished_date) && moment(row.finished_date).format("MMMM DD, YYYY")}
        </p>
      ),
      sortable: true,
    },


    {
      name: "Status",
      selector: (row) => 
      <p>{setStatus(row.status)}</p>,
      width: "140px"
>>>>>>> heroku/main-merging
    },
  ];

  return (
<<<<<<< HEAD
    <DataTable columns={columns} data={data} highlightOnHover pagination />
=======
    <DataTable columns={columns} data={finishedTasksData} highlightOnHover pagination />
>>>>>>> heroku/main-merging
  );
};

export default AllFinishedTasks;
