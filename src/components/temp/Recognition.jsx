import { useContext } from "react";
import { ThemeContext } from "../universal/CheerAPeer";
import Subheadings from "../universal/Subheadings";
import { Doughnut } from "react-chartjs-2";

const Recognition = () => {
  const theme = useContext(ThemeContext);

  const data = {
    labels: ["Motivated", "Calm", "Leadership", "Optimistic", "Excellent"],
    datasets: [
      {
        data: [50, 10, 10, 10, 20],
        backgroundColor: [
          "#F94144",
          "#2D9CDB",
          "#F8961E",
          "#F9C74F",
          "#90BE6D",
        ],
        borderWidth: [0, 0, 0],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: 20,
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = "bold 40px sans-serif";
      ctx.fillStyle = "#363636";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        data.datasets[0].data[0] +
          data.datasets[0].data[1] +
          data.datasets[0].data[2],
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  return (
    <div className="box-border p-5 bg-white border border-[#e4e4e4] rounded-[15px] flex flex-col">
      <div className="box-border flex flex-col gap-5 border-b border-[#e4e4e4] pb-2">
        <div className="box-border flex flex-row flex-nowrap justify-between items-center">
          <Subheadings text={"Recognition"} />

          <button className="flex flex-row justify-center items-center h-0">
            <p className={`${theme.textColor} text-[13px]`}>See all</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`${theme.fillColor} w-6 h-6`}
            >
              <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
            </svg>
          </button>
        </div>

        <div className="box-border flex flex-row justify-between">
          <div className="box-border flex-1">
            <p className="text-center text-[28px] font-bold text-[#363636]">
              43
            </p>
            <p className="text-center text-[10px] text-[#8b8b8b]">Given</p>
          </div>

          <div className="box-border flex-1 border-x border-[#e4e4e4]">
            <p className="text-center text-[28px] font-bold text-[#363636]">
              128
            </p>
            <p className="text-center text-[10px] text-[#8b8b8b]">Received</p>
          </div>

          <div className="box-border flex-1">
            <p className="text-center text-[28px] font-bold text-[#363636]">
              76
            </p>
            <p className="text-center text-[10px] text-[#8b8b8b]">
              Points Given
            </p>
          </div>
        </div>
      </div>

      <div className="box-border flex-1 flex flex-col justify-between">
        <div className="box-border m-auto px-3 md:px-40 lg:px-52 xl:px-5 flex-1">
          <Doughnut data={data} options={options} plugins={[textCenter]} />
        </div>

        <div className="box-border flex flex-row flex-wrap justify-center items-center gap-x-8 gap-y-2">
          <div className="box-border flex flex-row flex-wrap justify-center items-center gap-1">
            <div className="box-border w-2 h-2 rounded-full bg-[#F94144]" />

            <p className="text-[10px] text-[#8b8b8b]">Motivated</p>
          </div>

          <div className="box-border flex flex-row flex-wrap justify-center items-center gap-1">
            <div className="box-border w-2 h-2 rounded-full bg-[#2D9CDB]" />

            <p className="text-[10px] text-[#8b8b8b]">Calm</p>
          </div>

          <div className="box-border flex flex-row flex-wrap justify-center items-center gap-1">
            <div className="box-border w-2 h-2 rounded-full bg-[#F8961E]" />

            <p className="text-[10px] text-[#8b8b8b]">Leadership</p>
          </div>

          <div className="box-border flex flex-row flex-wrap justify-center items-center gap-1">
            <div className="box-border w-2 h-2 rounded-full bg-[#F9C74F]" />

            <p className="text-[10px] text-[#8b8b8b]">Optimistic</p>
          </div>

          <div className="box-border flex flex-row flex-wrap justify-center items-center gap-1">
            <div className="box-border w-2 h-2 rounded-full bg-[#90BE6D]" />

            <p className="text-[10px] text-[#8b8b8b]">Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recognition;
