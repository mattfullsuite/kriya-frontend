import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function AddApplicant({
    bgColor,
    hoverColor,
    disabledColor,
    fillColor,
    textColor,
    accentColor,
    lightColor,
    focusBorder,
    borderColor,
}) {
    const [positionOptions, setPositionOptions] = useState([]);
    const [referrers, setReferrers] = useState([]);
    const [applicantData, setApplicantData] = useState([]);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    //#region const for new applicants
    //This const is use to set new applicants
    const [newApplicantData, setNewApplicantData] = useState({
        app_start_date: new Date(),
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
    //#endregion

    //#region process for duplicate checking
    //This is to separate the concerns of adding data and to check if it has a duplicate - Anthony
    const [newFirstName, setNewFirstName] = useState("");
    const [newMiddleName, setNewMiddleName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newContact, setNewContact] = useState("");

    const [duplicateData, setDuplicateData] = useState([])

    useEffect(() => {

        if (newFirstName !== "" || newMiddleName !== "" || newSurname !== "" || newEmail !== "" || newContact !== "") {
            
          const fetchData = async () => {
            try {
              const response = await axios.get(
                `${BASE_URL}/ats-checkDuplicate?s_name=${newSurname}&f_name=${newFirstName}&m_name=${newMiddleName}&email=${newEmail}&contact_no=${newContact}`
              );

              if (response.data === "none") {
                const data1 = response.data('No Duplicates Found');
                setDuplicateData(data1);
              } else if (response.data) {
                const data = response.data.map((d) => ({
                    name: `${d.f_name} ${d.s_name}`,
                    date_applied: `${d.app_start_date}`,
                    position_applied: `${d.position_applied}`,
                    application_status: `${d.status}`,
                    email: `${d.email}`,
                    reason: checkReason(d),

                }));
                setDuplicateData(data);
              }
            } catch (error) {
              console.log("Error fetching data: ", error);
            }
          };
          fetchData(); 
        } else {
        }
      }, [newFirstName, newMiddleName, newSurname, newEmail, newContact]);

      //This is to check the reason why the data is duplicate
      function checkReason(data) {
        let reason = ""
        if (JSON.stringify(data).includes(newSurname)){
            return reason = "This user has similarity in surname"
        } else if (JSON.stringify(data).includes(newFirstName)){
            return reason = "This user has similarity in first name"
        } else if (JSON.stringify(data).includes(newMiddleName)) {
            return reason = "This user has similarity in middle name"
        } else if (JSON.stringify(data).includes(newEmail)) {
            return reason = "This user has similarity email"
        } else if (JSON.stringify(data).includes(newContact)) {
            return reason = "This user has similarity in contact number"
        }
    }

    //#endregion

    //#region process for adding applicants
    //This handles the adding of applicants
    const navigate = useNavigate();

    const handleAddSubmit = () => {

        axios
            .post(BASE_URL + "/ats-modifiedAddNewApplicant", newApplicantData)
            .then((response) => {
                toast.success("Successfully added new applicant");

                setTimeout(() => {
                    navigate("/hr/hr-management/applicant-tracking-system");
                }, 3000);
                setApplicantData([
                    {
                        app_id: response.data.insertId,
                        app_start_date: newApplicantData.app_start_date,
                        position_applied: newApplicantData.position_applied,
                        status: newApplicantData.status,
                        s_name: newApplicantData.s_name,
                        f_name: newApplicantData.f_name,
                        m_name: newApplicantData.m_name,
                        email: newApplicantData.email,
                        source: newApplicantData.source,
                        contact_no: newApplicantData.contact_no,
                        cv_link: newApplicantData.cv_link,
                        source: newApplicantData.source,
                        referrer: newApplicantData.referrer,
                        next_interview_date: newApplicantData.next_interview_date,
                        interviewer: newApplicantData.interviewer,
                    },
                    ...applicantData,
                ]);
            })
            .catch((err) => {
                toast.error("Something went wrong.");
                console.log(err)
            }
            );
    };
    //#endregion 

    //#region process for mapping the positions available in the select menu
    //This maps the positions available in the company
    useEffect(() => {
        const fetchData = async () => {
            try {
                const positions_data_res = await axios.get(
                    BASE_URL + "/ats-getPositionsFromCompany"
                );
                setPositionOptions(positions_data_res.data);
                const referrers_data_res = await axios.get(
                    BASE_URL + "/ats-getPossibleReferrers"
                );
                setReferrers(referrers_data_res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    //#endregion

    //pagination for the duplicate checker
    const ITEMS_PER_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(duplicateData.length / ITEMS_PER_PAGE);
    const currentData = duplicateData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
    

    return (
        <>
            <ToastContainer />
            <div className="m-auto max-w-[1300px]">
            <div className="flex flex-row">
            <div className="bg-white p-5 flex-1">
                <p className="text-[18px] font-medium text-[#363636] mb-5">
                    Add New Applicant
                </p>

                <div className="mt-10">
                    <label className="text-[12px] font-medium text-[#363636]">
                        Date Applied <span className="text-red-500">*</span>
                    </label>

                    <div className="mt-2">
                        <input
                            type="date"
                            className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                            onChange={(e) =>
                                setNewApplicantData({
                                    ...newApplicantData,
                                    app_start_date: moment(e.target.value).format("YYYY-MM-DD"),
                                })
                            }
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <label className="text-[12px] font-medium text-[#363636]">
                        Applicant Name <span className="text-red-500">*</span>
                    </label>

                    <div className="mt-2 grid grid-cols-3 gap-3">
                        <div>
                            <label className="text-[12px] text-[#363636]">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                                placeholder="Surname"
                                onChange={(e) =>
                                    setNewApplicantData({
                                        ...newApplicantData,
                                        s_name: e.target.value,
                                    })
                                }
                                onBlur={(e) => setNewSurname(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-[12px] text-[#363636]">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                                placeholder="First Name"
                                onChange={(e) =>
                                    setNewApplicantData({
                                        ...newApplicantData,
                                        f_name: e.target.value,
                                    })
                                }
                                onBlur={(e) => setNewFirstName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-[12px] text-[#363636]">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                                placeholder="Middle Name"
                                onChange={(e) => {
                                    setNewApplicantData({
                                        ...newApplicantData,
                                        m_name: e.target.value,
                                    })
                                    
                                }
                                }
                                onBlur={(e) => setNewMiddleName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[12px] font-medium text-[#363636]">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                                placeholder="applicant@email.com"
                                onChange={(e) =>
                                    setNewApplicantData({
                                        ...newApplicantData,
                                        email: e.target.value,
                                    })
                                }
                                onBlur={(e) => setNewEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[#363636]">
                            Phone Number <span className="text-red-500">*</span>
                        </label>

                        <div className="mt-2">
                            <input
                                type="text"
                                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                                placeholder="09XXXXXXXXX"
                                onChange={(e) =>
                                    setNewApplicantData({
                                        ...newApplicantData,
                                        contact_no: e.target.value,
                                    })
                                }
                                onBlur={(e) => setNewContact(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[12px] font-medium text-[#363636]">
                            CV Link <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                                placeholder="applicant@email.com"
                                onChange={(e) =>
                                    setNewApplicantData({
                                        ...newApplicantData,
                                        cv_link: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[#363636]">
                            Position Applied <span className="text-red-500">*</span>
                        </label>

                        <div className="mt-2">
                            <select
                                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                                onChange={(e) =>
                                    setNewApplicantData({
                                        ...newApplicantData,
                                        position_applied: e.target.value,
                                    })
                                }
                            >
                                <option disabled>Select Position Applied</option>
                                {positionOptions.map((po) => (
                                    <option value={po.position_id}>{po.position_name}</option>
                                ))}
                                <option value={"Legal Researcher"}>Legal Researcher</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[12px] font-medium text-[#363636]">
                            Source <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <select
                                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                                onChange={(e) =>
                                    setNewApplicantData({
                                        ...newApplicantData,
                                        source: e.target.value,
                                    })
                                }
                            >
                                <option disabled>Select Source</option>
                                <option>Facebook</option>
                                <option>LinkedIn</option>
                                <option>Instagram</option>
                                <option>Career Fair</option>
                                <option>Indeed</option>
                                <option>Suitelifer</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[#363636]">
                            Referrer <span className="text-red-500">*</span>
                        </label>

                        <div className="mt-2">
                            <select
                                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                                onChange={(e) =>
                                    setNewApplicantData({
                                        ...newApplicantData,
                                        referrer_name: e.target.value,
                                    })
                                }
                            >
                                <option>Referrer</option>
                                {referrers.map((r) => (
                                    <option value={r.emp_id}>
                                        {r.f_name + " " + r.s_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-row gap-2 justify-end">
                    <button
                        className={`transition-all ease-in-out outline-none ${bgColor} ${hoverColor} text-white text-[14px] px-8 py-2 rounded-[8px]`}
                        onClick={() => handleAddSubmit()}
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* dito nakalagay yung duplicate side component */}

            <div className=" w-[380px] flex justify-center items-center h-full">
                <div>
                {
                    (duplicateData.length > 0) ? 
                    <p className="text-[18px] font-medium text-[#363636] mt-5 text-center"> Possible Duplicates ({duplicateData.length})</p> :
                    <p className="text-[18px] font-medium text-[#363636] mt-5">No duplicates found.</p>
                }
                
                {
                    (duplicateData.length > 0) ?
                    <div className="flex flex-col items-center justify-center leading-5 p-1 w-[360px]">
                {currentData.map((dd, index) => (
                    <div className="flex flex-col m-2  w-[340px] bg-white leading-5 p-4 rounded-2xl">
                            <p key={index} className="text-[14px] font-bold text-[#363636] text-justify mb-2">
                                {dd.name}
                            </p>

                            <p key={index} className="text-[12px] font-medium text-[#363636]">
                                Date Applied: {moment(dd.date_applied).format("MMMM D, YYYY") }
                            </p>

                            <p key={index} className="text-[12px] font-medium text-[#363636]">
                                Position Applied: {dd.position_applied}
                            </p>

                            <p key={index} className="text-[12px] font-medium text-[#363636]">
                                Application Status: {dd.application_status}
                            </p>

                            <p key={index} className="text-[12px] font-medium text-[#363636]">
                                Email Address: {dd.email}
                            </p>

                            <p key={index} className="text-[11px] font-medium  flex flex-wrap items-center text-[#363636] gap-2 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>  {dd.reason}
                            </p>
                    </div>
                            ))
                }
                </div> :
                ''
                }

                {
                    (duplicateData.length > 0) ?
                    <div className="flex flex-wrap justify-center justify-between items-center gap-2 p-4 m-2">
                    <button 
                        className="mx-1 px-2 py-1 bg-gray-200 text-gray-700"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        >
                        &lt;
                    </button>

                    <button 
                        className="mx-1 px-2 py-1 bg-gray-200 text-gray-700"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        >
                        &gt;
                    </button>
                </div> :
                 ''
                }
            </div>
        </div>
    </div>
    </div>
    </>
    )
}

