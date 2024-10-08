import { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

import contributionTable from "../../../assets/calculation_table/contributions.json";
import TaxTable from "../../../assets/calculation_table/tax-table.json";
import { ToastContainer, toast } from "react-toastify";

// Components Import
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const RegularPayrun = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [datePeriod, setDatePeriod] = useState({
    From: null,
    To: null,
    Payment: null,
  });

  const [divisions, setDivisions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employeeList, setEmployeeList] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [payItems, setPayItems] = useState(null);
  const [payrollFrequency, setPayrollFrequency] = useState(null);
  const [contributions, setContributions] = useState({
    SSS: false,
    PHIC: false,
    HDMF: false,
  });

  const [processedData, setProcessedData] = useState([]);
  const [uploadButtonState, setUploadButtonState] = useState(false);
  const [uploadedData, setUploadedData] = useState();
  const emp_num = useRef();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("");
  const [draftedPayrun, setDraftedPayrun] = useState(false);

  useEffect(() => {
    checkDraftedPaylsip();
    getPayItems();
  }, []);

  useEffect(() => {
    fetchUserProfile();
    getPayItems();
  }, [employeeList]);

  useEffect(() => {
    if (uploadedData && uploadedData.length > 0) {
      updateRecords(employeeList, uploadedData);
    }
  }, [uploadedData]);

  const companyInfo = useRef({});
  function capitalizeWords(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const checkDraftedPaylsip = () => {
    axios.get(BASE_URL + "/mp-checkForDraftedPayslip").then((response) => {
      if (response && response.data.length > 0) {
        const filter1 = capitalizeWords(response.data[0].filter);
        let filter2 = capitalizeWords(response.data[0][filter1]);
        const dateFrom = response.data[0]["Date From"];
        const dateTo = response.data[0]["Date To"];
        const datePayment = response.data[0]["Date Payment"];

        Swal.fire({
          title: "Drafted Payrun Detected!",
          html: `
            <div class="text-left">
              ${filter1} : ${filter2} <br />
              Date Range: ${moment(dateFrom).format(
                "MMMM DD, YYYY"
              )} - ${moment(dateTo).format("MMMM DD, YYYY")} <br />
              Payment Date: ${moment(datePayment).format("MMMM DD, YYYY")}
            </div>
          `,
          showCancelButton: true,
          confirmButtonColor: "#666A40",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            setDraftedPayrun(true);
            processDraftData(response.data);
            getPayrollMonthlyFrequency();
          }
        });
      }
    });
  };

  const fetchUserProfile = () => {
    axios
      .get(BASE_URL + "/login")
      .then(function (response) {
        const rows = response.data;
        if (rows) {
          companyInfo.current = {
            company_id: rows.user[0].company_id,
            company_name: rows.user[0].company_name,
            company_address: rows.user[0].company_loc,
            company_logo: rows.user[0].company_logo,
            tin: rows.user[0].tin,
          };
          emp_num.current = rows.user[0].emp_num;
        }
      })
      .catch(function (error) {
        console.error("Error: ", error);
      });
  };

  const generateList = async () => {
    const employeeList = await getEmployeeList();
    if (employeeList.length > 0) {
      const frequency = await getPayrollMonthlyFrequency();
      const appendedList = appendPayItemsToEmployee(employeeList, payItems);
      setEmployeeList(computeContribution(appendedList, frequency));

      setUploadButtonState(true);
    } else {
      setEmployeeList([]);
      toast.error("No Record Found!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const computeContribution = (list, frequency) => {
    const selectedContributions = checkContributions();
    selectedContributions.forEach((contribution) => {
      list.forEach((employee) => {
        const contributionValue = compute(contribution, employee["Basic Pay"]);
        Object.entries(contributionValue).forEach(([key, value]) => {
          if (value != 0) {
            employee[key] = value;
          }
        });
      });
    });
    return list;
  };

  const compute = (contribution, value) => {
    switch (contribution) {
      case "SSS":
        return computation(contribution, value);
      case "PHIC":
        return computationWithFormula(contribution, value);
      case "HDMF":
        return computationWithFormula(contribution, value);
    }
  };

  const computation = (contributionName, value) => {
    for (const range of contributionTable[contributionName]) {
      if (value > range.min && (value <= range.max || range.max === null)) {
        if ((contributionName = "SSS")) {
          return {
            "SSS (EE)": (parseFloat(range.ee_contribution) * -1).toFixed(2),
            "SSS (ER)": parseFloat(range.er_contribution).toFixed(2),
            "SSS (ECC)": parseFloat(range.ecc_contribution).toFixed(2),
            "SSS Provident Fund (EE)": parseFloat(
              range.ee_provident_fund
            ).toFixed(2),
            "SSS Provident Fund (ER)": parseFloat(
              range.er_provident_fund
            ).toFixed(2),
          };
        }
      }
    }
    return 0;
  };

  const computationWithFormula = (contributionName, value) => {
    for (const range of contributionTable[contributionName]) {
      if (value > range.min && (value <= range.max || range.max === null)) {
        const computeEE = new Function("x", `return ${range.ee_contribution}`);
        const computeER = new Function("x", `return ${range.er_contribution}`);
        return {
          [`${contributionName} (EE)`]: (
            parseFloat(computeEE(value)) * -1
          ).toFixed(2),
          [`${contributionName} (ER)`]: parseFloat(computeER(value)).toFixed(2),
        };
      }
    }
    return 0;
  };

  const checkContributions = () => {
    const trueKeys = Object.keys(contributions).filter(
      (key) => contributions[key] === true
    );
    return trueKeys;
  };

  const getEmployeeList = async () => {
    try {
      const employees = await axios.get(
        BASE_URL + "/mp-getEmployeeUsingFilter",
        {
          params: {
            category: selectedCategory,
            option: selectedCategoryOption,
            payment: datePeriod.Payment,
            from: datePeriod.From,
            to: datePeriod.To,
          },
        }
      );
      return employees.data;
    } catch (err) {
      console.error(err);
    }
  };

  const getPayItems = async () => {
    try {
      const payItems = await axios.get(BASE_URL + "/mp-getPayItem");
      setPayItems(payItems.data);
      getTypes(payItems.data);
      return payItems.data;
    } catch (err) {
      console.error(err);
    }
  };

  const getPayrollMonthlyFrequency = async () => {
    try {
      const configuration_name = "Monthly Payroll Frequency";
      const response = await axios.get(
        BASE_URL + `/comp-config-GetCompanyConfiguration/${configuration_name}`
      );
      if (response.status === 200) {
        setPayrollFrequency(response.data[0].configuration_value);
        return response.data[0].configuration_value;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const appendPayItemsToEmployee = (employeeList, payItems) => {
    let transformedPayItems = payItems.reduce((acc, item) => {
      acc[item.pay_item_name] = 0;
      return acc;
    }, {});

    delete transformedPayItems["Basic Pay"];
    delete transformedPayItems["Absences"];
    delete transformedPayItems["Regular Holiday Premium Pay"];
    delete transformedPayItems["Special Holiday Premium Pay"];
    // Append the transformed pay items data to each employee
    employeeList.forEach((employee) => {
      employee["Hire Date"] = moment(employee["Hire Date"]).format(
        "MMMM DD, YYYY"
      );
      if (employee["Basic Pay"] == null) {
        employee["Basic Pay"] = 0;
      }
      if (employee["Absences"] == null) {
        employee["Absences"] = 0;
      }
      if (employee["Regular Holiday Premium Pay"] == null) {
        employee["Regular Holiday Premium Pay"] = 0;
      }
      if (employee["Special Holiday Premium Pay"] == null) {
        employee["Special Holiday Premium Pay"] = 0;
      }
      Object.assign(employee, transformedPayItems);
    });
    return employeeList;
  };

  const getTypes = (payItems) => {
    const data = [...new Set(payItems.map((item) => item["pay_item_type"]))];
  };

  const getCheckedRecords = (data) => {
    return data.filter((_, index) => selectedEmployees[index]);
  };

  const step2NextClick = (employeeList, payItems, payrollFrequency) => {
    setProcessedData(
      taxWithheldComputation(employeeList, payItems, payrollFrequency)
    );
    document.getElementById("step-3").show();
  };

  const taxWithheldComputation = (employees, payItems, payrollFrequency) => {
    if (employees && payItems && payrollFrequency) {
      let taxables = payItems.filter(
        (payItem) => payItem.pay_item_group == "Taxable"
      );
      employees.forEach((employee) => {
        employee["Hire Date"] = moment(employee["Hire Date"]).format(
          "YYYY-MM-DD"
        );
        let preTaxValue = 0;
        taxables.forEach((taxable) => {
          preTaxValue =
            parseFloat(preTaxValue) +
            parseFloat(employee[taxable.pay_item_name]);
        });
        if (preTaxValue > 0) {
          const taxContribution = computeTax(
            preTaxValue * (12 * payrollFrequency),
            TaxTable["PH"]
          );
          employee["Tax Withheld"] = parseFloat(
            (taxContribution / (12 * payrollFrequency)) * -1
          ).toFixed(2);
        }
      });
      return getNetPay(employees);
    }
  };

  const getNetPay = (data) => {
    const categories = [
      ...new Set(payItems.map((item) => item.pay_item_category)),
    ];

    data.forEach((employee) => {
      let netPay = 0;
      categories.forEach((category) => {
        const payItemList = payItems.filter(
          (payItem) => payItem.pay_item_category === category
        );
        payItemList.forEach((payItem) => {
          if (
            employee[payItem.pay_item_name] !== undefined &&
            employee[payItem.pay_item_name] !== null
          ) {
            const value = parseFloat(employee[payItem.pay_item_name]) || 0;
            if (value !== 0) {
              if (
                !payItem.pay_item_name.includes("(ER)") &&
                !payItem.pay_item_name.includes("(ECC)")
              ) {
                netPay += value;
              }
            }
          }
        });
      });
      employee["Net Pay"] = netPay.toFixed(2);

      if (employee["Net Pay (PP-1)"] == 0) {
        employee["Net Pay (PP-1)"] = "N/A";
      }
      if (employee["Net Pay (PP-2)"] == 0) {
        employee["Net Pay (PP-2)"] = "N/A";
      }
      if (employee["Net Pay (PP-3)"] == 0) {
        employee["Net Pay (PP-3)"] = "N/A";
      }
    });
    return data;
  };

  function computeTax(value, taxTable) {
    let tax = 0;
    taxTable.forEach((taxBracket) => {
      if (
        value > taxBracket.min &&
        (value <= taxBracket.max || taxBracket.max === null)
      ) {
        const compute = new Function("x", `return ${taxBracket.formula}`);
        tax = compute(value);
      }
    });
    return tax;
  }

  const step3SaveAsDraftClick = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will save the data as draft.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#666A40",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save as Draft",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const processedRecords = processData(processedData, payItems, 1);
        const withCompany = appendCompany(processedRecords);
        const batches = splitToBatches(withCompany, 10);
        let currentBatch = 0;

        for (const batch of batches) {
          currentBatch += 1;
          await insertToDB(batch, currentBatch, batches.length);
        }
      }
    });
  };

  const step3FinalizeClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will save the data and generate the payslips.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#666A40",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save And Generate Payslips",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (draftedPayrun === true) {
          const deleteResult = await deleteDraftedData();
          if (deleteResult !== true) {
            return;
          }
        }

        const processedRecords = processData(processedData, payItems, 0);
        const withCompany = appendCompany(processedRecords);
        const batches = splitToBatches(withCompany, 10);
        let currentBatch = 0;
        batches.forEach((batch) => {
          currentBatch += 1;
          saveAndGeneratePDF(batch, currentBatch, batches.length);
        });
      }
    });
  };

  const processData = (employees, payItems, draft) => {
    const categories = [
      ...new Set(payItems.map((item) => item.pay_item_category)),
    ];

    employees.forEach((employee) => {
      const categoryTotal = {};
      const payables = {};
      let netPay = 0;

      categories.forEach((category) => {
        categoryTotal[category] = 0.0;
        const categoryObject = {};

        const payItemList = payItems.filter(
          (payItem) => payItem.pay_item_category === category
        );

        payItemList.forEach((payItem) => {
          if (
            employee[payItem.pay_item_name] !== undefined &&
            employee[payItem.pay_item_name] !== null
          ) {
            const value = parseFloat(employee[payItem.pay_item_name]) || 0;
            if (value !== 0) {
              if (
                !payItem.pay_item_name.includes("(ER)") &&
                !payItem.pay_item_name.includes("(ECC)")
              ) {
                categoryObject[payItem.pay_item_name] = value;
                categoryTotal[category] += value;
                netPay += value;
              }
            } else {
              categoryObject[payItem.pay_item_name] = 0;
            }

            delete employee[payItem.pay_item_name];
          } else {
            categoryObject[payItem.pay_item_name] = 0;
          }
        });

        payables[category] = categoryObject;
      });
      employee["Pay Items"] = payables;
      employee["Totals"] = categoryTotal;
      employee["Net Pay"] = netPay;
      employee["Dates"] = datePeriod;
      employee["Filter"] = selectedCategory;
      employee["Filter ID"] = selectedCategoryOption;
      employee["Draft"] = draft;

      if (employee["Net Pay (PP-1)"] == "N/A") {
        employee["Net Pay (PP-1)"] = 0.0;
      }
      if (employee["Net Pay (PP-2)"] == "N/A") {
        employee["Net Pay (PP-2)"] = 0.0;
      }
      if (employee["Net Pay (PP-3)"] == "N/A") {
        employee["Net Pay (PP-3)"] = 0.0;
      }
    });

    return employees;
  };

  const splitToBatches = (array, batchSize) => {
    const batches = [];
    for (let i = 0; i < array.length; i += batchSize) {
      const batch = array.slice(i, i + batchSize);
      batches.push(batch);
    }
    return batches;
  };

  const appendCompany = (data) => {
    const appended = data.map((i) => ({
      ...i,
      companyInfo: companyInfo.current,
      companyID: companyInfo.current.company_id,
      companyLogo: companyInfo.current.company_logo,
      generated_by: emp_num.current,
    }));
    return appended;
  };

  const saveAndGeneratePDF = async (data, currentBatch, totalBatch) => {
    const batchData = data;
    const batchNum = currentBatch;
    const batchTotal = totalBatch;

    const insertDBResponse = await insertToDB(batchData, batchNum, batchTotal);

    if (insertDBResponse.status === 200) {
      await generatePDF(removeZeroValues(batchData), batchNum, batchTotal);
      return;
    }
  };

  const insertToDB = async (data, currentBatch, totalBatch) => {
    try {
      const responsePromise = axios.post(
        `${BASE_URL}/mp-createPayslip/${"Regular Payrun"}`,
        data
      );

      // Pass the promise to toast.promise
      toast.promise(responsePromise, {
        pending: {
          render: `Saving To Database... ${currentBatch}/${totalBatch}`,
          className: "pending",
          onOpen: () => {
            document.getElementById("step-3-save-draft").disabled = true;
            document.getElementById("step-3-finalize").disabled = true;
          },
        },
        success: {
          render: ({ data }) =>
            `Data has been saved to the database! ${currentBatch}/${totalBatch}`,
          className: "success",
          autoClose: 3000,
          onClose: () => {
            document.getElementById("step-3-save-draft").disabled = false;
            document.getElementById("step-3-finalize").disabled = false;
          },
        },
        error: {
          render: ({ data }) => `Something Went Wrong! Error: ${data.message}`,
          autoClose: 5000,
          onClose: () => {
            document.getElementById("step-3-save-draft").disabled = false;
            document.getElementById("step-3-finalize").disabled = false;
          },
          onOpen: () => {
            console.error("Error toast opened");
          },
        },
      });

      // Await the promise to handle further actions if needed
      const response = await responsePromise;
      return response;
    } catch (err) {
      console.error(err);
      toast.error(`Something Went Wrong! Error: ${err.message}`, {
        autoClose: 3000,
      });

      document.getElementById("step-3-save-draft").disabled = false;
      document.getElementById("step-3-finalize").disabled = false;
    }
  };

  const deleteDraftedData = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/mp-deleteDraftedPayslips`
      );
      return response.status === 200;
    } catch (err) {
      console.error("Error:", err);
      return false;
    }
  };

  const removeZeroValues = (data) => {
    return data.map((employee) => {
      const updatedPayItems = {};

      for (const [category, items] of Object.entries(employee["Pay Items"])) {
        if (employee["Totals"][category] !== "0.00") {
          updatedPayItems[category] = {};

          for (const [item, value] of Object.entries(items)) {
            if (parseFloat(value) !== 0) {
              updatedPayItems[category][item] = value;
            }
          }
        }
      }

      return {
        ...employee,
        "Pay Items": updatedPayItems,
      };
    });
  };

  const generatePDF = async (data, currentBatch, totalBatch) => {
    try {
      toast.promise(
        axios.post(
          "https://pdf-generation-test.onrender.com/generate-and-send",
          data
        ),
        {
          pending: {
            render: `Generating And Sending Payslips... ${currentBatch}/${totalBatch}`,
            className: "pending",
            onOpen: () => {},
          },
          success: {
            render: `Payslips has been generated and sent! ${currentBatch}/${totalBatch}`,
            className: "success",
            autoClose: 3000,
            onClose: () => {
              document.getElementById("step-3-save-draft").disabled = false;
              document.getElementById("step-3-finalize").disabled = false;
            },
          },
          error: {
            render: "Something Went Wrong!",
            autoClose: 5000,
            onClose: () => {
              document.getElementById("step-3-save-draft").disabled = false;
              document.getElementById("step-3-finalize").disabled = false;
            },
          },
        }
      );
    } catch (err) {
      console.error(err);
      toast.error(`Something Went Wrong! Error: ${err}`, { autoClose: 3000 });
    }
  };

  const updateRecords = (originalRecord, uploadedRecord) => {
    const existingEmails = new Set(
      originalRecord.map((record) => record["Email"])
    );

    const missingEmails = uploadedRecord
      .map((update) => update["Email"])
      .filter((email) => !existingEmails.has(email));

    if (missingEmails.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `The following email/s doesn't exist in the records: ${missingEmails}`,
      });

      return;
    }
    const updatesEmail = uploadedRecord.map((item) => item["Email"]);

    originalRecord.forEach((record) => {
      if (updatesEmail.includes(record["Email"])) {
        const update = uploadedRecord.find(
          (item) => item["Email"] === record["Email"]
        );
        Object.keys(update).forEach((key) => {
          if (key !== "Email") {
            record[key] = update[key];
          }
        });
      }
    });
    setEmployeeList(originalRecord);
  };

  const processDraftData = (data) => {
    data.forEach((item) => {
      item.payables = JSON.parse(item.payables);
      item.totals = JSON.parse(item.totals);
    });
    const flattenedData = flattenArray(data);

    setSelectedCategory(data[0]["filter"]);
    setSelectedCategoryOption(data[0]["filter_id"]);

    setDatePeriod({
      From: moment(flattenedData[0]["Date From"]).format("YYYY-MM-DD"),
      To: moment(flattenedData[0]["Date To"]).format("YYYY-MM-DD"),
      Payment: moment(flattenedData[0]["Date Payment"]).format("YYYY-MM-DD"),
    });

    setEmployeeList(flattenedData);
  };

  const flattenArray = (arr) => {
    return arr.map((item) => {
      const flattenedObject = flattenObject(item);
      delete flattenedObject["id"];
      delete flattenedObject["dept_name"];
      delete flattenedObject["generated_by"];
      delete flattenedObject["source"];
      delete flattenedObject["draft"];
      delete flattenedObject["filter"];
      delete flattenedObject["filter_id"];
      delete flattenedObject["created_at"];
      delete flattenedObject["Taxes"];
      delete flattenedObject["Earnings"];
      delete flattenedObject["Deductions"];
      delete flattenedObject["Net Salary"];
      return flattenedObject;
    });
  };

  function flattenObject(obj, parentKey = "", result = {}) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = key;

        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          flattenObject(obj[key], newKey, result);
        } else {
          result[newKey] = obj[key];
        }
      }
    }
    return result;
  }

  return (
    <>
      <ToastContainer />
      <div className="mt-10">
        <Step1
          datePeriod={datePeriod}
          setDatePeriod={setDatePeriod}
          setContributions={setContributions}
          divisions={divisions}
          setDivisions={setDivisions}
          departments={departments}
          setDepartments={setDepartments}
          generateList={generateList}
          uploadButtonState={uploadButtonState}
          payItems={payItems}
          setUploadedData={setUploadedData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCategoryOption={selectedCategoryOption}
          setSelectedCategoryOption={setSelectedCategoryOption}
          draft={draftedPayrun}
        />
        <Step2
          employeeList={employeeList}
          setEmployeeList={setEmployeeList}
          payItems={payItems}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
          nextClick={() =>
            step2NextClick(
              getCheckedRecords(employeeList),
              payItems,
              payrollFrequency
            )
          }
        />
        <Step3
          employeeRecords={processedData}
          draftClick={step3SaveAsDraftClick}
          finalizeClick={step3FinalizeClick}
          payItems={payItems}
          draft={draftedPayrun}
        />
      </div>
    </>
  );
};

export default RegularPayrun;
