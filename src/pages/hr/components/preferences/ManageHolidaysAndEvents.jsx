import Calendar from "react-calendar";
import DataTable from "react-data-table-component";
import "./Calendar.css";
import moment from "moment";
import { useRef, useState, useEffect } from "react";
import axios from "axios"

const ManageHolidaysAndEvents = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  lightColor,
  focusBorder,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [holiday, setHoliday] = useState([]);
  const [newHoliday, setNewHoliday] = useState({
    h_date: "",
    h_name: "",
  });

  const addHolidayRef = useRef(null);

  const dateInputRef = useRef(null);
  const holidayInputRef = useRef("");
  const deleteModalRef = useRef(null);

  useEffect(() => {
    const fetchAllHolidays = async () => {
      try {
        const res = await axios.get(BASE_URL + "/holidays");

        setHoliday(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllHolidays();
  }, []);

  const handleDelete = async (h_id) => {
    try {
      await axios.delete(BASE_URL + "/holiday/" + h_id);
      
    } catch (err) {
      console.log(err);
    }
  };


  const columns = [
    {
      name: "Date",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">
          {moment(row.h_date).format("MMMM DD, YYYY")}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Holiday",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">{row.h_name}</span>
      ),
      sortable: true,
    },

    {
      name: "Actions",
      selector: () => (
        <>
          <button
            onClick={() => deleteModalRef.current.showModal()}
            className="outline-none transition-all ease-in-out bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-[8px]"
          >
            Delete
          </button>

          <dialog className="modal" ref={deleteModalRef}>
            <div className="bg-white p-5 w-[500px] rounded-[15px]">
              <p className="text-[18px] text-[#363636] font-medium">
                Delete Confirmation
              </p>

              <p className="mt-5 font-medium text-[12px] text-[#363636]">
                Are you sure that you want to delete this holiday?
              </p>

              <p className="mt-5 text-[12px] text-[#363636]">
                You will not be able to see or edit this saved holiday. This
                will remove it from the list.
              </p>

              <div className="mt-16 flex flex-row justify-end gap-3">
                <button
                  onClick={() => {
                    deleteModalRef.current.close();

                  }}
                  className="transition-all ease-in-out border border-slate-500 hover:border-slate-600 px-8 py-2 rounded-[8px] text-[14px] text-slate-500 hover:text-slate-600"
                >
                  Cancel
                </button>

                <button
                  className={`transition-all ease-in-out ${bgColor} ${hoverColor} ${disabledColor} outline-none rounded-[8px] text-[14px] text-white px-8 py-2`}
                  //onClick={() => handleDelete(row.h_id)}
                >
                   Confirm
                </button>
              </div>
            </div>
          </dialog>
        </>
      ),
      width: "150px",
    },
  ];

  return (
    <>
      <div className="m-auto max-w-[1300px] p-5">
        <p className="text-[20px] font-bold text-[#363636]">
          Holidays & Events
        </p>

        <div className="w-full mt-10 rounded-[15px] bg-white border border-[#e4e4e4] overflow-hidden p-5">
          <Calendar
            view="month"
            calendarType="gregory"
            value=""
            // tileClassName={({ date }) => {
            //   const formattedDate = moment(date).format("DD-MM-YYYY");
            //   if (cutOffDates.current) {
            //     if (cutOffDates.current.includes(formattedDate)) {
            //       if (userRole.current == 1) {
            //         return "react-calendar__tile-pay-dates-hr";
            //       } else if (userRole.current == 3) {
            //         return "react-calendar__tile-pay-dates-manager";
            //       } else if (userRole.current == 2) {
            //         return "react-calendar__tile-pay-dates-employee";
            //       }
            //     }
            //   }
            // }}
          />
        </div>

        <div className="bg-white border border-[#e4e4e4] rounded-[15px] p-5 mt-5">
          <p className="text-[16px] text-[#363636] font-medium">
            Holiday and Events Lists
          </p>

          <div className="flex flex-row mt-5 gap-2 max-w-[400px]">
            <input
              className={`flex-1 transition-all ease-in-out outline-none border border-[#e4e4e4] ${focusBorder} rounded-[8px] text-[14px] text-[#363636] px-3 py-2`}
              placeholder="Search"
            />

            <button
              onClick={() => addHolidayRef.current.showModal()}
              className={`transition-all ease-in-out ${bgColor} ${hoverColor} text-[14px] rounded-[8px] outline-none text-white px-3 py-2`}
            >
              Add a Holiday
            </button>
          </div>

          <DataTable columns={columns} data={holiday} />
        </div>
      </div>

      <dialog className="modal" ref={addHolidayRef}>
        <div className="bg-white p-5 rounded-[15px] w-[550px]">
          <p className="text-[20px] text-[#363636] font-medium">
            Add a new Holiday/Event
          </p>

          <p className="text-[12px] text-[#363636]">
            Added holidays will be reflected and followed by the company. Set
            dates would also affect payslips and attendance records for
            employees.
          </p>

          <div className="mt-10">2
            <label className="text-[12px] font-medium text-[#363636]">
              Date <span className="text-red-500">*</span>
            </label>

            <div>
              <input
                type="date"
                className={`outline-none transition-all ease-in-out border border-[#e4e4e4] ${focusBorder} px-3 py-2 rounded-[8px] text-[14px] text-[#363636]`}
                onChange={(event) =>
                  setNewHoliday({ ...newHoliday, h_date: event.target.value })
                }
                ref={dateInputRef}
              />
            </div>
          </div>

          <div className="mt-10">
            <label className="text-[12px] font-medium text-[#363636]">
              Name of Holiday or Event <span className="text-red-500">*</span>
            </label>

            <div>
              <input
                type="text"
                className={`outline-none transition-all ease-in-out w-full border border-[#e4e4e4] ${focusBorder} px-3 py-2 rounded-[8px] text-[14px] text-[#363636]`}
                placeholder="Enter the holiday/event here"
                onChange={(event) =>
                  setNewHoliday({ ...newHoliday, h_name: event.target.value })
                }
                ref={holidayInputRef}
              />
            </div>

            <div className="mt-16 flex flex-row justify-end gap-3">
              <button
                onClick={() => {
                  addHolidayRef.current.close();
                  dateInputRef.current.value = "";
                  holidayInputRef.current.value = "";

                  setNewHoliday({
                    ...newHoliday,
                    h_date: "",
                    h_name: "",
                  });
                }}
                className="transition-all ease-in-out border border-slate-500 hover:border-slate-600 px-8 py-2 rounded-[8px] text-[14px] text-slate-500 hover:text-slate-600"
              >
                Cancel
              </button>

              <button
                className={`transition-all ease-in-out ${bgColor} ${hoverColor} ${disabledColor} outline-none rounded-[8px] text-[14px] text-white px-8 py-2`}
                disabled={
                  newHoliday.date == "" || newHoliday.h_name == ""
                    ? true
                    : false
                }
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ManageHolidaysAndEvents;
