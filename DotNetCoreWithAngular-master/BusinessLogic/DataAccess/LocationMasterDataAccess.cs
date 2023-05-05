using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
   public class LocationMasterDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static LocationMasterModel objretLocationMasterModel;

        public static List<LocationMasterModel> GetLocationMasterModel(LocationMasterModelVM objLocationMasterModelVM)
        {
            List<LocationMasterModel> objlstLocationMasterModel = obj.getdata(objretLocationMasterModel, DBSPNames.CRUDLoactionMaster, objLocationMasterModelVM);
            return objlstLocationMasterModel;
        }

        public static LocationMasterModel CRUDLocationMasterModel(LocationMasterModelVM mappingModelVM)
        {
            LocationMasterModel objLocationMasterModel = obj.insert(objretLocationMasterModel, DBSPNames.CRUDLoactionMaster, mappingModelVM);
            return objLocationMasterModel;
        }
    }
}
