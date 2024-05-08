const DownloadData = (props) => {
  const data = props.downloadData;

  const convertToTable = (data) => {
    let forTable = [];
    console.log("Download Data: ", data);
    //Object Array
    data.forEach((item) => {
      //Object
      Object.keys(item).map((key) => {
        //Keys Value
        console.log("Key:", key);
        console.log("Value: ", item[key]);
        const dates = JSON.parse(item["dates"]); //Dates Object
        Object.keys(dates).map((val) => {
          console.log("Dates key:", val);
        });
        const payables = JSON.parse(item["payables"]); //Payables
        Object.keys(payables).map((category) => {
          console.log("Category: ", category);
          console.log(typeof payables[category]);
          //   const categories = JSON.parse(category);
          //   console.log(categories);
          //   Object.keys(categories).map((payItems) => {
          //     console.log("Pay Items", payItems);
          //   });
        });
      });
    });
  };
  convertToTable(data);
  return (
    <>
      <div></div>
    </>
  );
};

export default DownloadData;
