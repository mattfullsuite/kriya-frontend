import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import moment from "moment";

import InterRegular from "../../../../assets/fonts/Inter-Regular.ttf";
import InterSemiBold from "../../../../assets/fonts/Inter-SemiBold.ttf";
import InterBold from "../../../../assets/fonts/Inter-Bold.ttf";
Font.register({
  family: "Inter",
  fonts: [
    { src: InterRegular, fontWeight: "normal" },
    { src: InterSemiBold, fontWeight: "semibold" },
    { src: InterBold, fontWeight: "bold" },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    fontSize: 12,
    backgroundColor: "#fff",
    fontFamily: "Inter",
  },
  company_info_section: {
    width: "100%",
    border: "solid",
    textAlign: "center",
    marginBottom: 20,
  },
  company_info_name: {
    alignSelf: "center",
    marginBottom: 20,
    width: 60,
    fontWeight: "semibold",
  },
  company_info_tin: {
    alignSelf: "center",
    marginBottom: 20,
  },
  company_info_address: {
    alignSelf: "center",
    marginBottom: 20,
    width: 350,
  },
  logo: {
    alignSelf: "center",
    marginBottom: 10,
    height: 50,
  },
  employee_info_section: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  employee_info: {
    width: "48%",
  },
  employee_info_dates: {
    width: "48%",
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
  cell_header: {
    flex: 1,
    padding: 5,
    fontWeight: "bold",
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
    fontSize: 12,
  },
});

// Create Document Component
const Payslip = ({ payslipInformation }) => {
  const [payslipInfo, setPayslipInfo] = useState(payslipInformation);

  useEffect(() => {
    setPayslipInfo(payslipInformation);
    console.log(payslipInformation);
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
        <View style={styles.company_info_section}>
          {/* <Image style={styles.logo} src={payslipInfo.logo} /> */}
          <Text style={styles.company_info_name}>
            {payslipInfo["Company Name"]}
          </Text>
          {/* <Text style={styles.company_info_tin}>
            {payslipInfo.company_info_tin}
          </Text> */}
          <Text style={styles.company_info_address}>
            {payslipInfo["Company Address"]}
          </Text>
        </View>

        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            marginVertical: 20,
            fontWeight: "bold",
          }}
        >
          Payslip
        </Text>

        <View style={styles.employee_info_section}>
          <View style={styles.employee_info}>
            <Text>{payslipInfo["Employee ID"]}</Text>
            <Text>
              {payslipInfo["First Name"]} {payslipInfo["Middle Name"]}{" "}
              {payslipInfo["Last Name"]}
            </Text>
            <Text>{payslipInfo["Job Title"]}</Text>
          </View>
          <View style={styles.employee_info_dates}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Hire Date: </Text>
              <Text> {payslipInfo["Hire Date"]}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Pay Period: </Text>
              <Text>
                {moment(payslipInfo["Dates"]["From"]).format("MMM. DD, YYYY")}{" "}
                to {moment(payslipInfo["Dates"]["To"]).format("MMM. DD, YYYY")}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Pay Day: </Text>
              <Text>
                {moment(payslipInfo["Dates"]["Payment"]).format(
                  "MMM. DD, YYYY"
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          {Object.entries(payslipInfo["Pay Items"]).map(
            ([categoryName, payables]) => (
              <View key={categoryName}>
                <View style={styles.row}>
                  <Text style={styles.cell_header}>{categoryName}</Text>
                  <Text style={styles.cell_header}></Text>
                  <Text style={[styles.cell_header, styles.rightAlign]}>
                    Amount
                  </Text>
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
