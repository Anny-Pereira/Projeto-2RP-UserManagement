import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Geral from './pages/Geral';
import Usuarios from './pages/Usuarios';
import Tipos from './pages/TipoUsuarios';
import Editar from './pages/EditarUsuario';
import Cadastro from './pages/CadastroUsuario';
import NotFound from './pages/NotFound';

const routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/Geral" element={<Geral/> } />
        <Route path="/Usuarios" element={<Usuarios/> } />
        <Route path="/Tipos" element={<Tipos/> } />
        <Route path="/Editar" element={<Editar/> } />
        <Route path="/Cadastro" element={<Cadastro/> } />
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
