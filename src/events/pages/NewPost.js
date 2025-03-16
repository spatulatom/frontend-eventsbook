import React, { useContext } from "react";
import {useNavigate } from "react-router-dom";

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

const NewPost = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "adress",
        isValid: true,
      },
    },
    false
  );

  const navigate = useNavigate();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      console.log("POSTITEM");
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events/post`,
        "POST",
        JSON.stringify({
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      navigate("/");
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
          validators={[VALIDATOR_MINLENGTH(2)]}
          errorText="Enter between 2-1000 characters."
          onInput={inputHandler}
        />
        <p className="location-hint">
          You can pick any location from this list of cities (case insensitive):
          Athens, Berlin, Cairo, Dublin, Edinburgh, Florence, Geneva, Helsinki,
          Istanbul, Jakarta, Kathmandu, London, Milan, New York, Oslo, Paris,
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

        <Button type="submit" disabled={!formState.isValid}>
          ADD EVENT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPost;
