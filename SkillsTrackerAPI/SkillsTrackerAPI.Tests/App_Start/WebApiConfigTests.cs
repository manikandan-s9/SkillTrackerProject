using Microsoft.VisualStudio.TestTools.UnitTesting;
using SkillsTrackerAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SkillsTrackerAPI.Tests
{
    [TestClass]
    public class WebApiConfigTests
    {
        [TestMethod]
        public void RegisterTest()
        {
            WebApiConfig.Register(new HttpConfiguration());
        }
    }
}