using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
   public class ProductFAQMasterDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static ProductFAQMasterModel objectProductFAQMasterModel;

        public static List<ProductFAQMasterModel> GetFAQDataList(ProductFAQMasterModelVM objProductFAQMasterModelVM)
        {
            List<ProductFAQMasterModel> objlstProductFAQMasterModel = obj.getdata(objectProductFAQMasterModel, DBSPNames.CRUDProductFAQMaster, objProductFAQMasterModelVM);
            return objlstProductFAQMasterModel;
        }

        public static ProductFAQMasterModel CRUDFAQMaster(ProductFAQMasterModelVM mappingModelVM)
        {
            ProductFAQMasterModel objProductFAQMasterModel = obj.insert(objectProductFAQMasterModel, DBSPNames.CRUDProductFAQMaster, mappingModelVM);
            return objProductFAQMasterModel;
        }
    }
}
