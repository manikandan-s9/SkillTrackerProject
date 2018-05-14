using Microsoft.VisualStudio.TestTools.UnitTesting;
using SkillsTrackerAPI.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SkillTrackerEntityLayer;

namespace SkillsTrackerAPI.Controllers.Tests
{
    [TestClass]
    public class SkillsControllerTests
    {
        private SkillsController skillsController;
        [TestInitialize]
        public void setup()
        {
            skillsController = new SkillsController();
        }
        [TestMethod]
        public void GetSkillsTest()
        {
            var skillsList = skillsController.GetSkills();
            Assert.IsNotNull(skillsList);
        }

        [TestMethod]
        public void GetSkillTest()
        {
            var skillsList = skillsController.GetSkill(1);
            Assert.IsNotNull(skillsList);
        }

        [TestMethod]
        public void PostSkillTest()
        {
            var skillsList = skillsController.PostSkill(new Skill { Skill_Name = "Testing" });
            Assert.IsNotNull(skillsList);
        }

        [TestMethod]
        public void PutSkillTest()
        {
            var skillsList = skillsController.PutSkill(1, new Skill { Skill_ID = 1, Skill_Name = "HTML" });
            Assert.IsNotNull(skillsList);
        }

        [TestMethod]
        public void DeleteSkillTest()
        {
            var skills = skillsController.GetSkills().OrderByDescending(s => s.Skill_ID).FirstOrDefault();
            var skillsList = skillsController.DeleteSkill(skills.Skill_ID);
            Assert.IsNotNull(skillsList);
        }
    }
}