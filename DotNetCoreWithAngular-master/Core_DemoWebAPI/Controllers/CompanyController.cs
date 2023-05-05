using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogic;
using BusinessLogic.DataAccess;
using BusinessLogic.Models;
using System.IO;
using System.Net.Http.Headers;
using System.Drawing;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Core_DemoWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        [HttpGet("[action]")]
        public List<CompanyMasterModel> GetCompanyList(int id = 0)
        {
            List<CompanyMasterModel> objlstCompanyMasterModel = new List<CompanyMasterModel>();
            try
            {
                CompanyMasterModelVM objCompanyMasterModelVM = new CompanyMasterModelVM();
                objCompanyMasterModelVM.Op = 4;
                objCompanyMasterModelVM.CompanyID = id;
                objlstCompanyMasterModel = CompanyMasterDataAccess.GetCompanyDataList(objCompanyMasterModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.CompanyController + ex.StackTrace, "GetCompanyList()", ex.LineNumber());
            }
            return objlstCompanyMasterModel;
        }

        [HttpGet("[action]")]
        public List<CompanyMasterModel> GetParentCompanyList(int id = 0)
        {
            List<CompanyMasterModel> objlstCompanyMasterModel = new List<CompanyMasterModel>();
            try
            {
                CompanyMasterModelVM objCompanyMasterModelVM = new CompanyMasterModelVM();
                objCompanyMasterModelVM.Op = 6;
                objCompanyMasterModelVM.CompanyID = id;
                objlstCompanyMasterModel = CompanyMasterDataAccess.GetCompanyDataList(objCompanyMasterModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.CompanyController + ex.StackTrace, "GetCompanyList()", ex.LineNumber());
            }
            return objlstCompanyMasterModel;
        }
        [HttpPost("[action]"), DisableRequestSizeLimit]
        public CompanyMasterModel CRUDComanyData([FromBody] CompanyMasterModel objCompanyMasterModelVM)
        {

            CompanyMasterModel objCompanyMasterModel = new CompanyMasterModel();
            CompanyMasterModelVM objCompanyMasterVM = new CompanyMasterModelVM();
            string dbPath;
            try
            {
                if (!string.IsNullOrEmpty(objCompanyMasterModelVM.CompanyLogos))
                {
                    var file = objCompanyMasterModelVM.CompanyLogo.Split(",");
                    string fileName = objCompanyMasterModelVM.CompanyLogos;
                    var folderName = Path.Combine("Resources", "CompanyImage");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                    byte[] imageBytes = Convert.FromBase64String(file[1]);
                    var filesToS = Path.Combine(pathToSave, fileName);
                    dbPath = @"Resources/CompanyImage/" + fileName;
                    if (imageBytes.Length > 0)
                    {
                        using (var stream = new FileStream(filesToS, FileMode.Create))
                        {
                            stream.Write(imageBytes, 0, imageBytes.Length);
                            stream.Flush();
                        }
                    }
                }
                else if(objCompanyMasterModelVM.CompanyID != 0)
                {
                    dbPath = objCompanyMasterModelVM.CompanyLogo.Replace(Request.Host.Value+"/","").Replace((Request.IsHttps == false?"http://": "https://"),"");
                }
                else
                {
                    dbPath = "";
                }
                objCompanyMasterVM.CompanyLogo = dbPath;
                objCompanyMasterVM.City = objCompanyMasterModelVM.City;
                objCompanyMasterVM.ColorCode = objCompanyMasterModelVM.ColorCode;
                objCompanyMasterVM.CompanyAdress = objCompanyMasterModelVM.CompanyAdress;
                objCompanyMasterVM.CompanyCode = objCompanyMasterModelVM.CompanyCode;
                objCompanyMasterVM.CompanyEmail = objCompanyMasterModelVM.CompanyEmail;
                objCompanyMasterVM.CompanyFax = objCompanyMasterModelVM.CompanyFax;
                objCompanyMasterVM.CompanyID = objCompanyMasterModelVM.CompanyID;
                objCompanyMasterVM.CompanyName = objCompanyMasterModelVM.CompanyName;
                objCompanyMasterVM.CompanyPhone = objCompanyMasterModelVM.CompanyPhone;
                objCompanyMasterVM.CompanyZip = objCompanyMasterModelVM.CompanyZip;
                objCompanyMasterVM.Country = objCompanyMasterModelVM.Country;
                objCompanyMasterVM.LoginUserID = objCompanyMasterModelVM.LoginUserID;
                objCompanyMasterVM.IsActive = objCompanyMasterModelVM.IsActive;
                objCompanyMasterVM.Op = objCompanyMasterModelVM.Op;
                objCompanyMasterVM.PostAddress = objCompanyMasterModelVM.PostAddress;
                objCompanyMasterVM.ParentCompanyID = objCompanyMasterModelVM.ParentCompanyID;
                objCompanyMasterVM.CompanyLevel = objCompanyMasterModelVM.CompanyLevel;
                objCompanyMasterModel = CompanyMasterDataAccess.CRUDCompanyMaster(objCompanyMasterVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.CompanyController + ex.StackTrace, "CRUDComanyData()", ex.LineNumber());
            }
            return objCompanyMasterModel;

        }
        [HttpGet("[action]")]
        public List<RoleModel> GetRoleList()
        {
            List<RoleModel> objRoleModel = new List<RoleModel>();
            try
            {
                objRoleModel = RoleDataAccess.GetRoleList();
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.CompanyController + ex.StackTrace, "GetRoleList()", ex.LineNumber());
            }
            return objRoleModel;
        }
    }
}
