import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from "../../App"
import {Link} from 'react-router-dom'

const SubscribedUserPosts = () =>{
   const [data,setData] = useState([])
   const {state,dispatch} = useContext(UserContext)
   useEffect(() => {
      fetch('/getsubpost',{
         headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
      }).then(res=>res.json())
      .then(result=>{
         setData(result.posts)
      })
   },[])

   const likePost = (id)=>{
      fetch('/like',{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
            postId:id
         })
      }).then(res=>res.json())
      .then(result=>{
         // console.log(result)
         const newData=data.map(item=>{
            if(item._id===result._id){
               return result
            }else{
               return item
            }
         })
         // console.log(newData)
         setData(newData)
      }).catch(err=>{
         console.log(err)
      })
   }

   const unlikePost = (id)=>{
      fetch('/unlike',{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
            postId:id
         })
      }).then(res=>res.json())
      .then(result=>{
         // console.log(result)
            const newData=data.map(item=>{
               if(item._id===result._id){
                  return result
               }else{
                  return item
               }
            })
            // console.log(newData)
            setData(newData)
            }).catch(err=>{
            console.log(err)
         })
   }

   const lovePost = (id)=>{
      fetch('/love',{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
            postLove:id
         })
      }).then(res=>res.json())
      .then(result=>{
         // console.log(result)
         const newData=data.map(item=>{
            if(item._id===result._id){
               return result
            }else{
               return item
            }
         })
         // console.log(newData)
         setData(newData)
      }).catch(err=>{
         console.log(err)
      })
   }

   const whatshotPost = (id)=>{
      fetch('/whatshot',{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
            postLove:id
         })
      }).then(res=>res.json())
      .then(result=>{
         // console.log(result)
         const newData=data.map(item=>{
            if(item._id===result._id){
               return result
            }else{
               return item
            }
         })
         // console.log(newData)
         setData(newData)
      }).catch(err=>{
         console.log(err)
      })
   }

   const happyPost = (id)=>{
      fetch('/happy',{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
            postHappy:id
         })
      }).then(res=>res.json())
      .then(result=>{
         // console.log(result)
         const newData=data.map(item=>{
            if(item._id===result._id){
               return result
            }else{
               return item
            }
         })
         // console.log(newData)
         setData(newData)
      }).catch(err=>{
         console.log(err)
      })
   }


   const sadPost = (id)=>{
      fetch('/sad',{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
            postHappy:id
         })
      }).then(res=>res.json())
      .then(result=>{
         // console.log(result)
         const newData=data.map(item=>{
            if(item._id===result._id){
               return result
            }else{
               return item
            }
         })
         console.log(newData)
         setData(newData)
      }).catch(err=>{
         console.log(err)
      })
   }

   const makeComment = (text,postId)=>{
      fetch('/comment',{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
            postId,
            text
         })
      }).then(res=>res.json())
      .then(result=>{
         const newData=data.map(item=>{
            if(item._id===result._id){
               return result
            }else{
               return item
            }
         })
         setData(newData)
      }).catch(err=>{
         console.log(err)
      })
   }

   const deletePost = (postid)=>{
      fetch(`/deletepost/${postid}`,{
         method:"delete",
         headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
         }
      }).then(res=>res.json())
      .then(result=>{
         const newData = data.filter(item=>{
            return item._id !== result._id
         })
         setData(newData)
      })
   }

    return(
        <div className="home">
        {
           data.map(item=>{
            return(
               <div className="card home-card">
                  <h5 className="myfeilds"><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id:"/profile"}>PostedBy : {item.postedBy.name}</Link> {item.postedBy._id===state._id
                  && <i className="material-icons right small " 
                           onClick={()=>{deletePost(item._id)}} 
                           style={{color:"darkred"}}>delete
                     </i>
                  }
                  </h5>
                  <div className="card-image">
                     <img src={item.photo}/>
                  </div>
                  <div className="card-content ">


                     {
                        item.likes.includes(state._id)
                        ?
                        <i className="material-icons right small" 
                           onClick={()=>{unlikePost(item._id)}} 
                           style={{color:"black"}}>thumb_down
                        </i>
                        :
                        <i className="material-icons right small" 
                           onClick={()=>{likePost(item._id)}} 
                           style={{color:"green"}}>thumb_up
                        </i>
                     }

                     
                     {
                        item.loves.includes(state._id)
                        ?
                        <i className="material-icons right small" 
                           onClick={()=>{whatshotPost(item._id)}}
                           style={{color:"orange"}}>whatshot
                        </i>
                        :
                        <i className="material-icons right small" 
                           onClick={()=>{lovePost(item._id)}}
                           style={{color:"red"}}>favorite
                        </i>   
                     }

                     {
                        item.happy.includes(state._id)
                        ?
                        <i className="material-icons right small" 
                           onClick={()=>{sadPost(item._id)}}
                           style={{color:"maroon"}}>sentiment_very_dissatisfied
                        </i> 
                        :
                        <i className="material-icons right small" 
                           onClick={()=>{happyPost(item._id)}}
                           style={{color:"deeppink"}}>sentiment_very_satisfied
                        </i>  
                     }

                     <h6 className="likes">{item.likes.length} Likes || {item.loves.length} Loves || {item.happy.length} Smiles</h6>
                     <h5>{item.title}</h5>
                     <i className="material-icons right small "
                           style={{color:"black"}}>delete
                     </i>
                     <p>{item.body}</p>
                     {
                        item.comments.map(record=>{
                           return(
                              <h6 key={record._id}><span style={{fontWeight:"500px"}}>{record.postedBy.name} : </span>{record.text}</h6>
                           )
                        })
                     }
                     <form onSubmit={(e)=>{
                        e.preventDefault()
                        makeComment(e.target[0].value,item._id)
                     }}>
                        <input type="text" placeholder="Add a comment"/>
                     </form>
                  </div>
               </div>
            )
           })
        }
        </div>
    )
}

export default SubscribedUserPosts