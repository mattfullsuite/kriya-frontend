import { useRef, useState } from "react";
import DataTable from "react-data-table-component";

const ManageDevices = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  lightColor,
  focusBorder,
}) => {
  const addModal = useRef(null);

  const [image, setImage] = useState("");

  const columns = [
    {
      name: "",
      selector: (row) => (
        <img src={row.device_image} className="h-20 w-20 object-contain" />
      ),
      width: "10rem",
    },

    {
      name: "Type",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.type}</p>
      ),
      width: "120px",
    },

    {
      name: "Image Link",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.link}</p>
      ),
    },
  ];

  const data = [
    {
      device_image:
        "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111883_macbookair.png",
      type: "Laptop",
      link: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111883_macbookair.png",
    },
  ];

  return (
    <>
      <div className="max-w-[1300px] m-auto p-5">
        <p className="text-[20px] font-bold text-[#363636]">
          Device Management
        </p>

        <div className="mt-10">
          <div className={`${lightColor} p-3 rounded-t-[15px] flex gap-2`}>
            <input
              type="text"
              className="flex-1 outline-none border border-[#e4e4e4] rounded-[8px] px-3 text-[14px] text-[#363636]"
              placeholder="Search"
            />

            <select className="outline-none border border-[#e4e4e4] text-[#363636] text-[14px] rounded-[8px] px-3">
              <option>Filter</option>
            </select>

            <button
              onClick={() => addModal.current.showModal()}
              className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} text-white rounded-[8px] text-[14px] px-3 py-2`}
            >
              Add New Device Type
            </button>
          </div>
          <div className="rounded-b-[15px] border border-[#e4e4e4]">
            <DataTable
              columns={columns}
              data={data}
              highlightOnHover
              pagination
            />
          </div>
        </div>
      </div>

      <dialog className="modal" ref={addModal}>
        <div className="modal-box w-10/12 max-w-xl">
          <span className="text-[18px] text-[#363636] font-bold">
            Add New Device Type
          </span>
          <button
            onClick={() => addModal.current.close()}
            className="outline-none absolute right-2 top-2 btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>

          <div className="mt-10">
            <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
              New Device Type
            </label>
            <input
              type="text"
              className={`outline-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full px-3 py-2 text-[14px] text-[#363636]`}
              placeholder="Device Type"
            />

            <div className="mt-10 flex gap-5">
              <div className="flex-1">
                <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
                  Image Link
                </label>

                <textarea
                  onChange={(e) => setImage(e.target.value)}
                  className={`outline-none resize-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full h-24 px-3 py-2 text-[14px] text-[#363636]`}
                />
              </div>

              <div className="flex-1">
                <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
                  Image Preview
                </label>

                {image ? (
                  <img
                    src={image}
                    className="h-24 object-contain border border-[#e4e4e4] w-full rounded-[8px] overflow-hidden"
                  />
                ) : (
                  <div className="h-24 object-contain border border-[#e4e4e4] w-full rounded-[8px] overflow-hidden flex flex-col justify-center items-center">
                    <span className="text-xs text-[#8b8b8b]">Image will be displayed here.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-3">
              <button
                onClick={() => addModal.current.close()}
                className="transition ease-in-out outline-none text-[14px] text-[#363636] bg-[#e4e4e4] hover:bg-[#cccccc] rounded-[8px] px-3 py-2"
              >
                Cancel
              </button>

              <button
                className={`transition ease-in-out outline-none text-[14px] text-white rounded-[8px] px-3 py-2 ${bgColor} ${hoverColor}`}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ManageDevices;
