
import React, { useState } from "react";
import { Link } from 'react-router-dom';
// import Signin from "./components/Signin"
  

export default function Resetpd  ()  {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState('')
    const endPoint = "/getResetPasswordLink"

    function getpwd  ()  {
       
        fetch (endPoint,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email:email})
        })
            .then(response => response.json())
            .then (data => setData(data))
        
           
        // alert('Please check your mail')
      
    }
    const load = () => {
        fetch(endPoint)
          .then(response => response.json())
          .then(data => setData(data));
    }
   

return (
    <div class="container-fluid">
        <h3 type="bold"> Please enter your email</h3>
        <div class="form-group">
            <label>Email:<input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            
        </div>
        <button  onClick = {()=> getpwd ()}> Reset password</button>
        {/* <button  onClick = {()=> <Link href to ="/signup"> </Link>}>  Sign up  </button> */}
     {/* <a href="./Signup"> Sign up </a> <br/> <br/> */}
     {/* <a href="./Resetpassword"> Get password </a> */}
   
     
        </div>

       
)
}