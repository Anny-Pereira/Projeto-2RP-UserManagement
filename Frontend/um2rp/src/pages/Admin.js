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
import {faPen, faCirclePlus} from '@fortawesome/free-solid-svg-icons'

export default function Admin() {
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
                   setSenha(item.senha)
                   //console.log(senha)
                   return(senha)
                })
                listaUsuarios.map((item) => {
                   setIdTipo(item.idTipoUsuario)
                   // console.log(idTipoUsuario)
                   return(idTipoUsuario)
                })
                listaUsuarios.map((item) => {
                   setStatus(item.status)
                   // console.log(status)
                   return(status)
                })
            };
        })
    }


    function createData(name, nome, email, senha, idTipoUsuario, status) {
        return { name, nome, email, senha, idTipoUsuario, status };
    }

    const user =
        [
            createData(nome,  email, senha, idTipoUsuario, status),
            createData(nome,  email, senha, idTipoUsuario, status),
        ]
        
    


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
                            <button className="btn-cadastro" onClick={irCadastro}><FontAwesomeIcon icon={faCirclePlus} fontSize={20} color={"#011949"}></FontAwesomeIcon></button>
                        </div>
                    </div>
                    <div>
                    <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell color="blue">Nome</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >Senha</TableCell>
                <TableCell >Tipo</TableCell>
                <TableCell >Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((row) => (
                <TableRow key={row.idUsuario}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell >{row.nome}</TableCell>
                  <TableCell >{row.email}</TableCell>
                  <TableCell >{row.senha}</TableCell>
                  <TableCell >{row.idTipoUsuario}</TableCell>
                  <TableCell >{row.status ? 'Ativo' : 'Inativo'}</TableCell>
                  <TableCell ><FontAwesomeIcon icon={faPen} fontSize={18}/></TableCell>
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