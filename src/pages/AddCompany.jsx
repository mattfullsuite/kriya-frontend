import React from 'react'
import {useState} from 'react'

const AddCompany = () => {
    const [company, setCompany] = useState({
        company_id: 2,
        company_name: "",
        company_loc: "",
    })

    const handleChange = (e) => {
        setCompany((prev=>({...prev, [e.target.name]: e.target.value })))
    };

    console.log(company)

    return (
        <div className='form'>
            <h1>Add Company</h1>
            <input type="text" onChange={handleChange} placeholder="Company Name"/>
            <input type="email" onChange={handleChange} placeholder="Company Address"/>

            <button>Add</button>
        </div>
    )
}

export default AddCompany