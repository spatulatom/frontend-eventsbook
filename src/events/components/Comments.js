import React, { useContext, useEffect, useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './Comments.css';

const Comments = (props) => {
  const auth = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [comments, setComments]= useState(props.comments);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
    
    },
    false
  );
// const history = useHistory();
  console.log('isLoading', isLoading)
  const commentSubmitHandler = async event => {
    event.preventDefault();
    try {
     const responeData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/comments`,
        'POST',
        JSON.stringify({
          description: formState.inputs.title.value,
            placeId: props.id
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      let response = responeData;
      setComments([...comments, response]);    
      inputHandler("title", '', false);
      console.log( 'response', response);
      setSubmitted(prev=>!prev)
      setTimeout(()=>{
        setSubmitted(prev=>!prev)
      }, 2000)

      // history.push('/');
    } catch (err) {}
  };
  
let comment;
if(comments.length===0){
  comment = <p className="comments__no-comments">Be the first one to post a comment.</p>
  }

  let inputField;
  if(auth.token){
    inputField = 
    <div>
       <Input
          id="title"
          element="input"
          type="text"
          label="Comment:"
          validators={[VALIDATOR_MINLENGTH(2)]}
          errorText="Input at least 2 characters."
          onInput={inputHandler}
          formSubmitted={submitted}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add
        </Button>

    </div>
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      <form className="comments" onSubmit={commentSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay/>}
        {comments.map(comment=>
          <div key={comment.id}>
            <p className="comments__date">{comment.date}, added by: {comment.addedBy}</p>
            <p className="comments__description"> ━ {comment.description}</p>
          </div>
        )}
          {comment}
          {inputField}
      </form>
    </React.Fragment>
  );
};

export default Comments;
// thanks
