import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () =>{

    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

    useEffect(() => {
        if(url){
            uploadFields()
        }
    }, [url])

    const uploadPic = ()=>{
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

    const uploadFields = () =>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#b71c1c red darken-4 rounded"})
                return
            }
            else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                M.toast({html: "Invalid Email",classes:"#b71c1c red darken-4 rounded"})
                return
            }
            else{
                M.toast({html: data.message, classes:"#00e676 green accent-3 rounded"})
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    } 

    const postData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }
    
    return(
        <div className="my-card">
            <div className="auth-card input-field">
                <h2>Welcome .....</h2>
                <input
                    type="text"
                    placeholder="name"
                    value = {name}
                    onChange = {(e)=>{setName(e.target.value)}}
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange = {(e)=>{setEmail(e.target.value)}}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange = {(e)=>{setPassword(e.target.value)}}
                />
                 {/* <input placeholder="birthday" type="date"></input> */}
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
                 <button className="btn waves-effect blue" type="submit" name="action" onClick={()=>postData()}>Signup
                    <i className="material-icons right">send</i>
                </button>
                <h6>
                    <p>Already have an account?</p>
                    <Link to='/signin'>Signin</Link>
                </h6>
            </div>
        </div>
    )
}

export default Signup