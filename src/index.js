import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import loginReducer from './loginReducer'; // Import your root reducer
import App from './App'; // Import your main application component
import './index.css';
// Create the Redux store
const store = createStore(loginReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
