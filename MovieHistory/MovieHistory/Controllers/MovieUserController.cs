using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MovieHistory.Data;
using MovieHistory.Models;
using MovieHistory.Services;

namespace MovieHistory.Controllers
{
    public class MovieUserController : Controller
    {
        private readonly IApplicationConfiguration _appSettings;
        private ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public MovieUserController(IApplicationConfiguration appSettings, ApplicationDbContext ctx, UserManager<ApplicationUser> userManager)
        {
            _appSettings = appSettings;
            _context = ctx;
            _userManager = userManager;
        }

        public void Favorite(string Id)
        {
            var movieUserInstance = _context.MovieUser.Where(x => x.MovieUserId == Int32.Parse(Id)).SingleOrDefault();
            if (movieUserInstance != null)
            {
                bool favorite = movieUserInstance.Favorited;
                movieUserInstance.Favorited = !favorite;
                _context.SaveChanges();
            };
        }

        public void Watch(string Id)
        {
            var movieUserInstance = _context.MovieUser.Where(x => x.MovieUserId == Int32.Parse(Id)).SingleOrDefault();
            if (movieUserInstance != null)
            {
                bool watched = movieUserInstance.Watched;
                movieUserInstance.Watched = !watched;
                _context.SaveChanges();
            };
        }
    }
}