import React from "react"
import { Link } from "react-router-dom"
import {useEffect, useState} from 'react'
import axios from "axios"


const Dashboard = () => {
    const [users,setUsers] = useState([])

    useEffect(() => {
        const fetchAllUsers = async ()=> {
            try{
                const res = await axios.get("http://localhost:6197/users")
                setUsers(res.data);
            } catch(err){
                console.log(err)
            }
        }
        fetchAllUsers()
    },[])

    return (

        <div>
            <h1>Dashboard Users</h1>

            <div className="addButton-div">
                <button><Link to="/addEmployee">Add New Employee</Link></button>
            </div>

            <div className="users-div">
                <table className="table-zebra">
                    <tr className="user-row">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email Address</th>
                    </tr>

                    { users.map((user) => (
                        <tr className="user-row">
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Dashboard