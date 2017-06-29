import 'babel-polyfill';
import 'fetch-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../styles/app.css';
import App from './containers/App';
import configureStore from './configs/configureStore';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
  	<App store={store}/>
  </Provider>,
  document.getElementById('app')
);