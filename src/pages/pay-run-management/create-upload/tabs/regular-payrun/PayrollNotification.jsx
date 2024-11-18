import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { checkHeaders } from "./process/PayrollNotification";

const PayrollNotification = ({
  buttonPayrollNotifState,
  setUploadedPayrollNotif,
  payItems,
  setAdditionalPayItem,
}) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    setUploadedPayrollNotif([]);
  }, []);

  const uploadPayrollNotif = (e) => {
    if (!e.target.files[0]) {
      return;
    }

    const requiredHeaders = [
      "Employee ID",
      "Night Differential (Hours)",
      "Absences (Days)",
      "Undertime/Tardiness (Hours)",
      "Special Holiday (Hours)",
      "Regular Holiday (Hours)",
      "Regular OT (Hours)",
      "Special Holiday OT (Hours)",
      "Regular Holiday OT (Hours)",
      "Rest Day OT (Hours)",
      "PTO Conversion (Days)",
    ];

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
      const {
        requiredHeaders: missingRequiredHeaders,
        payItems: missingPayItems,
        additionalPayItem,
      } = checkHeaders(headers, payItems);
      setAdditionalPayItem(additionalPayItem);
      if (missingRequiredHeaders.length === 0 && missingPayItems.length === 0) {
        setUploadedPayrollNotif(normalizedData);
        toast.success("File Upload Successfully!", { autoClose: 3000 });
      } else {
        const missingRequiredHeadersList =
          missingRequiredHeaders.length > 0
            ? `<strong>Missing Required Headers:</strong><br>${missingRequiredHeaders.join(
                "<br>"
              )}`
            : "";

        const missingPayItemsList =
          missingPayItems.length > 0
            ? `<strong>Header Doesn't Exist in Pay Items:</strong><br>${missingPayItems.join(
                "<br>"
              )}`
            : "";

        const htmlContent = [missingRequiredHeadersList, missingPayItemsList]
          .filter(Boolean) // Removes any empty sections if both categories aren’t missing anything
          .join("<br><br>"); // Adds spacing between the two sections if both exist

        Swal.fire({
          icon: "error",
          title: "File Upload Failed!",
          html: htmlContent,
          showConfirmButton: true,
          confirmButtonText: "Close",
          timer: 20000,
        });
      }

      setKey((prevKey) => prevKey + 1);
    };
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
