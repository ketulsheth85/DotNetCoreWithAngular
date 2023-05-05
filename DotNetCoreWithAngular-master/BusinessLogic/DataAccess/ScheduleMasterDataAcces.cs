using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
    public class ScheduleMasterDataAcces
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static ScheduleMasterModel objretScheduleMasterModel;

        public static List<ScheduleMasterModel> GetScheduleList(ScheduleMasterModelVM objCompanyMasterModelVM)
        {
            List<ScheduleMasterModel> objlstScheduleMasterModel = obj.getdata(objretScheduleMasterModel, DBSPNames.CRUDScheduleMaster, objCompanyMasterModelVM);
            return objlstScheduleMasterModel;
        }

        public static ScheduleMasterModel CRUDScheduleMaster(ScheduleMasterModelVM mappingModelVM)
        {
            ScheduleMasterModel objScheduleMasterModel = obj.insert(objretScheduleMasterModel, DBSPNames.CRUDScheduleMaster, mappingModelVM);
            return objScheduleMasterModel;
        }
    }
}
