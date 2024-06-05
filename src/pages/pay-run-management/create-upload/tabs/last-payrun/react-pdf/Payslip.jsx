import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
    fontSize: 12,
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    alignSelf: "center",
    marginBottom: 10,
    height: 50,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    width: "100%",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  cell: {
    flex: 1,
    padding: 5,
  },
  rightAlign: {
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#000",
    borderTopStyle: "solid",
    paddingTop: 5,
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    fontSize: 10,
  },
});

// Create Document Component
const Payslip = ({ payslipInformation }) => {
  const companyInfoInitial = {
    name: "Company Name",
    logo: "",
    tin: "TIN",
    address: "Address",
  };

  const [companyInfo, setCompanyInfo] = useState(companyInfoInitial);
  const [payslipInfo, setPayslipInfo] = useState(payslipInformation);

  useEffect(() => {
    setPayslipInfo(payslipInformation);
  }, [payslipInformation]);

  const addCommaAndFormatDecimal = (num) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {/* <Image style={styles.logo} src={companyInfo.logo} /> */}
          <Text>{companyInfo.name}</Text>
          <Text>{companyInfo.tin}</Text>
          <Text>{companyInfo.address}</Text>
        </View>

        <Text style={{ textAlign: "center", fontSize: 24, marginVertical: 20 }}>
          Payslip
        </Text>

        <View style={styles.section}>
          <Text>{payslipInfo["Employee ID"]}</Text>
          <Text>
            {payslipInfo["First Name"]} {payslipInfo["Middle Name"]}{" "}
            {payslipInfo["Last Name"]}
          </Text>
          <Text>{payslipInfo["Job Title"]}</Text>
          <Text>Hire Date: {payslipInfo["Hire Date"]}</Text>
          <Text>
            Pay Period:{" "}
            {moment(payslipInfo["Dates"]["From"]).format("MMM. DD, YYYY")} to{" "}
            {moment(payslipInfo["Dates"]["To"]).format("MMM. DD, YYYY")}
          </Text>
          <Text>
            Pay Day:{" "}
            {moment(payslipInfo["Dates"]["Payment"]).format("MMM. DD, YYYY")}
          </Text>
        </View>

        <View style={styles.table}>
          {Object.entries(payslipInfo["Pay Items"]).map(
            ([categoryName, payables]) => (
              <View key={categoryName}>
                <View style={styles.row}>
                  <Text style={styles.cell}>{categoryName}</Text>
                  <Text style={styles.cell}></Text>
                  <Text style={[styles.cell, styles.rightAlign]}>Amount</Text>
                </View>
                {Object.entries(payables).map(
                  ([payableName, payItem]) =>
                    payItem !== 0 && (
                      <View key={payableName} style={styles.row}>
                        <Text style={styles.cell}>{payableName}</Text>
                        <Text style={styles.cell}></Text>
                        <Text style={[styles.cell, styles.rightAlign]}>
                          {addCommaAndFormatDecimal(parseFloat(payItem))}
                        </Text>
                      </View>
                    )
                )}
                <View style={styles.totalRow}>
                  <Text style={styles.cell}>Total {categoryName}:</Text>
                  <Text style={styles.cell}></Text>
                  <Text style={[styles.cell, styles.rightAlign]}>
                    {addCommaAndFormatDecimal(
                      parseFloat(payslipInfo["Totals"][categoryName])
                    )}
                  </Text>
                </View>
              </View>
            )
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Take Home Pay:{" "}
            {addCommaAndFormatDecimal(parseFloat(payslipInfo["Net Pay"]))}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>This is a system generated payslip.</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Payslip;
