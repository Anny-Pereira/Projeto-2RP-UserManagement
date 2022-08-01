import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Geral from './pages/Geral';
import NotFound from './pages/NotFound';

const routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/Geral" element={<Geral/> } />
        <Route path="*" element={<NotFound/> } />
      </Routes>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
