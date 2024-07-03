import {useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";

const MyTeam = ({setStatus}) => {

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [sameLineTasks, setSameLineTasks] = useState([]);

  useEffect(() => {
    const fetchNorthStarData = async () => {
      try {
        const same_line_tasks_res = await axios.get(BASE_URL + "/ns-getMyTeamTasks");
        setSameLineTasks(same_line_tasks_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNorthStarData();
  }, []);

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
      selector: (row) => <>{setStatus(row.status)}</>,
    },
  ];

  // const data = [
  //   {
  //     task: "Be true",
  //     assigned_to: "Marvin Bautista",
  //     assigned_by: "Matt Wilfred Salvador",
  //     date_assigned: "2024-03-03",
  //     target_date: "2024-04-04",
  //     status: 5,
  //   },
  //   {
  //     task: "Create a new and improved product offer",
  //     assigned_to: "Marvin Bautista",
  //     assigned_by: "Matt Wilfred Salvador",
  //     date_assigned: "2024-03-03",
  //     target_date: "2024-04-04",
  //     status: 2,
  //   },
  //   {
  //     task: "Create a new and improved product offer",
  //     assigned_to: "Marvin Bautista",
  //     assigned_by: "Matt Wilfred Salvador",
  //     date_assigned: "2024-03-03",
  //     target_date: "2024-04-04",
  //     status: 3,
  //   },
  //   {
  //     task: "Create a new and improved product offer",
  //     assigned_to: "Marvin Bautista",
  //     assigned_by: "Matt Wilfred Salvador",
  //     date_assigned: "2024-03-03",
  //     target_date: "2024-04-04",
  //     status: 2,
  //   },
  //   {
  //     task: "Create a new and improved product offer",
  //     assigned_to: "Marvin Bautista",
  //     assigned_by: "Matt Wilfred Salvador",
  //     date_assigned: "2024-03-03",
  //     target_date: "2024-04-04",
  //     status: 1,
  //   },
  // ];

  return (
    <DataTable columns={columns} data={sameLineTasks} highlightOnHover pagination />
  );
};

export default MyTeam;
