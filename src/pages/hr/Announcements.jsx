import React, {useState, useEffect} from 'react'
import Axios from "axios"
import { Link } from "react-router-dom"


const Announcements = () => {
    const [announcements,setAnnouncements] = useState([])
    const BASE_URL = process.env.REACT_APP_BASE_URL; //


    useEffect(() => {
        const fetchAllAnnouncements = async ()=> {
            try{
                const res = await Axios.get(BASE_URL + "/announcements")
                setAnnouncements(res.data);
            } catch(err){
                console.log(err)
            }
        }
        fetchAllAnnouncements()
    },[])

    const handleDelete = async (ann_id) => {
        try {
            await Axios.delete(BASE_URL + "/announcements/" + ann_id);
            window.location.reload()
        } catch(err){
            console.log(err)
        }
    }


    return(
        <div className="announcements-div">
            <h1>Announcements</h1>

            <br/><br/>

            <div className="addButton-div">
                <button className="btn btn-accent"><Link to="/addAnnouncements">Add Announcements</Link></button>
            </div>

            { announcements.map((announcement) => (

                <div key={ announcement.ann_id }className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Announcements" /></figure>
                    <div className="card-body">
                        <h2 className="card-title"> { announcement.ann_title } </h2>
                        <p>{ announcement.ann_content } </p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-info">Edit</button>
                            <button onClick={() => handleDelete( announcement.ann_id ) } className="btn btn-error">Delete</button>
                        </div>
                    </div>
                </div>

            )) }
        </div>
    )
}

export default Announcements