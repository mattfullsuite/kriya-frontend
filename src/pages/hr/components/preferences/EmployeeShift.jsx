import DataTable from "react-data-table-component";
import Subheadings from "../../../../components/universal/Subheadings";
import { useRef } from "react";

const EmployeeShift = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  lightColor,
  focusBorder,
}) => {
  const assignModal = useRef(null);

  const columns = [
    {
      name: "Employee No.",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">{row.emp_num}</span>
      ),
    },
    {
      name: "Employee Name",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">{row.emp_name}</span>
      ),
    },
    {
      name: "Shift Type",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">{row.shift_type}</span>
      ),
    },
    {
      name: "Start Shift",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">{row.start_shift}</span>
      ),
    },
    {
      name: "End Shift",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">{row.end_shift}</span>
      ),
    },
  ];

  const data = [
    {
      emp_num: "OCCI-0276",
      emp_name: "Marvin Bautista",
      shift_type: "Day Shift",
      start_shift: "07:00 AM",
      end_shift: "04:00 PM",
    },
  ];

  return (
    <>
      <div className="max-w-[1300px] m-auto p-5">
        <p className="text-[20px] font-bold text-[#363636]">Employee Shift</p>

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
              onClick={() => assignModal.current.showModal()}
              className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} text-white rounded-[8px] text-[14px] px-3 py-2`}
            >
              Assign Shift
            </button>
          </div>
          <div className="bg-white border border-[#e4e4e4] p-5 rounded-b-[15px]">
            <DataTable
              columns={columns}
              data={data}
              highlightOnHover
              pagination
            />
          </div>
        </div>
      </div>

      {/* assigning shift modal */}

      <dialog className="modal" ref={assignModal}>
        <div className="modal-box w-10/12 max-w-xl">
          <span className="text-[18px] text-[#363636] font-bold">
            Assign Shift
          </span>
          <button
            onClick={() => assignModal.current.close()}
            className="outline-none absolute right-2 top-2 btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>

          <div className="mt-10">
            <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
              Employee Name
            </label>
            <select
              className={`outline-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full px-3 py-2 text-[14px] text-[#363636]`}
            >
              <option>Select an employee</option>
            </select>

            <div className="mt-10 flex gap-5">
              <div className="flex-1">
                <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
                  Start Shift
                </label>

                <input
                  type="time"
                  className={`outline-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full px-3 py-2 text-[14px] text-[#363636]`}
                />
              </div>

              <div className="flex-1">
                <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
                  End Shift
                </label>

                <input
                  type="time"
                  className={`outline-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full px-3 py-2 text-[14px] text-[#363636]`}
                />
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-3">
                <button onClick={() => assignModal.current.close()} className="transition ease-in-out outline-none text-[14px] text-[#363636] bg-[#e4e4e4] hover:bg-[#cccccc] rounded-[8px] px-3 py-2">Cancel</button>

                <button className={`transition ease-in-out outline-none text-[14px] text-white rounded-[8px] px-3 py-2 ${bgColor} ${hoverColor}`}>Assign</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EmployeeShift;
