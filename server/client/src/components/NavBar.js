import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from "../App"

const NavBar = () =>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = () =>{
        if(state){
            return[
            <li key="1"><Link to="/profile" className="sign"><i className="material-icons left">insert_emoticon</i>Profile</Link></li>,
            <li key="2"><Link to="/createpost" className="sign"><i className="material-icons left">create</i>Create Post</Link></li>,
            <li key="2"><Link to="/getsubpost" className="sign"><i className="material-icons left">home</i>Home</Link></li>,
            // <li key="3"><Link to="/about" className="sign"><i className="material-icons left">info_outline</i>About</Link></li>,
            <li key="4">
                <button className="btn waves-effect #b71c1c red darken-4" style={{color:"white"}} type="submit" name="action" onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    M.toast({html:"Logged out Successfully",classes:"#43a047 green darken-1 round"})
                    history.push("/signin")
                }}>Signout</button>
            </li>
            
        ]
        }
        else{
            return[
            <li key="5"><Link to="/signin" className="sign">Signin</Link></li>,
            <li key="6"><Link to="/signup" className="sign">Signup</Link></li>,
            <li key="3"><Link to="/about" className="sign"><i className="material-icons left">info_outline</i>About</Link></li>
            ]
        }
    }
    return(
        <nav>
        <div className="nav-wrapper blue ">
            <Link to={state?"/":"/signup"} className="brand-logo left ">Instatify</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
            </ul>
        </div>
        </nav>
    )
}

export default NavBar;