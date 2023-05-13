import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import Input from "./Input.js";
import Icon1 from "./icon";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { gapi } from "gapi-script";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Icon,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { signin, signup } from "../../actions/auth.js";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function Auth() {
  /* Declaring a state variable called `showPassword` and a function to update it called
`setShowPassword`, using the `useState` hook. The initial value of `showPassword` is `false`. */

  /* This line of code is using the `useState` hook to declare a state variable called `formData` and a
function to update it called `setFormData`. The initial value of `formData` is set to
`initialState`, which is an object containing properties for `firstName`, `lastName`, `email`,
`password`, and `confirmPassword`. The `useState` hook returns an array with two elements: the
current state value (`formData`) and the function to update it (`setFormData`). This line of code is
using destructuring assignment to assign these two elements to the variables `formData` and
`setFormData`, respectively. */
  const [formData, setFormData] = useState(initialState);

  const history = useHistory();
  const clientId =
    "322133279664-sbeiiku1dkd6k9h1aij1of8ok3ffe8h3.apps.googleusercontent.com";
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  /* `handleShowPassword` is a function that toggles the value of the `showPassword` state variable
between `true` and `false`. It does this by calling the `setShowPassword` function with a callback
that takes the previous value of `showPassword` and returns the opposite value using the logical NOT
operator (`!`). This function is passed as a prop to the `Input` component for the password field,
so that the user can toggle the visibility of their password. */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    /* `const result = res?.profileObj;` is using the optional chaining operator (`?.`) to access the
`profileObj` property of the `res` object, which is returned by the `GoogleLogin` component when the
user successfully logs in with their Google account. The optional chaining operator is used to avoid
a runtime error in case the `res` object is `null` or `undefined`. If the `res` object is not `null`
or `undefined`, the `profileObj` property will be assigned to the `result` variable. */

    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
    console.log(res);
  };
  const googleFailure = (error) => {
    console.log(error);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {/* This code is conditionally rendering an `Input` component for the
            "confirm password" field if the `isSignup` variable is `true`. */}
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password "
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon1 />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "already have an account ? Sign In"
                  : "dont have an account ?sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
