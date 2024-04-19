import React, {useState, useEffect} from "react";
import Headings from "./Headings";
import DataTable from "react-data-table-component";
import Axios from "axios";
import moment from "moment";

const TimeTable = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [attendance, setAttendance] = useState([]);
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        const fetchAttendanceData = async () => {
          try {
            const res = await Axios.get(BASE_URL + "/mtaa-getAttendanceData");
            setAttendance(res.data);

            const leave_res = await Axios.get(BASE_URL + "/mtaa-getLeaveData");
            setLeaves(leave_res.data)
          } catch (err) {
            console.log(err);
          }
        };
        fetchAttendanceData();
    });

    function calculateTotalHours(timeout, timein){
        var o = moment(timeout, 'HH:mm:ss a');
        var i = moment(timein, 'HH:mm:ss a');
    
        var duration = moment.duration(o.diff(i))
    
        // duration in hours
        var hours = parseInt(duration.asHours());
    
        // duration in minutes
        var minutes = parseInt(duration.asMinutes()) % 60;
    
        return hours + ":" + minutes
      }
    
      function checkTimeStatus(timeout, timein){
        var status = "";
        var o = moment(timeout, 'HH:mm:ss a');
        var i = moment(timein, 'HH:mm:ss a');
    
        var duration = moment.duration(o.diff(i))
    
        // duration in hours
        var hours = parseInt(duration.asHours());
    
        if (hours < 9){
          status = <p className="text-red-500"> Undertime </p>
        } else if (hours >= 9){
          status = "Completed";
        } else if (timeout == null || timein == null){
          status = "Missing";
        } 
        return status;
      }

      const checkDateIfLeave = (date) => {

        return (
          !JSON.stringify(leaves).includes(moment(date).format("YYYY-MM-DD"))
        );
      };

    const columns = [
        {
            name: "Date",
            selector: (row) => moment(row.date).format("MMM DD, YYYY") ,
            sortable: true,
        },

        {
            name: "Check in",
            selector: (row) => row.time_in,
            sortable: true,
        },

        {
            name: "Checkout",
            selector: (row) => row.time_out,
            sortable: true,
        },

        {
            name: "Work Time",
            selector: (row) => calculateTotalHours(row.time_out, row.time_in),
            sortable: true,
        },

        {
            name: "Status",
            selector: (row) => checkTimeStatus(row.time_out, row.time_in),
            sortable: true,
        },

        {
            name: "Actions",
            selector: (row) => (checkTimeStatus(row.time_out, row.time_in) != "Completed") ? <button className="btn btn-primary width-full ">Dispute</button> : (checkDateIfLeave(moment(row.date).format("YYYY-MM-DD"))) && <button className="btn btn-info width-full">Leave Taken</button>,
            sortable: true,
        },
    ];

    return(
        <div className="max-w-[1300px] m-auto">
            <Headings text={"Time Table"} />

            <div className="mt-10 box-border bg-white border border-[#e4e4e4] rounded-[15px]">
                <DataTable 
                columns={columns}
                data={attendance}
                 />
            </div>
        </div>
    );
}

export default TimeTable;