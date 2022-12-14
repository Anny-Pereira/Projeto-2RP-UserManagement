import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import api from '../services/api';
import '../assets/css/geral.css';
import '../assets/css/geral.css';
import '../assets/css/login.css';
import { parseJwt } from "../services/auth";
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

export default function Usuarios() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idTipoUsuario, setIdTipo] = useState(0);
    const [status, setStatus] = useState(false);
    const [listaTipos, setListaTipos] = useState([]);
    const [idUsuario, setIdUsuario] = useState(0);
    const [root, setRoot] = useState(false);

    let navigate = useNavigate();

    //function BasicModal()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function abrirModal(id) {

        console.log(id);
        setIdUsuario(id);
        handleOpen();
    }

    function fecharModal() {
        handleClose();
    }

    function direcionarRota() {

        let base64 = localStorage.getItem('usuario-login').split('.')[1]
        //console.log(base64);

        switch (parseJwt().role) {

            //Caso Admin
            case '2':
                setRoot(false);
                break;

            //Caso Root
            case '3':
                setRoot(true);
                break;

            default:
                break;
        }
    }

    function ListarTipos() {
        api.get('/TiposUsuario', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then((resposta) => {
            if (resposta.status === 200) {
                //console.log(resposta)
                setListaTipos(resposta.data)
            }
        }).catch(erro => console.log(erro))
    }

    function ListarUsuarios() {
        api.get('/Usuarios', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
        }).then(resposta => {
            if (resposta.status === 200) {
                setListaUsuarios(resposta.data)
                //console.log(listaUsuarios)

                
            };
        })
    }


    function EditarUser() {

        console.log('editar')

        let user = {
            nome: nome,
            email: email,
            senha: senha,
            idTipoUsuario: idTipoUsuario,
            status: status,
        }

        console.log(status)
        // console.log(user)

        api.put('/Usuarios/' + idUsuario, user, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then((resposta) => {
            if (resposta.status === 204) {
                console.log(resposta)
                handleClose();
            }
        }).catch(erro => console.log(erro))

    }

    const ExcluirUsuario = (id) => {
        api.delete(`/Usuarios/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                if (resposta.status === 204) {
                    //console.log(resposta)
                }
            })
            .catch(ex => {
                console.log(ex)
            })
    }




    function irCadastro() {
        navigate('/Cadastro')
    }

    useEffect(ListarUsuarios);
    useEffect(direcionarRota, []);
    useEffect(ListarTipos, [])


    return (
        <div>
            <Header />
            <section className="container-root">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                >
                    <Box >
                        <div>

                            <div className="space-modal-descricao">
                                <h2 >Editar Usu??rio</h2>
                                <form>
                                    <input className="lgn-input" type="text" name="nome" onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
                                    <select className="lgn-input" name="idTipoUsuario" onChange={(e) => setIdTipo(e.target.value)} >
                                        <option value="0" selected disable> Selecione o Tipo de Usuario</option>
                                        {
                                            listaTipos.map((idTipoUsuario) => {
                                                return (
                                                    <option key={idTipoUsuario.idTipoUsuario} value={idTipoUsuario.idTipoUsuario}>
                                                        {idTipoUsuario.titulo}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    <input className="lgn-input" type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    <input className="lgn-input" type="password" name="senha" onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
                                    <div className='container_inputs'>
                                        <div >
                                            <label className='nome_input'>Ativo:</label>
                                            <input type="checkbox"  name='status'
                                            onChange={(e) => setStatus(e.target.checked)} />
                                        </div>
                                    </div>

                                    <button
                                        className="lgn_btn"
                                        type="submit"
                                        onClick={() => EditarUser()}
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        className="lgn_btn-cancel-modal"
                                        onClick={() => fecharModal()}
                                    >
                                        Cancelar
                                    </button>
                                </form>

                            </div>


                        </div>
                    </Box>
                </Modal>
                <div className="titulo-info-root">
                    <h2>Usu??rios</h2>
                    <div className="epc-btn-cadastro">
                        <button className="btn-cadastro" onClick={irCadastro}><span className="span-btn">Cadastrar Usu??rio</span></button>
                        <button className="btn-cadastro" onClick={irCadastro}><FontAwesomeIcon icon={faCirclePlus} fontSize={25} color={"#011949"}></FontAwesomeIcon></button>
                    </div>
                </div>
                <div>
                    <table className="tabela-lista">
                        <thead>
                            <tr>
                                <th className="tit">Nome</th>
                                <th className="tit">Tipo</th>
                                <th className="tit">Email</th>
                                <th className="tit">Senha</th>
                                <th className="tit">Status</th>
                            </tr>
                        </thead>
                        <tbody className="tabela-lista-corpo">
                            {
                                listaUsuarios.map((item) => {
                                    return (

                                        <tr key={item.idUsuario}>
                                            <td>{item.nome}</td>
                                            <td>{item.idTipoUsuarioNavigation.titulo}</td>
                                            <td>{item.email}</td>
                                            <td>{item.senha}</td>
                                            <td>{item.status ? 'Ativo' : 'Inativo'}</td>

                                            <td><button className="lgn_btn-cancel-root" onClick={() => abrirModal(item.idUsuario)} ><FontAwesomeIcon icon={faPen} fontSize={12} /></button></td>
                                            {root ? <td><button onClick={(id) => ExcluirUsuario(item.idUsuario)} className="lgn_btn-cancel-root" ><FontAwesomeIcon icon={faTrash} fontSize={12} /></button></td>
                                                :
                                                <></>}
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