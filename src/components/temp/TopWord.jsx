import ReactWordcloud from "react-wordcloud";
import Subheadings from "../universal/Subheadings";

const TopWord = () => {
  const options = {
    rotations: 2,
    rotationAngles: [0],
  };

  const words = [
        {
      text: "Motivated",
      value: 100,
    },

    {
      text: "Calm",
      value: 95,
    },

    {
      text: "Strong",
      value: 77,
    },

    {
      text: "Independent",
      value: 86,
    },

    {
      text: "Responsible",
      value: 90,
    },

    {
      text: "Resilient",
      value: 98,
    },

    {
      text: "Goal-oriented",
      value: 73,
    },

    {
      text: "Productive",
      value: 90,
    },

    {
      text: "Focused",
      value: 73,
    },

    {
        text: "Honest",
        value: 73,
      },
  
      {
        text: "Strong",
        value: 77,
      },
  
      {
        text: "Independent",
        value: 86,
      },
  
      {
        text: "Responsible",
        value: 90,
      },
  
      {
        text: "Resilient",
        value: 98,
      },
  
      {
        text: "Goal-oriented",
        value: 73,
      },
    {
      text: "Motivated",
      value: 100,
    },

    {
      text: "Calm",
      value: 95,
    },

    {
      text: "Strong",
      value: 77,
    },

    {
      text: "Independent",
      value: 86,
    },

    {
      text: "Responsible",
      value: 90,
    },

    {
      text: "Resilient",
      value: 98,
    },

    {
      text: "Goal-oriented",
      value: 73,
    },

    {
      text: "Productive",
      value: 90,
    },

    {
      text: "Focused",
      value: 73,
    },

    {
        text: "Honest",
        value: 73,
      },
  
      {
        text: "Strong",
        value: 77,
      },
  
      {
        text: "Independent",
        value: 86,
      },
  
      {
        text: "Responsible",
        value: 90,
      },
  
      {
        text: "Resilient",
        value: 98,
      },
  
      {
        text: "Goal-oriented",
        value: 73,
      },
  ];

  return (
    <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] flex flex-col">
      <div className="box-border border-b border-[#e4e4e4] px-[15px] py-3">
        <Subheadings text={"Top Words"} />
      </div>

      <div className="box-border flex-1">
        <ReactWordcloud words={words} options={options} />
      </div>
    </div>
  );
};

export default TopWord;
