import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import api from "../services/api";
import '../assets/css/login.css';
import '../assets/css/cadastro.css';

import Header from "../components/Header";


export default function Cadastro() {
    const [listatipos, setListaTipos] = useState([])
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [status, setStatus] = useState(true)
    const [email, setEmail] = useState('')
    const [idTipo, setIdTipo] = useState('')

    let navigate = useNavigate();

    const listar_tipo = () => {
        api.get('/TiposUsuario', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then((resposta) => {
            if (resposta.status === 200) {
                console.log(resposta)
                setListaTipos(resposta.data)
            }
        }).catch(erro => console.log(erro))
    }

    function Voltar(){
        navigate('/Root')
    }

    const Cadastrar = (event) => {
        event.preventDefault();
        let Usuario = {
            nome: nome,
            email: email,
            senha: senha,
            satus: status,
            idTipoUsuario: idTipo
        }

        api.post('/Usuarios', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then((resposta) => {
            if (resposta.status === 200) {
                console.log(resposta)
                navigate('/Root')
            }
        }).catch(erro => console.log(erro))
    }

    useEffect(listar_tipo, [])

    return (
        <div >
            <Header />
            <section className='container_cadastro'>
                <div className="epc-cadastro">
                    <h1 className='titulo_2'>Cadastrar Usuário</h1>
                    <form className='form_cadastro' onSubmit={(event) => Cadastrar(event)}>
                        <input placeholder="Nome" type="text" id='Nome' name='Nome'  className='lgn-input' value={nome} onChange={(e) => setNome(e.target.value)} />
                         <select  className="lgn-input" name="idTipo" value={idTipo} onChange={(e) => setIdTipo(e.target.value)} >
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
                        <input placeholder="Email" type="email" name='Email' className='lgn-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input placeholder="Senha" type="password" id='Senha' name='Senha' className='lgn-input' onChange={(e) => setSenha(e.target.value)} />
                        <div className='container_inputs'>
                            <div className='box_atividade'>
                                <label className='nome_input'>Ativo:</label>
                                <input type="checkbox"  name='Status' className='atividade' id="Status"
                                    value={status} onChange={(e) => setStatus(e.target.value)} />
                            </div>
                        </div>
                        <span className="Mensagem_erro"></span>
                        <button className="lgn_btn" type='submit' >Cadastrar</button>
                    </form>
                    <button className="lgn_btn-cancel-cad" onClick={Voltar}><span>Cancelar</span></button>
                </div>

            </section>
        </div>
    )
}