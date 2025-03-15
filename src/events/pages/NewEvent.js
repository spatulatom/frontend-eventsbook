import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./EventForm.css";

const NewEvent = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "address",
        isValid: true,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/events",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="event-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="description"
          element="textarea"
          label="Event's description:"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter between 2-1000 characters."
          // onInput cuold be called anuthing, it only passes function dosent really
          // do anything like onInput or onChange inside of Input element where
          // event.target.value is gathered
          onInput={inputHandler}
        />
        <p className="location-hint">
          You can pick any location from this list of cities (case insensitive):
          Athens, Berlin, Cairo, Dublin, Edinburgh, Florence, Geneva, Helsinki,
          Istanbul, Jakarta, Kathmandu, London, Moscow, New York, Oslo, Paris,
          Quebec, Rome, Sydney, Tokyo, Ulaanbaatar, Vienna, Warsaw, Xi'an,
          Yokohama, Zurich
        </p>
        <Input
          id="address"
          element="input"
          label="Event's location:"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a location's approximation or an exact address (max 200 characters)."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Pick a photo."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD EVENT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewEvent;
