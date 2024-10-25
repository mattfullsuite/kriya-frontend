import React, { useState, useEffect } from "react";
import axios from "axios";

const PositionDropdown = ({ onPositionChange }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/get-all-positions`)
      .then((response) => {
        const positionList = response.data.map((item) => item.position_applied);
        setPositions(positionList);
        onPositionChange(positionList[0]);
      })
      .catch((error) => {
        console.error("There was an error fetching the positions!", error);
      });
  }, []);

  return (
    <>
      <select
        className="outline-none border border-[#e4e4e4] px-2 py-1 rounded-[8px] text-[12px] text-[#363636]"
        onChange={(e) => onPositionChange(e.target.value)}
        defaultValue={positions[0]}
      >
        {positions.map((position, index) => (
          <option key={index} value={position}>
            {position}
          </option>
        ))}
      </select>
    </>
  );
};

export default PositionDropdown;
