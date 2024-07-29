import { useState, useEffect } from "react";
import axios from "axios";

//Component
import Headings from "../../../components/universal/Headings";
import CompanyTable from "./CompanyTable";

const CompanyManagement = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [companyList, setCompanyList] = useState([
    { company_id: 0, company_name: "", company_loc: "", company_logo: "" },
    { company_id: 0, company_name: "", company_loc: "", company_logo: "" },
  ]);
  const getCompanyList = async () => {
    const result = await axios.get(BASE_URL + `/cm-GetCompanies`);
    setCompanyList(result.data);
  };
  useEffect(() => {
    getCompanyList();
  }, []);

  return (
    <>
      <div className="p-5 w-full h-full border">
        <Headings text="Manage Companies" />

        <CompanyTable
          companyList={companyList}
          getCompanyList={getCompanyList}
        />
      </div>
    </>
  );
};

export default CompanyManagement;
