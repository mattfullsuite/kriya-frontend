import {useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";

const MyTasks = ({setStatus, myTasksData}) => {

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [sameLineTasks, setSameLineTasks] = useState([]);

  useEffect(() => {
    const fetchNorthStarData = async () => {
      try {
        const same_line_tasks_res = await axios.get(BASE_URL + "/ns-getMyTasks");
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
        <option value={2}>On Hold</option>
        <option value={3}>In Progress</option>
        <option value={4}>For Review</option>
      </select>,
      width: "140px"
    },
  ];


  return (
    <DataTable columns={columns} data={myTasksData} highlightOnHover pagination />
  );
};

export default MyTasks;