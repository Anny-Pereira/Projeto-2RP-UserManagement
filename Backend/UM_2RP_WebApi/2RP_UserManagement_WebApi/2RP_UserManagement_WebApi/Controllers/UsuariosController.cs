using _2RP_UserManagement_WebApi.Domains;
using _2RP_UserManagement_WebApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace _2RP_UserManagement_WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        /// <summary>
        /// Objeto que irá receber todos os métodos definidos na interface
        /// </summary>
        private readonly IUsuarioRepository _usuarioRepository;

        /// <summary>
        /// Instancia o objeto para que haja referência às implementações feitas no repositório
        /// </summary>
        public UsuariosController(IUsuarioRepository contexto)
        {
            _usuarioRepository = contexto;
        }

        /// <summary>
        /// Lista todos os usuários
        /// </summary>
        /// <returns>Uma lista de usuarios</returns>
        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_usuarioRepository.ListarTodos());
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }

        // <summary>
        /// Cadastra um novo Usuario
        /// <param name="novoUsuario">objeto que será cadastrado</param>
        /// <returns></returns>
        [Authorize (Roles = "2, 3")]
        [HttpPost]
        public IActionResult Cadastrar(Usuario novoUsuario)
        {
            try
            {
                _usuarioRepository.Cadastrar(novoUsuario);
                return StatusCode(201);
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }

        /// <summary>
        /// Atualiza um Usuario existente
        /// </summary>
        /// <param name="id">id do Usuario que será atualizado</param>
        /// <param name="novoUsuario">objeto com as informações atualizadas</param>
        /// <returns></returns>
        [Authorize(Roles = "1, 2, 3")]
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Usuario novoUsuario)
        {
           
                Usuario usuarioBuscado = _usuarioRepository.BuscarPorId(id);

                if (usuarioBuscado != null)
                {
                    try
                    {
                        _usuarioRepository.Atualizar(id, novoUsuario);
                        return NoContent();
                    }
                    catch (Exception erro)
                    {

                        return BadRequest(erro);
                    }
                }

            return BadRequest("Nenhum usuário foi encontrado para ser atualizado!");


        }



        /// <summary>
        /// Busca um Usuario através do seu id
        /// </summary>
        /// <param name="id">id do tipoUsuario que será buscado</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                return Ok(_usuarioRepository.BuscarPorId(id));
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }

        /// <summary>
        /// Deleta um Usuario através do seu id
        /// </summary>
        /// <param name="id">id do Usuario que será deletado</param>
        [Authorize (Roles = "3")]
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            Usuario usuarioBuscado = _usuarioRepository.BuscarPorId(id);

            if (usuarioBuscado != null)
            {
                try
                {
                    _usuarioRepository.Deletar(id);
                    return StatusCode(204);
                }
                catch (Exception erro)
                {

                    return BadRequest(erro);
                }
            }

            return BadRequest("Nenhum usuário foi encontrado para ser deletado!");

        }


        [HttpGet("minhas")]
        public IActionResult ListarMinhas()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_usuarioRepository.ListarMinhas(idUsuario));
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "Não é possível mostrar as informações se o usuário não estiver logado!",
                    error
                });
            }
        }


    }
}
