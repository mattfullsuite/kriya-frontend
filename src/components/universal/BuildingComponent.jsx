import React from "react";

const BuildingComponent = ({image}) => {

    return (
        <>
        <div className="flex flex-col justify-center items-center gap-10 h-screen">
            <img className="h-64" src={image}/>

            <h1 className="text-lg text-center font-semibold">Coming soon... <br/> We're still building something awesome for you!</h1>
        </div>
        </>
    )
}

export default BuildingComponent