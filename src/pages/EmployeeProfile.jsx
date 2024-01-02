import React, {useState, useEffect} from 'react'
import axios from 'axios'

const EmployeeProfile = () => {
    const [emp_id, setEmp_ID] = useState("")

    emp_id = 1;

    const fetchEmployee = () => {
        axios.post("http://localhost:6197/employeeProfile", {
            emp_id: emp_id,
        }).then((response) => {
            console.log(response);
        });
    }

    return (
        <div>
            <h1>Employee Profile</h1>
        </div>
    )
}

export default EmployeeProfile