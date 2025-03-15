import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./EventForm.css";

const UpdateEvent = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const eventId = useParams().eventId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}`
        );
        setLoadedPlace(responseData.event);
        // setFormData(
        //   {
        //     title: {
        //       value: responseData.place.title,
        //       isValid: true
        //     },
        //     description: {
        //       value: responseData.place.description,
        //       isValid: true
        //     }
        //   },
        //   true
        // );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, eventId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const request = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}`,
        "PATCH",
        JSON.stringify({
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      let response = request.place;
      console.log("place", response);

      history.push("/places");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {/* we are using this conditional rendering here as we want to wait for our 
      // fetched data only then we want input rendered */}
      {!isLoading && loadedPlace && (
        <form className="event-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="description"
            element="textarea"
            label="Event's description:"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            // we can not set initialValue ad assign to it formState.inputs.description.value
            // why? because i dont know it shoul work becuse it is set with lodadPlace in
            // useEffect by the same fetched data, but it dosen relly set it, why?
            // initialValue={formState.inputs.description.value}
            initialValid={true}
          />
          <p className="location-hint">
            You can pick any location from this list of cities (case
            insensitive): Sydney, New York, London, Paris, Tokyo, Warsaw,
            Dublin, Rome, Berlin, Oslo, Milan, Istanbul, Copenhagen, Vienna,
            Jakarta, Kuala Lumpur, Guangzhou, Zurich, Mexico City, Reykjavik,
            Cairo, Nairobi, Beijing, Dubai, Buenos Aires
          </p>
          <Input
            id="address"
            element="input"
            label="Event's location:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a location's approximation or an exact address."
            onInput={inputHandler}
            initialValue={loadedPlace.address}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateEvent;
