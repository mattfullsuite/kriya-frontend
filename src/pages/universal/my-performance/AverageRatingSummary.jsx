import React from "react";
import { Doughnut, Radar} from "react-chartjs-2";
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
  };

const AverageRatingSummary = () => {
  return (
    <div className="border border-[#e4e4e4] border-solid rounded-[15px] bg-white p-5 flex w-full justify-between flex-row">
      <div className="flex-1 flex flex-col items-center justify-between text-center w-full">
        <h2 className="font-bold text-[#363636] text-[16px] text-center">Average Rating</h2>
          <Doughnut data={doughnutData} options={doughnutOptions}
          className="flex-1 flex-col w-full text-center justify-between p-5">
          </Doughnut>
          <Subheadings text={"Meeting Expectations"}/>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="flex-1 flex flex-col items-center justify-between text-center w-full">
        <h2 className="font-bold text-[#363636] text-[16px] text-center">Summary</h2>
        <Radar data={radarData} options={radarOptions} 
        className="flex-1 flex-col w-full text-center justify-between"></Radar>
      </div> 
    </div>
  );
};

export default AverageRatingSummary;