using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogic;
using BusinessLogic.DataAccess;
using BusinessLogic.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Core_DemoWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("[action]")]
        public List<UserMasterModel> GetUserList(int id = 0, int companyId = 0, int IsCompanyFlag = 0)
        {
            List<UserMasterModel> objlstUserMasterModel = new List<UserMasterModel>();
            try
            {
                UserMasterModelVM objUserMasterModelVM = new UserMasterModelVM();
                objUserMasterModelVM.Op = 4;
                objUserMasterModelVM.UserId = id;
                objUserMasterModelVM.CompanyId = companyId;
                objUserMasterModelVM.IsCompanyFlag = IsCompanyFlag;
                objlstUserMasterModel = UserMasterDataAccess.GetUserDataList(objUserMasterModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.UserController + ex.StackTrace, "GetUserList()", ex.LineNumber());
            }
            return objlstUserMasterModel;
        }
        [HttpGet("[action]")]
        public List<UserMasterModel> GetAdminUserList(int id = 0, int companyId = 0, int IsCompanyFlag = 0)
        {
            List<UserMasterModel> objlstUserMasterModel = new List<UserMasterModel>();
            try
            {
                UserMasterModelVM objUserMasterModelVM = new UserMasterModelVM();
                objUserMasterModelVM.Op = 8;
                objUserMasterModelVM.UserId = id;
                objUserMasterModelVM.CompanyId = companyId;
                objUserMasterModelVM.IsCompanyFlag = IsCompanyFlag;
                objlstUserMasterModel = UserMasterDataAccess.GetUserDataList(objUserMasterModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.UserController + ex.StackTrace, "GetUserList()", ex.LineNumber());
            }
            return objlstUserMasterModel;
        }
        [HttpGet("[action]")]
        public UserMasterModel GetUserLogin(string userName = "", string password = "")
        {
            UserMasterModel objlstUserMasterModel = new UserMasterModel();
            try
            {
                if (userName != "" && password != "")
                {
                    UserMasterModelVM objUserMasterModelVM = new UserMasterModelVM();
                    objUserMasterModelVM.Op = 6;
                    objUserMasterModelVM.UserName = userName;
                    objUserMasterModelVM.Password = password;
                    objlstUserMasterModel = UserMasterDataAccess.GetUserDataList(objUserMasterModelVM).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.UserController + ex.StackTrace, "GetUserList()", ex.LineNumber());
            }
            return objlstUserMasterModel;
        }

        [HttpGet("[action]")]
        public DashboardDataModel GetDashboardCount(int CompanyId = 0,int UserId = 0)
        {
            DashboardDataModel objlstDashboardDataModel = new DashboardDataModel();
            try
            {
                DashboardDataModelPM objUserMasterModelVM = new DashboardDataModelPM();
                objUserMasterModelVM.CompanyID = CompanyId;
                objUserMasterModelVM.UserId = UserId;
                objlstDashboardDataModel = UserMasterDataAccess.GetDashboardData(objUserMasterModelVM);

            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.UserController + ex.StackTrace, "GetUserList()", ex.LineNumber());
            }
            return objlstDashboardDataModel;
        }

        [HttpPost("[action]")]
        public UserMasterModel CRUDUserData([FromBody] UserMasterModelVM objUserMasterModelVM)
        {
            UserMasterModel objUserMasterModel = new UserMasterModel();
            try
            {
                objUserMasterModelVM.Op = 7;
                var getData = UserMasterDataAccess.GetUserDataList(objUserMasterModelVM).ToList();
                if (getData.Count == 0)
                {
                    if (objUserMasterModelVM.UserId == 0)
                    { 
                    objUserMasterModelVM.Op = 1;
                    }
                    else
                    { 
                    objUserMasterModelVM.Op = 2;
                    }
                    objUserMasterModel = UserMasterDataAccess.CRUDUserMaster(objUserMasterModelVM);
                }
                else {
                    objUserMasterModel.DataStatus = "Already";
                }
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.UserController + ex.StackTrace, "CRUDUserData()", ex.LineNumber());
            }
            return objUserMasterModel;
        }
    }
}
