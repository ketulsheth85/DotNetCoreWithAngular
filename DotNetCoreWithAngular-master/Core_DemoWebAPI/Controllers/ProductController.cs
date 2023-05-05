using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogic;
using BusinessLogic.DataAccess;
using BusinessLogic.Models;
using System.IO;
using System.Data;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Core_DemoWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpGet("[action]")]
        public List<ProductMasterModel> GetProductList(int id = 0, int companyId = 0, int IsCompanyFlag = 0, string SearchText = "", string qrCode ="")
        {
            List<ProductMasterModel> objlstProductMasterModel = new List<ProductMasterModel>();
            try
            {
                ProductMasterModelVM objProductMasterModelVM = new ProductMasterModelVM();
                objProductMasterModelVM.Op = 4;
                objProductMasterModelVM.ProductId = id;
                objProductMasterModelVM.CompanyId = companyId;
                objProductMasterModelVM.QrCode = qrCode;
                objProductMasterModelVM.IsCompanyFlag = IsCompanyFlag;
                objlstProductMasterModel = ProductMasterDataAccess.GetProductList(objProductMasterModelVM);

                if (SearchText.Trim() != "")
                    objlstProductMasterModel = objlstProductMasterModel.Where(oh => oh.ProductName.ToLower().Contains(SearchText.ToLower())).ToList();

                
                if (id > 0 && objlstProductMasterModel.Count > 0)
                {
                    dynamic dynamic = new System.Dynamic.ExpandoObject();
                    dynamic.ProductRelation = objlstProductMasterModel[0].ProductSubCat;
                    objlstProductMasterModel[0].objrelSubcat = ProductMasterDataAccess.GetProductRelationByProduct(dynamic);

                    ProductMasterModelVM objPRMvm = new ProductMasterModelVM();
                    objPRMvm.ProductId = id;
                    objPRMvm.Op = 6;
                    objlstProductMasterModel[0].objrelProduct = ProductMasterDataAccess.GetRelationalProductList(objPRMvm);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductController + ex.StackTrace, "GetProductList()", ex.LineNumber());
            }
            return objlstProductMasterModel;
        }

        [HttpPost("[action]")]
        public ProductMasterModel CRUDProductData([FromBody] ProductMasterModel objProductMasterModelVM)
        {

            ProductMasterModel objProductMastercModel = new ProductMasterModel();
            ProductMasterModelVM objProductMastercModelVM = new ProductMasterModelVM();
            ProductRelationMasterModel objProductRelationMasterModel = new BusinessLogic.Models.ProductRelationMasterModel();
            ProductSubCatMasterModel objSubCatMasterModel = new ProductSubCatMasterModel();
            string dbPath;
            try
            {
                if (!string.IsNullOrEmpty(objProductMasterModelVM.ProductImage))
                {
                    var file = objProductMasterModelVM.ProductImage.Split(",");
                    string fileName = objProductMasterModelVM.ProductImageName;
                    var folderName = Path.Combine("Resources", "ProductImage");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                    //var dbPath = Path.Combine(folderName, fileName);
                    byte[] imageBytes = Convert.FromBase64String(file[1]);
                    var filesToS = Path.Combine(pathToSave, fileName);
                    dbPath = @"Resources/ProductImage/" + fileName;
                    if (imageBytes.Length > 0)
                    {
                        using (var stream = new FileStream(filesToS, FileMode.Create))
                        {
                            stream.Write(imageBytes, 0, imageBytes.Length);
                            stream.Flush();
                        }
                    }
                }
                else
                {
                    dbPath = objProductMasterModelVM.ProductImageName;
                }
                objProductMastercModelVM.AttributeKey1 = objProductMasterModelVM.AttributeKey1;
                objProductMastercModelVM.AttributeValue1 = objProductMasterModelVM.AttributeValue1;
                objProductMastercModelVM.AttributeKey2 = objProductMasterModelVM.AttributeKey2;
                objProductMastercModelVM.AttributeValue2 = objProductMasterModelVM.AttributeValue2;
                objProductMastercModelVM.AttributeKey3 = objProductMasterModelVM.AttributeKey3;
                objProductMastercModelVM.AttributeValue3 = objProductMasterModelVM.AttributeValue3;
                objProductMastercModelVM.AttributeKey4 = objProductMasterModelVM.AttributeKey4;
                objProductMastercModelVM.AttributeValue4 = objProductMasterModelVM.AttributeValue4;
                objProductMastercModelVM.AttributeKey5 = objProductMasterModelVM.AttributeKey5;
                objProductMastercModelVM.AttributeValue5 = objProductMasterModelVM.AttributeValue5;
                objProductMastercModelVM.AttributeKey6 = objProductMasterModelVM.AttributeKey6;
                objProductMastercModelVM.AttributeValue6 = objProductMasterModelVM.AttributeValue6;
                objProductMastercModelVM.AttributeKey7 = objProductMasterModelVM.AttributeKey7;
                objProductMastercModelVM.AttributeValue7 = objProductMasterModelVM.AttributeValue7;
                objProductMastercModelVM.AttributeKey8 = objProductMasterModelVM.AttributeKey8;
                objProductMastercModelVM.AttributeValue8 = objProductMasterModelVM.AttributeValue8;
                objProductMastercModelVM.AttributeKey9 = objProductMasterModelVM.AttributeKey9;
                objProductMastercModelVM.AttributeValue9 = objProductMasterModelVM.AttributeValue9;
                objProductMastercModelVM.AttributeKey10 = objProductMasterModelVM.AttributeKey10;
                objProductMastercModelVM.AttributeValue10 = objProductMasterModelVM.AttributeValue10;
                objProductMastercModelVM.CompanyId = objProductMasterModelVM.CompanyId;
                objProductMastercModelVM.Description = objProductMasterModelVM.Description;
                objProductMastercModelVM.IsActive = objProductMasterModelVM.IsActive;
                objProductMastercModelVM.Op = objProductMasterModelVM.Op;
                objProductMastercModelVM.LoginUserID = objProductMasterModelVM.LoginUserID;
                objProductMastercModelVM.ProductId = objProductMasterModelVM.ProductId;
                objProductMastercModelVM.ProductImage = dbPath;
                objProductMastercModelVM.ProductionNo = objProductMasterModelVM.ProductionNo;
                objProductMastercModelVM.ProductName = objProductMasterModelVM.ProductName;
                objProductMastercModelVM.QrCode = objProductMasterModelVM.QrCode;
                objProductMastercModelVM.ProductCat = objProductMasterModelVM.ProductCat;
                objProductMastercModelVM.ProductSubCat = objProductMasterModelVM.ProductSubCat;
                objProductMastercModelVM.SerialNo = objProductMasterModelVM.SerialNo;
                objProductMastercModelVM.Status = objProductMasterModelVM.Status;
                objProductMastercModelVM.Tag = objProductMasterModelVM.Tag;
                objProductMastercModelVM.WarrantyDate = objProductMasterModelVM.WarrantyDate;
                objProductMastercModelVM.ProductionDate = objProductMasterModelVM.ProductionDate;
                
                objProductMastercModel = ProductMasterDataAccess.CRUDProductRelationMaster(objProductMastercModelVM);

                if (objProductMasterModelVM.relationalProduct != null && objProductMasterModelVM.relationalProduct.Split(',').Length > 0)
                {
                    int relatinalProducts = objProductMasterModelVM.relationalProduct.Split(',').Length;
                    int productId = objProductMasterModelVM.Op == 1 ? objProductMastercModel.ProductId : objProductMasterModelVM.ProductId ;
                    //productId = objProductMastercModel.ProductId;
                    int CreatedBy = objProductMasterModelVM.LoginUserID; 
                    DataTable dt = new DataTable("@dt");
                    dt.Columns.Add(new DataColumn("ProductId", typeof(int)));
                    dt.Columns.Add(new DataColumn("RelationalProductId", typeof(int)));
                    dt.Columns.Add(new DataColumn("CompanyId", typeof(int)));
                    dt.Columns.Add(new DataColumn("CreatedBy", typeof(int)));
                    
                    for (int i = 0; i < relatinalProducts; i++)
                    {
                        dt.Rows.Add(productId, Convert.ToInt32(objProductMasterModelVM.relationalProduct.Split(',')[i]), objProductMasterModelVM.CompanyId, CreatedBy);
                    }
                    ProductRelationMasterModelVM objPRMvm = new ProductRelationMasterModelVM();
                    objPRMvm.dt = dt;
                    objPRMvm.ProductId = productId;
                    objPRMvm.op = objProductMasterModelVM.Op;
                    objProductRelationMasterModel = ProductMasterDataAccess.CRUDProductRelationMaster(objPRMvm);
                }

                if(objProductMastercModelVM.ProductSubCat != null && objProductMastercModelVM.ProductSubCat.Split(',').Length > 0)
                {
                    var ProductSubCat = objProductMastercModelVM.ProductSubCat.Split(',');
                    int ProductId = objProductMastercModelVM.Op == 1 ? objProductMastercModel.ProductId : objProductMasterModelVM.ProductId;
                    int CreatedBy = objProductMasterModelVM.LoginUserID;
                    DataTable dt = new DataTable("@dt");
                    dt.Columns.Add(new DataColumn("ProductId", typeof(int)));
                    dt.Columns.Add(new DataColumn("ProductCategoryId", typeof(int)));
                    dt.Columns.Add(new DataColumn("ProductSubCategoryId", typeof(int)));
                    dt.Columns.Add(new DataColumn("CompanyId", typeof(int)));
                    dt.Columns.Add(new DataColumn("CreatedBy", typeof(int)));

                    for (int i = 0; i < ProductSubCat.Length; i++)
                    {
                        dt.Rows.Add(ProductId, objProductMasterModelVM.ProductCat,Convert.ToInt32(ProductSubCat[i]), objProductMasterModelVM.CompanyId, CreatedBy);
                    }

                    ProductSubCatMasterModelVM objsubCatMasterVM = new ProductSubCatMasterModelVM();
                    objsubCatMasterVM.dt = dt;
                    objsubCatMasterVM.ProductId = ProductId;
                    objsubCatMasterVM.ProductCategoryId = objProductMasterModelVM.ProductCat;
                    objsubCatMasterVM.Op = objProductMasterModelVM.Op;
                    objSubCatMasterModel = ProductMasterDataAccess.CRUDProductSubCatMaster(objsubCatMasterVM);
                }
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductController + ex.StackTrace, "CRUDProductData()", ex.LineNumber());
            }
            return objProductMastercModel;
        }
        
        [HttpGet("[action]")]
        public List<ProdectMasterListRelation> GetRelationalProductList(int productId,string productSubCat,int companyId = 0)
        {
            List<ProdectMasterListRelation> objlstProductMasterModel = new List<ProdectMasterListRelation>();
            try
            {
                ProductMasterModelVM objPRMvm = new ProductMasterModelVM();

                if(!String.IsNullOrEmpty(productSubCat) && productSubCat.Length > 0)
                {
                    objPRMvm.subCatIds = productSubCat;
                    objPRMvm.Op = 7;
                    objPRMvm.CompanyId = companyId;
                    objPRMvm.ProductId = productId;
                    objlstProductMasterModel = ProductMasterDataAccess.GetRelationalProductList(objPRMvm);
                }
            }
            catch(Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductController + ex.StackTrace, "GetProductList()", ex.LineNumber());
            }
            return objlstProductMasterModel;

        }
    }
}
