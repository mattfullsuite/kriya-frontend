import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";

const DashBPTONotices = () => {
  var count = 1;

  const [approved, setApproved] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //


  useEffect(() => {
    const fetchAllApproved = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/showapprovedleaves");
        setApproved(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllApproved();
  }, []);

  const columns = [
    {
      name: "#",
      selector: row => row.leave_id,
      sortable: true
    },

    {
      name: "Date filed",
      selector: row => moment(row.date_filed).format('MMM DD YYYY'),
      sortable: true
    },

    {
      name: "Name",
      selector: row => row.s_name + ", " + row.f_name + " " + row.m_name
    },

    {
      name: "PTO type",
      selector: row => row.leave_type
    },

    {
      name: "Date(s)",
        selector: (row) => row.leave_from === row.leave_to ? moment(row.leave_from).format('MMM. DD, YYYY') : moment(row.leave_from).format('MMM. DD, YYYY') + "  to  "+ moment(row.leave_to).format('MMM. DD, YYYY'),
        sortable: true
    },
  ]

  return (
    <>
      {/* PTO Notices */}
      <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col items-center justify-center">
        <h1 className="text-lg font-semibold mb-4">Approved PTO Notices</h1>


        <DataTable
          columns = {columns}
          data = {approved}
          pagination
          highlightOnHover
        ></DataTable>
      </div>
    </>
  );
};

export default DashBPTONotices;
