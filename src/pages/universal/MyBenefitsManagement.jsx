import Headings from "../../components/universal/Headings";
import DataTable from "react-data-table-component";
import MemoDocument from "./my-team/components/memo-generation/MemoDocument";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyBenefitsManagement = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const buttonRef = useRef();

  const [newEmail, setNewEmail] = useState({
    emp_num: 0,
    email_title: "",
    email_body: "",
  });
  const [selectedMemo, setSelectedMemo] = useState(0);
  const [undertimes, setUndertimes] = useState([]);

  const [userLates, setUserLates] = useState([]);
  const [userViolations, setUserViolations] = useState([]);
  const [userAWOLs, setUserAWOLs] = useState([]);
  const [probationaryLeaves, setProbationaryLeaves] = useState([]);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(0);

  const [searchTerm, setSearchTerm] = useState("")
  const memoRef = useRef(null);

  const [formData, setFormData] = useState({
    memo_id: "",
    name: "",
    lates: [],
    tardinessDates: [],
    awols: [],
    probationaryLeaves: [],
  });

  useEffect(() => {
    const fetchAbnormalities = async () => {
      try {
        const company_undertime_res = await Axios.get(
          BASE_URL + "/mg-getAllViolators"
        );
        setUndertimes(company_undertime_res.data);

        setIsPageLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAbnormalities();
  }, [undertimes]);

  useEffect(() => {
    const fetchAbnormalities = async () => {
      try {
        const user_lates_res = await Axios.get(
          BASE_URL + `/mg-getLatesOfUser?emp_no=${selectedRow}&delay=1`
        );
        setUserLates(user_lates_res.data);

        const user_undertime_res = await Axios.get(
          BASE_URL + `/mg-getUndertimesOfUser?emp_no=${selectedRow}&delay=1`
        );
        setUserViolations(user_undertime_res.data);

        const user_awol_res = await Axios.get(
          BASE_URL + `/mg-getAWOLsOfUser?emp_no=${selectedRow}&delay=1`
        );
        setUserAWOLs(user_awol_res.data);

        const probationary_leaves_res = await Axios.get(
          BASE_URL + `/mg-getUnpaidLeavesOfUser?emp_no=${selectedRow}&delay=1`
        );
        setProbationaryLeaves(probationary_leaves_res.data);

        setFormData({
          ...formData,
          lates: user_lates_res.data,
          tardinessDates: user_undertime_res.data,
          awols: user_awol_res.data,
          probationaryLeaves: probationary_leaves_res.data,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAbnormalities();
  }, [selectedRow]);

  const generateMemos = async (event) => {
    buttonRef.current.disabled = true;

    await Axios.post(`${BASE_URL}/mg-generateMemos`)
      .then((response) => {
        if (response.data === "success") {
          toast.success("Memos Generated!");
          buttonRef.current.disabled = true;
        } else if (response.data === "error") {
          toast.error("Something went wrong.");
          buttonRef.current.disabled = false;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const columns = [
    {
      name: "Employee Number",
      selector: (row) => row.emp_num,
    },
    {
      name: "Name",
      selector: (row) => row.f_name + " " + row.s_name,
    },
    {
      name: "Executor",
      selector: (row) =>
        row.executor_f_name
          ? row.executor_f_name + " " + row.executor_s_name
          : null,
    },
    {
      name: "Date Processed",
      selector: (row) =>
        row.date_processed
          ? moment(row.date_processed).format("MMMM D, YYYY")
          : null,
    },
    {
      name: "Memo Status",
      selector: (row) => checkMemoStatus(row.memo_status),
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="flex flex-row justify-center flex-wrap gap-1">
          <button
            className="btn btn-xs bg-gray-500 hover:bg-700 text-white"
            onClick={() => {
              setFormData({
                ...formData,
                memo_id: row.generated_memos_id,
                name: row.f_name + " " + row.s_name,
              });
              setSelectedRow(row.emp_num);

              document.getElementById(row.emp_num).showModal();
            }}
          >
            <p>Check</p>
          </button>

          {dialogComponents(row.emp_num)}

          <button
            className="btn btn-xs bg-red-500 hover:bg-700 text-white"
            onClick={() => {
              ignoreMemo(row.generated_memos_id);
              // ignoreMemo(selectedMemo)
            }}
          >
            <p>Ignore</p>
          </button>
        </div>
      ),
    },
  ];

  async function ignoreMemo(m_id) {
    const memoData = { memo_id: m_id };

    await Axios.post(`${BASE_URL}/mg-ignoreMemo`, memoData)
      .then((response) => {
        if (response.data === "success") {
          toast.success("Ignored Memo");
        } else if (response.data === "error") {
          toast.error("Something went wrong.");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async function sendEmailStatus(m_id) {
    const memoData = { memo_id: m_id };

    await Axios.post(`${BASE_URL}/mg-sentEmailStatus`, memoData)
      .then((response) => {
        if (response.data === "success") {
          console.log("success");
        } else if (response.data === "error") {
          console.log("Something went wrong.");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function updateFormData(rowId, data) {
    //Iterate list and update certain row
    formData.lates.filter(function (value, index, arr) {
      //Row to update
      if (value.id == rowId) {
        return { name: data.name, age: data.age };
      } else {
        //Nothing to update, return current item (spread all values)
        return { ...value };
      }
    });
    setUserLates([]);
  }

  function checkMemoStatus(status) {
    if (status == 0) {
      return <div className="badge badge-warning">Pending</div>;
    }
    if (status == 1) {
      return <div className="badge badge-info">Memo Sent</div>;
    }
    if (status == 2) {
      return <div className="badge badge-success">Filed</div>;
    }
    if (status == 9) {
      return <div className="badge badge-error">Ignored</div>;
    }
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const sendEmail = async (m_id) => {
    await Axios.post(`${BASE_URL}/mg-sendEmailLetter`, newEmail, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.data === "success") {
          sendEmailStatus(m_id);
          toast.success("Succesfully Sent Email!");
        } else if (response.data === "error") {
          toast.error("Something went wrong.");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const dialogComponents = (id) => {
    return (
      <>
        {/* Modal - Details */}
        <dialog id={id} className="modal" ref={memoRef}>
          <div className="modal-box w-11/12 max-w-5xl h-full">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <div className="flex gap-10 h-full">
              <MemoDocument formData={formData} />

              <div className="flex-1 ">
                <p className="font-bold text-lg">
                  Summary of Violations for {formData.name}{" "}
                </p>

                {userLates.length > 0 && (
                  <p className="mt-6 mb-3 font-bold">
                    Late Time In Violation(/s)
                  </p>
                )}

                <div className="grid grid-cols-3 grid-rows-0 gap-5">
                  {userLates?.map((d) => (
                    <input
                      type="text"
                      className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                      value={`${moment(d.date).format("MMM DD")} (${moment
                        .duration(d.late_mins)
                        .asMinutes()}m)`}
                    />
                  ))}
                </div>

                {userViolations?.length > 0 && (
                  <>
                    <p className="mt-6 mb-3 font-bold">
                      Undertime Violation(/s)
                    </p>

                    <div className="grid grid-cols-3 grid-rows-0 gap-3">
                      {userViolations?.map((d) => (
                        <input
                          type="text"
                          className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                          value={`${moment(d.date).format("MMM DD")} (${
                            d.hours_worked
                          })`}
                          onChange={() => d.date}
                        />
                      ))}
                    </div>
                  </>
                )}

                {userAWOLs?.length > 0 && (
                  <>
                    <p className="mt-6 mb-3 font-bold">
                      Absence Without Leave (AWOL) Violation(/s)
                    </p>

                    <div className="grid grid-cols-3 grid-rows-0 gap-5">
                      {userAWOLs?.map((d) => (
                        // <DatePicker
                        // className="input input-bordered w-full max-w-xs mb-2"
                        // placeholderText="Add Date"
                        // isClearable
                        // disabledKeyboardNavigation
                        // //maxDate={new Date()}
                        // selected={moment(d.date).valueOf()} />
                        <input
                          type="text"
                          className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                          value={`${moment(d.date).format("MMM DD")}`}
                          onChange={() => d.date}
                        />
                      ))}
                    </div>
                  </>
                )}

                {probationaryLeaves?.length > 0 && (
                  <p className="mt-6 mb-3 font-bold">
                    Probationary Unpaid Leave Violation(/s)
                  </p>
                )}

                <div className="grid grid-cols-3 grid-rows-0 gap-5">
                  {probationaryLeaves?.map((d) => (
                    <input
                      type="text"
                      className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                      value={`${moment(d.date).format("MMM DD")}`}
                      onChange={() => d.date}
                    />
                  ))}
                </div>

                <div className="mt-40">
                  <input
                    type="file"
                    accept=".pdf"
                    className="file-input file-input-bordered"
                    onChange={async (e) => {
                      let base64 = await convertBase64(e.target.files[0]);
                      setNewEmail({
                        ...newEmail,
                        emp_num: selectedRow,
                        email_attachment_name: e.target.files[0].name,
                        email_attachment: base64,
                      });
                    }}
                  />

                  <button
                    className={`outline-none border border-[#e4e4e4] bg-white-500 text-[14px] text-black rounded-[8px] px-5 py-2`}
                    onClick={() => sendEmail(formData.memo_id)}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </>
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="box-border m-auto max-w-[1300px] p-5">
        <Headings text={"Memo Generation"} />
        <div className="mt-5 grid bg-white border border-[#e4e4e4] rounded-[15px]">
          <div className="box-border">
            {/* <BuildingComponent /> */}

            <div className={`bg-[#EAECDB] p-2 rounded-[15px]`}>
              <div className="flex flex-row gap-5 justify-between">
                <div className="flex flex-row gap-2 w-[700px]">

                  <input
                    value={searchTerm}
                    className="flex-1 outline-none px-3 py-2 rounded-[8px] text-[14px] text-[#363636]"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  {/* <select className="outline-none text-[14px] text-[#363636] rounded-[8px] w-[100px]">
                  <option>Filter</option>
                </select> */}

                  <button
                    className="bg-[#666A40] px-2 py-2 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 h-full"
                    //onClick={() => handleSearch()}
                  >
                    <span className="text-white text-[14px]">Search</span>
                  </button>

                  {/* {isSearch && (
                    <button
                      className="bg-[#666A40] px-2 py-2 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 h-full"
                      onClick={() => {
                        setApplicantData(defaultData);
                        setIsSearch(false);
                        setSearchTerm("");
                      }}
                    >
                      <span className="text-white text-[14px]">Reset</span>
                    </button>
                  )} */}

                  <button
                    className="bg-[#666A40] px-2 py-2 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 h-full"
                    onClick={() => generateMemos()}
                    ref={buttonRef}
                  >
                    <span className="text-white text-[14px]">Generate Memo</span>
                  </button>

                </div>

                <div className="flex items-center gap-2">

                    <select
                      className="outline-none text-[12px] text-[#363636] border border-[#363636] px-3 py-2 rounded-[8px] w-[100px]"
                      //onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option selected disabled>
                        Filter
                      </option>
                      <option>Pending</option>
                      <option>Memo Sent</option>
                      <option>Ignored</option>
                      <option>Appealed</option>
                      <option>Sanctioned</option>
                    </select>
                </div>
              </div>
            </div>

            {/* <div className="box-border w-full p-3 rounded-[15px] mt-2">
              <button
                className="mx-5 outline-none border border-[#e4e4e4] bg-green-700 text-[13px] text-white rounded-[8px] px-5 py-2"
                onClick={() => generateMemos()}
                ref={buttonRef}
              >
                {" "}
                Generate Memo
              </button>
            </div> */}

            <div className="box-border w-full p-3 rounded-[15px] border border-[#E4E4E4] mt-2 overflow-x-scroll">
              {isPageLoading ? (
                <>Loading</>
              ) : (
                <DataTable
                  columns={columns}
                  data={undertimes.filter((item) => {
                    if (searchTerm === "") {
                      return item;
                    } else if (
                      item?.emp_num.toLowerCase().includes(searchTerm.toLowerCase())
                      // item?.f_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      // item?.executor_f_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      // item?.executor_s_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      // item?.memo_status.toLowerCase().includes(searchTerm.toLowerCase()) 
                    ) {
                      return item;
                    }
                  })}
                  pagination
                  highlightOnHover
                  theme="default"
                  responsive
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBenefitsManagement;
