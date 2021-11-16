import React, {useState, useEffect} from 'react';

import App from '../App';
export default function Resetpwd(props){
   
    const [email, setEmail] = useState ('')
    const [newPassword, setNewPassword]=useState('')
    const [confirmpwd, setConfirmpwd]=useState('')
    const endPoint = "/resetpwdaction"
   

    function reset1(){
        
        fetch (endPoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, hash: props.hash, newPassword: newPassword} )

        }).then(data => data.json())
        .then(json=> {
            //sessionStorage
            sessionStorage.setItem("token", json.token) 
            //show main body
            // window.location.reload();
            alert("Success reset password")
        })
    }
    const [showResetpwdform, setShowResetpwdform] = useState(true)
    const [showLogin, setShowLogin] = useState(false)
    return (
        <div class="container-fluid">
              {setShowResetpwdform?
        <div class="form-group">
            <h3> Please fill the blanks</h3>
           
            <label>Email:
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label> <br/>
            
        
            <label>
                New Password:<input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </label> <br/>
               
                <label>
                Confirm Password:<input type="password" className="form-control" value={confirmpwd} onChange={(e) => setConfirmpwd(e.target.value)} />
                </label> <br/>
                {newPassword===confirmpwd?
                <button type="btn btn-primary" onClick = {()=> reset1()}> Submit </button>
                :"Password is wrong"}
                 <br/> 
        </div>
        :""}
        </div>
    )
}
// export default App;