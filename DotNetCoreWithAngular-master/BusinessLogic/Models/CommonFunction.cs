using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Models
{
    public static class CommonFunction
    {
        public static int LineNumber(this Exception e)
        {
            int linenum = 0;
            try
            {
                linenum = Convert.ToInt32(e.StackTrace.Substring(e.StackTrace.LastIndexOf(' ')));
            }
            catch
            {

            }
            return linenum;
        }
    }
}
