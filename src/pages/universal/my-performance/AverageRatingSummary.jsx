import React from "react";
import { Doughnut, Radar } from "react-chartjs-2";
import 'chart.js/auto';
import { Chart } from 'chart.js';

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
      label: '',
      data: [3, 4, 3.5, 3.5],
      backgroundColor: 'rgba(204, 85, 0, 0.75)',
      borderColor: '#FFDB58',
      pointBackgroundColor: 'rgba(204, 85, 0, 0.8)',
      pointBorderColor: 'none',
      borderWidth: '1px',
    },
  ],
};

const doughnutOptions = {
  cutout: '80%', // Adjust this value to change the width of the doughnut

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
    centerText: {
      text: '3.5',
      color: '#363636', // Default is #000000
      fontStyle: 'Arial', // Default is Arial
      sidePadding: 20, // Default is 20 (as a percentage)
      fontSize: '30', // Font size in pixels
    }
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
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  },
};

// Plugin to draw text in the center of the doughnut
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: function(chart) {
    if (chart.config.options.plugins.centerText) {
      const { ctx, chartArea: { width, height } } = chart;
      ctx.save();
      const centerX = width / 2;
      const centerY = height / 2;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = chart.config.options.plugins.centerText.color;

      // Calculate font size based on chart height
      const fontSize = height /5; // Adjust this value as needed
      ctx.font = `${fontSize}px ${chart.config.options.plugins.centerText.fontStyle}`;

      ctx.fillText(chart.config.options.plugins.centerText.text, centerX, centerY);
      ctx.restore();
    }
  }
};

// Register the plugin
Chart.register(centerTextPlugin);

const AverageRatingSummary = () => {
  return (
    <div className="border border-[#e4e4e4] border-solid rounded-[15px] bg-white p-5 w-full">
      <div className="flex flex-row justify-between">
        <div className="flex-1 flex flex-col items-center justify-between text-center w-full justify-content">
          <h2 className="font-bold text-[#363636] text-[16px] text-center">Average Rating</h2>
          <Doughnut data={doughnutData} options={doughnutOptions} className="w-full p-5" />
          <p className="text-[12px] font-bold text-[#363636]">Meeting Expectations</p>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex-1 flex flex-col items-center justify-between text-center w-full">
          <h2 className="font-bold text-[#363636] text-[16px] text-center">Summary</h2>
          <Radar data={radarData} options={radarOptions} className="w-full items-center" />
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
