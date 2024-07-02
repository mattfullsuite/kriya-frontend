import { useState } from "react";
import Headings from "../../../components/universal/Headings";
import Subheadings from "../../../components/universal/Subheadings";
import DataTable from "react-data-table-component";
import NorthStar from "./components/team-performance-management/NorthStar";

const SeeAllBtn = ({ clickFunction }) => {
  return (
    <button
      onClick={clickFunction}
      className="flex flex-row justify-center items-center"
    >
      <span className="text-[13px] text-[#008080] font-medium">See all</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="fill-[#008080] w-6 h-6"
      >
        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
      </svg>
    </button>
  );
};

const TeamPerformanceManagement = ({ color }) => {
  return (
    <>
      <div className="box-border max-w-[1300px] m-auto p-5">
        <Headings text={"Performance Management"} />

        <NorthStar />

        <div className="box-border grid grid-cols-1 lg:grid-cols-3 mt-10 gap-5">
          <div className="lg:col-span-2 box-border bg-white border border-[#e4e4e4] rounded-[15px] h-[350px] flex flex-col justify-start overflow-hidden">
            <div className="flex flex-row justify-between items-center h-14 px-3 border-b border-[#e4e4e4]">
              <Subheadings text="Team Members Performance KPIs" />

              <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Anually</option>
              </select>
            </div>

            <div className="overflow-y-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-[#8b8b8b] font-medium">Team Members</th>
                    <th className="text-[#8b8b8b] font-medium">KPI 1</th>
                    <th className="text-[#8b8b8b] font-medium">KPI 2</th>
                    <th className="text-[#8b8b8b] font-medium">KPI 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

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

                    <td className="text-[12px] text-[#363636] font-semibold">
                      90%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      88%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      90%
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

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

                    <td className="text-[12px] text-[#363636] font-semibold">
                      92%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      93%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      92%
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

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

                    <td className="text-[12px] text-[#363636] font-semibold">
                      97%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      90%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      97%
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Ian Paul Garcia
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      90%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      90%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      92%
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Benjie Pecson
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      91%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      92%
                    </td>

                    <td className="text-[12px] text-[#363636] font-semibold">
                      93%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] overflow-auto flex flex-col justify-between gap-2 h-[350px]">
            <div className="flex flex-row justify-between items-center h-14 px-3 border-b border-[#e4e4e4]">
              <Subheadings text="Average Performance KPIs" />

              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-[#a6a6a6]"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </button>
            </div>

            <div className="box-border flex-1 p-3 flex flex-col justify-between">
              <div className="box-border">
                <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Anually</option>
                </select>
              </div>

              <div className="box-border flex-1 flex flex-col justify-center gap-7">
                <div className="box-border">
                  <div className="box-border flex flex-row flex-nowrap justify-between items-center">
                    <span className="text-[12px] font-semibold text-[#363636]">
                      KPI 1
                    </span>

                    <spa className="text-[#363636] font-semibold text-[18px]">
                      85%
                    </spa>
                  </div>

                  <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
                    <div className="box-border h-full w-[85%] rounded-full bg-[#008080]" />
                  </div>
                </div>

                <div className="box-border">
                  <div className="box-border flex flex-row flex-nowrap justify-between items-center">
                    <span className="text-[12px] font-semibold text-[#363636]">
                      KPI 2
                    </span>

                    <spa className="text-[#363636] font-semibold text-[18px]">
                      89%
                    </spa>
                  </div>

                  <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
                    <div className="box-border h-full w-[89%] rounded-full bg-[#008080]" />
                  </div>
                </div>

                <div className="box-border">
                  <div className="box-border flex flex-row flex-nowrap justify-between items-center">
                    <span className="text-[12px] font-semibold text-[#363636]">
                      KPI 3
                    </span>

                    <spa className="text-[#363636] font-semibold text-[18px]">
                      91%
                    </spa>
                  </div>

                  <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
                    <div className="box-border h-full w-[91%] rounded-full bg-[#008080]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box-border grid grid-cols-1 lg:grid-cols-3 mt-10 gap-5">
          <div className="lg:col-span-2 box-border bg-white border border-[#e4e4e4] flex flex-col justify-between rounded-[15px] h-[400px] overflow-hidden">
            <div className="flex flex-row justify-between items-center px-3 h-14 bg-white border-b border-[#e4e4e4]">
              <Subheadings text="Team Members Self-Checkin" />

              <div className="box-border flex flex-row justify-beteween items-cenyter gap-2">
                <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Anually</option>
                </select>

                <SeeAllBtn />
              </div>
            </div>

            <div className="box-border flex-1 overflow-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-[#8b8b8b] font-medium">Team Members</th>
                    <th className="text-[#8b8b8b] font-medium">Date</th>
                    <th className="text-[#8b8b8b] font-medium">Average</th>
                    <th className="text-[#8b8b8b] font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Adrian Mallari
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 20, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.79</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

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

                    <td className="text-[12px] text-[#363636]">
                      April 22, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.57</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Ian Paul Garcia
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 22, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.45</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Michael Artiaga
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 23, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.31</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Michael Artiaga
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 23, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.31</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Michael Artiaga
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 23, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.31</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />

                        <div className="box-border flex flex-col justify-start">
                          <span className="text-[13px] font-medium text-[#363636]">
                            Michael Artiaga
                          </span>
                          <span className="text-[10px] font-medium text-[#8b8b8b] leading-none">
                            Software Engineer
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="text-[12px] text-[#363636]">
                      April 23, 2024
                    </td>

                    <td className="text-[12px] text-[#363636]">4.31</td>

                    <td>
                      <button className="text-[#008080] bg-[#00808038] text-[12px] px-4 py-1 rounded-[7px]">
                        Review
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="box-border flex flex-col justify-between bg-white border border-[#e4e4e4] rounded-[15px] h-[400px]">
            <div className="box-border flex flex-row justify-between items-center h-14 px-3 border-b border-[#e4e4e4]">
              <Subheadings text="Performance Review" />

              <SeeAllBtn />
            </div>

            <div className="box-border flex-1 flex flex-col justify-start gap-2 p-3 overflow-y-auto">
              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center gap-2 bg-[#F4F4F4] rounded-[10px] p-2">
                <div className="w-12 h-12 rounded-full bg-blue-500" />

                <div className="box-border flex flex-col justify-start">
                  <span className="text-[13px] font-medium text-[#363636]">
                    Michael Artiaga
                  </span>

                  <span className="text-[11px] font-medium text-[#8b8b8b] leading-1">
                    Performance Review
                  </span>

                  <span className="text-[11px] font-normal text-[#8b8b8b] leading-1">
                    April 20, 2024, 3:00 PM
                  </span>
                </div>
              </div>
            </div>

            <div className="box-border p-3 border-t border-[#E4E4E4]">
              <button className="text-[12px] text-[#363636] bg-white w-full py-3 rounded-[10px] border border-[#E4E4E4]">
                Schedule Performance Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPerformanceManagement;
