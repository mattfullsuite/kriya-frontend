import Headings from "./Headings";

const SuggestionBox = ({ color }) => {
  return (
    <>
      <Headings text={"Suggestion Box"} />

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

export default SuggestionBox;
