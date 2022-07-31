using _2RP_UserManagement_WebApi.Contexts;
using _2RP_UserManagement_WebApi.Domains;
using _2RP_UserManagement_WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2RP_UserManagement_WebApi.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {

        private readonly UserManagementContext ctx;

        public TipoUsuarioRepository(UserManagementContext appContext)
        {
            ctx = appContext;
        }

        public void Atualizar(int id, TipoUsuario novoTipo)
        {
            TipoUsuario tipo = BuscarPorId(id);

            if (tipo != null)
            {
                tipo.Titulo = novoTipo.Titulo;
            }

            ctx.TipoUsuarios.Update(tipo);

            ctx.SaveChanges();

        }

        public TipoUsuario BuscarPorId(int id)
        {
            return ctx.TipoUsuarios.FirstOrDefault(t => t.IdTipoUsuario == id);
        }

        public void Cadastrar(TipoUsuario novoTipo)
        {
            ctx.TipoUsuarios.Add(novoTipo);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            TipoUsuario tipoBuscado = BuscarPorId(id);

            if (tipoBuscado != null)
            {
                ctx.TipoUsuarios.Remove(tipoBuscado);
                ctx.SaveChanges();
            }

        }

        public List<TipoUsuario> ListarTodos()
        {
            return ctx.TipoUsuarios.ToList();
        }
    }
}
