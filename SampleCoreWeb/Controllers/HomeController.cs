using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SampleCoreWeb.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SampleCoreWeb.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        [ResponseCache(Duration = 600)]
        public IActionResult Index()
        {
            return Content("Hello World! " + DateTime.Now.ToString("G"));
        }

        public IActionResult Index2()
        {
            return View();
        }

        public IActionResult Employee()
        {
            var emp1 = new Employee()
            {
                EmployeeId = 1, Name = "FF DD", Designation = "SE"
            };

            ViewBag.Company = "GOOG";
            ViewData["CompanyLocation"] = "USA";

            return View(emp1);
        }
    }
}
