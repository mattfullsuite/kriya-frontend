import React, {useRef, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeAnimated from 'react-select/animated';
import axios from "axios";
import moment from "moment";

const animatedComponents = makeAnimated();

const ApplicantTracker = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [isEdit, setIsEdit] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [positionOptions, setPositionOptions] = useState([]);
  
  const addApplicantmodalRef = useRef(true);
  const notesmodalRef= useRef(true);

  const [applicantData, setApplicantData] = useState([])

  const [newApplicantData, setNewApplicantData] = useState({
    // State to store data for new applicant form
    app_start_date: "",
    position_applied: "",
    status: "",
    s_name: "",
    f_name: "",
    m_name: "",
    email: "",
    source:"",
    contact_no: "",
    cv_link: "",
    test_result: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicant_data_res = await axios.get(BASE_URL + "/ats-getApplicantsFromDatabase");
        const positions_data_res = await axios.get(BASE_URL + "/ats-getPositionsFromCompany");
        setApplicantData(applicant_data_res.data);
        setPositionOptions(positions_data_res.data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleAddNewApplicant = (e) => {
    addApplicantmodalRef.current.showModal(e);
    e.preventDefault(e);
  };

  const handleViewNotes = (rowIndex) => {
    setSelectedIndex (rowIndex);
    notesmodalRef.current.showModal(rowIndex);
  }

  const viewNotesCloseModal =(e) => {
    notesmodalRef.current.close();
    e.preventDefault (e);
  }

  const handleCloseModal = (e) => {
    addApplicantmodalRef.current.close();
    e.preventDefault(e);
   
  };

  const handleaddNewNotesModal = (e) => {
    notesmodalRef.current.close(e);
    handleSubmitNotes(e);
    e.preventDefault (e);
  }

  // const handlecloseNewNotesModal = (e) => {
  //   addNewNotesmodalRef.current.close(e);
  //   e.preventDefault (e);
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'search') {
      setSearchQuery(value);
    } 
    else {
      // setNewApplicantData({ ...newApplicantData, [name]: value });
      setNewApplicantData({
        ...newApplicantData,
        [e.target.name]: [e.target.value]
      });
      
      console.log(JSON.stringify(newApplicantData)) 
    }
  };

  // const handleInputChange = (event) => {
  //   setNewApplicantData({
  //     ...newApplicantData, 
  //     [event.target.name]: [event.target.value]
  //   });

  //   console.log(JSON.stringify(newApplicantData)) 
  // }

  // const handleEditChange = (event) => {
  //   setApplicantData({
  //     ...applicantData,
  //     [event.target.name]: [event.target.value]
  //   });

  //   console.log(JSON.stringify(applicantData)) 
  // }
  
  const handleSubmitNotes = (e) =>{
    toast.success("Note added successfully!");
    notesmodalRef.current.close();
  }
  const handleSubmit = (e) => {
    e.preventDefault(e);

     axios
      .post(BASE_URL + "/ats-modifiedAddNewApplicant", newApplicantData)
      .then((res) => console.log("Added New Applicant"))
      .catch((err) => console.log(err));

    // const updatedApplicantData = [newApplicantData, ...applicantData];
    // setApplicantData(updatedApplicantData);
    
    // setNewApplicantData({
    //   applicant_id: "",
    //   application_startdate: "",
    //   position_applied: "",
    //   status: "",
    //   reject: "",
    //   s_name: "",
    //   f_name: "",
    //   m_name: "",
    //   email: "",
    //   contact_no: "",
    //   cv_link: "",
    //   test_result: "",
    //   interviewer: "",
    //   next_interview_date: "",
    //   source:"",
    //   notes: "",
    // });
    handleCloseModal(e);
    
    toast.success("Applicant added successfully!");
  };



  // const [applicantData, setApplicantData] = useState([
  //   {
  //     applicant_id: "1",
  //     application_startdate: "05/28/2024",
  //     position_applied: "Software Engineer",
  //     source:"Referral",
  //     status: "Open",
  //     s_name: "Garcia",
  //     f_name: "Ian Paul",
  //     m_name: "Almendra",
  //     email: "ian@fullsuite.ph",
  //     contact_no: "09608970690",
  //     cv_link: "link1.com",
  //     test_result: "Pass",
  //     interviewer: "Interviewer 1",
  //     next_interview_date: "06/01/2024",
  //     notes: "Note 1",
  //   },
  //   {
  //     applicant_id: "2",
  //     application_startdate: "05/27/2024",
  //     position_applied: "Software Engineer",
  //     source:"Referral",
  //     status: "Job Offer Sent",
  //     s_name: "Sanchez",
  //     f_name: "Antoniette",
  //     m_name: "Garcia",
  //     email: "antoniette@fullsuite.ph",
  //     contact_no: "09175069478",
  //     cv_link: "link2.com",
  //     test_result: "Fail",
  //     interviewer: "Interviewer 2",
  //     next_interview_date: "06/02/2024",
  //     notes: "Note 2",
  //   },
  //   {
  //     applicant_id: "3",
  //     application_startdate: "05/27/2024",
  //     position_applied: "Software Engineer",
  //     source:"Referral",
  //     status: "Job Offer Accepted",
  //     s_name: "Bautista",
  //     f_name: "Marvin",
  //     m_name: "Directo",
  //     email: "marvin@fullsuite.ph",
  //     contact_no: "987654321",
  //     cv_link: "link2.com",
  //     test_result: "Fail",
  //     interviewer: "Interviewer 2",
  //     next_interview_date: "06/02/2024",
  //     notes: "Note 3",
  //   },
  //   {
  //     applicant_id: "4",
  //     application_startdate: "05/27/2024",
  //     position_applied: "Software Engineer",
  //     source:"Referral",
  //     status: "Test Sent",
  //     reject: " ",
  //     s_name: "Sadcopen",
  //     f_name: "Deon Paul",
  //     m_name: "Wasit",
  //     email: "deon@fullsuite.ph",
  //     contact_no: "09487937460",
  //     cv_link: "link2.com",
  //     test_result: "Fail",
  //     interviewer: "Interviewer 2",
  //     next_interview_date: "06/02/2024",
  //     notes: "Note 4",
  //   },
  //   {
  //     applicant_id: "5",
  //     application_startdate: "05/27/2024",
  //     position_applied: "Software Engineer",
  //     source:"Referral",
  //     status: "Test Completed",
  //     s_name: "Salvador",
  //     f_name: "Matt Wilfred",
  //     m_name: "Cabunoc",
  //     email: "matt@fullsuite.ph",
  //     contact_no: "09667528054",
  //     cv_link: "link2.com",
  //     test_result: "Fail",
  //     interviewer: "Interviewer 2",
  //     next_interview_date: "06/02/2024",
  //     notes: "Note 5",
  //   },
  // ]);

  const statusOptions = [
    "Open", "No Show", 
    "Test Sent","Test Completed", 
    "For initial interview", 
    "First Interview Done", "Second Interview Done" ,"Third Interview Done", "Fourth Interview Done", "Follow-up Interview Done",
    "For Next Interview","For Follow-up Interview",
    "Did Not Pass","Rejection Email Sent", "Blacklisted", "Withdrawn Application",
    "Job Offer Sent", "Job Offer Accepted", "Job Offer Rejected"];

  // const interviewerOptions = [
  //   "Interviewer 1", 
  //   "Interviewer 2", 
  //   "Interviewer 3", 
  //   "Interviewer 4"];

  // const positionOptions = ["Position 1", "Position 2", "Position 3", "Position 4", "Position 5"];

  const rejectOptions = ["---", "Culture Mismatch", "Asking salary is too high", "Working schedule mismatch", "No Show"];

  const sourceOptions = ["Facebook", "Referral", "Instagram", "Fullsuite Website", "Indeed.com", "Jobstreet"];

  
  
  const handleEditClick = (index) => {
    setIsEdit(true);
    setSelectedIndex(index);
  };

  const handleSaveClick = () => {
    setIsEdit(false);
    setSelectedIndex(null);
    toast.success("Applicant Data updated successfully!");
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

    console.log(JSON.stringify(applicantData)) 
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
    
    const matchesDate = (!dateFromFilter || new Date(applicant.app_start_date) >= new Date(dateFromFilter)) &&
                        (!dateToFilter || new Date(applicant.app_start_date) <= new Date(dateToFilter));
    
    const applicantNames = [
      applicant.s_name.toLowerCase(),
      applicant.f_name.toLowerCase(), 
      applicant.m_name.toLowerCase()];
    
    const matchesSearch = searchTerms.every(term =>
                          applicantNames.some(name => name.includes(term))
                        );

    return matchesStatus && matchesDate && matchesSearch;
  });

  // const [currentDate, setCurrentDate] = useState('');

  //   // useEffect(() => {
  //   //     // Get the current date in YYYY-MM-DD format
  //   //     const today = new Date().toISOString().split('T')[0];
  //   //     setCurrentDate(today);
  //   // }, []);

  const applicantColumns = [
    {
      name: "Applicant ID",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input 
            type="text"
            value={row.app_id}
            disabled
            // onChange={(e) => handleChange(e, "app_id", rowIndex)}
          />
        ) : (
          row.app_id
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
            value={moment(row.app_start_date).format("MM/DD/YYYY")}
            onChange={(e) => handleChange(e, "app_start_date", rowIndex)}
          />
        ) : (
          moment(row.app_start_date).format("MM/DD/YYYY")
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
              <option key={i} value={option.position_name}>
                {option.position_name}
              </option>
            ))}
          </select>
        ) : (
          row.position_applied
        ),
      width: "320px",
    },
    {
      name: "Source",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <select
            value={row.source}
            onChange={(e) => handleChange(e, "source", rowIndex)}
          >
            {sourceOptions.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          row.source
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
      width: "250px",
    },

    {
      name: "Reason for Rejection",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <select
            value={row.reject}
            onChange={(e) => handleChange(e, "reject", rowIndex)}
            disabled={row.status !== "Rejection Email Sent"}
          >
            {rejectOptions.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          row.reject
        ),
      width: "250px",
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
      width: "200px",
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
        <a
      href={row.cv_link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#666a40] underline"
    >
      View Link
    </a>
    },
    // {
    //   name: "Interviewer",
    //   selector: (row, rowIndex) =>
    //     selectedIndex === rowIndex ? (
    //       <select
    //         value={row.interviewer}
    //         onChange={(e) => handleChange(e, "interviewer", rowIndex)}
    //       >
    //         {interviewerOptions.map((option, i) => (
    //           <option key={i} value={option}>
    //             {option}
    //           </option>
    //         ))}
    //       </select>
    //     ) : (
    //       row.interviewer
    //     ),
    //   width: "200px",
    // },
    // {
    //   name: "Test Result",
    //   selector: (row, rowIndex) =>
    //     selectedIndex === rowIndex ? (
    //       <input
    //         type="text"
    //         value={row.test_result}
    //         onChange={(e) => handleChange(e, "test_result", rowIndex)}
    //       />
    //     ) : (
    //       row.test_result
    //     ),
    //   width: "150px",
    // },
    // {
    //   name: "Next Interview Date",
    //   selector: (row, rowIndex) =>
    //     selectedIndex === rowIndex ? (
    //       <input
    //         type="date"
    //         value={row.next_interview_date}
    //         onChange={(e) => handleChange(e, "next_interview_date", rowIndex)}
    //       />
    //     ) : (
    //       row.next_interview_date
    //     ),
    //   width: "150px",
    // },
    {
      name: "Notes",
      selector: (row, rowIndex) => (
        <button
          value={row.notes}
          className="text-[#666a40] underline"
          onClick={()=> handleViewNotes(rowIndex)}
        >
          View Notes
        </button>
      ),
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
      cellClass: "sticky-column",
    },
  ];

  return (
    <div className="box-border p-5">
          <ToastContainer />
          
        {/*Modal For Adding New Applicant */}
        <dialog className="bg-white p-6 border border-[#e4e4e4] rounded-lg w-[800px] items-center" ref={addApplicantmodalRef}>
          <div className="modal-content">
            <h1 className="text-[8px] md:text-xl font-bold text-[#363636]">Add New Applicant</h1>
            <form onSubmit={() => handleAddNewApplicant}>
            <div className="flex flex-col md:flex-row gap-5">
                        
                        <label className="form-control w-full max-w-md md:mb-0:mr-4">
                            <div className="label">
                                <h1 className="label-text">Application Start Date: <span className="text-red-500"> *</span></h1>
                            </div>
                        <input
                            name="app_start_date"
                            type="date"
                            onChange={(event) => handleInputChange(event)}
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered"
                            required
                        />
                        </label>
                        
              </div>

              <div className="flex flex-col md:flex-row gap-5">
                  <label className="form-control w-full max-w-md md:mb-0:mr-4">
                      <div className="label">
                          <h1 className="label-text">Surname: <span className="text-red-500"> *</span></h1>
                      </div>
                        <input
                            name="s_name"
                            type="text"
                            onChange={(event) => handleInputChange(event)}
                            placeholder="Enter Surname"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered"
                            required
                        />
                  </label>
                        
                  <label className="form-control w-full max-w-md md:mb-0:mr-4">
                       <div className="label">
                          <h1 className="label-text">First Name: <span className="text-red-500"> *</span> </h1>
                        </div>
                        <input
                            name="f_name"
                            type="text"
                            onChange={(event) => handleInputChange(event)}
                            placeholder="Enter First Name"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered"
                            required
                        />
                  </label>
                  
                  <label className="form-control w-full max-w-md md:mb-0:mr-4">
                            <div className="label">
                                <h1 className="label-text">Middle Name: <span className="text-red-500"> *</span></h1>
                            </div>
                        <input
                            name="m_name"
                            type="text"
                            onChange={(event) => handleInputChange(event)}
                            placeholder="Enter Middle Name"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered"
                            required
                        />
                  </label>
              </div>

              <div className="flex flex-col md:flex-row gap-5">

                <label className="form-control w-full max-w-md md:mb-0:mr-4">
                    <div className="label">
                        <h1 className="label-text">Email Contact:<span className="text-red-500"> *</span> </h1>
                    </div>

                    <input
                          name="email"
                          type="text"
                          onChange={(event) => handleInputChange(event)}
                          placeholder="Enter Email Contact"
                          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered"
                          required
                     />
                </label>
                        
                <label className="form-control w-full max-w-md md:mb-0:mr-4">
                    <div className="label">
                      <span className="label-text">Phone Number:</span>
                      </div>
                      <input
                            name="contact_no"
                            type="text"
                            onChange={(event) => handleInputChange(event)}
                            placeholder="Enter Phone Number"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered"
                        />
                </label>        
              </div>

              <div className="flex flex-col md:flex-row gap-5">

              <label className="form-control w-full max-w-md md:mb-0:mr-4">
                 <div className="label">
                    <h1 className="label-text">CV Link:<span className="text-red-500"> *</span></h1>
                  </div>
                        <input
                            name="cv_link"
                            type="text"
                            onChange={(event) => handleInputChange(event)}
                            placeholder="Enter CV Link"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered"
                            required
                        />
              </label>

              <label className="form-control w-full max-w-md md:mb-0:mr-4">
                      <div className="label">
                          <h1 className="label-text">Position Applied:<span className="text-red-500"> *</span></h1>
                      </div>
                        <select 
                            name="position_applied"
                            onChange={(event) => handleInputChange(event)}
                            className='border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered'>
                            <option selected disabled>Select Position Applied</option>
                            {positionOptions.map((option, i) => (
                              <option key={i} value={option.position_name}>
                                {option.position_name}
                              </option>
                            ))}
                        </select>

              </label>

             
              </div>
              
              <div className="flex flex-col md:flex-row gap-5">

                  <label className="form-control w-full max-w-md md:mb-0:mr-4">
                      <div className="label">
                        <h1 className="label-text">Source:<span className="text-red-500"> *</span></h1>
                      </div>
                      <select
                        name="source"
                          className='border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered'
                          required
                          onChange={(event) => handleInputChange(event)}
                          >

                            {sourceOptions.map((source, i) => (
                              <option key={i} value={source}>
                                {source}
                              </option>
                            ))}
                        </select>
                  </label>
                  
                  {/* <label className="form-control w-full max-w-md md:mb-0:mr-4">
                     <div className="label">
                         <h1 className="label-text">Referrer:<span className="text-red-500"> *</span></h1>
                     </div>
                        

                      <select
                        name="Referrer"
                          className='border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered'
                          required
                          disabled
                          onChange={(event) => handleInputChange(event)}
                          >
                            <option>---</option>
                            <option>Employee 1</option>
                            <option>Employee 2</option>
                            <option>Employee 3</option>
                            <option>Employee 4</option>
                            <option>Employee 5</option>
                            <option>Employee 6</option>
                        </select>
                  </label> */}
              </div>

              <div className="box box-border flex flex-row justify-end">
                <button className="btn bg-[#666a40] text-white mr-2" type="submit" onClick={handleSubmit}>Submit</button>
                <button className="btn bg-[#e4e4e4]" onClick={(e) => {handleCloseModal(e)}}>Close</button>
              </div>
              
            </form>
          </div>
        </dialog>

{/* -------------------------------------- VIEW NOTES --------------------------------------------- */}        
<dialog className="bg-white p-6 border border-[#e4e4e4] rounded-lg w-[600px]" id='view-notes-dialog' ref={notesmodalRef}>
    <div className="modal-content">
        <form onSubmit={handleViewNotes}>
            <h1 className="md:text-[16px] font-bold text-[#363636]">Notes for {filteredData[selectedIndex]?.f_name} {filteredData[selectedIndex]?.s_name}</h1>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={(e) => {viewNotesCloseModal(e)}}>
                  ✕
            </button>
  
        <div className="divider mt-3 mb-3"><span className="md:text-[12px]">July 02, 2024</span></div>
            <div className="box-border flex items-start gap-3 mb-5 flex-1 bg-[#f7f7f7] p-5 rounded-[15px]">
                <div className="box box-border w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#666A40]"> 
                  <span className="font-bold text-white">MB</span>
                </div>

                <div className="flex flex-col items-start gap-1 flex-1">
                  <div className="flex flex-row justify-between w-full">
                    <p className="md:text-[14px] font-bold text-[#363636]">Marvin Baustisa   </p>
                   <span className="font-semibold text-[10px] top-0 text-[#36454F]">10:00 AM</span>
                  </div>
                    <p className="md:text-[12px]">Ian has a solid professional background with progressively responsible roles in reputable companies. His current role as a Software Engineer involves relevant technologies and skills, making his experience directly applicable to the position he is applying for.</p>
                </div>
            
          </div>

          <div className="box-border flex items-start gap-3 mb-5 flex-1 bg-[#f7f7f7] p-5 rounded-[15px]">
                <div className="box box-border w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#666A40]"> 
                  <span className="font-bold text-white">AS</span>
                </div>
  
                <div className="flex flex-col items-start gap-1 flex-1">
                  <div className="flex flex-row justify-between w-full">
                  <p className="md:text-[14px] font-bold text-[#363636]">Antoinette Sanchez   </p>
                  <span className="font-semibold text-[10px] top-0 text-[#36454F]">10:00 AM</span>
                  </div>
                  <p className="md:text-[12px]">His experience and expertise make him a strong contender for the role, and we are enthusiastic about the potential fit.</p>
                </div>
            
          </div>
          
          <div className="divider mt-3 mb-3"></div>

          <div className="box box-border flex flex-row gap-3">
          <textarea
              className="border border-gray-300 rounded-[15px] px-3 py-3 mb-3 w-full focus:outline-[#666a40] bg-[#F7F7F7] input input-bordered"
              placeholder="Type here. . ."
              >
              

          </textarea>
          <button className="btn bg-[#666a40] text-white" onClick={(e) => {handleaddNewNotesModal(e)}}>
          <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ fill: 'currentColor', marginRight: '8px' }}
      >
        <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
      </svg>
          Post</button>

          </div>
          
          </form>
        </div>
      </dialog>

{/* -------------------------------------- MAIN VIEW --------------------------------------------- */}

      <div className="box box-border grid flex-row mb-5">
        <h1 className="text-[18px] md:text-2xl font-bold text-[#363636]">
          Applicant Tracking System
        </h1>
      </div>

      
      
    <div className="box-border grid bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
      <div className="box box-border flex flex-row justify-between mb-4 items-center">
      {/* ADDING NEW APPLICANT */}
      <div>
          <button className="btn bg-[#666a40] text-white " onClick={handleAddNewApplicant}>+ Add New Applicant</button>
      </div>
      
      <div className="box box-border flex flex-row gap-2 self-center">
       
        {/* SEARCH APPLICANT */}
        <div className="flex flex-row items-center p-2">
          <label >
              <input
                type="text"
                name="search"
                onChange={handleInputChange}
                placeholder="Search Applicant..."
                className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] text-[#363636] w-[400px]"
                />
          </label>
        </div>

      {/* FILTERS */}
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
        <div className="flex flex-row items-center ">
          <Select
            options={statusOptions.map(option => ({ value: option, label: option }))}
            onChange={handleStatusFilterChange}
            isClearable
            isMulti
            components={animatedComponents}
            autosize={true}
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
     
      <DataTable
          columns={applicantColumns}
          data={filteredData}
          rejectOptions="---"
          pagination
          highlightOnHover
          responsive
          style={{ textAlign: "center",}}
        />
 
        
      </div>

    </div>
  );
};

export default ApplicantTracker;
