import React from "react"

const AddAnnouncements = () => {


    return(
        <div>
            <h1>Add a New Announcement</h1>
            <div className="input-div">
                <input type="text" placeholder="Announcement Title" className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="text-content-div">
                <textarea className="textarea textarea-bordered" placeholder="Type your content here."></textarea>
            </div>

        </div>
    )
}

export default AddAnnouncements