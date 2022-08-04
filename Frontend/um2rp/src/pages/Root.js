import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import api from '../services/api';
import '../assets/css/geral.css';
import '../assets/css/geral.css';
import '../assets/css/login.css';
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

export default function Root() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [nome, setNome] = useState([]);
    const [email, setEmail] = useState([]);
    const [senha, setSenha] = useState([]);
    const [idTipoUsuario, setIdTipo] = useState([]);
    const [status, setStatus] = useState([]);
    const [listaTipos, setListaTipos] = useState([]);
    const [idUsuario, setIdUsuario] = useState(0);

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
                console.log(listaUsuarios)

                listaUsuarios.map((item) => {
                    setNome(item.nome)
                    // console.log(nome)
                    return (nome)
                })
                listaUsuarios.map((item) => {
                    setEmail(item.email)
                    // console.log(email)
                    return (email)
                })
                listaUsuarios.map((item) => {
                    setSenha(item.senha)
                    //console.log(senha)
                    return (senha)
                })
                listaUsuarios.map((item) => {
                    setIdTipo(item.idTipoUsuario)
                    // console.log(idTipoUsuario)
                    return (idTipoUsuario)
                })
                listaUsuarios.map((item) => {
                    setStatus(item.status)
                    // console.log(status)
                    return (status)
                })
            };
        })
    }


    function EditarUser(event, idUsuario) {
        event.preventDefault();

        let user = {
            nome: nome,
            email: email,
            senha: senha,
            idTipoUsuario: idTipoUsuario,
            status: status,
        }

        console.log('vamos editar')

        console.log(idUsuario)
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
          if(resposta.status === 204) {
            console.log(resposta)
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
    useEffect(ListarTipos, []);


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
                                <h2 >Editar Usuário</h2>
                                <form>
                                    <input className="lgn-input" type="text" name="nome" onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
                                    <select className="lgn-input" onChange={(e) => setIdTipo(e.target.value)} name='idTipoUsuario'  >
                                        <option value="0" selected disable> Selecione o Tipo de Usuario</option>
                                        {
                                            listaTipos.map((idtipo) => {
                                                return (
                                                    <option key={idtipo.idTipoUsuario} value={idtipo.idTipoUsuario}>
                                                        {idtipo.titulo}
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
                                            <input type="checkbox" name='status' className='atividade'
                                                onChange={(e) => setStatus(e.target.value)} />
                                        </div>
                                    </div>
                                </form>

                                <button
                                    className="lgn_btn"
                                    onClick={(idUsuario) => EditarUser(idUsuario)}
                                >
                                    Salvar
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
                <div className="titulo-info-root">
                    <h2>Usuários</h2>
                    <div className="epc-btn-cadastro">
                        <button className="btn-cadastro" onClick={irCadastro}><span className="span-btn">Cadastrar Usuário</span></button>
                        <button className="btn-cadastro" onClick={irCadastro}><FontAwesomeIcon icon={faCirclePlus} fontSize={25} color={"#011949"}></FontAwesomeIcon></button>
                    </div>
                </div>
                <div>
                    <table className="tabela-lista">
                        <thead>
                            <tr>
                                <th  className="tit">Nome</th>
                                <th  className="tit">Tipo</th>
                                <th  className="tit">Email</th>
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
                                            <td>{item.idTipoUsuario}</td>
                                            <td>{item.email}</td>
                                            <td>{item.senha}</td>
                                            <td>{item.status ? 'Ativo' : 'Inativo'}</td>

                                            <td><button className="lgn_btn-cancel-root" onClick={() => abrirModal(item.idUsuario)} ><FontAwesomeIcon icon={faPen} fontSize={12} /></button></td>
                                            <td><button  onClick={(id) => ExcluirUsuario(item.idUsuario)} className="lgn_btn-cancel-root" ><FontAwesomeIcon icon={faTrash} fontSize={12} /></button></td>

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