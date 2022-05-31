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
import './PlaceForm.css';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: 'title',
        isValid: true
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: 'adress',
        isValid: true
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );
  // originally state looke like this before we got the useForm hook
  // const [formState, inputHandler] = useForm(
  //   {
  //  inputs:{   title: {
  //       value: 'title',
  //       isValid: true
  //     },
  //     description: {
  //       value: '',
  //       isValid: false
  //     },
  //     address: {
  //       value: 'adress',
  //       isValid: true
  //     },
  //     image: {
  //       value: null,
  //       isValid: false
  //     }
  //   }},
  //   isValid:false
  // );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      await sendRequest(process.env.REACT_APP_BACKEND_URL+'/places', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        {/* <Input
          id="title"
          element="input"
          type="text"
          label="Tytuł"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        /> */}
        <Input
          id="description"
          element="textarea"
          label="Opis"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Wpisz wyżej minimum 5 znaków."
          // onInput cuold be called anuthing, it only passes function dosent really 
          // do anything like onInput or onChange inside of Input element where 
          // event.target.value is gathered 
          onInput={inputHandler}
        />
        {/* <Input
          id="address"
          element="input"
          label="Gdzie"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        /> */}
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Wybierz zdjęcie."
        />
        <Button type="submit" disabled={!formState.isValid}>
          DODAJ
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
