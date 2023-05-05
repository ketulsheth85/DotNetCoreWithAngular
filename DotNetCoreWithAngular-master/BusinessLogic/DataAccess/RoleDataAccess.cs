using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.DataAccess
{
    public class RoleDataAccess
    {
        public static DBConnection.DBConnection obj = new DBConnection.DBConnection();
        public static RoleModel objretRoleModel;

        public static List<RoleModel> GetRoleList()
        {
            List<RoleModel> objlstRoleModel = obj.getdata(objretRoleModel, DBSPNames.GetRoleMaster, null);
            return objlstRoleModel;
        }

    }
}
