import React, { useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./CreateAccount.css";

const CreateAccount = () => {
  const auth = useContext(AuthContext);
  // const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    console.log("authSubmitHandler");
    event.preventDefault();

    try {
      const formData = new FormData();
      console.log("authSubmitHandler222");
      formData.append("email", formState.inputs.email.value);
      formData.append("name", formState.inputs.name.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("image", formState.inputs.image.value);
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/signup",
        "POST",
        formData
      );
      console.log("auth", responseData.name);
      auth.login(responseData.userId, responseData.token, responseData.name);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="create-account">
        {isLoading && <LoadingSpinner asOverlay />}
        <h1>Sign Up</h1>
        <h4>It's quick and easy.</h4>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="name"
            type="text"
            // label="*Nazwa użytkownika"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
            placeholder="First name"
          />

          <ImageUpload
            center
            id="image"
            onInput={inputHandler}
            errorText="Choose any photo as your avatar."
          />

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
          <Input
            element="input"
            id="password"
            type="password"
            // label="*Hasło"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
            placeholder="New password"
          />

          {/* <Button type="submit" disabled={!formState.isValid}>
            Sign Up
          </Button> */}

<Button 
  type="button"
  onClick={(e) => {
    console.log("Button clicked, form valid?", formState.isValid);
    if (formState.isValid) {
      authSubmitHandler(e);
    } else {
      console.log("Form is not valid, cannot submit");
      alert("Please fill out all required fields correctly");
    }
  }}
  style={{
    width: "50%",
    padding: ".8rem",
    opacity: !formState.isValid ? 0.5 : 1,
  }}
>
  Sign Up
</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default CreateAccount;
