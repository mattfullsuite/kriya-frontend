import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Font,
  StyleSheet,
  Image,
  Link,
  PDFViewer,
} from "@react-pdf/renderer";
import moment from "moment";

const MemoDocument = ({ formData }) => {
  Font.register({
    family: "Roboto",
    src: "https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
  });

  Font.register({
    family: "Roboto Mono",
    src: "https://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vqPQ--5Ip2sSQ.ttf",
  });

  Font.register({
    family: "Roboto Bold",
    src: "https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
  });

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-around",
      height: 65,
      width: 595,
    },
    image: {
      marginVertical: 15,
      width: 150,
      height: 42,
    },
    section: {
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    headerText: {
      display: "flex",
      alignSelf: "flex-end",
      fontSize: 8,
      fontFamily: "Roboto",
    },
    lineBorder: {
      marginLeft: 20,
      marginright: 10,
      width: 555,
      height: 3,
    },
    body: {
      padding: 30,
      marginTop: 20,
    },
    bodyTitle: {
      fontWeight: 700,
      fontSize: 11,
      display: "flex",
      alignSelf: "center",
      fontFamily: "Roboto Bold",
    },
    subBody: {
      paddingLeft: 96,
      paddingRight: 96,
      marginTop: 15,
    },
    subBodyText: {
      fontSize: 9,
      lineHeight: 2,
      fontFamily: "Roboto",
      textAlign: "justify",
      marginTop: 15,
      whiteSpace: "pre",
    },
    footer: {
      display: "flex",
      padding: 35,
      marginTop: 20,
    },
    footerText1: {
      fontSize: 8,
      fontFamily: "Roboto Bold",
      textAlign: "right",
      margin: 2,
    },
    footerText2: {
      fontSize: 7,
      fontFamily: "Roboto",
      textAlign: "right",
    },
    selected: {
      fontFamily: "Roboto Bold",
      fontWeight: "bold",
      fontSize: 9,
      textTransform: "uppercase",
    },
  });

  return (
    <PDFViewer
      className="flex-1 h-full"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
      }}
    >
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image style={styles.image} src="/fullsuite_logo.png" />
            <View style={styles.section}>
              <Text style={styles.headerText}>
                Empowering startups, fueling careers.
              </Text>
              <Text style={styles.headerText}>
                5F Curamed Building 12 Ben Palispis-Aspiras Highway, Baguio City
              </Text>
              <Text style={styles.headerText}>
                <Link>https://fullsuite.ph/</Link>
              </Text>
            </View>
          </View>

          <View>
            <Image style={styles.lineBorder} src="/line-border.png" />
          </View>

          <View style={styles.body}>
            <Text style={styles.bodyTitle}>Notice to Explain</Text>
          </View>

          <View style={styles.subBody}>
            <Text style={styles.subBodyText}>
              {" "}
              {"\t \tHi"} <Text style={styles.selected}>{formData.name}</Text>
            </Text>
            <Text style={styles.subBodyText}>
              {" "}
              {
                " \t \tWe understand that certain circumstances may arise, but it has come to our attention that your work attendance has repeatedly been unsatisfactory."
              }{" "}
            </Text>

            <Text style={styles.subBodyText}>
              {" "}
              {
                " \t \tYour attendance records indicate the following dates of lates:\t"
              }
              {" \t"}
            </Text>

            {formData.lates.map((d) => (
              <Text style={styles.selected}>
              {`\t- ${moment(d.date).format("MMM DD")} \t (${moment.duration(d.late_mins).asMinutes()}m)`}
              </Text>
            ))}


          {formData.tardinessDates.length > 0 && (
            <Text style={styles.subBodyText}>
              {" "}
              {
                " \t \tYour attendance records indicate the following dates of undertimes:\t"
              }
              {" \t"}
            </Text>
          )}

            <div className="flex flex-row my-5 justify-between w-[100%]">
            {formData.tardinessDates.map((d) => (
              <Text style={styles.selected}>
                {`\t- ${moment(d.date).format("MMM DD")} \t (${
                  d.hours_worked
                })`}
              </Text>
            ))}
            </div>

            {formData.awols.length > 0 && (
              <>
                <Text style={styles.subBodyText}>
                  {" "}
                  {
                    " \t \tYour attendance records also indicate the following dates of absences without leave (AWOL):\t"
                  }
                  {" \t"}
                </Text>

                {formData.awols.map((a) => (
                  <Text style={styles.selected}>
                    {`\t- ${moment(a.date).format("MMM DD")} \t`}
                  </Text>
                ))}
              </>
            )}

            {formData.probationaryLeaves.length > 2 && (
              <>
                <Text style={styles.subBodyText}>
                  {" "}
                  {
                    " \t \tYour leave records indicate the following unpaid leaves while still probationary:\t"
                  }
                  {" \t"}
                </Text>

                {formData.probationaryLeaves.map((p) => (
                  <Text style={styles.selected}>
                    {`\t- ${moment(p.leave_from).format("MMM DD")} \t`}
                  </Text>
                ))}
              </>
            )}

            <Text style={styles.subBodyText}>
              {" "}
              {
                " \t \tThis memo serves to address a significant concern regarding frequent tardiness, which is impeding the workflow of other employees and affecting our operational efficiency at FullSuite. Punctuality is crucial to maintaining a smooth and productive work environment, and consistent delays are not in line with our company policies and expectations."
              }{" "}
            </Text>
            <Text style={styles.subBodyText}>
              {" "}
              {
                " \t \tPlease be aware that your performance evaluations will reflect your pattern of frequent lateness. Additionally, pay deductions may be enforced as a result. A record of this memo will be added to your personnel file. Should this issue persist without noticeable improvement, we will need to consider further disciplinary actions, which may include termination of your employment at FullSuite."
              }{" "}
            </Text>
            <Text style={styles.subBodyText}>
              {" "}
              {
                " \t \tWe urge you to limit your instances of tardiness to no more than 3 occurrences per month, unless in genuinely extenuating circumstances. If you need to arrive late beyond this limit, please provide your supervisor with at least 5 days’ advance notice. Approval of such requests will be at your supervisor’s discretion."
              }{" "}
            </Text>
            <Text style={styles.subBodyText}>
              {" "}
              {
                " \t \tWe also want to emphasize that your health and well-being are important to us. If you are experiencing personal or professional challenges that are affecting your punctuality, please do not hesitate to reach out to your supervisor or our HR team. We are here to support you and explore potential solutions."
              }{" "}
            </Text>
            {/* <Text style = {styles.subBodyText}>{'\t \t \t \t \t \t \t \t \tThis is to certify that'} <Text style={styles.selected}>{formData.name}</Text> {'has been employed with OFFSHORE CONCEPT BPO SERVICES, INC. (the legal company representing FullSuite) as a'} <Text style={styles.selected}>{formData.position}</Text> {'from'} <Text style={styles.selected}>{formatDate(formData.startDate)}</Text>{' up to '} <Text style={styles.selected}>{formatDate(formData.lastDate)}</Text>.</Text>
        <Text style={styles.subBodyText}>{'\t \t \t \t \t \t \t \t \tThis certification is being issued upon the request for the aforementioned for any legal purpose it may serve.'}</Text>
        <Text style={styles.subBodyText}>{'\t \t \t \t \t \t \t \t \tGiven this '} <Text style={styles.selected}>{formatDate(formData.dateIssued)}</Text>{', in 5F Curamed Building 12 Ben Palispis-Aspiras Highway, Baguio City, Benguet.'}</Text> */}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText1}>Veronica O. Delegencia</Text>
            <Text style={styles.footerText2}>InfoSec Specialist</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default MemoDocument;