import React, { useState, useEffect } from "react"
// import { set } from "../../../app";
import moment from 'moment';

export default function F0() {
  const datetime = moment()
  
const [data, setData] = useState([]);
const endPoint = "/f0s"
const [name, setName] = useState('')
const [age, setAge] = useState(0)
const [id, setId] = useState('')
const [user_id, setUser_id] = useState('')
const [add, setAdd] =useState('')
const [tel, setTel] = useState('')
const [zalo, setZalo] = useState('')
const [dop, setDop] = useState('')
const [symptoms_st, setSymptoms_st] = useState('')
const [don, setDon] = useState('')
const [treatment, setTreatment] = useState('')
const [note, setNote] = useState('')
const [treated_by, setTreated_by] =useState('')

const endPoint2 = "/doctors"
const [dataDoctor, setDataDoctor] =useState([])

const [keyword, setKeyword] = useState('')

const save = () => {
 
    if (id===''){
       fetch(endPoint, {
           method: 'POST',
           headers: {
           'Content-Type': 'application/json',
           'x-access-token': sessionStorage.getItem('token')
           },
           body: JSON.stringify({ name: name, age: age, add: add, tel:tel, zalo:zalo, dop:dop, symptoms_st:symptoms_st,don: don, treatment: treatment, note: note, treated_by: treated_by })
       }).then(data => search())
   }
   else{
       
       fetch(endPoint, {
           method: 'PUT',
           headers: {
           'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('token')
           },
           body: JSON.stringify({ id: id, name: name, age: age, add: add, tel:tel, zalo:zalo, dop:dop, symptoms_st:symptoms_st, don: don, treatment: treatment, note: note, treated_by: treated_by })
       }).then(data => search())
   }
 
   }
 
const deleteF0 = (id) => {
   fetch(endPoint+"/"+id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
         'x-access-token': sessionStorage.getItem('token')
       }
   }).then(data => search())
}
 
const editF0 = (id, name, age, add, tel, zalo, dop, symptoms_st, don, treatment, note, treated_by) => {
   setId(id)
   setName(name)
   setAge(age)
   setAdd(add)
   setTel(tel)
   setZalo(zalo)
   setDop(dop)
   setSymptoms_st(symptoms_st)
   setDon(don)
    setTreatment(treatment)
    setNote(note)
   setTreated_by(treated_by)
}
//get data from api
const load = () => {
  fetch(endPoint, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
  }
   }) .then(response => response.json())
    .then(data => setData(data));
}
const loaddoctor = () => {
  fetch(endPoint2, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
  }
   }) .then(response => response.json())
    .then(dataDoctor => setDataDoctor(dataDoctor));
}

function addnew(){
    setId('')
    setName('')
    setAge(0)
    setAdd('')
    setTel('')
    setZalo('')
    setDop('')
    setSymptoms_st('')
    setDon('')
    setTreatment('')
    setNote('')
    setTreated_by('')
}

function search(){
  const pageSize = document.querySelector("#pageSize").value
  const pageNo = document.querySelector("#pageNo").value

  fetch(endPoint + "/search?keyword="+keyword+"&pageSize="+pageSize+"&pageNo="+pageNo, 
  {
    headers: {
      'x-access-token': sessionStorage.getItem('token')
    }
  }
  )
  .then(response => response.json())
  .then(data => {
    populatePageNo(data.Size)
    setData(data.Items)
  }  
)}

function searchf0(){
  const pageSize = document.querySelector("#pageSize").value
  const pageNo = document.querySelector("#pageNo").value

  fetch(endPoint + "/search?keyword="+keyword+"&pageSize="+pageSize+"&pageNo="+pageNo, 
  {
    headers: {
      'x-access-token': sessionStorage.getItem('token')
    }
  }
  )
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
  loaddoctor()
 }, [])

 const selectDoctor = ()=>{

   let treated_by = document.querySelector('#treated_by').value
   setTreated_by(treated_by)

  //  console.log(treated_by)

 }
 
return (
  <div>
      <h2>Quản lý F0</h2>
      <input type="hidden" className="form-control" value={id} onChange={(e)=>setId(e.target.value)}/>
      {/* <input type="hidden" className="form-control" value={user_id} onChange={(e)=>setUser_id(e.target.value)}/> */}
      <div class="form-group">
      <label>Tên:</label><input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>

      <div class="form-group">
      <label>Tuổi:</label><input type="number" className="form-control" value={age} onChange={(e)=>setAge(e.target.value)}/> 
      </div>
      <div class="form-group">
      <label>Địa chỉ:</label><input type="text" className="form-control" value={add} onChange={(e)=>setAdd(e.target.value)}/> 
      </div>
      <div class="form-group">
      <label>Điện thoại:</label><input type="number" className="form-control" value={tel} onChange={(e)=>setTel(e.target.value)}/> 
      </div>
      <div class="form-group">
      <label>Zalo:</label><input type="number" className="form-control" value={zalo} onChange={(e)=>setZalo(e.target.value)}/> 
      </div>
      <div class="form-group">
      <label>Ngày test (+):</label><input type="datetime-local" className="form-control" value={dop} onChange={(e)=>setDop(e.target.value)}/> 
      </div>
      <div class="form-group">
      <label>Triệu chứng ban đầu:</label><input type="text" className="form-control" value={symptoms_st} onChange={(e)=>setSymptoms_st(e.target.value)}/> 
      </div>
      <div class="form-group">
      <label>Ngày test (-):</label><input type="datetime-local" className="form-control" value={don} onChange={(e)=>setDon(e.target.value)}/> 
      </div>
     
      <div class="form-group">
      <label>Điều trị:</label><input type="text" className="form-control" value={treatment} onChange={(e)=>setTreatment(e.target.value)}/> 
      </div>
      <div class="form-group">
      <label>Ghi chú:</label><input type="text" className="form-control" value={note} onChange={(e)=>setNote(e.target.value)}/> 
      </div>
      <label> Bác sĩ </label>
      <select class="form-control"  onChange={()=>selectDoctor()} id="treated_by">
      <option > ...</option>
      {dataDoctor.map(b => (
        
         <option value={b._id}>Bs. {b.name}</option>
         
      ))}
      </select>
   
    
     <br/>

      <button class="btn btn-primary" onClick={()=> save()}>Lưu </button>

      <button class="btn btn-primary" onClick={()=> addnew()}>Làm mới</button>

      <h2>Danh sách F0</h2>

        <div class="row">
          <div class="col-md-8">
            <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <button onClick={()=>search()}>Tìm kiếm</button>
          </div>
          <div class="col-md-4">
           Trang số 
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
        <th> Địa chỉ</th>
        <th>Tel. </th>
        <th>Zalo </th>
        <th>Ngày test(+) </th>
        <th>Triệu chứng </th>
        <th>Ngày test (-) </th>
       
        <th>Điều trị</th>
        <th>Ghi chú </th>
        <th>Bác sĩ</th>
        <th>Thao tác</th>
        <th>Chi tiết...</th>
      </tr>
    </thead>
    <tbody>      
      {data.map(a => (
        <tr>
            <td>{a.name}</td>
            <td>{a.age}</td>
            <td>{a.add}</td>
            <td>{a.tel}</td>
            <td>{a.zalo}</td>
            <td>{moment(a.dop).format("DD/MM/YYYY, HH:mm")}</td>
            <td>{a.symptoms_st}</td>
            <td>{moment(a.don).format("DD/MM/YYYY, HH:mm")}</td>
            <td>{a.treatment}</td>
            <td>{a.note}</td>
            <td value ={a._id}>{a.treated_by.name}</td>
           
            <td>
            <button className="btn btn-warning" onClick={()=> deleteF0(a._id)}>Xóa</button>
            <button className="btn btn-warning" onClick={()=> editF0(a._id, a.name, a.age, a.add, a.tel,a.zalo, moment(a.dop).format("YYYY-MM-DDTHH:mm"), a.symptoms_st, moment(a.don).format("YYYY-MM-DDTHH:mm"), a.treatment, a.note,a.treated_by)}>Sửa</button>

            </td>
            <td>
            <a href={`exam/${a._id}`}>Chi tiết ..</a>
            </td>
        </tr>
      ))}
      </tbody>
       </table>
      
  </div>
);
}
