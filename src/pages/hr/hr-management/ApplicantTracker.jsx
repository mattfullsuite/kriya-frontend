import React, {useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Select from 'react-select';

const ApplicantTracker = () => {
  const [isEdit, setIsEdit] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");

  const [applicantData, setApplicantData] = useState([
    {
      applicant_id: "1",
      application_startdate: "05/28/2024",
      position_applied: "Position 1",
      status: "Open",
      s_name: "Smith",
      f_name: "John",
      m_name: "Doe",
      email: "john.smith@example.com",
      contact_no: "123456789",
      cv_link: "link1.com",
      test_result: "Pass",
      interviewer: "Interviewer 1",
      next_interview_date: "06/01/2024",
      interview_1st: "First Interview",
      interview_2nd: "Second Interview",
      interview_3rd: "Third Interview",
      notes: "Note 1",
    },
    {
      applicant_id: "2",
      application_startdate: "05/27/2024",
      position_applied: "Software Engineer",
      status: "Job Offer Sent",
      s_name: "Doe",
      f_name: "Jane",
      m_name: "Smith",
      email: "jane.doe@example.com",
      contact_no: "987654321",
      cv_link: "link2.com",
      test_result: "Fail",
      interviewer: "Interviewer 2",
      next_interview_date: "06/02/2024",
      interview_1st: "First Interview",
      interview_2nd: "Second Interview",
      interview_3rd: "Third Interview",
      notes: "Note 2",
    },
    {
      applicant_id: "3",
      application_startdate: "05/27/2024",
      position_applied: "Software Engineer",
      status: "Job Offer Accepted",
      s_name: "Doe",
      f_name: "Jane",
      m_name: "Smith",
      email: "jane.doe@example.com",
      contact_no: "987654321",
      cv_link: "link2.com",
      test_result: "Fail",
      interviewer: "Interviewer 2",
      next_interview_date: "06/02/2024",
      interview_1st: "First Interview",
      interview_2nd: "Second Interview",
      interview_3rd: "Third Interview",
      notes: "Note 2",
    },
    {
      applicant_id: "4",
      application_startdate: "05/27/2024",
      position_applied: "Software Engineer",
      status: "Test Sent",
      s_name: "Doe",
      f_name: "Jane",
      m_name: "Smith",
      email: "jane.doe@example.com",
      contact_no: "987654321",
      cv_link: "link2.com",
      test_result: "Fail",
      interviewer: "Interviewer 2",
      next_interview_date: "06/02/2024",
      interview_1st: "First Interview",
      interview_2nd: "Second Interview",
      interview_3rd: "Third Interview",
      notes: "Note 2",
    },
    {
      applicant_id: "5",
      application_startdate: "05/27/2024",
      position_applied: "Software Engineer",
      status: "Test Completed",
      s_name: "Doe",
      f_name: "Jane",
      m_name: "Smith",
      email: "jane.doe@example.com",
      contact_no: "987654321",
      cv_link: "link2.com",
      test_result: "Fail",
      interviewer: "Interviewer 2",
      next_interview_date: "06/02/2024",
      interview_1st: "First Interview",
      interview_2nd: "Second Interview",
      interview_3rd: "Third Interview",
      notes: "Note 2",
    },
  ]);
  const statusOptions = [
    "Open", "No Show", 
    "Test Sent","Test Completed", 
    "For initial interview", 
    "First Interview Done", "Second Interview Done" ,"Third Interview Done",
    "For Next Interview",
    "Did Not Pass","Rejection Email Sent", "Blacklisted", 
    "Job Offer Sent", "Job Offer Accepted", "Job Offer Rejected"];
  const interviewerOptions = ["Interviewer 1", "Interviewer 2", "Interviewer 3", "Interviewer 4"];
  const handleEditClick = (index) => {
    setIsEdit(true);
    setSelectedIndex(index);
  };

  const handleSaveClick = (index) => {
    setIsEdit(false);
    setSelectedIndex(null);
    // Optional: Send updated data to backend
    // axios.put(`${BASE_URL}/applicants/${applicantData[index].applicant_id}`, applicantData[index])
    //   .then(response => {
    //     console.log('Data updated successfully');
    //   })
    //   .catch(error => {
    //     console.error('There was an error updating the data!', error);
    //   });
  };

  const handleChange = (e, field, index) => {
    const updatedData = [...applicantData];
    updatedData[index][field] = e.target.value;
    setApplicantData(updatedData);
  };

  const handleStatusFilterChange = (selectedOption) => {
    setStatusFilter(selectedOption ? selectedOption.value : "");
  };

  const handleDateFromFilterChange = (e) => {
    setDateFromFilter(e.target.value);
  };

  const handleDateToFilterChange = (e) => {
    setDateToFilter(e.target.value);
  };

  const filteredData = applicantData.filter((applicant) => {
    const matchesStatus = !statusFilter || applicant.status === statusFilter;
    const matchesDate = (!dateFromFilter || new Date(applicant.application_startdate) >= new Date(dateFromFilter)) &&
                        (!dateToFilter || new Date(applicant.application_startdate) <= new Date(dateToFilter));
    return matchesStatus && matchesDate;
  });


  const ApplicantColumns = [
    {
      name: "Applicant ID",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input 
            type="text"
            value={row.applicant_id}
            onChange={(e) => handleChange(e, "applicant_id", rowIndex)}
          />
        ) : (
          row.applicant_id
        ),
      width: "100px",
      color: "[#666a40]",
    },
    {
      name: "Application Date",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="date"
            value={row.application_startdate}
            onChange={(e) => handleChange(e, "application_startdate", rowIndex)}
          />
        ) : (
          row.application_startdate
        ),
      width: "150px",
    },
    {
      name: "Position Applied",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.position_applied}
            onChange={(e) => handleChange(e, "position_applied", rowIndex)}
          />
        ) : (
          row.position_applied
        ),
      width: "150px",
    },
    {
      name: "Status",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <select
            value={row.status}
            onChange={(e) => handleChange(e, "status", rowIndex)}
          >
            {statusOptions.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          row.status
        ),
      width: "200px",
    },
    {
      name: "Surname",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.s_name}
            onChange={(e) => handleChange(e, "s_name", rowIndex)}
          />
        ) : (
          row.s_name
        ),
      width: "150px",
    },
    {
      name: "First Name",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.f_name}
            onChange={(e) => handleChange(e, "f_name", rowIndex)}
          />
        ) : (
          row.f_name
        ),
      width: "150px",
    },
    {
      name: "Middle Name",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.m_name}
            onChange={(e) => handleChange(e, "m_name", rowIndex)}
          />
        ) : (
          row.m_name
        ),
      width: "150px",
    },
    {
      name: "Email Contact",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.email}
            onChange={(e) => handleChange(e, "email", rowIndex)}
          />
        ) : (
          row.email
        ),
      width: "150px",
    },
    {
      name: "Contact No.",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.contact_no}
            onChange={(e) => handleChange(e, "contact_no", rowIndex)}
          />
        ) : (
          row.contact_no
        ),
      width: "150px",
    },
    {
      name: "CV Link",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.cv_link}
            onChange={(e) => handleChange(e, "cv_link", rowIndex)}
          />
        ) : (
          row.cv_link
        ),
      width: "150px",
    },
    {
      name: "Interviewer",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <select
            value={row.interviewer}
            onChange={(e) => handleChange(e, "interviewer", rowIndex)}
          >
            {interviewerOptions.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          row.interviewer
        ),
      width: "200px",
    },
    {
      name: "Test Result",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.test_result}
            onChange={(e) => handleChange(e, "test_result", rowIndex)}
          />
        ) : (
          row.test_result
        ),
      width: "150px",
    },
    {
      name: "Next Interview Date",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="date"
            value={row.next_interview_date}
            onChange={(e) => handleChange(e, "next_interview_date", rowIndex)}
          />
        ) : (
          row.next_interview_date
        ),
      width: "150px",
    },
    {
      name: "First Interview",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.interview_1st}
            onChange={(e) => handleChange(e, "interview_1st", rowIndex)}
          />
        ) : (
          row.interview_1st
        ),
      width: "150px",
    },
    {
      name: "Second Interview",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.interview_2nd}
            onChange={(e) => handleChange(e, "interview_2nd", rowIndex)}
          />
        ) : (
          row.interview_2nd
        ),
      width: "150px",
    },
    {
      name: "Third Interview",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.interview_3rd}
            onChange={(e) => handleChange(e, "interview_3rd", rowIndex)}
          />
        ) : (
          row.interview_3rd
        ),
      width: "150px",
    },
    {
      name: "Notes",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            type="text"
            value={row.notes}
            onChange={(e) => handleChange(e, "notes", rowIndex)}
          />
        ) : (
          row.notes
        ),
      width: "150px",
    },
    {
      name: "Action",
      selector: (row, rowIndex) => {
        const edit = (
          <button
            className="btn btn-sm bg-[#666a40] text-white text-xs"
            onClick={() => handleEditClick(rowIndex)}
          >
            Edit
          </button>
        );
        const save = (
          <button
            className="btn btn-sm bg-[#666a40] text-white text-xs"
            onClick={() => handleSaveClick(rowIndex)}
          >
            Save
          </button>
        );

        return isEdit && selectedIndex === rowIndex ? save : edit;
      },
    },
  ];

  return (
    <>
      <div className="box box-border flex flex-row mb-5">
        <h1 className="text-[18px] md:text-2xl font-bold text-[#363636]">
          Applicant Tracking System
        </h1>
        
      </div>
      <div className="ml-auto">
          <label className="mr-2">Filter By:</label>
          <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Status">Status</option>
            <option value="Date">Date</option>
          </select>
        </div>
      {selectedFilter === "Status" && (
        <div className="mb-4">
          <label>Status Filter:</label>
          <Select
            options={statusOptions.map(option => ({ value: option, label: option }))}
            onChange={handleStatusFilterChange}
            isClearable
          />
        </div>
      )}

      {selectedFilter === "Date" && (
        <div className="mb-4">
          <label>Date From:</label>
          <input
            type="date"
            value={dateFromFilter}
            onChange={handleDateFromFilterChange}
          />
          <label>Date To:</label>
          <input
            type="date"
            value={dateToFilter}
            onChange={handleDateToFilterChange}
          />
        </div>
      )}

      <div className="box-border grid flex flex-wrap bg-white p-5 border border-[#e4e4e4] rounded-[15px] flex flex-col justify-between">
        <DataTable
          columns={ApplicantColumns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          style={{ textAlign: "center" }}
        />
      </div>
    </>
  );
};

export default ApplicantTracker;