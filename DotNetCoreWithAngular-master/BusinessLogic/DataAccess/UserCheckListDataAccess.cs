using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
    public class UserCheckListDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static UserCheckList objretUserCheckListModel;
        public static UserSubmitCheckListModel objretUserSubmitCheckListModel;
        public static UserCheckList CRUDUserCheckList(UserCheckListVM mappingModelVM)
        {
            UserCheckList objUserCheckList = obj.insert(objretUserCheckListModel, DBSPNames.CRUDUserCheckList, mappingModelVM);
            return objUserCheckList;
        }
        public static List<UserSubmitCheckListModel> GetUserCheckListSubmit(UserSubmitCheckListModelVM mappingModelVM)
        {
            List<UserSubmitCheckListModel> objUserCheckList = obj.getdata(objretUserSubmitCheckListModel, DBSPNames.GetUserSubmitCheckList, mappingModelVM);
            return objUserCheckList;
        }
    }
}
