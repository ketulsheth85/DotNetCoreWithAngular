using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;
using System;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace DBConnection
{
    public class DBConnection
    {
        //private readonly IConfiguration _configuration;
        private readonly string ConnectionString = string.Empty;
        public DBConnection()
        {
            ConnectionString = "Server=192.168.1.135,52799;Database=QRON;User ID=monil;Password=TBS@1234;MultipleActiveResultSets=False;";
            ////ConnectionString = "Server=68.71.130.74,1533;Database=Tech_QRON;User ID=QRON;Password=*tT123123;MultipleActiveResultSets=False;";
        }
        public List<T> getdata<T>(T obj, string SPName, object Params)
        {
            List<T> lst = new List<T>();
            //string con = _configuration.GetConnectionString("ConnectionString");
            using (IDbConnection db = new SqlConnection(ConnectionString)) 
            {
                //var Params = new { Beginning_Date = "2017.1.1", Ending_Date = "2017.12.31" };
                lst = db.Query<T>(SPName, Params, commandType: CommandType.StoredProcedure).ToList();
                return lst;
            }
        }


        public T insert<T>(T obj, string SPName, object Params)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                //var Params = new { Beginning_Date = "2017.1.1", Ending_Date = "2017.12.31" };
                obj = db.Query<T>(SPName, Params, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return obj;
            }
        }
    }
}
