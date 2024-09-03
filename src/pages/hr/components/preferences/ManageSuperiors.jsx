import DataTable from "react-data-table-component";
import Headings from "../../../../components/universal/Headings";
import { useRef } from "react";

const ManageSuperiors = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  lightColor,
  focusBorder,
}) => {
  const addingSuperiorRef = useRef(null);
  const editingSuperiorRef = useRef(null);

  const columns = [
    {
      name: "Employee Number",
      selector: (row) => (
        <span className="text-[12px] text-[#363636] font-medium">
          {row.emp_id}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Employee Name",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">
          {row.f_name + " " + row.s_name}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Employee's Department",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">{row.dept}</span>
      ),
      sortable: true,
    },

    {
      name: "Assigned Superior",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">
          {row.superior_fname + " " + row.superior_sname}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            onClick={() => editingSuperiorRef.current.showModal()}
            className="outline-none border border-[#90946F] text-[#90946F] text-[12px] px-3 py-2 rounded-[8px]"
          >
            Edit
          </button>
        </>
      ),
      width: "90px",
    },
  ];

  const data = [
    {
      emp_id: "19-UR-0265",
      f_name: "Marvin",
      s_name: "Bautista",
      dept: "Engineering",
      superior_fname: "Matt Wilfred",
      superior_sname: "Salvador",
    },
  ];

  return (
    <>
      <div className="p-5 grid">
        <p className="text-[20px] font-bold text-[#363636]">
          Employee Superior List
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
              onClick={() => addingSuperiorRef.current.showModal()}
              className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} text-white rounded-[8px] text-[14px] px-3 py-2`}
            >
              Assign a Superior
            </button>
          </div>
          <div className="bg-white border border-[#e4e4e4] rounded-b-[15px] overflow-hidden">
            <DataTable
              columns={columns}
              data={data}
              pagination
              highlightOnHover
            />
          </div>
        </div>
      </div>

      {/* modal for adding a superior */}
      <dialog className="modal" ref={addingSuperiorRef}>
        <div className="bg-white w-[550px] p-5 rounded-[15px]">
          <p className="text-[20px] text-[#363636] font-medium">
            Assign a Superior
          </p>

          <div className="mt-10">
            <div>
              <label className="text-[12px] text-[#363636] font-medium">
                Employee Name
              </label>
              <select
                className={`transition-all ease-in-out w-full border border-[#e4e4e4] outline-none text-[14px] text-[#363636] px-3 py-2 rounded-[8px] ${focusBorder}`}
              >
                <option>Type in or select the employee’s name</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="text-[12px] text-[#363636] font-medium">
                Superior to be Assigned
              </label>

              <select
                className={`transition-all ease-in-out w-full border border-[#e4e4e4] outline-none text-[14px] text-[#363636] px-3 py-2 rounded-[8px] ${focusBorder}`}
              >
                <option>Type in or select the superior to be assigned</option>
              </select>
            </div>

            <div className="mt-16 flex flex-row justify-end gap-3">
              <button
                onClick={() => addingSuperiorRef.current.close()}
                className={`outline-none px-8 py-2 transition-all ease-in-out text-[#363636] bg-[#e7e7e7] hover:bg-[#dadada] text-[14px] rounded-[8px]`}
              >
                Cancel
              </button>

              <button
                className={`${bgColor} ${hoverColor} px-8 py-2 transition-all ease-in-out rounded-[8px] text-[14px] text-white`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/* modal for editing a superior */}
      <dialog className="modal" ref={editingSuperiorRef}>
        <div className="bg-white w-[550px] p-5 rounded-[15px]">
          <p className="text-[20px] text-[#363636] font-medium">
            Edit Superior
          </p>

          <div className="mt-10">
            <div>
              <label className="text-[12px] text-[#363636] font-medium">
                Employee Name
              </label>
              <input
                className={`transition-all ease-in-out w-full border border-[#e4e4e4] outline-none text-[14px] text-[#363636] px-3 py-2 rounded-[8px] ${focusBorder}`}
                disabled={true}
                value={"Marvin Bautista"}
              />
            </div>

            <div className="mt-5">
              <label className="text-[12px] text-[#363636] font-medium">
                Superior to be Assigned
              </label>

              <select
                className={`transition-all ease-in-out w-full border border-[#e4e4e4] outline-none text-[14px] text-[#363636] px-3 py-2 rounded-[8px] ${focusBorder}`}
              >
                <option>Type in or select the superior to be assigned</option>
              </select>
            </div>

            <div className="mt-16 flex flex-row justify-end gap-3">
              <button
                onClick={() => editingSuperiorRef.current.close()}
                className={`outline-none px-8 py-2 transition-all ease-in-out text-[#363636] bg-[#e7e7e7] hover:bg-[#dadada] text-[14px] rounded-[8px]`}
              >
                Cancel
              </button>

              <button
                className={`${bgColor} ${hoverColor} px-8 py-2 transition-all ease-in-out rounded-[8px] text-[14px] text-white`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ManageSuperiors;
