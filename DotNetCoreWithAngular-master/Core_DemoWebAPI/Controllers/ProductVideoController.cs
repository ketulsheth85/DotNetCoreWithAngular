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
    public class ProductVideoController : ControllerBase
    {
        [HttpGet("[action]")]
        public List<ProductVideoModel> GetProductVideos(int id = 0, int companyId = 0,int IsCompanyFlag = 0)
        {
            List<ProductVideoModel> objlstProductVideoModel = new List<ProductVideoModel>();
            try
            {
                ProductVideoModelVM objProductVideoModelVM = new ProductVideoModelVM();
                objProductVideoModelVM.Op = 4;
                objProductVideoModelVM.VideoId = id;
                objProductVideoModelVM.CompanyId = companyId;
                objProductVideoModelVM.IsCompanyFlag = IsCompanyFlag;
                objlstProductVideoModel = ProductVideoDataAccess.GetProductVideos(objProductVideoModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductVideoController + ex.StackTrace, "GetProductVideos()", ex.LineNumber());
            }
            return objlstProductVideoModel;
        }

        [HttpPost("[action]")]
        public ProductVideoModel CRUDProductVideo([FromBody] ProductVideoModel objProductVideoModelVM)
        {
            //var file = objProductVideoModelVM.VideoUrl.Split(",");
            //string fileName = objProductVideoModelVM.VideoFileName;
            //var folderName = Path.Combine("Resources", "CompanyVideo");
            //var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            //var dbPath = Path.Combine(folderName, fileName);
            //byte[] imageBytes = Convert.FromBase64String(file[1]);
            //System.IO.File.WriteAllBytes(pathToSave, imageBytes);

            ProductVideoModel objProductVideoModel = new ProductVideoModel();
            ProductVideoModelVM objProductVideoVM = new ProductVideoModelVM();
            string dbPath;

            try
            {
                if (!string.IsNullOrEmpty(objProductVideoModelVM.VideoFileName))
                {
                    var file = objProductVideoModelVM.VideoUrl.Split(",");
                    string fileName = objProductVideoModelVM.VideoFileName;
                    var folderName = Path.Combine("Resources", "CompanyVideo");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                    byte[] imageBytes = Convert.FromBase64String(file[1]);
                    var filesToS = Path.Combine(pathToSave, fileName);
                    dbPath = @"Resources/CompanyVideo/" + fileName;
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
                    dbPath = objProductVideoModelVM.VideoUrl;
                }

                objProductVideoVM.VideoUrl = dbPath;
                objProductVideoVM.VideoId = objProductVideoModelVM.VideoId;
                objProductVideoVM.VideoName = objProductVideoModelVM.VideoName;
                objProductVideoVM.VideoType = objProductVideoModelVM.VideoType;
                //objProductVideoVM.VideoUrl = objProductVideoModelVM.VideoUrl;
                objProductVideoVM.ProductId = objProductVideoModelVM.ProductId;
                objProductVideoVM.CompanyId = objProductVideoModelVM.CompanyId;
                objProductVideoVM.IsActive = objProductVideoModelVM.IsActive;
                objProductVideoVM.IsDelete = objProductVideoModelVM.IsDelete;
                objProductVideoVM.CreatedBy = objProductVideoModelVM.CreatedBy;
                objProductVideoVM.UpdatedBy = objProductVideoModelVM.UpdatedBy;
                objProductVideoVM.Op = objProductVideoModelVM.Op;

                objProductVideoModel = ProductVideoDataAccess.CRUDProductVideo(objProductVideoVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.ProductVideoController + ex.StackTrace, "CRUDProductVideo()", ex.LineNumber());
            }
            return objProductVideoModel;
        }
    }
}
