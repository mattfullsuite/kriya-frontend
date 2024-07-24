import React, { useRef, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeAnimated from "react-select/animated";
import axios from "axios";
import moment from "moment";
import { useCookies } from "react-cookie"

const animatedComponents = makeAnimated();

const ApplicantTracker = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [cookie] = useCookies(["user"]);

  const [isEdit, setIsEdit] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [positionOptions, setPositionOptions] = useState([]);

  const addApplicantmodalRef = useRef(true);
  const notesmodalRef = useRef(true);

  const [applicantData, setApplicantData] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");

  const [referrers, setReferrers] = useState([]);

  const [newApplicantData, setNewApplicantData] = useState({
    // State to store data for new applicant form
    app_start_date: "",
    position_applied: "",
    status: "",
    s_name: "",
    f_name: "",
    m_name: "",
    email: "",
    source: "",
    contact_no: "",
    cv_link: "",
    source: "",
    referrer: "",
    next_interview_date: "",
    interviewer: "",
  });

  //--------------------- Start of Edit Methods --------------------- //

  const [editApplicantData, setEditApplicantData] = useState({
    app_id: "",
    app_start_date: "",
    position_applied: "",
    status: "",
    s_name: "",
    f_name: "",
    m_name: "",
    email: "",
    source: "",
    contact_no: "",
    cv_link: "",
    source: "",
    referrer: "",
    next_interview_date: "",
    interviewer: "",
  });

  const handleDataChange = (id, event) => {
    setEditApplicantData({
      ...editApplicantData,
      app_id: id,
      [event.target.name]: [event.target.value],
    });

    console.log("Data Change", JSON.stringify(editApplicantData));
  };

  const renderEditData = (
    id,
    asd,
    pa,
    st,
    sn,
    fn,
    mn,
    e,
    so,
    cn,
    cv,
    re,
    nid,
    i
  ) => {
    setEditApplicantData({
      ...editApplicantData,
      app_id: id,
      app_start_date: moment(asd).format("YYYY-MM-DD"),
      position_applied: pa,
      status: st,
      s_name: sn,
      f_name: fn,
      m_name: mn,
      email: e,
      source: so,
      contact_no: cn,
      cv_link: cv,
      referrer: re,
      next_interview_date: nid ? moment(nid).format("YYYY-MM-DD") : null,
      interviewer: i,
    });

    console.log("Retained Data", JSON.stringify(editApplicantData));
  };

  const handleEditSubmit = (id) => {
    axios
      .post(BASE_URL + "/ats-editApplicantData", editApplicantData)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Successfully Edited Applicant!"); //please delete

          setTimeout(() => {
            window.top.location = window.top.location;
          }, 3500);
        } else if (res.data === "error") {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  //--------------------- End of Edit Methods --------------------- //

  // --------- Notes ------------ //

  const [noteDetails, setNoteDetails] = useState([]);
  const [newApplicantNote, setNewApplicantNote] = useState({ note_body: "", note_id: null });

  const handleOpenNotesModal = async (id, rowIndex) => {
    setSelectedIndex(rowIndex);

    document.getElementById("view-notes-dialog").showModal();

    const noteVal = { note_id: id };

    await axios
      .post(BASE_URL + "/ats-getNoteDetails", noteVal)
      .then((response) => {
        setNoteDetails(response.data);
        setNewApplicantNote({ ...newApplicantNote, note_id: id });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewNote = async (event) => {

    await axios
      .post(`${BASE_URL}/ats-insertApplicantNotes`, newApplicantNote)
      .then((response) => {
        setNoteDetails([
          ...noteDetails,
          {
            f_name: cookie.user.f_name,
            s_name: cookie.user.s_name,
            noted_at: moment.now(),
            note_body: newApplicantNote.note_body,
          },
        ]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // --------- -End of Notes Integration --------- //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicant_data_res = await axios.get(
          BASE_URL + "/ats-getApplicantsFromDatabase"
        );
        const positions_data_res = await axios.get(
          BASE_URL + "/ats-getPositionsFromCompany"
        );
        const referrers_data_res = await axios.get(
          BASE_URL + "/ats-getPossibleReferrers"
        );
        setApplicantData(applicant_data_res.data);
        setPositionOptions(positions_data_res.data);
        setReferrers(referrers_data_res.data);
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
    setSelectedIndex(rowIndex);
    notesmodalRef.current.showModal(rowIndex);
  };

  const viewNotesCloseModal = (e) => {
    notesmodalRef.current.close();
    e.preventDefault(e);
  };

  const handleCloseModal = (e) => {
    addApplicantmodalRef.current.close();
    e.preventDefault(e);
  };

  const handleaddNewNotesModal = (e) => {
    notesmodalRef.current.close(e);
    handleSubmitNotes(e);
    e.preventDefault(e);
  };

  // const handlecloseNewNotesModal = (e) => {
  //   addNewNotesmodalRef.current.close(e);
  //   e.preventDefault (e);
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "source") {
      setSelectedSource(value);
      console.log(value);
    }
    if (name === "search") {
      setSearchQuery(value);
    } else {
      // setNewApplicantData({ ...newApplicantData, [name]: value });
      setNewApplicantData({
        ...newApplicantData,
        [e.target.name]: [e.target.value],
      });

      console.log(JSON.stringify(newApplicantData));
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

  const handleSubmitNotes = (e) => {
    toast.success("Note added successfully!");
    notesmodalRef.current.close();
  };
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

  const statusOptions = [
    "Open",
    "No Show",
    "Test Sent",
    "Test Completed",
    "For initial interview",
    "First Interview Done",
    "Second Interview Done",
    "Third Interview Done",
    "Fourth Interview Done",
    "Follow-up Interview Done",
    "For Next Interview",
    "For Follow-up Interview",
    "Did Not Pass",
    "Rejection Email Sent",
    "Blacklisted",
    "Withdrawn Application",
    "Job Offer Sent",
    "Job Offer Accepted",
    "Job Offer Rejected",
  ];

  const interviewerOptions = [
    "Interviewer 1",
    "Interviewer 2",
    "Interviewer 3",
    "Interviewer 4",
  ];

  const rejectOptions = [
    "---",
    "Culture Mismatch",
    "Asking salary is too high",
    "Working schedule mismatch",
    "No Show",
  ];

  const sourceOptions = [
    "Facebook",
    "Referral",
    "Instagram",
    "Fullsuite Website",
    "Indeed",
    "Jobstreet",
  ];

  const referrerOptions = [
    "---",
    "Employee 1 Name MI Last Name",
    "Employee 2 Name MI Last Name",
    "Employee 3 Name MI Last Name",
    "Employee 4 Name MI Last Name",
  ];

  const handleEditClick = (index) => {
    setIsEdit(true);
    setSelectedIndex(index);
    handleKeyPress(index);
  };

  const handleKeyPress = (index) => {
    if (index.keyCode == 13) {
      console.log("Key pressed:", index.keyCode);
      handleSaveClick(index); // Save on Enter key press
    }
  };
  const handleSaveClick = () => {
    setIsEdit(false);
    setSelectedIndex(null);
    toast.success("Applicant Data updated successfully!");
  };

  const handleChange = (e, field, index) => {
    // const updatedData = [...applicantData];
    // updatedData[index][field] = e.target.value;
    // setApplicantData(updatedData);
    // console.log(JSON.stringify(applicantData))
  };

  const handleStatusFilterChange = (selectedOptions) => {
    setStatusFilter(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const handleDateFromFilterChange = (e) => {
    setDateFromFilter(e.target.value);
  };

  const handleDateToFilterChange = (e) => {
    setDateToFilter(e.target.value);
  };

  const searchTerms = searchQuery.toLowerCase().split(" ");

  const filteredData = applicantData.filter((applicant) => {
    const matchesStatus =
      !statusFilter.length || statusFilter.includes(applicant.status);

    const matchesDate =
      (!dateFromFilter ||
        new Date(applicant.app_start_date) >= new Date(dateFromFilter)) &&
      (!dateToFilter ||
        new Date(applicant.app_start_date) <= new Date(dateToFilter));

    const applicantNames = [
      applicant.s_name.toLowerCase(),
      applicant.f_name.toLowerCase(),
      applicant.m_name.toLowerCase(),
    ];

    const matchesSearch = searchTerms.every((term) =>
      applicantNames.some((name) => name.includes(term))
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
          <input type="text" value={row.app_id} disabled />
        ) : (
          row.app_id
        ),
      width: "150px",
      color: "[#666a40]",
      sortable: true,
    },
    {
      name: "Application Date",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            name="app_start_date"
            type="date"
            value={editApplicantData.app_start_date}
            onChange={(e) => {
              handleChange(e, "app_start_date", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
          />
        ) : (
          // moment(row.app_start_date).format("MM/DD/YYYY")
          moment(row.app_start_date).format("YYYY-MM-DD")
        ),
      width: "150px",
      sortable: true,
    },
    {
      name: "Position Applied",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <select
            value={editApplicantData.position_applied}
            onChange={(e) => {
              handleChange(e, "position_applied", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
            name="position_applied"
          >
            {/* <option selected="selected" value={row.position_applied}>{row.position_applied}</option> */}
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
      sortable: true,
    },
    {
      name: "Source",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <select
            name="source"
            value={editApplicantData.source}
            onChange={(e) => {
              handleChange(e, "source", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
          >
            <option value="Facebook">Facebook</option>
            <option value="Referral">Referral</option>
            <option value="Instagram">Instagram</option>
            <option value="Fullsuite Website">Fullsuite Website</option>
            <option value="Indeed">Indeed</option>
            <option value="Jobstreet">Jobstreet</option>
          </select>
        ) : (
          row.source
        ),
      width: "150px",
      sortable: true,
    },
    {
      name: "Referrer",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <select
            name="referrer"
            value={row.source !== "Referral" ? "None" : row.referrer}
            onChange={(e) => {
              handleChange(e, "referrer", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
            disabled={row.source !== "Referral"}
          >
            <option selected="selected" disabled="disabled" value="None">
              None
            </option>
            {referrers.map((r, i) => (
              <option key={i} value={r.f_name + " " + r.s_name}>
                {r.f_name + " " + r.s_name}
              </option>
            ))}
          </select>
        ) : (
          row.referrer
        ),
      width: "300px",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <select
            name="status"
            value={editApplicantData.status}
            onChange={(e) => {
              handleChange(e, "status", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
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
      sortable: true,
    },
    {
      name: "Next Interview Date",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            name="next_interview_date"
            type="date"
            value={editApplicantData.next_interview_date}
            onChange={(e) => {
              handleChange(e, "next_interview_date", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
          />
        ) : (
          row.next_interview_date ? moment(row.next_interview_date).format("YYYY-MM-DD") : null
        ),
      width: "150px",
    },
    {
      name: "Interviewer",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <select
            name="interviewer"
            value={row.interviewer}
            onChange={(e) => {
              handleChange(e, "interviewer", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
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
      width: "250px",
    },
    {
      name: "Reason for Rejection",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <select
            name="reject"
            value={row.reject}
            onChange={(e) => {
              handleChange(e, "reject", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
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
      sortable: true,
    },

    {
      name: "Surname",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            name="s_name"
            type="text"
            value={editApplicantData.s_name}
            onChange={(e) => {
              handleChange(e, "s_name", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
          />
        ) : (
          row.s_name
        ),
      width: "150px",
      sortable: true,
      reorder: true,
    },
    {
      name: "First Name",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            name="f_name"
            type="text"
            value={editApplicantData.f_name}
            onChange={(e) => {
              handleChange(e, "f_name", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
          />
        ) : (
          row.f_name
        ),
      width: "150px",
      sortable: true,
      reorder: true,
    },
    {
      name: "Middle Name",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            name="m_name"
            type="text"
            value={editApplicantData.m_name}
            onChange={(e) => {
              handleChange(e, "m_name", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
          />
        ) : (
          row.m_name
        ),
      width: "150px",
      sortable: true,
      reorder: true,
    },
    {
      name: "Email Contact",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            name="email"
            type="text"
            value={editApplicantData.email}
            onChange={(e) => {
              handleChange(e, "email", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
          />
        ) : (
          row.email
        ),
      width: "200px",
      sortable: true,
      reorder: true,
    },
    {
      name: "Phone Number",
      selector: (row, rowIndex) =>
        selectedIndex === rowIndex ? (
          <input
            name="contact_no"
            type="text"
            value={editApplicantData.contact_no}
            onChange={(e) => {
              handleChange(e, "contact_no", rowIndex);
              handleDataChange(row.app_id, e);
            }}
            onKeyUp={handleKeyPress}
          />
        ) : (
          row.contact_no
        ),
      width: "150px",
      sortable: true,
      reorder: true,
    },

    {
      name: "CV Link",
      selector: (row, rowIndex) => (
        <a
          href={row.cv_link}
          name="cv_link"
          className="text-[#666a40] underline"
        >
          View Link
        </a>
      ),
    },

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

    {
      name: "Notes",
      selector: (row, rowIndex) => (
        <button
          value={row.notes}
          className="text-[#666a40] underline"
          onClick={
            (event) => handleOpenNotesModal(row.app_id, rowIndex)
            // ()=> handleViewNotes(rowIndex)
          }
        >
          View Notes
        </button>
      ),
      width: "150px",
    },

    {
      name: "",
      selector: (row, rowIndex) => {
        const edit = (
          <button
            className="btn btn-sm bg-[#666a40] text-white text-xs"
            onClick={() => {
              handleEditClick(rowIndex);
              renderEditData(
                row.app_id,
                row.app_start_date,
                row.position_applied,
                row.status,
                row.s_name,
                row.f_name,
                row.m_name,
                row.email,
                row.source,
                row.contact_no,
                row.cv_link,
                row.referrer,
                row.next_interview_date,
                row.interviewer
              );
            }}
          >
            Edit
          </button>
        );
        const save = (
          <button
            className="btn btn-sm bg-[#666a40] text-white text-xs"
            onClick={() => {
              handleSaveClick(rowIndex);
              handleEditSubmit(row.app_id);
            }}
          >
            Save
          </button>
        );

        return isEdit && selectedIndex === rowIndex ? save : edit;
      },
      cellClass: "sticky-action-column",
      style: {
        position: "sticky",
        right: 0,
        backgroundColor: "white",
        zIndex: 1,
      },
    },
  ];

  return (
    <div className="box-border p-5">
      <ToastContainer />

      {/*Modal For Adding New Applicant */}
      <dialog
        className="bg-white p-6 border border-[#e4e4e4] rounded-lg w-[800px] items-center"
        ref={addApplicantmodalRef}
      >
        <div className="modal-content">
          <h1 className="text-[8px] md:text-xl font-bold text-[#363636]">
            Add New Applicant
          </h1>
          <form onSubmit={() => handleAddNewApplicant}>
            <div className="flex flex-col md:flex-row gap-5">
              <label className="form-control w-full max-w-md md:mb-0:mr-4">
                <div className="label">
                  <h1 className="label-text">
                    Application Start Date:{" "}
                    <span className="text-red-500"> *</span>
                  </h1>
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
                  <h1 className="label-text">
                    Surname: <span className="text-red-500"> *</span>
                  </h1>
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
                  <h1 className="label-text">
                    First Name: <span className="text-red-500"> *</span>{" "}
                  </h1>
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
                  <h1 className="label-text">
                    Middle Name: <span className="text-red-500"> *</span>
                  </h1>
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
                  <h1 className="label-text">
                    Email Contact:<span className="text-red-500"> *</span>{" "}
                  </h1>
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
                  <h1 className="label-text">
                    CV Link:<span className="text-red-500"> *</span>
                  </h1>
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
                  <h1 className="label-text">
                    Position Applied:<span className="text-red-500"> *</span>
                  </h1>
                </div>
                <select
                  name="position_applied"
                  onChange={(event) => handleInputChange(event)}
                  className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered"
                >
                  <option selected disabled>
                    Select Position Applied
                  </option>
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
                  <h1 className="label-text">
                    Source:<span className="text-red-500"> *</span>
                  </h1>
                </div>
                <select
                  name="source"
                  className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered"
                  required
                  onChange={(e) => handleInputChange(e)}
                >
                  {sourceOptions.map((source, i) => (
                    <option key={i} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-control w-full max-w-md md:mb-0:mr-4">
                <div className="label">
                  <h1 className="label-text">
                    Referrer:<span className="text-red-500"> *</span>
                  </h1>
                </div>

                <select
                  name="Referrer"
                  className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full input input-bordered"
                  required
                  disabled={selectedSource !== "Referral"}
                  onChange={(event) => handleInputChange(event)}
                >
                  <option>Referrer</option>
                  <option>Employee 1</option>
                  <option>Employee 2</option>
                  <option>Employee 3</option>
                  <option>Employee 4</option>
                  <option>Employee 5</option>
                  <option>Employee 6</option>
                </select>
              </label>
            </div>

            <div className="box box-border flex flex-row justify-end">
              <button
                className="btn bg-[#666a40] text-white mr-2"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="btn bg-[#e4e4e4]"
                onClick={(e) => {
                  handleCloseModal(e);
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* -------------------------------------- VIEW NOTES --------------------------------------------- */}
      <dialog
        className="bg-white p-6 border border-[#e4e4e4] rounded-[15px] w-[600px]"
        id="view-notes-dialog"
        ref={notesmodalRef}
      >
        <div className="modal-content">
          {/* <form 
          // onSubmit={handleViewNotes}
          > */}
            <h1 className="md:text-[16px] font-bold text-[#363636]">
              Notes for {filteredData[selectedIndex]?.f_name}{" "}
              {filteredData[selectedIndex]?.s_name}
            </h1>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={(e) => {
                viewNotesCloseModal(e);
              }}
            >
              ✕
            </button>

            {/* <div className="divider mt-3 mb-3">
              <span className="md:text-[12px]">July 02, 2024</span>
            </div> */}

            {noteDetails.length != 0 ? (
                noteDetails.map((nd) => (
                  <>
                    <div className="box-border bg-[#f4f4f4] flex flex-col gap-3 p-3 rounded-[15px] mt-5 mb-5">
                      <div className="flex items-center gap-2 w-full">
                        <div
                          className={`box box-border w-[30px] h-[30px] flex justify-center items-center rounded-full bg-blue-500`}
                        >
                          <span className="font-medium text-white text-[12px]">
                            {nd.f_name.charAt(0) + nd.s_name.charAt(0)}
                          </span>
                        </div>

                        <div className="flex flex-col items-start justify-center flex-1">
                          <p className="text-[14px] text-[#363636]">
                            {nd.f_name + " " + nd.s_name}
                          </p>
                        </div>
                        <div className="flex flex-col items-start justify-start">
                          <p className="text-[10px] text-[#A9A9A9]">
                            {moment(nd.noted_at).fromNow()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-center flex-1 mt-2">
                        <p className="text-wrap text-[12px]">{nd.note_body}</p>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <p className="text-center mt-20 text-[14px] text-[#8b8b8b]">
                  Start sending notes here.
                </p>
              )}

            {/* <div className="box-border flex items-start gap-3 mb-5 flex-1 bg-[#f7f7f7] p-5 rounded-[15px]">
              <div className="box box-border w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#666A40]">
                <span className="font-bold text-white">MB</span>
              </div>

              <div className="flex flex-col items-start gap-1 flex-1">
                <div className="flex flex-row justify-between w-full">
                  <p className="md:text-[14px] font-bold text-[#363636]">
                    Marvin Baustisa{" "}
                  </p>
                  <span className="font-semibold text-[10px] top-0 text-[#36454F]">
                    10:00 AM
                  </span>
                </div>
                <p className="md:text-[12px]">
                  Ian has a solid professional background with progressively
                  responsible roles in reputable companies. His current role as
                  a Software Engineer involves relevant technologies and skills,
                  making his experience directly applicable to the position he
                  is applying for.
                </p>
              </div>
            </div> */}

            <div className="divider mt-3 mb-3"></div>

            <div className="box box-border flex flex-row gap-3">
              <textarea
                className="outline-none transition-all h-[50px] resize-none w-full border border-[#e4e4e4] focus:border-[#666a40] rounded-[8px] p-2 text-[14px] text-[#363636]"
                placeholder="Type here. . ."
                onChange={(event) => {
                  setNewApplicantNote({ ...newApplicantNote, note_body: event.target.value });
                }}
              ></textarea>
              <button
                className="btn bg-[#666a40] text-white"
                onClick={(event) => {
                  addNewNote(event);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ fill: "currentColor", marginRight: "8px" }}
                >
                  <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
                </svg>
                Post
              </button>
            </div>
          {/* </form> */}
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
            <button
              className="btn bg-[#666a40] text-white "
              onClick={handleAddNewApplicant}
            >
              + Add New Applicant
            </button>
          </div>

          <div className="box box-border flex flex-row gap-2 self-center">
            {/* SEARCH APPLICANT */}
            <div className="flex flex-row items-center p-2">
              <label>
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
                <select
                  className="flex flex-nowrap border border-[#e4e4e4] rounded-[10px] items-center p-2"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Status">Status</option>
                  <option value="Date">Date</option>
                </select>
              </label>
            </div>

            {selectedFilter === "Status" && (
              <div className="flex flex-row items-center ">
                <Select
                  options={statusOptions.map((option) => ({
                    value: option,
                    label: option,
                  }))}
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
          pagination
          highlightOnHover
          responsive
          // onRowDoubleClicked={(row, e) => {
          //   const index = filteredData.findIndex(
          //     (item) => item.app_id === row.app_id
          //   );
          //   handleEditClick(index);
          // }}
          onKeyPress={(row, e) => {
            if (e.keyCode === 13) console.log(e.keyCode);
            const index = filteredData.findIndex(
              (item) => item.app_id === row.app_id
            );
            handleKeyPress(index);
          }}
          style={{ textAlign: "center" }}
        />
      </div>
    </div>
  );
};

export default ApplicantTracker;
