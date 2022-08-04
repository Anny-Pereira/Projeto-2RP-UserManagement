using _2RP_UserManagement_WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2RP_UserManagement_WebApi.Interfaces
{
    public interface IUsuarioRepository
    {
        /// <summary>
        /// Lista todos os usuarios cadastrados
        /// </summary>
        /// <returns>Uma lista de usuários</returns>
        List<Usuario> ListarTodos();

        /// <summary>
        /// Lista as informações de um determinado usuario
        /// </summary>
        /// <param name="id">id do usuario </param>
        /// <returns>Uma lista com as informações de um usuario</returns>
        List<Usuario> ListarMinhas(int id);

        /// <summary>
        /// Busca um usuário através do seu id
        /// </summary>
        /// <param name="id">id do usuário</param>
        /// <returns>Um usuário específico</returns>
        Usuario BuscarPorId(int id);

        /// <summary>
        /// Cadastra um novo usuário
        /// </summary>
        /// <param name="novoUsuario">Dados do usuario a ser cadastrado</param>
        void Cadastrar(Usuario novoUsuario);

        /// <summary>
        /// Deleta um usuário através do seu id
        /// </summary>
        /// <param name="id">id do usuário a ser deletado</param>
        /// <returns></returns>
        void Deletar(int id);

        /// <summary>
        /// Atualiza os dados de um usuário
        /// </summary>
        /// <param name="id">id do usuário</param>
        /// <param name="novoUsuario">Dados atualizados do usuário</param>
        /// <returns></returns>
        void Atualizar(int id, Usuario novoUsuario);

        /// <summary>
        /// Autentica um usuário cadastrado
        /// </summary>
        /// <param name="email">Email do usuario</param>
        /// <param name="senha">Senha do usuário</param>
        /// <returns></returns>
        Usuario Login(string email, string senha);
    }
}
