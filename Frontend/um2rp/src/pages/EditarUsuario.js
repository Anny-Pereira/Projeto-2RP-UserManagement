import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

//import api from '../services/api';
import '../assets/css/geral.css';
import '../assets/css/header.css';
import logo from '../assets/images/Logo-Header.png'
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function Editar() {
    const [idUsuario, setIdUsuario] = useState(0);
    const [info, setInfo] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idTipoUsuario, setIdTipo] = useState(0);
    const [status, setStatus] = useState(true);
    const [listatipos, setListaTipos] = useState([]);
    const [listaResposta, setListaResposta] = useState([]);

    let navigate = useNavigate()

    function BuscarID() {
        api.get('/Usuarios/minhas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then((resposta) => {
            if (resposta.status === 200) {
                //console.log(resposta)
                setInfo(resposta.data)
                //console.log(info)

                info.map((item) => {
                    setIdUsuario(item.idUsuario)
                    //console.log(item.idUsuario)
                    return item.idUsuario
                }
                )
            }

        }).catch(erro => console.log(erro))
    }

    const Editar = (event) => {

        event.preventDefault();
        let user_atualizado = {
            nome: nome,
            email: email,
            senha: senha,
            idTipoUsuario: idTipoUsuario,
            status: status,
        }

        api.get('/Usuarios/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log("entrou")
                    console.log(resposta.data)
                    
                    setNome(resposta.data.nome)
                    setEmail(resposta.data.email)
                    setSenha(resposta.data.senha)
                    setIdTipo(resposta.data.idTipoUsuarioNavigation)
                    setStatus(resposta.data.status)

                    api.put('/Usuarios' + idUsuario, user_atualizado, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                        }
                    }).then((resposta) => {
                        if (resposta.status === 200) {
                            console.log("SOU FODA")
                            navigate('/Geral')
                        }
                    }).catch(erro => console.log(erro))
                }
            }).catch(erro => console.log(erro))

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

    function Logout(event) {
        event.preventDefault();

        localStorage.removeItem('usuario-login')
        navigate('/')

    }

    function Cancelar() {
        navigate('/Geral')
    }



    useEffect(BuscarID);
    useEffect(ListarTipos, []);


    return (
        <div>
            <section className='container-header'>
                <nav className='header-grid'>
                    <img className='logo-header' src={logo} alt="logo User Management 2RP" />

                    <div className='sair'>
                        <button className='btn-logout' onClick={Logout} >
                            <span className='span'>Sair</span>
                        </button>
                        <button className='btn-logout' onClick={Logout} >
                            <FontAwesomeIcon icon={faArrowRightFromBracket} fontSize={28} color={"#011949"} />
                        </button>
                    </div>

                </nav>
            </section>
            <section className="epc-geral">
                <div className="titulo-info">
                    <h2>Minhas Informações</h2>
                </div>
                <div className="lados">
                    <div className="lado1-info">
                        
                        <div>
                            <h3 className="h3-geral">Nome</h3>
                            <input type="text" className="lgn-input" 
                                        onChange={(e) => setNome(e.target.value)}/>
                        </div>
                        <div>
                            <h3 className="h3-geral">Tipo</h3>
                            {/* <input className="lgn-input" value={ idTipoUsuario} onChange={ idTipoUsuario => setIdTipo( idTipoUsuario) }/> */}
                            <select className="lgn-input" onChange={(e) => setIdTipo(e.target.value)} >
                                <option value="0" selected disable> Selecione o Tipo de Usuario</option>
                                {
                                    listatipos.map((idtipo) => {
                                        return (
                                            <option key={idtipo.idTipoUsuario} value={idtipo.idTipoUsuario}>
                                                {idtipo.titulo}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <h3 className="h3-geral">Status</h3>
                            <div className='container_inputs'>
                                <div className='box_atividade'>
                                    <label className='nome_input'>Ativo:</label>
                                    <input type="checkbox"  name='Status' className='atividade'
                                         onChange={(e) => setStatus(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lado1-info">
                        <div>
                            <h3 className="h3-geral">Email</h3>
                            <input className="lgn-input" type="email"
                                         onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <h3 className="h3-geral">Senha</h3>
                            <input type="password" className="lgn-input" 
                                        onChange={(e) => setSenha(e.target.value)}/>
                        </div>
                        <button className="lgn_btn" onClick={Editar}>Editar</button>
                    </div>
                </div>
                <button className="lgn_btn-cancel" onClick={Cancelar}>Cancelar</button>
            </section>
        </div>
    )

}