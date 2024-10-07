import DataTable from "react-data-table-component";
import Headings from "../../../components/universal/Headings";
import { useRef, useState } from "react";

const DeviceManagement = () => {
  const addNewRef = useRef(null);
  const viewRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [viewHistory, setViewHistory] = useState(false);
  const [addAssignee, setAddAssignee] = useState(false);
  const [editAddAssignee, setEditAddAssignee] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    {
      name: "Equipment",
      selector: (row) => (
        <div className="flex flex-row justifystart items-center gap-2 py-3">
          <img
            src={`../../../../images/macbook_air.png`}
            className="h-10 object-contain"
          />

          <div>
            <p className="text-[14px] text-[#363636]">{row.equipment}</p>
            <p className="text-[12px] text-[#8b8b8b]">{row.brand}</p>
          </div>
        </div>
      ),
    },

    {
      name: "Model",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.model}</p>
      ),
    },

    {
      name: "Serial No.",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.serial_number}</p>
      ),
    },

    {
      name: "Tag",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.tag}</p>
      ),
      width: "80px",
    },

    {
      name: "Description",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.description}</p>
      ),
    },

    {
      name: "Status",
      selector: (row) => <p>{row.status}</p>,
      width: "90px",
    },

    {
      name: "Assigned To",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.emp_name}</p>
      ),
    },
  ];

  const data = [
    {
      equipment: "Macbook Air",
      brand: "Apple",
      model: "Apple M1 2020",
      serial_number: "FVFFL97UQ6LC",
      tag: "M1-016",
      description: "Rose Gold, 13.3 in",
      status: "Assigned",
      emp_name: "Juniper Williams",
      date_assigned: "2024-06-03",
      contact_number: "09543612315",
      department: "Engineering",
      position: "Software Engineer",
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
                  20
                </p>
                <p className="text-[12px] text-[#858585] text-center leading-nione">
                  Assigned
                </p>
              </div>

              <div className="h-10 border-r border-[#e4e4e4]" />

              <div>
                <p className="text-[32px] font-bold text-[#363636] text-center leading-none">
                  20
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
              <button className="text-[14px] underline text-[#8C8F70]">{`All (448)`}</button>
              <button className="text-[14px] underline text-[#8C8F70]">{`Macbooks (20)`}</button>
              <button className="text-[14px] underline text-[#8C8F70]">{`Mac minis (35)`}</button>
              <button className="text-[14px] underline text-[#8C8F70]">{`Monitors (21)`}</button>
              <button className="text-[14px] underline text-[#8C8F70]">{`Mouses (45)`}</button>
              <button className="text-[14px] underline text-[#8C8F70]">{`HDMI cables (12)`}</button>
              <button className="text-[14px] underline text-[#8C8F70]">{`Macbook chargers (12)`}</button>
              <button className="text-[14px] underline text-[#8C8F70]">{`Keyboards (12)`}</button>
              <button className="text-[14px] underline text-[#8C8F70]">{`Headphones (12)`}</button>
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
            </div>
          </div>

          <DataTable
            columns={columns}
            data={data}
            pagination
            onRowClicked={(row) => {
              setSelectedRow(row);
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
                <select className="outline-none text-[#363636] text-[12px] border border-[#363636] rounded-full">
                  <option>Category</option>
                </select>
                <span className="text-[12px] text-red-500 ml-1">*</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-5">
              <div>
                <label className="text-[12px] text-[#363636] font-medium">
                  Equipment Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636] font-medium">
                  Brand <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636] font-medium">
                  Model
                </label>

                <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636] font-medium">
                  Serial Number
                </label>

                <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636] font-medium">
                  Tag
                </label>

                <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
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

                    <input
                      type="text"
                      className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="text-[12px] text-[#363636] font-medium">
                      Assigned To <span className="text-red-500">*</span>
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

                        <input
                          type="text"
                          className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2"
                        />
                      </div>

                      <div className="flex-1">
                        <label className="text-[12px] text-[#363636] font-medium">
                          Assigned To <span className="text-red-500">*</span>
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
            <button className="bg-[#666A40] text-white text-[14px] px-5 py-2 rounded-[8px]">
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
        <div className="modal-box w-10/12 max-w-3xl bg-[#f7f7f7]">
          <div className="flex gap-3 items-start">
            <img
              src={`../../../../images/macbook_air.png`}
              className="h-12 object-contain"
            />

            <div>
              <p className="leading-none text-[18px] text-[#363636] font-bold">
                {selectedRow?.equipment}
              </p>
              <p className="text-[14px] text-[#363636]">
                {selectedRow?.serial_number}
              </p>
              <p className="leading-none text-[14px] text-[#8b8b8b]">
                {selectedRow?.brand}
              </p>
            </div>

            <span className="text-[12px] border-2 border-[#363636] rounded-full px-2 py-1 leading-none">
              {selectedRow?.status}
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
                        <span className="leading-none text-[#363636] px-2 py-1 rounded-full border-2 border-[#363636]">Assigned</span>
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
                    <select className="outline-none text-[#363636] text-[12px] border border-[#363636] rounded-full">
                      <option>Category</option>
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
                    value={selectedRow?.equipment}
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
                    value={selectedRow?.brand}
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
                    value={selectedRow?.model}
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
                    value={selectedRow?.serial_number}
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
                    value={selectedRow?.tag}
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
                    value={selectedRow?.description}
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
                            Assigned To <span className="text-red-500">*</span>
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
