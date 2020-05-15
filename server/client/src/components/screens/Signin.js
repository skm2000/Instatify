import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import{UserContext} from "../../App"

const Signin = () =>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const getData = ()=>{
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#b71c1c red darken-4 rounded"})
            }
            else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                M.toast({html: "Invalid Email",classes:"#b71c1c red darken-4 rounded"})
                return
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Signed Sucessfully!", classes:"#00e676 green accent-3 rounded"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="my-card">
            <div className="auth-card input-field">
                <h2>Instatify</h2>
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
                <button className="btn waves-effect blue" type="submit" name="action" onClick={()=>getData()}>Signin
                    <i className="material-icons right">send</i>
                </button>
                <h6>
                    <p>Don't have an account?</p>
                    <Link to='/signup'>Signup</Link>
                </h6>
            </div>
        </div>
    )
}

export default Signin