using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Models
{
    public class ExceptionLog
    {
        [Key]
        public long ExceptionID { get; set; }
        public string ExceptionName { get; set; }
        public string Discription { get; set; }
        public string PageName { get; set; }
        public long PageLine { get; set; }
        public string MethodName { get; set; }
    }

    public class ExceptionLogVM
    {
        //public long ExceptionID { get; set; }
        public string ExceptionName { get; set; }
        public string Discription { get; set; }
        public string PageName { get; set; }
        public long PageLine { get; set; }
        public string MethodName { get; set; }
    }
}
