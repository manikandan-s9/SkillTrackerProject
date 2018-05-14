using SkillTrackerEntityLayer;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillTrackerDataLayer
{
    public class SkillTrackerDataLayer
    {
        private SkillTrackerDBEntities db ;

        #region Contructor
        public SkillTrackerDataLayer()
        {
            db = new SkillTrackerDBEntities();
        }
        #endregion Contructor

        #region Associate Methods
        public IQueryable<AssociateList> GetAssociates()
        {
            IQueryable<AssociateList> aList = db.Associates.Select(a => new AssociateList
            {
                ID = a.ID,
                Associate_ID = a.Associate_ID,
                Name = a.Name,
                Email = a.Email,
                Mobile = a.Mobile,
                Gender = a.Gender,
                Level_1 = a.Level_1,
                Level_2 = a.Level_2,
                Level_3 = a.Level_3,
                Status_Green = a.Status_Green,
                Status_Blue = a.Status_Blue,
                Status_Red = a.Status_Red,
                Pic = a.Pic,
                Remark = a.Remark,
                Other_Skills = a.Other_Skills,
                Strength = a.Strength,
                Weakness = a.Weakness,
                Associate_Skills = a.Associate_Skills.Select(s => new Associate_Skills_List
                {
                    ID = s.ID,
                    Associate_ID = s.Associate_ID,
                    Skill_ID = s.Skill_ID,
                    Skill_Score = s.Skill_Score,
                    Skill = new Skill_List { Skill_ID = s.Skill.Skill_ID, Skill_Name = s.Skill.Skill_Name }
                }).ToList(),
                skills_List = a.Associate_Skills.Select(s =>  s.Skill.Skill_Name)
            });

            return aList;
        }
        public Associate GetAssociate(long id)
        {
            Associate associate = db.Associates.Find(id);
            return associate;
        }
        public Associate PutAssociate(long id, Associate associate)
        {            
            foreach(var asso in associate.Associate_Skills)
            {
                asso.Associate_ID = id;
            }
            List<Associate_Skills> Askills = associate.Associate_Skills.ToList();
            this.DeleteAssociate_Skills(id);
            associate.Associate_Skills = null;
            db.Entry(associate).State = EntityState.Modified;
            db.SaveChanges();
            if (Askills != null && Askills.Count > 0)
            {
                this.PostAssociate_Skills(Askills);                
            }

            Associate associateUpdated = db.Associates.Find(id);

            return associateUpdated;
        }
        public Associate PostAssociate(Associate associate)
        {
            db.Associates.Add(associate);
            db.SaveChanges();
            
            return associate;
        }
        public Associate DeleteAssociate(long id)
        {
            Associate associate = db.Associates.Find(id);
            if (associate != null)
            {
                this.DeleteAssociate_Skills(id);

                db.Associates.Remove(associate);
                db.SaveChanges();
            }
            return associate;
        }
        #endregion Associate Methods

        #region Skill Methods
        public IQueryable<Skill> GetSkills()
        {
            return db.Skills.OrderBy(s => s.Skill_Name);
        }
        public Skill GetSkill(long id)
        {
            Skill skill = db.Skills.Find(id);

            return skill;
        }
        public Skill PutSkill(long id, Skill skill)
        {
            db.Entry(skill).State = EntityState.Modified;
            db.SaveChanges();

            return skill;
        }
        public Skill PostSkill(Skill skill)
        {
            db.Skills.Add(skill);
            db.SaveChanges();

            return skill;
        }
        public Skill DeleteSkill(long id)
        {
            Skill skill = db.Skills.Find(id);
            db.Skills.Remove(skill);
            db.SaveChanges();

            return skill;
        }
        #endregion Skill Methods

        #region Associates Skills Methods 
        public List<Associate_Skills> PostAssociate_Skills(List<Associate_Skills> associateSkill)
        {
            db.Associate_Skills.AddRange(associateSkill);
            db.SaveChanges();

            return associateSkill;
        }
        public IQueryable<Associate_Skills> DeleteAssociate_Skills(long id)
        {
            List<Associate_Skills> associateSkill = db.Associate_Skills.Where(s => s.Associate_ID == id).ToList();
            db.Associate_Skills.RemoveRange(associateSkill);
            db.SaveChanges();

            return associateSkill.AsQueryable();
        }
        #endregion Associates Skills Methods

    }

    public class AssociateList
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Pic { get; set; }
        public Nullable<bool> Status_Green { get; set; }
        public Nullable<bool> Status_Blue { get; set; }
        public Nullable<bool> Status_Red { get; set; }
        public Nullable<bool> Level_1 { get; set; }
        public Nullable<bool> Level_2 { get; set; }
        public Nullable<bool> Level_3 { get; set; }
        public string Remark { get; set; }
        public string Strength { get; set; }
        public string Weakness { get; set; }
        public string Gender { get; set; }
        public string Other_Skills { get; set; }
        public string Associate_ID { get; set; }
        public IEnumerable<string> skills_List { get; set; }
        public IList<Associate_Skills_List> Associate_Skills { get; set; }
    }
    public class Associate_Skills_List
    {
        public long ID { get; set; }
        public long Associate_ID { get; set; }
        public long Skill_ID { get; set; }
        public long Skill_Score { get; set; }
        public Skill_List Skill { get; set; }
    }
    public class Skill_List
    {
        public long Skill_ID { get; set; }
        public string Skill_Name { get; set; }
    }
}
