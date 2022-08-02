import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import api from '../services/api';
import '../assets/css/geral.css';
import '../assets/css/root.css';
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

export default function Root() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [nome, setNome] = useState([]);
    const [email, setEmail] = useState([]);
    const [senha, setSenha] = useState([]);
    const [ idTipoUsuario, setIdTipo] = useState([]);
    const [status, setStatus] = useState([]);

    let navigate = useNavigate();

    function ListarUsuarios(){
        api.get('/Usuarios',  {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
        }).then(resposta => {
            if (resposta.status === 200) {
                setListaUsuarios(resposta.data)
                
                listaUsuarios.map((item) => {
                   setNome(item.nome)
                   // console.log(nome)
                   return(nome)
                })
                listaUsuarios.map((item) => {
                   setEmail(item.email)
                   // console.log(email)
                   return(email)
                })
                listaUsuarios.map((item) => {
                   setEmail(item.email)
                   // console.log(email)
                   return(email)
                })
                listaUsuarios.map((item) => {
                   setEmail(item.email)
                   // console.log(email)
                   return(email)
                })
                listaUsuarios.map((item) => {
                   setEmail(item.email)
                   // console.log(email)
                   return(email)
                })
            };
        })
    }

    function createData(Nome, Email, Senha, Tipo, Status) {
        return { Nome, Email, Senha, Tipo, Status };
    }

    const rows = [
        createData(nome, email, '6', 2, 0),
    ];


    function irCadastro() {
        navigate('/Cadastro')
    }
    
    useEffect(ListarUsuarios);

    return (
        <div>
            <Header />
            <section className="container-root">
                <div className="titulo-info-root">
                    <h2>Usuários</h2>
                    <div className="epc-btn-cadastro">
                        <button className="btn-cadastro" onClick={irCadastro}><span className="span-btn">Cadastrar Usuário</span></button>
                        <button className="btn-cadastro" onClick={irCadastro}><FontAwesomeIcon icon={faCirclePlus} fontSize={25} color={"#011949"}></FontAwesomeIcon></button>
                    </div>
                </div>
                <div>
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Senha</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                </div>
            </section>
        </div>
    )
    
}