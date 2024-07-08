import React from "react";
import { Doughnut, Radar } from "react-chartjs-2";
import 'chart.js/auto';
import Subheadings from "../../../components/universal/Subheadings";

const doughnutData = {
  labels: ['Meeting Expectations'],
  datasets: [
    {
      data: [3.5, 5 - 3.5],
      backgroundColor: ['#4CAF50', '#e0e0e0'],
      hoverBackgroundColor: ['#45a049', '#e0e0e0'],
    },
  ],
};

// Data for the Radar Chart
const radarData = {
  labels: ['Communication', 'Integrity', 'Accountability', 'Teamwork'],
  datasets: [
    {
      label: 'Summary',
      data: [3, 4, 3.5, 3.5],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointBorderColor: '#fff',
    },
  ],
};

const doughnutOptions = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      display: false,
    },
  },
};

const radarOptions = {
  plugins: {
    legend: {
      display: false,
    },
    scales: {
      r: {
        pointLabels: {
          display: true,
        },
        ticks: {
          display: true,
        },
      },
    },
  },
};

const AverageRatingSummary = () => {
  return (
    <div className="border border-[#e4e4e4] border-solid rounded-[15px] bg-white p-5 w-full">
      <div className="flex flex-row justify-between">
        <div className="flex-1 flex flex-col items-center justify-between text-center w-full">
          <h2 className="font-bold text-[#363636] text-[16px] text-center">Average Rating</h2>
          <Doughnut data={doughnutData} options={doughnutOptions} className="w-full p-5" />
          <Subheadings text={"Meeting Expectations"}/>
          
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex-1 flex flex-col items-center justify-between text-center w-full">
          <h2 className="font-bold text-[#363636] text-[16px] text-center">Summary</h2>
          <Radar data={radarData} options={radarOptions} className="w-full" />
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-bold text-[#363636] text-[16px] text-center">Salient Accomplishments</h2>
        <p className="box-border bg-[#F4F4F4] text-[#363636] p-5 rounded-[15px] text-[16px] mt-5">
        Collaborated with development teams to optimize UI design, reducing load times and enhancing responsiveness, resulting in smoother user interactions.
        </p>
      </div>
    </div>
  );
};

export default AverageRatingSummary;
