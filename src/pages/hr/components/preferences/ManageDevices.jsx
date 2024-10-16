import { useRef } from "react";
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
            <DataTable columns={columns} data={data} highlightOnHover pagination />
          </div>
        </div>
      </div>

      <dialog className="modal" ref={addModal}>
      </dialog>
    </>
  );
};

export default ManageDevices;
