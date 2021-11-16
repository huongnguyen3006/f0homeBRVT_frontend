import React, { useState, useEffect } from "react"

export default function Lecture() {
const [data, setData] = useState([]);
const endPoint = "/lectures"
const [name, setName] = useState('')
const [teacher, setTeacher] = useState("")
const [slides, setSlides] = useState("")
const [video, setVideo] = useState("")
const [date, setDate] = useState("")
const [id, setId] = useState('')
const [uploadMessage, setUploadMessage] = useState('');



const [keyword, setKeyword] = useState('')

const save = () => {
 
    if (id===''){
       fetch(endPoint, {
           method: 'POST',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ name: name, teacher: teacher, slides: slides, video: video, date: date})
       }).then(data => search())
   }
   else{
       fetch(endPoint, {
           method: 'PUT',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ id: id, name: name, teacher: teacher, slides: slides,  video:  video, date: date})
       }).then(data => search())
   }
 
   }
 
const deleteLecture = (id) => {
   fetch(endPoint+"/"+id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       }
   }).then(data => search())
}
 
const editLecture = (id, name, teacher,  slides, date , video) => {
   setId(id)
   setName(name)
   setTeacher(teacher)
   setSlides(slides)
   setDate(date)
   setVideo(video)
  
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
    setTeacher('')
    setSlides('')
    setDate('')
    setVideo('')

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
  
    fetch('http://localhost:4001/uploadfile', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setSlides(data.path)
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
      <h2>Quản lý bài giảng</h2>
      <input type="hidden" className="form-control" value={id} onChange={(e)=>setId(e.target.value)}/>

      <div class="form-group">
      <label>Tên bài giảng</label><input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>

      <div class="form-group">
      <label>Người giảng:</label><input type="text" className="form-control" value={teacher} onChange={(e)=>setTeacher(e.target.value)}/> 
      </div>


      <div class="form-group">
      <label>Đường link:</label><input type="text" className="form-control" value={video} onChange={(e)=>setVideo(e.target.value)}/> 
      </div>


      <div class="form-group">
      <label>Ngày:</label><input type="datetime-local" className="form-control" value={date} onChange={(e)=>setDate(e.target.value)}/> 
      </div>



      <div class="form-group">
      <label>Slides:</label>
      <input type="file" onChange={()=>handleFileUpload()}/> {uploadMessage}

      
      {/* <button onClick={()=>handleFileUpload()}>Upload</button> */}
      </div>

      <button class="btn btn-primary" onClick={()=> save()}>Save</button>

      <button class="btn btn-primary" onClick={()=> addnew()}>Add new</button>

      <h2>Danh sách bai giảng</h2>

        <div class="row">
          <div class="col-md-8">
            <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <button onClick={()=>search()}>Search</button>
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
        <th>Tên bài giảng</th>
        <th>Người giảng</th>
        <th>Video</th>  
        <th>Ngày</th> 
        <th>Slides</th>
       
       
    
      </tr>
    </thead>
    <tbody>      
      {data.map(a => (
        <tr>
            <td>{a.name}</td>
            <td>{a.teacher}</td>
            <td>{a.Slides}</td>
            <td>{a.Date}</td>
            <td>{a.Video}</td>
            <td><img style={{width:"60px", height:"60px", "border-radius":"30px"}} src={'http://localhost:4001/'+a.avatar}/></td>
            <td><button className="btn btn-warning" onClick={()=> deleteLecture(a._id)}>Delete</button>
            <button className="btn btn-warning" onClick={()=> editLecture (a._id, a.name, a.teacher, a.slides, a.data, a.video)}>Edit</button></td>
        </tr>
      ))}
      </tbody>
       </table>
      
  </div>
);
}
