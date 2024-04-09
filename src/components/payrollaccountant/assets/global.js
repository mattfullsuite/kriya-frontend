import axios from "axios";
import Swal from "sweetalert2";

const showAlert = (status, title) => {
  Swal.fire({
    icon: status,
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

const checkFirstName = (value) => {
  let error = "";
  if (value == "") {
    error = "First Name is required";
  }
  return error;
};

const checkMiddleName = (value) => {
  let error = "";
  if (value == "") {
    error = "Middle Name is required";
  }
  return error;
};

const checkLastName = (value) => {
  let error = "";
  if (value == "") {
    error = "Last Name is required";
  }
  return error;
};

const checkDateOfBirth = (value) => {
  let error = "";
  if (value == "") {
    error = "Date of Birth is required";
  } else if (getAge(value) < 15) {
    error = "Age must be 15 and above";
  }
  return error;
};

const checkEmail = async (value, isEdit = false) => {
  // Regular expression for email validation
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  let error = "";

  if (value == "") {
    error = "Email is required";
  } else if (!emailRegex.test(value)) {
    error = "Please provide a valid email address";
  } else {
    //check if the email already exists
    if (!isEdit && await isEmailExists(value)) {
      error = "Email Address already exists";
    }
  }
  return error;
};

const checkPassword = (value, isEdit = false) => {
  // Check for at least one uppercase letter
  const uppercaseRegex = /[A-Z]/;
  // Check for at least one lowercase letter
  const lowercaseRegex = /[a-z]/;
  // Check for at least one digit
  const digitRegex = /\d/;
  // Check for at least one special character
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  let error = "";

  if (isEdit) {
    if (value == "") return error;
  }

  if (value == "") {
    error = "Password is required";
  } else if (value.length < 8) {
    error = "Password must have atleast 8 characters";
  } else if (!uppercaseRegex.test(value)) {
    error = "Password must have atleast one uppercase letter";
  } else if (!lowercaseRegex.test(value)) {
    error = "Password must have atleast one lowercase letter";
  } else if (!digitRegex.test(value)) {
    error = "Password must have atleast one digit";
  } else if (!specialCharRegex.test(value)) {
    error = "Password must have atleast one special character";
  }
  return error;
};

const checkAccountType = (value) => {
  let error = "";
  if (value == "") {
    error = "Account Type is required";
  }
  return error;
};

const checkPayItem = (value) => {
  let error = "";
  if (value == "") {
    error = "Pay Item is required";
  }
  return error;
};

const checkCategoryName = (value) => {
  let error = "";
  if (value == "") {
    error = "Category is required";
  }
  return error;
};

const isEmailExists = async (value) => {
  try {
    let response = await axios.get(`/account/isemailexists/${value}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }

  return false;
};

const checkCompanyName = (value) => {
  let error = "";
  if (value == "") {
    error = "Company Name is required";
  }
  return error;
};

const checkCompanyTIN = (value) => {
  let error = "";
  if (value == "") {
    error = "TIN is required";
  }
  return error;
};

const checkAddress = (value) => {
  let error = "";
  if (value == "") {
    error = "Address is required";
  }
  return error;
};
const checkLogo = (value) => {
  let error = "";
  if (value == "") {
    error = "Logo is required";
  }
  return error;
};

const getAge = (dob) => {
  let year = dob.split("-")[0];
  let month = dob.split("-")[1];
  let day = dob.split("-")[2];

  let nowYear = new Date(Date.now()).getFullYear();
  let nowMonth = new Date(Date.now()).getMonth() + 1;
  let nowDay = new Date(Date.now()).getDate();

  let age = nowYear - year;

  if (month <= nowMonth) {
    if (month == nowMonth) {
      if (day <= nowDay) age++;
    } else {
      age++;
    }
  }

  return age;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export {
  showAlert,
  checkFirstName,
  checkMiddleName,
  checkLastName,
  checkDateOfBirth,
  checkEmail,
  checkPassword,
  checkAccountType,
  checkPayItem,
  checkCategoryName,
  formatDate,
  checkCompanyName,
  checkCompanyTIN,
  checkAddress,
  checkLogo
};
