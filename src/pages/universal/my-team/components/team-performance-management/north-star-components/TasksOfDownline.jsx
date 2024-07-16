import DataTable from "react-data-table-component";
import moment from "moment";

const TasksOfDownline = ({setStatus, taskDownlineData}) => {
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
            <p className="text-[#363636] text-[12px]">{row.a_f_name + " " + row.a_s_name}</p>
          ),
        },

        {
          name: "Assigned By",
          selector: (row) => (
            <p className="text-[#363636] text-[12px]">{row.e_f_name + " " + row.e_s_name}</p>
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
        },
      ];

  return (
    <DataTable columns={columns} data={taskDownlineData} highlightOnHover pagination />
  );
};

export default TasksOfDownline;
