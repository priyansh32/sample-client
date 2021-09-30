import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Institute from './Institute';
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/institute" exact component={Institute} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
