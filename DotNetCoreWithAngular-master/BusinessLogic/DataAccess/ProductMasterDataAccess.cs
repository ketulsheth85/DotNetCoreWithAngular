using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using BusinessLogic.Models;

namespace BusinessLogic.DataAccess
{
    public class ProductMasterDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static ProductMasterModel objretProductMasterModel;
        public static ProductRelation objretProductRelation;
        public static ProductRelationMasterModel objretProductRelationMasterModel;
        public static ProdectMasterListRelation objProductMasterListrel;
        public static ProductSubCatMasterModel objretSubCatMaster;

        public static List<ProductMasterModel> GetProductList(ProductMasterModelVM objProductMasterModelVM)
        {
            List<ProductMasterModel> objlstProductMasterModel = obj.getdata(objretProductMasterModel, DBSPNames.CRUDProductMaster, objProductMasterModelVM);

            return objlstProductMasterModel;
        }

        public static ProductMasterModel CRUDProductRelationMaster(ProductMasterModelVM objProductMasterModelVM)
        {
            ProductMasterModel objProductMasterModel = obj.insert(objretProductMasterModel, DBSPNames.CRUDProductMaster, objProductMasterModelVM);
            return objProductMasterModel;
        }

        public static ProductRelationMasterModel CRUDProductRelationMaster(ProductRelationMasterModelVM objPRMvm)
        {
            ProductRelationMasterModel objProductRelationMasterModel= obj.insert(objretProductRelationMasterModel, DBSPNames.CRUDProductRelationMaster, objPRMvm); ;
            return objProductRelationMasterModel;
        }
        public static  List<ProdectMasterListRelation> GetRelationalProductList(ProductMasterModelVM objProductMasterModelVM)
        {
            List<ProdectMasterListRelation> objProdectMasterListRelation = obj.getdata(objProductMasterListrel, DBSPNames.CRUDProductMaster, objProductMasterModelVM);
            return objProdectMasterListRelation;
        }

        public static List<ProductRelation> GetProductRelationByProduct(dynamic objdynamic)
        {
            List<ProductRelation> objlstProductRelation = obj.getdata(objretProductRelation, DBSPNames.GetProductRelation, objdynamic);
            return objlstProductRelation;
        }

        public static ProductSubCatMasterModel CRUDProductSubCatMaster(ProductSubCatMasterModelVM objSubCatMasterVM)
        {
            ProductSubCatMasterModel objSubCatMaster = obj.insert(objretSubCatMaster, DBSPNames.CRUDProductSubCatMaster, objSubCatMasterVM);
            return objSubCatMaster;
        }
    }
}
