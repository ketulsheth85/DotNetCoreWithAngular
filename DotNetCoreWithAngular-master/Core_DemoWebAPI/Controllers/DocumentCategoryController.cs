using BusinessLogic;
using BusinessLogic.DataAccess;
using BusinessLogic.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core_DemoWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentCategoryController : ControllerBase
    {
        [HttpGet("[action]")]
        public List<DocumentCategoryModel> GetDocumentCategory(int id = 0,int companyId = 0,int isCompanyFlag = 0)
        {
            List<DocumentCategoryModel> objlstDocumentCategoryModel = new List<DocumentCategoryModel>();
            try
            {
                DocumentCategoryModelVM objDocumentCategoryModelVM = new DocumentCategoryModelVM();
                objDocumentCategoryModelVM.Op = 4;
                objDocumentCategoryModelVM.DocumentCatId = id;
                objDocumentCategoryModelVM.CompanyId = companyId;
                objDocumentCategoryModelVM.isCompanyFlag = isCompanyFlag;
                objlstDocumentCategoryModel = DocumentCategoryDataAccess.GetDocumentCategories(objDocumentCategoryModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.DocumentCategoryController + ex.StackTrace, "GetDocumentCategory()", ex.LineNumber());
            }
            return objlstDocumentCategoryModel;
        }

        [HttpPost("[action]")]
        public DocumentCategoryModel CRUDDocumentCategory([FromBody] DocumentCategoryModelVM objDocumentCategoryModelVM)
        {
            DocumentCategoryModel objDocumentCategoryModel = new DocumentCategoryModel();
            try
            {
                objDocumentCategoryModel = DocumentCategoryDataAccess.CRUDDocumentCategories(objDocumentCategoryModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.DocumentCategoryController + ex.StackTrace, "CRUDDocumentCategory()", ex.LineNumber());
            }
            return objDocumentCategoryModel;

        }
    }
}
