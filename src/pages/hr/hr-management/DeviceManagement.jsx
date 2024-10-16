import Axios from "axios";
import React, { createContext, useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import Headings from "../../../components/universal/Headings";
import { Link } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";

const DeviceManagement = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const addNewRef = useRef(null);
  const viewRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [viewHistory, setViewHistory] = useState(false);
  const [addAssignee, setAddAssignee] = useState(false);
  const [editAddAssignee, setEditAddAssignee] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [devicesData, setDevicesData] = useState([]);

  const [deviceCategory, setDeviceCategory] = useState([]);

  const [countCategory, setCountCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeEmployees, setActiveEmployees] = useState([]);

  const [allCount, setAllCount] = useState(0);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const devices_data_res = await Axios.get(
          BASE_URL + `/dm-getDevicesOfCompany?category=${selectedCategory}`
        );
        setDevicesData(devices_data_res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllData();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const devices_data_res = await Axios.get(
          BASE_URL + `/dm-getDevicesOfCompany?category=${selectedCategory}`
        );
        setAllCount(devices_data_res.data.length);

        const device_category_res = await Axios.get(
          BASE_URL + "/dm-getCategoryOfDevices"
        );
        setDeviceCategory(device_category_res.data);

        const category_count_res = await Axios.get(
          BASE_URL + "/dm-countDevicesPerCategory"
        );
        setCountCategory(category_count_res.data);

        const active_employees_res = await Axios.get(
          BASE_URL + "/em-allEmployees"
        );
        setActiveEmployees(active_employees_res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllData();
  }, []);

  const [selectedDevice, setSelectedDevice] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const device_num_res = await Axios.get(
          BASE_URL + `/dm-retrieveDeviceDetails?deviceNumber=${selectedDevice}`
        );
        setSelectedDevice(device_num_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, [selectedRow]);

  const [newAssignedDate1, setNewAssignedDate1] = useState(new Date());
  const [newAssignedDate2, setNewAssignedDate2] = useState(new Date());

  const [newDeviceData, setNewDeviceData] = useState({
    device_name: "",
    device_brand: "",
    device_model: "",
    device_serial_no: "",
    device_tag: "",
    device_description: "",
    device_category: "",
    assignee_name1: "",
    assigned_date1: moment(newAssignedDate1).format("YYYY-MM-DD"),
    assignee_name2: "",
    assigned_date2: moment(newAssignedDate2).format("YYYY-MM-DD"),
  });

  const addNewEquipment = () => {
    addNewRef.current.close();

    console.log(newDeviceData);

    Axios.post(BASE_URL + "/dm-addNewDevice", newDeviceData)
      .then((res) => {
        if (res.data === "success") {
          alert("done");
        } else if (res.data === "error") {
          alert("error");
        }
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: "Equipment",
      selector: (row) => (
        <div className="flex flex-row justifystart items-center gap-2 py-3">
          <img src={row.device_image} className="h-10 w-10 object-contain" />

          <div>
            <p className="text-[14px] text-[#363636]">{row.device_category}</p>
            <p className="text-[12px] text-[#8b8b8b]">{row.device_brand}</p>
          </div>
        </div>
      ),
    },

    {
      name: "Model",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.device_model}</p>
      ),
    },

    {
      name: "Serial No.",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.device_serial_no}</p>
      ),
    },

    {
      name: "Tag",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.device_tag}</p>
      ),
      width: "80px",
    },

    {
      name: "Description",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.device_description}</p>
      ),
    },

    {
      name: "Assigned To",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">
          {row.f_name ? row.f_name + " " + row.s_name : "---"}
        </p>
      ),
    },
  ];

  return (
    <>
      <div className="max-w-[1300px] m-auto p-5">
        <Headings text={"Device Management"} />

        <div className="mt-10 grid grid-cols-3 gap-5">
          <div className="bg-white border border-[#e4e4e4] p-5 rounded-[15px]">
            <span className="text-[14px] font-medium text-[#363636]">
              Equipment Allocation
            </span>

            <div className="mt-3 flex flex-row justify-around">
              <div>
                <p className="text-[32px] font-bold text-[#363636] text-center leading-none">
                  0
                </p>
                <p className="text-[12px] text-[#858585] text-center leading-nione">
                  Assigned
                </p>
              </div>

              <div className="h-10 border-r border-[#e4e4e4]" />

              <div>
                <p className="text-[32px] font-bold text-[#363636] text-center leading-none">
                  {allCount}
                </p>
                <p className="text-[12px] text-[#858585] text-center leading-nione">
                  Unassigned
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e4] p-5 rounded-[15px] col-span-2">
            <span className="text-[14px] font-medium text-[#363636]">
              Equipment List
            </span>

            <div className="mt-3 flex flex-row flex-wrap gap-5">
              <button
                className="text-[14px] underline text-[#8C8F70]"
                value="All"
                onClick={(e) => setSelectedCategory(e.target.value)}
              >
                {`All (${allCount})`}
              </button>

              {countCategory.map((cc) => (
                <button
                  className="text-[14px] underline text-[#8C8F70]"
                  value={cc.device_category}
                  onClick={(e) => setSelectedCategory(e.target.value)}
                >
                  {cc.count > 1
                    ? `${cc.device_category}s (${cc.count})`
                    : `${cc.device_category} (${cc.count})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 p-5 bg-white border border-[#e4e4e4] rounded-[15px]">
          <div className="bg-[#EAECDB] p-3 rounded-[10px]">
            <div className="max-w-[720px] flex flex-row gap-2">
              <input
                type="text"
                className="flex-1 p-2 bg-white border border-[#e4e4e4] rounded-[7px] text-[14px] text-[#363636] outline-none"
                placeholder="Search"
              />

              <button
                onClick={() => addNewRef.current.showModal()}
                className="bg-[#666A40] text-white px-5 text-[14px] rounded-[7px] outline-none"
              >
                Add New Equipment
              </button>

              <button
                className={`outline-none transition-all ease-in-out bg-[#666A40] rounded-[8px] text-white text-[14px] px-3 py-2`}
              >
                <Link to={`/hr/hr-management/device-accountability-uploader`}>
                  Upload CSV
                </Link>
              </button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={devicesData}
            pagination
            onRowClicked={(row) => {
              setSelectedRow(row);
              setSelectedDevice(row.device_id);
              viewRef.current.showModal();
            }}
            highlightOnHover
          />
        </div>
      </div>

      {/* Add new equipment modal */}
      <dialog ref={addNewRef} className="modal">
        <div className="modal-box w-10/12 max-w-3xl">
          <div className="flex flex-row justify-between items-center">
            <span className="text-[20px] font-bold text-[#363636]">
              Add New Equipment
            </span>

            <button
              onClick={() => addNewRef.current.close()}
              className="absolute right-2 top-2 btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          <div className="mt-8">
            <div className="flex flex-row justify-start items-center gap-2">
              <span className="text-[18px] font-medium text-[#363636]">
                Equipment Details
              </span>

              <div>
                <select
                  className="outline-none text-[#363636] text-[12px] border border-[#363636] rounded-full"
                  onChange={(e) =>
                    setNewDeviceData({
                      ...newDeviceData,
                      device_category: e.target.value,
                    })
                  }
                >
                  <option disabled>Select Category</option>
                  {deviceCategory.map((dc) => (
                    <option value={dc.device_category}>
                      {dc.device_category}
                    </option>
                  ))}
                </select>
                <span className="text-[12px] text-red-500 ml-1">*</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-5">
              <div>
                <label className="text-[12px] text-[#363636] font-medium">
                  Equipment Name <span className="text-red-500">*</span>
                </label>

                {/* <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                  onChange={(e) =>
                    setNewDeviceData({
                      ...newDeviceData,
                      device_name: e.target.value,
                    })
                  }
                /> */}

                <select
                  className="outline-none text-[#363636] rounded-[8px] text-[14px] px-3 py-2"
                  onChange={(e) =>
                    setNewDeviceData({
                      ...newDeviceData,
                      device_category: e.target.value,
                    })
                  }
                >
                  <option disabled>Select Category</option>
                  {deviceCategory.map((dc) => (
                    <option value={dc.device_category}>
                      {dc.device_category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[12px] text-[#363636] font-medium">
                  Brand <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                  onChange={(e) =>
                    setNewDeviceData({
                      ...newDeviceData,
                      device_brand: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636] font-medium">
                  Model
                </label>

                <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                  onChange={(e) =>
                    setNewDeviceData({
                      ...newDeviceData,
                      device_model: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636] font-medium">
                  Serial Number
                </label>

                <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                  onChange={(e) =>
                    setNewDeviceData({
                      ...newDeviceData,
                      device_serial_no: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636] font-medium">
                  Tag
                </label>

                <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                  onChange={(e) =>
                    setNewDeviceData({
                      ...newDeviceData,
                      device_tag: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-span-3">
                <label className="text-[12px] text-[#363636] font-medium">
                  Description
                </label>

                <br />

                <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                  onChange={(e) =>
                    setNewDeviceData({
                      ...newDeviceData,
                      device_description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[18px] font-medium text-[#363636]">
              Accountability Details
            </p>

            <div className="flex flex-row justify-start items-center gap-2 mt-3">
              <input
                type="checkbox"
                className="toggle"
                onChange={(e) => setChecked(e.target.checked)}
                defaultChecked={false}
              />

              <span className="text-[14px] text-[#363636]">Assigned</span>
            </div>
          </div>

          {checked === true && (
            <div className="w-full mt-5 flex flex-row justify-center gap-2">
              <div className="flex-1">
                <div className="flex flex-row gap-2">
                  <div className="flex-1">
                    <label className="text-[12px] text-[#363636] font-medium">
                      Assigned To <span className="text-red-500">*</span>
                    </label>

                    <br />

                    <select
                      className="outline-none text-[#363636] rounded-[8px] text-[10px] px-3 py-2"
                      onChange={(e) =>
                        setNewDeviceData({
                          ...newDeviceData,
                          assignee_name1: e.target.value,
                        })
                      }
                    >
                      <option selected disabled>Select Employee</option>
                      {activeEmployees.map((ae) => (
                        <option value={ae.emp_num}>
                          {`(${ae.emp_num}) ${ae.f_name} ${ae.s_name}`}
                        </option>
                      ))}{" "}
                      .
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="text-[12px] text-[#363636] font-medium">
                      Assigned Date <span className="text-red-500">*</span>
                    </label>

                    <br />

                    {/* <input
                      type="date"
                      className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                      selected={newAssignedDate1}
                      onChange={(date) => setNewAssignedDate1(date)}
                    /> */}

                <DatePicker
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs mb-2"
                      selected={newAssignedDate1}
                      onChange={(date) => setNewAssignedDate1(date)}
                      required
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[12px] text-[#363636]">
                    Contact number: <span>--</span>
                  </p>
                  <p className="text-[12px] text-[#363636]">
                    Department: <span>--</span>
                  </p>
                  <p className="text-[12px] text-[#363636]">
                    Position: <span>--</span>
                  </p>
                </div>
              </div>

              <div className="border-r border-[#e4e4e4]" />

              <div className="flex-1 flex justify-center items-center">
                {addAssignee ? (
                  <div>
                    <div className="flex flex-row gap-2">
                      <div className="flex-1">
                        <label className="text-[12px] text-[#363636] font-medium">
                          Assigned To <span className="text-red-500">*</span>
                        </label>

                        <br />

                        <select
                          className="outline-none text-[#363636] rounded-[8px] text-[10px] px-3 py-2"
                          onChange={(e) =>
                            setNewDeviceData({
                              ...newDeviceData,
                              assignee_name2: e.target.value,
                            })
                          }
                        >
                          <option selected disabled>Select Employee</option>
                          {activeEmployees.map((ae) => (
                            <option value={ae.emp_num}>
                              {`(${ae.emp_num}) ${ae.f_name} ${ae.s_name}`}
                            </option>
                          ))}{" "}
                          .
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="text-[12px] text-[#363636] font-medium">
                          Assigned Date <span className="text-red-500">*</span>
                        </label>

                        <br />

                        <DatePicker
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs mb-2"
                          selected={newAssignedDate2}
                          onChange={(date) => setNewAssignedDate2(date)}
                          required
                        />

                        {/* <input
                          type="date"
                          className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                          value={(date) => setNewAssignedDate2(date)}
                        /> */}

                        

                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-[12px] text-[#363636]">
                        Contact number: <span>--</span>
                      </p>
                      <p className="text-[12px] text-[#363636]">
                        Department: <span>--</span>
                      </p>
                      <p className="text-[12px] text-[#363636]">
                        Position: <span>--</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddAssignee(true)}
                    className="outline-none border border-[#363636] text-[14px] text-[#363636] px-4 py-2 rounded-[15px]"
                  >
                    Add Another Assignee
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-row justify-end gap-2 mt-3">
            <button
              className="bg-[#666A40] text-white text-[14px] px-5 py-2 rounded-[8px]"
              onClick={() => addNewEquipment()}
            >
              Add Equipment
            </button>

            <button
              onClick={() => addNewRef.current.close()}
              className="text-[#363636] bg-[#e4e4e4] text-[14px] px-5 py-2 rounded-[8px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* View equipment modal */}
      <dialog ref={viewRef} className="modal">
        <div className="modal-box w-20/22 max-w-5xl bg-[#f7f7f7]">
          <div className="flex gap-3 items-start">
            <img
              src={selectedRow?.device_image}
              className="h-12 object-contain"
            />

            <div>
              <p className="leading-none text-[18px] text-[#363636] font-bold">
                {selectedRow?.device_category}
              </p>
              <p className="text-[14px] text-[#363636]">
                {selectedRow?.device_serial_no}
              </p>
              <p className="leading-none text-[14px] text-[#8b8b8b]">
                {selectedRow?.device_brand}
              </p>
            </div>

            <span className="text-[12px] border-2 border-[#363636] rounded-full px-2 py-1 leading-none">
              {selectedRow?.device_category}
            </span>
          </div>

          <button
            onClick={() => {
              viewRef.current.close();
              setEditing(false);
              setEditAddAssignee(false);
            }}
            className="absolute right-2 top-2 btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>

          {!viewHistory && (
            <button
              onClick={() => setViewHistory(true)}
              className="text-[14px] text-[#36454F] flex items-center gap-1 mt-5"
            >
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 4V7.75H11.75V6.25H9.5V4H8Z" fill="#36454F" />
                <path
                  d="M14.969 4.37248C14.6307 3.57001 14.1396 2.84099 13.523 2.22598C12.5897 1.29265 11.4033 0.653304 10.1105 0.386977C9.2132 0.204341 8.2883 0.204341 7.391 0.386977C6.097 0.651603 4.90961 1.29147 3.977 2.22673C3.36192 2.84239 2.871 3.57062 2.531 4.37173C2.17933 5.20319 1.99874 6.09696 2 6.99973L2.00075 7.01848H0.5L2.75 9.99973L5 7.01848H3.50075L3.5 6.99973C3.49784 5.95376 3.8101 4.93128 4.39625 4.06498C4.77434 3.50599 5.25571 3.02436 5.8145 2.64598C6.38296 2.26303 7.02059 1.99453 7.69175 1.85548C9.05565 1.57505 10.4751 1.8477 11.638 2.61348C12.801 3.37926 13.6122 4.5755 13.8935 5.93923C14.035 6.63814 14.035 7.35831 13.8935 8.05723C13.7563 8.72896 13.4876 9.36693 13.103 9.93448C12.9155 10.2127 12.7003 10.4745 12.4625 10.7115C11.9834 11.19 11.4169 11.5722 10.7938 11.8372C10.4764 11.9714 10.1465 12.0739 9.809 12.1432C9.11033 12.2846 8.39042 12.2846 7.69175 12.1432C7.02072 12.0057 6.38335 11.7373 5.816 11.3535C5.53696 11.1649 5.27654 10.9502 5.03825 10.7122L3.97775 11.7727C4.60409 12.3999 5.34802 12.8974 6.16692 13.2366C6.98582 13.5759 7.86361 13.7502 8.75 13.7497C9.65229 13.7494 10.5454 13.5691 11.3773 13.2195C12.583 12.7094 13.6145 11.8599 14.3465 10.7745C15.0998 9.6599 15.5017 8.34502 15.5 6.99973C15.5019 6.09714 15.3213 5.20349 14.969 4.37248Z"
                  fill="#36454F"
                />
              </svg>

              <span className="underline font-medium">
                View Accountability History
              </span>
            </button>
          )}

          {viewHistory ? (
            <div className="p-5 bg-white border border-[#e4e4e4] mt-3">
              <div className="flex flex-row justify-start items-center gap-2">
                <span className="text-[18px] font-medium text-[#363636]">
                  Accountability History
                </span>
              </div>

              <div className="overflow-x-auto mt-5">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Assigned To</th>
                      <th>Date Assigned</th>
                      <th>Date Surrendered</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="leading-none text-[#363636] px-2 py-1 rounded-full border-2 border-[#363636]">
                          Assigned
                        </span>
                      </td>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Blue</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-5 bg-white border border-[#e4e4e4] mt-3">
              <div className="flex justify-between items-center">
                <div className="flex flex-row justify-start items-center gap-2">
                  <span className="text-[18px] font-medium text-[#363636]">
                    Equipment Details
                  </span>

                  <div>
                    <select
                      className="outline-none text-[#363636] text-[12px] border border-[#363636] rounded-full"
                      disabled
                    >
                      <option>{selectedRow?.device_name}</option>
                    </select>
                    <span className="text-[12px] text-red-500 ml-1">*</span>
                  </div>
                </div>

                {editing ? (
                  <button
                    onClick={() => setEditing(false)}
                    className={`transition-all ease-in-out duration-300 h-12 min-w-12 rounded-full bg-[#363636] flex justify-center items-center px-3 group/save shadow-xl`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-white"
                    >
                      <path d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z"></path>
                    </svg>

                    <span className="select-none transition-all ease-in-out duration-300 text-[14px] text-white overflow-hidden w-0 group-hover/save:w-10">
                      Save
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className={`transition-all ease-in-out duration-300 h-12 min-w-12 rounded-full bg-[#363636] flex justify-center items-center px-3 group/save shadow-xl`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-white"
                    >
                      <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                      <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
                    </svg>

                    <span className="select-none transition-all ease-in-out duration-300 text-[14px] text-white overflow-hidden w-0 group-hover/save:w-10">
                      Edit
                    </span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-4 gap-3 mt-5">
                <div>
                  <label className="text-[12px] text-[#363636] font-medium">
                    Equipment Name <span className="text-red-500">*</span>
                  </label>

                  <br />

                  <input
                    type="text"
                    className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                    value={selectedRow?.device_category}
                    disabled={!editing}
                  />
                </div>

                <div>
                  <label className="text-[12px] text-[#363636] font-medium">
                    Brand <span className="text-red-500">*</span>
                  </label>

                  <br />

                  <input
                    type="text"
                    className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                    value={selectedRow?.device_brand}
                    disabled={!editing}
                  />
                </div>

                <div>
                  <label className="text-[12px] text-[#363636] font-medium">
                    Model
                  </label>

                  <br />

                  <input
                    type="text"
                    className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                    value={selectedRow?.device_model}
                    disabled={!editing}
                  />
                </div>

                <div>
                  <label className="text-[12px] text-[#363636] font-medium">
                    Serial Number
                  </label>

                  <br />

                  <input
                    type="text"
                    className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                    value={selectedRow?.device_serial_no}
                    disabled={!editing}
                  />
                </div>

                <div>
                  <label className="text-[12px] text-[#363636] font-medium">
                    Tag
                  </label>

                  <br />

                  <input
                    type="text"
                    className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                    value={selectedRow?.device_tag}
                    disabled={!editing}
                  />
                </div>

                <div className="col-span-3">
                  <label className="text-[12px] text-[#363636] font-medium">
                    Description
                  </label>

                  <br />

                  <input
                    type="text"
                    className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                    value={selectedRow?.device_description}
                    disabled={!editing}
                  />
                </div>
              </div>

              <p className="text-[18px] font-medium text-[#363636] mt-8">
                Accountability Details
              </p>

              <div className="w-full mt-5 flex flex-row justify-center gap-2">
                <div className="flex-1">
                  <div className="flex flex-row gap-2">
                    <div className="flex-1">
                      <label className="text-[12px] text-[#363636] font-medium">
                        Assigned To <span className="text-red-500">*</span>
                      </label>

                      <br />

                      <input
                        type="text"
                        className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                        disabled={!editing}
                        value={selectedRow?.emp_name}
                      />
                    </div>

                    <div className="flex-1">
                      <label className="text-[12px] text-[#363636] font-medium">
                        Date Assigned <span className="text-red-500">*</span>
                      </label>

                      <br />

                      <input
                        type="date"
                        className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                        disabled={!editing}
                        value={selectedRow?.date_assigned}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-[12px] text-[#363636]">
                      Contact number: <span>{selectedRow?.contact_number}</span>
                    </p>
                    <p className="text-[12px] text-[#363636]">
                      Department: <span>{selectedRow?.department}</span>
                    </p>
                    <p className="text-[12px] text-[#363636]">
                      Position: <span>{selectedRow?.position}</span>
                    </p>
                  </div>
                </div>

                <div className="border-r border-[#e4e4e4]" />

                <div className="flex-1 flex justify-center items-center">
                  {editAddAssignee ? (
                    <div>
                      <div className="flex flex-row gap-2">
                        <div className="flex-1">
                          <label className="text-[12px] text-[#363636] font-medium">
                            Assigned To <span className="text-red-500">*</span>
                          </label>

                          <br />

                          <input
                            type="text"
                            className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="text-[12px] text-[#363636] font-medium">
                            Assigned Date{" "}
                            <span className="text-red-500">*</span>
                          </label>

                          <br />

                          <input
                            type="date"
                            className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                          />
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="text-[12px] text-[#363636]">
                          Contact number: <span>--</span>
                        </p>
                        <p className="text-[12px] text-[#363636]">
                          Department: <span>--</span>
                        </p>
                        <p className="text-[12px] text-[#363636]">
                          Position: <span>--</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditAddAssignee(true)}
                      className="outline-none border border-[#363636] text-[14px] text-[#363636] px-4 py-2 rounded-[15px]"
                    >
                      Add Another Assignee
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};

export default DeviceManagement;
