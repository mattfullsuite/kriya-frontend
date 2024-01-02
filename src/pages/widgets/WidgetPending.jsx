import React, { useState, useEffect } from "react"
import Axios from "axios"

const WidgetPending = () => {
    const [pendingDepartmentLeaves, setPendingDepartmentLeaves] = useState([])

    useEffect(() => {
        const fetchAllPendingDepartmentLeaves = async ()=> {
            try{
                const res = await Axios.get("http://localhost:6197/showpendingdepartmentleaves")
                setPendingDepartmentLeaves(res.data)
            } catch(err){
                console.log(err)
            }
        };
        fetchAllPendingDepartmentLeaves();
    }, []);


    return (
        <>
                <div className="overflow-x-auto">
                <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Reason</th>
                    <th>
                    </th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}

                { pendingDepartmentLeaves.map((pendingDepartmentLeave) => (
                <tr key={ pendingDepartmentLeave.leave_id}>
                    <th>1</th>
                    <td>{pendingDepartmentLeave.leave_from + " " + pendingDepartmentLeave.leave_to}</td>
                    <td>{pendingDepartmentLeave.f_name + " " + pendingDepartmentLeave.m_name + " " + pendingDepartmentLeave.s_name}</td>
                    <td>{pendingDepartmentLeave.leave_type}</td>
                    <td>
                        <button className="btn btn-outline btn-success">Approve</button>
                        <button className="btn btn-outline btn-error">Reject</button>
                    </td>
                </tr>
                ))}

                </tbody>
            </table>
            </div>
        </>
    )
}

export default WidgetPending