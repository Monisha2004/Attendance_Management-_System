import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, Checkbox, Link } from '@mui/material';
import './Login.css';

const Logins = ({ errorMessages, loggedIn, login, loginError }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const errors = {
    uname: 'Invalid username',
    pass: 'Invalid password',
  };

  const [localErrorMessages, setLocalErrorMessages] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const uname = formData.get('uname');
    const pass = formData.get('pass');

    const unameRegex = /^[A-Za-z]+$/;
    const isUnameValid = unameRegex.test(uname);

    
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])(?!.*\s).{8,}$/;
    const isPassValid = passRegex.test(pass);

    if (isUnameValid && isPassValid) {
      setIsSubmitted(true);
      login();
    } else {
      if (!isUnameValid) {
        setLocalErrorMessages({ name: 'uname', message: errors.uname });
      }
      if (!isPassValid) {
        setLocalErrorMessages({ name: 'pass', message: errors.pass });
      }
      loginError(localErrorMessages);
    }
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const renderErrorMessage = (name) =>
    name === localErrorMessages.name && <div className="error">{localErrorMessages.message}</div>;

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" name="pass" required />
          {renderErrorMessage('pass')}
        </div>
        <div className="checkbox-container">
          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={handleRememberMe} />}
            label="RRemember me"
          />
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
    <div className='mano'>
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
            {<Link href="./home">home</Link>}
          </>
        ) : (
          <>
            {renderForm}
            <div className="dd">
              Not a member? <Link href="./RegisterForm">Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  errorMessages: state.errorMessages,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch({ type: 'LOGIN' }),
  loginError: (errorMessages) => dispatch({ type: 'LOGIN_ERROR', payload: errorMessages }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logins);
