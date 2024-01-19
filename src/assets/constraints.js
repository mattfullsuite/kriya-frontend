import moment from "moment";

export function checkName(event) {
  const regex = /^[a-zA-ZñÑ\-,\'.]+(?:\s[a-zA-ZñÑ\-\'.]+)*$/;
  const id = event.target.id;
  const name = event.target.value;
  var isTrue = regex.test(name);

  if (id === "f_name") {
    if (!isTrue) {
      return false;
    } else {
      return true;
    }
  } else if (id === "m_name") {
    if (!isTrue) {
      return false;
    } else {
      return true;
    }
  } else if (id === "s_name") {
    if (!isTrue) {
      return false;
    } else {
      return true;
    }
  }
}

export function nameLength(event) {
  const name = event.target.value;
  const id = event.target.name;

  if (id === "f_name") {
    if (name.length >= 2 && name.length <= 100) {
      return true;
    } else {
      return false;
    }
  } else if (id === "m_name") {
    if (name.length === 0) {
      return true;
    }
  } else if (id === "s_name") {
    if (name.length >= 2 && name.length <= 100) {
      return true;
    } else {
      return false;
    }
  }
}

export function isEighteenOrOlder(value) {
  const birthDate = new Date(value);

  const ageDifference = Date.now() - birthDate.getTime();
  const ageInYears = new Date(ageDifference).getUTCFullYear() - 1970;

  if (ageInYears >= 18) {
    return true;
  } else {
    return false;
  }
}

export function checkCivilStatus(value) {
  if (value !== "Select civil status") {
    return true;
  } else {
    return false;
  }
}

export function checkSex(value) {
  if (value != "Select sex") {
    return true;
  } else {
    return false;
  }
}

export function checkGender(value) {
  const regex =
    /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+)*(?:(?!  +|\d|[^a-zA-Z-\s]).)*(?: [a-zA-Z]+)*$/;
  const gender = value.target.value;
  const isTrue = regex.test(gender);

  if (gender.length == 0) {
    return true;
  } else if (isTrue) {
    return true;
  } else {
    return false;
  }
}

export function checkAddress(event) {
  const address = event.target.value;
  const regex = /^[a-zA-ZñÑ\-,\'#\/().\d]+(?:\s[a-zA-ZñÑ\-,\'#\/().\d]+)*$/;
  const isTrue = regex.test(address);

  if (isTrue) {
    return true;
  } else {
    return false;
  }
}

export function checkEmail(event) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = event.target.value;
  const isTrue = regex.test(email);

  if (!isTrue) {
    return false;
  } else {
    return true;
  }
}

export function lengthEmail(event) {
  const email = event.target.value;

  if (email.length === 0) {
    return false;
  } else {
    return true;
  }
}

export function checkPhoneNumber(event) {
  const regex = /^(09|\+639)\d{9}$/;
  const phone = event.target.value;
  const isTrue = regex.test(phone);

  if(!isTrue) {
    return false;
  } else {
    return true;
  }
}

export function lengthPhone(event) {
    const phone = event.target.value;

    if(phone.length === 0) {
        return false;
    } else {
        return true;
    }
}

export function checkCompany(event) {
  const company = event.target.value;

  if(company === "Company") {
    return false;
  } else {
    return true;
  }
}

export function checkCompanyID(event) {
  const companyID = event.target.value;
  const regex = /^[A-Z0-9\-]+$/;
  const isTrue = regex.test(companyID);

  if(!isTrue) {
    return false;
  } else {
    if(companyID.length === 0) {
        return true;
    }
    return true;
  }
}

export function lengthCompanyID(event) {
    const id = event.target.value;

    if(id.length === 0) {
        return false;
    } else {
        return true;
    }
}

export function checkDivision(event) {
  const div = event.target.value;

  if (div === "Select Division") {
    return false;
    // setDeptDisdabled(true);
    // setPositionDisabled(true);
  } else {
    return true;
    // setValDivID(event.target.value);
    // setDeptDisdabled(false);
    // setValDeptID(0);
  }
}

export function checkPosition(event) {
  const position = event.target.value;

  if(position === "Select Position") {
    return false;
  } else {
    return true;
  }
}

export function checkDepartment(event) {
  const dept = event.target.value;

  if (dept === "Select Department") {
    return false;
    // setPositionDisabled(true);
  } else {
    return true;
    // setValDeptID(event.target.value);
    // setPositionDisabled(false);
  }
}

export function checkClientCluster(event) {
  const clientCluster = event.target.value;

  if(clientCluster === "Select Client/Cluster") {
    return false;
  } else {
    return true;
  }
}

export function checkEmpRole(event) {
  const role = event.target.value;

  if(role == "Select Employment Role") {
    return false;
  } else {
    return true;
  }
}

export function checkEmpStatus(event) {
  const status = event.target.value;

  if(status === "Select Employment Status") {
    return false;
  } else {
    return true;
  }
}

export function checkDate(event) {
  const name = event.target.name;

  if (name === "date_hired") {
    const inputDate = new Date(event.target.value);
    const today = new Date();

    if(inputDate > today) {
      return false;
    } else {
      return true;
    }
  }
  else if (name === "date_regularization") {
    const inputDate = new Date(event.target.value);
    const today = new Date();

    if(inputDate <= today) {
      return false;
    } else {
      return true;
    }
  }
}

// functions for dates

export function checkDateFormat(value) {
  const date = moment(value);

  if(date.isValid()) {
    return true;
  } else {
    return false;
  }
}

export function checkHiredReg(dHired, dRegular) {
  const hired = moment(dHired);
  const regular = moment(dRegular);

  if(dRegular !== undefined) {
    if(hired.isAfter(regular)) {
      return false;
    } else {
      return true;
    }
  }
}

export function checkHiredSeparate(dHired, dSeparate) {
  const hired = moment(dHired);
  const separate = moment(dSeparate);

  if(dSeparate !== undefined) {
    if(hired.isAfter(separate)) {
      return false;
    } else {
      return true;
    }
  }
 }

export function checkRegHired(dRegular, dHired) {
  const regular = moment(dRegular);
  const hired = moment(dHired);

  if(dHired !== undefined) {
    if(regular.isBefore(hired)) {
      return false;
    } else {
      return true;
    }
  }
}

export function checkRegSeparate(dReg, dSeparate) {
  const regular = moment(dReg);
  const separate = moment(dSeparate);

  if(separate !== undefined) {
    if(regular.isAfter(separate)) {
      return false;
    } else {
      return true;
    }
  }
}

export function checkSeparateHired(dSeparate, dHired) {
  const separate = moment(dSeparate);
  const hired = moment(dHired);

  if(hired !== undefined) {
    if(separate.isBefore(hired)) {
      return false;
    } else {
      return true;
    }
  }
}

export function checkSeparateReg(dSeparate, dReg){
  const separate = moment(dSeparate);
  const regular = moment(dReg);

  if(separate.isBefore(regular)) {
    return false;
  } else {
    return true;
  }
}

//functions for file

export function checkFile(event) {
  const file = event.target.files[0];

  if (file) {
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if(fileExtension == "jpg" || fileExtension == "png" || fileExtension == "webp") {
      return true;
    } else {
      return false;
    }
  } else {
    return true;  }
}

export function checkFileSize(event) {  const file = event.target.files[0];
  if (file) {
    const fileSize = file.size / 1024;

    if(fileSize > 2048.0) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}
