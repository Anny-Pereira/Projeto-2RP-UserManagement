import * as React from "react";
import { useState, useEffect } from "react";
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
import {  faPen, faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function TiposUsuario() {
    const [listaTipos, setListaTipos] = useState([]);
    const [ idTipoUsuario, setIdTipo] = useState([]);
    const [titulo, setTitulo] = useState([]);


    function ListarTipos(){
        api.get('/TiposUsuario',  {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
        }).then(resposta => {
            if (resposta.status === 200) {
                //console.log(resposta.data)
                setListaTipos(resposta.data)
                
                listaTipos.map((item) => {
                    setIdTipo(item.idTipoUsuario)
                    // console.log(idTipoUsuario)
                    return(idTipoUsuario)
                })

                listaTipos.map((item) => {
                    setTitulo(item.titulo)
                    console.log(titulo)
                    return(titulo)
                })
                
            };
        }).catch(erro => console.log(erro))
    }


    function createData(name, idTipoUsuario, titulo) {
        return { name, idTipoUsuario, titulo };
    }

    const rows = [
        createData( idTipoUsuario, titulo),
    ];


    
    useEffect(ListarTipos);


        return (
            <div>
                <Header />
                <section className="container-root">
                    <div className="titulo-info-root">
                        <h2>Tipos de Usuários</h2>
                        <div className="epc-btn-cadastro">
                            <button className="btn-cadastro" ><span className="span-btn">Cadastrar Tipo</span></button>
                            <button className="btn-cadastro" ><FontAwesomeIcon icon={faCirclePlus} fontSize={25} color={"#011949"}></FontAwesomeIcon></button>
                        </div>
                    </div>
                    <div>
                    <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell >Id</TableCell>
                <TableCell >Título</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell >{row.idTipoUsuario}</TableCell>
                  <TableCell >{row.titulo}</TableCell>
                  <TableCell ><FontAwesomeIcon icon={faPen} fontSize={18} /></TableCell>
                  <TableCell ><FontAwesomeIcon icon={faTrash} fontSize={18} /></TableCell>
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