import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store/main';
import App from './app/App.js';
import styles from 'normalize.css';

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('app')
);
