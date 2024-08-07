import { useRef } from "react";

const PlainListTile = ({
  label,
  method,
  selected,
  designation,
  bgColor,
  hoverColor,
  focusBorder,
}) => {
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);

  return (
    <>
      <div
        className={`group/list ${
          selected ? `bg-[#EAECDB]` : `bg-[#F4F4F4]`
        } flex flex-row flex-nowrap justify-between items-center p-3 rounded-[15px]`}
      >
        <p className="text-[14px] text-[#363636] line-clamp-1 text-ellipsis select-none">
          {label}
        </p>

        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            className="invisible group-hover/list:visible btn btn-circle btn-xs btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-[#363636]"
            >
              <path
                fillRule="evenodd"
                d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li onClick={() => editModalRef.current.showModal()}>
              <a>Edit</a>
            </li>

            <li onClick={() => deleteModalRef.current.showModal()}>
              <a>Delete</a>
            </li>
          </ul>
        </div>
      </div>

      <dialog className="rounded-[15px]" ref={editModalRef}>
        <div className="bg-white p-5 w-[400px]">
          <p className="text-[18px] font-medium text-[#363636]">{`Edit ${
            designation === `div`
              ? `Division`
              : designation === `dept`
              ? `Department`
              : designation === `pos`
              ? `Position`
              : null
          }`}</p>

          <input
            value={label}
            className={`mt-5 outline-none transition-all ease-in-out border border-[#e4e4e4] ${focusBorder} w-full rounded-[8px] px-3 py-2 text-[14px]`}
          />

          <div className="mt-16 flex flex-row justify-end gap-3">
            <button
              onClick={() => editModalRef.current.close()}
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
      </dialog>

      <dialog className="rounded-[15px]" ref={deleteModalRef}>
        <div className="bg-white p-5 w-[400px]">
          <p className="text-[18px] font-medium text-[#363636]">{`Delete ${
            designation === `div`
              ? `Division`
              : designation === `dept`
              ? `Department`
              : designation === `pos`
              ? `Position`
              : null
          }`}?</p>

          <p className="mt-5 text-[14px] text-[#363636]">Are you sure you want to delete <span className="italic underline">{label}</span>?</p>

          <div className="mt-16 flex flex-row justify-end gap-3">
            <button
              onClick={() => deleteModalRef.current.close()}
              className={`outline-none px-8 py-2 transition-all ease-in-out text-[#363636] bg-[#e7e7e7] hover:bg-[#dadada] text-[14px] rounded-[8px]`}
            >
              Cancel
            </button>

            <button
              className={`${bgColor} ${hoverColor} px-8 py-2 transition-all ease-in-out rounded-[8px] text-[14px] text-white`}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

const DashboardSubheadings = ({ title }) => {
  return (
    <h1 className="text-[16px] text-[#363636 dark:text-[#e7e7e7] font-bold">
      {title}
    </h1>
  );
};

const ManageDesignation = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  lightColor,
  focusBorder,
}) => {
  const addDivisionRef = useRef(null);
  const addDepartmentRef = useRef(null);
  const addPositionRef = useRef(null);

  return (
    <>
      <div className="max-w-[1300px] m-auto p-5">
        <p className="text-[20px] font-bold text-[#363636]">Designation</p>

        <div className="box-border mt-10 flex flex-row justify-between w-[100%] gap-5">
          <div className="flex-1 flex flex-row justify-between bg-white border border-[#E4E4E4] box-border rounded-[15px] overflow-hidden">
            <div className="box-border flex-1 shadow-lg">
              <div className="box-border flex flex-row justify-between items-center p-5">
                <DashboardSubheadings title={"Divisions"} />

                <button
                  onClick={() => addDivisionRef.current.showModal()}
                  className={`transition-all ease-in-out ${bgColor} ${hoverColor} outline-none focus:outline-none border-none w-6 h-6 rounded-full flex justify-center items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 fill-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <input
                type="text"
                placeholder="Search divisions..."
                className="px-5 py-2 outline-none bg-transparent text-[#363636] w-full text-[12px]"
              />

              <div className="box-border overflow-auto flex flex-col gap-2 h-[550px] p-5">
                <PlainListTile
                  focusBorder={focusBorder}
                  bgColor={bgColor}
                  hoverColor={hoverColor}
                  disabledColor={disabledColor}
                  label={"Venture Capital"}
                  selected={true}
                  designation={"div"}
                />
                <PlainListTile
                  focusBorder={focusBorder}
                  bgColor={bgColor}
                  hoverColor={hoverColor}
                  disabledColor={disabledColor}
                  label={"Executive"}
                  designation={"pos"}
                />
                <PlainListTile
                  focusBorder={focusBorder}
                  bgColor={bgColor}
                  hoverColor={hoverColor}
                  disabledColor={disabledColor}
                  label={"Culture & People"}
                  designation={"div"}
                />
              </div>
            </div>

            <div className="box-border flex-1 shadow-lg">
              <div className="box-border flex flex-row justify-between items-center p-5">
                <DashboardSubheadings title={"Departments"} />

                <button
                  onClick={() => addDepartmentRef.current.showModal()}
                  className={`transition-all ease-in-out ${bgColor} ${hoverColor} outline-none focus:outline-none border-none w-6 h-6 rounded-full flex justify-center items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 fill-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <input
                type="text"
                placeholder="Search department..."
                className="px-5 py-2 outline-none bg-transparent text-[#363636] w-full text-[12px]"
              />

              <div className="box-border overflow-auto flex flex-col gap-2 h-[550px] p-5">
                <PlainListTile
                  focusBorder={focusBorder}
                  bgColor={bgColor}
                  hoverColor={hoverColor}
                  disabledColor={disabledColor}
                  label={"Information & Security"}
                  designation={"dept"}
                />
                <PlainListTile
                  focusBorder={focusBorder}
                  bgColor={bgColor}
                  hoverColor={hoverColor}
                  disabledColor={disabledColor}
                  label={"Engineering"}
                  selected={true}
                  designation={"dept"}
                />
              </div>
            </div>

            <div className="box-border flex-1">
              <div className="box-border flex flex-row justify-between items-center p-5">
                <DashboardSubheadings title={"Positions"} />

                <button
                  onClick={() => addPositionRef.current.showModal()}
                  className={`transition-all ease-in-out ${bgColor} ${hoverColor} outline-none focus:outline-none border-none w-6 h-6 rounded-full flex justify-center items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 fill-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <input
                type="text"
                placeholder="Search positions..."
                className="px-5 py-2 outline-none bg-transparent text-[#363636] w-full text-[12px]"
              />

              <div className="box-border overflow-auto flex flex-col gap-2 h-[550px] p-5">
                <PlainListTile
                  focusBorder={focusBorder}
                  bgColor={bgColor}
                  hoverColor={hoverColor}
                  disabledColor={disabledColor}
                  label={"Software Engineer"}
                  designation={"pos"}
                />
                <PlainListTile
                  focusBorder={focusBorder}
                  bgColor={bgColor}
                  hoverColor={hoverColor}
                  disabledColor={disabledColor}
                  label={"Business Software Engineer"}
                  designation={"pos"}
                />
                <PlainListTile label={"Web Developer"} designation={"pos"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* adding division modal */}
      <dialog className="modal" ref={addDivisionRef}>
        <div className="bg-white p-5 rounded-[15px] w-[400px]">
          <p className="text-[18px] font-medium text-[#363636] mb-5">
            Add Division
          </p>

          <input
            type="text"
            className={`outline-none transition-all ease-in-out border border-[#e4e4e4] text-[#363636] ${focusBorder}  w-full text-[14px] px-3 py-2 rounded-[8px]`}
            placeholder="Type here..."
          />

          <div className="flex flex-row gap-2 justify-end items-center mt-10">
            <button
              onClick={() => {
                addDivisionRef.current.close();
              }}
              className={`outline-none px-8 py-2 transition-all ease-in-out text-[#363636] bg-[#e7e7e7] hover:bg-[#dadada] text-[14px] rounded-[8px]`}
            >
              Cancel
            </button>

            <button
              className={`outline-none px-8 py-2 transition-all ease-in-out ${bgColor} ${hoverColor} text-white text-[14px] rounded-[8px]`}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>

      {/* adding department modal */}
      <dialog className="modal" ref={addDepartmentRef}>
        <div className="bg-white p-5 rounded-[15px] w-[400px]">
          <p className="text-[18px] font-medium text-[#363636] mb-5">
            Add Department
          </p>

          <p className="text-[14px] text-[#363636]">
            This department will be under{" "}
            <span className="underline italic">Venture Capital</span> division.
          </p>

          <input
            type="text"
            className={`outline-none transition-all ease-in-out border border-[#e4e4e4] text-[#363636] ${focusBorder} w-full text-[14px] px-3 py-2 rounded-[8px] mt-3`}
            placeholder="Type here..."
          />

          <div className="flex flex-row gap-2 justify-end items-center mt-10">
            <button
              onClick={() => {
                addDepartmentRef.current.close();
              }}
              className={`outline-none px-8 py-2 transition-all ease-in-out text-[#363636] bg-[#e7e7e7] hover:bg-[#dadada] text-[14px] rounded-[8px]`}
            >
              Cancel
            </button>

            <button
              className={`outline-none px-8 py-2 transition-all ease-in-out ${bgColor} ${hoverColor} text-white text-[14px] rounded-[8px]`}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>

      {/* adding position modal */}
      <dialog className="modal" ref={addPositionRef}>
        <div className="bg-white p-5 rounded-[15px] w-[400px]">
          <p className="text-[18px] font-medium text-[#363636] mb-5">
            Add Position
          </p>

          <p className="text-[14px] text-[#363636]">
            This position will be under{" "}
            <span className="underline italic">Engineering</span> department.
          </p>

          <input
            type="text"
            className={`outline-none transition-all ease-in-out border border-[#e4e4e4] text-[#363636] ${focusBorder} w-full text-[14px] px-3 py-2 rounded-[8px] mt-3`}
            placeholder="Type here..."
          />

          <div className="flex flex-row gap-2 justify-end items-center mt-10">
            <button
              onClick={() => {
                addPositionRef.current.close();
              }}
              className={`outline-none px-8 py-2 transition-all ease-in-out text-[#363636] bg-[#e7e7e7] hover:bg-[#dadada] text-[14px] rounded-[8px]`}
            >
              Cancel
            </button>

            <button
              className={`outline-none px-8 py-2 transition-all ease-in-out ${bgColor} ${hoverColor} text-white text-[14px] rounded-[8px]`}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ManageDesignation;
