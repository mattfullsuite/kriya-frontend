import Headings from "./Headings";

const TailoredGuidance = ({ color }) => {
  return (
    <>
      <Headings text={"Tailored Guidance"} />

      <div className={`bg-` + color}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis at
        laudantium quae temporibus nulla accusamus ea, officiis unde aut esse
        numquam atque provident quasi veritatis molestiae voluptatem repudiandae
        excepturi molestias consequatur adipisci aliquid dignissimos
        reprehenderit! Quae rem, eius recusandae, dicta officia tenetur
        aspernatur, maxime qui explicabo cupiditate provident dolores maiores!
      </div>
    </>
  );
};

export default TailoredGuidance;
