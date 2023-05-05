using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
    public class ProductCheckListDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static ProductCheckListModel objretProductCheckListModel;
        public static ProductCheckListClientModel objretProductCheckListClientModel;
        public static ProductCheckListQuestionModel objretQuestion;
        public static ClientCheckListModel objretClientCheckList;
        public static CheckListModel objretCheckList;
        public static SectionListModel objretSectionList;
        public static List<ProductCheckListModel> GetProductCheckLists(ProductCheckListModelVM objProductCheckListModelVM)
        {
            List<ProductCheckListModel> objlstProductCheckListModel = obj.getdata(objretProductCheckListModel, DBSPNames.CRUDProductCheckListMaster, objProductCheckListModelVM);
            return objlstProductCheckListModel;
        }

        public static ProductCheckListModel CRUDProductCheckList(ProductCheckListModelVM mappingModelVM)
        {
            ProductCheckListModel objProductCheckListModel = obj.insert(objretProductCheckListModel, DBSPNames.CRUDProductCheckListMaster, mappingModelVM);
            return objProductCheckListModel;
        }

        public static List<ProductCheckListQuestionModel> GetCheckListQuestions(ProductCheckListModelVM objQuestionVM)
        {
            List<ProductCheckListQuestionModel> objQuestionModel = obj.getdata(objretQuestion, DBSPNames.CRUDProductCheckListMaster, objQuestionVM);
            return objQuestionModel;
        }

        public static ProductCheckListQuestionModel CRUDProductCheckListQuestion(ProductCheckListQuestionModelVM mappingVM)
        {
            ProductCheckListQuestionModel objproductCheckListQuestionModel = obj.insert(objretQuestion, DBSPNames.CRUDProductCheckListQuetionMaster, mappingVM);
            return objproductCheckListQuestionModel;
        }
        public static List<ProductCheckListClientModel> GetProductCheckListsClient(ProductCheckListModelVM objProductCheckListModelVM)
        {
            List<ProductCheckListClientModel> objlstProductCheckListModel = obj.getdata(objretProductCheckListClientModel, DBSPNames.CRUDProductCheckListMaster, objProductCheckListModelVM);
            return objlstProductCheckListModel;
        }
         
        public static List<ClientCheckListModel> GetClientCheckList(ClientCheckListModelVM objClientCheckListVM)
        {
            List<ClientCheckListModel> objlstProductCheckListModel = obj.getdata(objretClientCheckList, DBSPNames.CRUDClientCheckListMaster, objClientCheckListVM);
            return objlstProductCheckListModel;
        }

        public static List<SectionListModel> GetSectionList(ClientCheckListModelVM objClientCheckListVM)
        {
            List<SectionListModel> objlstProductCheckListModel = obj.getdata(objretSectionList, DBSPNames.CRUDClientCheckListMaster, objClientCheckListVM);
            return objlstProductCheckListModel;
        }
    }
}
