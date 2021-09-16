using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using InterActiveMap.ViewModels;

namespace InterActiveMap.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CovidController : ControllerBase
    {
     
        private readonly ILogger<CovidController> _logger;

        public CovidController(ILogger<CovidController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id}")]
        public dynamic GetOne(String id)
        {
            return new {
                Covid=List().Where(x => x.CodeVille == id).FirstOrDefault(),
                TotalCas=List().Sum(x=>x.TotalCas),
                TotalDeces = List().Sum(x=>x.TotalDeces),
                TotalVaccin = List().Sum(x=>x.TotalVaccin)
            };
                }

        private IEnumerable<CovidViewModel> List()
        {
            return new List<CovidViewModel>{
            new CovidViewModel{CodeVille="CF-BB" , Ville="Bamingui-Bangoran",TotalCas=89,TotalDeces=2,TotalVaccin=680}, 
            new CovidViewModel{CodeVille="CF-BK" , Ville="Basse-Kotto",TotalCas=290,TotalDeces=0,TotalVaccin=900},
            new CovidViewModel{CodeVille="CF-KB" , Ville="Gribingui",TotalCas=100,TotalDeces=3,TotalVaccin=100}, 
            new CovidViewModel{CodeVille="CF-HK" , Ville="Haute-Kotto",TotalCas=582,TotalDeces=0,TotalVaccin=120}, 
            new CovidViewModel{CodeVille="CF-HS" , Ville="Haute-Sangha",TotalCas=51,TotalDeces=1,TotalVaccin=250}, 
            new CovidViewModel{CodeVille="CF-HM" , Ville="Haut-Mbomou",TotalCas=553,TotalDeces=28,TotalVaccin=830},
            new CovidViewModel{CodeVille="CF-KG" , Ville="Kémo-Gribingui",TotalCas=368,TotalDeces=10,TotalVaccin=1450}, 
            new CovidViewModel{CodeVille="CF-LB" , Ville="Lobaye",TotalCas=24,TotalDeces=0,TotalVaccin=258}, 
            new CovidViewModel{CodeVille="CF-MB" , Ville="Mbomou",TotalCas=89,TotalDeces=0,TotalVaccin=856}, 
            new CovidViewModel{CodeVille="CF-NM" , Ville="Nana-Mambéré",TotalCas=0,TotalDeces=0,TotalVaccin=482},
            new CovidViewModel{CodeVille="CF-MP" , Ville="Ombella-Mpoko",TotalCas=5820,TotalDeces=75,TotalVaccin=6681},
            new CovidViewModel{CodeVille="CF-UK" , Ville="Ouaka",TotalCas=10,TotalDeces=1,TotalVaccin=985},
            new CovidViewModel{CodeVille="CF-AC" , Ville="Ouham",TotalCas=51,TotalDeces=15,TotalVaccin=75},
            new CovidViewModel{CodeVille="CF-OP" , Ville="Ouham-Pendé",TotalCas=14,TotalDeces=0,TotalVaccin=26},
            new CovidViewModel{CodeVille="CF-SE" , Ville="Sangha",TotalCas=57,TotalDeces=10,TotalVaccin=900},
            new CovidViewModel{CodeVille="CF-VK" , Ville="Vakaga",TotalCas=88,TotalDeces=20,TotalVaccin=20}

            };
        }
    }
}
