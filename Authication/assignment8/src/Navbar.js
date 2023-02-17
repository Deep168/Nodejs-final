import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";
function Navbar({ showDataBtn }) {
//     const [logouts, setLogouts] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accesstoken = localStorage.getItem("accesstoken");
        if (accesstoken) {
            setIsLogin(true);
        }
    }, [])
    useEffect(() => { }, [])
    const logout = () => {
        localStorage.removeItem("accesstoken");
        navigate('/');
    }
    const showdata = () => {
        showDataBtn();
    }
    return (
        <header style={{ backgroundColor: "lightseagreen", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 59px" }} >
            <div style={{ margin: "15px", textAlign: "center", fontSize: "50px" }}>
                <label style={{ margin: "10px", color: "white" }}>User App</label>
            </div>
            <div id='buttons' >
                {isLogin ? <>
                    {/* <button type='submit' style={{ margin: "10px", padding: "7px 9px" }} value='Show User Data' onClick={showdata} >show</button> */}
                    <button type='submit' style={{ margin: "10px", padding: "7px 46px" }} value='logout' onClick={logout} >Logout</button>
                </> : <>
                    <Link to={'/login'}><input type='button' value='Login' />
                    </Link>
                    <Link to={'/register'}><input type='button' value='Register' />
                    </Link>
                </>
                }

            </div>
        </header>)
} export default Navbar