import React, { useState, useEffect } from "react";

import Navbar from "./Navbar";
const Welcome = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const accesstoken = localStorage.getItem("accesstoken");
        if (accesstoken) {
            setData([]);
        }
    }, [])
    useEffect(() => {

    }, [data])
    // const showdata = async () => {
    //     const accesstoken = localStorage.getItem("accesstoken")
    //     const res = await axios.get("http://localhost:8000/showdata", { params: { accesstoken } })
    //         .then((res) => {
    //             setData(res.data);
    //         })
    //         .catch((err) => {
    //             setData([]);
    //             console.log(err);
    //         })
    // }
    return (
        <>
         
            <Navbar  />
           

        </>
    )
}
export default Welcome