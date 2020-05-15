import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/NavBar'
import "./App.css"
import {reducer,initialState} from "./reducers/userReducer"
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signup from "./components/screens/Signup"
import Signin from "./components/screens/Signin"
import Profile from "./components/screens/Profile"
import About from './components/screens/About'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribedUserPosts';



export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }
    else{
      history.push('/signup')
    }
  },[])
  return(
      <Switch>
      <Route path="/" exact>
      <Home/>
      </Route>
      <Route path="/signin">
        <Signin/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route path="/profile" exact>
        <Profile/>
      </Route>
      <Route path="/about">
        <About/>
      </Route>
      <Route path="/createpost">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile/>
      </Route>
      <Route path="/myfollowingposts">
        <SubscribedUserPosts/>
      </Route>
      </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar/>
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
