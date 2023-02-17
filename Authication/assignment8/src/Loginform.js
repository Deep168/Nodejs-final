import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


const Loginform = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [data, setData] = useState([]);
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return (alert("all fields are required")
      );
    }
    else if (password.length < 8) {
      return (
        alert("Password Must Have Atleast 8 Character")
      )
    }
    else {
      axios.post("http://localhost:8000/login", { email: email, password: password })
        .then((res) => {
          const accesstoken = res.data.accesstoken;
          console.log(accesstoken);
         
          localStorage.setItem("accesstoken", accesstoken);
          navigate("/welcome");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div>

      <Navbar />
      <div className="container d-flex justify-content-center">

        <form onSubmit={handlesubmit} className='col-5 mt-5' >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" value={email} name='email' onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className="mb-3">

            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>

            <input type="password" className="form-control" value={password} name='password' onChange={(e) => { setPassword(e.target.value) }} />

          </div>
          <div>
          <button type="submit" className="btn btn-primary" >Login</button>
          </div>
          <div>
          <Link to={"/register"} type="submit" className="btn btn-dark ms-2" >Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Loginform