import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

//import api from '../services/api';
import '../assets/css/geral.css';
import '../assets/css/header.css';
import '../assets/css/root.css';
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
    const [status, setStatus] = useState(false);
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
            status: status,
        }

        // console.log(status)

        api.put('/Usuarios/' + idUsuario, user_atualizado, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                    }
                }).then((resposta) => {
                    if (resposta.status === 204) {
                        console.log(resposta)
                        console.log('editou')
                        navigate('/Geral')
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
            <section className="epc-geral-editar">
                <div className="titulo-info">
                    <h2>Minhas Informações</h2>
                </div>
                <form className="lados-editar">
                    <div >

                        <div>
                            <h3 className="h3-geral">Nome</h3>
                            <input type="text" className="lgn-input"
                                name='nome' onChange={(e) => setNome(e.target.value)} />
                        </div>

                        <div>
                            <h3 className="h3-geral">Email</h3>
                            <input className="lgn-input" type="email"
                                name='email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div >
                        <div>
                            <h3 className="h3-geral">Senha</h3>
                            <input type="password" className="lgn-input"
                                name='senha' onChange={(e) => setSenha(e.target.value)} />
                        </div>
                        <div>
                            <h3 className="h3-geral">Status</h3>
                            <div className='box_atividade'>
                                <label className='nome_input'>Ativo:</label>
                                <input type="checkbox"  name='status'
                                    onChange={(e) => setStatus(e.target.checked)} />
                            </div>
                        </div>
                        <button className="lgn_btn btn-editar" type="submit" onClick={Editar}>Editar</button>
                    </div>
                </form>
                <button className="lgn_btn-cancel" onClick={Cancelar}>Cancelar</button>
            </section>
        </div>
    )

}