const DownloadData = (props) => {
  const data = props.downloadData;

  console.log(data);

  const tranformData = (data) => {
    const transformedData = [];

    //Object Array
    data.forEach((record) => {
      const newObject = {};
      //Object
      Object.keys(record).forEach((key) => {
        if (key == "dates" || key == "payables" || key == "totals") {
          const dataObject = JSON.parse(record[key]);
          Object.keys(dataObject).forEach((keyLevel1) => {
            if (key == "payables") {
              const categories = dataObject[keyLevel1];
              Object.keys(categories).forEach((payItem) => {
                newObject[payItem] = newObject[categories[payItem]];
              });
            }
            newObject[keyLevel1] = dataObject[keyLevel1];
          });
        } else {
          newObject[key] = record[key];
        }
      });
      transformedData.push(newObject);
    });
    console.log("Transformed:", transformedData);
    return transformedData;
  };

  const jsonToCSV = (jsonData) => {
    if (jsonData != undefined) {
      const header = Object.keys(jsonData[0]).join(",") + "\n";
      const rows = jsonData
        .map((row) => Object.values(row).join(","))
        .join("\n");
      return header + rows;
    }
  };

  const download = (data) => {
    const transformed = tranformData(data);
    const csv = jsonToCSV(transformed);
    console.log(csv);
  };
};

export default DownloadData;
