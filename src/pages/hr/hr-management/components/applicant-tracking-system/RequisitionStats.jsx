import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import PositionDropdown from "./PositionDropdown";
import axios from "axios";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Subheadings from "../../../../../components/universal/Subheadings";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: true,
      position: "bottom",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const RequisitionStats = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [filter, setFilter] = useState("month");
  const [position, setPosition] = useState("all");
  const [dataByMonth, setDataByMonth] = useState(null);
  const [dataByQuarter, setDataByQuarter] = useState(null);
  const [dataByYear, setDataByYear] = useState(null);
  const [allApplicationsData, setAllApplicationsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const monthResponse = await axios.get(
          `${BASE_URL}/get-filteredData-byMonth?position=${position}`
        );
        const quarterResponse = await axios.get(
          `${BASE_URL}/get-filteredData-byQuarter?position=${position}`
        );
        const yearResponse = await axios.get(
          `${BASE_URL}/get-filteredData-byYear?position=${position}`
        );
        //const allApplicationsResponse = await axios.get(`http://localhost:6100/get-all-applications?filter=${filter}&value=${moment().month() + 1}`);

        const processData = (data, labelKey) => {
          const labels = data.map((item) => {
            if (labelKey === "Month") {
              return moment()
                .month(item[labelKey] - 1)
                .format("MMMM");
            } else if (labelKey === "Quarter") {
              return `Q${item[labelKey]}`;
            } else {
              return item.Year;
            }
          });

          const closedApplications = data.map(
            (item) => item["Closed Applications"]
          );
          const passedApplications = data.map(
            (item) => item["Passed Applications"]
          );
          const onProgressApplications = data.map(
            (item) => item["On Progress Applications"]
          );

          return {
            labels,
            datasets: [
              {
                label: "Closed Applications",
                data: closedApplications,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: "Passed Applications",
                data: passedApplications,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
              },
              {
                label: "On Progress Applications",
                data: onProgressApplications,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
              },
            ],
          };
        };

        setDataByMonth(processData(monthResponse.data, "Month"));
        setDataByQuarter(processData(quarterResponse.data, "Quarter"));
        setDataByYear(processData(yearResponse.data, "Year"));
        //setAllApplicationsData(processData(allApplicationsResponse.data, 'Month'));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [position, filter]);

  const getData = () => {
    if (position === "all") {
      return allApplicationsData;
    }
    switch (filter) {
      case "quarter":
        return dataByQuarter;
      case "year":
        return dataByYear;
      default:
        return dataByMonth;
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-row justify-between items-start">
        <Subheadings text={"Requisition Statistics"} />

        <div className="flex flex-col gap-2 items-end">
          <PositionDropdown onPositionChange={setPosition} />
          <select
            value={filter}
            className="outline-none border border-[#e4e4e4] px-2 py-1 rounded-[8px] text-[12px] text-[#363636]"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="month">By Month</option>
            <option value="quarter">By Quarter</option>
            <option value="year">By Year</option>
          </select>
        </div>
      </div>

      {getData() && <Bar options={options} data={getData()} />}
    </div>
  );
};

export default RequisitionStats;
