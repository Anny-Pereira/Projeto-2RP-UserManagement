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
    const [ idTipoUsuario, setIdTipo] = useState(0);
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

                info.map((item) =>
                {
                    setIdUsuario(item.idUsuario)
                     //console.log(item.idUsuario)
                    return item.idUsuario
                }
                )
            }

        }).catch(erro => console.log(erro))
    }
    
    function Editar(idUsuario){


        api.put('/Usuarios/' + idUsuario, {
            " idTipoUsuario": idTipoUsuario,
              "nome": nome,
              "email": email,
              "senha": senha,
              "status": status
          }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )
        .then(resposta => {
            if (resposta.status ===200) {
                console.log("entrou")
                setListaResposta(resposta.data)

                
                listaResposta.map((item) =>
                {
                    const usuarioAtua = {}
                    usuarioAtua.idTipoUsuario = item.idTipoUsuario
                    usuarioAtua.nome = item.nome
                    usuarioAtua.email = item.nome
                    usuarioAtua.senha = item.senha
                    usuarioAtua.status = item.status
                    
                    console.log(usuarioAtua)
                    // setIdTipo(usuarioAtua.idTipoUsuario)
                    // setNome(usuarioAtua.nome)
                    // setEmail(usuarioAtua.email)
                    // setSenha(usuarioAtua.senha)
                    // setStatus(usuarioAtua.status)
                    return usuarioAtua
                })


                navigate('/Geral')
            }
        }).catch(erro => console.log(erro))

    }

    function ListarTipos(){
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

    function Cancelar(){
        navigate('/Geral')
    }



    useEffect( BuscarID);
    useEffect( ListarTipos, []);


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
                        <h3 className="h3-geral">Status</h3>
                            {/* <input className="lgn-input" value={status} onChange={status => setStatus(status) } /> */}
                            <select  className="lgn-input" name="status" value={status} onChange={(e) => setStatus(e.target.value)} >
                                <option value="0" selected disable> Selecione o Status do Usuario</option>
                                <option onChange={() => setStatus(true)}  value="status">Ativo</option>
                                <option onChange={() => setStatus(false)} value="status">Inativo</option>
                        </select>
                        </div>
                        <div>
                            <h3 className="h3-geral">Nome</h3>
                            <input type="text" className="lgn-input" onChange={nome => setNome(nome) } />
                        </div>
                        <div>
                            <h3 className="h3-geral">Tipo</h3>
                           {/* <input className="lgn-input" value={ idTipoUsuario} onChange={ idTipoUsuario => setIdTipo( idTipoUsuario) }/> */}
                           <select  className="lgn-input" name="idTipoUsuario" value={idTipoUsuario} onChange={(e) => setIdTipo(e.target.value)} >
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
                    </div>
                    <div className="lado1-info">
                        <div>
                            <h3 className="h3-geral">Email</h3>
                           <input className="lgn-input"onChange={email => setEmail(email) }/>
                        </div>
                        <div>
                            <h3 className="h3-geral">Senha</h3>
                           <input type="password" className="lgn-input"  onChange={senha => setSenha(senha) }/>
                        </div>
                    <button className="lgn_btn" onClick={Editar(idUsuario)}>Editar</button>
                    </div>
                </div>
                    <button className="lgn_btn-cancel" onClick={Cancelar}>Cancelar</button>
            </section>
        </div>
    )

}