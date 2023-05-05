using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BusinessLogic.Models;

namespace BusinessLogic.DataAccess
{
    public class UserMasterDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static UserMasterModel objUserMasterModel;
        public static DashboardDataModel objDashboardDataModel;

        public static List<UserMasterModel> GetUserDataList(UserMasterModelVM objUserMasterModelVM)
        {
            List<UserMasterModel> gameMappingModels = obj.getdata(objUserMasterModel, DBSPNames.CRUDUserMaster, objUserMasterModelVM);
            return gameMappingModels;
        }

        public static UserMasterModel CRUDUserMaster(UserMasterModelVM objUserMasterModelVM)
        {
            UserMasterModel gameMappingModels = obj.insert(objUserMasterModel, DBSPNames.CRUDUserMaster, objUserMasterModelVM);
            return gameMappingModels;
        }
        public static DashboardDataModel GetDashboardData(DashboardDataModelPM objDashboardDataModelPM)
        {
            DashboardDataModel dashboardDataModel = obj.getdata(objDashboardDataModel, DBSPNames.GetDashboardData, objDashboardDataModelPM).FirstOrDefault();
            return dashboardDataModel;
        }
    }
}
