import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import moment from 'moment';

export default function Exam() {
  const datetime = moment()
  const {f0} = useParams()

const endPoint = "/exams"
const [data, setData] = useState([]);
const endPointF0 = "/f0s/"+f0

const [dataF0, setDataF0] = useState([])
const[name, setName] = useState('')
const [dot, setDot] = useState('')
const [temperature, setTemperature] = useState(0)
const [spo2, setSpo2] = useState(0)
const [id, setId] = useState('')
const [created_by, setCreated_by] = useState('')
const [f0Info, setF0Info] = useState('')
const [symptoms, setSymptoms] = useState('')
const [prescription, setPrescription] = useState('')
const [note, setNote] = useState('')

const [keyword, setKeyword] = useState('')



const [error, setError] =  useState('')


const save = () => {

    if (parseFloat(spo2)>100 || parseFloat(spo2)<50){
      setError('SpO2 phải nằm trong khoảng từ 50-100')
      return;
    }
 
    if (id===''){
       fetch(endPoint, {
           method: 'POST',
           headers: {
           'Content-Type': 'application/json',
           'x-access-token': sessionStorage.getItem('token')
           },
           body: JSON.stringify({f0: f0, dot: dot, temperature: temperature, spo2: spo2, symptoms: symptoms, prescription: prescription, note: note,created_by: created_by})
       }).then(data => load())
   }
   else{
       fetch(endPoint, {
           method: 'PUT',
           headers: {
           'Content-Type': 'application/json',
           'x-access-token': sessionStorage.getItem('token')
           },
           body: JSON.stringify({ id: id, f0: f0, dot:dot, temperature: temperature, spo2: spo2, symptoms: symptoms, prescription: prescription, note: note, created_by: created_by})
       }).then(data => load())
   }
 
   }
 
const deleteExam = (id) => {
   fetch(endPoint+"/"+id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
         'x-access-token': sessionStorage.getItem('token')
       }
   }).then(data => load())
}
 
const editExam = (id,dot, temperature, spo2, symptoms, prescription, note) => {
  setDot(dot)
  console.log(dot)
   setId(id)
   setTemperature(temperature)
   setSpo2(spo2)
   setSymptoms(symptoms)
   setPrescription(prescription)
   setNote(note)
}
//get data from api
const load = () => {
  fetch(endPoint + "/f0s/"+f0, {
   headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
   }
  }).then(response => response.json())
    .then(data => setData(data))

}

//get data from api
const loadF0 = () => {
  console.log(endPointF0)
    fetch(endPointF0,{
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('token')
     } 
    })
      .then(response => response.json())
      .then(data  => 
        {
          setF0Info(`Name: ${data.name}. Age: ${data.age}`)
      });
  }

function addnew(){
    setId('')
    setDot('')
    setTemperature(0)
    setSpo2(0)
    setSymptoms('')
    setPrescription('')
    setNote('')
}

// function search(){

//   const pageSize = document.querySelector("#pageSize").value
//   const pageNo = document.querySelector("#pageNo").value


//   fetch(endPoint + "/search?keyword="+keyword+"&pageSize="+pageSize+"&pageNo="+pageNo)
//   .then(response => response.json())
//   .then(data => {
//     populatePageNo(data.Size)
//     setData(data.Items)
//   }  
// )}

// function populatePageNo(size){

//   const pageSize = document.querySelector("#pageSize").value
//   const noPage = size/pageSize
//   const pageNoSelect = document.querySelector("#pageNo")
  
//   while (pageNoSelect.options.length > 1) {                
//     pageNoSelect.remove(0);
//   }     

//   for (var i = 1; i<=noPage; i++){
//     var opt = document.createElement('option');
//     opt.value = i;
//     opt.innerHTML = i;
//     pageNoSelect.appendChild(opt);
// }
// }

//load data automatically
useEffect(() => {
  load()
  loadF0()
 }, [])


return (
  <div>
      <h2>Quản lý khám bệnh</h2>
   

   
      <label>F0 : </label>
    <p>  {f0Info}</p>
     

   
   

      <input type="hidden" className="form-control" value={id} onChange={(e)=>setId(e.target.value)}/>
      
      <div class="form-group">
      <label>Ngày:</label><input type="datetime-local" className="form-control" value={dot} onChange={(e)=>setDot(e.target.value)}/>
      </div>
      <div class="form-group">
      <label>Nhiệt độ:</label><input type="number" min="30" max="50" className="form-control" value={temperature} onChange={(e)=>setTemperature(e.target.value)}/>
      </div>

      <div class="form-group">
      <label>Spo2: {error}</label><input type="number"  min="70" max="100" className="form-control" value={spo2} onChange={(e)=>setSpo2(e.target.value)}/> 
      </div>
      <div class="form-group">
      <label>Triệu chứng : </label><input type="text"   className="form-control" value={symptoms} onChange={(e)=>setSymptoms(e.target.value)}/> 
      </div>
      <div class="form-group">
      <label>Toa thuốc : </label><input type="text"   className="form-control" value={prescription} onChange={(e)=>setPrescription(e.target.value)}/> 
      </div>
      <div class="form-group">
      <label>Ghi chú : </label><input type="text"   className="form-control" value={note} onChange={(e)=>setNote(e.target.value)}/> 
      </div>

      <button type='submit' class="btn btn-primary" onClick={()=> save()}>Lưu</button>

      <button class="btn btn-primary" onClick={()=> addnew()}>Nhập mới</button>

      <h2>Danh sách khám bệnh</h2>

        {/* <div class="row">
          <div class="col-md-8">
            <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <button onClick={()=>search()}>Search</button>
          </div>
          <div class="col-md-4">
            Page Number: 
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
        </div> */}

       <table class="table table-striped">
       <thead>
      <tr>
      <th>Ngày</th>
      {/* <th> Giờ</th> */}
        <th>Nhiệt độ</th>
        <th>Spo2</th>
        <th>Triệu chứng</th>
        <th>Toa thuốc</th>
        <th>Ghi chú</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>      
      {data.map(a => (
        <tr>
          <td>{moment(a.dot).format("DD/MM/YYYY, HH:mm")}</td>
            <td>{a.temperature}</td>
            <td>{a.spo2}</td>
            <td>{a.symptoms}</td>
            <td>{a.prescription}</td>
            <td>{a.note}</td>
            <td><button className="btn btn-warning" onClick={()=> deleteExam(a._id)}>Xóa</button>
            <button className="btn btn-warning" onClick={()=> editExam(a._id, moment(a.dot).format("YYYY-MM-DDTHH:mm"),a.temperature, a.spo2, a.symptoms, a.prescription, a.note)}>Sửa</button></td>
        </tr>
      ))}
      </tbody>
       </table>
      
  </div>
);
}

{/* <td>
{b.exams.map(e=>
    <span>{e.spo2} |</span>
 )}  
 </td> */}