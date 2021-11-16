import React, { useState, useEffect } from "react"

export default function Church() {
const [data, setData] = useState([]);
const endPoint = "/churchs"
const [name, setName] = useState('')
const [address, setAddress] = useState(0)
const [id, setId] = useState('')

const [keyword, setKeyword] = useState('')

const save = () => {
 
    if (id===''){
       fetch(endPoint, {
           method: 'POST',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ name: name, address: address})
       }).then(data => search())
   }
   else{
     
       fetch(endPoint, {
           method: 'PUT',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ id: id, name: name, address: address})
       }).then(data => search())
   }
 
   }
 
const deleteChurch = (id) => {
   fetch(endPoint+"/"+id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       }
   }).then(data => search())
}
 
const editChurch = (id, name, address) => {
   setId(id)
   setName(name)
   setAddress(address)
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
    setAddress('')
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
      <h2>Quản lý Nhà thờ</h2>
      <input type="hidden" className="form-control" value={id} onChange={(e)=>setId(e.target.value)}/>

      <div class="form-group">
      <label>Tên:</label><input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>

      <div class="form-group">
      <label>Địa chỉ:</label><input type="text" className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)}/> 
      </div>

      <button class="btn btn-primary" onClick={()=> save()}>Save</button>

      <button class="btn btn-primary" onClick={()=> addnew()}>Add new</button>

      <h2>Danh sách nhà thờ</h2>

        <div class="row">
          <div class="col-md-8">
            <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <button onClick={()=>search()}>Search</button>
          </div>
          <div class="col-md-4">
            Trang số: 
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
        <th>Địa chỉ</th>
        <th>Action</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>      
      {data.map(a => (
        <tr>
            <td>{a.name}</td>
            <td>{a.address}</td>
            <td>
            <button className="btn btn-warning" onClick={()=> deleteChurch(a._id)}>Delete</button>
            <button className="btn btn-warning" onClick={()=> editChurch(a._id, a.name, a.age)}>Edit</button>

            </td>
            <td>
            <a href={`exam/${a._id}`}>Details</a>
            </td>
        </tr>
      ))}
      </tbody>
       </table>
      
  </div>
);
}
