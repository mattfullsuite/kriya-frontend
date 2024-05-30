import Subheadings from "../../../../../components/universal/Subheadings";
import { TagCloud } from 'react-tagcloud'

const TopWord = () => {
  const data = [
    { value: "JavaScript", count: 38 },
    { value: "React", count: 30 },
    { value: "Nodejs", count: 28 },
    { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 },
    { value: "MongoDB", count: 18 },
    { value: "CSS3", count: 20 },
    { value: "JavaScript", count: 38 },
    { value: "React", count: 30 },
    { value: "Nodejs", count: 28 },
    { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 },
    { value: "MongoDB", count: 18 },
    { value: "CSS3", count: 20 },
    { value: "JavaScript", count: 38 },
    { value: "React", count: 30 },
    { value: "Nodejs", count: 28 },
    { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 },
    { value: "MongoDB", count: 18 },
    { value: "CSS3", count: 20 },
    { value: "JavaScript", count: 38 },
    { value: "React", count: 30 },
    { value: "Nodejs", count: 28 },
    { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 },
    { value: "MongoDB", count: 18 },
    { value: "CSS3", count: 20 },
  ];

  return (
    <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] flex flex-col">
      <div className="box-border border-b border-[#e4e4e4] px-[15px] py-3">
        <Subheadings text={"Top Words"} />
      </div>

      <div className="box-border flex-1 flex justify-center items-center blur">
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={data}
          onClick={(tag) => alert(`'${tag.value}' was selected!`)}
        />

        
        
      </div>
    </div>
  );
};

export default TopWord;
