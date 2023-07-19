// loginReducer.js
const initialState = {
  loggedIn: false,
  errorMessages: {},
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        errorMessages: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
