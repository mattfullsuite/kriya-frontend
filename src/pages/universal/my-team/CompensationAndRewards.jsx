import DataTable from "react-data-table-component";
import Headings from "../../../components/universal/Headings";
import Subheadings from "../../../components/universal/Subheadings";
import moment from "moment";

const SeeAllBtn = ({ clickFunction, fillColor, textColor }) => {
  return (
    <button
      onClick={clickFunction}
      className="flex flex-row justify-center items-center mr-[15px]"
    >
      <span className={`text-[13px] ${textColor} font-medium`}>See all</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`${fillColor} w-6 h-6`}
      >
        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
      </svg>
    </button>
  );
};

const CompensationAndRewards = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  lightColor,
  focusBorder,
}) => {
  const columns = [
    {
      name: "Team Members",
      selector: (row) => (
        <>
          <div className="box-border flex flex-row gap-2 justify-start items-center my-2">
            <div className={`box-border h-10 w-10 rounded-full ${bgColor}`} />

            <span className="text-[#363636] font-medium flex-1">
              {row.f_name + " " + row.s_name}
            </span>
          </div>
        </>
      ),
    },

    {
      name: "Department",
      selector: (row) => <span className="text-[#363636]">{row.dept}</span>,
    },

    {
      name: "Job title",
      selector: (row) => (
        <span className="text-[#363636]">{row.position_name}</span>
      ),
    },

    {
      name: "Date hired",
      selector: (row) => (
        <span className="text-[#363636]">{row.date_hired}</span>
      ),
      sortable: true,
    },

    {
      name: "Last salary update",
      selector: (row) => (
        <span className="text-[#363636]">{row.last_salary_update}</span>
      ),
    },
  ];

  const data = [
    {
      f_name: "Marvin",
      s_name: "Bautista",
      dept: "Engineering Department",
      position_name: "Software Engineer",
      date_hired: "2023/12/04",
      last_salary_update: "6 months ago",
    },

    {
      f_name: "Antoinette",
      s_name: "Sanchez",
      dept: "Engineering Department",
      position_name: "Software Engineer",
      date_hired: "2023/10/23",
      last_salary_update: "8 months ago",
    },

    {
      f_name: "Benjie",
      s_name: "Pecson",
      dept: "Engineering Department",
      position_name: "Software Engineer",
      date_hired: "2023/05/02",
      last_salary_update: "6 months ago",
    },
  ];

  return (
    <>
      <div className="box-border max-w-[1300px] m-auto p-5">
        <Headings text={"Compensations & Rewards"} />

        <div className="box-border mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] overflow-hidden">
            <div className="box-border p-3 border-b bordewr-[#e4e4e4]">
              <Subheadings text={"Compensation Change Request"} />
            </div>

            <div className="box-border p-3 flex flex-col justify-start gap-5">
              <div className="box-border">
                <p className="text-[12px] text-[#363636] font-medium mb-1 ml-[8px]">
                  Type of Request
                </p>

                <select
                  className={`transition-all ease-in ${focusBorder} outline-none border border-[#e4e4e4] rounded-[8px] w-full p-2 text-[13px]`}
                >
                  <option>Salary Increase</option>
                </select>
              </div>

              <div className="box-border">
                <p className="text-[12px] text-[#363636] font-medium mb-1 ml-[8px]">
                  Team Member
                </p>

                <select
                  className={`transition-all ease-in ${focusBorder} outline-none border border-[#e4e4e4] rounded-[8px] w-full p-2 text-[13px]`}
                >
                  <option>Matt Wilfred Salvador</option>
                  <option>Marvin Bautista</option>
                  <option>Ian Paul Garcia</option>
                  <option>Antoinette Sanchez</option>
                </select>
              </div>

              <div className="box-border">
                <p className="text-[12px] text-[#363636] font-medium mb-1 ml-[8px]">
                  Justification
                </p>

                <textarea
                  placeholder="Elaborate your justification"
                  className={`transition-all ease-in outline-none border border-[#e4e4e4] p-2 rounded-[8px] text-[13px] bg-white w-full resize-none ${focusBorder} h-32`}
                />
              </div>

              <button
                className={`transition-all ease-in ${bgColor} ${hoverColor} active:scale-90 text-white p-2 text-[13px] outline-none rounded-[8px]`}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 box-border bg-white border border-[#e4e4e4] rounded-[15px] overflow-hidden">
            <div className="box-border p-3 border-b bordewr-[#e4e4e4] flex flex-row justify-between items-center">
              <Subheadings text={"Pay & Bonus Requests"} />

              <SeeAllBtn fillColor={fillColor} textColor={textColor} />
            </div>

            <div className="box-border p-3 h-[400px] overflow-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-[#8b8b8b] font-medium">Team Members</th>
                    <th className="text-[#8b8b8b] font-medium">Requester</th>
                    <th className="text-[#8b8b8b] font-medium">Type</th>
                    <th className="text-[#8b8b8b] font-medium">Status</th>
                    <th className="text-[#8b8b8b] font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${bgColor}`} />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Marvin Bautista
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="flex flex-row justify-start items-center gap-2">
                      <span className="text-[12px] text-[#363636]">
                        Deon Paul Sadcopen
                      </span>
                    </td>

                    <td className="text-[12px] text-[#363636]">Pay Request</td>

                    <td>
                      <span className="bg-[#FFCD6B] text-[12px] px-[5px] py-[3px] text-[#CC4C00] font-medium rounded-[8px]">
                        Pending
                      </span>
                    </td>

                    <td>
                      <button
                        className={`${textColor} text-[12px] font-medium ${lightColor} py-2 px-3 rounded-[8px] transition-all active:scale-90"`}
                      >
                        View
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${bgColor}`} />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Antoinette Sanchez
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="flex flex-row justify-start items-center gap-2">
                      <span className="text-[12px] text-[#363636]">
                        Ian Paul Garcia
                      </span>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      Bonus Request
                    </td>

                    <td>
                      <span className="bg-[#7DDA74] text-[12px] px-[5px] py-[3px] text-[#36814F] font-medium rounded-[8px]">
                        Done
                      </span>
                    </td>

                    <td>
                      <button
                        className={`${textColor} text-[12px] font-medium ${lightColor} py-2 px-3 rounded-[8px] transition-all active:scale-90"`}
                      >
                        View
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${bgColor}`} />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Matt Wilfred Salvador
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="flex flex-row justify-start items-center gap-2">
                      <span className="text-[12px] text-[#363636]">
                        Antoinette Sanchez
                      </span>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      Bonus Request
                    </td>

                    <td>
                      <span className="bg-[#7DDA74] text-[12px] px-[5px] py-[3px] text-[#36814F] font-medium rounded-[8px]">
                        Done
                      </span>
                    </td>

                    <td>
                      <button
                        className={`${textColor} text-[12px] font-medium ${lightColor} py-2 px-3 rounded-[8px] transition-all active:scale-90"`}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="box-border grid grid-cols-1 mt-10">
          <div className="ml-[15px] mb-[10px]">
            <Subheadings text={"Team Members' Compensation"} />
          </div>

          <div className="box-border bg-white border border-[#E4E4E4] rounded-[15px] p-3">
            <DataTable
              data={data}
              columns={columns}
              highlightOnHover
              pagination
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompensationAndRewards;
