import Headings from "./Headings";

const MyTeam = ({ color }) => {
  return (
    <>
      <Headings text={"My Team"} />

      <div className={`bg-` + color}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
        debitis ea qui minima corporis asperiores voluptas maxime fuga! Officia
        sit voluptatem ullam voluptates quia doloribus nulla, eaque suscipit
        ratione et quis amet aliquam recusandae nemo voluptas nisi molestias
        quibusdam veniam fugit voluptate! Ex rem quisquam officiis reiciendis
        libero sunt aliquam!
      </div>
    </>
  );
};

export default MyTeam;
