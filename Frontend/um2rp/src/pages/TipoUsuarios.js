import React from "react";
import { useState, useEffect } from "react";


import api from '../services/api';
import '../assets/css/geral.css';
import '../assets/css/root.css';
import '../assets/css/geral.css';
import '../assets/css/login.css';
import Header from "../components/Header";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faTrash} from '@fortawesome/free-solid-svg-icons'

export default function TiposUsuario() {
    const [listaTipos, setListaTipos] = useState([]);
    const [idTipoUsuario, setIdTipo] = useState([]);
    const [titulo, setTitulo] = useState([]);


    function ListarTipos() {
        api.get('/TiposUsuario', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
        }).then(resposta => {
            if (resposta.status === 200) {
                //console.log(resposta.data)
                setListaTipos(resposta.data)

            };
        }).catch(erro => console.log(erro))
    }

    const Cadastrar = (event) => {
        event.preventDefault();
        
        let Tipo = {
            titulo: titulo
        }
     
        api.post('/TiposUsuario', Tipo , {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then((resposta) => {
            if (resposta.status === 201) {
                console.log(resposta)
                fecharModal()
            }
        }).catch(erro => console.log(erro))
    }

    //function BasicModal()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function abrirModal() {

        handleOpen();
    }
    function fecharModal() {
        handleClose();
    }


    const ExcluirTipo = (id) => {
        api.delete(`/TiposUsuario/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                if (resposta.status === 204) {
                    console.log(resposta)
                }
            })
            .catch(ex => {
                console.log(ex)
            })
    }


    useEffect(ListarTipos);


    return (
        <div>
            <Header />
            <section className="container-root">
                <div className="titulo-info-root">
                    <h2>Tipos de Usuários</h2>

                    <div className="epc-btn-cadastro">
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"

                        >
                            <Box >
                                <div>

                                    <div className="space-modal-descricao">
                                        <h2 >Cadastrar Tipo</h2>
                                        <form >
                                            <input className="lgn-input" type="text" name="titulo" onChange={(e) => setTitulo(e.target.value)} placeholder="Titulo" />

                                        </form>

                                        <button
                                            className="lgn_btn"
                                            type='submit'
                                            onClick={(event) => Cadastrar(event)}
                                        >
                                            Cadastrar
                                        </button>
                                        <button
                                            className="lgn_btn-cancel-modal"
                                            onClick={() => fecharModal()}
                                        >
                                            Cancelar
                                        </button>
                                    </div>


                                </div>
                            </Box>
                        </Modal>
                        <button onClick={abrirModal} className="btn-cadastro" ><span className="span-btn">Cadastrar Tipo</span></button>
                        <button onClick={abrirModal} className="btn-cadastro" ><FontAwesomeIcon icon={faCirclePlus} fontSize={25} color={"#011949"}></FontAwesomeIcon></button>
                    </div>
                </div>
                <div>
                    <table className="tabela-lista">
                        <thead>
                            <tr>
                                <th className="tit">Id</th>
                                <th className="tit">Título</th>
                            </tr>
                        </thead>
                        <tbody className="tabela-lista-corpo">
                            {
                                listaTipos.map((item) => {
                                    return (

                                        <tr key={item.idTipoUsuario}>

                                            <td>{item.idTipoUsuario}</td>
                                            <td>{item.titulo}</td>

                                            <td><button onClick={(id) => ExcluirTipo(item.idTipoUsuario)} className="lgn_btn-cancel-root" ><FontAwesomeIcon icon={faTrash} fontSize={12} /></button></td>

                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )

}