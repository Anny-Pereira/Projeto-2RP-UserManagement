import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

//import api from '../services/api';
import '../assets/css/geral.css';
import '../assets/css/header.css';
import Header from "../components/Header";
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCircle } from '@fortawesome/free-solid-svg-icons'

export default function Geral() {
    const [info, setInfo] = useState([]);
  

    let navigate = useNavigate()

    function IrEditar(){
        navigate('/Editar')
    }

    function ListarInformacoes() {
        api.get('/Usuarios/minhas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then((resposta) => {
            if (resposta.status === 200) {
                //console.log(resposta)
                setInfo(resposta.data)
            }

        }).catch(erro => console.log(erro))
    }

    useEffect(ListarInformacoes);


    return (
        info.map((item) => {
            return (
                <div>
                   <Header/>
                    <section className="epc-geral">
                        <div className="titulo-info">
                            <h2>Minhas Informações</h2>
                            <button className='btn-logout' onClick={IrEditar}><FontAwesomeIcon icon={faPenToSquare} fontSize={30} color={"#011949"}></FontAwesomeIcon></button>
                        </div>
                        <div className="lados">
                            <div className="lado1-info">
                                <div className="status">
                                    <h3 className="h3-geral">{item.status ? 'Ativo' : 'Inativo'}</h3>
                                    {item.status ? <FontAwesomeIcon icon={faCircle} fontSize={11} color={"green"} />
                                        : <FontAwesomeIcon icon={faCircle} fontSize={11} color={"red"} />}
                                </div>
                                <div>
                                    <h3 className="h3-geral">Nome</h3>
                                    <span className="item-info">{item.nome}</span>
                                </div>
                                <div>
                                    <h3 className="h3-geral">Tipo</h3>
                                    <span className="item-info">{item.idTipoUsuarioNavigation.titulo}</span>
                                </div>
                            </div>
                            <div className="lado1-info">
                                <div>
                                    <h3 className="h3-geral">Email</h3>
                                    <span className="item-info">{item.email}</span>
                                </div>
                                <div>
                                    <h3 className="h3-geral">Senha</h3>
                                    <span className="item-info">{item.senha}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )
        })
    )
}