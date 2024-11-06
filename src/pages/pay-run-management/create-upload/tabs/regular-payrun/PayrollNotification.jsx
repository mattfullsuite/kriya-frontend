import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PayrollNotification = ({
  buttonPayrollNotifState,
  setUploadedPayrollNotif,
}) => {
  const [key, setKey] = useState(0);
  const [dataTable, setDataTable] = useState([]); // Uploaded Spreadsheet  Data
  useEffect(() => {
    setUploadedPayrollNotif([]);
  }, []);

  const uploadPayrollNotif = (e) => {
    console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      return;
    }

    const reader = new FileReader();
    const file = e.target.files[0];
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
      console.log("Heasers", headers);
      const differences = checkIfHeadersExist(requiredHeaders, headers);

      if (differences.length === 0) {
        setUploadedPayrollNotif(normalizedData);
        toast.success("File Upload Successfully!", { autoClose: 3000 });
      } else {
        Swal.fire({
          icon: "error",
          title: "File Upload Failed! ",
          html:
            "<strong>" +
            "Missing Columns!" +
            "</strong>" +
            "<br />" +
            "<br />" +
            differences.join("<br />"),
          showConfirmButton: false,
          timer: 20000,
        });
        // setDataTable([]);
      }

      setKey((prevKey) => prevKey + 1);
    };
  };

  const checkIfHeadersExist = (requiredHeaders, headers) => {
    const sortedPayItems = requiredHeaders.sort();
    const sortedHeaders = headers.sort();
    const difference = [];
    for (let i = 0; i < sortedPayItems.length; i++) {
      if (!sortedHeaders.includes(sortedPayItems[i])) {
        difference.push(sortedPayItems[i]);
      }
    }
    return difference;
  };

  return (
    <>
      <label
        htmlFor="uploadPayrollNotif"
        className={
          buttonPayrollNotifState
            ? "btn bg-[#666A40] mt-auto shadow-md w-48 text-white hover:bg-[#666A40] hover:opacity-80 ml-auto"
            : "btn btn-disabled w-48 ml-auto"
        }
      >
        Payroll Notification
        <input
          key={key}
          name="csvFile"
          type="file"
          accept=".xlsx, .csv"
          className=" hidden"
          id="uploadPayrollNotif"
          onChange={(e) => {
            uploadPayrollNotif(e);
          }}
        />
      </label>
    </>
  );
};

export default PayrollNotification;
