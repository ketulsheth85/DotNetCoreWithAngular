using BusinessLogic;
using BusinessLogic.DataAccess;
using BusinessLogic.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core_DemoWebAPI.Controllers.ClientController
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductClientController : ControllerBase
    {
        UserCheckList list = new UserCheckList();
        [HttpPost("[action]")]
        public List<ProductDocumentClient> GetProductDocumentClient([FromBody] ProductDocumentClientPM clientPM)
        {
            List<ProductDocumentClient> product = new List<ProductDocumentClient>();
            try
            {
                product = ProductDocumentDataAccess.GetProductDocumentsClient(clientPM);

            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductDocumentClientController + ex.StackTrace, "Getproductdocument()", ex.LineNumber());
            }
            return product;
        }
        [HttpPost("[action]")]
        public List<ProductVideoModel> GetProductVideoClient([FromBody] ProductVideoModelVM clientPM)
        {
            List<ProductVideoModel> productVideo = new List<ProductVideoModel>();
            try
            {
                productVideo = ProductVideoDataAccess.GetProductVideos(clientPM);

            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductDocumentClientController + ex.StackTrace, "Getproductdocument()", ex.LineNumber());
            }
            return productVideo;
        }
        [HttpPost("[action]")]
        public List<ProductFAQMasterModel> GetProductFAQClient([FromBody] ProductFAQMasterModelVM clientPM)
        {
            List<ProductFAQMasterModel> productFAQ = new List<ProductFAQMasterModel>();
            try
            {
                productFAQ = ProductFAQMasterDataAccess.GetFAQDataList(clientPM);

            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductDocumentClientController + ex.StackTrace, "Getproductdocument()", ex.LineNumber());
            }
            return productFAQ;
        }
        [HttpPost("[action]")]
          public List<CheckListModel> GetProductCheckListClient([FromBody] ClientCheckListModelVM clientPM)
        {
           List<ClientCheckListModel> productCheckList = new List<ClientCheckListModel>();
            List<CheckListModel> checklistFilter = new List<CheckListModel>();

            try
            {
                clientPM.mode = 1;
                productCheckList = ProductCheckListDataAccess.GetClientCheckList(clientPM).Distinct().ToList();
                var index = 0;
                var list = productCheckList.Select(x => new { x.CheckListId, x.CheckListName }).Distinct().ToList(); 
                foreach (var i in productCheckList.Select(x => x.CheckListId).Distinct().ToList())
                {
                  var checklistFilters= productCheckList.Where(p => p.CheckListId == i).ToList()
                        .Distinct().Select(s => new { CheckListId = s.CheckListId, CheckListName = s.CheckListName }).Distinct()
                        .Select(x => new CheckListModel { 
                            checkListId = x.CheckListId, 
                            checkListName = x.CheckListName,
                            SectionListModel = productCheckList.Where(p => p.CheckListId == i).ToList()
                             .Distinct().Select(s => new { SectionId = s.SectionId, SectionName = s.SectionName }).Distinct()
                             .Select(x => new SectionListModel
                             {
                                 sectionId = x.SectionId,
                                 sectionName = x.SectionName,
                                 questionModels = productCheckList.Where(p => p.CheckListId == i && p.SectionId == x.SectionId).ToList().
                                 Distinct().Select(s => new { QuestionId = s.QuestionId, Question = s.Question }).Distinct()
                                  .Select(x => new QuestionModel
                                  {
                                      questionId = x.QuestionId,
                                      question = x.Question,
                                      comments = "",
                                      options = new List<Options>() { new Options(){
                                              id = 1,
                                              checkListId = 1,
                                              isAnswer = false,
                                              name = "Yes",
                                              selected = false
                                          },
                                          new Options(){
                                              id = 2,
                                              checkListId = 1,
                                              isAnswer = false,
                                              name = "No",
                                              selected = false
                                          },
                                          new Options(){
                                              id = 3,
                                              checkListId = 1,
                                              isAnswer = false,
                                              name = "N/A",
                                              selected = false
                                          }
                                      }
                                  }).Distinct().ToList()
                             }).ToList()
                             .Distinct().ToList()
                        }).ToList()
                        .Distinct().ToList();
                    checklistFilter.Add(checklistFilters[0]) ;
                  
                    index++;
                }

            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductDocumentClientController + ex.StackTrace, "Getproductdocument()", ex.LineNumber());
            }
            return checklistFilter;
        }
        [HttpPost("[action]")]
        public UserCheckList InsertCheckListClient([FromBody] List<UserCheckListVM> clientPM)
        {
            UserCheckList checkList = new UserCheckList();
            try
            {
                foreach (var cp in clientPM)
                {
                    list = UserCheckListDataAccess.CRUDUserCheckList(cp);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductDocumentClientController + ex.StackTrace, "Getproductdocument()", ex.LineNumber());

            }
            return checkList;
        }

        [HttpPost("[action]")]
        public UserCheckList GetMainListClient([FromBody] UserCheckListVM clientPM)
        {
            UserCheckList checkList = new UserCheckList();
            try
            {
                checkList.IsSubmited = UserCheckListDataAccess.CRUDUserCheckList(clientPM).IsSubmited;

            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductDocumentClientController + ex.StackTrace, "Getproductdocument()", ex.LineNumber());

            }
            return checkList;
        }

        [HttpPost("[action]")]
        public List<UserSubmitCheckListModel> GetSubmitListClient([FromBody] UserSubmitCheckListModelVM clientPM)
        {
            List<UserSubmitCheckListModel> checkList = new List<UserSubmitCheckListModel>();
             try
            {
                checkList = UserCheckListDataAccess.GetUserCheckListSubmit(clientPM);
                
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductDocumentClientController + ex.StackTrace, "Getproductdocument()", ex.LineNumber());

            }
            return checkList;
        }
        [HttpPost("[action]")]
        public List<CheckListModel> GetSubmitListClientById([FromBody] UserSubmitCheckListModelVM clientPM)
        {
            List<UserSubmitCheckListModel> checkList = new List<UserSubmitCheckListModel>();
            List<CheckListModel> checklistFilter = new List<CheckListModel>();
            try
            {
                var index = 0;
                checkList = UserCheckListDataAccess.GetUserCheckListSubmit(clientPM);
                foreach (var i in checkList.Select(x => x.CheckListId).Distinct().ToList())
                {
                    var checklistFilters = checkList.Where(p => p.CheckListId == i).ToList()
                       .Distinct().Select(s => new { CheckListId = s.CheckListId, CheckListName = s.CheckListName }).Distinct()
                       .Select(x => new CheckListModel
                       {
                           checkListId = x.CheckListId,
                           checkListName = x.CheckListName,
                           SectionListModel = checkList.Where(p => p.CheckListId == i).ToList()
                            .Distinct().Select(s => new { SectionId = s.SectionId, SectionName = s.SectionName }).Distinct()
                            .Select(x => new SectionListModel
                            {
                                sectionId = x.SectionId,
                                sectionName = x.SectionName,
                                questionModels = checkList.Where(p => p.CheckListId == i && p.SectionId == x.SectionId).ToList().
                                Distinct().Select(s => new { QuestionId = s.QuestionId, Question = s.Question, Comments = s.Comments }).Distinct()
                                 .Select(x => new QuestionModel
                                 {
                                     questionId = x.QuestionId,
                                     question = x.Question,
                                     comments = x.Comments,
                                     options = new List<Options>() { new Options(){
                                              id = 1,
                                              checkListId = 1,
                                              isAnswer = (checkList.Where(p => p.CheckListId == i && p.QuestionId == x.QuestionId)
                                              .Select(s => s.CheckListAns).FirstOrDefault() == 1 ? true: false),
                                              name = "Yes",
                                              selected = (checkList.Where(p => p.CheckListId == i && p.QuestionId == x.QuestionId)
                                              .Select(s => s.CheckListAns).FirstOrDefault() == 1 ? true: false)
                                          },
                                          new Options(){
                                              id = 2,
                                              checkListId = 1,
                                              isAnswer = (checkList.Where(p => p.CheckListId == i && p.QuestionId == x.QuestionId)
                                              .Select(s => s.CheckListAns).FirstOrDefault() == 2 ? true: false),
                                              name = "No",
                                              selected = (checkList.Where(p => p.CheckListId == i && p.QuestionId == x.QuestionId)
                                              .Select(s => s.CheckListAns).FirstOrDefault() == 2 ? true: false)
                                          },
                                          new Options(){
                                              id = 3,
                                              checkListId = 1,
                                              isAnswer = (checkList.Where(p => p.CheckListId == i && p.QuestionId == x.QuestionId)
                                              .Select(s => s.CheckListAns).FirstOrDefault() == 3 ? true: false),
                                              name = "N/A",
                                              selected = (checkList.Where(p => p.CheckListId == i && p.QuestionId == x.QuestionId)
                                              .Select(s => s.CheckListAns).FirstOrDefault() == 3 ? true: false)
                                          }
                                     }
                                 }).Distinct().ToList()
                            }).ToList()
                            .Distinct().ToList()
                       }).ToList()
                       .Distinct().ToList();
                    checklistFilter.Add(checklistFilters[0]);

                    index++;
                }
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductDocumentClientController + ex.StackTrace, "Getproductdocument()", ex.LineNumber());

            }
            return checklistFilter;
        }

    }
}
