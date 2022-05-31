import React, {useState, useEffect, useContext} from 'react';

import {useHttpClient} from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';

import './Likes.css';



const Likes = props => {
const auth = useContext(AuthContext);
const { isLoading, error, sendRequest, clearError } = useHttpClient();
const [like, setLike] = useState(false);
const [likes, setLikes] = useState(props.likes);


useEffect(()=>{
if(props.likes.find(item=>{
  return  item.userId===auth.userId
})) {setLike(true)}
else{setLike(false)}
},[])

const handleLike = ()=>{
   setLike(prev=>!prev)
}

const addLikes = async()=>{
 try{
     const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/likes-add`,
        'POST',
        JSON.stringify({
            placeId: props.placeId
        }),
        {
            'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      setLikes(responseData)
    } catch (err) {}
 
}

const removeLikes = async()=>{
    try{
        const responseData = await sendRequest(
           `${process.env.REACT_APP_BACKEND_URL}/places/likes-delete`,
           'DELETE',
           JSON.stringify({
               placeId: props.placeId
           }),
           {
               'Content-Type': 'application/json',
             Authorization: 'Bearer ' + auth.token
           }
         );
         setLikes(responseData)

       } catch (err) {}
    
   }
console.log('PROPS.LIKES', props.likes)
console.log('LIKES', likes)
const addLikesHandler = ()=>{
    addLikes();
    setTimeout(()=>{
    handleLike()},200)
}

const removeLikesHandler = ()=>{
    removeLikes();
    setTimeout(()=>{
        handleLike()}, 200)
}

  return (
    <div>
       {!like? <span className="like add"><i onClick={addLikesHandler} className="fa-solid fa-heart"></i></span> :
        <span className="like remove"><i onClick={removeLikesHandler} className="fa-solid fa-heart"></i></span>}
        <span className="like count">Likes: {likes.length}</span>
        {likes.map(like=>
            <span className="like users">{like.name}<span className="coma">,</span></span>
        )}
        
    
    </div>
  );
};

export default Likes;
