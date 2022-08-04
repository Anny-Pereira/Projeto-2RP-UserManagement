using _2RP_UserManagement_WebApi.Domains;
using _2RP_UserManagement_WebApi.Interfaces;
using _2RP_UserManagement_WebApi.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2RP_UserManagement_WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TiposUsuarioController : ControllerBase
    {
        /// <summary>
        /// Objeto que irá receber todos os métodos definidos na interface
        /// </summary>
        private readonly ITipoUsuarioRepository _tipoUsuarioRepository;

        /// <summary>
        /// Instancia o objeto para que haja referência às implementações feitas no repositório
        /// </summary>
        public TiposUsuarioController(ITipoUsuarioRepository contexto)
        {
            _tipoUsuarioRepository = contexto;
        }

        /// <summary>
        /// Lista todos os tipos de usuários
        /// </summary>
        /// <returns>Uma lista de tipos de usuarios</returns>
        [Authorize(Roles = "2, 3")]
        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_tipoUsuarioRepository.ListarTodos());
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }


        // <summary>
        /// Cadastra um novo TipoUsuario
        /// <param name="novoTipo">objeto que será cadastrado</param>
        /// <returns></returns>
        [Authorize (Roles = "2, 3")]
        [HttpPost]
        public IActionResult Cadastrar(TipoUsuario novoTipo)
        {
            try
            {
                _tipoUsuarioRepository.Cadastrar(novoTipo);
                return StatusCode(201);

            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }


        /// <summary>
        /// Atualiza um tipoUsuario existente
        /// </summary>
        /// <param name="id">id do tipoUsuario que será atualizado</param>
        /// <param name="novoTipo">objeto com as informações atualizadas</param>
        /// <returns></returns>
        [Authorize (Roles = "2, 3")]
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, TipoUsuario novoTipo)
        {
            TipoUsuario tipoBuscado = _tipoUsuarioRepository.BuscarPorId(id);

            if (tipoBuscado != null)
            {
                try
                {
                    _tipoUsuarioRepository.Atualizar(id, novoTipo);
                    return NoContent();

                }
                catch (Exception erro)
                {

                    return BadRequest(erro);
                }

            }
            return BadRequest("Nenhum tipo de usuário foi encontrado para ser atualizado!");
        }


        /// <summary>
        /// Busca um tipoUsuario através do seu id
        /// </summary>
        /// <param name="id">id do tipoUsuario que será buscado</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                return Ok(_tipoUsuarioRepository.BuscarPorId(id));
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }

        /// <summary>
        /// Deleta um tipoUsuario através do seu id
        /// </summary>
        /// <param name="id">id do tipoUsuario que será deletado</param>
        [Authorize (Roles = "2, 3")]
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            TipoUsuario tipoBuscado = _tipoUsuarioRepository.BuscarPorId(id);

            if (tipoBuscado != null)
            {
                try
                {
                    _tipoUsuarioRepository.Deletar(id);
                    return StatusCode(204);
                }
                catch (Exception erro)
                {

                    return BadRequest(erro);
                }
            }

            return BadRequest("Nenhum tipo de usuário foi encontrado para ser deletado!");
        }


    }
}
