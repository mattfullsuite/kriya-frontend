import React, {useState} from 'react'

import axios from 'axios'

const FileLeave = () => {

    const [leaveInfo, setLeaveInfo] = useState({
        leave_type: '',
        leave_reason: '',
        leave_from: '',
        leave_to: '',
    })

    const handleChange = (event) => {
        setLeaveInfo({...leaveInfo, [event.target.name]:[event.target.value]})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:6197/fileLeave', leaveInfo)
        .then(res => console.log("Registered Successfully"))
        .catch(err => console.log(err));
    }
    return (
        <div className='form'>
            <h1>File A Leave</h1>

            <form onSubmit={handleSubmit}>
                <div>

                <select name='leave_type' className="select select-bordered w-full max-w-xs" onChange={handleChange}>
                    <option disabled selected>Pick a reason for filing a leave</option>
                    <option>Sick Leave</option>
                    <option>Bereavement Leave</option>
                    <option>Maternity/Paternity Leave</option>
                    <option>Vacation Leave</option>
                    <option>Adverse Weather Leave</option>
                    <option>Study Leave</option>
                    <option>Other Leave</option>
                </select>

                </div>
                
                <div>
                    <textarea name='leave_reason' className="textarea textarea-bordered" placeholder="Reason here." onChange={handleChange}></textarea>
                </div>

                <br/>

                <div>
                    <input name='leave_from' type="date" placeholder="Date From" className="input input-bordered w-full max-w-xs" onChange={handleChange} />
                    <input name='leave_to' type="date" placeholder="Date To" className="input input-bordered w-full max-w-xs" onChange={handleChange} />
                </div>

                <br/>
                <button type="submit" className="btn btn-ghost btn-xs bg-accent">File</button>
            </form>
        </div>
    )
}

export default FileLeave