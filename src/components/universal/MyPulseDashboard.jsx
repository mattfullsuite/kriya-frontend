import React, { useState } from "react";
import Headings from "./Headings";

const MyPulseDashboard = ({ color }) => {
  const [mood, setMood] = useState(0.0);

  return (
    <>
      <Headings text={"My Pulse"} />
    </>
  );
};

export default MyPulseDashboard;
