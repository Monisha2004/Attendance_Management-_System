// loginActions.js
export const login = () => {
    return {
      type: 'LOGIN',
    };
  };
  
  export const loginError = (errorMessages) => {
    return {
      type: 'LOGIN_ERROR',
      payload: errorMessages,
    };
  };
  