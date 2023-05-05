using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
    public class ProductAssignmentDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static ProductAssignmentMasterModel objretAssignmentModel;

        public static ProductAssignmentMasterModel CRUDAssignmentMaster(ProductAssignmentMasterModelVM objAssignmentModelVM)
        {
            ProductAssignmentMasterModel objAssignmentModel = obj.insert(objretAssignmentModel, DBSPNames.CRUDAssignmentMaster, objAssignmentModelVM);
            return objAssignmentModel;
        }

        public static List<ProductAssignmentMasterModel> GetAssignmentMaster(ProductAssignmentMasterModelVM objAssignmentModelVM)
        {
            List<ProductAssignmentMasterModel> objlstAssignmentMaster = obj.getdata(objretAssignmentModel, DBSPNames.CRUDAssignmentMaster, objAssignmentModelVM);
            return objlstAssignmentMaster;
        }
    }
}
