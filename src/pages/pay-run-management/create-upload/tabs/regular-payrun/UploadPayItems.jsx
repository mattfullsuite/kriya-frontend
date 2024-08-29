import { useEffect, useRef } from "react";
import * as XLSX from "xlsx";

const UploadPayItems = ({ uploadButtonState, payItems, setUploadedData }) => {
  const uploadFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    let fileName = file.name;

    reader.readAsBinaryString(file);
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        raw: true,
        defval: null,
      });

      // Replace null values with 0
      const normalizedData = parsedData.map((row) => {
        const normalizedRow = {};
        for (let key in row) {
          normalizedRow[key] = row[key] === null ? 0 : row[key];
        }
        return normalizedRow;
      });

      const headers = Object.keys(normalizedData[0]);
      console.log("Headers: ", headers);
      //   const differences = checkIfHeadersExist(
      //     requiredInformation.current,
      //     headers
      //   );
    };
  };

  return (
    <>
      <label
        // ref={buttonUpload}
        htmlFor="uploadFile"
        // className="btn bg-[#666A40] mt-auto shadow-md w-48 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto"

        className={
          uploadButtonState
            ? "btn bg-[#666A40] mt-auto shadow-md w-48 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto"
            : "btn btn-disabled w-48 ml-auto"
        }
      >
        Upload Pay Items
        <input
          type="file"
          accept=".xlsx, .csv"
          className=" hidden"
          id="uploadFile"
          onChange={(e) => {
            uploadFile(e);
          }}
          // disabled={!buttonUpload}
        />
      </label>
    </>
  );
};

export default UploadPayItems;
