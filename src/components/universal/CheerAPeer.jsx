import Headings from "./Headings";

const CheerAPeer = ({ color }) => {
  return (
    <>
      <Headings text={"Cheer a Peer"} />

      <div className={`bg-` + color}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse illum
        minus, similique aperiam vel quidem, nostrum aspernatur mollitia tempore
        dignissimos, nesciunt optio. Officia praesentium dolorem sit minima
        quaerat nisi nam voluptate vel ut recusandae iure quam molestias optio
        deleniti reprehenderit qui, repudiandae mollitia facilis numquam soluta
        placeat. Unde, animi quaerat!
      </div>
    </>
  );
};

export default CheerAPeer;
