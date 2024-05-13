import Subheadings from "../../../components/universal/Subheadings";

const InsightsListTile = ({ notif, employee, content, suggestion }) => {
  return (
    <>
      <div className="box-border bg-[#F4F4F4] rounded-[8px]">
        <div className="box-border border-b p-2 border-[#E4E4E4]">
          <span className="text-[#666A40] font-bold text-[13px]">{notif}</span>
        </div>

        <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-2 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-[#666A40] w-10 h-10"
          >
            <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
          </svg>

          <div className="box-border">
            <p className="text-[#363636] text-[13px]">
              <span className="font-bold">{employee}</span> {content}
            </p>

            <p className="text-[13px] text-[#666A40] underline">{suggestion}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const DepartmentPulseMetrics = () => {
  return (
    <div className="box-border bg-white p-5 border border-[#e4e4e4] rounded-[15px] flex flex-col justify-between">
      <div className="box-border flex-1">
        <div className="box-border flex flex-row justify-between items-center">
          <Subheadings text={"Pulse Metrics by Departments"} />

          <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Anually</option>
          </select>
        </div>

        <div className="overflow-x-auto mt-5">
          <table className="table">
            <tbody>
              <tr>
                <td className="flex flex-row justify-start items-center gap-2 w-52">
                  <div className="box-border w-10 h-10 rounded-full bg-[#666A40] flex justify-center items-center text-white font-bold">
                    MB
                  </div>

                  <div className="box-border flex-1">
                    <p className="text-[12px] text-[#363636]">
                      Marvin Bautista
                    </p>
                    <p className="text-[10px] text-[#8b8b8b] leading-none">
                      Software Engineer
                    </p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#FF5353] font-bold leading-none">49</p>
                    <p className="text-[10px] text-[#FF5353] leading-none">Low Logs</p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#A9A9A9] font-bold leading-none">42</p>
                    <p className="text-[10px] text-[#A9A9A9] leading-none">Neutral Logs</p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#50C878] font-bold leading-none">61</p>
                    <p className="text-[10px] text-[#50C878] leading-none">High Logs</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="flex flex-row justify-start items-center gap-2 w-52">
                  <div className="box-border w-10 h-10 rounded-full bg-[#666A40] flex justify-center items-center text-white font-bold">
                    MB
                  </div>

                  <div className="box-border flex-1">
                    <p className="text-[12px] text-[#363636]">
                      Marvin Bautista
                    </p>
                    <p className="text-[10px] text-[#8b8b8b] leading-none">
                      Software Engineer
                    </p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#FF5353] font-bold leading-none">49</p>
                    <p className="text-[10px] text-[#FF5353] leading-none">Low Logs</p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#A9A9A9] font-bold leading-none">42</p>
                    <p className="text-[10px] text-[#A9A9A9] leading-none">Neutral Logs</p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#50C878] font-bold leading-none">61</p>
                    <p className="text-[10px] text-[#50C878] leading-none">High Logs</p>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="flex flex-row justify-start items-center gap-2 w-52">
                  <div className="box-border w-10 h-10 rounded-full bg-[#666A40] flex justify-center items-center text-white font-bold">
                    MB
                  </div>

                  <div className="box-border flex-1">
                    <p className="text-[12px] text-[#363636]">
                      Marvin Bautista
                    </p>
                    <p className="text-[10px] text-[#8b8b8b] leading-none">
                      Software Engineer
                    </p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#FF5353] font-bold leading-none">49</p>
                    <p className="text-[10px] text-[#FF5353] leading-none">Low Logs</p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#A9A9A9] font-bold leading-none">42</p>
                    <p className="text-[10px] text-[#A9A9A9] leading-none">Neutral Logs</p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#50C878] font-bold leading-none">61</p>
                    <p className="text-[10px] text-[#50C878] leading-none">High Logs</p>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="flex flex-row justify-start items-center gap-2 w-52">
                  <div className="box-border w-10 h-10 rounded-full bg-[#666A40] flex justify-center items-center text-white font-bold">
                    MB
                  </div>

                  <div className="box-border flex-1">
                    <p className="text-[12px] text-[#363636]">
                      Marvin Bautista
                    </p>
                    <p className="text-[10px] text-[#8b8b8b] leading-none">
                      Software Engineer
                    </p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#FF5353] font-bold leading-none">49</p>
                    <p className="text-[10px] text-[#FF5353] leading-none">Low Logs</p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#A9A9A9] font-bold leading-none">42</p>
                    <p className="text-[10px] text-[#A9A9A9] leading-none">Neutral Logs</p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#50C878] font-bold leading-none">61</p>
                    <p className="text-[10px] text-[#50C878] leading-none">High Logs</p>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="flex flex-row justify-start items-center gap-2 w-52">
                  <div className="box-border w-10 h-10 rounded-full bg-[#666A40] flex justify-center items-center text-white font-bold">
                    MB
                  </div>

                  <div className="box-border flex-1">
                    <p className="text-[12px] text-[#363636]">
                      Marvin Bautista
                    </p>
                    <p className="text-[10px] text-[#8b8b8b] leading-none">
                      Software Engineer
                    </p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#FF5353] font-bold leading-none">49</p>
                    <p className="text-[10px] text-[#FF5353] leading-none">Low Logs</p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#A9A9A9] font-bold leading-none">42</p>
                    <p className="text-[10px] text-[#A9A9A9] leading-none">Neutral Logs</p>
                  </div>
                </td>

                <td className="flex-1">
                  <div className="text-center flex flex-col justify-center">
                    <p className="text-[24px] text-[#50C878] font-bold leading-none">61</p>
                    <p className="text-[10px] text-[#50C878] leading-none">High Logs</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="box-border border-t border-[#e4e4e4] mt-5">
        <h2 className=" font-bold text-[#666A40] text-[16px] text-left leading-none my-5">
          Insights Analytics
        </h2>

        <div className="box-border flex flex-col gap-2">
          <InsightsListTile
            notif={"Employee Pulse Metric Insights 1"}
            content={
              "Overview of insights with a detailed examination and discussion of the Pulse Metrics of the Employee"
            }
            suggestion={"Suggestion here"}
          />

          <InsightsListTile
            notif={"Employee Pulse Metric Insights 2"}
            content={
              "Overview of insights with a detailed examination and discussion of the Pulse Metrics of the Employee"
            }
            suggestion={"Suggestion here"}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentPulseMetrics;
