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
    public class ProductCategoryController : ControllerBase
    {
        [HttpGet("[action]")]
        public List<ProductCategoryModel> GetProductCategory(int id = 0,int companyId = 0, int IsCompanyFlag = 0)
        {
            List<ProductCategoryModel> objlstProductCategoryModel = new List<ProductCategoryModel>();
            try
            {
                ProductCategoryModelVM objCompanyMasterModelVM = new ProductCategoryModelVM();
                objCompanyMasterModelVM.Op = 4;
                objCompanyMasterModelVM.ProductCategoryID = id;
                objCompanyMasterModelVM.CompanyId = companyId;
                objCompanyMasterModelVM.IsCompanyFlag = IsCompanyFlag;
                objlstProductCategoryModel = ProductCategoryDataAccess.GetProductCategories(objCompanyMasterModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.CompanyController + ex.StackTrace, "GetProductCategory()", ex.LineNumber());
            }
            return objlstProductCategoryModel;
        }

        [HttpPost("[action]")]
        public ProductCategoryModel CRUDProductCategory([FromBody] ProductCategoryModelVM objCompanyMasterModelVM)
        {
            ProductCategoryModel objProductCategoryModel = new ProductCategoryModel();
            try
            {
                objProductCategoryModel = ProductCategoryDataAccess.CRUDProductCategories(objCompanyMasterModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.CompanyController + ex.StackTrace, "CRUDProductCategory()", ex.LineNumber());
            }
            return objProductCategoryModel;

        }
    }
}
