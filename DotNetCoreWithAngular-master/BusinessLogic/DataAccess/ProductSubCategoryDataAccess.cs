using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
    public class ProductSubCategoryDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static ProductSubCategoryModel objretProductCategoryModel;

        public static List<ProductSubCategoryModel> GetProductCategories(ProductSubCategoryModelVM objProductCategoryModelVM)
        {
            List<ProductSubCategoryModel> objlstProductCategoryModel = obj.getdata(objretProductCategoryModel, DBSPNames.CRUDProductsSubCategory, objProductCategoryModelVM);
            return objlstProductCategoryModel;
        }

        public static ProductSubCategoryModel CRUDProductCategories(ProductSubCategoryModelVM mappingModelVM)
        {
            ProductSubCategoryModel objProductCategoryModel = obj.insert(objretProductCategoryModel, DBSPNames.CRUDProductsSubCategory, mappingModelVM);
            return objProductCategoryModel;
        }

    }
}
