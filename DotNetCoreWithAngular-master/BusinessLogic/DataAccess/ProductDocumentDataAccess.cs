using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
    public class ProductDocumentDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static ProductDocumentModel objretProductDocumentModel;
        public static ProductDocumentClient objretProductDocumentClient;

        public static List<ProductDocumentModel> GetProductDocuments(ProductDocumentModelVM objProductDocumentModelVM)
        {
            List<ProductDocumentModel> objlstProductDocumentModel = obj.getdata(objretProductDocumentModel, DBSPNames.CRUDProductDocumentMaster, objProductDocumentModelVM);
            return objlstProductDocumentModel;
        }

        public static ProductDocumentModel CRUDProductDocument(ProductDocumentModelVM mappingModelVM)
        {
            ProductDocumentModel objProductDocumentModel = obj.insert(objretProductDocumentModel, DBSPNames.CRUDProductDocumentMaster, mappingModelVM);
            return objProductDocumentModel;
        }
        public static List<ProductDocumentClient> GetProductDocumentsClient(ProductDocumentClientPM objProductDocumentClientPM)
        {
            List<ProductDocumentClient> objlstProductDocumentClient = obj.getdata(objretProductDocumentClient, DBSPNames.Getproductdocument, objProductDocumentClientPM);
            return objlstProductDocumentClient;
        }

    }
}
