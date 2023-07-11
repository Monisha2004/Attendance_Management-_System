import React, { useState } from "react";
import { FormControlLabel, Checkbox, Link } from "@mui/material";
import "./Login.css";

function Logins() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const errors = {
    uname: "Invalid username",
    pass: "Invalid password"
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const uname = formData.get("uname");
    const pass = formData.get("pass");

    // Validate username using regex: only allow A-Z characters
    const unameRegex = /^[A-Za-z]+$/;
    const isUnameValid = unameRegex.test(uname);

    // Validate password using regex: at least 8 characters and contain A-Z characters
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])(?!.*\s).{8,}$/;
    const isPassValid = passRegex.test(pass);

    if (isUnameValid && isPassValid) {
      setIsSubmitted(true);
    } else {
      if (!isUnameValid) {
        setErrorMessages({ name: "uname", message: errors.uname });
      }
      if (!isPassValid) {
        setErrorMessages({ name: "pass", message: errors.pass });
      }
    }
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && <div className="error">{errorMessages.message}</div>;

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="checkbox-container">
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
          <Link href="Forgot Password">Forgot Password?</Link>
        </div>
        <div className="button-container">
          <input type="submit" value="Sign In" />
        </div>
      </form>
    </div>
  );

  const renderSuccessMessage = <div>User is successfully logged in</div>;

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">
          <b>
            <center>Sign In</center>
          </b>
        </div>
        {isSubmitted ? (
          <>
            {renderSuccessMessage}
            {<Link href='./'>home</Link>}
          </> ) : (
          <>
            {renderForm}
            <div className="dd">
              Not a member? <Link href="./RegisterForm">Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Logins;
