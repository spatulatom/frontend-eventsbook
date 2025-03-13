import React, { useState, useContext} from 'react';
import {Link} from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
 
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Login.css';
import Modal from '../../shared/components/UIElements/Modal';
import CreateAccount from './CreateAccount';

const Login = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );



  const stateHandler = ()=>{
    setIsLoginMode(prevMode => !prevMode); 
  }

  const authSubmitHandler = async event => {
    event.preventDefault();

      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+'/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        console.log('auth', responseData.name);
        auth.login(responseData.userId, responseData.token, responseData.name);
      } catch (err) {}
  
    
  };

  return (
    <React.Fragment>
       
      <ErrorModal error={error} onClear={clearError} />
      <Modal show={isLoginMode} onCancel={stateHandler} className="create-account" headerClass="create-account"
      contentClass="create-account" footerClass="create-account" backdropClass="create-account">
        <CreateAccount/>
       </Modal>
       <div className="auth-whole-page">
            <Card className="authentication content">
                <h1>eventsbook</h1>
                <p class="authentication__description">Connect with your friends and the world around you on <span>eventsbook</span>.</p>
                <p class="authentication__note">Note:

                <br/> 1. Log In - log in as a Guest with an email: guest@guest.com, a password: guest1 and explore the app for yourself!
                
                <br/> 2. Create a new account - it only takes a few seconds, any picture as a user's avatar and an email
                 address are needed (you can use dummy email address). 
               
                </p>
            </Card>

            <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}

            <form onSubmit={authSubmitHandler}>
            
            <Input
                element="input"
                id="email"
                type="email"
                // label="*E-Mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={inputHandler}
                placeholder="Your email address"
            />
            <Input
                element="input"
                id="password"
                type="password"
                // label="*Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password, at least 6 characters."
                onInput={inputHandler}
                placeholder="Your password"
            />
            
            <Button inverse type="submit" disabled={!formState.isValid}>
                Log In
            </Button>
            </form>
        
            
            
            <Link style={{ color: 'inherit', textDecoration: 'inherit'}}to="/reset">
            <h5>Forgot password?</h5>
            </Link>  
            <hr/>
            <Button inverse onClick={stateHandler}>
            Create new account
            </Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Login;
