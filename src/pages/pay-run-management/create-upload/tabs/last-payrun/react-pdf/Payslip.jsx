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
import fullsuiteLogo from "../../../../assets/fullsuite-logo.png";
import { addCommaAndFormatDecimal } from "../../../../assets/addCommaAndFormatDecimal";

Font.register({
  family: "Inter",
  fonts: [
    { src: InterRegular, fontWeight: "normal" },
    { src: InterSemiBold, fontWeight: "semibold" },
    { src: InterBold, fontWeight: "bold" },
  ],
});

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
    textAlign: "center",
  },
  company_info_name: {
    alignSelf: "center",
    marginBottom: 15,
    width: 60,
    fontWeight: "semibold",
  },
  company_info_tin: {
    alignSelf: "center",
    marginBottom: 15,
  },
  company_info_address: {
    alignSelf: "center",
    marginBottom: 15,
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

const Payslip = ({
  payslipInformation,
  unprocessedPayables,
  groupTotals,
  netBeforeTaxes,
  netPayEarnings,
}) => {
  console.log(
    "Parameters: ",
    payslipInformation,
    unprocessedPayables,
    groupTotals,
    netBeforeTaxes,
    netPayEarnings
  );
  const [payslipInfo, setPayslipInfo] = useState(payslipInformation);
  const [unprocessedPay, setUnprocessedPay] = useState(unprocessedPayables);
  const [groupTotal, setGroupTotal] = useState([]);
  const [netPayBeforeTax, setNetPayBeforeTax] = useState({
    lastPay: 0,
    ytdGroup: 0,
  });
  const [netPayEarning, setNetPayEarning] = useState({
    lastPay: 0,
    ytdGroup: 0,
  });

  useEffect(() => {
    setPayslipInfo(payslipInformation);
    setUnprocessedPay(unprocessedPayables);
    setGroupTotal(groupTotals);
    setNetPayBeforeTax(netBeforeTaxes);
    setNetPayEarning(netPayEarnings);
  }, [
    payslipInformation,
    unprocessedPayables,
    groupTotals,
    netBeforeTaxes,
    netPayEarnings,
  ]);

  const calculateGroupTotal = (data) => {
    const netPay = { lastPay: 0, ytdGroup: 0 };
    const groups = [...new Set(data.map((obj) => obj["pay_item_group"]))];

    const totals = groups.map((group) => {
      const newGroup = data.filter(
        (payItem) => payItem.pay_item_group === group
      );
      const lastPayGroup = newGroup.reduce(
        (sum, item) => sum + parseFloat(item.last_pay_amount),
        0
      );
      const ytdGroup = newGroup.reduce(
        (sum, item) =>
          sum + parseFloat(item.last_pay_amount) + parseFloat(item.ytd_amount),
        0
      );
      netPay.lastPay += lastPayGroup;
      netPay.ytdGroup += ytdGroup;
      return {
        name: group,
        lastPay: lastPayGroup,
        ytdGroup: ytdGroup,
      };
    });

    setGroupTotal(totals);
    setNetPayEarning(netPay);
    calculateNetBeforeTax(totals);
  };

  const calculateNetBeforeTax = (data) => {
    const netBeforeTax = { lastPay: 0, ytdGroup: 0 };
    data.forEach((group) => {
      if (
        ["Taxable", "Non-Taxable", "Pre-Tax Deduction"].includes(group.name)
      ) {
        netBeforeTax.lastPay += group.lastPay;
        netBeforeTax.ytdGroup += group.lastPay;
      }
    });
    setNetPayBeforeTax(netBeforeTax);
  };

  const renderTaxes = (data) => {
    const filteredData = data.filter(
      (payItem) => payItem.pay_item_group === "Taxes"
    );

    if (!filteredData.length) return null;

    const groupData = groupTotal.find((g) => g.name === "Taxes");

    if (!groupData || (groupData.lastPay === 0 && groupData.ytdGroup === 0))
      return null;

    return (
      <View style={{ width: "100%", flexDirection: "column" }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            backgroundColor: "#E6E7DD",
          }}
        >
          <View style={{ width: "100%", padding: 5, fontWeight: "semibold" }}>
            <Text>Taxes</Text>
          </View>
        </View>

        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={{ width: "50%", padding: 5 }}>
            <Text>Withheld Taxes During The Year </Text>
          </View>
          <View style={{ width: "25%", padding: 5, textAlign: "right" }}>
            <Text></Text>
          </View>
          {unprocessedPay
            .filter((payItem) => payItem.pay_item_name === "Tax Withheld")
            .map((payItem, index) => (
              <View
                key={index}
                style={{ width: "25%", padding: 5, textAlign: "right" }}
              >
                <Text>
                  {addCommaAndFormatDecimal(Math.abs(payItem.ytd_amount))}
                </Text>
              </View>
            ))}
        </View>

        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={{ width: "50%", padding: 5, fontWeight: "semibold" }}>
            <Text>Tax Due</Text>
          </View>
          <View style={{ width: "25%", padding: 5, textAlign: "right" }}>
            <Text></Text>
          </View>
          {unprocessedPay
            .filter((payItem) => payItem.pay_item_name === "Tax Withheld")
            .map((payItem, index) => (
              <View
                key={index}
                style={{ width: "25%", padding: 5, textAlign: "right" }}
              >
                <Text>
                  {addCommaAndFormatDecimal(Math.abs(payItem.last_pay_amount))}
                </Text>
              </View>
            ))}
        </View>

        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={{ width: "50%", padding: 5 }}>
            <Text>Tax Refund (Tax Payable)</Text>
          </View>
          {unprocessedPay
            .filter((payItem) => payItem.pay_item_name === "Tax Withheld")
            .map((payItem, index) => (
              <View
                key={index}
                style={{ width: "25%", padding: 5, textAlign: "right" }}
              >
                <Text>
                  {addCommaAndFormatDecimal(
                    Math.abs(payItem.ytd_amount) -
                      Math.abs(payItem.last_pay_amount)
                  )}
                </Text>
              </View>
            ))}
          {unprocessedPay
            .filter((payItem) => payItem.pay_item_name === "Tax Withheld")
            .map((payItem, index) => (
              <View
                key={index}
                style={{ width: "25%", padding: 5, textAlign: "right" }}
              >
                <Text>
                  {addCommaAndFormatDecimal(
                    Math.abs(payItem.ytd_amount) -
                      Math.abs(payItem.last_pay_amount)
                  )}
                </Text>
              </View>
            ))}
        </View>
      </View>
    );
  };
  const renderPayItems = (group, data) => {
    const filteredData = data.filter(
      (payItem) => payItem.pay_item_group === group && payItem.visible === true
    );

    if (!filteredData.length) return null;

    const groupData = groupTotal.find((g) => g.name === group);

    if (!groupData || (groupData.lastPay === 0 && groupData.ytdGroup === 0))
      return null;
    return (
      <View key={group} style={{ width: "100%", flexDirection: "column" }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            backgroundColor: "#E6E7DD",
          }}
        >
          <View style={{ width: "50%", padding: 5 }}>
            <Text>{group}</Text>
          </View>
          <View style={{ width: "25%", padding: 5, textAlign: "right" }}>
            <Text>{addCommaAndFormatDecimal(groupData.lastPay)}</Text>
          </View>
          <View style={{ width: "25%", padding: 5, textAlign: "right" }}>
            <Text>{addCommaAndFormatDecimal(groupData.ytdGroup)}</Text>
          </View>
        </View>

        {filteredData.map((item, index) => (
          <View key={index} style={{ width: "100%", flexDirection: "row" }}>
            <View style={{ width: "50%", padding: 5 }}>
              <Text>{item.pay_item_name}</Text>
            </View>
            <View style={{ width: "25%", padding: 5, textAlign: "right" }}>
              <Text>
                {addCommaAndFormatDecimal(parseFloat(item.last_pay_amount))}
              </Text>
            </View>
            <View style={{ width: "25%", padding: 5, textAlign: "right" }}>
              <Text>
                {addCommaAndFormatDecimal(
                  parseFloat(item.last_pay_amount) + parseFloat(item.ytd_amount)
                )}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.company_info_section}>
          <Image style={styles.logo} src={fullsuiteLogo} />
          <Text style={styles.company_info_name}>
            {payslipInfo["Company Name"]}
          </Text>
          <Text style={styles.company_info_address}>
            {payslipInfo["Company Address"]}
          </Text>
        </View>

        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            paddingVertical: 20,
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
              <Text>
                {moment(payslipInfo["Hire Date"]).format("MMM. DD, YYYY")}
              </Text>
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

        <View style={{ width: "100%", flexDirection: "column" }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              backgroundColor: "#666A40",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
          >
            <View style={{ width: "50%", padding: 5 }}>
              <Text>Last Payrun Calculation</Text>
            </View>
            <View style={{ width: "25%", padding: 5 }}>
              <Text>Last Pay</Text>
            </View>
            <View style={{ width: "25%", padding: 5 }}>
              <Text>Total Earnings</Text>
            </View>
          </View>
        </View>

        {["Taxable", "Non-Taxable", "Pre-Tax Deduction"].map((group) =>
          renderPayItems(group, unprocessedPay)
        )}
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            backgroundColor: "#666A40",
            color: "#FFFFFF",
          }}
        >
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={{ width: "50%", padding: 5 }}>
              <Text>Net Pay Before Tax Deduction</Text>
            </View>
            <View style={{ width: "25%", padding: 5, textAlign: "right" }}>
              <Text>{addCommaAndFormatDecimal(netBeforeTaxes.netLastPay)}</Text>
            </View>
            <View style={{ width: "25%", padding: 5, textAlign: "right" }}>
              <Text>
                {addCommaAndFormatDecimal(netBeforeTaxes.totalBeforeTax)}
              </Text>
            </View>
          </View>
        </View>

        {renderTaxes(unprocessedPay)}
        {["Post-Tax Deduction", "Post-Tax Addition"].map((group) =>
          renderPayItems(group, unprocessedPay)
        )}

        <View
          style={{
            width: "100%",
            flexDirection: "column",
            backgroundColor: "#666A40",
            color: "#FFFFFF",
          }}
        >
          <View
            style={{ width: "100%", flexDirection: "row", fontWeight: "bold" }}
          >
            <View style={{ width: "50%", padding: 5 }}>
              <Text>NET PAY EARNINGS</Text>
            </View>
            <View style={{ width: "25%", padding: 5, textAlign: "right" }}>
              <Text>{addCommaAndFormatDecimal(netPayEarnings.lastPayNet)}</Text>
            </View>
            <View style={{ width: "25%", padding: 5, textAlign: "right" }}>
              <Text>{addCommaAndFormatDecimal(netPayEarnings.totalNet)}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>This is a system generated payslip.</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Payslip;
