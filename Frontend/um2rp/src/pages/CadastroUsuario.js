import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import Header from "../components/Header";

export default function Cadastro() {

    return(
        <div>
            <Header/>
            <section>
                <p>cadastro</p>
            </section>
        </div>
    )
}