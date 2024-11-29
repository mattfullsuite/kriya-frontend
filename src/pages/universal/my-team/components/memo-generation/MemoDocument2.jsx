import React from "react";
import moment from "moment";

import {
  Page,
  Svg,
  Line,
  Text,
  View,
  Document,
  Font,
  StyleSheet,
  Image,
  Link,
  PDFViewer,
} from "@react-pdf/renderer";

const MemoDocument2 = ({selectedTemplate, managerNote, footerNote, memoData}) => {

  const templateDetails = 
  (selectedTemplate === "First Written Warning") ? 
  { 
    title: "First Written Warning",
    begin: "This documentation serves as a first written warning after continued attendance issues.",
    end: `We hold our employees to the highest standards of workplace ethics. And we believe that due process should be observed in all matters concerning workplace challenges. That is why prior to this you have been provided with consistent coachings/reminders and given the opportunity to improve your attendance record. As such, you have been made aware that continued attendance problems can result in further disciplinary actions, up to and including employment termination. `,
  }
  :
  (selectedTemplate === "Final Written Warning") ? 
  { 
    title: "Final Written Warning",
    begin: "This documentation serves as a final written warning after continued attendance issues.",
    end: `We hold our employees to the highest standards of workplace ethics. And we believe that due process should be observed in all matters concerning workplace challenges. That is why prior to this you have been provided with consistent coachings/reminders, served with a written memo and given the opportunity to improve your attendance record. As such, you have been made aware that continued attendance problems can result in further disciplinary actions, up to and including employment termination.`,
  }
  :
  (selectedTemplate === "3 Day Suspension Notice") ? 
  { 
    title: "3 Day Suspension Notice",
    begin: `It is with regret that we are writing to inform you of a SUSPENSION from work for a duration of three
    (3) days. Effectivity dates of which are to be determined by your supervisor.
    This decision has been made after a thorough review of the facts and circumstances regarding your
    attendance as follows:`,
    end: `The act constituted violation of Article 4.0 Work-related non-conformance against the company's interests under section 4.28 Unauthorized Undertime which meets the corresponding penalty of three (3) days Suspension from work. 
    
    During the suspension period, you are expected to reflect on the issues at hand and consider the necessary changes stated below to ensure a more positive and professional work environment upon your return. 
    \t \t \t- To give a heads up to your manager of the possibility of having to go home early if ever things like the situation above happens again. 
    \t \t \t- To inform your manager and secure an approval ahead of time about being absent or clocking out early.
    
    Any further violation of the company policies or failure to demonstrate improvement upon your return may result in more severe disciplinary action.
    
    We trust that this suspension will provide an opportunity for reflection and commitment to positive change. 

    For your strict compliance.`,
  }
  :
  (selectedTemplate === "6 Day Suspension Notice") ? 
  { 
    title: "6 Day Suspension Notice",
    begin: `It is with regret that we are writing to inform you of a SUSPENSION from work for a duration of six (6) days. Effectivity dates of which are to be determined by your supervisor. 
    This decision has been made after a thorough review of the facts and circumstances regarding your attendance as follows`,
    end: `The act constituted violation of Article 4.0 Work-related non-conformance against the company's interests under section 4.28 Unauthorized Undertime which meets the corresponding penalty of three (3) days Suspension from work. 
    
    During the suspension period, you are expected to reflect on the issues at hand and consider the necessary changes stated below to ensure a more positive and professional work environment upon your return. 
    \t \t \t- To give a heads up to your manager of the possibility of having to go home early if ever things like the situation above happens again. 
    \t \t \t- To inform your manager and secure an approval ahead of time about being absent or clocking out early.
    
    Any further violation of the company policies or failure to demonstrate improvement upon your return may result in more severe disciplinary action.
    
    We trust that this suspension will provide an opportunity for reflection and commitment to positive change. 

    For your strict compliance.`,
  }
  :
  (selectedTemplate === "12 Day Suspension Notice") ? 
  { 
    title: "12 Day Suspension Notice",
    begin: `It is with regret that we are writing to inform you of a SUSPENSION from work for a duration of twelve (12) days. Effectivity dates of which are to be determined by your supervisor. 
    This decision has been made after a thorough review of the facts and circumstances regarding your attendance as follows`,
    end: `The act constituted violation of Article 4.0 Work-related non-conformance against the company's interests under section 4.28 Unauthorized Undertime which meets the corresponding penalty of three (3) days Suspension from work. 
    
    During the suspension period, you are expected to reflect on the issues at hand and consider the necessary changes stated below to ensure a more positive and professional work environment upon your return. 
    \t \t \t- To give a heads up to your manager of the possibility of having to go home early if ever things like the situation above happens again. 
    \t \t \t- To inform your manager and secure an approval ahead of time about being absent or clocking out early.
    
    Any further violation of the company policies or failure to demonstrate improvement upon your return may result in more severe disciplinary action.
    
    We trust that this suspension will provide an opportunity for reflection and commitment to positive change. 

    For your strict compliance.`,
  }
  :
  (selectedTemplate === "30 Day Suspension Notice") &&
  { 
    title: "30 Day Suspension Notice",
    begin: `It is with regret that we are writing to inform you of a SUSPENSION from work for a duration of thirty (30) days. Effectivity dates of which are to be determined by your supervisor. 
    This decision has been made after a thorough review of the facts and circumstances regarding your attendance as follows`,
    end: `The act constituted violation of Article 4.0 Work-related non-conformance against the company's interests under section 4.28 Unauthorized Undertime which meets the corresponding penalty of three (3) days Suspension from work. 
    
    During the suspension period, you are expected to reflect on the issues at hand and consider the necessary changes stated below to ensure a more positive and professional work environment upon your return. 
    \t \t \t- To give a heads up to your manager of the possibility of having to go home early if ever things like the situation above happens again. 
    \t \t \t- To inform your manager and secure an approval ahead of time about being absent or clocking out early.
    
    Any further violation of the company policies or failure to demonstrate improvement upon your return may result in more severe disciplinary action.
    
    We trust that this suspension will provide an opportunity for reflection and commitment to positive change. 

    For your strict compliance.`,
  }


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
    defaultPage: {
      backgroundColor: "white",
      position: "absolute",
      textAlign: "center",
      top: "200px",
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
    headerTitle: {
      fontSize: 9,
      lineHeight: 2,
      fontFamily: "Roboto",
      textAlign: "justify",
      whiteSpace: "pre",
    },
    lineBorder: {
      marginLeft: 20,
      marginright: 10,
      marginBottom: 40,
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
      paddingLeft: 80,
      paddingRight: 80,
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
      paddingRight: 80,
    },
    footerText2: {
      fontSize: 7,
      fontFamily: "Roboto",
      textAlign: "right",
      paddingRight: 80,
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
      {(selectedTemplate !== "") ?
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

            <View style={styles.subBody}>
              <Text style={styles.selected}>{moment().format("MMMM DD, YYYY")}</Text>
            </View>

            <View style={styles.subBody}>

              <Text style={styles.headerTitle}>
                {"To: "} <Text style={styles.selected}>{memoData?.downline_first_name + " " + memoData?.downline_last_name}</Text>
              </Text>

              <Text style={styles.headerTitle}>
                {"From: "} <Text style={styles.selected}>{memoData?.downline_position}</Text>
              </Text>

              <Text style={styles.headerTitle}>
                {"Subject: "} <Text style={styles.selected}>{templateDetails?.title}</Text>
              </Text>

              <Text style={styles.subBodyText}></Text>

              <Svg height="10" width="495">
                <Line x1="0" y1="5" x2="430" y2="5" strokeWidth={1} stroke="rgb(0,0,0)" />
              </Svg>

              <Text style={styles.subBodyText}>
                {"Dear"} <Text style={styles.selected}>{memoData?.downline_first_name + ","}</Text>
              </Text>

              <Text style={styles.subBodyText}>
                {templateDetails?.begin}
              </Text>

              {(managerNote !== "") &&
              <Text style={styles.subBodyText}>
                {managerNote}
              </Text>
              }

              <Text style={styles.subBodyText}>
                {templateDetails?.end}
              </Text>

              {(footerNote !== "") &&
              <Text style={styles.subBodyText}>
                {footerNote}
              </Text>
              }
            </View>
            

            <View style={styles.subBodyText}>
              <Text style={styles.footerText1}>{"Issued by:             "}</Text>
              <Text style={styles.footerText1}>{}</Text>
              <Text style={styles.footerText1}>{"_______________________"}</Text>
              <Text style={styles.footerText1}>{memoData?.superior_name}</Text>
              <Text style={styles.footerText2}>{memoData?.superior_position}</Text>
            </View>
            
            <View style={styles.subBodyText}>
            </View>

            <View style={styles.subBody}>
              <Text style={styles.headerTitle}>{"Acknowledged as received and understood by:"}</Text>
              <Text style={styles.headerTitle}>{}</Text>
              <Text style={styles.headerTitle}>{"_______________________"}</Text>
              <Text style={styles.headerTitle}>{memoData?.downline_first_name + " " + memoData?.downline_last_name}</Text>
              <Text style={styles.headerTitle}>{memoData?.downline_position}</Text>
            </View>

          </Page>
        </Document>
        : 
        <Document>
          <Page size="A4" style={styles.defaultPage}>
                <Text style={styles.subBody}>
                  Please select a template.
                </Text>
          </Page>
        </Document>
      }
    </PDFViewer>
  );
};

export default MemoDocument2;
