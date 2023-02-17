import React, { useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import Navbar from "./Navbar";
const Registrationform = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [data, setData] = useState([]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    if (!firstname || !lastname || !email || !password || !confirmpassword) {
      return (
        alert("all fields are required")
      );
    }
    else if (password.length < 8) {
      return (
        alert("Password Must Have Atleast 8 Character")

      )
    }
    else if (password !== confirmpassword) {
      return (
        alert("Password And Confirm Password Must Be Same")
      )
    }
    else {
      const res = await axios.post("http://localhost:8000/registration", 
      { firstname: firstname, lastname: lastname, email: email, password: password, confirmpassword: confirmpassword })
        .then((res) => {
          setData(res.data);
          console.log(data);
        })
        .catch((err) => {
          console.group(err);
        });
    }
  }
  return (
    <div>

      <Navbar />

      <div className="container d-flex justify-content-center">

        <form onSubmit={handlesubmit} className='col-5 mt-5' >

          <div class="mb-3">

            <label for="exampleInputEmail1" class="form-label">Firstname</label>

            <input type='text' value={firstname} class="form-control" name='firstname' onChange={(e) => { setFirstname(e.target.value) }} />

          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Lastname</label>
            <input type='text' class="form-control" value={lastname} name='password' onChange={(e) => { setLastname(e.target.value) }} />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Email</label>
            <input type='text' class="form-control" value={email} name='email' onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type='password' class="form-control" value={password} name='password' onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">confirm Password</label>
            <input type='text' class="form-control" value={confirmpassword} name='confpassword' onChange={(e) => { setConfirmpassword(e.target.value) }} />
          </div>
         <button  type="submit" >submit</button>
        <br></br><br></br>
          <div>
          <Link to={"/register"} type="submit"  vaule="submit" class="btn btn-primary" >Register</Link>
          <Link to={"/login"} type="submit" class="btn btn-primary ms-2" >Back</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Registrationform