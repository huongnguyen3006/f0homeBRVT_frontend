import React, { useState, useEffect } from "react"
import Signout from "./Signout";
import { useHistory } from "react-router-dom";


export default function Menu() {

    // function GobackButton() {
    //     let history = useHistory();
      
    //     function handleClick() {
    //       history.goBack();
    //     }
  
    return (
        <div>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">PMS</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="/">Trang chủ</a></li>
                        {/* <li><a href="/product">Sản phẩm</a></li> */}
                        <li ><a href="/f0">F0</a></li>
                        <li><a href="/doctor">Bác sĩ</a></li>
                        <li><a href="/volunteer">Tình nguyện viên</a></li>
                        <li><a href="/user">Người dùng</a></li>
                        <li><a href="/church">Nhà thờ</a></li>
                        <li><a href="/lecture">Bài giảng</a></li>
                        <li><a href="/about">About</a></li>
                         <form class="form-inline my-2 my-lg-0"></form>
                        <li class = "right-conner"> <a>
                        {sessionStorage.getItem('token')!== null && sessionStorage.getItem('token')!==""? 
                        <Signout/>: ""} </a>
                       
                        </li>
                    </ul>
                </div>
                
            </nav>
            <a font-size= "14px" class="right-conner" href='/f0' > Quay lại  </a>
            {/* <button type="button" onClick={handleClick}>
      Quay lại trang trước
    </button> */}
            <div>
             
            
            </div>
        </div>
    )

}

