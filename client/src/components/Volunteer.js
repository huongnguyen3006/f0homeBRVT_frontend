import React, { useState, useEffect } from "react"

export default function Volunteer() {
const [data, setData] = useState([]);
const endPoint = "http://localhost:4001/volunteers"
const [name, setName] = useState('')
const [age, setAge] = useState(0)
const [phone, setPhone] = useState("")
const [email, setEmail] = useState("")
const [address, setAddress] = useState("")
const [id, setId] = useState('')
const [avatar, setAvatar] = useState('')
const [uploadFile, setUploadFile] = useState();
const [uploadMessage, setUploadMessage] = useState('');


const [keyword, setKeyword] = useState('')

const save = () => {
 
    if (id===''){
       fetch(endPoint, {
           method: 'POST',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ name: name, age: age, phone: phone, email: email , address: address, avatar: avatar})
       }).then(data => search())
   }
   else{
       fetch(endPoint, {
           method: 'PUT',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ id: id, name: name, age: age, phone: phone,  email: email ,address: address, avatar: avatar})
       }).then(data => search())
   }
 
   }
 
const deleteVolunteer = (id) => {
   fetch(endPoint+"/"+id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       }
   }).then(data => search())
}
 
const editVolunteer = (id, name, age, phone, email, address , avatar) => {
   setId(id)
   setName(name)
   setAge(age)
   setPhone(phone)
    setEmail(email)
   setAddress(address)
   setAvatar(avatar)
   setUploadMessage('')
   document.querySelector("input[type='file']").value = ''
}
//get data from api
const load = () => {
  fetch(endPoint)
    .then(response => response.json())
    .then(data => setData(data));
}

function addnew(){
  setId('')
  setName('')
  setPhone('')
  setAddress('')
  setAge(0)
  setAvatar('')
  setUploadMessage('')
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
  const selectedPageNo = document.querySelector("#pageNo").value
  
  while (pageNoSelect.options.length > 1) {                
    pageNoSelect.remove(0);
  }     

  for (var i = 1; i<=noPage; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    pageNoSelect.appendChild(opt);
  }
  pageNoSelect.value = selectedPageNo
}

const handleFileUpload = () => {
    const input = document.querySelector("input[type='file']")
    const formData = new FormData()
    formData.append('myFile', input.files[0])
  
    fetch('/uploadfile', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setAvatar(data.path)
      if (typeof data.path!=="undefined"){
        setUploadMessage('Upload is successful: '+data.path)
      }
      else{
        setUploadMessage('Upload failed')
      }
      
    })
    .catch(error => {
      console.error(error)
    })
  }

//load data automatically
useEffect(() => {
  search()
 }, [])
 
return (
  <div>
      <h2>Quản lý tình nguyện viên</h2>
      <input type="hidden" className="form-control" value={id} onChange={(e)=>setId(e.target.value)}/>

      <div class="form-group">
      <label>Tên:</label><input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>

      <div class="form-group">
      <label>Tuổi:</label><input type="number" className="form-control" value={age} onChange={(e)=>setAge(e.target.value)}/> 
      </div>


      <div class="form-group">
      <label>Số điện thoại:</label><input type="text" className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)}/> 
      </div>


      <div class="form-group">
      <label>Email:</label><input type="text" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/> 
      </div>


      <div class="form-group">
      <label>Địa chỉ:</label><input type="text" className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)}/> 
      </div>



      <div class="form-group">
      <label>Avatar:</label>
      <input type="file" onChange={()=>handleFileUpload()}/> {uploadMessage}
      
      {/* <button onClick={()=>handleFileUpload()}>Upload</button> */}
      </div>

      <button class="btn btn-primary" onClick={()=> save()}>Save</button>

      <button class="btn btn-primary" onClick={()=> addnew()}>Add new</button>

      <h2>Danh sách tình nguyện viên</h2>

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
              <option value="10">10</option>
              <option value="20">20</option>
              </select>
          </div>         
        </div>

       <table class="table table-striped">
       <thead>
      <tr>
        <th>Tên</th>
        <th>Tuổi</th>
        <th>Số điện thoại</th>
        <th>Email</th>
        <th>Địa chỉ</th> 
        <th>Avatar</th>  
        <th>Action</th>
    
      </tr>
    </thead>
    <tbody>      
      {data.map(a => (
        <tr>
            <td>{a.name}</td>
            <td>{a.age}</td>
            <td>{a.phone}</td>
            <td>{a.email}</td>
            <td>{a.address}</td>
            <td><img style={{width:"60px", height:"60px", "border-radius":"30px"}} src={'http://localhost:4001/'+a.avatar}/></td>
            <td><button className="btn btn-warning" onClick={()=> deleteVolunteer(a._id)}>Delete</button>
            <button className="btn btn-warning" onClick={()=> editVolunteer(a._id, a.name, a.age, a.phone,  a.email,a.address, a.avatar)}>Edit</button></td>
        </tr>
      ))}
      </tbody>
       </table>
      
  </div>
);
}
