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
        private SkillTrackerDBEntities db;

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
                skills_List = a.Associate_Skills.Select(s => s.Skill.Skill_Name)
            });

            return aList;
        }
        public AssociateList GetAssociate(long id)
        {
            Associate objAssociate = db.Associates.Find(id);            

            AssociateList associateList = new AssociateList
            {
                ID = objAssociate.ID,
                Associate_ID = objAssociate.Associate_ID,
                Name = objAssociate.Name,
                Email = objAssociate.Email,
                Mobile = objAssociate.Mobile,
                Gender = objAssociate.Gender,
                Level_1 = objAssociate.Level_1,
                Level_2 = objAssociate.Level_2,
                Level_3 = objAssociate.Level_3,
                Status_Green = objAssociate.Status_Green,
                Status_Blue = objAssociate.Status_Blue,
                Status_Red = objAssociate.Status_Red,
                Pic = objAssociate.Pic,
                Remark = objAssociate.Remark,
                Other_Skills = objAssociate.Other_Skills,
                Strength = objAssociate.Strength,
                Weakness = objAssociate.Weakness,
                Associate_Skills = objAssociate.Associate_Skills.Select(s => new Associate_Skills_List
                {
                    ID = s.ID,
                    Associate_ID = s.Associate_ID,
                    Skill_ID = s.Skill_ID,
                    Skill_Score = s.Skill_Score,
                    Skill = new Skill_List { Skill_ID = s.Skill.Skill_ID, Skill_Name = s.Skill.Skill_Name }
                }).ToList(),
                skills_List = objAssociate.Associate_Skills.Select(s => s.Skill.Skill_Name)
            };

            return associateList;
        }
        public Associate PutAssociate(long id, AssociateList associate)
        {
            foreach (var asso in associate.Associate_Skills)
            {
                asso.Associate_ID = id;
            }
            Associate associateObj = new Associate
            {
                ID = associate.ID,
                Associate_ID = associate.Associate_ID,
                Name = associate.Name,
                Email = associate.Email,
                Mobile = associate.Mobile,
                Gender = associate.Gender,
                Level_1 = associate.Level_1,
                Level_2 = associate.Level_2,
                Level_3 = associate.Level_3,
                Status_Green = associate.Status_Green,
                Status_Blue = associate.Status_Blue,
                Status_Red = associate.Status_Red,
                Pic = associate.Pic,
                Remark = associate.Remark,
                Other_Skills = associate.Other_Skills,
                Strength = associate.Strength,
                Weakness = associate.Weakness
            };
            List<Associate_Skills> Askills = associate.Associate_Skills.Select(askill => new Associate_Skills { ID = askill.ID, Skill_ID = askill.Skill_ID, Associate_ID = askill.Associate_ID, Skill_Score = askill.Skill_Score }).ToList();
            this.DeleteAssociate_Skills(id);
            associate.Associate_Skills = null;
            db.Entry(associateObj).State = EntityState.Modified;
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
        public IQueryable<Skill_List> GetSkills()
        {
            IQueryable<Skill_List> result = from skill in db.Skills
                                            orderby skill.Skill_Name
                                            select new Skill_List
                                            {
                                                Skill_ID = skill.Skill_ID,
                                                Skill_Name = skill.Skill_Name,
                                                Associate_Skills = (from askill in skill.Associate_Skills
                                                                    select new Associate_Skills_List
                                                                    {
                                                                        ID = askill.ID,
                                                                        Associate_ID = askill.Associate_ID,
                                                                        Skill_ID = askill.Skill_ID,
                                                                        Skill_Score = askill.Skill_Score
                                                                    }).ToList()
                                            };
            return result;
        }
        public Skill_List GetSkill(long id)
        {
            var objskill= db.Skills.Find(id);
            Skill_List skill = new Skill_List
            {
                Skill_ID = objskill.Skill_ID,
                Skill_Name = objskill.Skill_Name,
                Associate_Skills = (from askill in objskill.Associate_Skills
                                    select new Associate_Skills_List
                                    {
                                        ID = askill.ID,
                                        Associate_ID = askill.Associate_ID,
                                        Skill_ID = askill.Skill_ID,
                                        Skill_Score = askill.Skill_Score
                                    }).ToList()
            };

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
        public IList<Associate_Skills_List> Associate_Skills { get; set; }
    }
}
