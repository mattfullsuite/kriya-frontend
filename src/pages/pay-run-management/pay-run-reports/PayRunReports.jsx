import { useEffect, useRef, useState } from "react";
import Headings from "../../../components/universal/Headings";
import ReportsTable from "./components/ReportsTable";
import axios from "axios";

const PayRunReports = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const reportsData = useRef([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(BASE_URL + "/mp-getAllPaySlip");
      console.log(result.data);
      reportsData.current = result.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Headings text={"Pay Run Reports"} />
        <ReportsTable reportsData={reportsData.current} />
      </div>
    </>
  );
};

export default PayRunReports;
