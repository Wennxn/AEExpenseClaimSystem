﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Application.Models;

namespace Web.API.Application.Repository
{
    public interface IUserRepository
    {
        List<User> GetAllUsers();
        User GetAUser(string username);
    };
}
