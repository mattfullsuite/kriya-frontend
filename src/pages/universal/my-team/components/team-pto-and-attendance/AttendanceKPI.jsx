import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AttendanceKPI = () => {
  const multitypeOptions = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },

    responsive: true,

    elements: {
        point: {
            radius: 3,
        }
    },

    scales: {
      x: {
        stacked: true,
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        stacked: true,
        position: "left",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "# of days",
          color: "#363636",
        },
      },
      y1: {
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "# of employees",
          color: "#363636",
        },
      },
    },
  };

  const multitypeData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "line",
        label: "# of employees OOO",
        backgroundColor: "#004242",
        borderColor: "#004242",
        borderWidth: 2,
        data: [10, 12, 21, 18, 12, 16, 27],
        yAxisID: "y1",
      },

      {
        type: "line",
        label: "# of employees OOO unpaid",
        backgroundColor: "#878787",
        borderColor: "#878787",
        borderWidth: 2,
        data: [9, 11, 18, 7, 8, 12, 13],
        yAxisID: "y1",
      },

      {
        type: "bar",
        label: "# of days with unpaid OOO",
        backgroundColor: "#3F8383",
        data: [9, 11, 18, 7, 8, 12, 13],
        yAxisID: "y",
      },

      {
        type: "bar",
        label: "# of days with paid OOO",
        backgroundColor: "#44D1D0",
        data: [9, 11, 18, 7, 8, 12, 13],
        yAxisID: "y",
      },
    ],
  };

  return (
    <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] p-5 flex flex-col justify-between">
      <p className="text-[15px] font-bold text-[#363636]">Attendance Rate</p>

      <Chart type="bar" data={multitypeData} options={multitypeOptions} />

      <div className="box-border flex flex-row justify-around">
        <div className="flex flex-col justify-center gap-3 mt-5">
          <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
            <div className="box-border w-4 h-2 bg-[#44D1D0]" />
            <p className="text-[11px] text-[#363636]">
              # of days with paid OOO
            </p>
          </div>

          <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1">
            <div className="box-border w-4 h-2 bg-[#3F8383]" />
            <p className="text-[11px] text-[#363636]">
              # of days with unpaid OOO
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3 mt-5">
          <div className="box-border flex flex-row-reverse flex-nowrap justify-start items-center gap-1">
            <div className="box-border w-4 h-2 bg-[#004242]" />
            <p className="text-[11px] text-[#363636]"># of employees OOO</p>
          </div>

          <div className="box-border flex flex-row-reverse flex-nowrap justify-start items-center gap-1">
            <div className="box-border w-4 h-2 bg-[#878787]" />
            <p className="text-[11px] text-[#363636]">
              # of employees OOO unpaid
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceKPI;
