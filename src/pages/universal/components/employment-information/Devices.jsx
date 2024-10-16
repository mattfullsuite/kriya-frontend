import DataTable from "react-data-table-component";
import { useContext, useState, useEffect, useRef } from "react";
import Axios from "axios";
import moment from "moment"

const Devices = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const viewRef = useRef(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [myDevices, setMyDevices] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user_devices_res = await Axios.get(BASE_URL + "/dm-getMyDevices");
        setMyDevices(user_devices_res.data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

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
  ];

  return (
    <>
      <div className="bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
        <DataTable
          columns={columns}
          data={myDevices}
          onRowClicked={(row) => {
            setSelectedRow(row);
            viewRef.current.showModal();
          }}
          highlightOnHover
          pagination
        />
      </div>

      <dialog ref={viewRef} className="modal">
        <div className="modal-box w-10/12 max-w-3xl bg-[#f7f7f7]">
          <div className="flex gap-3 items-start">
            {/* <img
              src={`../../../../images/macbook_air.png`}
              className="h-12 object-contain"
            /> */}

            <img src={selectedRow?.device_image} className="h-12 object-contain" />

            <div>
              <p className="leading-none text-[18px] text-[#363636] font-bold">
                {selectedRow?.device_category}
              </p>
              <p className="text-[12px] text-[#363636]">
                {/* {selectedRow?.device_serial_no} */}
                {"Date Assigned: " + moment(selectedRow?.assigned_date).format("MMMM D YYYY")}
              </p>
              <p className="leading-none text-[12px] text-[#8b8b8b]">
                {/* {selectedRow?.device_brand} */}
                {(selectedRow?.returned_date) ? "Date Returned: " + moment(selectedRow?.returned_date).format("MMMM D YYYY") :"Date Returned:   ----" }
              </p>
            </div>

            {/* <span className="text-[12px] border-2 border-[#363636] rounded-full px-2 py-1 leading-none">
              {selectedRow?.device_category}
            </span> */}
          </div>

          <button
            onClick={() => {
              viewRef.current.close();
            }}
            className="absolute right-2 top-2 btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>

          <div className="p-5 bg-white border border-[#e4e4e4] mt-3">
            <div className="flex flex-row justify-start items-center gap-2">
              <span className="text-[18px] font-medium text-[#363636]">
                Equipment Details
              </span>

              {/* <div>
                <select className="outline-none text-[#363636] text-[12px] border border-[#363636] rounded-full" disabled={true}>
                  <option>Category</option>
                </select>
                <span className="text-[12px] text-red-500 ml-1">*</span>
              </div> */}
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Devices;
