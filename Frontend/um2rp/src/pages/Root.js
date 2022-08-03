import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

import api from '../services/api';
import '../assets/css/geral.css';
import '../assets/css/root.css';
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faCirclePlus} from '@fortawesome/free-solid-svg-icons'

export default function Root() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [nome, setNome] = useState([]);
    const [email, setEmail] = useState([]);
    const [senha, setSenha] = useState([]);
    const [ idTipoUsuario, setIdTipo] = useState([]);
    const [status, setStatus] = useState([]);
    const [idUsuario, setIdUsuario] = useState(0);

    let navigate = useNavigate();

    //function BasicModal()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function abrirModal(id){

        console.log(id);
        setIdUsuario(id);
        handleOpen();
    }
    function fecharModal(){
        handleClose();
    }


    function ListarUsuarios(){
        api.get('/Usuarios',  {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
        }).then(resposta => {
            if (resposta.status === 200) {
                setListaUsuarios(resposta.data)
                console.log(listaUsuarios)
                
                listaUsuarios.map((item) => {
                   setNome(item.nome)
                   // console.log(nome)
                   return(nome)
                })
                listaUsuarios.map((item) => {
                   setEmail(item.email)
                   // console.log(email)
                   return(email)
                })
                listaUsuarios.map((item) => {
                   setSenha(item.senha)
                   //console.log(senha)
                   return(senha)
                })
                listaUsuarios.map((item) => {
                   setIdTipo(item.idTipoUsuario)
                   // console.log(idTipoUsuario)
                   return(idTipoUsuario)
                })
                listaUsuarios.map((item) => {
                   setStatus(item.status)
                   // console.log(status)
                   return(status)
                })
            };
        })
    }


    function EditarUser ( idUsuario){

        let user = {
            nome: nome,
            email: email,
            senha: senha,
            idTipoUsuario: idTipoUsuario,
            status: status,
        }

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

   


    function irCadastro() {
        navigate('/Cadastro')
    }
    
    useEffect(ListarUsuarios);


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
                                                        <span>OOOi mundo</span>
                                                         <form>
                                                             <input type="text" name="nome" value={nome}  onChange={(e) => setNome(e.target.value)} />
                                                         </form>
                                                         <button
                                                        
                                                             onClick={() =>EditarUser(idUsuario)}
                                                         >
                                                            Salvar
                                                         </button>
                                                         <button
                                                        
                                                             onClick={() =>fecharModal()}
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
                    <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Tipo</th>
                                        <th>Email</th>
                                        <th>Senha</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="tabela-lista-corpo">
                                    {
                                        listaUsuarios.map((item) => {
                                            //console.log(tipoEvento)
                                            return (
                                                <tr key={item.idUsuario}>
                                                    <td>{item.nome}</td>
                                                    <td>{item.idTipoUsuario}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.senha}</td>
                                                    <td>{item.status ? 'Ativo' : 'Inativo'}</td>

                                                    <td><button onClick={() =>abrirModal(item.idUsuario)} >Editar</button></td>
                                                    {/* <button onClick={() => this.excluirTipoEvento(tipoEvento)} >Excluir</button></td> */}
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