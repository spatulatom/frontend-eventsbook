import React, { useState } from 'react';


import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import SuccessModal from '../../shared/components/UIElements/SuccessModal';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL
} from '../../shared/util/validators';


import { useHttpClient } from '../../shared/hooks/http-hook';
import './Auth.css';

const Reset = () => {
  
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [success, setSuccess]= useState();
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
    },
    false
  );


  

  // const emailHandler = event=>{
  //     setEmail(event.target.value);
  //     const at = "@"
  //    if(event.target.value.includes(at)){
  //       setValid(true)
  //    }
  // }
    
      

  const authSubmitHandler = async event => {
    event.preventDefault();

    
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/reset',
          'POST',
          
          JSON.stringify({
            email: formState.inputs.email.value,
            
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        setSuccess(responseData.message);
        setEmail('')
      } catch (err) {}
    } 
    const clearSuccess = () => {
        setSuccess(null);
      };
    

  return (
    <React.Fragment>
      <SuccessModal success={success} onClear={clearSuccess}/>  
      <ErrorModal error={error} onClear={clearError} />
      <Card className="reset">
        {isLoading && <LoadingSpinner asOverlay />}
        <h4>Enter your registration email adress:
        </h4>
        <hr />
        <form onSubmit={authSubmitHandler}>
        <Input
            element="input"
            id="email"
            type="email"
            // label="*E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
            placeholder="Email adress"
          />
        <Button type="submit" disabled={!formState.isValid}>
            Send
        </Button>
        </form>
        
        
         
      </Card>
    </React.Fragment>
  );
};

export default Reset;
