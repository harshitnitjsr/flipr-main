import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import auth from './../auth/auth-help'
import jwt1 from 'jwt-decode' // import dependency
import logo from "../images/IMG-20201113-WA0051.jpg"; // with import
import {read} from '../api/api-post';
import {toast} from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
import BarLoader from "react-spinners/PulseLoader";
import { useParams } from "react-router";
import {update,edit} from "../api/api-post"
import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";

const EditPosts = () => {

const nav=useNavigate();
    const params = useParams();
    // console.log(params)

  const [picLoading, setPicLoading] = useState(false);
  const [picLoading1, setPicLoading1] = useState(false);
  //  const [values, setValues] = useState({
  // })
const [postdata,setpostdata]=useState({})
  const jwt = auth.isAuthenticated()
  const user1 = jwt1(jwt.token);

//   console.log(user1);
 

  const readPosts = async () => {
    try {
        let response = await fetch('https://backend3.vercel.app'+'/api/post/' + params.postid, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': jwt.token
          }
        })
        console.log("params.postid",params.postid)
        return await response.json()
      } catch(err) {
        console.log(err)
      }
  }

  useEffect(()=>{

    //  read( {userId: user1.id
    // },{
    //   t: jwt.token
    // },).then((data)=>{
    //     if(data)
    //     // console.log(data)
    //     // setValues({...values,name:data.name , email:data.email , image:data.image , about:data.about,update:data.updated});
    // })
      

readPosts().then((data)=>{
    if(data)
    console.log(data)
    setpostdata({...postdata,caption:data.caption,photo:data.photo})
  })
   
  


  },[])




const ImageHander=(pics)=>
  {
     setPicLoading1(true)
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dwjy0lwss");
      fetch("https://api.cloudinary.com/v1_1/dwjy0lwss/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          
          setpostdata({...postdata,photo:data.url.toString()})
          console.log(data.url.toString());
          setPicLoading1(false);
          return 
          //65e360a4c353b2cf99a51297  
          //65e37754b7a72fdf2e2bfb8f
        })
        .catch((err) => {
          toast.error('Some Thing Wron1g',{position: toast.POSITION.TOP_LEFT,autoClose:1000})
          setPicLoading1(false);
        });
    } else {
          toast.error('Photo is invalid',{position: toast.POSITION.TOP_LEFT,autoClose:1000})
      setPicLoading1(false);
      return;
    }
  };
    
  const edit = async()=>{
    
  }
  const clickSubmit =async () => {
    // update({
    //     postid: params.postid
    // }, {
    //   t: jwt.token
    // }, values).then((data) => {
    //   if (data) {
    //     {
    //    toast.success('Data Updated',{position: toast.POSITION.TOP_LEFT,autoClose:1000})
    //    nav('/user/'+user1.id)

    //     }
    //   } 
    // })
      
// e.preventdefault()

    try {
      let response = await fetch('https://backend3.vercel.app'+'/api/post/update/' + params.postid,{
        method: 'PUT',
        headers: {
          
          'Content-Type': 'application/json',
          'Authorization':  jwt.token
        },
        body:  JSON.stringify(postdata),
      })
      let d=await response.json()
      console.log(d)
       
    } catch (error) {
      console.log(error)
    }





    // const update = async (params, credentials, Values) => {
    //   let v = {name:"FFF"}
    //   try {
    //     let response = await fetch(baseurl+'/api/users/update/' + params.userId, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization':credentials.t
    //       },
    //       body:  JSON.stringify(Values),
    //     })
    //     return await response.json()
    //   } catch(err) {
    //     console.log(err)
    //   }
    // }
  }



  return (
    <div>
     <NavBar/>
   
  {/*-------------------------------------------------------------- body -------------------------------------------------------------*/}
 
  <div className="d-flex flex-column py-5 align-items-center mt-5">
    <div className="d-flex flex-column align-items-center flex-lg-row align-items-lg-start m-auto">
      <div className="position-relative">
        <img
          src={postdata.photo}
          alt=""
          className="rounded"
          style={{ width: 280 }}
        />
        <BarLoader loading={picLoading1} size={15} />
        <label htmlFor="file-input">
          <i className="fa-solid fa-camera fs-2 camera_icon" />
        </label>
       <input id="file-input" onChange={(e)=>ImageHander(e.target.files[0])} 
               accept="image/*" name="photo"
               type="file" className="d-none" />
      </div>
      <div style={{ width: 450 }} className="px-5 pt-4 pt-lg-0">
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Caption
          </label>
          <input
            onChange={(e)=>setpostdata({...postdata,caption:e.target.value})}
            value={postdata.caption}
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="name..."
          />
        </div>
        
        <div className=" d-flex justify-content-center">
          <button onClick={()=>{nav(-1)}} type="button" className="btn btn-dark mt-2 px-4">
            Back To Profile
          </button>
          <button onClick={clickSubmit} type="button" className="btn btn-primary ml-2 mt-2 px-4">
            <i className="fa-solid fa-pen me-2" />
            Update
          </button>
        </div>
        <p className="mt-2 d-flex justify-content-center">last update : {new Date(postdata.update).toLocaleString()} </p>
      </div>
    </div>
  </div>




</div>



















  )
}

export default EditPosts