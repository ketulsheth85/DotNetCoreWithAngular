using BusinessLogic;
using BusinessLogic.DataAccess;
using BusinessLogic.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Net.Http.Headers;
using System.Drawing;

namespace Core_DemoWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductDocumentController : ControllerBase
    {
        [HttpGet("[action]")]
        public List<ProductDocumentModel> GetProductDocuments(int id = 0, int companyId = 0,int IsCompanyFlag = 0)
        {
            List<ProductDocumentModel> objlstProductDocumentModel = new List<ProductDocumentModel>();
            try
            {
                ProductDocumentModelVM objProductDocumentModelVM = new ProductDocumentModelVM();
                objProductDocumentModelVM.Op = 4;
                objProductDocumentModelVM.DocumentId = id;
                objProductDocumentModelVM.CompanyId = companyId;
                objProductDocumentModelVM.IsCompanyFlag = IsCompanyFlag;
                objlstProductDocumentModel = ProductDocumentDataAccess.GetProductDocuments(objProductDocumentModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductDocumentController + ex.StackTrace, "GetProductDocuments()", ex.LineNumber());
            }
            return objlstProductDocumentModel;
        }

        [HttpPost("[action]")]
        public ProductDocumentModel CRUDProductDocument([FromBody] ProductDocumentModel objProductDocumentModelVM)
        {

            ProductDocumentModel objProductDocumentModel = new ProductDocumentModel();
            ProductDocumentModelVM objProductDocumentVM = new ProductDocumentModelVM();
            string dbPath;

            try
            {
                if (!string.IsNullOrEmpty(objProductDocumentModelVM.DocFileName))
                {
                    var file = objProductDocumentModelVM.DocPath.Split(",");
                    string fileName = objProductDocumentModelVM.DocFileName;
                    var folderName = Path.Combine("Resources", "ProductDoc");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                    byte[] imageBytes = Convert.FromBase64String(file[1]);
                    var filesToS = Path.Combine(pathToSave, fileName);
                    dbPath = @"Resources/ProductDoc/" + fileName;
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
                    dbPath = objProductDocumentModelVM.DocPath;
                }

                objProductDocumentVM.DocPath = dbPath;
                objProductDocumentVM.DocumentId = objProductDocumentModelVM.DocumentId;
                objProductDocumentVM.DocName = objProductDocumentModelVM.DocName;
                objProductDocumentVM.DocumentCatId = objProductDocumentModelVM.DocumentCatId;
                objProductDocumentVM.ProductId = objProductDocumentModelVM.ProductId;
                objProductDocumentVM.CompanyId = objProductDocumentModelVM.CompanyId;
                objProductDocumentVM.IsActive = objProductDocumentModelVM.IsActive;
                objProductDocumentVM.IsDelete = objProductDocumentModelVM.IsDelete;
                objProductDocumentVM.CreatedBy = objProductDocumentModelVM.CreatedBy;
                objProductDocumentVM.UpdatedBy = objProductDocumentModelVM.UpdatedBy;
                objProductDocumentVM.Op = objProductDocumentModelVM.Op;

                objProductDocumentModel = ProductDocumentDataAccess.CRUDProductDocument(objProductDocumentVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductDocumentController + ex.StackTrace, "CRUDProductDocument()", ex.LineNumber());
            }
            return objProductDocumentModel;
        }
    }
}
