using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogic.Models;

namespace BusinessLogic.DataAccess
{
    public class CompanyMasterDataAccess 
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static CompanyMasterModel objretCompanyMasterModel;

        public static List<CompanyMasterModel> GetCompanyDataList(CompanyMasterModelVM objCompanyMasterModelVM)
        {
            List<CompanyMasterModel> objlstCompanyMasterModel = obj.getdata(objretCompanyMasterModel, DBSPNames.CRUDCompanyMaster, objCompanyMasterModelVM);
            return objlstCompanyMasterModel;
        }

        public static CompanyMasterModel CRUDCompanyMaster(CompanyMasterModelVM mappingModelVM)
        {
            CompanyMasterModel objCompanyMasterModel = obj.insert(objretCompanyMasterModel, DBSPNames.CRUDCompanyMaster, mappingModelVM);
            return objCompanyMasterModel;
        }
    }
}
