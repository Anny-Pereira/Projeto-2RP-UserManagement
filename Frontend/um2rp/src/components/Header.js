import React from 'react'
import { useState, useEffect } from "react"
import { NavLink, useNavigate } from 'react-router-dom'


import logo from '../assets/images/Logo-Header.png'
import "../assets/css/header.css"
import { parseJwt } from "../services/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'


export default function Header() {
    const [adm, setAdm] = useState(false);
    const [geral, setGeral] = useState(false);
    let navigate = useNavigate()

    function Logout (event) {
        event.preventDefault();

        localStorage.removeItem('usuario-login')
        navigate('/')

    }

    function direcionarRota() {

        let base64 = localStorage.getItem('usuario-login').split('.')[1]
        console.log(base64);

        switch (parseJwt().role) {
            //Caso Geral
            case '1':
                setAdm(false);
                setGeral(true);
                break;

            //Caso Admin
            case '2':
                setAdm(true);
                setGeral(false);
                break;

            //Caso Root
            case '3':
                setAdm(false);
                setGeral(false);
                break;

            default:
                break;
        }
    }

    useEffect(direcionarRota, []);


    return (
        <div className='container-header'>
            <nav className='header-grid'>
                <img className='logo-header' src={logo} alt="logo User Management 2RP" />

               {geral ? '' :
                <ul className='nav_links'>
                <span className='span'> {adm ? <NavLink to='/Admin' >Usuários</NavLink> : <NavLink to='/Root' activeClassName>Usuários</NavLink>}</span>
                <span className='span'><NavLink to='/Tipos' >Tipos</NavLink></span>
                <span className='span'><NavLink to='/Geral'>Perfil</NavLink></span>
            </ul>
               }

                <div className='sair'>
                    <button className='btn-logout' onClick={Logout} >
                    <span className='span'>Sair</span>
                    </button>
                    <button className='btn-logout' onClick={Logout} >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} fontSize={28} color={"#011949"} />
                    </button>
                </div>

            </nav>
        </div>
    )
}