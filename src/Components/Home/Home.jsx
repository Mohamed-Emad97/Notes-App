import React, {useEffect, useState} from 'react';
import Axios from "axios";
import jwtDecode from "jwt-decode";
import swal from 'sweetalert';

export default function Home(props) {

  //Global Variblies
  let baseUrl = `https://route-egypt-api.herokuapp.com/`;
  let userToken = localStorage.getItem("Token");
  if(userToken){
    var userData = jwtDecode(userToken);
  }


  const [notes, setNotes] = useState([]);
  const [NoteId, setNoteId] = useState("");
  const [addNote, setAddNote] = useState({
    title:"", 
    desc:"", 
    userID:`${userData._id}`, 
    token:`${localStorage.getItem("Token")}`
  });
  const [updateNote , setUpdateNote] = useState({
    title:"", 
    desc:"", 
    userID:`${userData._id}`, 
    token:`${localStorage.getItem("Token")}`,
    NoteID:"",
  });

  //Get Note
  function getNote(e){
    let myNote = {...addNote}; //Copy Of State
    myNote[e.target.name] = e.target.value; //To Get Property Dynamically
    setAddNote(myNote);
  }
  //Get Updated Note
  function getUpdatedNote({target}){
    setUpdateNote({...updateNote, [target.name]: target.value});
  }
  
  //Add New Note
  async function addNotes() {
    let apiMethod = `addNote`;
    let {data} = await Axios.post(`${baseUrl}${apiMethod}`, addNote);
    if(data.message === "success") {
      getUserNotes();
      swal({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        buttons: false,
        timer: 1500
      })
    }else {
      swal(
        'Note Not Added!',
        'Your Note Failed To Added.',
        'Not Success'
      )
    }
  }

 
  // //Get Notes From Server
  async function getUserNotes(){
    let apiMethod = `getUserNotes`;
    let {data} = await Axios.get(`${baseUrl}${apiMethod}`,{
      headers:{
        token: localStorage.getItem("Token"),
        userID: userData._id,
      }
    });
    // console.log(data.Notes);
    setNotes(data.Notes);
  }

  //Get Note ID 
  function noteID(id){
    setNoteId(id);
  }

  //Delete Function 
  async function deleteUserNote() {
    let apiMethod = `deleteNote`
    let {data} = await Axios.delete(`${baseUrl}${apiMethod}`,{
      data:{
        NoteID:`${NoteId}`, 
        token:`${localStorage.getItem("Token")}`
      }
    });
    if(data.message === "deleted"){
      getUserNotes();
      swal({
        position: 'center',
        icon: 'success',
        title: 'Your Note has been Deleted',
        buttons: false,
        timer: 1500
      })
    }else {
      swal(
        'Your Note Failed To Deleted.',
        'Not Success'
      )
    }

    // console.log(data);
  }

  //Get Note Index 
  function getIndex(index){
    console.log(notes[index]);
    document.querySelector("#UpdateNoteTitle").value = notes[index].title;
    document.querySelector("#UpdateNoteBody").value = notes[index].desc;
    setUpdateNote({...updateNote, title: notes[index].title ,desc: notes[index].desc , NoteID: notes[index]._id });
  }

  //Update Note 
  async function editNote(e) {
    e.preventDefault();
    console.log(updateNote);
    let apiMethod = `updateNote`;
    let {data} = await Axios.put(`${baseUrl}${apiMethod}`, updateNote);
    if(data.message === "updated") {
      getUserNotes();
      swal({
        position: 'center',
        icon: 'success',
        title: 'Your Note has been Updated',
        buttons: false,
        timer: 2500
      })
    } else {
      swal(
        'Your Note Failed To Update.',
        'Not Success'
      )
    }
    console.log(data);
  }

  useEffect(()=>{
    getUserNotes();
  }, [])

  return (
    <>
    <section id="home" className="py-5">
      <div className="container">
        <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add Notes
        </button>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Notes</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input onChange={getNote} type="text" name="title" id="noteTitle" placeholder='Title' className='w-100 mb-2 p-2' />
                <textarea onChange={getNote} name="desc" id="noteBody" placeholder='Type Your Notes' className='w-100 mb-2 p-2'></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={addNotes} className="btn btn-primary" data-bs-dismiss="modal">Add Note</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {notes&&notes.map((note,i)=> {
              return(
                <>
                  <div key={i} className="col-md-3 my-4">
                    <div className="note p-2">
                      <div className="header center">
                        <h3 className='fs-4'>{note.title}</h3>                      
                        <div className="icon">
                        <span className="delete" onClick={()=>{noteID(note._id)}}  data-bs-toggle="modal" data-bs-target="#deleteNote">
                          <i className="fa-solid fa-trash-can"></i>
                        </span>
                        <span onClick={()=>{getIndex(i)}} className="update" data-bs-toggle="modal" data-bs-target="#updateNote"><i className="fa-solid fa-file-pen"></i></span>
                        </div>
                        {/* Delete Model Body */}
                        <div className="modal fade" id="deleteNote" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Note Delete</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body Text-danger ">
                                Are You Sure To Delete These Note ?
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={()=>{ deleteUserNote()}} data-bs-dismiss="modal">Delete Note</button>
                              </div>
                            </div>
                          </div>
                         </div>

                     
                      {/* Update Modal Body */}

                      <div className="modal fade" id="updateNote" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <input onChange={getUpdatedNote} type="text" name="title" id="UpdateNoteTitle" placeholder='Title' className='w-100 mb-2 p-2' />
                              <textarea onChange={getUpdatedNote} name="desc" id="UpdateNoteBody" placeholder='Type Your Notes' className='w-100 mb-2 p-2'></textarea>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button onClick={editNote} type="button" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      </div>
                      <div className="desc mt-1">{note.desc}</div>
                    </div>
                  </div>
                </>
              )
          })}
        </div>
      </div>
    </section>
    </>
  )
}
