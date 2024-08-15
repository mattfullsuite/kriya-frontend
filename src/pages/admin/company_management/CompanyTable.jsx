import { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import DialogEdit from "./DialogEdit";
import DialogAdd from "./DialogAdd";

const CompanyTable = ({ companyList, getCompanyList }) => {
  const [companies, setCompanies] = useState();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const originalList = useRef();
  const addCompany = () => {
    document.getElementById(`dialog-add`).showModal();
  };
  const editCompany = (data) => {
    setSelectedCompany(data);
    document.getElementById(`dialog-edit`).showModal();
  };
  useEffect(() => {
    setCompanies(companyList);
    originalList.current = companyList;
  }, [companyList]);

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const newData = originalList.current.filter((row) => {
      return (
        row.company_name.toLowerCase().includes(searchValue) ||
        row.company_loc.toLowerCase().includes(searchValue)
      );
    });
    setCompanies(newData);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.company_name,
    },
    { name: "Address", selector: (row) => row.company_loc },
    {
      name: "Logo",
      cell: (row) => (
        <div className="flex w-full p-2  justify-center">
          <img src={row.company_logo} className="h-16 w-auto" />
        </div>
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <div>
          <button
            className="btn btn-sm btn-edit  bg-[#666A40] shadow-md px-4 text-white hover:bg-[#666A40] hover:opacity-60 w-12"
            onClick={() => editCompany(row)}
          >
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.46582 13.01H11.9317M6.82774 3.27982L8.47233 1.46582L11.3503 4.64032L9.70573 6.45429M6.82774 3.27982L3.56787 6.87559C3.45883 6.99584 3.39757 7.159 3.39757 7.32908V10.2379H6.03472C6.18891 10.2379 6.33677 10.1704 6.44585 10.0501L9.70573 6.45429M6.82774 3.27982L9.70573 6.45429"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className=" bg-white rounded-xl mt-10 p-5">
        <div className="flex flex-column p-2 md:flex-row">
          <div
            className="md:mr-5 btn flex w-28 bg-[#666A40] shadow-md text-white hover:bg-[#666A40] hover:opacity-60"
            onClick={() => addCompany()}
          >
            + Add
          </div>
          <div>
            <input
              type="text"
              className="input input-bordered w-80 border"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        {companies && (
          <div className="">
            <DataTable columns={columns} data={companies} pagination />
          </div>
        )}
      </div>

      <DialogAdd getCompanyList={getCompanyList} />
      <DialogEdit data={selectedCompany} getCompanyList={getCompanyList} />
    </>
  );
};

export default CompanyTable;
