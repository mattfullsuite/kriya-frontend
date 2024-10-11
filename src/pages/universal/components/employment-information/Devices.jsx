import { useRef, useState } from "react";
import DataTable from "react-data-table-component";

const Devices = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const viewRef = useRef(null);

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
      <div className="bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
        <DataTable
          columns={columns}
          data={data}
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

              <div>
                <select className="outline-none text-[#363636] text-[12px] border border-[#363636] rounded-full" disabled={true}>
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

                <br />

                <input
                  type="text"
                  className="outline-none border border-[#e4e4e4] rounded-[8px] text-[14px] px-3 py-2 w-full"
                  value={selectedRow?.equipment}
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
                  value={selectedRow?.brand}
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
                  value={selectedRow?.model}
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
                  value={selectedRow?.serial_number}
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
                  value={selectedRow?.tag}
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
                  value={selectedRow?.description}
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
