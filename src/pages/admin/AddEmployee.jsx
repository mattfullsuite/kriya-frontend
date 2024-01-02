import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios"

const AddEmployeeAdmin = () => {

    const navigate = useNavigate()
    const BASE_URL = process.env.REACT_APP_BASE_URL; //

    const [employee, setEmployee] = useState({
        user_id: "", 
        work_email: "",
        f_name: "", 
        m_name: "", 
        s_name: "", 
        personal_email: "", 
        contact_num: 0, 
        dob: "", 
        p_address: "", 
        c_address: "", 
        date_hired: "", 
        sex: "", 
        created_by: "", 
        updated_by: "",
    });

    const handleChange = (e) => {
        setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.post(BASE_URL + "/addEmployee", employee)

        } catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <h1>Add New Employee</h1>
            <br/><br/><br/><br/>
            <h4>User ID</h4>
            <input type="number" placeholder="user_id" onChange={handleChange} name="user_id"/>
            <h4>Email Address</h4>
            <input type="email" placeholder="work_email" onChange={handleChange} name="work_email"/>
            <br/><br/><br/>
            <h4>Name</h4>
            <input type="textr" placeholder="f_name" onChange={handleChange} name="f_name"/>
            <input type="text" placeholder="m_name" onChange={handleChange} name="m_name"/>
            <input type="text" placeholder="s_name" onChange={handleChange} name="s_name"/>

            <h4>Personal Email</h4>
            <input type="email" placeholder="personal_email" onChange={handleChange} name="personal_email"/>
            <h4>Contact Number</h4>
            <input type="text" placeholder="contact_num" onChange={handleChange} name="contact_num"/>
            <h4>Date of Birth</h4>
            <input type="date" placeholder="dob" onChange={handleChange} name="dob"/>
            
            <h4>Permanent Address</h4>
            <input type="text" placeholder="p_address" onChange={handleChange} name="p_address"/>
            <h4>Current Address</h4>
            <input type="text" placeholder="c_address" onChange={handleChange} name="c_address"/>
            
            <h4>Date Hired</h4>
            <input type="date" placeholder="date_hired" onChange={handleChange} name="date_hired"/>
            <h4>Sex</h4>
            <input type="text" placeholder="sex" onChange={handleChange} name="sex"/>

            <br/><br/><br/><br/>

            <button onClick={handleClick}>Add New User</button>
        </div> 
    ) 
}

export default AddEmployeeAdmin