import React, { useState, useEffect } from "react"

export default function UserList() {
    const [id, setId] = useState('')

const [data, setData] = useState([]);
const endPoint = "/users"
const [first_name, setFirst_name] = useState('')
const [last_name, setLast_name] = useState('')
const [email, setEmail] = useState('')         
const [password, setPassword] = useState('')
const [username, setUsername] = useState('')
const [keyword, setKeyword] = useState('')

const save = () => {
 
    if (id===''){
       fetch(endPoint, {
           method: 'POST',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ first_name: first_name, last_name: last_name,  email: email, password: password})
       }).then(data => search())
   }
   else{
       fetch(endPoint, {
           method: 'PUT',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ id: id, first_name: first_name, last_name: last_name ,email: email, password: password})
       }).then(data => search())
   }
 
   }
 
const deleteUser = (id) => {
   fetch(endPoint+"/"+id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       }
   }).then(data => search())
}
 
const editUser = (id, first_name, last_name,password) => {
   setId(id)
   setFirst_name(first_name)
   setLast_name(last_name)
   setPassword(password)
   
}
//get data from api
const load = () => {
  fetch(endPoint)
    .then(response => response.json())
    .then(data => setData(data));
}

function addnew(){
    setFirst_name('')
    setLast_name('')
    setPassword('')
    setUsername('')
   
}

function search(){

  const pageSize = document.querySelector("#pageSize").value
  const pageNo = document.querySelector("#pageNo").value


  fetch(endPoint + "/search?keyword="+keyword+"&pageSize="+pageSize+"&pageNo="+pageNo)
  .then(response => response.json())
  .then(data => {
    populatePageNo(data.Size)
    setData(data.Items)
  }  
)}

function populatePageNo(size){

  const pageSize = document.querySelector("#pageSize").value
  const noPage = size/pageSize
  const pageNoSelect = document.querySelector("#pageNo")
  
  while (pageNoSelect.options.length > 1) {                
    pageNoSelect.remove(0);
  }     

  for (var i = 1; i<=noPage; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    pageNoSelect.appendChild(opt);
}
}

//load data automatically
useEffect(() => {
  search()
 }, [])
 
return (
  <div>
      <h2>Quản lý người dùng</h2>
      <input type="hidden" className="form-control" value={id} onChange={(e)=>setId(e.target.value)}/>

      <div class="form-group">
      <label>Tên:</label><input type="text" className="form-control" value={first_name} onChange={(e)=>setFirst_name(e.target.value)}/>
      </div>

      <div class="form-group">
      <label>Họ:</label><input type="text" className="form-control" value={last_name} onChange={(e)=>setLast_name(e.target.value)}/> 
      </div>


      <div class="form-group">
      <label>Email:</label><input type="text" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/> 
      </div>


      <div class="form-group">
      <label>Mật khẩu:</label><input type="text" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/> 
      </div>

      


      <button class="btn btn-primary" onClick={()=> save()}>Save</button>

      <button class="btn btn-primary" onClick={()=> addnew()}>Add new</button>

      <h2>Danh sách người dùng</h2>

        <div class="row">
          <div class="col-md-8">
            <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <button onClick={()=>search()}>Search</button>
          </div>
          <div class="col-md-4">
            Số trang: 
            <select id="pageNo" onChange={()=>search()}>
              <option value="1">1</option>
            </select>
            Page Size 
              <select id="pageSize" onChange={()=>search()}>
              <option value="5">5</option>
              <option value="10">10</option>a=
              <option value="20">20</option>
              </select>
          </div>         
        </div>

       <table class="table table-striped">
       <thead>
      <tr>
        <th>Tên</th>
        <th>Họ</th>
        <th>email</th>
        <th>Mật Khẩu</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>      
      {data.map(a => (
        <tr>
            <td>{a.name}</td>
            <td>{a.price}</td>
            <td><button className="btn btn-warning" onClick={()=> deleteUser(a._id)}>Delete</button>
            <button className="btn btn-warning" onClick={()=> editUser(a._id, a.name)}>Edit</button></td>
        </tr>
      ))}
      </tbody>
       </table>
      
  </div>
);
}
