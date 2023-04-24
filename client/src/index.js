import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'dropify/dist/css/dropify.min.css'
import 'dropify/dist/js/dropify.min.js'

import "datatables.net-dt/css/jquery.dataTables.min.css"

import './assets/css/basic.css'
import './assets/css/App.css'
import './assets/css/mainStyle.css'

import './assets/css/font-awesome.min.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
