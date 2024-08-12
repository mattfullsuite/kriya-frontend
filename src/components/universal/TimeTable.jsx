import React, { useState, useEffect } from "react";
import Headings from "./Headings";
import DataTable from "react-data-table-component";
import Axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";

const TimeTable = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const [myIncompleteDates, setMyIncompleteDates] = useState([]);

  const [myAttendanceStatus, setMyAttendanceStatus] = useState([]);

  const [disputeInfo, setDisputeInfo] = useState({
    dispute_date: new Date(),
    dispute_title: "",
    dispute_body: "",
  });

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchAttendance = async (page) => {
    setLoading(true);

    const response = await Axios.get(
      BASE_URL +
        `/mtaa-getMyAttendanceData?page=${page}&limit=${perPage}&delay=1`
    );

    console.log(response.data.data2);

    setAttendance(response.data.data2);
    setTotalRows(response.data.pagination.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchAttendance(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await Axios.get(
      BASE_URL +
        `/mtaa-getPaginatedAttendanceList?page=${page}&limit=${newPerPage}&delay=1`
    );

    setAttendance(response.data.data2);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const leave_res = await Axios.get(BASE_URL + "/mtaa-getLeaveData");
        setLeaves(leave_res.data);

        const inc_res = await Axios.get(BASE_URL + "/mtaa-getMyIncompleteData");
        setMyIncompleteDates(inc_res.data);

        const my_status_res = await Axios.get(
          BASE_URL + "/mtaa-getMyStatusForAttendance"
        );
        setMyAttendanceStatus(my_status_res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAttendanceData();
  });

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0;
  };

  const handleAttendanceDispute = (event) => {
    document.getElementById("dispute_modal_btn").close();

    event.preventDefault();

    Axios.post(BASE_URL + "/d-createAttendanceDispute", disputeInfo)
      .then((response) => {
        alert("Successfully submitted dispute ticket!");

        //Clear variable and form
        setDisputeInfo([]);
        document.getElementById("disputeForm").reset();

        //Frontend Addition
      })
      .catch((e) => {
        // setNotif("error");
        // notifyFailed();

        alert("Error when submitting dispute ticket!");

        setDisputeInfo([]);
        document.getElementById("disputeForm").reset();
      });
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => moment(row.date).format("ddd, MMM DD, YYYY"),
      sortable: true,
    },

    {
      name: "Check In",
      selector: (row) =>
        row.time_in && row.time_in !== "Invalid date"
          ? moment(row.time_in, "HH:mm:ss a").format("hh:mm a")
          : null,
      sortable: true,
    },

    {
      name: "Check Out",
      selector: (row) =>
        row.time_out && row.time_out !== "Invalid date"
          ? moment(row.time_out, "HH:mm:ss a").format("hh:mm a")
          : null,
      sortable: true,
    },

    {
      name: "Work Time",
      selector: (row) => row.hours_worked,
      sortable: true,
    },

    {
      name: "Start Status",
      selector: (row) => row.status,
      sortable: true,
    },

    {
      name: "Completion Status",
      selector: (row) => row.undertime,
      sortable: true,
    },

    // {
    //     name: "Actions",
    //     selector: (row) => (checkTimeStatus(row.time_out, row.time_in) != "Completed") ? <button className="btn btn-primary width-full ">Dispute</button> : (checkDateIfLeave(moment(row.date).format("YYYY-MM-DD"))) && <button className="btn btn-info width-full">Leave Taken</button>,
    //     sortable: true,
    // },
  ];

  return (
    <div className="max-w-[1300px] m-auto p-5">
      <Headings text={"Time Table"} />

      <div className="bg-white mt-10 p-5 border border-[#e4e4e4] rounded-[15px] flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center gap-3">
          <div
            className={`rounded-full h-[70px] w-[70px] bg-[#90946F] text-white text-[24px] font-medium flex justify-center items-center`}
          >
            {myAttendanceStatus.f_name?.charAt(0) +
              myAttendanceStatus.s_name?.charAt(0)}
          </div>

          <div>
            <p className="text-[#363636] text-[18px] font-bold">
              {myAttendanceStatus.f_name + " " + myAttendanceStatus.s_name}
            </p>
            <p className="text-[15px] text-[#8b8b8b]">
              {myAttendanceStatus.position_name}
            </p>
            <p className="text-[12px] text-[#8b8b8b]">
              {myAttendanceStatus.start && myAttendanceStatus.end
                ? moment(myAttendanceStatus.start, "HH:mm:ss a").format(
                    "hh:mm a"
                  ) +
                  " - " +
                  moment(myAttendanceStatus.end, "HH:mm:ss a").format("hh:mm a")
                : "No Shift Registered"}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-end items-center gap-5">
          <div>
            <p className="text-[24px] font-bold text-[#363636] text-center leading-none">
              {myAttendanceStatus.early_start}
            </p>
            <p className="text-[12px] text-[#898989] text-center">
              Early Start
            </p>
          </div>

          <div className=" border-r-2 border-[#e4e4e4] h-8" />

          <div>
            <p className="text-[24px] font-bold text-[#363636] text-center leading-none">
              {myAttendanceStatus.late_start}
            </p>
            <p className="text-[12px] text-[#898989] text-center">Late Start</p>
          </div>

          <div className=" border-r-2 border-[#e4e4e4] h-8" />

          <div>
            <p className="text-[24px] font-bold text-[#363636] text-center leading-none">
              {myAttendanceStatus.overtime}
            </p>
            <p className="text-[12px] text-[#898989] text-center">Overtime</p>
          </div>

          <div className=" border-r-2 border-[#e4e4e4] h-8" />

          <div>
            <p className="text-[24px] font-bold text-[#363636] text-center leading-none">
              {myAttendanceStatus.undertime}
            </p>
            <p className="text-[12px] text-[#898989] text-center">Undertime</p>
          </div>

          <div className=" border-r-2 border-[#e4e4e4] h-8" />

          <div>
            <p className="text-[24px] font-bold text-[#363636] text-center leading-none">
              {myAttendanceStatus.completed}
            </p>
            <p className="text-[12px] text-[#898989] text-center">Completed</p>
          </div>

          <div className=" border-r-2 border-[#e4e4e4] h-8" />

          <div>
            <p className="text-[24px] font-bold text-[#363636] text-center leading-none">
              {myAttendanceStatus.data_incomplete}
            </p>
            <p className="text-[12px] text-[#898989] text-center">
              Data Incomplete
            </p>
          </div>

          <div className=" border-r-2 border-[#e4e4e4] h-8" />

          <div>
            <div
              className="w-full font-bold p-3 flex flex-col justify-center items-center bg-white text-[14px] rounded-[15px] border border-[#e4e4e4]"
              onClick={() =>
                document.getElementById("dispute_modal_btn").showModal()
              }
            >
              <span>Submit Dispute</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 box-border bg-white border border-[#e4e4e4] rounded-[15px]">
        <DataTable
          columns={columns}
          data={attendance}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          highlightOnHover
          responsive
        />
      </div>

      {/* Modal - File A Dispute   */}
      <dialog id="dispute_modal_btn" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center">File A Dispute</h3>

          <form
            id="disputeForm"
            action=""
            method="dialog"
            // onSubmit={handleSubmit}
          >
            <br />

            {/* Dropdown - PTO Type */}

            <label>
              <div className="label">
                <h1 className="label-text">
                  Type of Dispute <span className="text-red-500"> *</span>
                </h1>
              </div>
              <select
                id="dispute_type"
                name="dispute_type"
                className="select select-bordered w-full mb-2"
                onChange={(event) =>
                  setDisputeInfo({
                    ...disputeInfo,
                    dispute_title: event.target.value,
                  })
                }
                required
              >
                <option value="" disabled selected>
                  Select Type of Dispute
                </option>
                <option>Missing Time in/ Time out</option>
                <option>Wrong Shift Type</option>
                <option>Data Discrepancy</option>
                <option>Others</option>
              </select>
            </label>

            <div className="flex">
              {/* Date From */}
              <div className="flex-1 mx-1">
                <label>
                  <div className="label">
                    <h1 className="label-text">
                      Dispute Date <span className="text-red-500"> *</span>
                    </h1>
                  </div>

                  <div>
                    <DatePicker
                      className="textarea textarea-bordered w-full max-w-lg"
                      selected={disputeInfo.dispute_date}
                      //onChange={(date) => setStartDate(date)}
                      onChange={(date) =>
                        setDisputeInfo({ ...disputeInfo, dispute_date: date })
                      }
                      holidays={myIncompleteDates}
                      isClearable
                      filterDate={isWeekday}
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Reason for Leave */}
            <label className="form-control">
              <div className="label">
                <h1 className="label-text">
                  Appeal Reason<span className="text-red-500">*</span>{" "}
                  <span className="text-red-500"> </span>
                </h1>
              </div>
              <textarea
                id="appeal_reason"
                name="appeal_reason"
                className="textarea textarea-bordered w-full max-w-lg mb-2"
                placeholder="Appeal to dates selected..."
                onChange={(e) =>
                  setDisputeInfo({
                    ...disputeInfo,
                    dispute_body: e.target.value,
                  })
                }
                maxLength="255"
                required
              ></textarea>
              <div className="label py-0">
                <span className="label-text-alt"></span>
              </div>
            </label>

            <div className="divider"></div>

            <div className="divider"></div>

            {/* Button Container */}
            <div className="flex justify-end mt-3">
              <button
                id="submit-button"
                type="submit"
                className="btn btn-primary mr-2"
                onClick={(e) => {
                  handleAttendanceDispute(e);
                  console.log(disputeInfo);
                }}
                // onClick={handlePTOpoints}
                // disabled={isDisabled}
              >
                Submit
              </button>

              {/* Cancel Button */}
              {/* If there is a button in form, it will close the modal */}
              <button
                className="btn"
                type="button"
                onClick={() =>
                  document.getElementById("dispute_modal_btn").close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TimeTable;
