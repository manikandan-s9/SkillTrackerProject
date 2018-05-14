using Microsoft.VisualStudio.TestTools.UnitTesting;
using SkillsTrackerAPI.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SkillTrackerDataLayer;
using SkillTrackerEntityLayer;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;

namespace SkillsTrackerAPI.Controllers.Tests
{
    [TestClass]
    public class AssociatesControllerTests
    {
        private AssociatesController associatesController;
        [TestInitialize]
        public void setup()
        {
            associatesController = new AssociatesController();
        }
        [TestMethod]
        public void GetAssociatesTest()
        {
            var associateList = associatesController.GetAssociates();
            Assert.IsNotNull(associateList);
        }

        [TestMethod]
        public void GetAssociateTest()
        {
            AssociateList associate = associatesController.GetAssociates().OrderByDescending(s=>s.ID).FirstOrDefault();
            var associateList = associatesController.GetAssociate(associate.ID);
            Assert.IsNotNull(associateList);
        }

        [TestMethod]
        public void PostAssociateTest()
        {
            var associate = new Associate
            {
                Name = "Testing",
                Email = "test@test.com",
                Mobile = "444575755775",
                Status_Green = false,
                Status_Blue = true,
                Status_Red = false,
                Level_1 = true,
                Level_2 = false,
                Level_3 = false,
                Remark = "test remark",
                Strength = "sdgsyry",
                Weakness = "dsfgaga",
                Gender = "F",
                Other_Skills = "fsdfa",
                Associate_ID = "2342424",
                Associate_Skills = new Associate_Skills[] { new Associate_Skills {Skill_ID=4,Skill_Score=8},
                                                            new Associate_Skills {Skill_ID=5,Skill_Score=10},
                                                            new Associate_Skills {Skill_ID=6,Skill_Score=9},
                                                            new Associate_Skills {Skill_ID=10,Skill_Score=14},
                                                            new Associate_Skills {Skill_ID=12,Skill_Score=11}}
            };
            var associateList = associatesController.PostAssociate(associate);
            Assert.IsNotNull(associateList);
        }

        [TestMethod]
        public void PutAssociateTest()
        {
            var associate = new Associate
            {
                ID = 12,
                Name = "Testing",
                Email = "test@test.com",
                Mobile = "444575755775",
                Status_Green = false,
                Status_Blue = true,
                Status_Red = false,
                Level_1 = true,
                Level_2 = false,
                Level_3 = false,
                Remark = "test remark",
                Strength = "sdgsyry",
                Weakness = "dsfgaga",
                Gender = "F",
                Other_Skills = "fsdfa",
                Associate_ID = "2342424",
                Associate_Skills = new Associate_Skills[] { new Associate_Skills {Associate_ID=12,Skill_ID=4,Skill_Score=8},
                                                            new Associate_Skills {Associate_ID=12,Skill_ID=5,Skill_Score=10},
                                                            new Associate_Skills {Associate_ID=12,Skill_ID=6,Skill_Score=9},
                                                            new Associate_Skills {Associate_ID=12,Skill_ID=10,Skill_Score=14},
                                                            new Associate_Skills {Associate_ID=12,Skill_ID=12,Skill_Score=11}}
            };
            var associateList = associatesController.PutAssociate(12, associate);
            Assert.IsNotNull(associateList);

        }

        [TestMethod]
        public void DeleteAssociateTest()
        {
            AssociateList associate = associatesController.GetAssociates().OrderByDescending(s => s.ID).FirstOrDefault();
            var associateList = associatesController.DeleteAssociate(associate.ID);
            Assert.IsNotNull(associateList);

            associateList = associatesController.DeleteAssociate(0);
            Assert.IsNull(associateList);
        }

        [TestMethod]
        public void UploadImageTest()
        {
            HttpClient c = new HttpClient();
            string url = "http://localhost:1207/api/UploadImage";
            AssociateList associate = associatesController.GetAssociates().OrderByDescending(s => s.ID).FirstOrDefault();
            var fileContent = new ByteArrayContent(new byte[100]);
            fileContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = "test.jpg",
                Name = "image"
            };

            var formData = new FormUrlEncodedContent(
                                 new[] {
                                     new KeyValuePair<string, string>("AssociateID", associate.ID.ToString())
                                    });
            MultipartContent content = new MultipartContent();
            content.Add(formData);
            content.Add(fileContent);
            c.PostAsync(url, content);
            

            //var content = new MultipartFormDataContent();
            //content.Add(new StringContent(caption), ""caption"");
            //var t = new StreamContent(photoContents);
            //t.Headers.ContentType
            //    = new System.Net.Http.Headers.MediaTypeHeaderValue(contentType);
            //fileName = string.IsNullOrEmpty(fileName) ? ""img.png"" : fileName;
            //content.Add(t, ""media"", """ + fileName + """);
            //var response = PostBuffer(uri, content);
            //response.EnsureSuccessStatusCode();

            //if (associateList != null)
            //{
            //    Assert.IsNotNull(associateList);
            //}
            //else
            //{
            //    Assert.IsNull(associateList);
            //}
        }
    }
}