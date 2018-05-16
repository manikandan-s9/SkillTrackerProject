using SkillTrackerBusinessLayer;
using SkillTrackerDataLayer;
using SkillTrackerEntityLayer;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace SkillsTrackerAPI.Controllers
{
    public class AssociatesController : ApiController
    {
        private SkillTrackerBL bl;

        #region Contructor
        public AssociatesController()
        {
            bl = new SkillTrackerBL();
        }
        #endregion Contructor

        #region API Methods
        // GET: api/Associates
        public IQueryable<AssociateList> GetAssociates()
        {
            return bl.GetAssociates();
        }

        // GET: api/Associates/5
        [ResponseType(typeof(AssociateList))]
        public AssociateList GetAssociate(long id)
        {
            AssociateList associate = bl.GetAssociate(id);

            return associate;
        }

        // PUT: api/Associates/5
        [ResponseType(typeof(void))]
        public Associate PutAssociate(long id, AssociateList associate)
        {
            Associate associateUpdated;
            associate.Associate_Skills = associate.Associate_Skills.Where(s => s.Skill_Score > 0).ToArray();
            associateUpdated = bl.PutAssociate(id, associate);

            return associateUpdated;
        }

        // POST: api/Associates
        [ResponseType(typeof(Associate))]
        public Associate PostAssociate(Associate associate)
        {

            associate.Associate_Skills = associate.Associate_Skills.Where(s => s.Skill_Score > 0).ToArray();

            Associate associateInserted = bl.PostAssociate(associate);

            return associateInserted;
        }

        // DELETE: api/Associates/5
        [ResponseType(typeof(Associate))]
        public Associate DeleteAssociate(long id)
        {
            Associate associate = bl.DeleteAssociate(id);
            return associate;
        }

        [HttpPost]
        [Route("api/UploadImage")]
        public HttpResponseMessage UploadImage()
        {
            string imageName = null;
            var httprequest = HttpContext.Current.Request;
            var postedFile = httprequest.Files["image"];
            if (postedFile != null)
            {
                imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                var filepath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                postedFile.SaveAs(filepath);
                long id = httprequest["AssociateID"] == null ? 0 : Convert.ToInt32(httprequest["AssociateID"]);
                AssociateList associate = bl.GetAssociate(id);
                associate.Pic = imageName;

                Associate associates = bl.PutAssociate(id, associate);
            }

            return Request.CreateResponse(HttpStatusCode.Created);
        }
        #endregion API Methods
    }
}
