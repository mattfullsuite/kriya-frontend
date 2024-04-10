import React from "react";
import Headings from "./Headings";

const MyPulseDashboard = ({color}) => {
  return (
    <>
      <Headings text={"My Pulse"} />

      <div className={color}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet hic rerum
        dolores soluta deserunt perferendis doloribus? Perspiciatis illum
        adipisci provident cum sunt saepe temporibus molestiae, reiciendis
        doloremque aliquid et veritatis culpa, quibusdam sequi quam est repellat
        eos ullam officia eligendi corporis nemo quidem nisi. Rem voluptates
        aspernatur ad temporibus cum?
      </div>
    </>
  );
};

export default MyPulseDashboard;
