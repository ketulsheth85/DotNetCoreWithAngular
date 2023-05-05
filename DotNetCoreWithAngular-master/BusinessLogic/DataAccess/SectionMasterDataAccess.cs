using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
    public class SectionMasterDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static SectionMasterModel objretSectionMasterModel;

        public static List<SectionMasterModel> GetSectionMaster(SectionMasterModelVM objSectionMasterModelVM)
        {
            List<SectionMasterModel> objlstSectionMasterModel = obj.getdata(objretSectionMasterModel, DBSPNames.CRUDSectionMaster, objSectionMasterModelVM);
            return objlstSectionMasterModel;
        }

        public static SectionMasterModel CRUDSectionMaster(SectionMasterModelVM mappingModelVM)
        {
            SectionMasterModel objSectionMasterModel = obj.insert(objretSectionMasterModel, DBSPNames.CRUDSectionMaster, mappingModelVM);
            return objSectionMasterModel;
        }
    }
}
