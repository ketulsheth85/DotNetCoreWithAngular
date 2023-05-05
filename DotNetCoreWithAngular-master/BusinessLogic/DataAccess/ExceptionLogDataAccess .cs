using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogic.Models;

namespace BusinessLogic.DataAccess
{
    public class ExceptionLogDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static ExceptionLog objretExceptionLog;

        public static ExceptionLog InsertExceptionLog(string ExceptionName, string description, string PageName, string MethodName, long Line)
        {
            ExceptionLogVM ExceptionLogVM = new ExceptionLogVM();
            ExceptionLogVM.ExceptionName = ExceptionName;
            ExceptionLogVM.Discription = description;
            ExceptionLogVM.PageName = PageName;
            ExceptionLogVM.MethodName = MethodName;
            ExceptionLogVM.PageLine = Line;

            ExceptionLog objExceptionLog = obj.insert(objretExceptionLog, DBSPNames.InsertExceptionLog, ExceptionLogVM);
            return objExceptionLog;
        }
    }
}
