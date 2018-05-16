using SkillTrackerBusinessLayer;
using SkillTrackerDataLayer;
using SkillTrackerEntityLayer;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace SkillsTrackerAPI.Controllers
{
    public class SkillsController : ApiController
    {
        private SkillTrackerBL bl;

        #region Contructor
        public SkillsController()
        {
            bl = new SkillTrackerBL();
        }
        #endregion Contructor

        #region API Methods
        // GET: api/Skills
        public IQueryable<Skill_List> GetSkills()
        {
            return bl.GetSkills();
        }

        // GET: api/Skills/5
        [ResponseType(typeof(Skill))]
        public Skill_List GetSkill(long id)
        {
            Skill_List skill = bl.GetSkill(id);
            return skill;
        }

        // PUT: api/Skills/5
        [ResponseType(typeof(void))]
        public Skill PutSkill(long id, Skill skill)
        {
            Skill skillUpdated = bl.PutSkill(id, skill);
            return skillUpdated;
        }

        // POST: api/Skills
        [ResponseType(typeof(Skill))]
        public Skill PostSkill(Skill skill)
        {
            Skill skillInserted = bl.PostSkill(skill);

            return skillInserted;
        }

        // DELETE: api/Skills/5
        [ResponseType(typeof(Skill))]
        public Skill DeleteSkill(long id)
        {
            Skill skill;
            try
            {
                skill = bl.DeleteSkill(id);
            }
            catch (DbUpdateException)
            {
                return null;
            }
            return skill;
        }
        #endregion API Methods
    }
}
