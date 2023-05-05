using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
    public class ProductCategoryDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static ProductCategoryModel objretProductCategoryModel;

        public static List<ProductCategoryModel> GetProductCategories(ProductCategoryModelVM objProductCategoryModelVM)
        {
            List<ProductCategoryModel> objlstProductCategoryModel = obj.getdata(objretProductCategoryModel, DBSPNames.CRUDProductCategory, objProductCategoryModelVM);
            return objlstProductCategoryModel;
        }

        public static ProductCategoryModel CRUDProductCategories(ProductCategoryModelVM mappingModelVM)
        {
            ProductCategoryModel objProductCategoryModel = obj.insert(objretProductCategoryModel, DBSPNames.CRUDProductCategory, mappingModelVM);
            return objProductCategoryModel;
        }
    }
}
