import Headings from "./Headings";

const CompensationAndRewards = ({ color }) => {
  return (
    <>
      <Headings text={"Compensations & Rewards"} />

      <div className={`bg-` + color}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt iste
        voluptates molestiae laboriosam reprehenderit nobis suscipit nihil.
        Libero ex exercitationem temporibus qui laudantium placeat ullam vero.
        Optio rerum nisi quo sed tempora, quod aperiam commodi, illum quaerat
        fugit repellat exercitationem libero autem at maiores ratione labore
        enim temporibus. Atque, impedit?
      </div>
    </>
  );
};

export default CompensationAndRewards;
