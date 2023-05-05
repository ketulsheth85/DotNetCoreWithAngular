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
    public class LoactionMasterController : ControllerBase
    {
        [HttpGet("[action]")]
        public List<LocationMasterModel> GetLocationMaster(int id = 0, int companyId = 0, int IsCompanyFlag = 0)
        {
            List<LocationMasterModel> objlstLocationMasterModel = new List<LocationMasterModel>();
            try
            {
                LocationMasterModelVM objCompanyMasterModelVM = new LocationMasterModelVM();
                objCompanyMasterModelVM.Op = 4;
                objCompanyMasterModelVM.LocationId = id;
                objCompanyMasterModelVM.CompanyId = companyId;
                objCompanyMasterModelVM.IsCompanyFlag = IsCompanyFlag;
                objlstLocationMasterModel = LocationMasterDataAccess.GetLocationMasterModel(objCompanyMasterModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.LoactionMasterController + ex.StackTrace, "GetProductCategory()", ex.LineNumber());
            }
            return objlstLocationMasterModel;
        }

        [HttpPost("[action]")]
        public LocationMasterModel CRUDLocationMaster([FromBody] LocationMasterModelVM objCompanyMasterModelVM)
        {
            LocationMasterModel objLocationMasterModel = new LocationMasterModel();
            try
            {
                objLocationMasterModel = LocationMasterDataAccess.CRUDLocationMasterModel(objCompanyMasterModelVM);
            }
            catch (Exception ex)
            {
                ExceptionLogDataAccess.InsertExceptionLog(ex.GetType().Name, ex.Message, ControllerNames.LoactionMasterController + ex.StackTrace, "CRUDProductCategory()", ex.LineNumber());
            }
            return objLocationMasterModel;

        }
    }
}
