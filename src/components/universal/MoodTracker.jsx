import React from "react";
import Headings from "./Headings";

const MoodTracker = ({ color }) => {
  return (
    <>
      <Headings text={"Mood Tracker"} />

      <div className={`bg-` + color}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta nemo
        nihil vitae veritatis non expedita blanditiis optio in rerum.
        Perferendis repudiandae aperiam, sed, consequatur voluptatum doloremque
        impedit pariatur, praesentium doloribus harum earum! Eaque soluta beatae
        ea quaerat dolore tenetur nisi! Voluptatem dignissimos obcaecati,
        officiis nulla aperiam distinctio quasi ducimus qui?
      </div>
    </>
  );
};

export default MoodTracker;
