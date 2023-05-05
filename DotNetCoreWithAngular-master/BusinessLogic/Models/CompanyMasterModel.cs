using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Models
{
    public class CompanyMasterModel 
    {
        [Key]
        public int CompanyID { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAdress { get; set; }
        public string CompanyPhone { get; set; }
        public string CompanyFax { get; set; }
        public string CompanyZip { get; set; }
        public string CompanyLogo { get; set; }
        public string CompanyLogos { get; set; }
        public string CompanyCode { get; set; }
        public string PostAddress { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ColorCode { get; set; }
        public string CompanyEmail { get; set; }
        public int LoginUserID { get; set; }
        public int IsActive { get; set; }
        public int IsCompanyFlag { get; set; }
        public int ParentCompanyID { get; set; }
        public int CompanyLevel { get; set; }
        public int Op { get; set; }
    }

    public class CompanyMasterModelVM 
    {
        public int CompanyID { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAdress { get; set; }
        public string CompanyPhone { get; set; }
        public string CompanyFax { get; set; }
        public string CompanyZip { get; set; }
        public string CompanyLogo { get; set; }
        public string CompanyCode { get; set; }
        public string PostAddress { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ColorCode { get; set; }
        public string CompanyEmail { get; set; }
        public int LoginUserID { get; set; }
        public int IsActive { get; set; }
        public int ParentCompanyID { get; set; }
        public int CompanyLevel { get; set; }
        public int Op { get; set; } //1 : INSERT, 2 : UPDATE, 3 : DELETE, 4 : SELECT, 5 : Acitve/InActive
    }
}
