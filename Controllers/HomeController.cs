using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using InterActiveMap.ViewModels;

namespace InterActiveMap.Controllers
{
    [Controller]
    public class HomeController : ControllerBase
    {

        private readonly ILogger<HomeController> _logger;


        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public JsonResult OnGet()
        {
            // return new JsonResult(new {Id=15});
            return new JsonResult(new { Id = 15 });

        }


    }

}
