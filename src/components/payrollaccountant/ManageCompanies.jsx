import { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkAddress, checkCompanyName, showAlert } from "../../assets/global.js";
import Swal from "sweetalert2";
import AddForm from "../companies/AddForm.jsx";
import EditForm from "../companies/EditForm.jsx";

function ManageCompanies() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  
//   let response;

//   let data = {
//     id: "",
//     account_id: "",
//     company_name: "",
//     address: "",
//     logo: "",
//   };
//   const [formData, setFormData] = useState(data);
//   const [errors, setErrors] = useState(data);
//   //toggle button for submit
//   const handleSubmit = async (e, isEdit = false) => {
//     e.preventDefault();

//     //checks if the form is valid
//     if ((await isFormValid()) && !isEdit) {
//       //call the add function
//       addCompany();
//     }
//     if ((await isFormValid()) && !isEdit) {
//       //call the update function
//       updateCompany(formData.id);
//     }
//   };

//   //on change event for inputs
//   const handleOnChange = async (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//       account_id: accountID,
//     });

//     //sets error message for company name input
//     if (name == "company_name") {
//       if (checkCompanyName(value) != "") {
//         setErrors({
//           ...errors,
//           company_name: checkCompanyName(value),
//         });
//       } else {
//         setErrors({ ...errors, company_name: "" });
//       }
//     }

//     //sets error message for address input
//     if (name == "address") {
//       if (checkAddress(value) != "") {
//         setErrors({
//           ...errors,
//           address: checkAddress(value),
//         });
//       } else {
//         setErrors({ ...errors, address: "" });
//       }
//     }
//   };

//   const isFormValid = async () => {
//     let newErrors = {};

//     if (checkCompanyName(formData.company_name) != "") {
//       newErrors.company_name = checkCompanyName(formData.company_name);
//     }

//     if (checkAddress(formData.address) != "") {
//       newErrors.address = checkAddress(formData.address);
//     }

//     // if (checkLastName(formData.logo) != "") {
//     //   newErrors.logo = checkLastName(formData.logo);
//     // }

//     setErrors({ ...errors, ...newErrors });

//     return Object.keys(newErrors).length == 0;
//   };

//   const addCompany = async () => {
//     let status = "";
//     let message = "";
//     try {
//       let response = await axios.post("/company", formData);
//       if (response.status === 200) {
//         status = "success";
//         message = "Companies was added successfully.";
//         // props.action();
//         getCompanies(accountID);
//         setFormData(data);
//         document.getElementById("add-form").close();
//       } else {
//         status = "error";
//         message = "Error adding account";
//       }
//     } catch (error) {
//       status = "error";
//       message = "Error adding account";
//       console.error("Error adding account: ", error);
//     } finally {
//       showAlert(status, message);
//     }
//   };

//   const getCompanies = async (accountID) => {
//     try {
//       const response = await axios.get(`/company/view/${accountID}`);
//       const rows = response.data.rows;
//       // Check if response is not null before updating state
//       if (rows) {
//         console.log("Data Retrieved:", rows);
//         setDataTable(rows);
//       }
//     } catch (error) {
//       console.error("Error: ", error);
//     }
//   };

//   const toggleDelete = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       confirmButtonText: "Yes, delete it!",
//       confirmButtonColor: "#Cc0202",
//       showCancelButton: true,
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         //delete account
//         deleteCompany(company_id);
//       }
//     });
//   };

//   const updateCompany = async (recordID) => {
//     let status = "";
//     let message = "";
//     try {
//       let response = await axios.patch(`/company/edit/${recordID}`, formData);
//       if (response.status === 200) {
//         console.log("Record updated successfully!");
//         getCompanies(accountID);
//         document.getElementById(`edit-form`).close();
//         status = "success";
//         message = "Record updated successfully!";
//       } else {
//         status = "error";
//         message = "Failed to update record";
//         console.error("Failed to update record");
//       }
//     } catch (error) {
//       status = "error";
//       message = "Error updating account";
//       console.error("Error updating account: ", error);
//     } finally {
//       showAlert(status, message);
//     }
//   };

useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(BASE_URL + "/login");
        const company_res = await axios.get(BASE_URL + "/mp-getcompanies");
        setUserData(res.data);
        setCompanies(company_res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

//   const userData = Cookies.get("userData");
//   const accountID = JSON.parse(userData).id;
//   const [companyData, setCompanyData] = useState({
//     account_id: accountID,
//     company_name: "",
//     address: "",
//     logo: "",
//   });

  const [userData, setUserData] = useState([]);
  const [companies, setCompanies] = useState([]);
  
  const [dataTable, setDataTable] = useState([]);
  const [rowSelected, setRowSelected] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     if (!userData) {
//       // Redirect to the login page if there is no cookie
//       navigate("/login");
//     }
//     getCompanies(accountID);
//   }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Get token from userData cookie
//   const getToken = () => {
//     const userData = JSON.parse(Cookies.get("userData"));
//     return userData.token;
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     // Ensure the file is an image
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         // Set the selected image and its base64 data
//         setSelectedImage({ file, base64: reader.result });
//       };
//       reader.readAsDataURL(file);
//     } else {
//       // Reset selected image if the file is not an image
//       setSelectedImage(null);
//       alert("Please select a valid image file.");
//     }
//   };

//   const deleteCompany = async (recordID) => {
//     let status = "";
//     let message = "";
//     try {
//       let response = await axios.delete(`/company/remove/${recordID}`);
//       if (response.status === 200) {
//         setDataTable((data) => data.filter(() => u.id !== recordID));
//         status = "success";
//         message = "Record deleted successfully!";
//       } else {
//         status = "error";
//         message = "Failed to delete record";
//         console.error("Failed to delete record");
//       }
//     } catch (error) {
//       status = "error";
//       message = "Failed to delete record";
//       console.error("Error: ", error);
//     } finally {
//       showAlert(status, message);
//     }
//   };

  return (
    <>
      <div className="">
        <div className="flex flex-col md:flex-row w-full gap-3">
          <div className="flex w-full">
            <div className="flex-col w-full">
              <h1 className="text-3xl font-bold tracking-wide">
                Manage Companies
              </h1>
            </div>
            <div className="flex flex-col w-full items-end">
              {/* <AddForm
                action={() => {
                  getCompanies(accountID);
                }}
                accountID={accountID}
              /> */}
            </div>
          </div>
        </div>

        <div className="mt-5 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
          {/* {dataTable ? ( */}
            <table border="1" className="table min-w-[800px]">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Logo</th>
                  <th>Name</th>
                  {/* <th>TIN</th> */}
                  <th>Address</th>
                  <th className="w-40">Actions</th>
                  {/* Add more columns based on your data structure */}
                </tr>
              </thead>
              <tbody>
                {companies.map((row) => (
                  <tr key={row.company_id}>
                    <td>{row.company_id}</td>
                    <td><img src={row.company_logo} alt={row.company_name+" Logo"} className="m-0 p-0 h-[50px] w-[50px]"/></td>
                    <td>{row.company_name}</td>
                    {/* <td>{row.tin}</td> */}
                    <td>{row.company_address}</td>
                    <td>
                      <div className="flex justify-between gap-2">
                        {/* <EditForm
                          row={row}
                          action={() => {
                            getCompanies(accountID);
                          }}
                          accountID={accountID}
                        />  */}
                        <button
                        //   onClick={() => {
                        //     toggleDelete(row.company_id);
                        //   }}
                          className="btn btn-sm btn-danger bg-[#Cc0202] shadow-md px-4 my-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                    {/* Add more cells based on your data structure */}
                  </tr>
                 ))}
              </tbody>
            </table>
          {/* ) : ( */}
            {/* <p>No data available.</p> */}
          {/* )} */}
        </div>
      </div>
    </>
  );
}

export default ManageCompanies;