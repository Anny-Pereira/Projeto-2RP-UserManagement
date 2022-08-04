using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _2RP_UserManagement_WebApi.ViewModels
{
    public class LoginViewModel
    {

        [Required(ErrorMessage = "Informe o e-mail do usuário!")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage= "Informe a senha do usuário!")]
        public string Senha { get; set; }

    }
}
