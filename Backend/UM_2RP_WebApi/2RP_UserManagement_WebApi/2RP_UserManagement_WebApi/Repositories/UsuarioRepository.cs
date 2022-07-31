using _2RP_UserManagement_WebApi.Contexts;
using _2RP_UserManagement_WebApi.Domains;
using _2RP_UserManagement_WebApi.Interfaces;
using _2RP_UserManagement_WebApi.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2RP_UserManagement_WebApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly UserManagementContext ctx;

        public UsuarioRepository(UserManagementContext appContext)
        {
            ctx = appContext;
        }

        public void Atualizar(int id, Usuario novoUsuario)
        {
            Usuario usuarioBuscado = BuscarPorId(id);

            if (usuarioBuscado != null)
            {
                usuarioBuscado.Nome = novoUsuario.Nome;
                usuarioBuscado.Email = novoUsuario.Email;
                usuarioBuscado.Senha = novoUsuario.Senha;
                usuarioBuscado.Status = novoUsuario.Status;
                usuarioBuscado.IdTipoUsuario = novoUsuario.IdTipoUsuario;
            }

            ctx.Usuarios.Update(usuarioBuscado);
            ctx.SaveChanges();

        }

        public Usuario BuscarPorId(int id)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == id);
        }

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Usuario usuarioBuscado = BuscarPorId(id);

            if (usuarioBuscado != null)
            {
                ctx.Usuarios.Remove(usuarioBuscado);
                ctx.SaveChanges();
            }

        }

        public List<Usuario> ListarMinhas(int id)
        {
            return ctx.Usuarios
                 .Include(u => u.IdTipoUsuarioNavigation)
                 .Where(u => u.IdUsuario == id).ToList();
        }

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios.ToList();
        }

        public Usuario Login(string email, string senha)
        {
            var usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuario != null)
            {
                if (usuario.Senha.Length < 32)
                {
                    usuario.Senha = Cripto.GerarHash(usuario.Senha);

                    ctx.Usuarios.Update(usuario);
                    ctx.SaveChanges();

                }

                bool comparado = Cripto.CompararSenha(senha, usuario.Senha);

                if (comparado) return usuario;
            }

            return null;
        }
    }
}
