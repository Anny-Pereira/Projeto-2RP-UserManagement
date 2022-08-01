using _2RP_UserManagement_WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2RP_UserManagement_WebApi.Interfaces
{
    public interface ITipoUsuarioRepository
    {
        /// <summary>
        /// Lista todos os Tipos de Usuario cadastrados
        /// </summary>
        /// <returns>Uma lista de Tipos de Usuario</returns>
        List<TipoUsuario> ListarTodos();

        /// <summary>
        /// Busca um tipoUsuário através do seu id
        /// </summary>
        /// <param name="id">id do TipoUsuario</param>
        /// <returns>Um TipoUsuario específico</returns>
        TipoUsuario BuscarPorId(int id);

        /// <summary>
        /// Cadastra um novo tipo de usuário
        /// </summary>
        /// <param name="novoTipo">Dados do tipo de usuario a ser cadastrado</param>
        void Cadastrar(TipoUsuario novoTipo);

        /// <summary>
        /// Deleta um TipoUsuario através do seu id
        /// </summary>
        /// <param name="id">id do Tipo de Usuario a ser deletado</param>
        /// <returns></returns>
        void Deletar(int id);

        /// <summary>
        /// Atualiza os dados de um tipo de usuário
        /// </summary>
        /// <param name="id">id do usuário</param>
        /// <param name="novoTipo">Dados atualizados do tipo de usuário</param>
        /// <returns></returns>
        void Atualizar(int id, TipoUsuario novoTipo);
    }
}
