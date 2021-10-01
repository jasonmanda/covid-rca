using System;

namespace InterActiveMap.ViewModels
{
    public class CovidViewModel
    {
        public string CodeVille{get;set;}
        public string Ville{get;set;}
        public int TotalCas{get;set;}
        public int TotalDeces{get;set;}
        public int TotalVaccin{get;set;}
    }
        public class CovidApiResult{
        public CovidViewModel Covid{get;set;}
        public int TotalCas{get;set;}
        public int TotalDeces{get;set;}
        public int TotalVaccin{get;set;}
    }
}
