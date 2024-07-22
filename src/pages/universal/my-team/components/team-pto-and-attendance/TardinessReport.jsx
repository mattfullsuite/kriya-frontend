import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { TeamPTOContext } from "../../TeamPTOAndAttendance";
import { useContext } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TardinessReport = () => {
  const tardinessTheme = useContext(TeamPTOContext);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },

      y: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "# of undertime",
        data: [10, 30, 44, 32, 72, 18, 23],
        backgroundColor: tardinessTheme.accentOne,
      },
      {
        label: "# of overtime",
        data: [32, 12, 54, 34, 42, 28, 53],
        backgroundColor: tardinessTheme.accentTwo,
      },
    ],
  };

  return (
    <div className="box-border p-5 bg-white border border-[#e4e4e4] rounded-[15px] flex flex-col justify-between">
      <p className="text-[15px] font-bold text-[#363636]">Tardiness Report</p>

      <Bar options={chartOptions} data={chartData} />

      <div className="flex flex-row justify-center gap-10 mt-5">
        <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
        <div className={`"box-border w-4 h-2 ${"bg-[" + tardinessTheme.accentOne + "]"}`} />
          <p className="text-[11px] text-[#363636]"># of undertime</p>
        </div>

        <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
        <div className={`"box-border w-4 h-2 ${"bg-[" + tardinessTheme.accentTwo + "]"}`} />
          <p className="text-[11px] text-[#363636]"># of overtime</p>
        </div>
      </div>
    </div>
  );
};

export default TardinessReport;
