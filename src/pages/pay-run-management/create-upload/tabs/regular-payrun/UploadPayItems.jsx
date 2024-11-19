import { useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const UploadPayItems = ({ uploadButtonState, payItems, setUploadedData }) => {
  useEffect(() => {
    setUploadedData([]);
  }, []);
  const uploadFile = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const payItemsList = payItems.map((payItem) => payItem.pay_item_name);
    payItemsList.push("Employee ID");
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
      let notIncluded = [];

      headers.forEach((header) => {
        if (!payItemsList.includes(header)) {
          notIncluded.push(header);
        }
      });

      if (notIncluded.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Headers not found in Pay Items. Remove the following columns:  ${notIncluded}.`,
        });
      } else {
        const duplicates = findDuplicateEmpID(normalizedData);
        if (duplicates.length > 0) {
          Swal.fire({
            icon: "error",
            title: "Duplicate Employee IDs",
            text: `Duplicated Employee IDs:  ${duplicates}.`,
          });
        } else {
          setUploadedData(normalizedData);
        }
      }
    };
  };

  function findDuplicateEmpID(array) {
    const empIDSet = new Set();
    const duplicates = [];

    for (const item of array) {
      const empID = item["Employee ID"];
      if (empIDSet.has(empID)) {
        // Collect duplicate Employee ID
        duplicates.push(empID);
      } else {
        empIDSet.add(empID);
      }
    }
    return duplicates;
  }

  return (
    <>
      <label
        htmlFor="uploadFile"
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
        />
      </label>
    </>
  );
};

export default UploadPayItems;
