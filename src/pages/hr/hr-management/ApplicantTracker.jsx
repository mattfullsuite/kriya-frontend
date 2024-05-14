import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import moment from "moment";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const ApplicantTracker = ({ allEmployeesChevron, allEmployeesContainer }) => {


    const [records, setRecords] = useState([
        {
            app_id: "1",
            s_name: "Doe",
            f_name: "John",
            m_name: "Dam",
            date_hired: "2023-01-15",
            status: 6,
            emp_id: 1,
            cv: "CV",
            test_result: "Test Result"

        },
        {
            app_id: "2",
            s_name: "Smith",
            f_name: "Alice",
            m_name: "Mae",
            date_hired: "2023-02-20",
            status: 10,
            emp_id: 2,
            cv: "CV",
            test_result: "Test Result"
        },
        {
            app_id: "3",
            s_name: "Johnson",
            f_name: "Robert",
            m_name: "Bee",
            date_hired: "2023-03-10",
            status: 7,
            emp_id: 3,
            cv: "CV",
            test_result: "Test Result"
        },
        {
            app_id: "4",
            s_name: "Williams",
            f_name: "Sarah",
            m_name: "Kriya",
            date_hired: "2023-04-05",
            status: 9,
            emp_id: 4,
            cv: "CV",
            test_result: "Test Result"
        },
        {
            app_id: "5",
            s_name: "Brown",
            f_name: "Michael",
            m_name: "John",
            date_hired: "2023-05-12",
            status: 5,
            emp_id: 5,
            cv: "CV",
            test_result: "Test Result"
        }
    ]);

    const [editRecord, setEditRecord] = useState(null);

    const handleEditClick = (row) => {
        setEditRecord(row); // Set the record to be edited
    };

    const handleSaveClick = () => {
        // Save changes
        console.log("Saving changes for emp_id:", editRecord.emp_id);
        // Find the index of the edited record in the records array
        const index = records.findIndex(record => record.emp_id === editRecord.emp_id);

        // Make a copy of the records array to avoid directly mutating state
        const updatedRecords = [...records];

        // Update the values of the edited record
        updatedRecords[index] = {
            ...updatedRecords[index],
            s_name: editRecord.s_name,
            f_name: editRecord.f_name,
            m_name: editRecord.m_name,
            cv: editRecord.cv,
            test_result: editRecord.test_result,
        };

        // Set the updated records array
        setRecords(updatedRecords);
        setEditRecord(null); // Clear edit mode
    };

    const handleInputChange = (e, field) => {
        setEditRecord({
            ...editRecord,
            [field]: e.target.value
        });
    };


    const seperatedEmployeeColumn = [
        {
            name: "Applicant ID",
            selector: (row) => (
                <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1 my-2">
                    <div className="box-border w-10 h-10 rounded-full bg-[#D9D9D9] flex justify-center items-center text-[#666A40] font-bold text-[20px]">
                        {row.app_id.charAt(0)}
                    </div>
                </div>
            ),
            width: "150px",
        },
        {
            name: "Surname",
            selector: (row) => (
                <p className="text-[#363636]">
                    {editRecord && editRecord.emp_id === row.emp_id ? (
                        <input
                            type="text"
                            value={editRecord.s_name}
                            onChange={(e) => handleInputChange(e, "s_name")}
                        />
                    ) : (
                        row.s_name
                    )}
                </p>
            ),
            grow: 1,
        },
        {
            name: "First name",
            selector: (row) => (
                <p className="text-[#363636]">
                    {editRecord && editRecord.emp_id === row.emp_id ? (
                        <input
                            type="text"
                            value={editRecord.f_name}
                            onChange={(e) => handleInputChange(e, "f_name")}
                        />
                    ) : (
                        row.f_name
                    )}
                </p>
            ),
            grow: 1,
        },
        {
            name: "Middle name",
            selector: (row) => (
                <p className="text-[#363636]">
                    {editRecord && editRecord.emp_id === row.emp_id ? (
                        <input
                            type="text"
                            value={editRecord.m_name}
                            onChange={(e) => handleInputChange(e, "m_name")}
                        />
                    ) : (
                        row.m_name
                    )}
                </p>
            ),
            grow: 1,
        },
        {
            name: "Application Date",
            selector: (row) => (
                <p className="text-[#363636]">
                    {moment(row.date_hired).format("MMM DD YYYY")}
                </p>
            ),
            width: "150px",
        },
        {
            name: "CV",
            selector: (row) => (
                <p className="text-[#363636]">
                    {editRecord && editRecord.emp_id === row.emp_id ? (
                        <input
                            type="text"
                            value={editRecord.cv}
                            onChange={(e) => handleInputChange(e, "cv")}
                        />
                    ) : (
                        row.cv
                    )}
                </p>
            ),
            width: "150px",
        },
        {
            name: "Test Result",
            selector: (row) => (
                <p className="text-[#363636]">
                    {editRecord && editRecord.emp_id === row.emp_id ? (
                        <input
                            type="text"
                            value={editRecord.test_result}
                            onChange={(e) => handleInputChange(e, "test_result")}
                        />
                    ) : (
                        row.test_result
                    )}
                </p>
            ),
            width: "150px",
        },
        {
            name: "Status",
            selector: (row) => {
                if (row.status === 0) {
                    return (
                        <div className="bg-[#FFA006] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            Not Fit
                        </div>
                    );
                } else if (row.status === 1) {
                    return (
                        <div className="bg-[#FFFDD0] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            No Show on Interview
                        </div>
                    );
                } else if (row.status === 2) {
                    return (
                        <div className="bg-[#F8E002] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            Tests not answered
                        </div>
                    );
                } else if (row.status === 3) {
                    return (
                        <div className="bg-[#FEA086] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            First Interview Done
                        </div>
                    );
                } else if (row.status === 4) {
                    return (
                        <div className="bg-[#AEFC5A] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            Second Interview Done
                        </div>
                    );
                } else if (row.status === 5) {
                    return (
                        <div className="bg-[#93FDF1] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            Third Interview Done
                        </div>
                    );
                } else if (row.status === 6) {
                    return (
                        <div className="bg-[#32CABD] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            Follow-up Interview Done
                        </div>
                    );
                } else if (row.status === 7) {
                    return (
                        <div className="bg-[#C8B575] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            Withdrawn Application
                        </div>
                    );
                } else if (row.status === 8) {
                    return (
                        <div className="bg-[#F797D2] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            Tests Sent
                        </div>
                    );
                } else if (row.status === 9) {
                    return (
                        <div className="bg-[#388BFF] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            Job Offer Sent
                        </div>
                    );
                } else if (row.status === 10) {
                    return (
                        <div className="bg-[#B3DF72] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            Job Offer Accepted
                        </div>
                    );
                } else if (row.status === 11) {
                    return (
                        <div className="bg-[#DC143C] px-2 py-1 rounded-[5px] text-[#363636] w-[100px] text-center">
                            Job Offer Rejected
                        </div>
                    );
                } else {
                    return null;
                }
            },
            width: "150px",
        },

    ];

    // for the filter of status and show the different state of status in another dropdown
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [selectedStatusOptions, setSelectedStatusOptions] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [selectedToDate, setSelectedToDate] = useState('')
    // for modal
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDropdownChange = (e) => {
        const value = e.target.value;
        if (value === "Status") {
            setShowStatusDropdown(true);
            setShowCalendar(false);
        } else if (value === "All") {
            setShowStatusDropdown(false);
            setShowCalendar(false);
            setSelectedStatusOptions([]);
        } else if (value === "Date") {
            setShowCalendar(true);
            setShowStatusDropdown(false);
            setSelectedStatusOptions([]);
        }
    };

    const handleFromDateChange = (e) => {
        setSelectedFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setSelectedToDate(e.target.value);
    };


    const handleStatusOptionChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setSelectedStatusOptions(selectedValues);
    };

    // filtering of the status
    const [filteredRecords, setFilteredRecords] = useState([...records]);

    useEffect(() => {
        if (selectedStatusOptions.length > 0 && !selectedStatusOptions.includes("3")) {
            const filtered = records.filter(record =>
                selectedStatusOptions.includes(record.status.toString())
            );
            setFilteredRecords(filtered);
        } else {
            setFilteredRecords(records);
        }
    }, [selectedStatusOptions, records]);

    useEffect(() => {
        if (selectedFromDate && selectedToDate) {
            const filtered = records.filter(record => {
                const recordDate = moment(record.date_hired, 'YYYY-MM-DD');
                return recordDate.isSameOrAfter(selectedFromDate) && recordDate.isSameOrBefore(selectedToDate);
            });
            setFilteredRecords(filtered);
        } else {
            setFilteredRecords(records);
        }
    }, [selectedFromDate, selectedToDate, records]);

    // for modal
    const handleViewButtonClick = (row) => {

        const dialog = document.getElementById("my_modal_1");

        if (dialog) {
            dialog.showModal();
            document.getElementById("emp_name").innerHTML = row.s_name + ',' + ' ' + row.f_name + ' ' + row.m_name;
            document.getElementById("emp_id").innerHTML = row.app_id;
            document.getElementById("emp_date").innerHTML = row.date_hired;
            document.getElementById("emp_cv").innerHTML = 'File';
            document.getElementById("emp_test").innerHTML = 'Test';
            // document.getElementById("emp_status").innerHTML = row.status;
            if (row.status === 0) {
                document.getElementById("emp_status").innerHTML = 'Not Fit'
            }
            else if (row.status === 1) {
                document.getElementById("emp_status").innerHTML = 'No Show on Interview'
            }
            else if (row.status === 2) {
                document.getElementById("emp_status").innerHTML = 'Tests not answered'
            }
            else if (row.status === 3) {
                document.getElementById("emp_status").innerHTML = 'First Interview Done'
            }
            else if (row.status === 4) {
                document.getElementById("emp_status").innerHTML = 'Second Interview Done'
            }
            else if (row.status === 5) {
                document.getElementById("emp_status").innerHTML = 'Third Interview Done'
            }
            else if (row.status === 6) {
                document.getElementById("emp_status").innerHTML = 'Follow-up Interview Done'
            }
            else if (row.status === 7) {
                document.getElementById("emp_status").innerHTML = 'Withdrawn Application'
            }
            else if (row.status === 8) {
                document.getElementById("emp_status").innerHTML = 'Tests Sent'
            }
            else if (row.status === 9) {
                document.getElementById("emp_status").innerHTML = 'Job Offer Sent'
            }
            else if (row.status === 10) {
                document.getElementById("emp_status").innerHTML = 'Job Offer Accepted'
            }
            else if (row.status === 11) {
                document.getElementById("emp_status").innerHTML = 'Job Offer Rejected'
            }
        }



    };



    const modalColumns = [
        ...seperatedEmployeeColumn,
        {
            name: "Action",
            cell: (row) => {
                if (editRecord && editRecord.emp_id === row.emp_id) {
                    // If in edit mode, show "Save" button
                    return (
                        <button className="btn btn-active btn-xs btn-warning text-white" onClick={handleSaveClick}>
                            Save
                        </button>
                    );
                } else {
                    // If not in edit mode, show "Edit" button
                    return (
                        <button className="btn btn-active btn-xs btn-warning text-white" onClick={() => handleEditClick(row)}>
                            Edit
                        </button>
                    );
                }
            },
            width: "150px",
        }
    ];

    useEffect(() => {
        console.log("Modal should be open:", isModalOpen);
    }, [isModalOpen]);

    const animatedComponents = makeAnimated()


    // MODAL FOR ADD NEW BUTTON
    const AddNewItemModal = ({ isOpen, onClose }) => {
        const handleInputChange = (e) => {

        };

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log("submit");
            onClose();
        };

        return (
            <div
                className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? "" : "hidden"
                    }`}
            >
                <div className="bg-white p-6 rounded-lg w-[800px]">
                    <h2 className="text-xl font-bold mb-4">Add New Applicant</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            // value={surname}
                            onChange={handleInputChange}
                            placeholder="Enter surname"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
                        />
                        <input
                            type="text"
                            // value={firstname}
                            onChange={handleInputChange}
                            placeholder="Enter First name"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
                        />
                        <input
                            type="text"
                            // value={middlename}
                            onChange={handleInputChange}
                            placeholder="Enter Middle name"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
                        />
                        <input
                            type="date"
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
                        />
                        <input
                            type="text"
                            // value={middlename}
                            placeholder="Enter CV link"
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
                        />
                        <input
                            type="text"
                            // value={middlename}
                            onChange={handleInputChange}
                            placeholder="Enter Test result"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
                        />
                        <select className='border border-gray-300 rounded-md px-3 py-2 mb-3 w-full'>
                            <option selected disabled>Select Status</option>
                            <option>Status 1</option>
                            <option>Status 2</option>
                            <option>Status 3</option>
                            <option>Status 4</option>
                        </select>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-[#666A40] text-white px-4 py-2 rounded-md"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <div className="box-border flex flex-row flex-nowrap justify-between items-center gap-2 pt-10 pb-5 max-w-[100%]">
                {/* <button className="bg-[#666A40] px-3 py-2 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 w-[120px] ml-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-white w-6 h-6"
                    >
                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                    </svg>
                    <span className="text-white text-[15px]">Add New</span>
                </button> */}
                <button
                    className="bg-[#666A40] px-3 py-2 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 w-[120px] ml-5"
                    onClick={openModal}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-white w-6 h-6"
                    >
                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                    </svg>
                    <span className="text-white text-[15px]">Add New</span>
                </button>
                <AddNewItemModal isOpen={isModalOpen} onClose={closeModal} />


                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] w-[400px]"
                            placeholder="Search Employee..."
                        />


                        <div className="flex items-center">
                            <select
                                className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] min-w-[100px] mr-2"
                                onChange={handleDropdownChange}
                            >
                                <option>All</option>
                                <option>Status</option>
                                <option>Date</option>
                            </select>
                        </div>
                    </div>
                    {showStatusDropdown && (

                        <Select
                            isMulti
                            placeholder={'Select status'}
                            options={[
                                { value: '0', label: 'Not Fit' },
                                { value: '1', label: 'No Show on Interview' },
                                { value: '2', label: 'Tests not answered' },
                                { value: '3', label: 'First Interview Done' },
                                { value: '4', label: 'Second Interview Done' },
                                { value: '5', label: 'Third Interview Done' },
                                { value: '6', label: 'Follow-up Interview Done' },
                                { value: '7', label: 'Withdrawn Application' },
                                { value: '8', label: 'Tests Sent' },
                                { value: '9', label: 'Job Offer Sent' },
                                { value: '10', label: 'Job Offer Accepted' },
                                { value: '11', label: 'Job Offer Rejected' },
                            ]}
                            onChange={handleStatusOptionChange}
                            components={animatedComponents}
                            getOptionLabel={(option) => {
                                let color;
                                switch (option.value) {
                                    case '0':
                                        color = '#FFA006'; // Orange for Open
                                        break;
                                    case '1':
                                        color = '#FFFDD0'; // Orange for Open
                                        break;
                                    case '2':
                                        color = '#F8E002'; // Light blue for Pending and Completed
                                        break;
                                    case '3':
                                        color = '#FEA086'; // Light blue for Pending and Completed
                                        break;
                                    case '4':
                                        color = '#AEFC5A'; // Light blue for Pending and Completed
                                        break;
                                    case '5':
                                        color = '#93FDF1'; // Light blue for Pending and Completed
                                        break;
                                    case '6':
                                        color = '#32CABD'; // Light blue for Pending and Completed
                                        break;
                                    case '7':
                                        color = '#C8B575'; // Light blue for Pending and Completed
                                        break;
                                    case '8':
                                        color = '#F797D2'; // Light blue for Pending and Completed
                                        break;
                                    case '9':
                                        color = '#388BFF'; // Light blue for Pending and Completed
                                        break;
                                    case '10':
                                        color = '#B3DF72'; // Light blue for Pending and Completed
                                        break;
                                    case '11':
                                        color = '#DC143C'; // Light blue for Pending and Completed
                                        break;
                                    default:
                                        color = 'black';
                                }
                                return (
                                    <div style={{ backgroundColor: color, padding: '5px', borderRadius: '5px', textAlign: 'center' }}>
                                        {option.label}
                                    </div>
                                );
                            }}
                            className='mr-9 w-[300px] bg-[#F7F7F7]'
                        />
                    )}
                    {showCalendar && (
                        <div className="flex flex-wrap items-center gap-2 mr-9">
                            <div>
                                <label htmlFor="fromDate" className="text-[#363636] mr-2 text-sm">Date from:</label>
                                <input
                                    type="date"
                                    id="fromDate"
                                    name="fromDate"
                                    placeholder='From'
                                    value={selectedFromDate}
                                    min="2020-01-01"
                                    onChange={handleFromDateChange}
                                    className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-1 text-[14px] focus:outline-none text-[#363636] min-w-[100px]"
                                />
                            </div>
                            <div>
                                <label htmlFor="toDate" className="text-[#363636] mr-2 text-sm">Date to:</label>
                                <input
                                    type="date"
                                    id="toDate"
                                    name="toDate"
                                    placeholder='To'
                                    value={selectedToDate}
                                    min="2000-01-01"
                                    onChange={handleToDateChange}
                                    className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-1 text-[14px] focus:outline-none text-[#363636] min-w-[100px]"
                                /></div>
                        </div>
                    )}
                </div>
            </div>



            <DataTable
                columns={modalColumns}
                data={filteredRecords}
                pagination
                highlightOnHover
                responsive
                style={{
                    textAlign: 'center'
                }}
            // className='text-center'
            />

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-[#666A40]">EMPLOYEE DETAILS</h3>
                    <hr className='mb-3 mt-3'></hr>
                    <div class="grid grid-cols-2 gap-2">
                        <div class='grid-rows-1 font-bold'>
                            <div>Application ID</div>
                            <div>Fullname</div>
                            <div>Application Date</div>
                            <div>CV</div>
                            <div>Test Result</div>
                            <div>Status</div>
                        </div>
                        <div class='grid-rows-1'>
                            <div id='emp_id'></div>
                            <div id='emp_name'></div>
                            <div id='emp_date'></div>
                            <div id='emp_cv'></div>
                            <div id='emp_test'></div>
                            <div id='emp_status'>

                            </div>
                        </div>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default ApplicantTracker;







// YUNG CODE NYO TO BAGO KO GINALAW HHIHIHI==========


//   return (
//     <>
//     <div className="box-border flex flex-row flex-nowrap justify-start gap-2 pt-10 pb-5 max-w-[700px]">
//           <button className="bg-[#666A40] px-3 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               className="fill-white w-6 h-6"
//             >
//               <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
//             </svg>
//             <span className="text-white text-[14px]">Add New</span>
//           </button>

//           <input
//             type="text"
//             className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] flex-1"
//             placeholder="Search Employee..."
//           />

//           <select className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] w-[100px]" onChange={handleDropdownChange}>
//             <option>All</option>
//             <option>Status</option>
//             <option>Date</option>
//           </select>

//           {/* // for the filter of status and show the different state of status in another dropdown */}
//           {showStatusDropdown && (
//           <select
//             className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] w-[200px]"
//             onChange={handleStatusOptionChange}
//           >
//             <option value="3">All</option>
//             <option value="0">Open</option>
//             <option value="1">Pending</option>
//             <option value="2">Completed</option>
//           </select>
//         )}

//         {showCalendar && (
//         <div>
//           <label htmlFor="fromDate">Date from:</label>
//           <input 
//             type="date" 
//             id="fromDate" 
//             name="fromDate" 
//             value={selectedFromDate}
//             min="2020-01-01"
//             onChange={handleFromDateChange}
//           />
//           <label htmlFor="toDate">Date to:</label>
//           <input 
//             type="date" 
//             id="toDate" 
//             name="toDate" 
//             value={selectedToDate}
//             min="20000-01-01"
//             onChange={handleToDateChange}
//           />
//         </div>
//       )}

         
//         </div>

//  <DataTable
//           columns={seperatedEmployeeColumn}
//           data={filteredRecords}
//           pagination
//           highlightOnHover
//           responsive
//         />
//         </>
//   );
// };

