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
    public class ProductSubCategoryController : ControllerBase
    {
        [HttpGet("[action]")]
        public List<ProductSubCategoryModel> GetProductSubCategory(int id = 0, int companyId = 0,int IsCompanyFlag = 0)
        {
            List<ProductSubCategoryModel> objlstProductCategoryModel = new List<ProductSubCategoryModel>();
            try
            {
                ProductSubCategoryModelVM objCompanyMasterModelVM = new ProductSubCategoryModelVM();
                objCompanyMasterModelVM.Op = 4;
                objCompanyMasterModelVM.ProductSubCategoryId = id;
                objCompanyMasterModelVM.CompanyId = companyId;
                objCompanyMasterModelVM.IsCompanyFlag = IsCompanyFlag;
                objlstProductCategoryModel = ProductSubCategoryDataAccess.GetProductCategories(objCompanyMasterModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.CompanyController + ex.StackTrace, "GetProductSubCategory()", ex.LineNumber());
            }
            return objlstProductCategoryModel;
        }

        [HttpGet("[action]")]
        public List<ProductSubCategoryModel> GetProductSubCategories(int id = 0, int companyId = 0, int IsCompanyFlag = 0, int ProductCategoryID = 0)
        {
            List<ProductSubCategoryModel> objlstProductCategoryModel = new List<ProductSubCategoryModel>();
            try
            {
                ProductSubCategoryModelVM objCompanyMasterModelVM = new ProductSubCategoryModelVM();
                objCompanyMasterModelVM.Op = 6;
                objCompanyMasterModelVM.ProductSubCategoryId = id;
                objCompanyMasterModelVM.CompanyId = companyId;
                objCompanyMasterModelVM.IsCompanyFlag = IsCompanyFlag;
                objCompanyMasterModelVM.ProductCategoryID = ProductCategoryID;
                objlstProductCategoryModel = ProductSubCategoryDataAccess.GetProductCategories(objCompanyMasterModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.CompanyController + ex.StackTrace, "GetProductSubCategories()", ex.LineNumber());
            }
            return objlstProductCategoryModel;
        }

        [HttpPost("[action]")]
        public ProductSubCategoryModel CRUDProductSubCategory([FromBody] ProductSubCategoryModelVM objCompanyMasterModelVM)
        {
            ProductSubCategoryModel objProductCategoryModel = new ProductSubCategoryModel();
            try
            {
                objProductCategoryModel = ProductSubCategoryDataAccess.CRUDProductCategories(objCompanyMasterModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.CompanyController + ex.StackTrace, "CRUDProductSubCategory()", ex.LineNumber());
            }
            return objProductCategoryModel;

        }

    }
}
