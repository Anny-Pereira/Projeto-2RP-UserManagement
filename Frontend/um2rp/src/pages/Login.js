import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import { parseJwt } from "../services/auth";
import '../assets/css/login.css';
import logo from '../assets/images/Logo-Login.png';

export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [erroMessage, setErroMessage] = useState('');

    let navigate = useNavigate()

    // const Logar = (event) => {
    //     event.preventDefault();
    //     setErroMessage('')
    //     setIsLoading(true)

    //     const data = {
    //         email: email,
    //         senha: senha
    //     }

    //     api.post('/Login', data, {})
    //         .then(response => {
    //             if (response.status === 200) {
    //                 localStorage.setItem('usuario-login', response.data.token)
    //                 setSenha('')

    //                 setEmail('')

    //                 setIsLoading(false)

    //                 let base64 = localStorage.getItem('usuario-login').split('.')[1]
    //                 console.log(base64);

    //                 switch (parseJwt().role) {
    //                     //Caso Geral
    //                     case '1':
    //                         navigate('/Geral')
    //                         break;

    //                     //Caso Admin
    //                     case '2':
    //                         navigate('/Admin')
    //                         break;

    //                     //Caso Root
    //                     case '3':
    //                         navigate('/Root')
    //                         break;

    //                     default:
    //                         navigate('/')
    //                         break;
    //                 }

    //             }
    //         }).catch(error => {
    //             console.log(error)

    //             setErroMessage("Email ou senha inválidos!")

    //             setIsLoading(false)
    //             console.log(erroMessage)
    //         })

    // }

    return (
        <div className="lgn">
            <h1>Hello Word</h1>
            {/* <section className="container">
                <div className="lado1">
                    <img src={logo} alt="Logo User Management 2RP" />
                    <span className="texto-login">A melhor plataforma online para o gerenciamento de usuários e contas!</span>
                </div>
                <div className="lado2">
                    <h1>Login</h1>
                    <form onSubmit={Logar}>
                        <div>
                            <label htmlFor="email"></label>
                            <input onChange={campo => setEmail(campo.target.value)}
                                value={email} type="email" className="lgn-input" />
                            <label htmlFor="senha"></label>
                            <input onChange={campo => setSenha(campo.target.value)} value={senha}
                                ype="password" className='lgn-input' />
                        </div>
                            <span className='lgn-erro'>{erroMessage}</span>

                        {isLoading ? <button disabled className='lgn_btn lgn_loading' >Carregando</button> : <button type='submit' className='lgn_btn'>Login</button>}
                    </form>
                </div>
            </section> */}
        </div>
    )
}