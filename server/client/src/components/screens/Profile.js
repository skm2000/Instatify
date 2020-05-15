import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from "../../App"

// const Profile = () =>{
//     const [mypics,setPics]=useState([])
//     const {state,dispatch}=useContext(UserContext)
//     const [image,setImage] = useState("")
//     const [url,setUrl] = useState("")
//     useEffect(()=>{
//         fetch('/mypost',{
//             headers:{
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             }
//           }).then(res=>res.json())
//           .then(result=>{
//             //   console.log(result)
//             setPics(result.mypost)
//         })
//     },[])

//     useEffect(()=>{
//         if(image){
//             const data = new FormData()
//             data.append("file",image)
//             data.append("upload_preset","Instatify")
//             data.append("cloud_name","shubham123")
//             fetch("https://api.cloudinary.com/v1_1/shubham123/image/upload",{
//                 method:"post",
//                 body:data
//             })
//             .then(res=>res.json())
//             .then(data=>{
//                fetch('/updatepic',{
//                    method:"put",
//                    headers:{
//                        "Content-Type":"application/json",
//                        "Authorizaton":"Bearer "+localStorage.getItem("jwt")
//                    },
//                    body:JSON.stringify({
//                        pic:data.url
//                    })
//                }).then(res=>res.json())
//                .then(result=>{
//                    console.log(result)
//                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
//                    dispatch({tpye:"UPDATEPIC",payload:result.pic})
//                })
//             })
//             .catch(err=>{
//                 console.log(err)
//             })
//         }
//     },[image])
//     const updatePhoto = (file) =>{
//         setImage(file)
//     }
const Profile  = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[])
    useEffect(()=>{
       if(image){
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
    
       
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }

    return(
        <div style={{maxWidth:"900px",margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"200px",height:"200px",borderRadius:"100px"}}
                        src={state?state.pic:"https://res.cloudinary.com/shubham123/image/upload/v1588625311/noImage_bpolwx.png"}
                    />
                </div>
                <div>
                    <h3>{state?state.name:"Loading..."}     <div className="file-field input-field">
                    <div className="btn waves-effect blue ">
                        <i className="material-icons right">touch_app</i>
                        <span>Update Pic</span>
                        <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div></h3>
                    <h4>{state?state.email:"Loading..."}</h4>
                    <div style={{display:"flex",justifyContent:"space-around",width:"108%"}}>
                        <h5>{mypics.length} posts</h5>
                        <h5>{state?state.followers.length:"0"} Followers</h5>
                        <h5>{state?state.following.length:"0"} Following</h5>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile