using Microsoft.VisualStudio.TestTools.UnitTesting;
using SkillsTrackerAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Routing;

namespace SkillsTrackerAPI.Tests
{
    [TestClass()]
    public class RouteConfigTests
    {
        [TestMethod()]
        public void RegisterRoutesTest()
        {
            RouteConfig.RegisterRoutes(new RouteCollection());
        }
    }
}