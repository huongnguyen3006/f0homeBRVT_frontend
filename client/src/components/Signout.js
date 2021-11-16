import React from 'react';
export default function Logout(){
    function signout(){
        sessionStorage.removeItem('token')
        window.location.reload();
        
    }
    
    
        return (
            <div>
                
            <a class="right-conner" href='#' onClick={()=>signout()}>Signout</a>
            </div>
        )
    }
    
