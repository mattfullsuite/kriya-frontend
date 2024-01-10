import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const ServerDown = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL; 
    const navigate = useNavigate()

    useEffect(() => {

        Axios.get(BASE_URL + "/login").then((response) => {
          navigate("/login");
        }).catch((err) => {
          console.log(err) 
          navigate("/serverDown")});
    }, []);

    return(
        <>
        <h1 className="text-5xl text-center font-extrabold">SERVER DOWN</h1>
        <h1 className="text-2xl text-center">It's not you, its the server :(</h1>

        </>
    )
}

export default ServerDown;
