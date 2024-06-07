import React, {useRef, useState } from "react";
import DataTable from "react-data-table-component";
import Select from 'react-select';

const ApplicantTracker = () => {
  const [isEdit, setIsEdit] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef(true);

  const [newApplicantData, setNewApplicantData] = useState({
    // State to store data for new applicant form
    applicant_id: "",
    application_startdate: "",
    position_applied: "",
    status: "",
    s_name: "",
    f_name: "",
    m_name: "",
    email: "",
    contact_no: "",
    cv_link: "",
    test_result: "",
    interviewer: "",
    next_interview_date: "",
    interview_1st: "",
    interview_2nd: "",
    interview_3rd: "",
    notes: "",
  });
  const handleAddNewApplicant = (e) => {
    modalRef.current.showModal();
    e.preventDefault();
  };

  const handleCloseModal = (e) => {
    modalRef.current.close();
    e.preventDefault();
   
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'search') {
      setSearchQuery(value);
    } else {
      setNewApplicantData({ ...newApplicantData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedApplicantData = [...applicantData, newApplicantData];
    setApplicantData(updatedApplicantData);
    setNewApplicantData({
      applicant_id: "",
      application_startdate: "",
      position_applied: "",
      status: "",
      s_name: "",
      f_name: "",
      m_name: "",
      email: "",
      contact_no: "",
      cv_link: "",
      test_result: "",
      interviewer: "",
      next_interview_date: "",
      interview_1st: "",
      interview_2nd: "",
      interview_3rd: "",
      notes: "",
    });
    handleCloseModal(e);
  };


  const [applicantData, setApplicantData] = useState([
    {
      applicant_id: "1",
      application_startdate: "05/28/2024",
      position_applied: "Position 1",
      status: "Open",
      s_name: "Garcia",
      f_name: "Ian Paul",
      m_name: "Almendra",
      email: "ian@fullsuite.ph",
      contact_no: "09608970690",
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
      s_name: "Sanchez",
      f_name: "Antoniette",
      m_name: "Garcia",
      email: "antoniette@fullsuite.ph",
      contact_no: "09175069478",
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
      s_name: "Bautista",
      f_name: "Marvin",
      m_name: "Directo",
      email: "marvin@fullsuite.ph",
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
      s_name: "Sadcopen",
      f_name: "Deon Paul",
      m_name: "Wasit",
      email: "deon@fullsuite.ph",
      contact_no: "09487937460",
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
      s_name: "Salvador",
      f_name: "Matt Wilfred",
      m_name: "Cabunoc",
      email: "matt@fullsuite.ph",
      contact_no: "09667528054",
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

  const interviewerOptions = [
    "Interviewer 1", 
    "Interviewer 2", 
    "Interviewer 3", 
    "Interviewer 4"];

  const positionOptions = ["Position 1", "Position 2", "Position 3", "Position 4", "Position 5"];
  
  const handleEditClick = (index) => {
    setIsEdit(true);
    setSelectedIndex(index);
  };

  const handleSaveClick = () => {
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

  const handleStatusFilterChange  = (selectedOptions) => {
    setStatusFilter(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleDateFromFilterChange = (e) => {
    setDateFromFilter(e.target.value);
  };

  const handleDateToFilterChange = (e) => {
    setDateToFilter(e.target.value);
  };

  const searchTerms = searchQuery.toLowerCase().split(' ');

  
  
  const filteredData = applicantData.filter((applicant) => {
    const matchesStatus = !statusFilter.length || statusFilter.includes(applicant.status);
    
    const matchesDate = (!dateFromFilter || new Date(applicant.application_startdate) >= new Date(dateFromFilter)) &&
                        (!dateToFilter || new Date(applicant.application_startdate) <= new Date(dateToFilter));
    
    const applicantNames = [
      applicant.s_name.toLowerCase(),
      applicant.f_name.toLowerCase(), 
      applicant.m_name.toLowerCase()];
    
    const matchesSearch = searchTerms.every(term =>
                          applicantNames.some(name => name.includes(term))
                        );

    return matchesStatus && matchesDate && matchesSearch;
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
          <select
            value={row.position_applied}
            onChange={(e) => handleChange(e, "position_applied", rowIndex)}
          >
            {positionOptions.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          row.position_applied
        ),
      width: "200px",
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
      name: "Phone Number",
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
        ) : 
          <a href={row.cv_link}>{row.cv_link}</a>

        ,
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
      selector: (row, rowIndex) => {
        const view = (
          <button 
          className="btn btn-sm bg-[#e4e4e4] text-black text-xs"
          >View Notes</button>
        )
        return view;
      },
      
          
      width: "150px",
    },
    {
      name: "Action",
      selector: (row,rowIndex) => {
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

        <dialog className={"bg-white p-6 border border-[#e4e4e4] rounded-lg w-[800px] items-center"} ref={modalRef}>
          <div className="modal-content">
            <h1 className="text-[8px] md:text-xl font-bold text-[#363636]">Add New Applicant</h1>
            <form onSubmit={() => handleAddNewApplicant}>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="form-control w-full max-w-md md:mb-0:mr-4">
                    <div className="label">
                        <span className="label-text">Applicant ID:</span>
                    </div>
                      <input
                          name="application_id"
                          type="text"
                          onChange={handleInputChange}
                          placeholder="Applicant ID"
                          disabled
                          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                        />
                        </label>
                        
                        <label className="form-control w-full max-w-md md:mb-0:mr-4">
                            <div className="label">
                                <span className="label-text">Application Start Date:</span>
                            </div>
                        <input
                            name="application_startdate"
                            type="date"
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                        />
                        </label>
                        
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                  <label className="form-control w-full max-w-md md:mb-0:mr-4">
                      <div className="label gap">
                          <span className="label-text">Surname:</span>
                      </div>
                        <input
                            name="s_name"
                            type="text"
                            onChange={handleInputChange}
                            placeholder="Enter Surname"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                        />
                  </label>
                        
                  <label className="form-control w-full max-w-md md:mb-0:mr-4">
                       <div className="label">
                          <span className="label-text">First Name:</span>
                        </div>
                        <input
                            name="f_name"
                            type="text"
                            onChange={handleInputChange}
                            placeholder="Enter First Name"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                        />
                  </label>
                  
                  <label className="form-control w-full max-w-md md:mb-0:mr-4">
                            <div className="label">
                                <span className="label-text">Middle Name:</span>
                            </div>
                        <input
                            name="m_name"
                            type="text"
                            onChange={handleInputChange}
                            placeholder="Enter Middle Name"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                        />
                  </label>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <label className="form-control w-full max-w-md md:mb-0:mr-4">
                    <div className="label">
                        <span className="label-text">Email Contact:</span>
                    </div>
                      <input
                          name="email"
                          type="text"
                          onChange={handleInputChange}
                          placeholder="Enter Email Contact"
                          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                        />
                        </label>
                        
                        <label className="form-control w-full max-w-md md:mb-0:mr-4">
                            <div className="label">
                                <span className="label-text">Phone Number:</span>
                            </div>
                        <input
                            name="contact_no"
                            type="text"
                            onChange={handleInputChange}
                            placeholder="Enter Phone Number"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                        />
                        </label>
                        
              </div>
              <label className="form-control w-full max-w-md md:mb-0:mr-4">
                 <div className="label">
                    <span className="label-text">CV Link:</span>
                  </div>
                        <input
                            name="cv_link"
                            type="text"
                            onChange={handleInputChange}
                            placeholder="Enter CV Link"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                        />
              </label>
              <div className="flex flex-col md:flex-row gap-5">
                  <label className="form-control w-full max-w-md md:mb-0:mr-4">
                      <div className="label">
                          <span className="label-text">Position Applied:</span>
                      </div>
                        <select 
                            className='border border-gray-300 rounded-md px-3 py-2 mb-3 w-full'>
                            <option selected disabled>Select Position Applied</option>
                            <option>Position 1</option>
                            <option>Position 2</option>
                            <option>Position 3</option>
                            <option>Position 4</option>
                        </select>
                  </label>

                  <label className="form-control w-full max-w-md md:mb-0:mr-4">
                      <div className="label">
                          <span className="label-text">Interviewer:</span>
                      </div>
                      <select 
                          className='border border-gray-300 rounded-md px-3 py-2 mb-3 w-full'>
                          <option selected disabled>Select Interviewer</option>
                          <option>Interviewer 1</option>
                          <option>Interviewer 2</option>
                          <option>Interviewer 3</option>
                          <option>Interviewer 4</option>
                      </select>
                  </label>
              </div>
              <div className="box box-border flex flex-row justify-end">
                <button className="btn bg-[#666a40] text-white mr-2" type="submit" onClick={handleSubmit}>Submit</button>
                <button className="btn bg-[#e4e4e4]" onClick={(e) => {handleCloseModal(e)}}>Close</button>
              </div>
              
            </form>
          </div>
        </dialog>


      <div className="box box-border grid flex-row mb-5">
        <h1 className="text-[18px] md:text-2xl font-bold text-[#363636]">
          Applicant Tracking System
        </h1>
      </div>
      <div className="box box-border flex flex-row justify-between mb-4 items-center">
      <div>
          <button className="btn bg-[#666a40] text-white " onClick={handleAddNewApplicant}>+ Add New Applicant</button>
      </div>
      <div className="box box-border flex flex-row gap-2 self-center">
        <div>
        <label className="flex flex-row items-center p-2">
                        <input
                            type="text"
                            name="search"
                            onChange={handleInputChange}
                            placeholder="Search Applicant..."
                            className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] w-[400px]"
                        />
              </label>
        </div>
        <div className="flex flex-row items-center p-2">
<label>
          <select className="flex flex-nowrap border border-[#e4e4e4] rounded-[10px] items-center p-2" value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Status">Status</option>
            <option value="Date">Date</option>
          </select>
</label>
          
          
        </div>
          
    

      {selectedFilter === "Status" && (
        <div className="flex flex-row items-center">
          <label className="mr-2">Status:</label>
          <Select
            options={statusOptions.map(option => ({ value: option, label: option }))}
            onChange={handleStatusFilterChange}
            isClearable
            isMulti
          />
        </div>

      )}

      {selectedFilter === "Date" && (
        <div className=" flex flex-row gap-2 items-center">
          <label>From:</label>
          <input
            className="border border-[#e4e4e4] rounded-[10px] p-2"
            type="date"
            value={dateFromFilter}
            onChange={handleDateFromFilterChange}
          />
          <label>To:</label>
          <input
            className="border border-[#e4e4e4] rounded-[10px] p-2"
            type="date"
            value={dateToFilter}
            onChange={handleDateToFilterChange}
          />
        </div>
        )}
      </div>

      </div>
      
      
      

      <div className="box-border grid bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
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