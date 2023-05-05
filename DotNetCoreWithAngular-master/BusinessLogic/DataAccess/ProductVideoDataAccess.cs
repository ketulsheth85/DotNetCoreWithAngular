using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
    public class ProductVideoDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static ProductVideoModel objretProductVideoModel;

        public static List<ProductVideoModel> GetProductVideos(ProductVideoModelVM objProductVideoModelVM)
        {
            List<ProductVideoModel> objlstProductVideoModel = obj.getdata(objretProductVideoModel, DBSPNames.CRUDProductVideoMaster, objProductVideoModelVM);
            return objlstProductVideoModel;
        }

        public static ProductVideoModel CRUDProductVideo(ProductVideoModelVM mappingModelVM)
        {
            ProductVideoModel objProductVideoModel = obj.insert(objretProductVideoModel, DBSPNames.CRUDProductVideoMaster, mappingModelVM);
            return objProductVideoModel;
        }
    }
}
