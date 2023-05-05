using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
    public class DocumentCategoryDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static DocumentCategoryModel objretDocumentCategoryModel;

        public static List<DocumentCategoryModel> GetDocumentCategories(DocumentCategoryModelVM objDocumentCategoryModelVM)
        {
            List<DocumentCategoryModel> objlstDocumentCategoryModel = obj.getdata(objretDocumentCategoryModel, DBSPNames.CRUDDocumentCategory, objDocumentCategoryModelVM);
            return objlstDocumentCategoryModel;
        }

        public static DocumentCategoryModel CRUDDocumentCategories(DocumentCategoryModelVM mappingModelVM)
        {
            DocumentCategoryModel objDocumentCategoryModel = obj.insert(objretDocumentCategoryModel, DBSPNames.CRUDDocumentCategory, mappingModelVM);
            return objDocumentCategoryModel;
        }
    }
}
