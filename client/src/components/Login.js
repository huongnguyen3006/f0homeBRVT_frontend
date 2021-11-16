
import { load } from "dotenv";
import React, { useEffect, useState } from "react";
import { Link, useParams} from 'react-router-dom';
import Signup from "./Signup";
import Getpwd from "./Getpwd";
import Resetpwdform from "./Resetpwdform";
// import Signin from "./components/Signin"

export default function Signin()  {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState('')
    const endPoint = "/login"

    const [showLogin, setShowLogin] = useState(true)
    const [showForgot, setShowForgot] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const [showResetpwdform, setShowResetpwdform] = useState(false)
    const [hash, setHash] = useState('')

    // const { page } = useParams();

    const login =()=>{
    fetch(endPoint, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email, password: password })
    }).then(data => data.json())
    .then(json=> {
        //sessionStorage
        sessionStorage.setItem("token", json.token) 
        //show main body
        window.location.reload();
    })
    }

   

    useEffect(()=>{
        //const query = new URLSearchParams(this.props.location.search)
        const params = new URLSearchParams(window.location.search) // id=123
        let page = params.get('page') // 123 
        if (page==='resetpwdform'){
            setShowResetpwdform(true)
            setShowLogin(false)
            setHash(params.get('hash'))
        }
           
    }, [])
  
return (
    <div class="container-fluid">
        {showLogin?
        <div>
        <h3 > Vui lòng đăng nhập</h3>
        <div class="form-group">
            <label>Email:
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            </div>
            <div class="form-group">
            <label>Mật khẩu:<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
        </div>
        <button class="btn btn-primary"   onClick = {()=> login ()}> Đăng nhập</button> <br/> <br/>
       
        <a href='#' onClick = {()=> {
            setShowSignup(true)
            setShowLogin(false)
            setShowForgot(false)
            setShowResetpwdform(false)
            }}>  Đăng kí  </a><br/> 

        <a href='#'  onClick = {()=> {
            setShowForgot(true)
            setShowLogin(false)
            setShowSignup(false)
            setShowResetpwdform(false)
            }}> Quên mật khẩu </a><br/> 



        {/* <a href='#' onClick = {()=> {
            setShowResetpwdform(true)
            setShowSignup(false)
            setShowLogin(false)
            setShowForgot(false)
            }}>  Reset password form</a> */}

        </div>
      
        : ""
        }   
        
         <div> {showSignup? <Signup/> : ""} </div> 

         <div>{showForgot? <Getpwd/> : ""} <br/> </div>
         <div>{showResetpwdform? <Resetpwdform hash={hash}/> : ""} </div> 

         

        </div>
)
}