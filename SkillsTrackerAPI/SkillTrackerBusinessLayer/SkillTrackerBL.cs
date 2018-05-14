using SkillTrackerDataLayer;
using SkillTrackerEntityLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillTrackerBusinessLayer
{
    public class SkillTrackerBL
    {
        private SkillTrackerDataLayer.SkillTrackerDataLayer dl;

        #region Contructor
        public SkillTrackerBL()
        {
            dl = new SkillTrackerDataLayer.SkillTrackerDataLayer();
        }
        #endregion Contructor

        #region Associate Methods
        public IQueryable<AssociateList> GetAssociates()
        {
            return dl.GetAssociates();
        }
        public Associate GetAssociate(long id)
        {
            Associate associate = dl.GetAssociate(id);
            return associate;
        }
        public Associate PutAssociate(long id, Associate associate)
        {
            Associate associateUpdated = dl.PutAssociate(id, associate);
            return associateUpdated;
        }
        public Associate PostAssociate(Associate associate)
        {
            Associate associateInserted = dl.PostAssociate(associate);
            return associateInserted;
        }
        public Associate DeleteAssociate(long id)
        {
            Associate associate = dl.DeleteAssociate(id);
            return associate;
        }
        #endregion Associate Methods

        #region Skill Methods
        public IQueryable<Skill> GetSkills()
        {
            return dl.GetSkills();
        }
        public Skill GetSkill(long id)
        {
            Skill skill = dl.GetSkill(id);
            return skill;
        }
        public Skill PutSkill(long id, Skill skill)
        {
            Skill skillUpdated = dl.PutSkill(id, skill);
            return skillUpdated;
        }
        public Skill PostSkill(Skill skill)
        {
            Skill skillInserted = dl.PostSkill(skill);
            return skillInserted;
        }
        public Skill DeleteSkill(long id)
        {
            Skill skill = dl.DeleteSkill(id);
            return skill;
        }
        #endregion Skill Methods
    }
}
