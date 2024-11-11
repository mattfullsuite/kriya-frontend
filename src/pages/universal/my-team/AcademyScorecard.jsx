import { useState } from "react";
import Headings from "../../../components/universal/Headings";
import Subheadings from "../../../components/universal/Subheadings";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const AcademyScorecard = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  lightColor,
  focusBorder,
}) => {
  const data = {
    labels: ["Excellent", "Average", "Poor"],
    datasets: [
      {
        label: "# of Employees",
        data: [60, 20, 20],
        backgroundColor: ["#50C878", "#FFDB58", "#FF3131"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <div className="max-w-[1300px] m-auto p-5">
        <Headings text={"Academy Scorecard"} />

        <div className="box-border mt-10 mb-3">
          <Subheadings text={"Current Academy Course"} />
        </div>

        <div className="box-border grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="box-border lg:col-span-2 bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
            <p className={`font-bold ${textColor} text-[14px] text-left`}>
              Security Management
            </p>

            <div className="box-border flex flex-row justify-between lg:px-20 mt-10">
              <div className="box-border flex flex-col justify-center item-center">
                <p className="text-[14px] font-bold text-[#363636] text-center">
                  Team's Score Average
                </p>
                <p className="text-[50px] text-center font-bold">89%</p>

                <div className="box-border w-[100px] h-4 bg-[#EDEDED] rounded-full m-auto relative">
                  <div
                    className={`absolute h-full w-[89%] bg-[#50C878] rounded-full`}
                  />
                </div>
              </div>

              <div className="box-border flex flex-col justify-center item-center">
                <p className="text-[14px] font-bold text-[#363636] text-center">
                  Team's Score Average
                </p>
                <p className="text-[50px] text-center font-bold">75%</p>

                <div className="box-border w-[100px] h-4 bg-[#EDEDED] rounded-full m-auto relative">
                  <div
                    className={`absolute h-full w-[75%] bg-[#FFDB58] rounded-full`}
                  />
                </div>
              </div>
            </div>

            <p className="text-center text-[14px] mt-16 text-[#8b8b8b]">
              Your team scored{" "}
              <span className={`font-bold ${textColor} text-[#008080]`}>
                15% higher
              </span>{" "}
              than the other teams taking this course. Keep it up!
            </p>
          </div>

          <div className="box-border bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
            <p className={`font-bold ${textColor} text-[14px] text-left`}>
              Team Academy Progress
            </p>

            <div className="box-border mt-5 px-16 flex flex-col justify-between h-[80%]">
              <Pie data={data} options={options} />

              <div className="box-border flex flex-row justify-center items-center gap-3">
                <div className="box-border flex flex-rpw flex-nowrap justify-center items-center gap-1">
                  <div className="box-border h-2 w-2 rounded-full bg-[#50C878]" />

                  <span className="text-[10px] text-[#363636]">Excellent</span>
                </div>

                <div className="box-border flex flex-rpw flex-nowrap justify-center items-center gap-1">
                  <div className="box-border h-2 w-2 rounded-full bg-[#FFDB58]" />

                  <span className="text-[10px] text-[#363636]">Average</span>
                </div>

                <div className="box-border flex flex-rpw flex-nowrap justify-center items-center gap-1">
                  <div className="box-border h-2 w-2 rounded-full bg-[#FF3131]" />

                  <span className="text-[10px] text-[#363636]">Poor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box-border grid grid-cols-1 lg:grid-cols-3 gap-3 mt-10">
          <div className="box-border">
            <div className="box-border mb-3">
              <Subheadings text={"Team Academy Leaderboard"} />
            </div>

            <div className="box-border bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
              <p className={`font-bold ${textColor} text-[14px] text-left`}>
                This Week's Top 5
              </p>

              <div className="box-border flex flex-col justify-start gap-2 mt-3">
                <div className="box-border w-full flex flex-row justify-between items-center gap-5">
                  <div className="box-border flex flex-col justify-center items-center w-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 fill-yellow-500"
                    >
                      <path d="m21 2-5 5-4-5-4 5-5-5v13h18zM5 21h14a2 2 0 0 0 2-2v-2H3v2a2 2 0 0 0 2 2z"></path>
                    </svg>

                    <span className="font-bold text-yellow-500">1st</span>
                  </div>

                  <div className="box-border flex-1 bg-[#f4f4f4] flex flex-row flex-nowrap justfiy-start items-center gap-2 p-2 rounded-[10px]">
                    <div
                      className={`box-border w-10 h-10 rounded-full ${bgColor}`}
                    />

                    <div className="box-border flex flex-col justify-start">
                      <span className="text-[13px] font-medium text-[#363636]">
                        Marvin Bautista
                      </span>
                      <span className="text-[10px] font-medium text-[#8b8b8b]">
                        Software Engineer
                      </span>
                    </div>
                  </div>
                </div>

                <div className="box-border w-full flex flex-row justify-between items-center gap-5">
                  <div className="box-border flex flex-col justify-center items-center w-8">
                    <span className="font-bold text-[#A9A9A9]">2nd</span>
                  </div>

                  <div className="box-border flex-1 bg-[#f4f4f4] flex flex-row flex-nowrap justfiy-start items-center gap-2 p-2 rounded-[10px]">
                    <div
                      className={`box-border w-10 h-10 rounded-full ${bgColor}`}
                    />
                    <div className="box-border flex flex-col justify-start">
                      <span className="text-[13px] font-medium text-[#363636]">
                        Marvin Bautista
                      </span>
                      <span className="text-[10px] font-medium text-[#8b8b8b]">
                        Software Engineer
                      </span>
                    </div>
                  </div>
                </div>

                <div className="box-border w-full flex flex-row justify-between items-center gap-5">
                  <div className="box-border flex flex-col justify-center items-center w-8">
                    <span className="font-bold text-[#CD9771]">3rd</span>
                  </div>

                  <div className="box-border flex-1 bg-[#f4f4f4] flex flex-row flex-nowrap justfiy-start items-center gap-2 p-2 rounded-[10px]">
                    <div
                      className={`box-border w-10 h-10 rounded-full ${bgColor}`}
                    />

                    <div className="box-border flex flex-col justify-start">
                      <span className="text-[13px] font-medium text-[#363636]">
                        Marvin Bautista
                      </span>
                      <span className="text-[10px] font-medium text-[#8b8b8b]">
                        Software Engineer
                      </span>
                    </div>
                  </div>
                </div>

                <div className="box-border w-full flex flex-row justify-between items-center gap-5">
                  <div className="box-border flex flex-col justify-center items-center w-8">
                    <span className="font-bold text-[#B2AC88]">4th</span>
                  </div>

                  <div className="box-border flex-1 bg-[#f4f4f4] flex flex-row flex-nowrap justfiy-start items-center gap-2 p-2 rounded-[10px]">
                    <div
                      className={`box-border w-10 h-10 rounded-full ${bgColor}`}
                    />

                    <div className="box-border flex flex-col justify-start">
                      <span className="text-[13px] font-medium text-[#363636]">
                        Marvin Bautista
                      </span>
                      <span className="text-[10px] font-medium text-[#8b8b8b]">
                        Software Engineer
                      </span>
                    </div>
                  </div>
                </div>

                <div className="box-border w-full flex flex-row justify-between items-center gap-5">
                  <div className="box-border flex flex-col justify-center items-center w-8">
                    <span className="font-bold text-[#36454F]">5th</span>
                  </div>

                  <div className="box-border flex-1 bg-[#f4f4f4] flex flex-row flex-nowrap justfiy-start items-center gap-2 p-2 rounded-[10px]">
                    <div
                      className={`box-border w-10 h-10 rounded-full ${bgColor}`}
                    />

                    <div className="box-border flex flex-col justify-start">
                      <span className="text-[13px] font-medium text-[#363636]">
                        Marvin Bautista
                      </span>
                      <span className="text-[10px] font-medium text-[#8b8b8b]">
                        Software Engineer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="box-border lg:col-span-2">
            <div className="box-border mb-3">
              <Subheadings text={"Team Academy Leaderboard"} />
            </div>

            <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] overflow-hidden">
              <div className="box-border flex flex-row justify-between border-b border-[#E4E4E4]">
                <div className="boxb-dorder flex-1">
                  <p
                    className={`text-center py-3 ${bgColor} font-medium text-white`}
                  >
                    Lessons
                  </p>
                </div>

                <div className="boxb-dorder flex-1">
                  <p className="text-center py-3 font-medium">
                    Assessment Scores
                  </p>
                </div>
              </div>

              <div className="box-border p-3">
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th className="text-[#8b8b8b] font-medium">
                          Team Members
                        </th>
                        <th className="text-[#8b8b8b] font-medium">
                          Study Duration
                        </th>
                        <th className="text-[#8b8b8b] font-medium">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="box-border flex flex-row flex-nowrap justify-start items-center gap-2">
                          <div
                            className={`box-border w-10 h-10 rounded-full ${bgColor}`}
                          />

                          <div className="box-border flex flex-col justify-start">
                            <span className="text-[13px] font-medium text-[#363636]">
                              Marvin Bautista
                            </span>
                            <span className="text-[10px] font-medium text-[#8b8b8b]">
                              Software Engineer
                            </span>
                          </div>
                        </td>

                        <td className="text-[12px] text-[#363636]">48h 5m</td>

                        <td>
                          <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-2">
                            <span className="text-[12px] text-[#363636]">
                              96%
                            </span>

                            <div className="box-border w-[100px] h-5 bg-[#EDEDED] relative rounded-full">
                              <div
                                className={`absolute h-full ${bgColor} rounded-full w-[96%]`}
                              />{" "}
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="box-border flex flex-row flex-nowrap justify-start items-center gap-2">
                          <div
                            className={`box-border w-10 h-10 rounded-full ${bgColor}`}
                          />

                          <div className="box-border flex flex-col justify-start">
                            <span className="text-[13px] font-medium text-[#363636]">
                              Antoinette Sanchez
                            </span>
                            <span className="text-[10px] font-medium text-[#8b8b8b]">
                              Software Engineer
                            </span>
                          </div>
                        </td>

                        <td className="text-[12px] text-[#363636]">21h 9m</td>

                        <td>
                          <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-2">
                            <span className="text-[12px] text-[#363636]">
                              87%
                            </span>

                            <div className="box-border w-[100px] h-5 bg-[#EDEDED] relative rounded-full">
                              <div
                                className={`absolute h-full ${bgColor} rounded-full w-[87%]`}
                              />{" "}
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="box-border flex flex-row flex-nowrap justify-start items-center gap-2">
                          <div
                            className={`box-border w-10 h-10 rounded-full ${bgColor}`}
                          />

                          <div className="box-border flex flex-col justify-start">
                            <span className="text-[13px] font-medium text-[#363636]">
                              Benjie Pecson
                            </span>
                            <span className="text-[10px] font-medium text-[#8b8b8b]">
                              Software Engineer
                            </span>
                          </div>
                        </td>

                        <td className="text-[12px] text-[#363636]">21h 9m</td>

                        <td>
                          <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-2">
                            <span className="text-[12px] text-[#363636]">
                              63%
                            </span>

                            <div className="box-border w-[100px] h-5 bg-[#EDEDED] relative rounded-full">
                              <div
                                className={`absolute h-full ${bgColor} rounded-full w-[63%]`}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademyScorecard;
