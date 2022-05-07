import React, { useContext } from 'react';
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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: 'description',
        isValid: true
      },
      address: {
        value: 'adress',
        isValid: true
      },
      image: {
        value: null,
        isValid: true
      }
    },
    false
  );

 
  const history = useHistory();

  const commentSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
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
      history.push('/');
    } catch (err) {}
  };
  console.log('comments', props.comments)
  

  let comment;
  if(props.comments.length===0){
    comment= <p className="no-comments">Nikt jeszcze nie dodał komentarza.</p>
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      <form className="place-form-comments" onSubmit={commentSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        
        <Input
          id="title"
          element="input"
          type="text"
          label="Skomentuj:"
          validators={[VALIDATOR_MINLENGTH(2)]}
          errorText="Wpisz minimum dwa znaki."
          onInput={inputHandler}
        />
       
        <Button type="submit" disabled={!formState.isValid}>
          DODAJ KOMENTARZ
        </Button>
        <h4 className="comments-header">Komentarze:</h4>
        {props.comments.map(comment=>
            <div>
                <p className= "comments">{comment.date}, <span className='comments_name'>skomentował/a {comment.addedBy}:</span> </p>
              
                  <p className = "comments"> <span className='comments-description'> --- {comment.description}</span></p>
            </div>

           )}
            {comment}
      </form>
      
      
    </React.Fragment>
  );
};

export default Comments;
