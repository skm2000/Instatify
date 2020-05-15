import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
const CreatePost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3 round"})
              return
           }
           else{
               M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1 round"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
  
   const postDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","Instatify")
       data.append("cloud_name","shubham123")
       fetch("https://api.cloudinary.com/v1_1/shubham123/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })
    }
 

   return(
       <div className="card input-filed"
       style={{
            margin:"100px auto",
            maxWidth: "500px",
            maxHeight: "1000px",
            padding:"20px auto",
       }}>
           <div>
            <h2>Create Post...</h2>
           </div>
           <input 
           type="text"
            placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
           <input
            type="text"
             placeholder="body"
             value={body}
            onChange={(e)=>setBody(e.target.value)}
             />
           <div className="file-field input-field">
           <div className="btn waves-effect blue " style={{color:"black"}}>
                <i className="material-icons right">insert_photo</i>
                <span>Upload Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect blue" style={{color:"black"}} type="submit" name="action" onClick={()=>postDetails()}>Submit Post
                    <i className="material-icons right">send</i>
            </button>

       </div>
   )
}


export default CreatePost