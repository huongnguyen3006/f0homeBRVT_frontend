import React, {useState, useEffect} from 'react';
import validator from 'validator';
import App from '../App';
export default function Signup(){
    const [data, setData] = useState([])
    const [first_name, setFirst_name] = useState ('')
    const [last_name, setLast_name] = useState ('')
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
    const [roles, setRoles] = useState ('f0')
 
    const [treated_by, setTreated_by] = useState ('')

    const endPoint = "/register";
    
    function register(){
       
        fetch (endPoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({first_name: first_name, last_name:last_name, email: email, password:password, roles: roles})

        }).then(data => data.json())
        .then(json=> {
            //sessionStorage
            sessionStorage.setItem("token", json.token) 
            //show main body
            // window.location.reload();
            alert("You have registered already. Please sign in to use")
        })
    }
    useEffect(()=>{

    },[])

    const selectRoles = ()=>{

        let roles = document.querySelector('#roles').value
        console.log(roles)
        setRoles(roles)
     
     
      }

    return (
        <div class="container-fluid">
        <div class="form-group">
           
            <label>Tên:
            <input type="text" className="form-control" value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
            </label> <br/>
            <label>Họ:
            <input type="text" className="form-control" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
           </label><br/>
          
            <label>Email:
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label> <br/>
           
            <label>Mật khẩu:<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label> <br/>
           
            <label> 
                Vui lòng chọn đối tượng
            </label> <br/>
           
    <select class="form-control" onChange={()=>selectRoles()} id="roles">
         <option value="f0"  > F0 </option>
         <option value="doctor" > Bác sĩ </option>
      
      </select> <br/>
            <button onClick = {()=> register()}> Đăng kí </button>
        </div>
        </div>
    )
}
// export default App;